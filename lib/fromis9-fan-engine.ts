import {
  FROMIS9_FAN_QUIZ_SIZE,
  fromis9DifficultyQuota,
  fromis9FanQuestions,
  getFromis9FanGrade,
  getFromis9Question,
  validateFromis9QuestionBank,
} from "@/data/fromis9-fan";
import type {
  Fromis9FanAnswer,
  Fromis9FanGradeProfile,
  Fromis9PresentedQuestion,
  Fromis9QuestionDifficulty,
  Fromis9QuizQuestion,
} from "@/lib/types";

export { FROMIS9_FAN_QUIZ_SIZE } from "@/data/fromis9-fan";

const RECENT_STORAGE_KEY = "mimi-fromis9-fan-quiz-recent";
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

export function shuffleFromis9Options(question: Fromis9QuizQuestion): Fromis9PresentedQuestion {
  const optionOrder = shuffle(question.choices.map((_, index) => index));
  const choices = optionOrder.map((index) => question.choices[index]);
  const correctAnswer = optionOrder.indexOf(question.correctAnswer);
  if (correctAnswer < 0) throw new Error(`보기 셔플에 실패했습니다: ${question.id}`);
  return { ...question, originalId: question.id, choices, correctAnswer, optionOrder };
}

function pickByDifficulty(
  difficulty: Fromis9QuestionDifficulty,
  count: number,
  selected: Fromis9QuizQuestion[],
  recentIds: string[],
) {
  const pool = shuffle(fromis9FanQuestions.filter((question) => question.difficulty === difficulty));
  const fresh = pool.filter((question) => !recentIds.includes(question.id));
  const candidates = fresh.length >= count ? fresh : pool;

  // 카테고리가 한쪽으로 몰리지 않도록 아직 안 나온 카테고리를 우선 선택합니다.
  const picked: Fromis9QuizQuestion[] = [];
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
  if (picked.length !== count) throw new Error(`프로미스나인 ${difficulty} 문항이 부족합니다. (필요 ${count}, 선택 ${picked.length})`);
  return picked;
}

export function selectFromis9Questions(recentIds: string[] = []): Fromis9PresentedQuestion[] {
  validateFromis9QuestionBank();
  const selected: Fromis9QuizQuestion[] = [];
  selected.push(...pickByDifficulty("easy", fromis9DifficultyQuota.easy, selected, recentIds));
  selected.push(...pickByDifficulty("medium", fromis9DifficultyQuota.medium, selected, recentIds));
  selected.push(...pickByDifficulty("hard", fromis9DifficultyQuota.hard, selected, recentIds));
  if (selected.length !== FROMIS9_FAN_QUIZ_SIZE) throw new Error(`프로미스나인 퀴즈는 ${FROMIS9_FAN_QUIZ_SIZE}문항이어야 합니다.`);
  return shuffle(selected).map(shuffleFromis9Options);
}

export function loadRecentFromis9QuestionIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(RECENT_STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function saveRecentFromis9QuestionIds(newIds: string[]) {
  if (typeof window === "undefined") return;
  try {
    const merged = [...newIds, ...loadRecentFromis9QuestionIds().filter((id) => !newIds.includes(id))].slice(0, RECENT_LIMIT);
    window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // localStorage 접근 실패는 퀴즈 진행에 영향을 주지 않도록 무시합니다.
  }
}

export type Fromis9FanQuizResultData = {
  score: number;
  total: number;
  easyCorrect: number;
  mediumCorrect: number;
  hardCorrect: number;
  grade: Fromis9FanGradeProfile;
  wrong: { question: Fromis9QuizQuestion; choice: number }[];
  categoryRates: { label: string; correct: number; total: number; rate: number }[];
};

export function calculateFromis9FanResult(answers: Fromis9FanAnswer[]): Fromis9FanQuizResultData {
  let score = 0;
  let easyCorrect = 0;
  let mediumCorrect = 0;
  let hardCorrect = 0;
  const wrong: Fromis9FanQuizResultData["wrong"] = [];
  const categories = new Map<string, { correct: number; total: number }>();

  for (const answer of answers) {
    const question = getFromis9Question(answer.questionId);
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

  return { score, total: answers.length, easyCorrect, mediumCorrect, hardCorrect, grade: getFromis9FanGrade(score), wrong, categoryRates };
}

export function encodeFromis9Answers(answers: Fromis9FanAnswer[]): string {
  return answers.map((answer) => `${answer.questionId}.${answer.choice}`).join("-");
}

export function parseFromis9Answers(raw?: string): Fromis9FanAnswer[] | null {
  if (!raw) return null;
  const tokens = raw.split("-");
  if (tokens.length !== FROMIS9_FAN_QUIZ_SIZE) return null;
  const seen = new Set<string>();
  const answers: Fromis9FanAnswer[] = [];
  for (const token of tokens) {
    const [questionId, rawChoice] = token.split(".");
    const choice = Number(rawChoice);
    const question = questionId ? getFromis9Question(questionId) : undefined;
    if (!question || seen.has(question.id) || !Number.isInteger(choice) || choice < 0 || choice >= question.choices.length) return null;
    seen.add(question.id);
    answers.push({ questionId: question.id, choice });
  }
  return answers;
}

export function fromis9FanResultPath(slug: string) {
  return `/fromis9-fan-test/result/${slug}`;
}
