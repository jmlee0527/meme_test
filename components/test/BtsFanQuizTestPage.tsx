"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BTS_FAN_QUIZ_SIZE,
  calculateBtsFanResult,
  encodeBtsAnswers,
  loadRecentBtsQuestionIds,
  saveRecentBtsQuestionIds,
  selectBtsQuestions,
} from "@/lib/bts-fan-engine";
import type { BtsPresentedQuestion } from "@/lib/types";

const choiceBadges = ["A", "B", "C", "D"];
const difficultyLabels = { easy: "하", medium: "중", hard: "상" };

export function BtsFanQuizTestPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [questions, setQuestions] = useState<BtsPresentedQuestion[] | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    setQuestions(selectBtsQuestions(loadRecentBtsQuestionIds()));
  }, []);

  const current = questions?.[index];
  const selected = answers[index];
  const progress = Math.round(((index + 1) / BTS_FAN_QUIZ_SIZE) * 100);

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
      const result = calculateBtsFanResult(quizAnswers);
      saveRecentBtsQuestionIds(questions.map((question) => question.originalId));
      router.push(`/bts-fan-test/result/${result.grade.slug}?r=${encodeBtsAnswers(quizAnswers)}`);
    }, reduceMotion ? 0 : 260);
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[radial-gradient(circle_at_top,#ede9fe_0,#faf5ff_38%,#f8fafc_100%)] py-6 sm:py-12">
      <div className="container-page mx-auto max-w-2xl">
        <header className="mb-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black tracking-[.16em] text-violet-600">BTS ARMY QUIZ</p>
              <h1 className="mt-2 text-xl font-black text-ink sm:text-2xl">나는 진짜 ARMY일까?</h1>
            </div>
            <strong className="shrink-0 text-sm text-slate-500">{Math.min(index + 1, BTS_FAN_QUIZ_SIZE)} / {BTS_FAN_QUIZ_SIZE}</strong>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white shadow-inner" role="progressbar" aria-label="퀴즈 진행률" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <motion.div className="h-full rounded-full bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-400" animate={{ width: `${Math.max(progress, 4)}%` }} transition={{ duration: reduceMotion ? 0 : 0.35 }} />
          </div>
        </header>

        {!current ? (
          <section className="grid min-h-72 place-items-center rounded-[2rem] border border-white/90 bg-white/90 p-10 shadow-2xl shadow-violet-100/60" aria-busy="true">
            <div className="text-center">
              <span className="text-5xl" aria-hidden="true">💜</span>
              <p className="mt-4 text-sm font-bold text-slate-500">60개 문제은행에서 오늘의 15문제를 뽑는 중...</p>
            </div>
          </section>
        ) : (
          <AnimatePresence mode="wait">
            <motion.section key={current.id} initial={reduceMotion ? false : { opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -24 }} transition={{ duration: 0.22 }} className="rounded-[2rem] border border-white/90 bg-white/95 p-6 shadow-2xl shadow-violet-100/60 backdrop-blur sm:p-10">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-black text-violet-700">문제 {index + 1}</span>
                <span className={`rounded-full px-3 py-1.5 text-xs font-black ${current.difficulty === "hard" ? "bg-slate-900 text-white" : current.difficulty === "medium" ? "bg-purple-100 text-purple-800" : "bg-slate-100 text-slate-600"}`}>난이도 {difficultyLabels[current.difficulty]}</span>
              </div>
              <p className="mt-7 text-sm font-black tracking-[.16em] text-violet-600">BTS QUIZ · {current.category}</p>
              <h2 className="mt-3 text-balance text-2xl font-black leading-[1.35] tracking-tight text-ink sm:text-3xl">{current.question}</h2>
              <div className="mt-8 grid gap-2.5" role="radiogroup" aria-label="정답 선택">
                {current.choices.map((option, choiceIndex) => {
                  const isSelected = selected === current.optionOrder[choiceIndex];
                  return (
                    <motion.button
                      key={option}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      aria-label={`${choiceBadges[choiceIndex]}번 보기: ${option}`}
                      onClick={() => select(choiceIndex)}
                      disabled={locked}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                      className={`flex min-h-16 items-center gap-4 rounded-2xl border px-4 text-left text-base font-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 disabled:cursor-wait sm:px-5 ${isSelected ? "border-violet-500 bg-violet-50 text-violet-900 shadow-md" : "border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:bg-violet-50/50"}`}
                    >
                      <span className={`grid size-9 shrink-0 place-items-center rounded-full text-xs font-black ${isSelected ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-500"}`}>{choiceBadges[choiceIndex]}</span>
                      {option}
                    </motion.button>
                  );
                })}
              </div>
            </motion.section>
          </AnimatePresence>
        )}

        <div className="mt-5 flex items-center justify-between gap-4">
          <button type="button" onClick={() => setIndex((currentIndex) => Math.max(currentIndex - 1, 0))} disabled={index === 0 || !current || locked} className="min-h-12 rounded-xl px-4 text-sm font-bold text-slate-500 transition hover:bg-white disabled:opacity-30">← 이전 문제</button>
          <p className="text-right text-[11px] leading-5 text-slate-400">하 5 · 중 5 · 상 5문제가 랜덤 출제됩니다.<br />본 퀴즈는 비공식 팬 콘텐츠입니다.</p>
        </div>
      </div>
    </main>
  );
}
