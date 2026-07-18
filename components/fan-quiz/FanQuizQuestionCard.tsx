import type { CSSProperties, ReactNode } from "react";
import type { FanQuizTheme } from "@/config/fanQuizThemes";

type Option = {
  label: string;
  text: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
};

type Props = {
  theme: FanQuizTheme;
  questionNumber: number;
  category: string;
  difficulty: string;
  question: ReactNode;
  options: Option[];
  focusLabel?: string;
};

export function FanQuizQuestionCard({ theme, questionNumber, category, difficulty, question, options, focusLabel = "정답 선택" }: Props) {
  const style = {
    "--fan-primary": theme.primary,
    "--fan-primary-strong": theme.primaryStrong,
    "--fan-background": theme.background,
    "--fan-surface": theme.surface,
    "--fan-text": theme.text,
    "--fan-muted": theme.mutedText,
    "--fan-border": theme.border,
    "--fan-shadow": theme.shadow,
    boxShadow: `0 24px 60px ${theme.shadow}`,
  } as CSSProperties;

  return (
    <section style={style} className="relative overflow-hidden rounded-[2rem] border border-[var(--fan-border)] bg-[var(--fan-surface)] p-5 sm:p-9">
      <div className="absolute right-5 top-5 hidden rounded-full border border-[var(--fan-border)] bg-white/70 px-3 py-1 text-[10px] font-black tracking-[.14em] text-[var(--fan-primary)] sm:block" aria-hidden="true">
        FAN PASS
      </div>
      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full bg-[var(--fan-background)] px-3 py-1.5 text-xs font-black text-[var(--fan-primary)]">문제 {questionNumber}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-700">{difficulty}</span>
      </div>
      <p className="relative mt-7 text-xs font-black tracking-[.16em] text-[var(--fan-primary)]">MIMI FAN QUIZ · {category}</p>
      <h2 className="relative mt-3 break-words text-balance text-2xl font-black leading-[1.35] tracking-tight text-[var(--fan-text)] sm:text-3xl">{question}</h2>
      <div className="relative mt-8 grid gap-3" role="radiogroup" aria-label={focusLabel}>
        {options.map((option) => (
          <button
            key={option.label}
            type="button"
            role="radio"
            aria-checked={option.selected}
            aria-label={`${option.label}번 보기: ${option.text}`}
            disabled={option.disabled}
            onClick={option.onClick}
            className={`flex min-h-16 items-center gap-4 rounded-2xl border px-4 text-left text-base font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fan-primary)] disabled:cursor-wait sm:px-5 ${
              option.selected
                ? "border-[var(--fan-primary)] bg-[var(--fan-background)] text-[var(--fan-primary-strong)] shadow-md"
                : "border-slate-200 bg-white text-slate-700 hover:border-[var(--fan-primary)] hover:bg-[var(--fan-background)]"
            }`}
          >
            <span className={`grid size-9 shrink-0 place-items-center rounded-full text-xs font-black ${option.selected ? "bg-[var(--fan-primary)] text-white" : "bg-slate-100 text-slate-500"}`}>
              {option.selected ? "✓" : option.label}
            </span>
            <span className="min-w-0 break-words">{option.text}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
