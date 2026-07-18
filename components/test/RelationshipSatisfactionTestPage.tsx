"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { relationshipQuestions } from "@/data/relationship-satisfaction";
import {
  RELATIONSHIP_QUESTION_COUNT,
  calculateRelationshipSatisfactionResult,
  encodeRelationshipDimensionScores,
} from "@/lib/relationship-satisfaction-engine";

const choiceBadges = ["A", "B", "C", "D"];

export function RelationshipSatisfactionTestPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [answers, setAnswers] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const lockRef = useRef(false);

  const current = relationshipQuestions[index];
  const selected = answers[index];
  const progress = Math.round(((index + 1) / RELATIONSHIP_QUESTION_COUNT) * 100);

  const select = (value: number) => {
    if (lockRef.current || !current) return;
    lockRef.current = true;
    const nextAnswers = answers.slice(0, index);
    nextAnswers[index] = value;
    setAnswers(nextAnswers);
    window.setTimeout(() => {
      lockRef.current = false;
      if (nextAnswers.length >= RELATIONSHIP_QUESTION_COUNT) {
        const result = calculateRelationshipSatisfactionResult(nextAnswers);
        const dimensionQuery = encodeRelationshipDimensionScores(result.dimensionScores);
        router.push(`/relationship-satisfaction-test/result/${result.grade.slug}?s=${result.score}&d=${dimensionQuery}`);
      } else {
        setIndex(nextAnswers.length);
      }
    }, reduceMotion ? 0 : 220);
  };

  if (!current) return null;

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[radial-gradient(circle_at_top,#ede9fe_0,#fdf2f8_38%,#f8fafc_100%)] py-6 sm:py-12">
      <div className="container-page mx-auto max-w-2xl">
        <header className="mb-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black tracking-[.16em] text-violet-600">RELATIONSHIP SATISFACTION TEST</p>
              <h1 className="mt-2 text-xl font-black text-ink sm:text-2xl">연애 관계 만족도 테스트</h1>
            </div>
            <strong className="shrink-0 text-sm text-slate-500">{index + 1} / {RELATIONSHIP_QUESTION_COUNT}</strong>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white shadow-inner" role="progressbar" aria-label="테스트 진행률" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <motion.div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-pink-500" animate={{ width: `${Math.max(progress, 4)}%` }} transition={{ duration: reduceMotion ? 0 : 0.3 }} />
          </div>
          <p className="mt-3 rounded-xl bg-violet-50 px-4 py-2.5 text-xs font-bold leading-5 text-violet-800">
            최근 2~3개월의 평소 관계를 기준으로, 실제 경험과 가장 가까운 답을 골라주세요.
          </p>
        </header>

        <AnimatePresence mode="wait">
          <motion.section key={current.id} initial={reduceMotion ? false : { opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -24 }} transition={{ duration: 0.2 }} className="rounded-[2rem] border border-white/90 bg-white/90 p-6 shadow-2xl shadow-violet-100/60 backdrop-blur sm:p-10">
            <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-black text-violet-700">질문 {index + 1}</span>
            <h2 className="mt-6 min-h-24 text-balance text-xl font-black leading-[1.5] tracking-tight text-ink sm:text-2xl">{current.text}</h2>
            <div className="mt-8 grid gap-2.5" role="radiogroup" aria-label="답변 선택">
              {current.options.map((choice, choiceIndex) => (
                <motion.button
                  key={choice.score}
                  type="button"
                  role="radio"
                  aria-checked={selected === choice.score}
                  onClick={() => select(choice.score)}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  className={`flex min-h-16 items-center gap-4 rounded-2xl border px-4 text-left text-sm font-bold transition sm:px-5 ${selected === choice.score ? "border-violet-500 bg-violet-50 text-violet-800 shadow-md" : "border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:bg-violet-50/50"}`}
                >
                  <span className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-black ${selected === choice.score ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-500"}`}>{choiceBadges[choiceIndex]}</span>
                  {choice.text}
                </motion.button>
              ))}
            </div>
          </motion.section>
        </AnimatePresence>

        <div className="mt-5 flex items-center justify-between gap-4">
          <button type="button" onClick={() => setIndex((currentIndex) => Math.max(currentIndex - 1, 0))} disabled={index === 0} className="min-h-12 rounded-xl px-4 text-sm font-bold text-slate-500 transition hover:bg-white disabled:opacity-30">← 이전 질문</button>
          <p className="text-right text-[11px] leading-5 text-slate-400">개별 응답은 서버에 저장되지 않습니다.<br />결과 URL에도 문항별 답변을 넣지 않습니다.</p>
        </div>
      </div>
    </main>
  );
}
