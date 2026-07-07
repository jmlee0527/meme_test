import { enneagramProfiles, enneagramQuestions, enneagramTypes, getEnneagramProfileByType } from "@/data/enneagram";
import type { EnneagramScores, EnneagramTypeKey } from "@/lib/types";

const priority: EnneagramTypeKey[] = ["type1", "type2", "type3", "type4", "type5", "type6", "type7", "type8", "type9"];

export function parseEnneagramAnswers(value?: string): number[] | null {
  if (!value || !new RegExp(`^[0-3]{${enneagramQuestions.length}}$`).test(value)) return null;
  return [...value].map(Number);
}

export function serializeEnneagramAnswers(answers: number[]) {
  return answers.join("");
}

export function calculateEnneagramScores(answers: number[]): EnneagramScores {
  const scores = Object.fromEntries(enneagramTypes.map((type) => [type, 0])) as EnneagramScores;
  answers.forEach((answer, index) => {
    const weights = enneagramQuestions[index]?.weights[answer] ?? {};
    enneagramTypes.forEach((type) => {
      scores[type] += weights[type] ?? 0;
    });
  });
  return scores;
}

export function calculateEnneagramResult(answers: number[]) {
  const scores = calculateEnneagramScores(answers);
  const recent = Object.fromEntries(enneagramTypes.map((type) => [type, 0])) as EnneagramScores;
  answers.slice(-3).forEach((answer, recentIndex) => {
    const question = enneagramQuestions[enneagramQuestions.length - 3 + recentIndex];
    const weights = question?.weights[answer] ?? {};
    enneagramTypes.forEach((type) => {
      recent[type] += weights[type] ?? 0;
    });
  });

  const ranked = enneagramTypes
    .map((type) => ({ type, score: scores[type], recentScore: recent[type], profile: getEnneagramProfileByType(type)! }))
    .sort((a, b) => b.score - a.score || b.recentScore - a.recentScore || priority.indexOf(a.type) - priority.indexOf(b.type));
  const topScore = Math.max(1, ranked[0].score);
  const topThree = ranked.slice(0, 3).map((item) => ({ ...item.profile, score: item.score, percentage: Math.max(12, Math.round((item.score / topScore) * 100)) }));
  return { profile: ranked[0].profile, scores, topThree };
}

export function enneagramResultPath(slug: string) {
  return `/enneagram/${slug}`;
}
