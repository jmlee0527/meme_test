import { attachmentQuestions, attachmentResultProfiles } from "@/data/attachment-style";
import type { AttachmentAxisScores, AttachmentDomain, AttachmentResultProfile } from "@/lib/types";

const domains: AttachmentDomain[] = ["anxiety", "avoidance"];

export function parseAttachmentAnswers(value?: string) {
  if (!value || !new RegExp(`^([1-5]){${attachmentQuestions.length}}$`).test(value)) return null;
  return [...value].map(Number);
}

export function serializeAttachmentAnswers(answers: number[]) {
  return answers.join("");
}

export function calculateAttachmentResult(answers: number[]) {
  const grouped: Record<AttachmentDomain, number[]> = { anxiety: [], avoidance: [] };

  attachmentQuestions.forEach((question, index) => {
    const raw = answers[index] ?? 3;
    const adjusted = question.reverse ? 6 - raw : raw;
    grouped[question.domain].push(Math.round(((adjusted - 1) / 4) * 100));
  });

  const axisScores = Object.fromEntries(
    domains.map((domain) => [domain, Math.round(grouped[domain].reduce((sum, value) => sum + value, 0) / grouped[domain].length)]),
  ) as AttachmentAxisScores;

  const anxietyHigh = axisScores.anxiety >= 50;
  const avoidanceHigh = axisScores.avoidance >= 50;
  const slug = !anxietyHigh && !avoidanceHigh
    ? "attachment-secure"
    : anxietyHigh && !avoidanceHigh
      ? "attachment-anxious"
      : !anxietyHigh && avoidanceHigh
        ? "attachment-avoidant"
        : "attachment-fearful";

  const profile = attachmentResultProfiles.find((item) => item.slug === slug) as AttachmentResultProfile;
  const isBoundary = Math.abs(axisScores.anxiety - 50) <= 5 || Math.abs(axisScores.avoidance - 50) <= 5;
  const fitScore = Math.min(96, Math.max(72, Math.round((Math.abs(axisScores.anxiety - 50) + Math.abs(axisScores.avoidance - 50)) / 2 + 70)));

  return { profile, axisScores, isBoundary, fitScore };
}
