import { animalProfiles, officeAnimalWeights } from "@/data/office-animals";
import type { ScoredAnimal } from "@/lib/types";

export function parseOfficeAnimalAnswers(value?: string): boolean[] | null {
  if (!value || !/^[01]{10}$/.test(value)) return null;
  return [...value].map((answer) => answer === "1");
}

export function calculateOfficeAnimalResults(answers: boolean[]): ScoredAnimal[] {
  if (answers.length !== officeAnimalWeights.length) return [];
  return animalProfiles.map((profile, originalIndex) => {
    const score = officeAnimalWeights.reduce((total, weights, index) => total + weights[answers[index] ? "O" : "X"][profile.slug], 0);
    return { ...profile, score, percentage: Math.min(97, Math.round(60 + (score / 30) * 37)), originalIndex };
  }).sort((a, b) => b.score - a.score || a.originalIndex - b.originalIndex).map(({ originalIndex: _originalIndex, ...profile }) => profile);
}
