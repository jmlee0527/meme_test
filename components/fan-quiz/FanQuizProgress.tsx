import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import type { FanQuizTheme } from "@/config/fanQuizThemes";

export function FanQuizProgress({ progress, theme, reduceMotion }: { progress: number; theme: FanQuizTheme; reduceMotion?: boolean | null }) {
  const style = {
    "--fan-primary": theme.primary,
    "--fan-accent": theme.accent,
    "--fan-progress-bg": theme.progressBackground,
  } as CSSProperties;

  return (
    <div
      style={style}
      className="mt-4 h-3 overflow-hidden rounded-full bg-[var(--fan-progress-bg)] shadow-inner"
      role="progressbar"
      aria-label="퀴즈 진행률"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full rounded-full bg-[linear-gradient(90deg,var(--fan-primary),var(--fan-accent))]"
        animate={{ width: `${Math.max(progress, 4)}%` }}
        transition={{ duration: reduceMotion ? 0 : 0.35 }}
      />
    </div>
  );
}
