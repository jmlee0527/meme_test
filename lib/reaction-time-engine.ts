import { reactionGradeProfiles } from "@/data/reaction-time";
import type { ReactionGradeProfile } from "@/lib/types";

export const REACTION_ROUNDS = 3;

/** 초록 화면 전환까지의 대기 시간: 800~4000ms 사이의 완전한 랜덤 */
export const randomWaitMs = () => 800 + Math.random() * 3200;

export function getReactionGrade(averageMs: number): ReactionGradeProfile {
  return (
    reactionGradeProfiles.find((profile) => averageMs >= profile.minMs && averageMs <= profile.maxMs) ??
    reactionGradeProfiles[reactionGradeProfiles.length - 1]
  );
}

export const averageReactionMs = (rounds: number[]) => Math.round(rounds.reduce((sum, ms) => sum + ms, 0) / rounds.length);

/** 결과 URL 쿼리(r=224-232-228) 파싱. 3회의 유효한 기록(50~3000ms)일 때만 결과로 인정합니다. */
export function parseReactionRounds(raw?: string): number[] | null {
  if (!raw) return null;
  const rounds = raw.split("-").map(Number);
  if (rounds.length !== REACTION_ROUNDS) return null;
  if (rounds.some((ms) => !Number.isInteger(ms) || ms < 50 || ms > 3000)) return null;
  return rounds;
}
