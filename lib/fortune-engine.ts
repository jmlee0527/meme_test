import { fortuneCards, fortuneResults } from "@/data/fortune-data";
import type { FortuneCard, FortuneCardId, FortuneResult } from "@/lib/types";

export type StoredFortune = {
  dateKey: string;
  cardId: FortuneCardId;
  resultId: string;
  drawCount: number;
};

export const FORTUNE_STORAGE_KEY = "mimi-today-fortune";

export function getKoreanDateKey(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function hashString(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0);
}

export function selectDailyCards(dateKey: string, count = 5): FortuneCard[] {
  const offset = hashString(dateKey) % fortuneCards.length;
  return Array.from({ length: count }, (_, index) => fortuneCards[(offset + index * 2) % fortuneCards.length]);
}

export function pickFortuneResult(cardId: FortuneCardId, seed: string): FortuneResult {
  const candidates = fortuneResults.filter((result) => result.cardId === cardId);
  const selected = candidates[hashString(`${cardId}:${seed}`) % candidates.length];
  return selected ?? fortuneResults[hashString(seed) % fortuneResults.length];
}

export function findFortuneResult(resultId: string) {
  return fortuneResults.find((result) => result.id === resultId);
}

export function findFortuneCard(cardId: FortuneCardId) {
  return fortuneCards.find((card) => card.id === cardId);
}

export function isStoredFortune(value: unknown): value is StoredFortune {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<StoredFortune>;
  return Boolean(
    item.dateKey &&
    item.cardId &&
    item.resultId &&
    typeof item.drawCount === "number" &&
    findFortuneCard(item.cardId),
  );
}
