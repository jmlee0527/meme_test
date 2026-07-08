import { mbtiQuestions, mbtiTypeProfiles } from "@/data/mbti";
import type { MbtiAxis, MbtiTypeProfile } from "@/lib/types";

export const MBTI_QUESTION_COUNT = mbtiQuestions.length;
export const MBTI_STORAGE_KEY = "mimi-mbti-progress";

export const mbtiAxes: { axis: MbtiAxis; poles: [string, string]; labels: [string, string] }[] = [
  { axis: "EI", poles: ["E", "I"], labels: ["외향", "내향"] },
  { axis: "SN", poles: ["S", "N"], labels: ["현실", "직관"] },
  { axis: "TF", poles: ["T", "F"], labels: ["사고", "감정"] },
  { axis: "JP", poles: ["J", "P"], labels: ["계획", "유연"] },
];

export type MbtiResult = {
  code: string;
  profile: MbtiTypeProfile;
  /** 축 순서(EI,SN,TF,JP)대로, 결과 글자 쪽 선택 비율(50~100%) */
  percents: number[];
  /** 축별 결과 글자 */
  letters: string[];
};

/** answers: 문항 순서대로 선택한 보기 인덱스(0|1) */
export function calculateMbtiResult(answers: number[]): MbtiResult {
  const counts: Record<string, number> = {};
  mbtiQuestions.forEach((question, index) => {
    const choice = question.options[answers[index]] ?? question.options[0];
    counts[choice.letter] = (counts[choice.letter] ?? 0) + 1;
  });
  const letters: string[] = [];
  const percents: number[] = [];
  for (const { poles } of mbtiAxes) {
    const first = counts[poles[0]] ?? 0;
    const second = counts[poles[1]] ?? 0;
    const total = Math.max(first + second, 1);
    // 동점이면 두 번째 성향(I/N/F/P)으로 처리합니다.
    const winner = first > second ? poles[0] : poles[1];
    const winnerCount = Math.max(first, second);
    letters.push(winner);
    percents.push(Math.round((winnerCount / total) * 100));
  }
  const code = letters.join("");
  const profile = mbtiTypeProfiles.find((item) => item.code === code) ?? mbtiTypeProfiles[0];
  return { code, profile, percents, letters };
}

/** 결과 URL 쿼리(p=70-60-55-80) 파싱: 축별 결과 글자 비율 */
export function parseMbtiPercents(raw?: string): number[] | null {
  if (!raw) return null;
  const percents = raw.split("-").map(Number);
  if (percents.length !== mbtiAxes.length) return null;
  if (percents.some((value) => !Number.isInteger(value) || value < 50 || value > 100)) return null;
  return percents;
}

type StoredProgress = { answers: number[]; updatedAt: number };

export function loadMbtiProgress(): number[] | null {
  if (typeof window === "undefined") return null;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(MBTI_STORAGE_KEY) ?? "null") as StoredProgress | null;
    if (!parsed || !Array.isArray(parsed.answers)) return null;
    const answers = parsed.answers.filter((value): value is number => value === 0 || value === 1);
    return answers.length > 0 && answers.length < MBTI_QUESTION_COUNT ? answers : null;
  } catch {
    return null;
  }
}

export function saveMbtiProgress(answers: number[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(MBTI_STORAGE_KEY, JSON.stringify({ answers, updatedAt: Date.now() } satisfies StoredProgress));
  } catch {
    // 저장 실패(시크릿 모드 등)는 무시합니다.
  }
}

export function clearMbtiProgress() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(MBTI_STORAGE_KEY);
  } catch {
    // ignore
  }
}
