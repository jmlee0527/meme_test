import {
  YOUNGTAK_FAN_MAX_SCORE,
  YOUNGTAK_FAN_QUIZ_SIZE,
  getYoungtakFanGrade,
  getYoungtakQuestion,
  validateYoungtakQuestionBank,
  youngtakCategoryLabels,
  youngtakDifficultyScores,
  youngtakFanQuestions,
} from "@/data/youngtak-fan";
import type {
  YoungtakFanAnswer,
  YoungtakPresentedQuestion,
  YoungtakQuestionCategory,
  YoungtakQuestionDifficulty,
  YoungtakQuizQuestion,
} from "@/lib/types";

export { YOUNGTAK_FAN_MAX_SCORE, YOUNGTAK_FAN_QUIZ_SIZE } from "@/data/youngtak-fan";

const RECENT_STORAGE_KEY = "mimi-youngtak-fan-quiz-recent";
const RECENT_LIMIT = 36;

export type YoungtakSelectionConfig = {
  easyCount: number;
  mediumCount: number;
  hardCount: number;
  expertCount: number;
  maxPerCategory: number;
  minimumCategoryCount: number;
};

export const defaultYoungtakSelectionConfig: YoungtakSelectionConfig = {
  easyCount: 4,
  mediumCount: 6,
  hardCount: 4,
  expertCount: 1,
  maxPerCategory: 2,
  minimumCategoryCount: 9,
};

function randomInt(max: number) {
  if (max <= 0) return 0;
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
  }
  return Math.floor(Math.random() * max);
}

export function shuffleYoungtak<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function shuffleYoungtakOptions(question: YoungtakQuizQuestion): YoungtakPresentedQuestion {
  const optionOrder = shuffleYoungtak(question.options.map((_, index) => index));
  const options = optionOrder.map((index) => question.options[index]);
  const correctAnswer = optionOrder.indexOf(question.correctAnswer);
  if (correctAnswer < 0) throw new Error(`Failed to shuffle Youngtak options for ${question.id}`);
  return { ...question, originalId: question.id, options, correctAnswer, optionOrder };
}

function categoryCounts(questions: Pick<YoungtakQuizQuestion, "category">[]) {
  return questions.reduce((acc, question) => {
    acc[question.category] = (acc[question.category] ?? 0) + 1;
    return acc;
  }, {} as Partial<Record<YoungtakQuestionCategory, number>>);
}

function canAddQuestion(selected: YoungtakQuizQuestion[], question: YoungtakQuizQuestion, config: YoungtakSelectionConfig) {
  const counts = categoryCounts(selected);
  return (counts[question.category] ?? 0) < config.maxPerCategory;
}

function pickByDifficulty(
  difficulty: YoungtakQuestionDifficulty,
  count: number,
  selected: YoungtakQuizQuestion[],
  recentIds: string[],
  config: YoungtakSelectionConfig,
) {
  const pool = shuffleYoungtak(youngtakFanQuestions.filter((question) => question.difficulty === difficulty));
  const fresh = pool.filter((question) => !recentIds.includes(question.id));
  const candidates = fresh.length >= count ? fresh : pool;
  const picked: YoungtakQuizQuestion[] = [];

  for (const question of candidates) {
    if (picked.length >= count) break;
    if (selected.some((item) => item.id === question.id) || picked.some((item) => item.id === question.id)) continue;
    if (!canAddQuestion([...selected, ...picked], question, config)) continue;
    picked.push(question);
  }

  if (picked.length < count) {
    for (const question of candidates) {
      if (picked.length >= count) break;
      if (selected.some((item) => item.id === question.id) || picked.some((item) => item.id === question.id)) continue;
      picked.push(question);
    }
  }

  if (picked.length !== count) throw new Error(`Not enough ${difficulty} Youngtak questions. Needed ${count}, picked ${picked.length}.`);
  return picked;
}

