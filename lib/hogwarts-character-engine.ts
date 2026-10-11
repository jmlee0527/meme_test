import { hogwartsProfiles, hogwartsQuestions } from "@/data/hogwarts-character";

export function parseHogwartsAnswers(value: unknown): number[] | null {
  return typeof value === "string" && /^[0-3]{12}$/.test(value) ? Array.from(value, Number) : null;
}

export function calculateHogwartsResult(answers: readonly number[]) {
  if (answers.length !== hogwartsQuestions.length || Array.from(answers).some((answer) => !Number.isInteger(answer) || answer < 0 || answer > 3)) {
    throw new Error("Expected 12 answers between 0 and 3");
  }
  const ranked = hogwartsProfiles.map((profile, order) => {
    let points = 0;
    let maximum = 0;
    let strongMatches = 0;
    hogwartsQuestions.forEach((question, index) => {
      const weight = question.options[answers[index]].weights[profile.slug];
      points += weight;
      maximum += Math.max(...question.options.map((option) => option.weights[profile.slug]));
      if (weight === 3) strongMatches++;
    });
    return { profile, score: points / maximum, strongMatches, order };
  }).sort((a, b) => b.score - a.score || b.strongMatches - a.strongMatches || a.order - b.order);
  return { profile: ranked[0].profile, ranked };
}
