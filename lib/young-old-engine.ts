import { getActiveTrendQuestions, trendDimensions, trendResults, type MemeQuestionType, type TrendDifficulty, type TrendDimension, type TrendDimensionScores, type TrendResultType, type TrendSenseQuestion } from "@/data/young-old";

const dimensions = trendDimensions.map(([key]) => key) as TrendDimension[];
const points: Record<TrendDifficulty, number> = { easy: 1, medium: 1.5, hard: 2 };
const dimensionTypes: Record<TrendDimension, MemeQuestionType[]> = {
  memeSource: ["relatedPerson", "relatedGroup", "originContent"],
  memeContext: ["originContext", "meaning", "trendDetail"],
  memeUsage: ["usageContext", "meaning"],
  contentConnection: ["songOrMedia", "connection", "relatedPerson", "relatedGroup"],
  trendDetection: ["trendDetail", "meaning", "originContext"],
};

function random(seed: number) { let state = Math.abs(seed) || 1; return () => { state = (state * 1664525 + 1013904223) % 4294967296; return state / 4294967296; }; }
function shuffle<T>(items: T[], next: () => number) { const copy = [...items]; for (let index = copy.length - 1; index > 0; index -= 1) { const target = Math.floor(next() * (index + 1)); [copy[index], copy[target]] = [copy[target], copy[index]]; } return copy; }
export type TrendSessionQuestion = TrendSenseQuestion & { optionOrder: string[] };

function pickQuestion(candidates: TrendSenseQuestion[], usedMemes: Set<string>, usedSubjects: Set<string>, next: () => number) {
  const available = shuffle(candidates, next).filter((question) => !usedMemes.has(question.memeId) && question.subjectIds.every((subject) => !usedSubjects.has(subject)));
  const picked = available[0];
  if (!picked) return null;
  usedMemes.add(picked.memeId); picked.subjectIds.forEach((subject) => usedSubjects.add(subject));
  return picked;
}

function hasNoTripleTypes(questions: TrendSenseQuestion[]) { return questions.every((question, index) => index < 2 || !(questions[index - 1].type === question.type && questions[index - 2].type === question.type)); }
function contributes(question: TrendSenseQuestion, dimension: TrendDimension) {
  if (dimensionTypes[dimension].includes(question.type)) return true;
  if (dimension === "memeContext") return question.tags.some((tag) => ["phrase", "origin", "context"].includes(tag));
  if (dimension === "memeUsage") return question.tags.some((tag) => ["phrase", "challenge", "reaction"].includes(tag));
  if (dimension === "contentConnection") return question.tags.some((tag) => ["creator", "group", "song", "movie", "broadcast"].includes(tag));
  return dimension === "trendDetection" && ["hot", "current"].includes(question.freshness);
}

/** 쉬움 4·보통 5·어려움 3을 고정하면서, 같은 문제 유형으로 치우치지 않게 출제합니다. */
export function selectTrendQuestions(seed: number, today?: string): TrendSessionQuestion[] {
  const next = random(seed); const active = getActiveTrendQuestions(today); let selected: TrendSenseQuestion[] = [];
  const quota: Record<TrendDifficulty, number> = { easy: 4, medium: 5, hard: 3 };
  for (let attempt = 0; attempt < 48; attempt += 1) {
    const candidate: TrendSenseQuestion[] = []; const usedMemes = new Set<string>(); const usedSubjects = new Set<string>();
    (Object.keys(quota) as TrendDifficulty[]).forEach((difficulty) => {
      for (let index = 0; index < quota[difficulty]; index += 1) {
        const picked = pickQuestion(active.filter((question) => question.difficulty === difficulty), usedMemes, usedSubjects, next);
        if (picked) candidate.push(picked);
      }
    });
    if (candidate.length === 12 && dimensions.every((dimension) => candidate.some((question) => contributes(question, dimension)))) { selected = candidate; break; }
  }
  if (selected.length !== 12) throw new Error("5개 세부 지표를 모두 계산할 수 있는 문제 세트를 만들지 못했습니다.");
  let ordered = shuffle(selected, next); for (let attempt = 0; attempt < 24 && !hasNoTripleTypes(ordered); attempt += 1) ordered = shuffle(selected, next);
  return ordered.map((question) => ({ ...question, optionOrder: shuffle(question.options.map((option) => option.id), next) }));
}

export type TrendScores = { index: number; correctCount: number; correctByDifficulty: Record<TrendDifficulty, number>; dimensions: TrendDimensionScores; resultType: TrendResultType; strength: "slight" | "strong" | "veryStrong"; strongestDimension: TrendDimension; weakestDimension: TrendDimension };
export function determineTrendResult(index: number): TrendResultType { return index >= 50 ? "young" : "old"; }
export function calculateTrendScores(questions: TrendSessionQuestion[], answers: Record<string, string>): TrendScores {
  let earned = 0; let maximum = 0; const correctByDifficulty: Record<TrendDifficulty, number> = { easy: 0, medium: 0, hard: 0 }; const raw = Object.fromEntries(dimensions.map((dimension) => [dimension, 0])) as TrendDimensionScores; const max = Object.fromEntries(dimensions.map((dimension) => [dimension, 0])) as TrendDimensionScores;
  questions.forEach((question) => { const correct = question.correctOptionId === answers[question.id]; const point = points[question.difficulty]; maximum += point; if (correct) { earned += point; correctByDifficulty[question.difficulty] += 1; } dimensions.forEach((dimension) => { if (contributes(question, dimension)) { max[dimension] += point; if (correct) raw[dimension] += point; } }); });
  const score = (value: number, total: number) => total === 0 ? 0 : Math.round((value / total) * 100);
  const dimensionScores = Object.fromEntries(dimensions.map((dimension) => [dimension, score(raw[dimension], max[dimension])])) as TrendDimensionScores;
  const index = score(earned, maximum); const resultType = determineTrendResult(index); const strength = resultType === "young" ? index >= 85 ? "veryStrong" : index >= 65 ? "strong" : "slight" : index <= 19 ? "veryStrong" : index <= 34 ? "strong" : "slight";
  const ordered = [...dimensions].sort((left, right) => dimensionScores[right] - dimensionScores[left]);
  return { index, correctCount: Object.values(correctByDifficulty).reduce((sum, count) => sum + count, 0), correctByDifficulty, dimensions: dimensionScores, resultType, strength, strongestDimension: ordered[0], weakestDimension: ordered.at(-1)! };
}

export function strengthLabel(type: TrendResultType, strength: TrendScores["strength"]) { return `${type === "young" ? "영크크" : "늙크크"} 성향 ${strength === "veryStrong" ? "매우 강함" : strength === "strong" ? "강함" : "약함"}`; }
export function createTrendInsight(scores: TrendScores) { const labels = Object.fromEntries(trendDimensions) as Record<TrendDimension, string>; const profile = trendResults[scores.resultType]; return { text: `${profile.fullDescription} 이번 세트에서는 ${labels[scores.strongestDimension]}이(가) 가장 높고, ${labels[scores.weakestDimension]}은(는) 상대적으로 낮게 나타났습니다. 낮은 지표는 능력의 부족이 아니라 어떤 밈과 콘텐츠를 접했는지에 따른 경험 차이일 수 있습니다.` }; }
export function freshnessLabel(value: TrendSessionQuestion["freshness"]) { return value === "hot" ? "최근 30일 이내 확산" : value === "current" ? "최근 3개월 이내 활발히 사용" : value === "steady" ? "지속 사용 여부 검토 중" : "과거 유행·제한적으로 활용"; }
