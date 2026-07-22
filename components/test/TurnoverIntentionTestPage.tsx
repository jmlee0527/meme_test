"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TURNOVER_QUESTION_COUNT, turnoverAnswerLabels, turnoverMeasurementGuide, turnoverQuestions } from "@/data/turnover-intention";
import { calculateTurnoverResult, encodeTurnoverAnswers, firstUnansweredIndex, type TurnoverAnswer } from "@/lib/turnover-intention-engine";

const SESSION_KEY = "mimi-turnover-intention-progress";

// 개별 답변 내용은 절대 이벤트로 보내지 않습니다. 이벤트 이름만 기록합니다.
const track = (name: string) => {
  if (typeof window === "undefined") return;
  (window as Window & { gtag?: (command: string, event: string) => void }).gtag?.("event", name);
};

export function TurnoverIntentionTestPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [answers, setAnswers] = useState<(TurnoverAnswer | undefined)[]>([]);
  const [index, setIndex] = useState(0);
  const [locked, setLocked] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    window.sessionStorage.removeItem(SESSION_KEY);
    setAnswers([]);
    setIndex(0);
    if (!startedRef.current) { startedRef.current = true; track("turnover_test_start"); }
  }, []);

  const persist = (nextAnswers: (TurnoverAnswer | undefined)[], nextIndex: number) => {
    try {
      window.sessionStorage.setItem(SESSION_KEY, JSON.stringify({ answers: nextAnswers.map((value) => value ?? null), index: nextIndex }));
    } catch {
      // 저장 실패는 진행에 영향을 주지 않습니다.
    }
  };

  const question = turnoverQuestions[index];
  const selected = answers[index];
  const progress = Math.round(((index + 1) / TURNOVER_QUESTION_COUNT) * 100);

  const choose = (value: TurnoverAnswer) => {
    if (locked || !question) return;
    const nextAnswers = answers.slice();
    nextAnswers[index] = value;
    setAnswers(nextAnswers);
    setLocked(true);
    window.setTimeout(() => {
      setLocked(false);
      if (index < TURNOVER_QUESTION_COUNT - 1) {
        const nextIndex = index + 1;
        setIndex(nextIndex);
        persist(nextAnswers, nextIndex);
        return;
      }
      // 미응답 문항이 있으면 결과 대신 해당 문항으로 이동합니다.
      const missing = firstUnansweredIndex(nextAnswers);
      if (missing !== null) {
        setIndex(missing);
        persist(nextAnswers, missing);
        return;
      }
      const complete = nextAnswers as TurnoverAnswer[];
      const result = calculateTurnoverResult(complete);
      track("turnover_test_complete");
      window.sessionStorage.removeItem(SESSION_KEY);
      router.push(`/turnover-intention/result/${result.level.id}?a=${encodeTurnoverAnswers(complete)}`);
    }, reduceMotion ? 0 : 200);
  };

  // 키보드 1~4로 답변 선택
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const value = Number(event.key) - 1;
      if (value >= 0 && value <= 3) choose(value as TurnoverAnswer);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const goBack = () => {
    const prev = Math.max(0, index - 1);
    setIndex(prev);
    persist(answers, prev);
  };

  if (!question) return null;

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[radial-gradient(circle_at_top,#e0e7ff_0,#f5f3ff_42%,#f8fafc_100%)] py-6 sm:py-12">
      <div className="container-page mx-auto max-w-2xl">
        <header className="mb-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black tracking-[.16em] text-indigo-600">TURNOVER INTENTION CHECK</p>
              <h1 className="mt-2 text-xl font-black text-ink sm:text-2xl">이직 의향 테스트</h1>
            </div>
            <strong className="shrink-0 text-sm text-slate-500">{index + 1} / {TURNOVER_QUESTION_COUNT}</strong>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white shadow-inner" role="progressbar" aria-label="테스트 진행률" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <motion.div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" animate={{ width: `${Math.max(progress, 4)}%` }} transition={{ duration: reduceMotion ? 0 : 0.3 }} />
          </div>
          <p className="mt-3 rounded-xl bg-indigo-50 px-4 py-2.5 text-xs font-bold leading-5 text-indigo-900">{turnoverMeasurementGuide}</p>
        </header>

        <AnimatePresence mode="wait">
          <motion.section key={question.id} initial={reduceMotion ? false : { opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -24 }} transition={{ duration: 0.2 }} className="rounded-[2rem] border border-white/90 bg-white/95 p-6 shadow-2xl shadow-indigo-100/60 backdrop-blur sm:p-10">
            <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-black text-indigo-700">질문 {index + 1}</span>
            <h2 className="mt-6 min-h-20 text-balance text-xl font-black leading-[1.5] tracking-tight text-ink sm:text-2xl">{question.text}</h2>
            <div className="mt-8 grid gap-2.5" role="radiogroup" aria-label="답변 선택 (키보드 1~4로도 선택할 수 있어요)">
              {turnoverAnswerLabels.map((label, value) => {
                const active = selected === value;
                return (
                  <motion.button
                    key={label}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    aria-label={`${value + 1}번: ${label}`}
                    onClick={() => choose(value as TurnoverAnswer)}
                    disabled={locked}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    className={`flex min-h-14 items-center gap-4 rounded-2xl border px-4 text-left text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-wait sm:px-5 ${active ? "border-indigo-500 bg-indigo-50 text-indigo-900 shadow-md" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50"}`}
                  >
                    <span className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-black ${active ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}>{value + 1}</span>
                    {label}
                  </motion.button>
                );
              })}
            </div>
          </motion.section>
        </AnimatePresence>

        <div className="mt-5 flex items-center justify-between gap-4">
          <button type="button" onClick={goBack} disabled={index === 0 || locked} className="min-h-12 rounded-xl px-4 text-sm font-bold text-slate-500 transition hover:bg-white disabled:opacity-30">← 이전 질문</button>
          <p className="text-right text-[11px] leading-5 text-slate-400">키보드 1~4로도 답할 수 있어요.<br />답변은 서버에 저장되지 않습니다.</p>
        </div>
      </div>
    </main>
  );
}
