import {
  ARSENAL_FAN_MAX_RAW_SCORE,
  ARSENAL_FAN_QUIZ_SIZE,
  arsenalCategoryLabels,
  arsenalDifficultyWeights,
  arsenalFanQuestions,
  getArsenalFanGrade,
  getArsenalQuestion,
  validateArsenalQuestionBank,
} from "@/data/arsenal-fan";
import type {
  ArsenalFanAnswer,
  ArsenalPresentedQuestion,
  ArsenalQuestionCategory,
  ArsenalQuestionDifficulty,
  ArsenalQuizQuestion,
} from "@/lib/types";

export { ARSENAL_FAN_MAX_RAW_SCORE, ARSENAL_FAN_QUIZ_SIZE } from "@/data/arsenal-fan";

const RECENT_STORAGE_KEY = "mimi-arsenal-fan-quiz-recent";
const RECENT_LIMIT = 30;

export type ArsenalSelectionConfig = {
  easyCount: number;
  mediumCount: number;
  hardCount: number;
  maxMatchQuestions: number;
  maxCurrentSeasonQuestions: number;
  minimumCategoryCount: number;
};

export const defaultArsenalSelectionConfig: ArsenalSelectionConfig = {
  easyCount: 5,
  mediumCount: 6,
  hardCount: 4,
  maxMatchQuestions: 3,
  maxCurrentSeasonQuestions: 3,
  minimumCategoryCount: 6,
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

export function shuffleArsenal<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function shuffleArsenalOptions(question: ArsenalQuizQuestion): ArsenalPresentedQuestion {
  const order = shuffleArsenal(question.options.map((_, index) => index));
  const options = order.map((index) => question.options[index]);
  const correctAnswer = order.indexOf(question.correctAnswer);
  if (correctAnswer < 0) throw new Error(`Failed to shuffle options for ${question.id}`);
  return { ...question, originalId: question.id, options, correctAnswer, optionOrder: order };
}

function wouldViolateLimits(selected: ArsenalQuizQuestion[], question: ArsenalQuizQuestion, config: ArsenalSelectionConfig) {
  const withQuestion = [...selected, question];
  const matchCount = withQuestion.filter((item) => item.kind === "match-score").length;
  const currentSeasonCount = withQuestion.filter((item) => item.isTimeSensitive).length;
  const lastThreePlayers = withQuestion.slice(-3).every((item) => item.category === "player");
  return matchCount > config.maxMatchQuestions || currentSeasonCount > config.maxCurrentSeasonQuestions || lastThreePlayers;
}

function pickByDifficulty(
  difficulty: ArsenalQuestionDifficulty,
  count: number,
  selected: ArsenalQuizQuestion[],
  recentIds: string[],
  config: ArsenalSelectionConfig,
) {
  const pool = shuffleArsenal(arsenalFanQuestions.filter((question) => question.difficulty === difficulty));
  const fresh = pool.filter((question) => !recentIds.includes(question.id));
  const candidates = fresh.length >= count ? fresh : pool;
  const picked: ArsenalQuizQuestion[] = [];

  const categorySeen = new Set(selected.map((question) => question.category));
  const diverseFirst = [...candidates].sort((a, b) => Number(categorySeen.has(a.category)) - Number(categorySeen.has(b.category)));
  for (const question of diverseFirst) {
    if (picked.length >= count) break;
    if (selected.some((item) => item.id === question.id) || picked.some((item) => item.id === question.id)) continue;
    if (wouldViolateLimits([...selected, ...picked], question, config)) continue;
    picked.push(question);
  }

  if (picked.length < count) {
    for (const question of candidates) {
      if (picked.length >= count) break;
      if (selected.some((item) => item.id === question.id) || picked.some((item) => item.id === question.id)) continue;
      picked.push(question);
    }
  }

  if (picked.length !== count) throw new Error(`Not enough ${difficulty} Arsenal questions. Needed ${count}, picked ${picked.length}.`);
  return picked;
}

export function selectArsenalQuestions(config = defaultArsenalSelectionConfig, recentIds: string[] = []): ArsenalPresentedQuestion[] {
  validateArsenalQuestionBank();
  const selected: ArsenalQuizQuestion[] = [];
  selected.push(...pickByDifficulty("easy", config.easyCount, selected, recentIds, config));
  selected.push(...pickByDifficulty("medium", config.mediumCount, selected, recentIds, config));
  selected.push(...pickByDifficulty("hard", config.hardCount, selected, recentIds, config));

  const categoryCount = new Set(selected.map((question) => question.category)).size;
  if (categoryCount < config.minimumCategoryCount) {
    const selectedIds = new Set(selected.map((question) => question.id));
    const missingCategoryCandidates = shuffleArsenal(arsenalFanQuestions)
      .filter((question) => !selectedIds.has(question.id))
      .filter((question) => !selected.some((item) => item.category === question.category));
    for (const candidate of missingCategoryCandidates) {
      const replaceIndex = selected.findIndex((question) => question.difficulty === candidate.difficulty && selected.filter((item) => item.category === question.category).length > 1);
      if (replaceIndex >= 0) {
        selected[replaceIndex] = candidate;
        if (new Set(selected.map((question) => question.category)).size >= config.minimumCategoryCount) break;
      }
    }
  }

  if (selected.length !== ARSENAL_FAN_QUIZ_SIZE) throw new Error(`Arsenal quiz must select ${ARSENAL_FAN_QUIZ_SIZE} questions.`);
  const finalQuestions = shuffleArsenal(selected).map(shuffleArsenalOptions);
  const difficultyCounts = countDifficulties(finalQuestions);
  if (difficultyCounts.easy !== config.easyCount || difficultyCounts.medium !== config.mediumCount || difficultyCounts.hard !== config.hardCount) {
    throw new Error(`Invalid Arsenal difficulty selection: ${JSON.stringify(difficultyCounts)}`);
  }
  return finalQuestions;
}

export function loadRecentArsenalQuestionIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(RECENT_STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function saveRecentArsenalQuestionIds(newIds: string[]) {
  if (typeof window === "undefined") return;
  try {
    const merged = [...newIds, ...loadRecentArsenalQuestionIds().filter((id) => !newIds.includes(id))].slice(0, RECENT_LIMIT);
    window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // localStorage 접근 실패는 퀴즈 진행에는 영향을 주지 않도록 무시합니다.
  }
}

function countDifficulties(questions: Pick<ArsenalQuizQuestion, "difficulty">[]) {
  return questions.reduce((acc, question) => {
    acc[question.difficulty] += 1;
    return acc;
  }, { easy: 0, medium: 0, hard: 0 } as Record<ArsenalQuestionDifficulty, number>);
}

export type ArsenalFanQuizResult = {
  fanIndex: number;
  totalCorrect: number;
  total: number;
  weightedScore: number;
  maxScore: number;
  easyCorrect: number;
  mediumCorrect: number;
  hardCorrect: number;
  grade: ReturnType<typeof getArsenalFanGrade>;
  wrong: { question: ArsenalQuizQuestion; choice: number }[];
  reviews: { question: ArsenalQuizQuestion; choice: number; isCorrect: boolean }[];
  categoryRates: { label: string; correct: number; total: number; rate: number }[];
};

export function calculateArsenalFanIndex(answers: ArsenalFanAnswer[]): ArsenalFanQuizResult {
  let totalCorrect = 0;
  let weightedScore = 0;
  let easyCorrect = 0;
  let mediumCorrect = 0;
  let hardCorrect = 0;
  const wrong: ArsenalFanQuizResult["wrong"] = [];
  const reviews: ArsenalFanQuizResult["reviews"] = [];
  const categories = new Map<string, { correct: number; total: number }>();

  for (const answer of answers) {
    const question = getArsenalQuestion(answer.questionId);
    if (!question) continue;
    const isCorrect = answer.choice === question.correctAnswer;
    const group = arsenalCategoryLabels[question.category];
    const current = categories.get(group) ?? { correct: 0, total: 0 };
    current.total += 1;
    if (isCorrect) current.correct += 1;
    categories.set(group, current);

    reviews.push({ question, choice: answer.choice, isCorrect });
    if (isCorrect) {
      totalCorrect += 1;
      weightedScore += arsenalDifficultyWeights[question.difficulty];
      if (question.difficulty === "easy") easyCorrect += 1;
      if (question.difficulty === "medium") mediumCorrect += 1;
      if (question.difficulty === "hard") hardCorrect += 1;
    } else {
      wrong.push({ question, choice: answer.choice });
    }
  }

  const fanIndex = answers.length > 0 ? Math.round((weightedScore / ARSENAL_FAN_MAX_RAW_SCORE) * 100) : 0;
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
    maxScore: ARSENAL_FAN_MAX_RAW_SCORE,
    easyCorrect,
    mediumCorrect,
    hardCorrect,
    grade: getArsenalFanGrade(fanIndex),
    wrong,
    reviews,
    categoryRates,
  };
}

export function encodeArsenalAnswers(answers: ArsenalFanAnswer[]): string {
  return answers.map((answer) => `${answer.questionId}.${answer.choice}`).join("-");
}

export function parseArsenalAnswers(raw?: string): ArsenalFanAnswer[] | null {
  if (!raw) return null;
  const tokens = raw.split("-");
  if (tokens.length !== ARSENAL_FAN_QUIZ_SIZE) return null;
  const seen = new Set<string>();
  const answers: ArsenalFanAnswer[] = [];
  for (const token of tokens) {
    const [questionId, rawChoice] = token.split(".");
    const choice = Number(rawChoice);
    const question = questionId ? getArsenalQuestion(questionId) : undefined;
    if (!question || seen.has(question.id) || !Number.isInteger(choice) || choice < 0 || choice >= question.options.length) return null;
    seen.add(question.id);
    answers.push({ questionId: question.id, choice });
  }
  return answers;
}

export function arsenalFanResultPath(slug: string) {
  return `/arsenal-fan-test/result/${slug}`;
}
