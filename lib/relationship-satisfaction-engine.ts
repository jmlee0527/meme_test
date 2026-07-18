import {
  relationshipDimensionOrder,
  relationshipQuestions,
  relationshipResultProfiles,
} from "@/data/relationship-satisfaction";
import type {
  RelationshipDimension,
  RelationshipDimensionScores,
  RelationshipResultProfile,
} from "@/lib/types";

export const RELATIONSHIP_QUESTION_COUNT = relationshipQuestions.length;
export const RELATIONSHIP_MAX_RAW_SCORE = RELATIONSHIP_QUESTION_COUNT * 3;
export const RELATIONSHIP_DIMENSION_MAX_RAW_SCORE = 9;

const clampAnswer = (value: number) => Math.min(3, Math.max(0, Number.isInteger(value) ? value : 0));
const clampScore = (value: number) => Math.min(100, Math.max(0, Math.round(value)));

export function calculateRelationshipSatisfactionResult(answers: number[]) {
  const rawTotal = relationshipQuestions.reduce((sum, question, index) => {
    const answer = clampAnswer(answers[index] ?? 0);
    return sum + (question.reverseScored ? 3 - answer : answer);
  }, 0);
  const score = clampScore((rawTotal / RELATIONSHIP_MAX_RAW_SCORE) * 100);

  const dimensionRaw = Object.fromEntries(
    relationshipDimensionOrder.map((dimension) => [dimension, 0]),
  ) as RelationshipDimensionScores;

  relationshipQuestions.forEach((question, index) => {
    const answer = clampAnswer(answers[index] ?? 0);
    dimensionRaw[question.dimension] += question.reverseScored ? 3 - answer : answer;
  });

  const dimensionScores = Object.fromEntries(
    relationshipDimensionOrder.map((dimension) => [
      dimension,
      clampScore((dimensionRaw[dimension] / RELATIONSHIP_DIMENSION_MAX_RAW_SCORE) * 100),
    ]),
  ) as RelationshipDimensionScores;

  const highestScore = Math.max(...relationshipDimensionOrder.map((dimension) => dimensionScores[dimension]));
  const lowestScore = Math.min(...relationshipDimensionOrder.map((dimension) => dimensionScores[dimension]));
  const strongestDimensions = relationshipDimensionOrder.filter((dimension) => dimensionScores[dimension] === highestScore);
  const growthDimensions = relationshipDimensionOrder.filter((dimension) => dimensionScores[dimension] === lowestScore);

  return {
    rawTotal,
    score,
    grade: getRelationshipResult(score),
    dimensionScores,
    strongestDimensions,
    growthDimensions,
  };
}

export function getRelationshipResult(score: number): RelationshipResultProfile {
  return (
    relationshipResultProfiles.find((profile) => score >= profile.minScore && score <= profile.maxScore) ??
    relationshipResultProfiles[relationshipResultProfiles.length - 1]
  );
}

export function encodeRelationshipAnswers(answers: number[]) {
  return answers.join("");
}

export function parseRelationshipAnswers(raw?: string): number[] | null {
  if (!raw || !new RegExp(`^[0-3]{${RELATIONSHIP_QUESTION_COUNT}}$`).test(raw)) return null;
  return [...raw].map(Number);
}

export function encodeRelationshipDimensionScores(scores: RelationshipDimensionScores) {
  return relationshipDimensionOrder.map((dimension) => String(scores[dimension]).padStart(3, "0")).join("");
}

export function parseRelationshipDimensionScores(raw?: string): RelationshipDimensionScores | null {
  if (!raw || !new RegExp(`^[0-9]{${relationshipDimensionOrder.length * 3}}$`).test(raw)) return null;
  const entries = relationshipDimensionOrder.map((dimension, index) => {
    const score = Number(raw.slice(index * 3, index * 3 + 3));
    return [dimension, Number.isInteger(score) && score >= 0 && score <= 100 ? score : null] as const;
  });
  if (entries.some(([, score]) => score === null)) return null;
  return Object.fromEntries(entries) as RelationshipDimensionScores;
}

export function parseRelationshipScore(raw?: string): number | null {
  if (!raw) return null;
  const score = Number(raw);
  return Number.isInteger(score) && score >= 0 && score <= 100 ? score : null;
}

export function getRelationshipDimensionExtremes(scores: RelationshipDimensionScores) {
  const highestScore = Math.max(...relationshipDimensionOrder.map((dimension) => scores[dimension]));
  const lowestScore = Math.min(...relationshipDimensionOrder.map((dimension) => scores[dimension]));
  return {
    strongestDimensions: relationshipDimensionOrder.filter((dimension) => scores[dimension] === highestScore),
    growthDimensions: relationshipDimensionOrder.filter((dimension) => scores[dimension] === lowestScore),
  };
}

export function getRelationshipDimensionTitles(dimensions: RelationshipDimension[], labels: Record<RelationshipDimension, string>) {
  return dimensions.map((dimension) => labels[dimension]).join(", ");
}
