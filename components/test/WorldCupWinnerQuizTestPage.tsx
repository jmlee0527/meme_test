"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  WORLD_CUP_WINNER_QUIZ_SIZE,
  calculateWorldCupWinnerQuizResult,
  encodeWorldCupWinnerAnswers,
  loadRecentWorldCupWinnerQuestionIds,
  pickWorldCupWinnerQuestions,
  saveRecentWorldCupWinnerQuestionIds,
} from "@/lib/worldcup-winner-engine";
import { shuffle } from "@/lib/football-quiz-engine";
import type { WorldCupWinnerQuestion } from "@/lib/types";

type PresentedQuestion = { question: WorldCupWinnerQuestion; choiceOrder: number[] };

const choiceBadges = ["A", "B", "C", "D"];

export function WorldCupWinnerQuizTestPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [presented, setPresented] = useState<PresentedQuestion[] | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const questions = pickWorldCupWinnerQuestions(loadRecentWorldCupWinnerQuestionIds());
    setPresented(questions.map((question) => ({ question, choiceOrder: shuffle(question.semifinalists.map((_, choiceIndex) => choiceIndex)) })));
  }, []);

  const current = presented?.[index];
  const selected = answers[index];
  const progress = Math.round(((index + 1) / WORLD_CUP_WINNER_QUIZ_SIZE) * 100);

  const select = (originalIndex: number) => {
    if (!presented || locked) return;
    const nextAnswers = answers.slice(0, index);
    nextAnswers[index] = originalIndex;
    setAnswers(nextAnswers);
    setLocked(true);
    window.setTimeout(() => {
      setLocked(false);
      if (index < presented.length - 1) {
        setIndex(index + 1);
        return;
      }
      const quizAnswers = presented.map(({ question }, questionIndex) => ({ questionId: question.id, choice: nextAnswers[questionIndex] }));
      const result = calculateWorldCupWinnerQuizResult(quizAnswers);
      saveRecentWorldCupWinnerQuestionIds(presented.map(({ question }) => question.id));
      router.push(`/worldcup-winner-quiz/result/${result.grade.slug}?r=${encodeWorldCupWinnerAnswers(quizAnswers)}`);
    }, reduceMotion ? 0 : 280);
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[radial-gradient(circle_at_top,#dcfce7_0,#f8fafc_46%,#eef2ff_100%)] py-6 sm:py-12">
      <div className="container-page mx-auto max-w-2xl">
        <header className="mb-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black tracking-[.16em] text-green-600">WORLD CUP WINNERS QUIZ</p>
              <h1 className="mt-2 text-xl font-black text-ink sm:text-2xl">역대 월드컵 우승국은?</h1>
            </div>
            <strong className="shrink-0 text-sm text-slate-500">{Math.min(index + 1, WORLD_CUP_WINNER_QUIZ_SIZE)} / {WORLD_CUP_WINNER_QUIZ_SIZE}</strong>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white shadow-inner" role="progressbar" aria-label="퀴즈 진행률" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <motion.div className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500" animate={{ width: `${Math.max(progress, 4)}%` }} transition={{ duration: reduceMotion ? 0 : 0.35 }} />
          </div>
        </header>

        {!current ? (
          <section className="grid min-h-72 place-items-center rounded-[2rem] border border-white/90 bg-white/90 p-10 shadow-2xl shadow-green-100/60" aria-busy="true">
            <div className="text-center">
              <span className="text-5xl" aria-hidden="true">🏆</span>
              <p className="mt-4 text-sm font-bold text-slate-500">1930~2022 문제은행에서 오늘의 10문제를 뽑는 중...</p>
            </div>
          </section>
        ) : (
          <AnimatePresence mode="wait">
            <motion.section key={current.question.id} initial={reduceMotion ? false : { opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -24 }} transition={{ duration: 0.22 }} className="rounded-[2rem] border border-white/90 bg-white/90 p-6 shadow-2xl shadow-green-100/60 backdrop-blur sm:p-10">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-black text-green-700">문제 {index + 1}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-500">4강 국가 보기</span>
              </div>
              <p className="mt-7 text-sm font-black tracking-[.16em] text-green-600">어느 나라가 우승했을까요?</p>
              <h2 className="mt-3 text-balance text-3xl font-black leading-[1.25] tracking-tight text-ink sm:text-4xl">{current.question.year}년 {current.question.host} 월드컵</h2>
              <div className="mt-8 grid gap-2.5" role="radiogroup" aria-label="우승국 선택">
                {current.choiceOrder.map((originalIndex, position) => {
                  const isSelected = selected === originalIndex;
                  return (
                    <motion.button
                      key={originalIndex}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => select(originalIndex)}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                      animate={isSelected && !reduceMotion ? { scale: [1, 1.02, 1] } : undefined}
                      transition={{ duration: 0.22 }}
                      className={`flex min-h-16 items-center gap-4 rounded-2xl border px-4 text-left text-base font-black transition sm:px-5 ${isSelected ? "border-green-500 bg-green-50 text-green-800 shadow-md" : "border-slate-200 bg-white text-slate-700 hover:border-green-300 hover:bg-green-50/50"}`}
                    >
                      <span className={`grid size-9 shrink-0 place-items-center rounded-full text-xs font-black ${isSelected ? "bg-green-600 text-white" : "bg-slate-100 text-slate-500"}`}>{choiceBadges[position]}</span>
                      {current.question.semifinalists[originalIndex]}
                    </motion.button>
                  );
                })}
              </div>
            </motion.section>
          </AnimatePresence>
        )}

        <div className="mt-5 flex items-center justify-between">
          <button type="button" onClick={() => setIndex((currentIndex) => Math.max(currentIndex - 1, 0))} disabled={index === 0 || !current} className="min-h-12 rounded-xl px-4 text-sm font-bold text-slate-500 transition hover:bg-white disabled:opacity-30">← 이전 문제</button>
          <p className="text-right text-[11px] leading-5 text-slate-400">전체 22개 대회 중 10문제가 랜덤 출제됩니다.<br />응답은 서버에 저장되지 않습니다.</p>
        </div>
      </div>
    </main>
  );
}
