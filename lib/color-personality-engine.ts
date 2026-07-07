import { colorPersonalityProfiles, colorPersonalityQuestions } from "@/data/color-personality";
import type { ColorPersonalityProfile, ColorPersonalitySlug } from "@/lib/types";

const colorOrder = colorPersonalityProfiles.map((profile) => profile.slug);
const maxPossible = colorPersonalityQuestions.reduce((sum, question) => sum + Math.max(...question.weights.flatMap((weight) => Object.values(weight))), 0);

export function parseColorPersonalityAnswers(value?: string): number[] | null {
  if (!value || !new RegExp(`^[01]{${colorPersonalityQuestions.length}}$`).test(value)) return null;
  return [...value].map(Number);
}

export function serializeColorPersonalityAnswers(answers: number[]) {
  return answers.join("");
}

export function calculateColorPersonalityScores(answers: number[]) {
  const scores = Object.fromEntries(colorOrder.map((slug) => [slug, 0])) as Record<ColorPersonalitySlug, number>;
  const hitCounts = Object.fromEntries(colorOrder.map((slug) => [slug, 0])) as Record<ColorPersonalitySlug, number>;

  answers.forEach((answer, index) => {
    const weights = colorPersonalityQuestions[index]?.weights[answer] ?? {};
    Object.entries(weights).forEach(([slug, value]) => {
      scores[slug as ColorPersonalitySlug] += value ?? 0;
      if ((value ?? 0) > 0) hitCounts[slug as ColorPersonalitySlug] += 1;
    });
  });

  return { scores, hitCounts };
}

export function calculateColorPersonalityResult(answers: number[]) {
  const { scores, hitCounts } = calculateColorPersonalityScores(answers);
  const ranked = colorPersonalityProfiles
    .map((profile, index) => ({ profile, score: scores[profile.slug], hits: hitCounts[profile.slug], priority: colorOrder.length - index }))
    .sort((a, b) => b.score - a.score || b.hits - a.hits || b.priority - a.priority);

  const primary = ranked[0].profile;
  const secondary = ranked[1]?.profile ?? primary;
  const total = Math.max(1, ranked[0].score + ranked[1].score);
  const primaryPercent = Math.max(54, Math.min(86, Math.round((ranked[0].score / total) * 100)));
  const secondaryPercent = 100 - primaryPercent;
  const allPercentages = Object.fromEntries(
    ranked.map(({ profile, score }) => [profile.slug, Math.round((score / Math.max(1, maxPossible)) * 100)]),
  ) as Record<ColorPersonalitySlug, number>;

  return { primary, secondary, primaryPercent, secondaryPercent, scores, allPercentages };
}

export function getColorProfileLabel(profile: ColorPersonalityProfile) {
  return `${profile.emoji} ${profile.colorName}`;
}
