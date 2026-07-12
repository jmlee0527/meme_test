import {
  TURNOVER_QUESTION_COUNT,
  getTurnoverLevel,
  turnoverQuestions,
  turnoverResultFactors,
} from "@/data/turnover-intention";
import type { TurnoverFactor, TurnoverResultFactor, TurnoverResultLevel } from "@/data/turnover-intention";

export type TurnoverAnswer = 0 | 1 | 2 | 3;

export type TurnoverResult = {
  /** 전체 이직 의향 점수 (0~100, 반올림) */
  overallScore: number;
  level: TurnoverResultLevel;
  /** 영역별 원점수 정규화 값 (0~100). attachment는 애착이 높을수록 높은 점수 */
  factorScores: Record<TurnoverFactor, number>;
  /** 그래프·원인 판정용 위험 방향 점수 (0~100). 높을수록 이직 신호가 강한 영역 */
  riskScores: Record<TurnoverFactor, number>;
  /** 점수가 가장 높은 원인 영역 (동점이면 최대 2개) */
  primaryFactors: TurnoverResultFactor[];
};

const factors: TurnoverFactor[] = ["direct_intention", "attachment", "growth", "compensation", "culture", "workload"];
const causeFactors: Exclude<TurnoverFactor, "direct_intention">[] = ["attachment", "growth", "compensation", "culture", "workload"];

/** 역채점 문항은 reverseScore = 3 - selectedScore 로 변환합니다. */
export function itemScore(question: { reverse: boolean }, selected: TurnoverAnswer): number {
  return question.reverse ? 3 - selected : selected;
}

export function calculateTurnoverResult(answers: TurnoverAnswer[]): TurnoverResult {
  if (answers.length !== TURNOVER_QUESTION_COUNT) throw new Error("28개 문항에 모두 답해야 결과를 계산할 수 있습니다.");

  const raw = Object.fromEntries(factors.map((factor) => [factor, 0])) as Record<TurnoverFactor, number>;
  const max = Object.fromEntries(factors.map((factor) => [factor, 0])) as Record<TurnoverFactor, number>;
  turnoverQuestions.forEach((question, index) => {
    raw[question.factor] += itemScore(question, answers[index]);
    max[question.factor] += 3;
  });

  const factorScores = Object.fromEntries(
    factors.map((factor) => [factor, (raw[factor] / max[factor]) * 100]),
  ) as Record<TurnoverFactor, number>;

  // attachment는 높을수록 긍정(애착)이므로 위험 점수로 변환합니다. 나머지는 이미 위험 방향입니다.
  const riskScores = Object.fromEntries(
    factors.map((factor) => [factor, factor === "attachment" ? 100 - factorScores[factor] : factorScores[factor]]),
  ) as Record<TurnoverFactor, number>;

  const causeAverage = causeFactors.reduce((sum, factor) => sum + riskScores[factor], 0) / causeFactors.length;
  const overallScore = Math.round(riskScores.direct_intention * 0.5 + causeAverage * 0.5);

  // 원인 영역 중 최고점 선정. 동점(반올림 후 동일 점수)이면 상위 2개까지 함께 표시합니다.
  const ranked = [...causeFactors].sort((a, b) => riskScores[b] - riskScores[a]);
  const topScore = Math.round(riskScores[ranked[0]]);
  const tied = ranked.filter((factor) => Math.round(riskScores[factor]) === topScore).slice(0, 2);
  const primaryFactors = tied
    .map((factor) => turnoverResultFactors.find((profile) => profile.factor === factor))
    .filter((profile): profile is TurnoverResultFactor => Boolean(profile));

  return {
    overallScore,
    level: getTurnoverLevel(overallScore),
    factorScores: roundRecord(factorScores),
    riskScores: roundRecord(riskScores),
    primaryFactors,
  };
}

function roundRecord(record: Record<TurnoverFactor, number>) {
  return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, Math.round(value)])) as Record<TurnoverFactor, number>;
}

export function encodeTurnoverAnswers(answers: TurnoverAnswer[]): string {
  return answers.join("");
}

export function parseTurnoverAnswers(raw?: string): TurnoverAnswer[] | null {
  if (!raw || !new RegExp(`^[0-3]{${TURNOVER_QUESTION_COUNT}}$`).test(raw)) return null;
  return [...raw].map(Number) as TurnoverAnswer[];
}

/** 미응답 문항 인덱스(0-base). 모두 답했으면 null */
export function firstUnansweredIndex(answers: (TurnoverAnswer | undefined)[]): number | null {
  for (let index = 0; index < TURNOVER_QUESTION_COUNT; index += 1) {
    if (answers[index] === undefined) return index;
  }
  return null;
}
