import { stressGradeProfiles, stressQuestions } from "@/data/stress-test";
import type { StressGradeProfile } from "@/lib/types";

export const STRESS_QUESTION_COUNT = stressQuestions.length;
export const STRESS_MAX_SCORE = STRESS_QUESTION_COUNT * 4;

/** answers: 문항 순서대로 0~4 응답값. 역채점 문항(4·5·7·8번)은 4-값으로 계산합니다. */
export function calculateStressScore(answers: number[]): number {
  return stressQuestions.reduce((sum, question, index) => {
    const value = Math.min(Math.max(answers[index] ?? 0, 0), 4);
    return sum + (question.reverse ? 4 - value : value);
  }, 0);
}

export function getStressGrade(score: number): StressGradeProfile {
  return (
    stressGradeProfiles.find((profile) => score >= profile.minScore && score <= profile.maxScore) ??
    stressGradeProfiles[stressGradeProfiles.length - 1]
  );
}

/** 결과 URL 쿼리(s=23) 파싱: 0~40의 정수만 유효 */
export function parseStressScore(raw?: string): number | null {
  if (!raw) return null;
  const score = Number(raw);
  return Number.isInteger(score) && score >= 0 && score <= STRESS_MAX_SCORE ? score : null;
}
