import type { CSSProperties } from "react";
import type { FanQuizTheme } from "@/config/fanQuizThemes";

type Badge = {
  label: string;
  value: string;
};

export function FanQuizMetaBadges({ badges, theme }: { badges: Badge[]; theme: FanQuizTheme }) {
  const style = {
    "--fan-primary": theme.primary,
    "--fan-border": theme.border,
    "--fan-surface": theme.surface,
  } as CSSProperties;

  return (
    <ul style={style} className="flex flex-wrap gap-2">
      {badges.map((badge) => (
        <li key={`${badge.label}-${badge.value}`} className="rounded-full border border-[var(--fan-border)] bg-[var(--fan-surface)] px-3 py-1.5 text-xs font-black text-[var(--fan-primary)] shadow-sm">
          <span className="sr-only">{badge.label}: </span>{badge.value}
        </li>
      ))}
    </ul>
  );
}
