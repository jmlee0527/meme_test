import { cvsQuestions, cvsResultProfiles } from "@/data/convenience-store";
import type { CvsResultProfile, CvsScores, CvsTrait } from "@/lib/types";

export const CVS_QUESTION_COUNT = cvsQuestions.length;

export const cvsTraitKeys: CvsTrait[] = ["realism", "emotion", "planning", "spontaneity", "extraversion", "introversion", "curiosity", "adventure", "stability", "optimism", "creativity", "empathy"];

export const cvsTraitLabels: Record<CvsTrait, string> = {
  realism: "현실성", emotion: "감성", planning: "계획성", spontaneity: "즉흥성",
  extraversion: "외향성", introversion: "내향성", curiosity: "호기심", adventure: "모험심",
  stability: "안정지향", optimism: "낙천성", creativity: "창의성", empathy: "공감력",
};

// 성향별 최대 획득 점수 (0~100 정규화 기준)
const traitMaxima = cvsTraitKeys.reduce((maxima, key) => {
  maxima[key] = cvsQuestions.reduce((sum, question) => sum + Math.max(...question.options.map((option) => option.weights[key] ?? 0)), 0);
  return maxima;
}, {} as CvsScores);

export type CvsResult = {
  profile: CvsResultProfile;
  scores: CvsScores;
  topTraits: { key: CvsTrait; label: string; score: number }[];
};

/** answers: 문항 순서대로 선택한 보기 인덱스. 랜덤 없이 성향 조합과 가장 가까운 결과를 계산합니다. */
export function calculateCvsResult(answers: number[]): CvsResult {
  const raw = cvsTraitKeys.reduce((acc, key) => ({ ...acc, [key]: 0 }), {} as CvsScores);
  cvsQuestions.forEach((question, index) => {
    const option = question.options[answers[index]] ?? question.options[0];
    for (const key of cvsTraitKeys) raw[key] += option.weights[key] ?? 0;
  });
  const scores = cvsTraitKeys.reduce((acc, key) => ({ ...acc, [key]: Math.round((raw[key] / Math.max(traitMaxima[key], 1)) * 100) }), {} as CvsScores);

  let best = cvsResultProfiles[0];
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const profile of cvsResultProfiles) {
    const distance = cvsTraitKeys.reduce((sum, key) => sum + (scores[key] - profile.targets[key]) ** 2, 0);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = profile;
    }
  }
  const topTraits = cvsTraitKeys
    .map((key) => ({ key, label: cvsTraitLabels[key], score: scores[key] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  return { profile: best, scores, topTraits };
}

/** 결과 URL 쿼리용 직렬화: 문항 순서대로 보기 인덱스 10자리 (예: a=0312402113) */
export function encodeCvsAnswers(answers: number[]): string {
  return answers.join("");
}

export function parseCvsAnswers(raw?: string): number[] | null {
  if (!raw || raw.length !== CVS_QUESTION_COUNT || !/^\d+$/.test(raw)) return null;
  const answers = [...raw].map(Number);
  return answers.every((choice, index) => choice >= 0 && choice < cvsQuestions[index].options.length) ? answers : null;
}
