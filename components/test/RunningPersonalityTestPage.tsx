"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { runningQuestions, runningResultPath, runningTest } from "@/data/running-personality";
import { calculateRunningResult, encodeRunningAnswers, RUNNING_QUESTION_COUNT } from "@/lib/running-personality-engine";

export function RunningPersonalityTestPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [answers, setAnswers] = useState<Array<number | null>>(() => Array(RUNNING_QUESTION_COUNT).fill(null));
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const lock = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const current = runningQuestions[index];
  const completed = answers.filter((answer) => answer !== null).length;

  useEffect(() => () => {
    if (timer.current !== null) clearTimeout(timer.current);
  }, []);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [index]);

  const select = (choice: number) => {
    if (lock.current) return;
    lock.current = true;
    setTransitioning(true);
    const nextAnswers = [...answers];
    nextAnswers[index] = choice;
    setAnswers(nextAnswers);
    timer.current = setTimeout(() => {
      timer.current = null;
      if (index === RUNNING_QUESTION_COUNT - 1 && nextAnswers.every((answer) => answer !== null)) {
        const completeAnswers = nextAnswers as number[];
        const result = calculateRunningResult(completeAnswers);
        router.push(`${runningResultPath(result.profile.slug)}?a=${encodeRunningAnswers(completeAnswers)}`);
        return;
      }
      setIndex(Math.min(index + 1, RUNNING_QUESTION_COUNT - 1));
      lock.current = false;
      setTransitioning(false);
    }, reduceMotion ? 0 : 220);
  };

  const previous = () => {
    if (lock.current || index === 0) return;
    setIndex(index - 1);
  };

  return (
    <div className="container-page py-6 sm:py-10">
      <div className="mx-auto max-w-2xl">
        <header className="mb-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black tracking-wide text-emerald-800">🏃 러닝 성향 테스트</p>
              <h1 className="mt-2 text-xl font-black text-ink sm:text-2xl">{runningTest.title}</h1>
            </div>
            <p className="shrink-0 text-sm font-bold tabular-nums text-slate-600" aria-live="polite">{index + 1} / {RUNNING_QUESTION_COUNT}</p>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-emerald-100" role="progressbar" aria-label="답변 완료" aria-valuemin={0} aria-valuemax={RUNNING_QUESTION_COUNT} aria-valuenow={completed}>
            <div className="h-full bg-emerald-700 transition-[width] duration-200 motion-reduce:transition-none" style={{ width: `${completed / RUNNING_QUESTION_COUNT * 100}%` }} />
          </div>
        </header>
        <section className="paper-card p-5 sm:p-8" aria-busy={transitioning}>
          <p className="text-sm font-black text-emerald-800">QUESTION {String(index + 1).padStart(2, "0")}</p>
          <h2 ref={heading} id="running-question" tabIndex={-1} className="mt-3 text-xl font-black leading-relaxed tracking-tight text-ink outline-none sm:text-2xl">{current.text}</h2>
          {current.hint && <p id="running-hint" className="mt-3 text-sm leading-6 text-slate-500">{current.hint}</p>}
          <div className="mt-6 grid gap-3" role="group" aria-labelledby="running-question" aria-describedby={current.hint ? "running-hint" : undefined}>
            {current.options.map((option) => {
              const selected = answers[index] === option.value;
              return (
                <button key={`${current.id}-${option.value}`} type="button" aria-pressed={selected} disabled={transitioning} onClick={() => select(option.value)}
                  className={`flex min-h-16 w-full items-center gap-3 rounded-md border px-4 py-4 text-left transition-colors motion-reduce:transition-none sm:gap-4 sm:px-5 ${selected ? "border-emerald-700 bg-emerald-100 text-emerald-950" : "border-[#353535]/25 bg-[#fffdf6] text-slate-700 enabled:hover:border-emerald-700 enabled:hover:bg-emerald-50"}`}>
                  <span aria-hidden="true" className={`grid size-8 shrink-0 place-items-center rounded-full text-sm font-black ${selected ? "bg-emerald-800 text-white" : "bg-[#f4f1df] text-slate-600"}`}>{option.label}</span>
                  <span className="min-w-0 text-sm font-bold leading-6 sm:text-base">{option.text}</span>
                  {selected && <span aria-hidden="true" className="ml-auto shrink-0 font-black">✓</span>}
                </button>
              );
            })}
          </div>
        </section>
        <div className="mt-4 flex items-center justify-between gap-3">
          <button type="button" onClick={previous} disabled={index === 0 || transitioning} className="min-h-12 shrink-0 rounded-md px-3 text-sm font-bold text-slate-600 enabled:hover:bg-emerald-50 disabled:opacity-40">← 이전 질문</button>
          <p className="text-right text-xs leading-5 text-slate-500">가장 너다운 걸 하나 골라봐.<br />고르면 다음 질문으로 넘어가.</p>
        </div>
        <p className="sr-only" role="status">{transitioning && index === RUNNING_QUESTION_COUNT - 1 ? "네 러닝 유형을 찾고 있어." : ""}</p>
      </div>
    </div>
  );
}
