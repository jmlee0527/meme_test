"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { formatFanQuizLevel, getFanQuizLevel } from "@/config/fanQuizThemes";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { arsenalFanGradeProfiles } from "@/data/arsenal-fan";
import type { ArsenalFanGradeProfile, ArsenalQuizQuestion } from "@/lib/types";

function useCountUp(target: number, duration = 1000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const ratio = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - (1 - ratio) ** 3)));
      if (ratio < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return value;
}

type Props = {
  grade: ArsenalFanGradeProfile;
  fanIndex: number | null;
  totalCorrect: number | null;
  total: number;
  weightedScore: number | null;
  maxScore: number;
  easyCorrect: number | null;
  mediumCorrect: number | null;
  hardCorrect: number | null;
  wrong: { question: ArsenalQuizQuestion; choice: number }[];
  categoryRates: { label: string; correct: number; total: number; rate: number }[];
  encodedAnswers: string | null;
};

const difficultyRows = [
  { key: "easy", label: "초급", total: 5, color: "bg-slate-500" },
  { key: "medium", label: "중급", total: 6, color: "bg-amber-500" },
  { key: "hard", label: "고급", total: 4, color: "bg-red-600" },
] as const;

export function ArsenalFanQuizResult({
  grade,
  fanIndex,
  totalCorrect,
  total,
  weightedScore,
  maxScore,
  easyCorrect,
  mediumCorrect,
  hardCorrect,
  wrong,
  categoryRates,
  encodedAnswers,
}: Props) {
  const score = fanIndex ?? grade.maxScore;
  const displayScore = useCountUp(fanIndex ?? 0);
  const hasResult = fanIndex !== null;
  const difficultyCorrect = { easy: easyCorrect ?? 0, medium: mediumCorrect ?? 0, hard: hardCorrect ?? 0 };
  const shareTitle = grade.shareText.replace("{score}", String(score));
  const sharePath = `/arsenal-fan-test/result/${grade.slug}${encodedAnswers ? `?r=${encodedAnswers}` : ""}`;
  const level = getFanQuizLevel(score, 100);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fee2e2_0,#fff7ed_34%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "아스날 팬 테스트", href: "/tests/arsenal-fan-test" }, { name: `${grade.title} 결과` }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="relative overflow-hidden rounded-[2.25rem] bg-[#111827] text-center text-white shadow-2xl">
              <div className="absolute inset-0 opacity-[.18] [background-image:linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px)] [background-size:28px_28px]" />
              <div className="absolute -left-24 top-10 size-64 rounded-full bg-red-600/30 blur-3xl" />
              <div className="absolute -right-24 bottom-8 size-64 rounded-full bg-amber-400/20 blur-3xl" />
              <div className="relative px-6 pb-8 pt-10 sm:px-10 sm:pt-14">
                <p className="text-sm font-extrabold text-amber-300">{hasResult ? "나의 아스날 팬 레벨은" : "아스날 팬 테스트 결과 등급"}</p>
                <div className="mx-auto mt-6 grid size-40 place-items-center rounded-full p-2 shadow-lg" style={{ background: `conic-gradient(#dc2626 ${hasResult ? displayScore : grade.maxScore}%, rgba(255,255,255,.15) 0)` }}>
                  <div className="grid size-full place-items-center rounded-full bg-[#111827]">
                    <span>
                      <strong className="block text-3xl font-black text-white">{formatFanQuizLevel(level)}</strong>
                      <span className="mt-1 block text-[11px] font-bold text-slate-400">{hasResult ? `${displayScore}/100점` : `${grade.minScore}~${grade.maxScore}점 구간`}</span>
                    </span>
                  </div>
                </div>
                <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">{grade.title}</h1>
                <p className="mx-auto mt-3 max-w-xl text-base font-semibold leading-7 text-slate-200">{grade.subtitle}</p>
                {hasResult && totalCorrect !== null && (
                  <div className="mx-auto mt-6 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-3"><span className="block text-xs text-slate-300">정답</span><strong className="text-xl">{totalCorrect}/{total}</strong></div>
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-3"><span className="block text-xs text-slate-300">LEVEL</span><strong className="text-xl">{level}</strong></div>
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-3"><span className="block text-xs text-slate-300">중급</span><strong className="text-xl">{mediumCorrect}/6</strong></div>
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-3"><span className="block text-xs text-slate-300">고급</span><strong className="text-xl">{hardCorrect}/4</strong></div>
                  </div>
                )}
              </div>
              <div className="relative border-t border-white/10 bg-white px-6 py-7 text-slate-700 sm:px-10">
                <p className="mx-auto max-w-2xl leading-7">{grade.description}</p>
              </div>
            </section>
          </SectionReveal>

          <AdRectangle />

          <section className="mt-8 grid gap-5 lg:grid-cols-[.95fr_1.05fr]">
            <SectionReveal className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-extrabold text-ink">난이도별 정답</h2>
              <div className="mt-6 space-y-4">
                {difficultyRows.map((row) => {
                  const correct = difficultyCorrect[row.key];
                  const rate = Math.round((correct / row.total) * 100);
                  return (
                    <div key={row.key}>
                      <div className="flex items-center justify-between text-sm font-bold"><span>{row.label}</span><span>{correct}/{row.total}</span></div>
                      <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${row.color}`} style={{ width: `${rate}%` }} /></div>
                    </div>
                  );
                })}
              </div>
            </SectionReveal>
            <SectionReveal className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-extrabold text-ink">분야별 정답률</h2>
              {categoryRates.length > 0 ? (
                <div className="mt-6 space-y-4">
                  {categoryRates.map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between text-sm font-bold"><span>{item.label}</span><span>{item.correct}/{item.total}</span></div>
                      <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-red-600 to-amber-400" style={{ width: `${item.rate}%` }} /></div>
                    </div>
                  ))}
                </div>
              ) : <p className="mt-4 text-sm text-slate-500">퀴즈를 풀면 분야별 정답률이 표시됩니다.</p>}
            </SectionReveal>
          </section>

          <SectionReveal className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-extrabold text-ink">이 등급의 강점</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {grade.strengths.map((item) => (
                <li key={item} className="rounded-2xl bg-red-50 p-4 text-sm font-bold leading-6 text-red-900">✓ {item}</li>
              ))}
            </ul>
          </SectionReveal>

          {hasResult && wrong.length > 0 && (
            <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-extrabold text-ink">오답 노트 <span className="text-sm font-bold text-slate-400">({wrong.length}문제)</span></h2>
              <div className="mt-5 space-y-3">
                {wrong.map(({ question, choice }, index) => (
                  <details key={question.id} className="group rounded-2xl border border-slate-100 bg-slate-50/70 p-4 open:bg-white">
                    <summary className="cursor-pointer list-none font-extrabold leading-6 text-ink">
                      <span className="mr-2 text-red-600">Q{index + 1}</span>{question.question}
                      <span className="float-right text-xs text-slate-400 group-open:hidden">펼치기</span>
                    </summary>
                    <dl className="mt-4 space-y-2 text-sm">
                      <div className="flex gap-2"><dt className="shrink-0 font-black text-rose-500">내 답</dt><dd className="text-slate-600 line-through decoration-rose-300">{question.options[choice]}</dd></div>
                      <div className="flex gap-2"><dt className="shrink-0 font-black text-green-600">정답</dt><dd className="font-extrabold text-ink">{question.options[question.correctAnswer]}</dd></div>
                      <div className="flex gap-2"><dt className="shrink-0 font-black text-slate-500">난이도</dt><dd className="text-slate-600">{question.difficulty === "easy" ? "초급" : question.difficulty === "medium" ? "중급" : "고급"}</dd></div>
                    </dl>
                    <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-6 text-slate-600">💡 {question.explanation}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {hasResult && wrong.length === 0 && (
            <section className="mt-8 rounded-3xl border border-red-100 bg-red-50/70 p-6 text-center shadow-card sm:p-8">
              <h2 className="text-xl font-extrabold text-red-900">🎉 전 문항 정답!</h2>
              <p className="mt-2 text-sm leading-6 text-red-800">난이도 가중 문제까지 모두 해결했습니다. 이 정도면 아스날 기록 담당자급입니다.</p>
            </section>
          )}

          {!hasResult && (
            <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-extrabold text-ink">아스날 팬 지수 등급표</h2>
              <ul className="mt-5 grid gap-2.5">
                {arsenalFanGradeProfiles.map((profile) => (
                  <li key={profile.slug}>
                    <Link href={`/arsenal-fan-test/result/${profile.slug}`} className={`flex items-center gap-4 rounded-2xl border px-4 py-3.5 transition hover:-translate-y-0.5 ${profile.slug === grade.slug ? "border-red-400 bg-red-50" : "border-slate-200 bg-white hover:border-red-200"}`}>
                      <span className="grid size-9 place-items-center rounded-full bg-red-100 text-sm font-black text-red-700">{profile.minScore}</span>
                      <span className="font-extrabold text-ink">{profile.title}</span>
                      <span className="ml-auto text-xs font-black text-slate-400">{profile.minScore}~{profile.maxScore}점</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section id="share-card" className="mt-10 grid scroll-mt-24 gap-6 rounded-3xl bg-ink p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji="🔴" eyebrow="아스날 팬 테스트" title={`${formatFanQuizLevel(level)} · ${grade.title}`} subtitle={grade.subtitle} badge={`${score}점`} accent="orange" />
            <div>
              <h2 className="text-xl font-extrabold">친구의 아스날 팬 지수는?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">결과를 공유하고 누가 더 진성 구너인지 가볍게 겨뤄보세요. 정답과 문제 내용은 공유되지 않습니다.</p>
              <div className="mt-5"><ShareButtons title={shareTitle} description={grade.subtitle} path={sharePath} /></div>
            </div>
          </section>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/tests/arsenal-fan-test?start=1" className="inline-flex rounded-xl bg-primary px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">랜덤 15문제 다시 풀기</Link>
            <Link href="/tests/arsenal-fan-test" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50">테스트 소개 보기</Link>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-5 text-slate-400">본 테스트는 아스날 FC 또는 프리미어리그의 공식 서비스가 아닌 비공식 팬 퀴즈입니다. 공식 로고·선수 사진·구단 엠블럼을 사용하지 않았으며, 응답은 서버에 저장되지 않습니다.</p>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
