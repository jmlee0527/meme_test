"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { FanQuizArtwork } from "@/components/fan-quiz/FanQuizArtwork";
import { getTestFanQuizTheme } from "@/config/fanQuizThemes";
import type { TestDefinition } from "@/lib/types";

export function FanQuizCard({ test, rank }: { test: TestDefinition; rank?: number }) {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const theme = getTestFanQuizTheme(test);
  const href = test.href ?? `/tests/${test.slug}`;
  const countLabel = `${test.itemCount ?? test.questions.length}문항`;
  const style = {
    "--fan-primary": theme.primary,
    "--fan-primary-strong": theme.primaryStrong,
    "--fan-secondary": theme.secondary,
    "--fan-accent": theme.accent,
    "--fan-background": theme.background,
    "--fan-surface": theme.surface,
    "--fan-text": theme.text,
    "--fan-muted": theme.mutedText,
    "--fan-border": theme.border,
    "--fan-shadow": theme.shadow,
  } as CSSProperties;

  return (
    <motion.article
      style={style}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="group relative min-h-full overflow-hidden rounded-[1.35rem] border border-[var(--fan-border)] bg-[var(--fan-surface)] shadow-card transition-shadow hover:shadow-xl"
    >
      {rank && <span className="absolute left-3 top-3 z-20 grid size-8 place-items-center rounded-xl border border-white bg-white/95 text-sm font-black shadow-sm" aria-label={`인기 ${rank}위`}>{["🥇", "🥈", "🥉"][rank - 1] ?? rank}</span>}
      <Link
        href={href}
        onClick={() => {
          if (pathname === "/search") (window as Window & { gtag?: (command: string, event: string, params?: Record<string, string>) => void }).gtag?.("event", "search_result_click", { test_id: test.slug });
        }}
        className="block h-full focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--fan-primary)]"
      >
        <div className="relative overflow-hidden bg-[var(--fan-background)] px-4 pt-4">
          <div className="absolute inset-0 opacity-45 [background-image:radial-gradient(circle_at_1px_1px,var(--fan-border)_1px,transparent_0)] [background-size:18px_18px]" aria-hidden="true" />
          <div className="relative flex items-center justify-between gap-2">
            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-black tracking-[.16em] text-[var(--fan-primary)] shadow-sm">FAN QUIZ</span>
            {test.isNew && <span className="rounded-full bg-[var(--fan-primary-strong)] px-2.5 py-1 text-[9px] font-black tracking-wider text-white">NEW</span>}
          </div>
          {test.thumbnail ? (
            <div className="relative mt-3 aspect-[4/3] overflow-hidden rounded-[1.1rem] border border-white/70 bg-white shadow-sm">
              <Image src={test.thumbnail} alt={test.title} fill sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw" className="object-cover object-center transition duration-500 group-hover:scale-[1.03]" priority={Boolean(rank && rank <= 3)} />
            </div>
          ) : (
            <FanQuizArtwork theme={theme} compact label="QUIZ" />
          )}
        </div>
        <div className="p-4">
          <h3 className="min-h-[3rem] line-clamp-2 text-base font-black leading-6 tracking-tight text-[var(--fan-text)] transition group-hover:text-[var(--fan-primary)]">{test.cardTitle ?? test.title}</h3>
          <p className="mt-2 min-h-10 line-clamp-2 text-xs leading-5 text-[var(--fan-muted)] sm:text-sm">{test.description}</p>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--fan-border)] pt-3 text-[11px] font-black">
            <span className="text-[var(--fan-muted)]">{countLabel} · {test.duration}</span>
            <span className="shrink-0 text-[var(--fan-primary)]">도전하기 →</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
