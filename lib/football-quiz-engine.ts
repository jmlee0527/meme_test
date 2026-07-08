import {
  footballDifficultyPoints,
  footballGradeProfiles,
  footballQuizQuestions,
  getFootballQuizQuestion,
} from "@/data/football-quiz";
import type { FootballGradeProfile, FootballQuizAnswer, FootballQuizDifficulty, FootballQuizQuestion } from "@/lib/types";

export const FOOTBALL_QUIZ_SIZE = 15;
const PER_DIFFICULTY = 5;
const RECENT_STORAGE_KEY = "mimi-football-quiz-recent";
const RECENT_LIMIT = 30;

export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** 난이도별 5문제씩 랜덤 선택 후 전체를 다시 섞습니다. 최근 출제 문제는 우선 제외하되, 남은 문제가 부족하면 다시 포함합니다. */
export function pickQuizQuestions(recentIds: string[] = []): FootballQuizQuestion[] {
  const picked = (["easy", "medium", "hard"] as FootballQuizDifficulty[]).flatMap((difficulty) => {
    const pool = footballQuizQuestions.filter((question) => question.difficulty === difficulty);
    const fresh = pool.filter((question) => !recentIds.includes(question.id));
    const source = fresh.length >= PER_DIFFICULTY ? fresh : pool;
    return shuffle(source).slice(0, PER_DIFFICULTY);
  });
  return shuffle(picked);
}

export function loadRecentQuestionIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(RECENT_STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function saveRecentQuestionIds(newIds: string[]) {
  if (typeof window === "undefined") return;
  try {
    const merged = [...newIds, ...loadRecentQuestionIds().filter((id) => !newIds.includes(id))].slice(0, RECENT_LIMIT);
    window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // 저장 실패는 무시합니다(시크릿 모드 등).
  }
}

export function getFootballGrade(score: number): FootballGradeProfile {
  return footballGradeProfiles.find((profile) => score >= profile.minScore && score <= profile.maxScore) ?? footballGradeProfiles[footballGradeProfiles.length - 1];
}

export type FootballQuizResult = {
  score: number;
  correctCount: number;
  total: number;
  grade: FootballGradeProfile;
  wrong: { question: FootballQuizQuestion; choice: number }[];
};

export function calculateFootballQuizResult(answers: FootballQuizAnswer[]): FootballQuizResult {
  let earned = 0;
  let maxPoints = 0;
  let correctCount = 0;
  const wrong: FootballQuizResult["wrong"] = [];
  for (const answer of answers) {
    const question = getFootballQuizQuestion(answer.questionId);
    if (!question) continue;
    const points = footballDifficultyPoints[question.difficulty];
    maxPoints += points;
    if (answer.choice === question.correctAnswer) {
      earned += points;
      correctCount += 1;
    } else {
      wrong.push({ question, choice: answer.choice });
    }
  }
  const score = maxPoints > 0 ? Math.round((earned / maxPoints) * 100) : 0;
  return { score, correctCount, total: answers.length, grade: getFootballGrade(score), wrong };
}

/** 결과 URL 쿼리용 직렬화: "e01.2-m04.1-h12.0" 형식 */
export function encodeFootballAnswers(answers: FootballQuizAnswer[]): string {
  return answers.map((answer) => `${answer.questionId}.${answer.choice}`).join("-");
}

export function parseFootballAnswers(raw?: string): FootballQuizAnswer[] | null {
  if (!raw) return null;
  const tokens = raw.split("-");
  if (tokens.length !== FOOTBALL_QUIZ_SIZE) return null;
  const seen = new Set<string>();
  const answers: FootballQuizAnswer[] = [];
  for (const token of tokens) {
    const [questionId, rawChoice] = token.split(".");
    const choice = Number(rawChoice);
    const question = questionId ? getFootballQuizQuestion(questionId) : undefined;
    if (!question || seen.has(question.id) || !Number.isInteger(choice) || choice < 0 || choice >= question.choices.length) return null;
    seen.add(question.id);
    answers.push({ questionId: question.id, choice });
  }
  return answers;
}
