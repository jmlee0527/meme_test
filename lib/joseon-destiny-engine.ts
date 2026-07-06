import { joseonQuestions, joseonResultProfiles } from "@/data/joseon-destiny";
import type { JoseonScores, JoseonTrait } from "@/lib/types";

const traits: JoseonTrait[] = ["leadership", "intelligence", "creativity", "adventure", "empathy", "practicality"];

export function parseJoseonAnswers(value?: string): number[] | null {
  if (!value || !new RegExp(`^[01]{${joseonQuestions.length}}$`).test(value)) return null;
  return [...value].map(Number);
}

export function serializeJoseonAnswers(answers: number[]) {
  return answers.join("");
}

export function calculateJoseonScores(answers: number[]): JoseonScores {
  const raw = Object.fromEntries(traits.map((trait) => [trait, 32])) as JoseonScores;
  answers.forEach((answer, index) => {
    const weight = joseonQuestions[index]?.weights[answer] ?? {};
    traits.forEach((trait) => {
      raw[trait] += weight[trait] ?? 0;
    });
  });
  const max = Math.max(...traits.map((trait) => raw[trait]));
  const min = Math.min(...traits.map((trait) => raw[trait]));
  return Object.fromEntries(
    traits.map((trait) => {
      const normalized = max === min ? 50 : Math.round(((raw[trait] - min) / (max - min)) * 65 + 25);
      return [trait, Math.min(99, Math.max(18, normalized))];
    }),
  ) as JoseonScores;
}

export function calculateJoseonDestinyResult(answers: number[]) {
  const scores = calculateJoseonScores(answers);
  const ranked = joseonResultProfiles
    .map((profile) => {
      const distance = traits.reduce((sum, trait) => sum + Math.pow(scores[trait] - profile.targetScores[trait], 2), 0);
      return { profile, distance };
    })
    .sort((a, b) => a.distance - b.distance);
  const profile = ranked[0].profile;
  const fitScore = Math.min(98, Math.max(76, 100 - Math.round(Math.sqrt(ranked[0].distance) / 2)));
  return { profile, secondary: ranked[1]?.profile, scores, fitScore };
}
