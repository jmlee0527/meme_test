import {
  GIRLS_GENERATION_QUIZ_SIZE,
  getGirlsGenerationGrade,
  getGirlsGenerationQuestion,
  girlsGenerationQuestions,
  girlsGenerationQuota,
  girlsGenerationSelectionLimits,
} from "@/data/girls-generation-fan";
import type { GirlsGenerationDifficulty, GirlsGenerationQuestion } from "@/data/girls-generation-fan";

export type GirlsGenerationPresentedQuestion = Omit<GirlsGenerationQuestion, "question" | "options"> & {
  originalId: string;
  prompt: string;
  choices: string[];
  /** 화면 표시 순서 → 원본 options 인덱스. 채점은 원본 answerIndex 기준으로 재계산됩니다. */
  optionOrder: number[];
};
export type GirlsGenerationAnswer = { questionId: string; choice: number };

function hash(seed: string) {
  let value = 2166136261;
  for (let i = 0; i < seed.length; i += 1) value = Math.imul(value ^ seed.charCodeAt(i), 16777619);
  return value >>> 0;
}

function rng(seed: string) {
  let state = hash(seed) || 1;
  return () => {
    state += 0x6d2b79f5;
    let v = state;
    v = Math.imul(v ^ (v >>> 15), v | 1);
    v ^= v + Math.imul(v ^ (v >>> 7), v | 61);
    return ((v ^ (v >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededGirlsGenerationShuffle<T>(items: readonly T[], seed: string) {
  const random = rng(seed);
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

// selectionPolicy 제약: 동일 category ≤ maxPerCategory, 동일 albumKey ≤ 3, time_sensitive ≤ 2
function valid(items: GirlsGenerationQuestion[], maxPerCategory: number) {
  const categories = new Map<string, number>();
  const albums = new Map<string, number>();
  let timeSensitive = 0;
  for (const question of items) {
    categories.set(question.category, (categories.get(question.category) ?? 0) + 1);
    if (question.albumKey) albums.set(question.albumKey, (albums.get(question.albumKey) ?? 0) + 1);
    if (question.freshness === "time_sensitive") timeSensitive += 1;
  }
  return (
    Math.max(...categories.values()) <= maxPerCategory &&
    [...albums.values()].every((count) => count <= girlsGenerationSelectionLimits.maxPerAlbumKey) &&
    timeSensitive <= girlsGenerationSelectionLimits.maxTimeSensitive
  );
}

function pick(seed: string, attempt: number, recentIds: string[]) {
  return (Object.keys(girlsGenerationQuota) as GirlsGenerationDifficulty[]).flatMap((difficulty) => {
    const pool = seededGirlsGenerationShuffle(
      girlsGenerationQuestions.filter((question) => question.difficulty === difficulty),
      `${seed}:${attempt}:${difficulty}`,
    );
    // 재응시 시 직전 시도의 문제와 겹침을 줄입니다. 풀이 부족하면 전체 풀로 되돌립니다.
    const fresh = pool.filter((question) => !recentIds.includes(question.id));
    return (fresh.length >= girlsGenerationQuota[difficulty] ? fresh : pool).slice(0, girlsGenerationQuota[difficulty]);
  });
}

export function createGirlsGenerationSession(seed: string, recentIds: string[] = []): GirlsGenerationPresentedQuestion[] {
  // 제약을 만족하는 조합을 최대 100회 시도하고, 실패 시 maxPerCategory만 4→5로 완화해 50회 더 시도합니다.
  // 난이도 5·6·4 비율과 문제 중복 금지는 완화하지 않습니다.
  let selected: GirlsGenerationQuestion[] | null = null;
  for (let attempt = 0; attempt < 150; attempt += 1) {
    const candidate = pick(seed, attempt, recentIds);
    const maxPerCategory = attempt < 100 ? girlsGenerationSelectionLimits.maxPerCategory : girlsGenerationSelectionLimits.maxPerCategory + 1;
    if (valid(candidate, maxPerCategory)) {
      selected = candidate;
      break;
    }
  }
  if (!selected) throw new Error("소녀시대 퀴즈 세션 생성에 실패했습니다.");
  return seededGirlsGenerationShuffle(selected, `${seed}:questions`).map((question) => {
    const optionOrder = seededGirlsGenerationShuffle([0, 1, 2, 3], `${seed}:${question.id}:options`);
    return {
      ...question,
      originalId: question.id,
      prompt: question.question,
      choices: optionOrder.map((index) => question.options[index]),
      optionOrder,
    };
  });
}

export function calculateGirlsGenerationResult(answers: GirlsGenerationAnswer[]) {
  const reviews = answers.flatMap((answer) => {
    const question = getGirlsGenerationQuestion(answer.questionId);
    return question ? [{ question, choice: answer.choice, correct: answer.choice === question.answerIndex }] : [];
  });
  const score = reviews.filter((review) => review.correct).length;
  const byDifficulty = (Object.keys(girlsGenerationQuota) as GirlsGenerationDifficulty[]).map((difficulty) => ({
    difficulty,
    total: girlsGenerationQuota[difficulty],
    correct: reviews.filter((review) => review.question.difficulty === difficulty && review.correct).length,
  }));
  return {
    score,
    accuracy: Math.round((score / GIRLS_GENERATION_QUIZ_SIZE) * 100),
    grade: getGirlsGenerationGrade(score),
    reviews,
    byDifficulty,
  };
}

export function encodeGirlsGenerationAnswers(answers: GirlsGenerationAnswer[]) {
  return answers.map((answer) => `${answer.questionId}.${answer.choice}`).join("-");
}

export function parseGirlsGenerationAnswers(raw?: string): GirlsGenerationAnswer[] | null {
  if (!raw) return null;
  const answers = raw.split("-").map((token) => {
    const [questionId, choice] = token.split(".");
    return { questionId, choice: Number(choice) };
  });
  return answers.length === GIRLS_GENERATION_QUIZ_SIZE &&
    new Set(answers.map((answer) => answer.questionId)).size === GIRLS_GENERATION_QUIZ_SIZE &&
    answers.every((answer) => getGirlsGenerationQuestion(answer.questionId) && Number.isInteger(answer.choice) && answer.choice >= 0 && answer.choice < 4)
    ? answers
    : null;
}
