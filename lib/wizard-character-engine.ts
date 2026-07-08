import { wizardCharacterCalibration, wizardCharacterPatterns, wizardCharacterProfiles, wizardCharacterQuestions } from "@/data/wizard-character";
import type { WizardCharacterScores, WizardCharacterTrait } from "@/lib/types";

export const wizardTraits: WizardCharacterTrait[] = [
  "courage", "wisdom", "leadership", "friendship", "loyalty", "creativity",
  "independence", "ambition", "responsibility", "empathy", "action", "analysis",
];

const traitMaximums = Object.fromEntries(
  wizardTraits.map((trait) => [
    trait,
    wizardCharacterQuestions.reduce(
      (sum, question) => sum + Math.max(...question.options.map((option) => option.weights[trait] ?? 0)),
      0,
    ),
  ]),
) as WizardCharacterScores;

export function parseWizardCharacterAnswers(value?: string): number[] | null {
  if (!value || !new RegExp(`^[0-3]{${wizardCharacterQuestions.length}}$`).test(value)) return null;
  return [...value].map(Number);
}

export function serializeWizardCharacterAnswers(answers: number[]) {
  return answers.join("");
}

export function calculateWizardCharacterScores(answers: number[]): WizardCharacterScores {
  const raw = Object.fromEntries(wizardTraits.map((trait) => [trait, 0])) as WizardCharacterScores;
  answers.forEach((answer, index) => {
    const weights = wizardCharacterQuestions[index]?.options[answer]?.weights ?? {};
    wizardTraits.forEach((trait) => {
      raw[trait] += weights[trait] ?? 0;
    });
  });

  return Object.fromEntries(
    wizardTraits.map((trait) => {
      const maximum = traitMaximums[trait];
      const normalized = maximum === 0 ? 50 : 18 + (raw[trait] / maximum) * 80;
      return [trait, Math.round(Math.min(98, Math.max(18, normalized)))];
    }),
  ) as WizardCharacterScores;
}

export function calculateWizardCharacterResult(answers: number[]) {
  const scores = calculateWizardCharacterScores(answers);
  const ranked = wizardCharacterProfiles
    .map((profile, profileIndex) => {
      const traitDistance = wizardTraits.reduce((sum, trait) => {
        const weight = profile.coreTraits.includes(trait) ? 1.35 : 0.72;
        return sum + Math.pow(scores[trait] - profile.targetScores[trait], 2) * weight;
      }, 0);
      const pattern = wizardCharacterPatterns[profile.slug];
      const patternDistance = answers.reduce((sum, answer, index) => sum + (answer === pattern[index] ? 0 : 1), 0);
      // 완전 동점일 때도 동일 응답은 항상 같은 결과를 내되 앞쪽 프로필만 유리하지 않게 합니다.
      const answerSignature = answers.reduce((sum, answer, index) => sum + (answer + 1) * (index + 3), 0);
      const tieBreaker = ((answerSignature * (profileIndex + 5)) % 17) / 1000;
      return { profile, distance: patternDistance * 1150 + traitDistance * 0.16 + wizardCharacterCalibration[profile.slug] + tieBreaker };
    })
    .sort((a, b) => a.distance - b.distance);

  const profile = ranked[0].profile;
  const fitScore = Math.min(98, Math.max(74, 100 - Math.round(Math.sqrt(Math.max(0, ranked[0].distance)) / 3.4)));
  return { profile, secondary: ranked[1]?.profile, scores, fitScore };
}
