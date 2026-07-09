import {
  coffeeBrandCalibration,
  coffeeBrandPatterns,
  coffeeBrandProfiles,
  coffeeBrandQuestions,
} from "@/data/coffee-brand";
import type { CoffeeBrandScores, CoffeeBrandTrait } from "@/lib/types";

export const coffeeTraits: CoffeeBrandTrait[] = [
  "trendy", "emotion", "practicality", "rationality", "leisure", "activity",
  "independence", "sociability", "challenge", "stability", "creativity", "premium",
];

const traitMaximums = Object.fromEntries(
  coffeeTraits.map((trait) => [
    trait,
    coffeeBrandQuestions.reduce(
      (sum, question) => sum + Math.max(...question.options.map((option) => option.weights[trait] ?? 0)),
      0,
    ),
  ]),
) as CoffeeBrandScores;

export function parseCoffeeBrandAnswers(value?: string): number[] | null {
  if (!value || !new RegExp(`^[0-3]{${coffeeBrandQuestions.length}}$`).test(value)) return null;
  return [...value].map(Number);
}

export function serializeCoffeeBrandAnswers(answers: number[]) {
  return answers.join("");
}

export function calculateCoffeeBrandScores(answers: number[]): CoffeeBrandScores {
  const raw = Object.fromEntries(coffeeTraits.map((trait) => [trait, 0])) as CoffeeBrandScores;
  answers.forEach((answer, index) => {
    const weights = coffeeBrandQuestions[index]?.options[answer]?.weights ?? {};
    coffeeTraits.forEach((trait) => {
      raw[trait] += weights[trait] ?? 0;
    });
  });

  return Object.fromEntries(
    coffeeTraits.map((trait) => {
      const maximum = traitMaximums[trait];
      const normalized = maximum === 0 ? 50 : 18 + (raw[trait] / maximum) * 80;
      return [trait, Math.round(Math.min(98, Math.max(18, normalized)))];
    }),
  ) as CoffeeBrandScores;
}

export function calculateCoffeeBrandResult(answers: number[]) {
  const scores = calculateCoffeeBrandScores(answers);
  const ranked = coffeeBrandProfiles
    .map((profile, profileIndex) => {
      const traitDistance = coffeeTraits.reduce((sum, trait) => {
        const weight = profile.coreTraits.includes(trait) ? 1.35 : 0.72;
        return sum + Math.pow(scores[trait] - profile.targetScores[trait], 2) * weight;
      }, 0);
      const pattern = coffeeBrandPatterns[profile.slug];
      const patternDistance = answers.reduce((sum, answer, index) => sum + (answer === pattern[index] ? 0 : 1), 0);
      const strongestTraits = [...coffeeTraits].sort((a, b) => scores[b] - scores[a]).slice(0, 3);
      const coreOverlap = strongestTraits.filter((trait) => profile.coreTraits.includes(trait)).length;
      const answerSignature = answers.reduce((sum, answer, index) => sum + (answer + 1) * (index + 3), 0);
      const tieBreaker = ((answerSignature * (profileIndex + 7)) % 19) / 1000;
      const distance = patternDistance * 1120 + traitDistance * 0.16 - coreOverlap * 75
        + coffeeBrandCalibration[profile.slug] + tieBreaker;
      return { profile, distance };
    })
    .sort((a, b) => a.distance - b.distance);

  const profile = ranked[0].profile;
  const fitScore = Math.min(98, Math.max(74, 100 - Math.round(Math.sqrt(Math.max(0, ranked[0].distance)) / 3.4)));
  return { profile, secondary: ranked[1]?.profile, scores, fitScore };
}