function improveCategoryDiversity(selected: YoungtakQuizQuestion[], config: YoungtakSelectionConfig) {
  let next = [...selected];
  if (new Set(next.map((question) => question.category)).size >= config.minimumCategoryCount) return next;

  const selectedIds = new Set(next.map((question) => question.id));
  const candidates = shuffleYoungtak(youngtakFanQuestions)
    .filter((question) => !selectedIds.has(question.id))
    .filter((question) => !next.some((item) => item.category === question.category));

  for (const candidate of candidates) {
    const counts = categoryCounts(next);
    const replaceIndex = next.findIndex((question) =>
      question.difficulty === candidate.difficulty &&
      (counts[question.category] ?? 0) > 1 &&
      !next.some((item) => item.category === candidate.category)
    );
    if (replaceIndex >= 0) {
      next = next.map((question, index) => (index === replaceIndex ? candidate : question));
      if (new Set(next.map((question) => question.category)).size >= config.minimumCategoryCount) break;
    }
  }
  return next;
}

function arrangeYoungtakQuestions(selected: YoungtakQuizQuestion[]) {
  const firstPool = shuffleYoungtak(selected.filter((question) => question.difficulty === "easy" || question.difficulty === "medium"));
  const firstThree = firstPool.slice(0, 3);
  if (firstThree.length !== 3) throw new Error("Youngtak quiz needs three easy/medium opening questions.");

  const firstIds = new Set(firstThree.map((question) => question.id));
  const expert = selected.find((question) => question.difficulty === "expert");
  if (!expert) throw new Error("Youngtak quiz must include one expert question.");

  const withoutOpeningAndExpert = shuffleYoungtak(selected.filter((question) => !firstIds.has(question.id) && question.id !== expert.id));
  const sequence = [...firstThree, ...withoutOpeningAndExpert];
  const insertIndex = 8 + randomInt(Math.max(sequence.length - 8, 1));
  sequence.splice(Math.min(insertIndex, sequence.length), 0, expert);

  const last = sequence[sequence.length - 1];
  if (last.difficulty === "easy" || last.difficulty === "expert") {
    const swapIndex = sequence.findIndex((question, index) => index >= 3 && index < sequence.length - 1 && (question.difficulty === "medium" || question.difficulty === "hard"));
    if (swapIndex >= 0) [sequence[swapIndex], sequence[sequence.length - 1]] = [sequence[sequence.length - 1], sequence[swapIndex]];
  }

  return sequence;
}

function countDifficulties(questions: Pick<YoungtakQuizQuestion, "difficulty">[]) {
  return questions.reduce((acc, question) => {
    acc[question.difficulty] += 1;
    return acc;
  }, { easy: 0, medium: 0, hard: 0, expert: 0 } as Record<YoungtakQuestionDifficulty, number>);
}

export function selectYoungtakQuestions(config = defaultYoungtakSelectionConfig, recentIds: string[] = []): YoungtakPresentedQuestion[] {
  validateYoungtakQuestionBank();
  let selected: YoungtakQuizQuestion[] = [];
  selected.push(...pickByDifficulty("easy", config.easyCount, selected, recentIds, config));
  selected.push(...pickByDifficulty("medium", config.mediumCount, selected, recentIds, config));
  selected.push(...pickByDifficulty("hard", config.hardCount, selected, recentIds, config));
  selected.push(...pickByDifficulty("expert", config.expertCount, selected, recentIds, config));
  selected = improveCategoryDiversity(selected, config);

  if (selected.length !== YOUNGTAK_FAN_QUIZ_SIZE) throw new Error(`Youngtak quiz must select ${YOUNGTAK_FAN_QUIZ_SIZE} questions.`);
  const difficultyCounts = countDifficulties(selected);
  if (
    difficultyCounts.easy !== config.easyCount ||
    difficultyCounts.medium !== config.mediumCount ||
    difficultyCounts.hard !== config.hardCount ||
    difficultyCounts.expert !== config.expertCount
  ) {
    throw new Error(`Invalid Youngtak difficulty selection: ${JSON.stringify(difficultyCounts)}`);
  }
  const totalScore = selected.reduce((sum, question) => sum + youngtakDifficultyScores[question.difficulty], 0);
  if (totalScore !== YOUNGTAK_FAN_MAX_SCORE) throw new Error(`Youngtak quiz score must be ${YOUNGTAK_FAN_MAX_SCORE}. Current: ${totalScore}`);
  const maxCategoryCount = Math.max(...Object.values(categoryCounts(selected)));
  if (maxCategoryCount > config.maxPerCategory) throw new Error(`Youngtak category cap exceeded: ${maxCategoryCount}`);

  return arrangeYoungtakQuestions(selected).map(shuffleYoungtakOptions);
}

export function loadRecentYoungtakQuestionIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(RECENT_STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function saveRecentYoungtakQuestionIds(newIds: string[]) {
  if (typeof window === "undefined") return;
  try {
    const merged = [...newIds, ...loadRecentYoungtakQuestionIds().filter((id) => !newIds.includes(id))].slice(0, RECENT_LIMIT);
    window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // localStorage 접근 실패는 퀴즈 진행에는 영향을 주지 않도록 무시합니다.
  }
}

export type YoungtakFanQuizResult = {
  fanIndex: number;
  totalCorrect: number;
  total: number;
  weightedScore: number;
  maxScore: number;
  easyCorrect: number;
  mediumCorrect: number;
  hardCorrect: number;
  expertCorrect: number;
  grade: ReturnType<typeof getYoungtakFanGrade>;
  wrong: { question: YoungtakQuizQuestion; choice: number }[];
  reviews: { question: YoungtakQuizQuestion; choice: number; isCorrect: boolean }[];
  categoryRates: { label: string; correct: number; total: number; rate: number }[];
};

export function calculateYoungtakFanIndex(answers: YoungtakFanAnswer[]): YoungtakFanQuizResult {
  let totalCorrect = 0;
  let weightedScore = 0;
  let easyCorrect = 0;
  let mediumCorrect = 0;
  let hardCorrect = 0;
  let expertCorrect = 0;
  const wrong: YoungtakFanQuizResult["wrong"] = [];
  const reviews: YoungtakFanQuizResult["reviews"] = [];
  const categories = new Map<string, { correct: number; total: number }>();

  for (const answer of answers) {
    const question = getYoungtakQuestion(answer.questionId);
    if (!question) continue;
    const isCorrect = answer.choice === question.correctAnswer;
    const group = youngtakCategoryLabels[question.category];
    const current = categories.get(group) ?? { correct: 0, total: 0 };
    current.total += 1;
    if (isCorrect) current.correct += 1;
    categories.set(group, current);

    reviews.push({ question, choice: answer.choice, isCorrect });
    if (isCorrect) {
      totalCorrect += 1;
      weightedScore += youngtakDifficultyScores[question.difficulty];
      if (question.difficulty === "easy") easyCorrect += 1;
      if (question.difficulty === "medium") mediumCorrect += 1;
      if (question.difficulty === "hard") hardCorrect += 1;
      if (question.difficulty === "expert") expertCorrect += 1;
    } else {
      wrong.push({ question, choice: answer.choice });
    }
  }

  const fanIndex = Math.max(0, Math.min(100, Math.round(weightedScore)));
  const categoryRates = [...categories.entries()].map(([label, value]) => ({
    label,
    ...value,
    rate: value.total > 0 ? Math.round((value.correct / value.total) * 100) : 0,
  }));

  return {
    fanIndex,
    totalCorrect,
    total: answers.length,
    weightedScore,
    maxScore: YOUNGTAK_FAN_MAX_SCORE,
    easyCorrect,
    mediumCorrect,
    hardCorrect,
    expertCorrect,
    grade: getYoungtakFanGrade(fanIndex),
    wrong,
    reviews,
    categoryRates,
  };
}

export function encodeYoungtakAnswers(answers: YoungtakFanAnswer[]): string {
  return answers.map((answer) => `${answer.questionId}.${answer.choice}`).join("-");
}

export function parseYoungtakAnswers(raw?: string): YoungtakFanAnswer[] | null {
  if (!raw) return null;
  const tokens = raw.split("-");
  if (tokens.length !== YOUNGTAK_FAN_QUIZ_SIZE) return null;
  const seen = new Set<string>();
  const answers: YoungtakFanAnswer[] = [];
  for (const token of tokens) {
    const [questionId, rawChoice] = token.split(".");
    const choice = Number(rawChoice);
    const question = questionId ? getYoungtakQuestion(questionId) : undefined;
    if (!question || seen.has(question.id) || !Number.isInteger(choice) || choice < 0 || choice >= question.options.length) return null;
    seen.add(question.id);
    answers.push({ questionId: question.id, choice });
  }
  return answers;
}

export function youngtakFanResultPath(slug: string) {
  return `/youngtak-fan-test/result/${slug}`;
}
