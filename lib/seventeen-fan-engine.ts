import { SEVENTEEN_QUIZ_SIZE, getSeventeenGrade, getSeventeenQuestion, seventeenDifficultyQuota, seventeenQuestions } from "@/data/seventeen-fan";
import type { SeventeenDifficulty, SeventeenQuestion } from "@/data/seventeen-fan";

export type SeventeenPresentedQuestion = SeventeenQuestion & { originalId: string; optionOrder: number[] };
export type SeventeenAnswer = { questionId: string; choice: number };

const albumTokens = ["SEVENTEENTH HEAVEN", "YOU MADE MY DAWN", "YOU MAKE MY DAY", "SPILL THE FEELS", "HAPPY BURSTDAY", "Face the Sun", "LOVE&LETTER", "17 CARAT", "SECTOR 17", "Heng:garae", "Your Choice", "Attacca", "Semicolon", "BOYS BE", "FML", "Al1"];

function hashSeed(seed: string) {
  let value = 2166136261;
  for (let i = 0; i < seed.length; i += 1) value = Math.imul(value ^ seed.charCodeAt(i), 16777619);
  return value >>> 0;
}

function randomFactory(seed: string) {
  let state = hashSeed(seed) || 1;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededShuffle<T>(items: readonly T[], seed: string): T[] {
  const random = randomFactory(seed);
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function isBirthdayQuestion(question: SeventeenQuestion) {
  return question.type.includes("생일") || question.prompt.includes("생일");
}

export function getAlbumGroup(question: SeventeenQuestion) {
  const searchable = [question.prompt, question.explanation, ...question.seoKeywords].join(" ").toLowerCase();
  return albumTokens.find((token) => searchable.includes(token.toLowerCase())) ?? null;
}

function validSelection(questions: SeventeenQuestion[]) {
  if (questions.filter(isBirthdayQuestion).length > 2) return false;
  const albumCounts = new Map<string, number>();
  for (const question of questions) {
    const album = getAlbumGroup(question);
    if (!album) continue;
    const count = (albumCounts.get(album) ?? 0) + 1;
    if (count > 2) return false;
    albumCounts.set(album, count);
  }
  return true;
}

export function createSeventeenSession(seed: string): SeventeenPresentedQuestion[] {
  for (let attempt = 0; attempt < 200; attempt += 1) {
    const selected = (Object.keys(seventeenDifficultyQuota) as SeventeenDifficulty[]).flatMap((difficulty) =>
      seededShuffle(seventeenQuestions.filter((question) => question.difficulty === difficulty), `${seed}:${attempt}:${difficulty}`).slice(0, seventeenDifficultyQuota[difficulty]),
    );
    if (!validSelection(selected)) continue;
    return seededShuffle(selected, `${seed}:${attempt}:questions`).map((question) => {
      const optionOrder = seededShuffle(question.choices.map((_, index) => index), `${seed}:${question.id}:options`);
      return { ...question, originalId: question.id, choices: optionOrder.map((index) => question.choices[index]), optionOrder };
    });
  }
  throw new Error("세븐틴 퀴즈 편중 방지 조건을 만족하는 세션을 만들 수 없습니다.");
}

export function calculateSeventeenResult(answers: SeventeenAnswer[]) {
  const reviews = answers.flatMap((answer) => {
    const question = getSeventeenQuestion(answer.questionId);
    return question ? [{ question, choice: answer.choice, correct: answer.choice === question.answerIndex }] : [];
  });
  const score = reviews.filter((review) => review.correct).length;
  const byDifficulty = (Object.keys(seventeenDifficultyQuota) as SeventeenDifficulty[]).map((difficulty) => ({
    difficulty,
    total: seventeenDifficultyQuota[difficulty],
    correct: reviews.filter((review) => review.question.difficulty === difficulty && review.correct).length,
  }));
  return { score, accuracy: Math.round((score / SEVENTEEN_QUIZ_SIZE) * 100), grade: getSeventeenGrade(score), reviews, byDifficulty };
}

export function encodeSeventeenAnswers(answers: SeventeenAnswer[]) { return answers.map((answer) => `${answer.questionId}.${answer.choice}`).join("-"); }
export function parseSeventeenAnswers(raw?: string): SeventeenAnswer[] | null {
  if (!raw) return null;
  const answers = raw.split("-").map((token) => { const [questionId, choice] = token.split("."); return { questionId, choice: Number(choice) }; });
  if (answers.length !== SEVENTEEN_QUIZ_SIZE || new Set(answers.map((answer) => answer.questionId)).size !== SEVENTEEN_QUIZ_SIZE) return null;
  return answers.every((answer) => getSeventeenQuestion(answer.questionId) && Number.isInteger(answer.choice) && answer.choice >= 0 && answer.choice < 4) ? answers : null;
}
