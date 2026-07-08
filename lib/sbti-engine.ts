import { sbtiDimensionOrder, sbtiQuestions, sbtiTypeProfiles } from "@/data/sbti";
import type { SbtiDimensionKey, SbtiLevel, SbtiLevels, SbtiTypeProfile } from "@/lib/types";

export const SBTI_QUESTION_COUNT = sbtiQuestions.length;
/** 술 관련 보기를 이 개수 이상 고르면 히든 유형 DRUNK가 발동합니다. */
const DRUNK_THRESHOLD = 3;
/** 최고 매칭도가 이 값 미만이면 폴백 유형 HHHH가 배정됩니다. */
const FALLBACK_THRESHOLD = 60;

// 차원별 최대 획득 점수(문항별 최대 가중치 합)
const dimensionMaxima = sbtiDimensionOrder.reduce((maxima, key) => {
  maxima[key] = sbtiQuestions.reduce((sum, question) => sum + Math.max(...question.options.map((option) => option.weights[key] ?? 0)), 0);
  return maxima;
}, {} as Record<SbtiDimensionKey, number>);

const toLevel = (ratio: number): SbtiLevel => (ratio <= 0.34 ? "L" : ratio <= 0.67 ? "M" : "H");

const levelIndex: Record<SbtiLevel, number> = { L: 0, M: 1, H: 2 };

/** 두 레벨 조합의 유사도: 일치 1, 한 단계 차이 0.5, 반대 0 */
const closeness = (a: SbtiLevel, b: SbtiLevel) => {
  const gap = Math.abs(levelIndex[a] - levelIndex[b]);
  return gap === 0 ? 1 : gap === 1 ? 0.5 : 0;
};

export function matchPercent(levels: SbtiLevels, profile: SbtiTypeProfile): number {
  const total = sbtiDimensionOrder.reduce((sum, key) => sum + closeness(levels[key], profile.targets[key]), 0);
  return Math.round((total / sbtiDimensionOrder.length) * 100);
}

export type SbtiResult = {
  profile: SbtiTypeProfile;
  levels: SbtiLevels;
  match: number;
};

/** answers: 문항 순서대로 선택한 보기 인덱스 */
export function calculateSbtiResult(answers: number[]): SbtiResult {
  const raw = sbtiDimensionOrder.reduce((acc, key) => ({ ...acc, [key]: 0 }), {} as Record<SbtiDimensionKey, number>);
  let drunkCount = 0;
  sbtiQuestions.forEach((question, index) => {
    const option = question.options[answers[index]] ?? question.options[0];
    if (option.drunk) drunkCount += 1;
    for (const key of sbtiDimensionOrder) raw[key] += option.weights[key] ?? 0;
  });
  const levels = sbtiDimensionOrder.reduce((acc, key) => ({ ...acc, [key]: toLevel(raw[key] / Math.max(dimensionMaxima[key], 1)) }), {} as SbtiLevels);

  // 히든 유형: 음주 관련 응답 조합이 임계값을 넘으면 차원 점수와 무관하게 DRUNK
  if (drunkCount >= DRUNK_THRESHOLD) {
    const drunk = sbtiTypeProfiles.find((profile) => profile.slug === "drunk")!;
    return { profile: drunk, levels, match: 99 };
  }

  let best: SbtiTypeProfile | null = null;
  let bestMatch = -1;
  for (const profile of sbtiTypeProfiles) {
    if (profile.special) continue;
    const percent = matchPercent(levels, profile);
    if (percent > bestMatch) {
      bestMatch = percent;
      best = profile;
    }
  }
  // 폴백 유형: 어떤 유형과도 60% 이상 매칭되지 않으면 HHHH
  if (!best || bestMatch < FALLBACK_THRESHOLD) {
    const fallback = sbtiTypeProfiles.find((profile) => profile.slug === "hhhh")!;
    return { profile: fallback, levels, match: bestMatch };
  }
  return { profile: best, levels, match: bestMatch };
}

/** 결과 URL 쿼리용 직렬화: 차원 순서대로 L/M/H 15글자 */
export function encodeSbtiLevels(levels: SbtiLevels): string {
  return sbtiDimensionOrder.map((key) => levels[key]).join("");
}

export function parseSbtiLevels(raw?: string): SbtiLevels | null {
  if (!raw || !/^[LMH]{15}$/.test(raw)) return null;
  return sbtiDimensionOrder.reduce((acc, key, index) => ({ ...acc, [key]: raw[index] as SbtiLevel }), {} as SbtiLevels);
}

export function parseSbtiMatch(raw?: string): number | null {
  if (!raw) return null;
  const match = Number(raw);
  return Number.isInteger(match) && match >= 0 && match <= 100 ? match : null;
}
