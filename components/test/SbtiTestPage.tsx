"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { sbtiQuestions } from "@/data/sbti";
import { SBTI_QUESTION_COUNT, calculateSbtiResult, encodeSbtiStats } from "@/lib/sbti-engine";

export function SbtiTestPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [answers, setAnswers] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const lockRef = useRef(false);

  const current = sbtiQuestions[index];
  const progress = Math.round(((index + 1) / SBTI_QUESTION_COUNT) * 100);

  const select = (choice: number) => {
    if (lockRef.current || !current) return;
    lockRef.current = true;
    const nextAnswers = answers.slice(0, index);
    nextAnswers[index] = choice;
    setAnswers(nextAnswers);
    window.setTimeout(() => {
      lockRef.current = false;
      if (nextAnswers.length >= SBTI_QUESTION_COUNT) {
        const result = calculateSbtiResult(nextAnswers);
        router.push(`/tests/sbti/result/${result.profile.slug}?v=${encodeSbtiStats(result.stats)}`);
      } else {
        setIndex(nextAnswers.length);
      }
    }, reduceMotion ? 0 : 240);
  };

  if (!current) return null;

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[radial-gradient(circle_at_top,#ffe4e6_0,#f8fafc_45%,#f8fafc_100%)] py-6 sm:py-12">
      <div className="container-page mx-auto max-w-2xl">
        <header className="mb-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black tracking-[.16em] text-rose-500">SBTI MEME TEST</p>
              <h1 className="mt-2 text-xl font-black text-ink sm:text-2xl">SBTI 테스트 · 나의 밈 유형은?</h1>
            </div>
            <strong className="shrink-0 text-sm text-slate-500">{index + 1} / {SBTI_QUESTION_COUNT}</strong>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white shadow-inner" role="progressbar" aria-label="테스트 진행률" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <motion.div className="h-full rounded-full bg-gradient-to-r from-rose-400 to-pink-500" animate={{ width: `${Math.max(progress, 4)}%` }} transition={{ duration: reduceMotion ? 0 : 0.3 }} />
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.section key={current.id} initial={reduceMotion ? false : { opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -24 }} transition={{ duration: 0.2 }} className="rounded-[2rem] border border-white/90 bg-white/90 p-6 shadow-2xl shadow-rose-100/60 backdrop-blur sm:p-10">
            <span className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-black text-rose-600">상황 {index + 1}</span>
            <h2 className="mt-6 min-h-20 text-balance text-xl font-black leading-[1.5] tracking-tight text-ink sm:text-2xl">{current.text}</h2>
            <div className="mt-8 grid gap-3" role="radiogroup" aria-label="선택지">
              {current.options.map((option, optionIndex) => (
                <motion.button
                  key={optionIndex}
                  type="button"
                  role="radio"
                  aria-checked={answers[index] === optionIndex}
                  onClick={() => select(optionIndex)}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  className={`flex min-h-16 items-center gap-4 rounded-2xl border px-5 text-left text-sm font-bold leading-6 transition sm:text-base ${answers[index] === optionIndex ? "border-rose-400 bg-rose-50 text-rose-900 shadow-md" : "border-slate-200 bg-white text-slate-700 hover:border-rose-300 hover:bg-rose-50/50"}`}
                >
                  <span className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-black ${answers[index] === optionIndex ? "bg-rose-500 text-white" : "bg-slate-100 text-slate-500"}`}>{optionIndex === 0 ? "A" : "B"}</span>
                  {option.text}
                </motion.button>
              ))}
            </div>
          </motion.section>
        </AnimatePresence>

        <div className="mt-5 flex items-center justify-between">
          <button type="button" onClick={() => setIndex((currentIndex) => Math.max(currentIndex - 1, 0))} disabled={index === 0} className="min-h-12 rounded-xl px-4 text-sm font-bold text-slate-500 transition hover:bg-white disabled:opacity-30">← 이전 상황</button>
          <p className="text-right text-[11px] leading-5 text-slate-400">정답은 없습니다. 더 뜨끔한 쪽을 고르세요.<br />응답은 서버에 저장되지 않습니다.</p>
        </div>
      </div>
    </main>
  );
}
