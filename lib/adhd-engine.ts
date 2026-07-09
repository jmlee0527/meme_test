import { adhdLevelProfiles, adhdQuestions } from "@/data/adhd-test";
import type { AdhdDomain, AdhdLevelProfile } from "@/lib/types";

export const ADHD_QUESTION_COUNT = adhdQuestions.length;
/** ASRS Part A(스크리너) 개념 문항의 가중치 — 선별력이 높은 문항에 더 큰 비중을 둡니다. */
const SCREENER_WEIGHT = 1.5;

const questionWeight = (screener?: boolean) => (screener ? SCREENER_WEIGHT : 1);

const domainMax = (domain: AdhdDomain) =>
  adhdQuestions.filter((question) => question.domain === domain).reduce((sum, question) => sum + 4 * questionWeight(question.screener), 0);

export type AdhdResult = {
  /** 전체 점수 0~100 */
  score: number;
  /** 주의력 부족 점수 0~100 */
  inattention: number;
  /** 과잉행동·충동성 점수 0~100 */
  hyperactivity: number;
  profile: AdhdLevelProfile;
};

/** answers: 문항 순서대로 0~4 응답값. 스크리너 문항 가중치를 반영해 영역별·전체 점수를 계산합니다. */
export function calculateAdhdResult(answers: number[]): AdhdResult {
  const raw: Record<AdhdDomain, number> = { inattention: 0, hyperactivity: 0 };
  adhdQuestions.forEach((question, index) => {
    const value = Math.min(Math.max(answers[index] ?? 0, 0), 4);
    raw[question.domain] += value * questionWeight(question.screener);
  });
  const inattention = Math.round((raw.inattention / domainMax("inattention")) * 100);
  const hyperactivity = Math.round((raw.hyperactivity / domainMax("hyperactivity")) * 100);
  const score = Math.round(((raw.inattention + raw.hyperactivity) / (domainMax("inattention") + domainMax("hyperactivity"))) * 100);
  const profile =
    adhdLevelProfiles.find((level) => score >= level.minScore && score <= level.maxScore) ??
    adhdLevelProfiles[adhdLevelProfiles.length - 1];
  return { score, inattention, hyperactivity, profile };
}

/** 결과 URL 쿼리(a=18자리 0~4) 파싱 */
export function parseAdhdAnswers(raw?: string): number[] | null {
  if (!raw || raw.length !== ADHD_QUESTION_COUNT || !/^[0-4]+$/.test(raw)) return null;
  return [...raw].map(Number);
}

export function encodeAdhdAnswers(answers: number[]): string {
  return answers.join("");
}
