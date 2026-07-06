import { countryResultProfiles, personalityCountryQuestions } from "@/data/personality-country";
import type { CountryScores, CountryTrait } from "@/lib/types";

const traits: CountryTrait[] = ["openness", "structure", "socialEnergy", "independence", "nature", "ambition", "culture", "safety"];

export function parseCountryAnswers(value?: string): number[] | null {
  if (!value || !new RegExp(`^[01]{${personalityCountryQuestions.length}}$`).test(value)) return null;
  return [...value].map(Number);
}

export function serializeCountryAnswers(answers: number[]) {
  return answers.join("");
}

export function calculateCountryScores(answers: number[]): CountryScores {
  const raw = Object.fromEntries(traits.map((trait) => [trait, 32])) as CountryScores;
  answers.forEach((answer, index) => {
    const weight = personalityCountryQuestions[index]?.weights[answer] ?? {};
    traits.forEach((trait) => {
      raw[trait] += weight[trait] ?? 0;
    });
  });

  const max = Math.max(...traits.map((trait) => raw[trait]));
  const min = Math.min(...traits.map((trait) => raw[trait]));
  return Object.fromEntries(
    traits.map((trait) => {
      const normalized = max === min ? 50 : Math.round(((raw[trait] - min) / (max - min)) * 68 + 24);
      return [trait, Math.min(99, Math.max(16, normalized))];
    }),
  ) as CountryScores;
}

function topTraitBonus(scores: CountryScores, target: CountryScores) {
  const topTraits = [...traits].sort((a, b) => scores[b] - scores[a]).slice(0, 2);
  return topTraits.reduce((sum, trait) => sum + Math.abs(scores[trait] - target[trait]) * 0.35, 0);
}

export function calculatePersonalityCountryResult(answers: number[]) {
  const scores = calculateCountryScores(answers);
  const ranked = countryResultProfiles
    .map((profile) => {
      const distance = traits.reduce((sum, trait) => sum + Math.pow(scores[trait] - profile.targetScores[trait], 2), 0) + topTraitBonus(scores, profile.targetScores);
      return { profile, distance };
    })
    .sort((a, b) => a.distance - b.distance);

  const profile = ranked[0].profile;
  const fitScore = Math.min(98, Math.max(74, 100 - Math.round(Math.sqrt(ranked[0].distance) / 2.4)));
  const similar = ranked.slice(1, 3).map(({ profile }) => profile);
  return { profile, similar, scores, fitScore };
}
