import type { CSSProperties } from "react";
import type { FanQuizTheme } from "@/config/fanQuizThemes";

type Props = {
  theme: FanQuizTheme;
  compact?: boolean;
  label?: string;
};

const iconPaths = {
  lightstick: (
    <>
      <path d="M88 44a28 28 0 1 1-56 0 28 28 0 0 1 56 0Z" fill="white" stroke="currentColor" strokeWidth="6" />
      <path d="M60 72v46" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
      <path d="M46 118h28" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M46 44h28M60 30v28" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity=".35" />
    </>
  ),
  ticket: (
    <>
      <path d="M24 40c9 0 16-7 16-16h80c0 9 7 16 16 16v56c-9 0-16 7-16 16H40c0-9-7-16-16-16V40Z" fill="white" stroke="currentColor" strokeWidth="6" />
      <path d="M55 38v76" stroke="currentColor" strokeWidth="4" strokeDasharray="7 8" opacity=".45" />
      <path d="M72 52h40M72 70h30M72 88h34" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    </>
  ),
  microphone: (
    <>
      <rect x="46" y="22" width="48" height="72" rx="24" fill="white" stroke="currentColor" strokeWidth="6" />
      <path d="M31 70c0 24 16 40 39 40s39-16 39-40M70 110v20M48 130h44" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M58 42h24M58 58h24" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity=".4" />
    </>
  ),
  headphones: (
    <>
      <path d="M28 75a42 42 0 0 1 84 0" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <rect x="21" y="72" width="24" height="42" rx="12" fill="white" stroke="currentColor" strokeWidth="6" />
      <rect x="95" y="72" width="24" height="42" rx="12" fill="white" stroke="currentColor" strokeWidth="6" />
      <path d="M50 116c8 8 32 8 40 0" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity=".45" />
    </>
  ),
  badge: (
    <>
      <path d="M70 18 84 34l21-1 3 21 17 12-10 18 4 21-20 7-11 18-18-10-18 10-11-18-20-7 4-21-10-18 17-12 3-21 21 1L70 18Z" fill="white" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
      <path d="m48 74 14 14 32-34" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  sports: (
    <>
      <circle cx="70" cy="70" r="48" fill="white" stroke="currentColor" strokeWidth="6" />
      <path d="M38 48c16 10 48 10 64 0M38 92c16-10 48-10 64 0M70 22c-16 18-16 78 0 96M70 22c16 18 16 78 0 96" stroke="currentColor" strokeWidth="5" opacity=".48" />
    </>
  ),
} as const;

export function FanQuizArtwork({ theme, compact = false, label }: Props) {
  const style = {
    "--fan-primary": theme.primary,
    "--fan-primary-strong": theme.primaryStrong,
    "--fan-secondary": theme.secondary,
    "--fan-accent": theme.accent,
    "--fan-border": theme.border,
  } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      style={style}
      className={`relative mx-auto ${compact ? "h-32 w-36" : "h-72 w-full max-w-sm"} text-[var(--fan-primary-strong)]`}
    >
      <div className="absolute inset-x-6 bottom-6 top-8 rotate-[-4deg] rounded-[2rem] border-2 border-dashed border-[var(--fan-border)] bg-white/70" />
      <div className="absolute inset-x-8 bottom-3 top-5 rotate-3 rounded-[1.5rem] bg-[var(--fan-secondary)]/60 shadow-lg" />
      <div className="absolute left-1/2 top-1/2 grid size-36 -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] place-items-center rounded-[2rem] border-4 border-[var(--fan-primary)] bg-[var(--fan-surface,#fffdf7)] shadow-xl">
        <svg viewBox="0 0 140 140" className="size-28" role="img">
          {iconPaths[theme.iconType]}
        </svg>
      </div>
      <span className="absolute left-4 top-8 rotate-[-8deg] rounded-full bg-white px-3 py-1 text-xs font-black text-[var(--fan-primary-strong)] shadow-sm">FAN PASS</span>
      <span className="absolute right-5 top-2 grid size-10 rotate-12 place-items-center rounded-full bg-[var(--fan-accent)] text-sm font-black text-white shadow-sm">✓</span>
      <span className="absolute bottom-8 left-2 text-3xl text-[var(--fan-accent)]">★</span>
      <span className="absolute bottom-10 right-7 rounded-full bg-white px-3 py-1 text-xs font-black text-[var(--fan-primary)] shadow-sm">{label ?? "LEVEL UP"}</span>
    </div>
  );
}
