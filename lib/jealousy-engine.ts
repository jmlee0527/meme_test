import { jealousyGradeProfiles, jealousyQuestions } from "@/data/jealousy-test";
import type { JealousyDomain, JealousyDomainScores, JealousyGradeProfile } from "@/lib/types";

export const JEALOUSY_QUESTION_COUNT = jealousyQuestions.length;
export const JEALOUSY_MAX_RAW_SCORE = JEALOUSY_QUESTION_COUNT * 3;

const domains: JealousyDomain[] = ["relationshipAnxiety", "comparisonSensitivity", "reassuranceNeed", "emotionRegulation", "trustFlexibility"];

export function calculateJealousyResult(answers: number[]) {
  const rawTotal = jealousyQuestions.reduce((sum, question, index) => {
    const value = Math.min(Math.max(answers[index] ?? 0, 0), 3);
    return sum + value;
  }, 0);
  const score = Math.round((rawTotal / JEALOUSY_MAX_RAW_SCORE) * 100);

  const domainRaw = Object.fromEntries(domains.map((domain) => [domain, 0])) as JealousyDomainScores;
  const domainCounts = Object.fromEntries(domains.map((domain) => [domain, 0])) as JealousyDomainScores;
  jealousyQuestions.forEach((question, index) => {
    const value = Math.min(Math.max(answers[index] ?? 0, 0), 3);
    domainRaw[question.domain] += value;
    domainCounts[question.domain] += 1;
  });

  const domainScores = Object.fromEntries(
    domains.map((domain) => [domain, Math.round((domainRaw[domain] / (domainCounts[domain] * 3)) * 100)]),
  ) as JealousyDomainScores;

  const dominantDomain = [...domains].sort((a, b) => domainScores[b] - domainScores[a])[0];
  const calmDomain = [...domains].sort((a, b) => domainScores[a] - domainScores[b])[0];

  return {
    rawTotal,
    score,
    grade: getJealousyGrade(score),
    domainScores,
    dominantDomain,
    calmDomain,
  };
}

export function getJealousyGrade(score: number): JealousyGradeProfile {
  return (
    jealousyGradeProfiles.find((profile) => score >= profile.minScore && score <= profile.maxScore) ??
    jealousyGradeProfiles[jealousyGradeProfiles.length - 1]
  );
}

export function encodeJealousyAnswers(answers: number[]) {
  return answers.join("");
}

export function parseJealousyAnswers(raw?: string): number[] | null {
  if (!raw || !new RegExp(`^[0-3]{${JEALOUSY_QUESTION_COUNT}}$`).test(raw)) return null;
  return [...raw].map(Number);
}

export function parseJealousyScore(raw?: string): number | null {
  if (!raw) return null;
  const score = Number(raw);
  return Number.isInteger(score) && score >= 0 && score <= 100 ? score : null;
}
