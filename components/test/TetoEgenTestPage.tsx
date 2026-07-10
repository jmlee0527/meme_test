"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  TETO_EGEN_QUIZ_SIZE,
  calculateTetoEgenResult,
  encodeTetoEgenAnswers,
  loadRecentTetoEgenQuestionIds,
  saveRecentTetoEgenQuestionIds,
  selectTetoEgenQuestions,
} from "@/lib/teto-egen-engine";
import type { TetoEgenPresentedQuestion } from "@/lib/types";

const choiceBadges = ["A", "B"];

export function TetoEgenTestPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [questions, setQuestions] = useState<TetoEgenPresentedQuestion[] | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    setQuestions(selectTetoEgenQuestions(loadRecentTetoEgenQuestionIds()));
  }, []);

  const current = questions?.[index];
  const selected = answers[index];
  const progress = Math.round(((index + 1) / TETO_EGEN_QUIZ_SIZE) * 100);

  const select = (choiceIndex: number) => {
    if (!questions || !current || locked) return;
    const originalChoiceIndex = current.optionOrder[choiceIndex];
    const nextAnswers = answers.slice(0, index);
    nextAnswers[index] = originalChoiceIndex;
    setAnswers(nextAnswers);
    setLocked(true);
    window.setTimeout(() => {
      setLocked(false);
      if (index < questions.length - 1) {
        setIndex(index + 1);
        return;
      }
      const quizAnswers = questions.map((question, questionIndex) => ({
        questionId: question.originalId,
        choice: nextAnswers[questionIndex],
      }));
      const result = calculateTetoEgenResult(quizAnswers);
      saveRecentTetoEgenQuestionIds(questions.map((question) => question.originalId));
      router.push(`/teto-egen-test/result/${result.profile.slug}?r=${encodeTetoEgenAnswers(quizAnswers)}`);
    }, reduceMotion ? 0 : 240);
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[radial-gradient(circle_at_top,#ede9fe_0,#fdf4ff_40%,#f8fafc_100%)] py-6 sm:py-12">
      <div className="container-page mx-auto max-w-2xl">
        <header className="mb-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black tracking-[.16em] text-violet-600">TETO / EGEN BALANCE TEST</p>
              <h1 className="mt-2 text-xl font-black text-ink sm:text-2xl">나는 테토일까, 에겐일까?</h1>
            </div>
            <strong className="shrink-0 text-sm text-slate-500">{Math.min(index + 1, TETO_EGEN_QUIZ_SIZE)} / {TETO_EGEN_QUIZ_SIZE}</strong>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white shadow-inner" role="progressbar" aria-label="테스트 진행률" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <motion.div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" animate={{ width: `${Math.max(progress, 4)}%` }} transition={{ duration: reduceMotion ? 0 : 0.3 }} />
          </div>
          <p className="mt-3 rounded-xl bg-violet-50 px-4 py-2.5 text-xs font-bold leading-5 text-violet-800">정답은 없습니다. 실제 일상에서 내가 하는 선택과 더 가까운 쪽을 골라주세요.</p>
        </header>

        {!current ? (
          <section className="grid min-h-72 place-items-center rounded-[2rem] border border-white/90 bg-white/90 p-10 shadow-2xl shadow-violet-100/60" aria-busy="true">
            <div className="text-center">
              <span className="text-5xl" aria-hidden="true">🧬</span>
              <p className="mt-4 text-sm font-bold text-slate-500">70개 문제은행에서 오늘의 14문항을 뽑는 중...</p>
            </div>
          </section>
        ) : (
          <AnimatePresence mode="wait">
            <motion.section key={current.id} initial={reduceMotion ? false : { opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -24 }} transition={{ duration: 0.2 }} className="rounded-[2rem] border border-white/90 bg-white/95 p-6 shadow-2xl shadow-violet-100/60 backdrop-blur sm:p-10">
              <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-black text-violet-700">질문 {index + 1}</span>
              <h2 className="mt-6 min-h-20 text-balance text-xl font-black leading-[1.5] tracking-tight text-ink sm:text-2xl">{current.question}</h2>
              <div className="mt-8 grid gap-2.5" role="radiogroup" aria-label="답변 선택">
                {current.answers.map((option, choiceIndex) => {
                  const isSelected = selected === current.optionOrder[choiceIndex];
                  return (
                    <motion.button
                      key={option.label}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => select(choiceIndex)}
                      disabled={locked}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                      className={`flex min-h-16 items-center gap-4 rounded-2xl border px-4 text-left text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 disabled:cursor-wait sm:px-5 ${isSelected ? "border-violet-500 bg-violet-50 text-violet-900 shadow-md" : "border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:bg-violet-50/50"}`}
                    >
                      <span className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-black ${isSelected ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-500"}`}>{choiceBadges[choiceIndex]}</span>
                      {option.label}
                    </motion.button>
                  );
                })}
              </div>
            </motion.section>
          </AnimatePresence>
        )}

        <div className="mt-5 flex items-center justify-between gap-4">
          <button type="button" onClick={() => setIndex((currentIndex) => Math.max(currentIndex - 1, 0))} disabled={index === 0 || !current || locked} className="min-h-12 rounded-xl px-4 text-sm font-bold text-slate-500 transition hover:bg-white disabled:opacity-30">← 이전 질문</button>
          <p className="text-right text-[11px] leading-5 text-slate-400">매번 다른 조합의 14문항이 출제됩니다.<br />답변은 서버에 저장되지 않습니다.</p>
        </div>
      </div>
    </main>
  );
}
