import type { CSSProperties, ReactNode } from "react";
import type { FanQuizTheme } from "@/config/fanQuizThemes";

type Props = {
  theme: FanQuizTheme;
  label: string;
  score: ReactNode;
  subtitle?: string;
};

export function FanQuizResultBadge({ theme, label, score, subtitle }: Props) {
  const style = {
    "--fan-primary": theme.primary,
    "--fan-primary-strong": theme.primaryStrong,
    "--fan-accent": theme.accent,
    "--fan-background": theme.background,
    "--fan-border": theme.border,
  } as CSSProperties;

  return (
    <div style={style} className="relative mx-auto grid size-44 place-items-center rounded-[2rem] border-4 border-[var(--fan-primary)] bg-white p-4 text-center shadow-xl">
      <span className="absolute -right-5 -top-4 rotate-12 rounded-full bg-[var(--fan-accent)] px-3 py-1 text-xs font-black text-white shadow-sm">CERTIFIED</span>
      <span className="absolute -left-4 bottom-5 rotate-[-10deg] rounded-full border border-[var(--fan-border)] bg-[var(--fan-background)] px-3 py-1 text-xs font-black text-[var(--fan-primary)]">FAN PASS</span>
      <span>
        <span className="block text-[11px] font-black tracking-[.16em] text-[var(--fan-primary)]">{label}</span>
        <strong className="mt-2 block text-4xl font-black leading-none text-[var(--fan-primary-strong)]">{score}</strong>
        {subtitle && <span className="mt-2 block text-xs font-bold text-slate-500">{subtitle}</span>}
      </span>
    </div>
  );
}
