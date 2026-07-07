import { eqQuestions, eqResultProfiles } from "@/data/eq-test";
import type { EqDomain, EqDomainScores } from "@/lib/types";

const domains: EqDomain[] = ["selfAwareness", "selfRegulation", "empathy", "socialSkills", "resilience"];

export function parseEqAnswers(value?: string): number[] | null {
  if (!value || !new RegExp(`^[1-4]{${eqQuestions.length}}$`).test(value)) return null;
  return [...value].map(Number);
}

export function serializeEqAnswers(answers: number[]) {
  return answers.join("");
}

export function calculateEqScores(answers: number[]) {
  const raw = Object.fromEntries(domains.map((domain) => [domain, 0])) as EqDomainScores;
  answers.forEach((answer, index) => {
    const domain = eqQuestions[index]?.domain;
    if (domain) raw[domain] += answer;
  });

  const domainPercentages = Object.fromEntries(
    domains.map((domain) => [domain, Math.round((raw[domain] / 12) * 100)]),
  ) as EqDomainScores;
  const totalRaw = domains.reduce((sum, domain) => sum + raw[domain], 0);
  const eqScore = Math.round((totalRaw / 60) * 100);
  const empathyScore = Math.round(((raw.empathy + raw.socialSkills) / 24) * 100);
  const sortedDomains = [...domains].sort((a, b) => domainPercentages[b] - domainPercentages[a]);
  const resultProfile = eqResultProfiles.find((profile) => eqScore >= profile.minPercent && eqScore <= profile.maxPercent) ?? eqResultProfiles[eqResultProfiles.length - 1];

  return {
    raw,
    domainPercentages,
    totalRaw,
    eqScore,
    empathyScore,
    strongestDomain: sortedDomains[0],
    growthDomain: sortedDomains[sortedDomains.length - 1],
    profile: resultProfile,
  };
}

export function eqResultPath(slug: string) {
  return `/eq-test/result/${slug}`;
}
