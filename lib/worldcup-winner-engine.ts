import {
  WORLD_CUP_WINNER_QUIZ_SIZE,
  getWorldCupWinnerQuestion,
  worldCupWinnerGradeProfiles,
  worldCupWinnerQuestions,
} from "@/data/worldcup-winners";
import type { WorldCupWinnerAnswer, WorldCupWinnerGradeProfile, WorldCupWinnerQuestion } from "@/lib/types";
import { shuffle } from "@/lib/football-quiz-engine";

export { WORLD_CUP_WINNER_QUIZ_SIZE } from "@/data/worldcup-winners";

const RECENT_STORAGE_KEY = "mimi-worldcup-winner-quiz-recent";
const RECENT_LIMIT = 14;

export function pickWorldCupWinnerQuestions(recentIds: string[] = []): WorldCupWinnerQuestion[] {
  const fresh = worldCupWinnerQuestions.filter((question) => !recentIds.includes(question.id));
  const source = fresh.length >= WORLD_CUP_WINNER_QUIZ_SIZE ? fresh : worldCupWinnerQuestions;
  return shuffle(source).slice(0, WORLD_CUP_WINNER_QUIZ_SIZE);
}

export function loadRecentWorldCupWinnerQuestionIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(RECENT_STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function saveRecentWorldCupWinnerQuestionIds(newIds: string[]) {
  if (typeof window === "undefined") return;
  try {
    const merged = [...newIds, ...loadRecentWorldCupWinnerQuestionIds().filter((id) => !newIds.includes(id))].slice(0, RECENT_LIMIT);
    window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // localStorage 접근 실패는 퀴즈 진행에 영향을 주지 않도록 무시합니다.
  }
}

export function getWorldCupWinnerGrade(score: number): WorldCupWinnerGradeProfile {
  return worldCupWinnerGradeProfiles.find((profile) => score >= profile.minScore && score <= profile.maxScore) ?? worldCupWinnerGradeProfiles[worldCupWinnerGradeProfiles.length - 1];
}

export type WorldCupWinnerQuizResult = {
  score: number;
  correctCount: number;
  total: number;
  grade: WorldCupWinnerGradeProfile;
  wrong: { question: WorldCupWinnerQuestion; choice: number }[];
};

export function calculateWorldCupWinnerQuizResult(answers: WorldCupWinnerAnswer[]): WorldCupWinnerQuizResult {
  let correctCount = 0;
  const wrong: WorldCupWinnerQuizResult["wrong"] = [];
  for (const answer of answers) {
    const question = getWorldCupWinnerQuestion(answer.questionId);
    if (!question) continue;
    if (answer.choice === question.answerIndex) {
      correctCount += 1;
    } else {
      wrong.push({ question, choice: answer.choice });
    }
  }
  const score = answers.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0;
  return { score, correctCount, total: answers.length, grade: getWorldCupWinnerGrade(score), wrong };
}

export function encodeWorldCupWinnerAnswers(answers: WorldCupWinnerAnswer[]): string {
  return answers.map((answer) => `${answer.questionId}.${answer.choice}`).join("-");
}

export function parseWorldCupWinnerAnswers(raw?: string): WorldCupWinnerAnswer[] | null {
  if (!raw) return null;
  const tokens = raw.split("-");
  if (tokens.length !== WORLD_CUP_WINNER_QUIZ_SIZE) return null;
  const seen = new Set<string>();
  const answers: WorldCupWinnerAnswer[] = [];
  for (const token of tokens) {
    const [questionId, rawChoice] = token.split(".");
    const choice = Number(rawChoice);
    const question = questionId ? getWorldCupWinnerQuestion(questionId) : undefined;
    if (!question || seen.has(question.id) || !Number.isInteger(choice) || choice < 0 || choice >= question.semifinalists.length) return null;
    seen.add(question.id);
    answers.push({ questionId: question.id, choice });
  }
  return answers;
}

export function worldCupWinnerResultPath(slug: string) {
  return `/worldcup-winner-quiz/result/${slug}`;
}
