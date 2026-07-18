import {
  interpersonalDimensionOrder,
  interpersonalQuestions,
  interpersonalResultProfiles,
} from "@/data/interpersonal-ability";
import type {
  InterpersonalDimension,
  InterpersonalDimensionScores,
  InterpersonalResultProfile,
} from "@/lib/types";

export const INTERPERSONAL_QUESTION_COUNT = interpersonalQuestions.length;
export const INTERPERSONAL_MAX_RAW_SCORE = INTERPERSONAL_QUESTION_COUNT * 3;
export const INTERPERSONAL_DIMENSION_MAX_RAW_SCORE = 9;

const clampAnswer = (value: number) => Math.min(3, Math.max(0, Number.isInteger(value) ? value : 0));
const clampScore = (value: number) => Math.min(100, Math.max(0, Math.round(value)));

export function calculateInterpersonalAbilityResult(answers: number[]) {
  if (answers.length !== INTERPERSONAL_QUESTION_COUNT) throw new Error("12문항에 모두 답해야 합니다.");

  const rawTotal = interpersonalQuestions.reduce((sum, question, index) => {
    const answer = clampAnswer(answers[index] ?? 0);
    return sum + (question.reverseScored ? 3 - answer : answer);
  }, 0);
  const score = clampScore((rawTotal / INTERPERSONAL_MAX_RAW_SCORE) * 100);

  const dimensionRaw = Object.fromEntries(
    interpersonalDimensionOrder.map((dimension) => [dimension, 0]),
  ) as InterpersonalDimensionScores;

  interpersonalQuestions.forEach((question, index) => {
    const answer = clampAnswer(answers[index] ?? 0);
    dimensionRaw[question.dimension] += question.reverseScored ? 3 - answer : answer;
  });

  const dimensionScores = Object.fromEntries(
    interpersonalDimensionOrder.map((dimension) => [
      dimension,
      clampScore((dimensionRaw[dimension] / INTERPERSONAL_DIMENSION_MAX_RAW_SCORE) * 100),
    ]),
  ) as InterpersonalDimensionScores;

  return {
    rawTotal,
    score,
    grade: getInterpersonalResult(score),
    dimensionScores,
    ...getInterpersonalDimensionExtremes(dimensionScores),
  };
}

export function getInterpersonalResult(score: number): InterpersonalResultProfile {
  return (
    interpersonalResultProfiles.find((profile) => score >= profile.minScore && score <= profile.maxScore) ??
    interpersonalResultProfiles[interpersonalResultProfiles.length - 1]
  );
}

export function encodeInterpersonalDimensionScores(scores: InterpersonalDimensionScores) {
  return interpersonalDimensionOrder.map((dimension) => String(scores[dimension]).padStart(3, "0")).join("");
}

export function parseInterpersonalDimensionScores(raw?: string): InterpersonalDimensionScores | null {
  if (!raw || !new RegExp(`^[0-9]{${interpersonalDimensionOrder.length * 3}}$`).test(raw)) return null;
  const entries = interpersonalDimensionOrder.map((dimension, index) => {
    const score = Number(raw.slice(index * 3, index * 3 + 3));
    return [dimension, Number.isInteger(score) && score >= 0 && score <= 100 ? score : null] as const;
  });
  if (entries.some(([, score]) => score === null)) return null;
  return Object.fromEntries(entries) as InterpersonalDimensionScores;
}

export function parseInterpersonalScore(raw?: string): number | null {
  if (!raw) return null;
  const score = Number(raw);
  return Number.isInteger(score) && score >= 0 && score <= 100 ? score : null;
}

export function getInterpersonalDimensionExtremes(scores: InterpersonalDimensionScores) {
  const highestScore = Math.max(...interpersonalDimensionOrder.map((dimension) => scores[dimension]));
  const lowestScore = Math.min(...interpersonalDimensionOrder.map((dimension) => scores[dimension]));
  return {
    strongestDimensions: interpersonalDimensionOrder.filter((dimension) => scores[dimension] === highestScore),
    growthDimensions: interpersonalDimensionOrder.filter((dimension) => scores[dimension] === lowestScore),
  };
}

export function getInterpersonalDimensionTitles(dimensions: InterpersonalDimension[], labels: Record<InterpersonalDimension, string>) {
  return dimensions.map((dimension) => labels[dimension]).join(", ");
}
