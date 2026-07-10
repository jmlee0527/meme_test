import { loverFruitProfiles, loverFruitQuestions } from "@/data/lover-fruit";
import type { LoverFruitScores, LoverFruitTrait } from "@/lib/types";

export const loverFruitTraitKeys: LoverFruitTrait[] = [
  "affection",
  "stability",
  "independence",
  "consideration",
  "humor",
  "sensitivity",
  "leadership",
  "adventure",
  "responsibility",
  "romance",
  "sociability",
  "honesty",
];

const traitMaximums = Object.fromEntries(
  loverFruitTraitKeys.map((trait) => [
    trait,
    loverFruitQuestions.reduce(
      (sum, question) => sum + Math.max(...question.options.map((option) => option.weights[trait] ?? 0)),
      0,
    ),
  ]),
) as LoverFruitScores;

function cosineSimilarity(scores: LoverFruitScores, target: LoverFruitScores, coreTraits: LoverFruitTrait[]) {
  let dot = 0;
  let scoreNorm = 0;
  let targetNorm = 0;
  loverFruitTraitKeys.forEach((trait) => {
    const weight = coreTraits.includes(trait) ? 1.22 : 0.9;
    const score = scores[trait] * weight;
    const expected = target[trait] * weight;
    dot += score * expected;
    scoreNorm += score * score;
    targetNorm += expected * expected;
  });
  if (scoreNorm === 0 || targetNorm === 0) return 0;
  return dot / (Math.sqrt(scoreNorm) * Math.sqrt(targetNorm));
}

export function parseLoverFruitAnswers(value?: string): number[] | null {
  if (!value || !new RegExp(`^[0-3]{${loverFruitQuestions.length}}$`).test(value)) return null;
  return [...value].map(Number);
}

export function serializeLoverFruitAnswers(answers: number[]) {
  return answers.join("");
}

export function calculateLoverFruitScores(answers: number[]): LoverFruitScores {
  const raw = Object.fromEntries(loverFruitTraitKeys.map((trait) => [trait, 0])) as LoverFruitScores;
  answers.forEach((answer, index) => {
    const weights = loverFruitQuestions[index]?.options[answer]?.weights ?? {};
    loverFruitTraitKeys.forEach((trait) => {
      raw[trait] += weights[trait] ?? 0;
    });
  });

  return Object.fromEntries(
    loverFruitTraitKeys.map((trait) => {
      const maximum = traitMaximums[trait];
      const normalized = maximum === 0 ? 50 : 16 + (raw[trait] / maximum) * 82;
      return [trait, Math.round(Math.min(98, Math.max(16, normalized)))];
    }),
  ) as LoverFruitScores;
}

export function calculateLoverFruitResult(answers: number[]) {
  const scores = calculateLoverFruitScores(answers);
  const strongestTraits = [...loverFruitTraitKeys].sort((a, b) => scores[b] - scores[a]).slice(0, 4);
  const answerSignature = answers.reduce((sum, answer, index) => sum + (answer + 1) * (index + 5), 0);

  const ranked = loverFruitProfiles
    .map((profile, profileIndex) => {
      const similarity = cosineSimilarity(scores, profile.targetScores, profile.coreTraits);
      const traitDistance = loverFruitTraitKeys.reduce((sum, trait) => {
        const weight = profile.coreTraits.includes(trait) ? 1.18 : 0.72;
        return sum + Math.pow(scores[trait] - profile.targetScores[trait], 2) * weight;
      }, 0);
      const patternDistance = answers.reduce(
        (sum, answer, index) => sum + Math.abs(answer - profile.answerPattern[index]),
        0,
      );
      const coreOverlap = strongestTraits.filter((trait) => profile.coreTraits.includes(trait)).length;
      const relationshipCore = ["affection", "stability", "consideration", "honesty"] as LoverFruitTrait[];
      const relationshipDistance = relationshipCore.reduce(
        (sum, trait) => sum + Math.abs(scores[trait] - profile.targetScores[trait]),
        0,
      );
      const tieBreaker = ((answerSignature * (profileIndex + 11)) % 23) / 10000;
      const score = similarity * 100
        - Math.sqrt(traitDistance) * 0.18
        - patternDistance * 2.65
        - relationshipDistance * 0.025
        + coreOverlap * 2.4
        + (patternDistance === 0 ? 16 : 0)
        - tieBreaker;
      return { profile, score };
    })
    .sort((a, b) => b.score - a.score);

  const profile = ranked[0].profile;
  const fitScore = Math.min(98, Math.max(76, Math.round(78 + (ranked[0].score - 72) * 1.2)));
  return { profile, secondary: ranked[1]?.profile, third: ranked[2]?.profile, scores, fitScore, ranked };
}
