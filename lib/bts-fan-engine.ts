import {
  BTS_FAN_QUIZ_SIZE,
  btsDifficultyQuota,
  btsFanQuestions,
  getBtsFanGrade,
  getBtsQuestion,
  validateBtsQuestionBank,
} from "@/data/bts-fan";
import type {
  BtsFanAnswer,
  BtsFanGradeProfile,
  BtsPresentedQuestion,
  BtsQuestionDifficulty,
  BtsQuizQuestion,
} from "@/lib/types";

export { BTS_FAN_QUIZ_SIZE } from "@/data/bts-fan";

const RECENT_STORAGE_KEY = "mimi-bts-fan-quiz-recent";
const RECENT_LIMIT = 30;

function randomInt(max: number) {
  if (max <= 0) return 0;
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
  }
  return Math.floor(Math.random() * max);
}

function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function shuffleBtsOptions(question: BtsQuizQuestion): BtsPresentedQuestion {
  const optionOrder = shuffle(question.choices.map((_, index) => index));
  const choices = optionOrder.map((index) => question.choices[index]);
  const correctAnswer = optionOrder.indexOf(question.correctAnswer);
  if (correctAnswer < 0) throw new Error(`보기 셔플에 실패했습니다: ${question.id}`);
  return { ...question, originalId: question.id, choices, correctAnswer, optionOrder };
}

function pickByDifficulty(
  difficulty: BtsQuestionDifficulty,
  count: number,
  selected: BtsQuizQuestion[],
  recentIds: string[],
) {
  const pool = shuffle(btsFanQuestions.filter((question) => question.difficulty === difficulty));
  const fresh = pool.filter((question) => !recentIds.includes(question.id));
  const candidates = fresh.length >= count ? fresh : pool;

  // 카테고리가 한쪽으로 몰리지 않도록 아직 안 나온 카테고리를 우선 선택합니다.
  const picked: BtsQuizQuestion[] = [];
  const seenCategories = new Set(selected.map((question) => question.category));
  const diverseFirst = [...candidates].sort(
    (a, b) => Number(seenCategories.has(a.category)) - Number(seenCategories.has(b.category)),
  );
  for (const question of diverseFirst) {
    if (picked.length >= count) break;
    if (picked.some((item) => item.id === question.id)) continue;
    picked.push(question);
    seenCategories.add(question.category);
  }
  if (picked.length !== count) throw new Error(`BTS ${difficulty} 문항이 부족합니다. (필요 ${count}, 선택 ${picked.length})`);
  return picked;
}

export function selectBtsQuestions(recentIds: string[] = []): BtsPresentedQuestion[] {
  validateBtsQuestionBank();
  const selected: BtsQuizQuestion[] = [];
  selected.push(...pickByDifficulty("easy", btsDifficultyQuota.easy, selected, recentIds));
  selected.push(...pickByDifficulty("medium", btsDifficultyQuota.medium, selected, recentIds));
  selected.push(...pickByDifficulty("hard", btsDifficultyQuota.hard, selected, recentIds));
  if (selected.length !== BTS_FAN_QUIZ_SIZE) throw new Error(`BTS 퀴즈는 ${BTS_FAN_QUIZ_SIZE}문항이어야 합니다.`);
  return shuffle(selected).map(shuffleBtsOptions);
}

export function loadRecentBtsQuestionIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(RECENT_STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function saveRecentBtsQuestionIds(newIds: string[]) {
  if (typeof window === "undefined") return;
  try {
    const merged = [...newIds, ...loadRecentBtsQuestionIds().filter((id) => !newIds.includes(id))].slice(0, RECENT_LIMIT);
    window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // localStorage 접근 실패는 퀴즈 진행에 영향을 주지 않도록 무시합니다.
  }
}

export type BtsFanQuizResultData = {
  score: number;
  total: number;
  easyCorrect: number;
  mediumCorrect: number;
  hardCorrect: number;
  grade: BtsFanGradeProfile;
  wrong: { question: BtsQuizQuestion; choice: number }[];
  categoryRates: { label: string; correct: number; total: number; rate: number }[];
};

export function calculateBtsFanResult(answers: BtsFanAnswer[]): BtsFanQuizResultData {
  let score = 0;
  let easyCorrect = 0;
  let mediumCorrect = 0;
  let hardCorrect = 0;
  const wrong: BtsFanQuizResultData["wrong"] = [];
  const categories = new Map<string, { correct: number; total: number }>();

  for (const answer of answers) {
    const question = getBtsQuestion(answer.questionId);
    if (!question) continue;
    const isCorrect = answer.choice === question.correctAnswer;
    const current = categories.get(question.category) ?? { correct: 0, total: 0 };
    current.total += 1;
    if (isCorrect) current.correct += 1;
    categories.set(question.category, current);

    if (isCorrect) {
      score += 1;
      if (question.difficulty === "easy") easyCorrect += 1;
      if (question.difficulty === "medium") mediumCorrect += 1;
      if (question.difficulty === "hard") hardCorrect += 1;
    } else {
      wrong.push({ question, choice: answer.choice });
    }
  }

  const categoryRates = [...categories.entries()].map(([label, value]) => ({
    label,
    ...value,
    rate: value.total > 0 ? Math.round((value.correct / value.total) * 100) : 0,
  }));

  return { score, total: answers.length, easyCorrect, mediumCorrect, hardCorrect, grade: getBtsFanGrade(score), wrong, categoryRates };
}

export function encodeBtsAnswers(answers: BtsFanAnswer[]): string {
  return answers.map((answer) => `${answer.questionId}.${answer.choice}`).join("-");
}

export function parseBtsAnswers(raw?: string): BtsFanAnswer[] | null {
  if (!raw) return null;
  const tokens = raw.split("-");
  if (tokens.length !== BTS_FAN_QUIZ_SIZE) return null;
  const seen = new Set<string>();
  const answers: BtsFanAnswer[] = [];
  for (const token of tokens) {
    const [questionId, rawChoice] = token.split(".");
    const choice = Number(rawChoice);
    const question = questionId ? getBtsQuestion(questionId) : undefined;
    if (!question || seen.has(question.id) || !Number.isInteger(choice) || choice < 0 || choice >= question.choices.length) return null;
    seen.add(question.id);
    answers.push({ questionId: question.id, choice });
  }
  return answers;
}

export function btsFanResultPath(slug: string) {
  return `/bts-fan-test/result/${slug}`;
}
