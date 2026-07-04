import { marriageResultProfiles, marriageWeights } from "@/data/marriage-timing";
import type { MarriageResultProfile, MarriageResultSlug, MarriageScores, MarriageTendency } from "@/lib/types";

const tendencies: MarriageTendency[] = ["marriageIntent", "relationshipReady", "financialReady", "careerPriority", "independence", "familyPressure", "stability", "romanticImpulse", "cautiousness"];

export function parseCurrentAge(value?: string): number | null {
  if (!value || !/^\d+$/.test(value)) return null;
  const age = Number(value);
  return Number.isInteger(age) && age >= 15 && age <= 70 ? age : null;
}

export function parseMarriageAnswers(value?: string): boolean[] | null {
  if (!value || !/^[01]{12}$/.test(value)) return null;
  return [...value].map((answer) => answer === "1");
}

export function calculateMarriageScores(answers: boolean[]): MarriageScores {
  const scores = Object.fromEntries(tendencies.map((key) => [key, 0])) as MarriageScores;
  if (answers.length !== marriageWeights.length) return scores;
  marriageWeights.forEach((row, index) => {
    const weights = row[answers[index] ? "O" : "X"];
    for (const [key, value] of Object.entries(weights) as [MarriageTendency, number][]) scores[key] += value;
  });
  return scores;
}

export function determineMarriageResult(scores: MarriageScores): MarriageResultSlug {
  const { marriageIntent, relationshipReady, financialReady, careerPriority, independence, stability, romanticImpulse, cautiousness } = scores;
  if (marriageIntent < 5 && (independence >= 4 || careerPriority >= 4)) return "marriage-independent-life";
  if (marriageIntent >= 5 && relationshipReady >= 5 && (financialReady >= 3 || stability >= 4)) return "marriage-fast";
  if (marriageIntent >= 5 && financialReady >= 2 && cautiousness >= 4) return "marriage-stable-prep";
  const comparison = [marriageIntent, relationshipReady, financialReady, independence, stability, romanticImpulse, cautiousness];
  if (careerPriority >= 4 && careerPriority >= Math.max(...comparison)) return "marriage-career-first";
  if (independence >= 4 && romanticImpulse >= 3) return "marriage-free-romance";
  if (cautiousness >= 4 && cautiousness >= Math.max(marriageIntent, relationshipReady, financialReady, careerPriority, independence, stability, romanticImpulse)) return "marriage-careful-decision";
  return "marriage-stable-prep";
}

export function calculateMarriageResult(answers: boolean[]) {
  const scores = calculateMarriageScores(answers);
  const slug = determineMarriageResult(scores);
  return { profile: marriageResultProfiles.find((item) => item.slug === slug)!, scores };
}

export function calculateMarriageAgeRange(profile: MarriageResultProfile, currentAge: number): [number, number] | null {
  if (!profile.ageOffset) return null;
  const safeAge = Math.min(70, Math.max(15, currentAge));
  return [Math.max(safeAge, safeAge + profile.ageOffset[0]), Math.max(safeAge, safeAge + profile.ageOffset[1])];
}
