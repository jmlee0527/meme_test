import {
  dementiaLevelProfiles,
  dementiaQuestions,
  type DementiaDomain,
} from "@/data/dementia-risk";

export type DementiaRiskScores = {
  overall: number;
  cognitiveChange: number;
  lifestyleRisk: number;
  highCognitiveSignals: number;
  domains: Record<DementiaDomain, number>;
  answers: number[];
};

export function parseDementiaAnswers(value?: string): number[] | null {
  if (!value || !new RegExp(`^[0-4]{${dementiaQuestions.length}}$`).test(value)) return null;
  return [...value].map(Number);
}

export function serializeDementiaAnswers(answers: number[]) {
  return answers.join("");
}

function normalizedScore(answers: number[], questionIds: number[]) {
  const questions = dementiaQuestions.filter((question) => questionIds.includes(question.id));
  const weighted = questions.reduce(
    (sum, question) => sum + (answers[question.id - 1] ?? 0) * question.weight,
    0,
  );
  const maximum = questions.reduce((sum, question) => sum + 4 * question.weight, 0);
  return maximum ? Math.round((weighted / maximum) * 100) : 0;
}

export function calculateDementiaResult(answers: number[]) {
  const validAnswers = dementiaQuestions.map((question) => {
    const answer = answers[question.id - 1] ?? 0;
    return Math.min(4, Math.max(0, answer));
  });
  const cognitiveIds = dementiaQuestions.filter(({ id }) => id <= 10).map(({ id }) => id);
  const lifestyleIds = dementiaQuestions.filter(({ id }) => id >= 11).map(({ id }) => id);
  const weightedTotal = dementiaQuestions.reduce(
    (sum, question) => sum + validAnswers[question.id - 1] * question.weight,
    0,
  );
  const maximum = dementiaQuestions.reduce((sum, question) => sum + 4 * question.weight, 0);
  const overall = Math.round((weightedTotal / maximum) * 100);
  const domainKeys = [...new Set(dementiaQuestions.map(({ domain }) => domain))] as DementiaDomain[];
  const domains = Object.fromEntries(
    domainKeys.map((domain) => [
      domain,
      normalizedScore(
        validAnswers,
        dementiaQuestions.filter((question) => question.domain === domain).map(({ id }) => id),
      ),
    ]),
  ) as Record<DementiaDomain, number>;
  const scores: DementiaRiskScores = {
    overall,
    cognitiveChange: normalizedScore(validAnswers, cognitiveIds),
    lifestyleRisk: normalizedScore(validAnswers, lifestyleIds),
    highCognitiveSignals: cognitiveIds.filter((id) => validAnswers[id - 1] >= 3).length,
    domains,
    answers: validAnswers,
  };
  const profile = dementiaLevelProfiles.find(
    ({ minScore, maxScore }) => overall >= minScore && overall <= maxScore,
  ) ?? dementiaLevelProfiles[2];
  return { profile, scores };
}
