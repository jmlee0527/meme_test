"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { snsQuestions } from "@/data/sns-type";
import { SNS_QUESTION_COUNT, calculateSnsResult, encodeSnsAnswers } from "@/lib/sns-type-engine";

export function SnsTypeTestPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [answers, setAnswers] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const lockRef = useRef(false);

  const current = snsQuestions[index];
  const progress = Math.round(((index + 1) / SNS_QUESTION_COUNT) * 100);

  const select = (choice: number) => {
    if (lockRef.current || !current) return;
    lockRef.current = true;
    const nextAnswers = answers.slice(0, index);
    nextAnswers[index] = choice;
    setAnswers(nextAnswers);
    window.setTimeout(() => {
      lockRef.current = false;
      if (nextAnswers.length >= SNS_QUESTION_COUNT) {
        const result = calculateSnsResult(nextAnswers);
        router.push(`/sns-type-test/result/${result.profile.slug}?a=${encodeSnsAnswers(nextAnswers)}`);
      } else {
        setIndex(nextAnswers.length);
      }
    }, reduceMotion ? 0 : 260);
  };

  if (!current) return null;

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[radial-gradient(circle_at_top,#fce7f3_0,#f8fafc_45%,#f8fafc_100%)] py-6 sm:py-12">
      <div className="container-page mx-auto max-w-2xl">
        <header className="mb-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black tracking-[.16em] text-pink-500">SNS TYPE TEST</p>
              <h1 className="mt-2 text-xl font-black text-ink sm:text-2xl">📱 나의 SNS 유형 테스트</h1>
            </div>
            <strong className="shrink-0 text-sm text-slate-500">{index + 1} / {SNS_QUESTION_COUNT}</strong>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white shadow-inner" role="progressbar" aria-label="테스트 진행률" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <motion.div className="h-full rounded-full bg-gradient-to-r from-pink-500 to-rose-400" animate={{ width: `${Math.max(progress, 5)}%` }} transition={{ duration: reduceMotion ? 0 : 0.3 }} />
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.section key={current.id} initial={reduceMotion ? false : { opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -24 }} transition={{ duration: 0.2 }} className="rounded-[2rem] border border-white/90 bg-white/90 p-6 shadow-2xl shadow-pink-100/60 backdrop-blur sm:p-10">
            <h2 className="min-h-16 text-balance text-center text-xl font-black leading-[1.5] tracking-tight text-ink sm:text-2xl">{current.text}</h2>
            <div className="mt-7 grid grid-cols-2 gap-3" role="radiogroup" aria-label="선택지">
              {current.options.map((option, optionIndex) => {
                const isSelected = answers[index] === optionIndex;
                const isLastOdd = current.options.length % 2 === 1 && optionIndex === current.options.length - 1;
                return (
                  <motion.button
                    key={optionIndex}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => select(optionIndex)}
                    whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                    className={`flex min-h-28 flex-col items-center justify-center gap-2 rounded-2xl border px-3 py-4 text-center transition ${isLastOdd ? "col-span-2" : ""} ${isSelected ? "border-pink-400 bg-pink-50 shadow-md" : "border-slate-200 bg-white hover:border-pink-300 hover:bg-pink-50/50"}`}
                  >
                    <span className="text-4xl" aria-hidden="true">{option.emoji}</span>
                    <span className={`text-sm font-bold leading-5 ${isSelected ? "text-pink-900" : "text-slate-700"}`}>{option.text}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.section>
        </AnimatePresence>

        <div className="mt-5 flex items-center justify-between">
          <button type="button" onClick={() => setIndex((currentIndex) => Math.max(currentIndex - 1, 0))} disabled={index === 0} className="min-h-12 rounded-xl px-4 text-sm font-bold text-slate-500 transition hover:bg-white disabled:opacity-30">← 이전 질문</button>
          <p className="text-right text-[11px] leading-5 text-slate-400">정답은 없어요. 평소의 나를 고르면 됩니다.<br />응답은 서버에 저장되지 않습니다.</p>
        </div>
      </div>
    </main>
  );
}
