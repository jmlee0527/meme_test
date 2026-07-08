import { sbtiLabelProfiles, sbtiQuestions } from "@/data/sbti";
import type { SbtiLabelProfile, SbtiStatKey, SbtiStats } from "@/lib/types";

export const SBTI_QUESTION_COUNT = sbtiQuestions.length;
export const sbtiStatKeys: SbtiStatKey[] = ["gwichanism", "nunchi", "tension", "jireum", "plan", "insider"];

// 스탯별 최대 획득 가능 점수 (0~100 정규화 기준)
const statMaxima: SbtiStats = sbtiStatKeys.reduce((maxima, key) => {
  maxima[key] = sbtiQuestions.reduce((sum, question) => sum + Math.max(...question.options.map((option) => option.weights[key] ?? 0)), 0);
  return maxima;
}, {} as SbtiStats);

export type SbtiResult = {
  profile: SbtiLabelProfile;
  stats: SbtiStats;
};

/** answers: 문항 순서대로 선택한 보기 인덱스. 경계 결과가 매번 살짝 달라지도록 ±4의 랜덤 지터를 더합니다(재미 요소). */
export function calculateSbtiResult(answers: number[]): SbtiResult {
  const raw = sbtiStatKeys.reduce((acc, key) => ({ ...acc, [key]: 0 }), {} as SbtiStats);
  sbtiQuestions.forEach((question, index) => {
    const option = question.options[answers[index]] ?? question.options[0];
    for (const key of sbtiStatKeys) raw[key] += option.weights[key] ?? 0;
  });
  const stats = sbtiStatKeys.reduce((acc, key) => {
    const normalized = Math.round((raw[key] / Math.max(statMaxima[key], 1)) * 100);
    const jitter = Math.round(Math.random() * 8) - 4;
    acc[key] = Math.min(Math.max(normalized + jitter, 0), 100);
    return acc;
  }, {} as SbtiStats);

  let best = sbtiLabelProfiles[0];
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const profile of sbtiLabelProfiles) {
    const distance = sbtiStatKeys.reduce((sum, key) => sum + (stats[key] - profile.targetStats[key]) ** 2, 0);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = profile;
    }
  }
  return { profile: best, stats };
}

export function encodeSbtiStats(stats: SbtiStats): string {
  return sbtiStatKeys.map((key) => stats[key]).join("-");
}

/** 결과 URL 쿼리(v=82-91-64-30-55-70) 파싱 */
export function parseSbtiStats(raw?: string): SbtiStats | null {
  if (!raw) return null;
  const values = raw.split("-").map(Number);
  if (values.length !== sbtiStatKeys.length) return null;
  if (values.some((value) => !Number.isInteger(value) || value < 0 || value > 100)) return null;
  return sbtiStatKeys.reduce((acc, key, index) => ({ ...acc, [key]: values[index] }), {} as SbtiStats);
}
