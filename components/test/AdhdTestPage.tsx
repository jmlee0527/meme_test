"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { adhdChoices, adhdQuestions } from "@/data/adhd-test";
import { ADHD_QUESTION_COUNT, calculateAdhdResult, encodeAdhdAnswers } from "@/lib/adhd-engine";

export function AdhdTestPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const lockRef = useRef(false);

  const current = adhdQuestions[index];
  const selected = answers[index];
  const progress = Math.round(((index + 1) / ADHD_QUESTION_COUNT) * 100);

  const select = (value: number) => {
    if (lockRef.current || !current) return;
    lockRef.current = true;
    const nextAnswers = answers.slice(0, index);
    nextAnswers[index] = value;
    setAnswers(nextAnswers);
    window.setTimeout(() => {
      lockRef.current = false;
      if (nextAnswers.length >= ADHD_QUESTION_COUNT) {
        const result = calculateAdhdResult(nextAnswers);
        router.push(`/adhd-test/result/${result.profile.slug}?a=${encodeAdhdAnswers(nextAnswers)}`);
      } else {
        setIndex(nextAnswers.length);
      }
    }, reduceMotion ? 0 : 220);
  };

  // 시작 화면: 의료 고지 필수 표시
  if (!started) {
    return (
      <main className="min-h-[calc(100vh-5rem)] bg-[radial-gradient(circle_at_top,#e0e7ff_0,#f8fafc_45%,#f8fafc_100%)] py-10 sm:py-16">
        <div className="container-page mx-auto max-w-2xl">
          <section className="rounded-[2rem] border border-white/90 bg-white/90 p-8 shadow-2xl shadow-indigo-100/60 backdrop-blur sm:p-12">
            <p className="text-center text-xs font-black tracking-[.16em] text-indigo-500">ADHD SELF-CHECK</p>
            <h1 className="mt-3 text-center text-3xl font-black tracking-tight text-ink sm:text-4xl">ADHD 자가진단 테스트</h1>
            <p className="mt-3 text-center text-sm font-medium text-slate-500">최근 6개월간의 행동을 바탕으로 ADHD 관련 특성을 확인해보세요.</p>
            <div className="mt-7 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5">
              <p className="text-sm font-black text-indigo-900">⚕️ 시작 전에 꼭 읽어주세요</p>
              <p className="mt-3 text-sm leading-7 text-indigo-950">
                이 테스트는 <strong>ADHD를 진단하는 의료검사가 아닙니다.</strong> 세계적으로 널리 사용되는 ADHD 선별검사(ASRS)의 평가 개념을 참고하여,
                현재 ADHD 관련 특성이 어느 정도 나타나는지 확인하는 <strong>참고용 자가 체크</strong>입니다.
                정확한 진단은 반드시 <strong>정신건강의학과 전문의의 평가</strong>를 통해 이루어져야 합니다.
              </p>
            </div>
            <ul className="mx-auto mt-6 grid max-w-md gap-2.5 text-sm font-bold text-slate-600">
              <li className="rounded-xl bg-slate-50 px-4 py-3">🗓️ 모든 질문은 <strong>최근 6개월</strong>을 기준으로 답해주세요</li>
              <li className="rounded-xl bg-slate-50 px-4 py-3">📋 총 18문항 · 5단계 척도 · 약 3분 소요</li>
              <li className="rounded-xl bg-slate-50 px-4 py-3">🔒 응답은 서버에 저장되지 않습니다</li>
            </ul>
            <button type="button" onClick={() => setStarted(true)} className="mt-8 w-full rounded-2xl bg-ink px-6 py-4 text-base font-black text-white shadow-xl transition hover:bg-slate-800 active:scale-[.99]">이해했어요, 자가 체크 시작하기</button>
          </section>
        </div>
      </main>
    );
  }

  if (!current) return null;

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[radial-gradient(circle_at_top,#e0e7ff_0,#f8fafc_45%,#f8fafc_100%)] py-6 sm:py-12">
      <div className="container-page mx-auto max-w-2xl">
        <header className="mb-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black tracking-[.16em] text-indigo-500">ADHD SELF-CHECK</p>
              <h1 className="mt-2 text-xl font-black text-ink sm:text-2xl">ADHD 자가진단 테스트</h1>
            </div>
            <strong className="shrink-0 text-sm text-slate-500">{index + 1} / {ADHD_QUESTION_COUNT}</strong>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white shadow-inner" role="progressbar" aria-label="테스트 진행률" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <motion.div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-500" animate={{ width: `${Math.max(progress, 4)}%` }} transition={{ duration: reduceMotion ? 0 : 0.3 }} />
          </div>
          <p className="mt-3 rounded-xl bg-indigo-50 px-4 py-2.5 text-xs font-bold leading-5 text-indigo-800">🗓️ <strong>최근 6개월</strong> 동안의 나를 기준으로 답해주세요.</p>
        </header>

        <AnimatePresence mode="wait">
          <motion.section key={current.id} initial={reduceMotion ? false : { opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -24 }} transition={{ duration: 0.2 }} className="rounded-[2rem] border border-white/90 bg-white/90 p-6 shadow-2xl shadow-indigo-100/60 backdrop-blur sm:p-10">
            <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-black text-indigo-700">질문 {index + 1}</span>
            <h2 className="mt-6 min-h-24 text-balance text-xl font-black leading-[1.5] tracking-tight text-ink sm:text-2xl">{current.text}</h2>
            <div className="mt-8 grid gap-2.5" role="radiogroup" aria-label="답변 선택">
              {adhdChoices.map((choice) => (
                <motion.button
                  key={choice.value}
                  type="button"
                  role="radio"
                  aria-checked={selected === choice.value}
                  onClick={() => select(choice.value)}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  className={`flex min-h-14 items-center gap-4 rounded-2xl border px-4 text-left text-sm font-bold transition sm:px-5 ${selected === choice.value ? "border-indigo-500 bg-indigo-50 text-indigo-800 shadow-md" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50"}`}
                >
                  <span className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-black ${selected === choice.value ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}>{choice.value}</span>
                  {choice.label}
                </motion.button>
              ))}
            </div>
          </motion.section>
        </AnimatePresence>

        <div className="mt-5 flex items-center justify-between">
          <button type="button" onClick={() => setIndex((currentIndex) => Math.max(currentIndex - 1, 0))} disabled={index === 0} className="min-h-12 rounded-xl px-4 text-sm font-bold text-slate-500 transition hover:bg-white disabled:opacity-30">← 이전 질문</button>
          <p className="text-right text-[11px] leading-5 text-slate-400">의료 진단이 아닌 참고용 자가 체크입니다.<br />응답은 서버에 저장되지 않습니다.</p>
        </div>
      </div>
    </main>
  );
}
