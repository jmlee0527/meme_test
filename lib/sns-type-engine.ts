import { snsQuestions, snsResultProfiles } from "@/data/sns-type";
import type { SnsResultProfile, SnsScores, SnsTrait } from "@/lib/types";

export const SNS_QUESTION_COUNT = snsQuestions.length;

export const snsTraitKeys: SnsTrait[] = ["expression", "extraversion", "introversion", "empathy", "archiving", "trend", "humor", "privacy", "friendliness", "spontaneity", "planning", "leadership", "research", "creativity", "consuming", "producing"];

export const snsTraitLabels: Record<SnsTrait, string> = {
  expression: "자기표현", extraversion: "외향성", introversion: "내향성", empathy: "공감능력",
  archiving: "기록성향", trend: "트렌드 감각", humor: "유머감각", privacy: "사생활 보호",
  friendliness: "친화력", spontaneity: "즉흥성", planning: "계획성", leadership: "리더십",
  research: "정보 탐색", creativity: "창의성", consuming: "콘텐츠 소비", producing: "콘텐츠 생산",
};

// 성향별 최대 획득 점수 (0~100 정규화 기준)
const traitMaxima = snsTraitKeys.reduce((maxima, key) => {
  maxima[key] = snsQuestions.reduce((sum, question) => sum + Math.max(...question.options.map((option) => option.weights[key] ?? 0)), 0);
  return maxima;
}, {} as SnsScores);

export type SnsResult = {
  profile: SnsResultProfile;
  scores: SnsScores;
  topTraits: { key: SnsTrait; label: string; score: number }[];
};

/** answers: 문항 순서대로 선택한 보기 인덱스. 랜덤 없이 성향 조합과 가장 가까운 결과를 계산합니다. */
export function calculateSnsResult(answers: number[]): SnsResult {
  const raw = snsTraitKeys.reduce((acc, key) => ({ ...acc, [key]: 0 }), {} as SnsScores);
  snsQuestions.forEach((question, index) => {
    const option = question.options[answers[index]] ?? question.options[0];
    for (const key of snsTraitKeys) raw[key] += option.weights[key] ?? 0;
  });
  const scores = snsTraitKeys.reduce((acc, key) => ({ ...acc, [key]: Math.round((raw[key] / Math.max(traitMaxima[key], 1)) * 100) }), {} as SnsScores);

  let best = snsResultProfiles[0];
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const profile of snsResultProfiles) {
    const distance = snsTraitKeys.reduce((sum, key) => sum + (scores[key] - profile.targets[key]) ** 2, 0);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = profile;
    }
  }
  const topTraits = snsTraitKeys
    .map((key) => ({ key, label: snsTraitLabels[key], score: scores[key] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  return { profile: best, scores, topTraits };
}

/** 결과 URL 쿼리용 직렬화: 문항 순서대로 보기 인덱스 12자리 (예: a=031240211302) */
export function encodeSnsAnswers(answers: number[]): string {
  return answers.join("");
}

export function parseSnsAnswers(raw?: string): number[] | null {
  if (!raw || raw.length !== SNS_QUESTION_COUNT || !/^\d+$/.test(raw)) return null;
  const answers = [...raw].map(Number);
  return answers.every((choice, index) => choice >= 0 && choice < snsQuestions[index].options.length) ? answers : null;
}
