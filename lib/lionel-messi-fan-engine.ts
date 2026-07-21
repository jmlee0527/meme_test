import { MESSI_QUIZ_SIZE, getMessiGrade, getMessiQuestion, messiQuestions, messiQuota } from "@/data/lionel-messi-fan";
import type { MessiDifficulty, MessiQuestion } from "@/data/lionel-messi-fan";

export type MessiPresentedQuestion = Omit<MessiQuestion, "question" | "options"> & {
  originalId: string;
  prompt: string;
  choices: string[];
  optionOrder: number[];
};

export type MessiAnswer = { questionId: string; choice: number };

function hash(seed: string) {
  let value = 2166136261;
  for (let index = 0; index < seed.length; index++) value = Math.imul(value ^ seed.charCodeAt(index), 16777619);
  return value >>> 0;
}

function rng(seed: string) {
  let state = hash(seed) || 1;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededMessiShuffle<T>(items: readonly T[], seed: string) {
  const random = rng(seed);
  const array = [...items];
  for (let index = array.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(random() * (index + 1));
    [array[index], array[swapIndex]] = [array[swapIndex], array[index]];
  }
  return array;
}

const areaMatchers = {
  barcelona: ["바르셀로나", "라리가", "챔피언스리그", "헤타페", "엘클라시코", "500골", "600골"],
  argentina: ["아르헨티나", "U20", "대표팀", "월드컵", "올림픽", "코파아메리카", "피날리시마"],
  psg: ["PSG"],
  interMiami: ["인터마이애미", "현재소속"],
  awards: ["발롱도르", "개인수상", "골든슈"],
} as const;

function hasArea(question: MessiQuestion, area: keyof typeof areaMatchers) {
  return question.tags.some((tag) => (areaMatchers[area] as readonly string[]).includes(tag));
}

function validSession(items: MessiQuestion[], relaxed = false) {
  if (items.length !== MESSI_QUIZ_SIZE) return false;
  if (new Set(items.map((question) => question.factGroup)).size !== items.length) return false;
  if (!hasMinimumAreas(items)) return false;
  const numericRecordCount = items.filter((question) => question.tags.some((tag) => ["기록", "득점", "시즌기록", "수상", "개인수상"].includes(tag))).length;
  if (!relaxed && numericRecordCount > 4) return false;
  return true;
}

function hasMinimumAreas(items: MessiQuestion[]) {
  return hasAny(items, "barcelona") && hasAny(items, "argentina") && hasAny(items, "psg") && hasAny(items, "interMiami");
}

function hasAny(items: MessiQuestion[], area: keyof typeof areaMatchers) {
  return items.some((question) => hasArea(question, area));
}

function candidate(seed: string, attempt: number, recentIds: string[]) {
  const picked: MessiQuestion[] = [];
  for (const difficulty of Object.keys(messiQuota) as MessiDifficulty[]) {
    const pool = seededMessiShuffle(messiQuestions.filter((question) => question.difficulty === difficulty), `${seed}:${attempt}:${difficulty}`);
    const ordered = [...pool.filter((question) => !recentIds.includes(question.id)), ...pool.filter((question) => recentIds.includes(question.id))];
    for (const question of ordered) {
      if (picked.some((item) => item.factGroup === question.factGroup)) continue;
      picked.push(question);
      if (picked.filter((item) => item.difficulty === difficulty).length === messiQuota[difficulty]) break;
    }
  }
  return picked;
}

export function createMessiSession(seed: string, recentIds: string[] = []): MessiPresentedQuestion[] {
  let selected: MessiQuestion[] | null = null;
  for (let attempt = 0; attempt < 1500; attempt++) {
    const picked = candidate(seed, attempt, recentIds);
    if (validSession(picked, attempt >= 1000)) {
      selected = picked;
      break;
    }
  }
  if (!selected) throw new Error("리오넬 메시 퀴즈 세션 생성 실패");
  return seededMessiShuffle(selected, `${seed}:questions`).map((question) => {
    const optionOrder = seededMessiShuffle([0, 1, 2, 3], `${seed}:${question.id}:options`);
    return {
      ...question,
      originalId: question.id,
      prompt: question.question,
      choices: optionOrder.map((index) => question.options[index]),
      optionOrder,
    };
  });
}

export function calculateMessiResult(answers: MessiAnswer[]) {
  const reviews = answers.flatMap((answer) => {
    const question = getMessiQuestion(answer.questionId);
    return question ? [{ question, choice: answer.choice, correct: answer.choice === question.answerIndex }] : [];
  });
  const score = reviews.filter((review) => review.correct).length;
  const byDifficulty = (Object.keys(messiQuota) as MessiDifficulty[]).map((difficulty) => ({
    difficulty,
    total: messiQuota[difficulty],
    correct: reviews.filter((review) => review.question.difficulty === difficulty && review.correct).length,
  }));
  return {
    score,
    accuracy: Math.round((score / MESSI_QUIZ_SIZE) * 100),
    grade: getMessiGrade(score),
    reviews,
    byDifficulty,
  };
}

export const encodeMessiAnswers = (answers: MessiAnswer[]) => answers.map((answer) => `${answer.questionId}.${answer.choice}`).join("-");

export function parseMessiAnswers(raw?: string): MessiAnswer[] | null {
  if (!raw) return null;
  const answers = raw.split("-").map((token) => {
    const [questionId, choice] = token.split(".");
    return { questionId, choice: Number(choice) };
  });
  return answers.length === MESSI_QUIZ_SIZE &&
    new Set(answers.map((answer) => answer.questionId)).size === MESSI_QUIZ_SIZE &&
    answers.every((answer) => getMessiQuestion(answer.questionId) && Number.isInteger(answer.choice) && answer.choice >= 0 && answer.choice < 4)
    ? answers
    : null;
}
