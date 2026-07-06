import { loverScoreTest, loverQuestions, loverResultProfiles } from "@/data/lover-score";
import type { LoverScores, LoverTrait } from "@/lib/types";

const traits: LoverTrait[] = ["care", "responsibility", "expression", "stability", "conflict", "independence", "humor", "trust"];

export function parseLoverAnswers(value?: string): number[] | null {
  if (!value || !new RegExp(`^[01]{${loverQuestions.length}}$`).test(value)) return null;
  return [...value].map(Number);
}

export function serializeLoverAnswers(answers: number[]) {
  return answers.join("");
}

export function calculateLoverScores(answers: number[]): LoverScores {
  const raw = Object.fromEntries(traits.map((trait) => [trait, 32])) as LoverScores;

  answers.forEach((answer, index) => {
    const weight = loverQuestions[index]?.weights[answer] ?? {};
    traits.forEach((trait) => {
      raw[trait] += weight[trait] ?? 0;
    });
  });

  const max = Math.max(...traits.map((trait) => raw[trait]));
  const min = Math.min(...traits.map((trait) => raw[trait]));

  return Object.fromEntries(
    traits.map((trait) => {
      const normalized = max === min ? 70 : Math.round(((raw[trait] - min) / (max - min)) * 60 + 40);
      return [trait, Math.min(99, Math.max(40, normalized))];
    }),
  ) as LoverScores;
}

export function calculateLoverResult(answers: number[]) {
  const scores = calculateLoverScores(answers);

  const avg =
    traits.reduce((sum, trait) => sum + scores[trait], 0) / traits.length;
  const overall = Math.round(avg);

  const primaryTrait = [...traits].sort((a, b) => scores[b] - scores[a])[0];
  const secondaryTrait = [...traits].sort((a, b) => scores[b] - scores[a])[1];

  const sortedProfiles = [...loverResultProfiles].sort((a, b) => {
    const aScore = parseInt(a.scoreLabel, 10) || 0;
    const bScore = parseInt(b.scoreLabel, 10) || 0;
    return Math.abs(overall - bScore) - Math.abs(overall - aScore);
  });

  const profile =
    sortedProfiles
      .slice()
      .sort((a, b) => {
        const aScore = parseInt(a.scoreLabel, 10) || 0;
        const bScore = parseInt(b.scoreLabel, 10) || 0;
        return Math.abs(overall - aScore) - Math.abs(overall - bScore);
      })[0] ?? sortedProfiles[0];

  const fitScore = Math.min(98, Math.max(65, overall));

  return {
    profile,
    scores,
    overallScore: overall,
    primaryTrait,
    secondaryTrait,
    questions: loverScoreTest.itemCount ?? loverQuestions.length,
    fitScore,
  };
}

