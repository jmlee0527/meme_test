import { questionWeights, resultProfiles } from "@/data/tests";
import type { ScoredResult } from "@/lib/types";

export function parseAnswers(value?: string): boolean[] | null {
  if (!value || !/^[01]{12}$/.test(value)) return null;
  return [...value].map((answer) => answer === "1");
}

export function serializeAnswers(answers: boolean[]) {
  return answers.map((answer) => (answer ? "1" : "0")).join("");
}

export function calculateResults(answers: boolean[]): ScoredResult[] {
  if (answers.length !== questionWeights.length) return [];

  const scored = resultProfiles.map((profile) => {
    const score = questionWeights.reduce((total, row, index) => {
      return total + row.weights[profile.slug][answers[index] ? "O" : "X"];
    }, 0);
    const max = questionWeights.length * 4;
    const percentage = Math.round(58 + (score / max) * 39);
    return { ...profile, score, percentage: Math.min(97, percentage) };
  });

  return scored.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name, "ko"));
}
