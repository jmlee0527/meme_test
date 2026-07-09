import { selfEsteemDomains, selfEsteemLevelProfiles, selfEsteemQuestions } from "@/data/self-esteem";
import type { SelfEsteemDomain, SelfEsteemDomainScores } from "@/lib/types";

const domains = selfEsteemDomains.map(({ key }) => key) as SelfEsteemDomain[];
const positiveDomains = selfEsteemDomains.filter(({ positive }) => positive).map(({ key }) => key);
const riskDomains = selfEsteemDomains.filter(({ positive }) => !positive).map(({ key }) => key);

const domainRanges = Object.fromEntries(
  domains.map((domain) => {
    const minimum = selfEsteemQuestions.reduce(
      (sum, question) => sum + Math.min(...question.options.map((option) => option.weights[domain] ?? 0)),
      0,
    );
    const maximum = selfEsteemQuestions.reduce(
      (sum, question) => sum + Math.max(...question.options.map((option) => option.weights[domain] ?? 0)),
      0,
    );
    return [domain, { minimum, maximum }];
  }),
) as Record<SelfEsteemDomain, { minimum: number; maximum: number }>;

export function parseSelfEsteemAnswers(value?: string): number[] | null {
  if (!value || !new RegExp(`^[0-3]{${selfEsteemQuestions.length}}$`).test(value)) return null;
  return [...value].map(Number);
}

export function serializeSelfEsteemAnswers(answers: number[]) {
  return answers.join("");
}

export function calculateSelfEsteemDomainScores(answers: number[]): SelfEsteemDomainScores {
  const raw = Object.fromEntries(domains.map((domain) => [domain, 0])) as SelfEsteemDomainScores;
  answers.forEach((answer, index) => {
    const weights = selfEsteemQuestions[index]?.options[answer]?.weights ?? {};
    domains.forEach((domain) => {
      raw[domain] += weights[domain] ?? 0;
    });
  });

  return Object.fromEntries(
    domains.map((domain) => {
      const { minimum, maximum } = domainRanges[domain];
      const normalized = maximum === minimum ? 50 : ((raw[domain] - minimum) / (maximum - minimum)) * 100;
      return [domain, Math.round(Math.min(100, Math.max(0, normalized)))];
    }),
  ) as SelfEsteemDomainScores;
}

export function calculateSelfEsteemResult(answers: number[]) {
  const domainScores = calculateSelfEsteemDomainScores(answers);
  const protectiveAverage = positiveDomains.reduce((sum, domain) => sum + domainScores[domain], 0) / positiveDomains.length;
  const riskProtectionAverage = riskDomains.reduce((sum, domain) => sum + (100 - domainScores[domain]), 0) / riskDomains.length;
  const uncalibrated = protectiveAverage * 0.78 + riskProtectionAverage * 0.22;
  // 4지선다 평균 응답이 중앙에 과도하게 몰리지 않도록 중심에서의 차이를 완만하게 확장합니다.
  const score = Math.round(Math.min(100, Math.max(0, 50 + (uncalibrated - 50) * 1.75)));
  const profile = selfEsteemLevelProfiles.find(({ minScore, maxScore }) => score >= minScore && score <= maxScore)
    ?? selfEsteemLevelProfiles[2];
  return { score, profile, domainScores };
}
