"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { TestDefinition } from "@/lib/types";
import { calculateResults, serializeAnswers } from "@/lib/test-engine";
import { calculateOfficeAnimalResults } from "@/lib/office-animal-engine";
import { calculateMarriageResult } from "@/lib/marriage-engine";
import { calculateKkondaeResult, serializeKkondaeAnswers } from "@/lib/kkondae-engine";
import { calculateJoseonDestinyResult, serializeJoseonAnswers } from "@/lib/joseon-destiny-engine";
import { calculatePersonalityCountryResult, serializeCountryAnswers } from "@/lib/personality-country-engine";
import { calculateColorPersonalityResult, serializeColorPersonalityAnswers } from "@/lib/color-personality-engine";
import { calculateEnneagramResult, serializeEnneagramAnswers } from "@/lib/enneagram-engine";
import { calculateLoverResult, serializeLoverAnswers } from "@/lib/lover-score-engine";
import { calculateEqScores, serializeEqAnswers } from "@/lib/eq-engine";

export function TestRunner({ test, currentAge }: { test: TestDefinition; currentAge?: number }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(boolean | number | null)[]>(Array(test.questions.length).fill(null));
  const [loading, setLoading] = useState(false);
  const selected = answers[index];
  const progress = ((index + 1) / test.questions.length) * 100;
  const question = test.questions[index];
  const isMultipleChoice = Boolean(question.options?.length);
  const shouldAutoAdvance = isMultipleChoice && !["joseon-destiny-test", "personality-country-test", "color-personality-test"].includes(test.slug);

  const select = (answer: boolean | number) => {
    const next = [...answers];
    next[index] = answer;
    setAnswers(next);
    if (shouldAutoAdvance && index < test.questions.length - 1) {
      window.setTimeout(() => setIndex((current) => current === index ? current + 1 : current), 240);
    }
  };

  const moveNext = () => {
    if (selected === null) return;
    if (index < test.questions.length - 1) {
      setIndex((current) => current + 1);
      return;
    }
    if (test.slug === "kkondae-power-test") {
      const completeAnswers = answers as number[];
      const result = calculateKkondaeResult(completeAnswers);
      setLoading(true);
      router.push(`/result/${result.profile.slug}?answers=${serializeKkondaeAnswers(completeAnswers)}`);
      return;
    }
    if (test.slug === "joseon-destiny-test") {
      const completeAnswers = answers as number[];
      const result = calculateJoseonDestinyResult(completeAnswers);
      setLoading(true);
      router.push(`/joseon-destiny-test/result/${result.profile.slug}?answers=${serializeJoseonAnswers(completeAnswers)}`);
      return;
    }
    if (test.slug === "personality-country-test") {
      const completeAnswers = answers as number[];
      const result = calculatePersonalityCountryResult(completeAnswers);
      setLoading(true);
      router.push(`/personality-country-test/result/${result.profile.slug}?answers=${serializeCountryAnswers(completeAnswers)}`);
      return;
    }
    if (test.slug === "color-personality-test") {
      const completeAnswers = answers as number[];
      const result = calculateColorPersonalityResult(completeAnswers);
      setLoading(true);
      router.push(`/color-personality-test/${result.primary.slug}?answers=${serializeColorPersonalityAnswers(completeAnswers)}`);
      return;
    }
    if (test.slug === "enneagram") {
      const completeAnswers = answers as number[];
      const result = calculateEnneagramResult(completeAnswers);
      setLoading(true);
      router.push(`/enneagram/${result.profile.slug}?answers=${serializeEnneagramAnswers(completeAnswers)}`);
      return;
    }
    if (test.slug === "lover-score-test") {
      const completeAnswers = answers as number[];
      const { profile, overallScore } = calculateLoverResult(completeAnswers);
      setLoading(true);
      router.push(
        `/lover-score-test/result/${profile.slug}?answers=${serializeLoverAnswers(
          completeAnswers,
        )}&score=${overallScore}`,
      );
      return;
    }
    if (test.slug === "eq-test") {
      const completeAnswers = answers as number[];
      const result = calculateEqScores(completeAnswers);
      setLoading(true);
      router.push(`/eq-test/result/${result.profile.slug}?answers=${serializeEqAnswers(completeAnswers)}`);
      return;
    }
    const completeAnswers = answers as boolean[];
    const top = test.slug === "marriage-timing-test"
      ? calculateMarriageResult(completeAnswers).profile
      : test.slug === "office-animal-test"
        ? calculateOfficeAnimalResults(completeAnswers)[0]
        : calculateResults(completeAnswers)[0];
    if (!top) return;
    setLoading(true);
    const ageParam = test.slug === "marriage-timing-test" && currentAge ? `&age=${currentAge}` : "";
    router.push(`/result/${top.slug}?answers=${serializeAnswers(completeAnswers)}${ageParam}`);
  };

  return (
    <section className="mx-auto max-w-2xl" aria-labelledby="question-title">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-sm font-bold">
          <span className="text-primary">질문 {index + 1}</span>
          <span className="text-slate-400">{test.questions.length}개 중 {index + 1}개</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-valuemin={1} aria-valuemax={test.questions.length} aria-valuenow={index + 1} aria-label="테스트 진행률">
          <div className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div key={index} className="animate-fade-up rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-10">
        <p className="text-sm font-bold text-slate-400">Q{index + 1}</p>
        <h1 id="question-title" className={`${isMultipleChoice ? "min-h-16" : "min-h-24"} mt-3 text-xl font-extrabold leading-relaxed tracking-tight text-ink sm:text-2xl`}>{question.text}</h1>
        {question.options ? <div className="mt-7 space-y-3">{question.options.map((option) => {
          const active = selected === option.value;
          return <button key={option.label} type="button" aria-pressed={active} onClick={() => select(option.value)} className={`flex min-h-16 w-full items-center gap-3 rounded-2xl border-2 p-3 text-left transition duration-200 active:scale-[0.99] sm:p-4 ${active ? "border-orange-400 bg-orange-50 text-orange-950 shadow-sm" : "border-slate-200 bg-white text-slate-700 hover:border-orange-200 hover:bg-orange-50/40"}`}><span className={`grid size-10 shrink-0 place-items-center rounded-xl text-sm font-black ${active ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-500"}`}>{option.label}</span><span className="text-sm font-semibold leading-6 sm:text-base">{option.text}</span></button>;
        })}</div> : <div className="mt-8 grid grid-cols-2 gap-3">
          {([true, false] as const).map((answer) => {
            const active = selected === answer;
            return (
              <button key={String(answer)} type="button" aria-pressed={active} onClick={() => select(answer)} className={`min-h-24 rounded-2xl border-2 text-2xl font-black transition duration-200 active:scale-[0.98] ${active ? "border-primary bg-blue-50 text-primary shadow-sm" : "border-slate-200 bg-white text-slate-500 hover:border-blue-300 hover:bg-slate-50"}`}>
                {answer ? "O" : "X"}<span className="mt-1 block text-xs font-semibold">{answer ? "그렇다" : "아니다"}</span>
              </button>
            );
          })}
        </div>}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button type="button" onClick={() => setIndex((current) => Math.max(0, current - 1))} disabled={index === 0 || loading} className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">이전</button>
        {(!shouldAutoAdvance || index === test.questions.length - 1) ? <button type="button" onClick={moveNext} disabled={selected === null || loading} className="min-w-32 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none">
          {loading ? test.slug === "enneagram" ? "내면의 성격 유형을 분석하는 중…" : test.slug === "eq-test" ? "감정 패턴을 분석하는 중…" : "분석 중…" : index === test.questions.length - 1 ? "결과 보기" : "다음"}
        </button> : <span className="text-xs font-bold text-slate-400">선택하면 자동으로 이동해요</span>}
      </div>
    </section>
  );
}
