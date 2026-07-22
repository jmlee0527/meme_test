import { STRAY_KIDS_MAX_SCORE, STRAY_KIDS_QUIZ_SIZE, getStrayKidsGrade, getStrayKidsQuestion, strayKidsQuestions, strayKidsQuota, strayKidsWeights } from "@/data/stray-kids-fan";
import type { StrayKidsDifficulty, StrayKidsQuestion } from "@/data/stray-kids-fan";

export type StrayKidsPresentedQuestion = Omit<StrayKidsQuestion, "question" | "options"> & { originalId: string; prompt: string; choices: string[]; optionOrder: number[] };
export type StrayKidsAnswer = { questionId: string; choice: number };

function hash(seed: string) { let value = 2166136261; for (let i = 0; i < seed.length; i++) value = Math.imul(value ^ seed.charCodeAt(i), 16777619); return value >>> 0; }
function randomFactory(seed: string) { let state = hash(seed) || 1; return () => { state += 0x6d2b79f5; let v = state; v = Math.imul(v ^ v >>> 15, v | 1); v ^= v + Math.imul(v ^ v >>> 7, v | 61); return ((v ^ v >>> 14) >>> 0) / 4294967296; }; }
export function seededStrayKidsShuffle<T>(items: readonly T[], seed: string) { const random = randomFactory(seed); const next = [...items]; for (let i = next.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [next[i], next[j]] = [next[j], next[i]]; } return next; }

export function strayKidsAlbumKey(question: StrayKidsQuestion) { return question.source.url.includes("DiscographyView") ? new URL(question.source.url).searchParams.get("AamSeq") : null; }
function isRecent(question: StrayKidsQuestion) { return /\b202[56]\b/.test([question.question, question.answer, question.explanation, ...question.seoKeywords].join(" ")); }
function domain(question: StrayKidsQuestion) { const text = `${question.category} ${question.question}`; return { profile: /멤버|프로필|그룹 기본/.test(text), chronology: /발매 순서|연대기|발매 연도/.test(text), track: /트랙|수록곡|앨범 구성/.test(text), credit: /유닛|피처링|크레딧|참여/.test(text) }; }
function valid(items: StrayKidsQuestion[]) {
  const categories = new Map<string, number>(), albums = new Map<string, number>(), answers = new Map<string, number>();
  for (const q of items) { categories.set(q.category, (categories.get(q.category) ?? 0) + 1); answers.set(q.answer, (answers.get(q.answer) ?? 0) + 1); const album = strayKidsAlbumKey(q); if (album) albums.set(album, (albums.get(album) ?? 0) + 1); }
  const domains = items.map(domain);
  return Math.max(...categories.values()) <= 4 && Math.max(...answers.values()) <= 2 && [...albums.values()].every((count) => count <= 2) && items.filter(isRecent).length <= 2 && ["profile", "chronology", "track", "credit"].every((key) => domains.some((value) => value[key as keyof typeof value]));
}
export function createStrayKidsSession(seed: string): StrayKidsPresentedQuestion[] {
  for (let attempt = 0; attempt < 500; attempt++) {
    const selected = (Object.keys(strayKidsQuota) as StrayKidsDifficulty[]).flatMap((difficulty) => seededStrayKidsShuffle(strayKidsQuestions.filter((q) => q.difficulty === difficulty), `${seed}:${attempt}:${difficulty}`).slice(0, strayKidsQuota[difficulty]));
    if (!valid(selected)) continue;
    return seededStrayKidsShuffle(selected, `${seed}:${attempt}:questions`).map((q) => { const optionOrder = seededStrayKidsShuffle([0,1,2,3], `${seed}:${q.id}:options`); return { ...q, originalId: q.id, prompt: q.question, choices: optionOrder.map((index) => q.options[index]), optionOrder }; });
  }
  throw new Error("스트레이 키즈 퀴즈 출제 조건을 만족하는 세션을 만들 수 없습니다.");
}
export function calculateStrayKidsResult(answers: StrayKidsAnswer[]) {
  const reviews = answers.flatMap((answer) => { const question = getStrayKidsQuestion(answer.questionId); return question ? [{ question, choice: answer.choice, correct: answer.choice === question.answerIndex }] : []; });
  const score = reviews.filter((r) => r.correct).length;
  const weightedScore = reviews.filter((r) => r.correct).reduce((sum, r) => sum + strayKidsWeights[r.question.difficulty], 0);
  const byDifficulty = (Object.keys(strayKidsQuota) as StrayKidsDifficulty[]).map((difficulty) => ({ difficulty, total: strayKidsQuota[difficulty], correct: reviews.filter((r) => r.question.difficulty === difficulty && r.correct).length }));
  return { score, weightedScore, accuracy: Math.round(weightedScore / STRAY_KIDS_MAX_SCORE * 100), grade: getStrayKidsGrade(weightedScore), reviews, byDifficulty };
}
function isValidStrayKidsAnswers(answers: StrayKidsAnswer[]) {
  return answers.length === STRAY_KIDS_QUIZ_SIZE
    && new Set(answers.map((answer) => answer.questionId)).size === STRAY_KIDS_QUIZ_SIZE
    && answers.every((answer) => getStrayKidsQuestion(answer.questionId) && Number.isInteger(answer.choice) && answer.choice >= 0 && answer.choice < 4);
}

export function encodeStrayKidsAnswers(answers: StrayKidsAnswer[]) {
  return encodeURIComponent(JSON.stringify(answers.map(({ questionId, choice }) => [questionId, choice])));
}

export function parseStrayKidsAnswers(raw?: string): StrayKidsAnswer[] | null {
  if (!raw) return null;
  let decoded = raw;
  try { decoded = decodeURIComponent(raw); } catch { return null; }
  try {
    const payload = JSON.parse(decoded) as unknown;
    if (Array.isArray(payload)) {
      const answers = payload.map((item) => {
        if (!Array.isArray(item)) return null;
        const [questionId, choice] = item;
        return typeof questionId === "string" ? { questionId, choice: Number(choice) } : null;
      });
      if (answers.every(Boolean) && isValidStrayKidsAnswers(answers as StrayKidsAnswer[])) return answers as StrayKidsAnswer[];
    }
  } catch {}

  const legacyAnswers = [...decoded.matchAll(/(SKZ-\d+)\.([0-3])/g)].map((match) => ({ questionId: match[1], choice: Number(match[2]) }));
  return isValidStrayKidsAnswers(legacyAnswers) ? legacyAnswers : null;
}
