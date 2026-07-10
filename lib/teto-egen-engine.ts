import {
  TETO_EGEN_QUIZ_SIZE,
  getTetoEgenQuestion,
  getTetoEgenResultByPercent,
  tetoEgenDifficultyQuota,
  tetoEgenQuestions,
  validateTetoEgenQuestionBank,
} from "@/data/teto-egen";
import type {
  TetoEgenAnswer,
  TetoEgenDifficulty,
  TetoEgenPresentedQuestion,
  TetoEgenQuestion,
  TetoEgenQuestionCategory,
  TetoEgenResultProfile,
} from "@/lib/types";

export { TETO_EGEN_QUIZ_SIZE } from "@/data/teto-egen";

const RECENT_STORAGE_KEY = "mimi-teto-egen-recent";
const RECENT_LIMIT = 28;

function randomInt(max: number) {
  if (max <= 0) return 0;
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
  }
  return Math.floor(Math.random() * max);
}

function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function presentQuestion(question: TetoEgenQuestion): TetoEgenPresentedQuestion {
  const optionOrder = shuffle(question.answers.map((_, index) => index));
  return {
    ...question,
    originalId: question.id,
    answers: optionOrder.map((index) => question.answers[index]),
    optionOrder,
  };
}

function pickByDifficulty(
  difficulty: TetoEgenDifficulty,
  count: number,
  selected: TetoEgenQuestion[],
  recentIds: string[],
) {
  const pool = shuffle(tetoEgenQuestions.filter((question) => question.difficulty === difficulty));
  const fresh = pool.filter((question) => !recentIds.includes(question.id));
  const candidates = fresh.length >= count ? fresh : pool;

  // 6개 질문 카테고리(의사결정·대인관계·감정·갈등·계획·행동)가 고루 섞이도록 우선순위를 둡니다.
  const picked: TetoEgenQuestion[] = [];
  const seenCategories = new Set<TetoEgenQuestionCategory>(selected.map((question) => question.category));
  const diverseFirst = [...candidates].sort(
    (a, b) => Number(seenCategories.has(a.category)) - Number(seenCategories.has(b.category)),
  );
  for (const question of diverseFirst) {
    if (picked.length >= count) break;
    if (picked.some((item) => item.id === question.id)) continue;
    picked.push(question);
    seenCategories.add(question.category);
  }
  if (picked.length !== count) throw new Error(`테토·에겐 ${difficulty} 문항이 부족합니다. (필요 ${count}, 선택 ${picked.length})`);
  return picked;
}

export function selectTetoEgenQuestions(recentIds: string[] = []): TetoEgenPresentedQuestion[] {
  validateTetoEgenQuestionBank();
  const selected: TetoEgenQuestion[] = [];
  selected.push(...pickByDifficulty("easy", tetoEgenDifficultyQuota.easy, selected, recentIds));
  selected.push(...pickByDifficulty("medium", tetoEgenDifficultyQuota.medium, selected, recentIds));
  selected.push(...pickByDifficulty("hard", tetoEgenDifficultyQuota.hard, selected, recentIds));
  if (selected.length !== TETO_EGEN_QUIZ_SIZE) throw new Error(`테토·에겐 테스트는 ${TETO_EGEN_QUIZ_SIZE}문항이어야 합니다.`);
  return shuffle(selected).map(presentQuestion);
}

export function loadRecentTetoEgenQuestionIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(RECENT_STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function saveRecentTetoEgenQuestionIds(newIds: string[]) {
  if (typeof window === "undefined") return;
  try {
    const merged = [...newIds, ...loadRecentTetoEgenQuestionIds().filter((id) => !newIds.includes(id))].slice(0, RECENT_LIMIT);
    window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // localStorage 접근 실패는 테스트 진행에 영향을 주지 않도록 무시합니다.
  }
}

export type TetoEgenResult = {
  tetoPercent: number;
  egenPercent: number;
  tetoRaw: number;
  egenRaw: number;
  profile: TetoEgenResultProfile;
};

export function calculateTetoEgenResult(answers: TetoEgenAnswer[]): TetoEgenResult {
  let tetoRaw = 0;
  let egenRaw = 0;
  for (const answer of answers) {
    const question = getTetoEgenQuestion(answer.questionId);
    const option = question?.answers[answer.choice];
    if (!question || !option) continue;
    tetoRaw += option.tetoScore * question.weight;
    egenRaw += option.egenScore * question.weight;
  }
  const total = tetoRaw + egenRaw;
  const tetoPercent = total > 0 ? Math.round((tetoRaw / total) * 100) : 50;
  const egenPercent = 100 - tetoPercent;
  return { tetoPercent, egenPercent, tetoRaw, egenRaw, profile: getTetoEgenResultByPercent(tetoPercent) };
}

export function encodeTetoEgenAnswers(answers: TetoEgenAnswer[]): string {
  return answers.map((answer) => `${answer.questionId}.${answer.choice}`).join("-");
}

export function parseTetoEgenAnswers(raw?: string): TetoEgenAnswer[] | null {
  if (!raw) return null;
  const tokens = raw.split("-");
  if (tokens.length !== TETO_EGEN_QUIZ_SIZE) return null;
  const seen = new Set<string>();
  const answers: TetoEgenAnswer[] = [];
  for (const token of tokens) {
    const [questionId, rawChoice] = token.split(".");
    const choice = Number(rawChoice);
    const question = questionId ? getTetoEgenQuestion(questionId) : undefined;
    if (!question || seen.has(question.id) || !Number.isInteger(choice) || choice < 0 || choice >= question.answers.length) return null;
    seen.add(question.id);
    answers.push({ questionId: question.id, choice });
  }
  return answers;
}

export function tetoEgenResultPath(slug: string) {
  return `/teto-egen-test/result/${slug}`;
}
