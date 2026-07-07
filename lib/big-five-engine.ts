import { bigFiveDomainOrder, bigFiveQuestions, bigFiveResultProfiles } from "@/data/big-five";
import type { BigFiveDomain, BigFiveScores } from "@/lib/types";

export function parseBigFiveAnswers(value?: string): number[] | null {
  if (!value || !new RegExp(`^[1-5]{${bigFiveQuestions.length}}$`).test(value)) return null;
  return [...value].map(Number);
}

export function serializeBigFiveAnswers(answers: number[]) {
  return answers.join("");
}

function toPercent(raw: number, questionCount: number) {
  const min = questionCount * 1;
  const max = questionCount * 5;
  return Math.round(((raw - min) / (max - min)) * 100);
}

export function calculateBigFiveScores(answers: number[]) {
  const raw = Object.fromEntries(bigFiveDomainOrder.map((domain) => [domain, 0])) as BigFiveScores;
  const counts = Object.fromEntries(bigFiveDomainOrder.map((domain) => [domain, 0])) as BigFiveScores;

  answers.forEach((answer, index) => {
    const question = bigFiveQuestions[index];
    if (!question) return;
    const score = question.reverse ? 6 - answer : answer;
    raw[question.domain] += score;
    counts[question.domain] += 1;
  });

  const scores = Object.fromEntries(
    bigFiveDomainOrder.map((domain) => [domain, toPercent(raw[domain], counts[domain])]),
  ) as BigFiveScores;

  const dominantDomain = [...bigFiveDomainOrder].sort((a, b) => scores[b] - scores[a])[0] as BigFiveDomain;
  const lowestDomain = [...bigFiveDomainOrder].sort((a, b) => scores[a] - scores[b])[0] as BigFiveDomain;
  const profile = bigFiveResultProfiles.find((item) => item.domain === dominantDomain) ?? bigFiveResultProfiles[0];

  return {
    raw,
    scores,
    dominantDomain,
    lowestDomain,
    profile,
  };
}

export function bigFiveResultPath(slug: string) {
  return `/big-five/result/${slug}`;
}
