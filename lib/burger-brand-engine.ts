import { burgerBrandProfiles, burgerQuestions } from "@/data/burger-brand";
import type { BurgerBrandProfile, BurgerScores, BurgerTrait } from "@/lib/types";

export const BURGER_QUESTION_COUNT = burgerQuestions.length;

export const burgerTraitKeys: BurgerTrait[] = ["trendy", "premium", "value", "stability", "activity", "emotion", "friendliness", "challenge", "creativity", "practicality", "uniqueness", "leadership"];

export const burgerTraitLabels: Record<BurgerTrait, string> = {
  trendy: "트렌디함", premium: "프리미엄 지향", value: "가성비", stability: "안정성",
  activity: "활동성", emotion: "감성", friendliness: "친화력", challenge: "도전성",
  creativity: "창의성", practicality: "실용성", uniqueness: "개성", leadership: "리더십",
};

// 성향별 최대 획득 점수 (0~100 정규화 기준)
const traitMaxima = burgerTraitKeys.reduce((maxima, key) => {
  maxima[key] = burgerQuestions.reduce((sum, question) => sum + Math.max(...question.options.map((option) => option.weights[key] ?? 0)), 0);
  return maxima;
}, {} as BurgerScores);

export type BurgerResult = {
  profile: BurgerBrandProfile;
  scores: BurgerScores;
};

/** answers: 문항 순서대로 선택한 보기 인덱스. 인기순·랜덤 없이 성향 프로필과 가장 유사한 브랜드를 계산합니다. */
export function calculateBurgerResult(answers: number[]): BurgerResult {
  const raw = burgerTraitKeys.reduce((acc, key) => ({ ...acc, [key]: 0 }), {} as BurgerScores);
  burgerQuestions.forEach((question, index) => {
    const option = question.options[answers[index]] ?? question.options[0];
    for (const key of burgerTraitKeys) raw[key] += option.weights[key] ?? 0;
  });
  const scores = burgerTraitKeys.reduce((acc, key) => ({ ...acc, [key]: Math.round((raw[key] / Math.max(traitMaxima[key], 1)) * 100) }), {} as BurgerScores);

  let best = burgerBrandProfiles[0];
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const profile of burgerBrandProfiles) {
    const distance = burgerTraitKeys.reduce((sum, key) => sum + (scores[key] - profile.targets[key]) ** 2, 0);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = profile;
    }
  }
  return { profile: best, scores };
}

/** 결과 URL 쿼리용 직렬화: 문항 순서대로 보기 인덱스 10자리 (예: a=0312402113) */
export function encodeBurgerAnswers(answers: number[]): string {
  return answers.join("");
}

export function parseBurgerAnswers(raw?: string): number[] | null {
  if (!raw || raw.length !== BURGER_QUESTION_COUNT || !/^\d+$/.test(raw)) return null;
  const answers = [...raw].map(Number);
  return answers.every((choice, index) => choice >= 0 && choice < burgerQuestions[index].options.length) ? answers : null;
}
