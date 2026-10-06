import {
  getRunningProfile,
  runningQuestions,
  runningScorePairs,
  runningTypeKeys,
  type RunningProfile,
  type RunningScores,
  type RunningType,
} from "@/data/running-personality";

export const RUNNING_QUESTION_COUNT = runningQuestions.length;
export type RunningResult = {
  profile: RunningProfile;
  secondary: RunningProfile;
  scores: RunningScores;
};

function validAnswers(answers: readonly number[]): boolean {
  return answers.length === RUNNING_QUESTION_COUNT &&
    Array.from(answers).every((choice) => Number.isInteger(choice) && choice >= 0 && choice < 4);
}

export function parseRunningAnswers(raw: unknown): number[] | null {
  if (typeof raw !== "string" || !/^[0-3]{12}$/.test(raw)) return null;
  return Array.from(raw, Number);
}

export function encodeRunningAnswers(answers: readonly number[]): string {
  if (!validAnswers(answers)) throw new Error("러닝 테스트는 12개의 유효한 답변이 필요합니다.");
  return answers.join("");
}

export function calculateRunningResult(answers: readonly number[]): RunningResult {
  if (!validAnswers(answers)) throw new Error("러닝 테스트는 12개의 유효한 답변이 필요합니다.");
  const scores: RunningScores = { record: 0, crew: 0, scenery: 0, explorer: 0 };
  const primaryCounts: RunningScores = { ...scores };
  const selections = answers.map((choice, index) => runningScorePairs[index][choice]);
  for (const [primary, secondary] of selections) {
    scores[primary] += 2;
    scores[secondary] += 1;
    primaryCounts[primary] += 1;
  }

  const weight = (pair: readonly [RunningType, RunningType], type: RunningType) =>
    pair[0] === type ? 2 : pair[1] === type ? 1 : 0;
  const ranked = [...runningTypeKeys].sort((left, right) => {
    const difference = scores[right] - scores[left] || primaryCounts[right] - primaryCounts[left];
    if (difference) return difference;
    for (let index = selections.length - 1; index >= 0; index--) {
      const recentDifference = weight(selections[index], right) - weight(selections[index], left);
      if (recentDifference) return recentDifference;
    }
    return runningTypeKeys.indexOf(left) - runningTypeKeys.indexOf(right);
  });

  return {
    profile: getRunningProfile(ranked[0])!,
    secondary: getRunningProfile(ranked[1])!,
    scores,
  };
}
