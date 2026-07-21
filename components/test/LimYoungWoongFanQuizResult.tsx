"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { formatFanQuizLevel, getFanQuizLevel } from "@/config/fanQuizThemes";
import { limYoungWoongFanGradeProfiles } from "@/data/limyoungwoong-fan";
import type { LimYoungWoongFanGradeProfile, LimYoungWoongQuizQuestion } from "@/lib/types";

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
  grade: LimYoungWoongFanGradeProfile;
  fanIndex: number | null;
  totalCorrect: number | null;
  total: number;
  weightedScore: number | null;
  maxScore: number;
  easyCorrect: number | null;
  mediumCorrect: number | null;
  hardCorrect: number | null;
  expertCorrect: number | null;
  wrong: { question: LimYoungWoongQuizQuestion; choice: number }[];
  categoryRates: { label: string; correct: number; total: number; rate: number }[];
  encodedAnswers: string | null;
};

export function LimYoungWoongFanQuizResult({
  grade,
  fanIndex,
  totalCorrect,
  total,
  weightedScore,
  maxScore,
  wrong,
  categoryRates,
  encodedAnswers,
}: Props) {
  const score = fanIndex ?? grade.maxScore;
  const displayScore = useCountUp(fanIndex ?? 0);
  const hasResult = fanIndex !== null;
  const shareTitle = (grade.shareTexts[0] ?? "나의 임영웅 팬심 지수는 {score}점!").replace("{score}", String(score));
  const sharePath = `/limyoungwoong-fan-test/result/${grade.slug}${encodedAnswers ? `?r=${encodedAnswers}` : ""}`;
  const level = getFanQuizLevel(score, 100);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#dbeafe_0,#fffbeb_36%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "임영웅 찐팬 테스트", href: "/tests/limyoungwoong-fan-test" }, { name: `${grade.title} 결과` }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="relative overflow-hidden rounded-[2.25rem] bg-[#201124] text-center text-white shadow-2xl">
              <div className="absolute inset-0 opacity-[.16] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.5)_1px,transparent_0)] [background-size:28px_28px]" />
              <div className="absolute -left-24 top-10 size-64 rounded-full bg-blue-500/30 blur-3xl" />
              <div className="absolute -right-24 bottom-8 size-64 rounded-full bg-amber-300/20 blur-3xl" />
              <div className="relative px-6 pb-8 pt-10 sm:px-10 sm:pt-14">
                <p className="text-sm font-extrabold text-amber-200">{hasResult ? "나의 임영웅 팬심 레벨은" : "임영웅 찐팬 테스트 결과 등급"}</p>
                <div className="mx-auto mt-6 grid size-40 place-items-center rounded-full p-2 shadow-lg" style={{ background: `conic-gradient(#3b82f6 ${hasResult ? displayScore : grade.maxScore}%, rgba(255,255,255,.15) 0)` }}>
                  <div className="grid size-full place-items-center rounded-full bg-[#201124]">
                    <span>
                      <strong className="block text-3xl font-black text-white">{formatFanQuizLevel(level)}</strong>
                      <span className="mt-1 block text-[11px] font-bold text-slate-300">{hasResult ? `${displayScore}/100점` : `${grade.minScore}~${grade.maxScore}점 구간`}</span>
                    </span>
                  </div>
                </div>
                <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">{grade.title}</h1>
                <p className="mx-auto mt-3 max-w-xl text-base font-semibold leading-7 text-slate-100">{grade.summary}</p>
                {hasResult && totalCorrect !== null && (
                  <div className="mx-auto mt-6 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-3"><span className="block text-xs text-slate-300">정답</span><strong className="text-xl">{totalCorrect}/{total}</strong></div>
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-3"><span className="block text-xs text-slate-300">LEVEL</span><strong className="text-xl">{level}</strong></div>
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-3"><span className="block text-xs text-slate-300">점수</span><strong className="text-xl">{weightedScore}/{maxScore}</strong></div>
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-3"><span className="block text-xs text-slate-300">팬 지수</span><strong className="text-xl">{score}점</strong></div>
                  </div>
                )}
              </div>
              <div className="relative border-t border-white/10 bg-white px-6 py-7 text-slate-700 sm:px-10">
                <p className="mx-auto max-w-2xl leading-7">{grade.description}</p>
              </div>
            </section>
          </SectionReveal>

          <AdRectangle />

          <section className="mt-8">
            <SectionReveal className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-extrabold text-ink">분야별 정답률</h2>
              {categoryRates.length > 0 ? (
                <div className="mt-6 space-y-4">
                  {categoryRates.map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between text-sm font-bold"><span>{item.label}</span><span>{item.correct}/{item.total}</span></div>
                      <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-amber-400" style={{ width: `${item.rate}%` }} /></div>
                    </div>
                  ))}
                </div>
              ) : <p className="mt-4 text-sm text-slate-500">퀴즈를 풀면 분야별 정답률이 표시됩니다.</p>}
            </SectionReveal>
          </section>

          <SectionReveal className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-extrabold text-ink">이 등급의 특징</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {grade.traits.map((item) => (
                <li key={item} className="rounded-2xl bg-pink-50 p-4 text-sm font-bold leading-6 text-pink-900">✓ {item}</li>
              ))}
            </ul>
            <h3 className="mt-8 text-lg font-extrabold text-ink">다음에 점수를 올리는 방법</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {grade.recommendations.map((item) => (
                <li key={item} className="rounded-2xl bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">🎧 {item}</li>
              ))}
            </ul>
          </SectionReveal>

          {hasResult && wrong.length > 0 && (
            <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-extrabold text-ink">오답 노트 <span className="text-sm font-bold text-slate-400">({wrong.length}문제)</span></h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">틀린 문제는 출처 메타데이터와 함께 다시 확인할 수 있어요. 최신 활동 관련 문항은 주기적인 검증이 필요합니다.</p>
              <div className="mt-5 space-y-3">
                {wrong.map(({ question, choice }, index) => (
                  <details key={question.id} className="group rounded-2xl border border-slate-100 bg-slate-50/70 p-4 open:bg-white">
                    <summary className="cursor-pointer list-none font-extrabold leading-6 text-ink">
                      <span className="mr-2 text-pink-600">Q{index + 1}</span>{question.question}
                      <span className="float-right text-xs text-slate-400 group-open:hidden">펼치기</span>
                    </summary>
                    <dl className="mt-4 space-y-2 text-sm">
                      <div className="flex gap-2"><dt className="shrink-0 font-black text-rose-500">내 답</dt><dd className="text-slate-600 line-through decoration-rose-300">{question.options[choice]}</dd></div>
                      <div className="flex gap-2"><dt className="shrink-0 font-black text-green-600">정답</dt><dd className="font-extrabold text-ink">{question.options[question.correctAnswer]}</dd></div>
                    </dl>
                    <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-6 text-slate-600">💡 {question.explanation}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-400">검증 메모: {question.factCheckNote} · 확인일 {question.verifiedAt}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {hasResult && wrong.length === 0 && (
            <section className="mt-8 rounded-3xl border border-pink-100 bg-pink-50/70 p-6 text-center shadow-card sm:p-8">
              <h2 className="text-xl font-extrabold text-pink-900">🎉 전 문항 정답!</h2>
              <p className="mt-2 text-sm leading-6 text-pink-800">전 문항을 모두 맞혔어요. 지식 퀴즈 기준으로는 팬심 만렙 인정입니다.</p>
            </section>
          )}

          {!hasResult && (
            <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-extrabold text-ink">임영웅 팬심 지수 등급표</h2>
              <ul className="mt-5 grid gap-2.5">
                {limYoungWoongFanGradeProfiles.map((profile) => (
                  <li key={profile.slug}>
                    <Link href={`/limyoungwoong-fan-test/result/${profile.slug}`} className={`flex items-center gap-4 rounded-2xl border px-4 py-3.5 transition hover:-translate-y-0.5 ${profile.slug === grade.slug ? "border-blue-400 bg-blue-50" : "border-slate-200 bg-white hover:border-blue-200"}`}>
                      <span className="grid size-9 place-items-center rounded-full bg-pink-100 text-sm font-black text-pink-700">{profile.minScore}</span>
                      <span className="font-extrabold text-ink">{profile.title}</span>
                      <span className="ml-auto text-xs font-black text-slate-400">{profile.minScore}~{profile.maxScore}점</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section id="share-card" className="mt-10 grid scroll-mt-24 gap-6 rounded-3xl bg-ink p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji="🌟" eyebrow="임영웅 찐팬 테스트" title={`${formatFanQuizLevel(level)} · ${grade.title}`} subtitle={grade.summary} badge={`${score}점`} accent="blue" />
            <div>
              <h2 className="text-xl font-extrabold">친구의 임영웅 팬심 지수는?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">결과를 공유하고 누가 더 많은 활동 기록을 알고 있는지 가볍게 비교해보세요. 정답과 문제 내용은 공유되지 않습니다.</p>
              <div className="mt-5"><ShareButtons title={shareTitle} description={grade.summary} path={sharePath} /></div>
            </div>
          </section>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/tests/limyoungwoong-fan-test?start=1" className="inline-flex rounded-xl bg-primary px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">랜덤 15문제 다시 풀기</Link>
            <Link href="/tests/limyoungwoong-fan-test" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50">테스트 소개 보기</Link>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-5 text-slate-400">본 테스트는 임영웅 또는 소속사의 공식 서비스가 아닌 비공식 팬 퀴즈입니다. 공식 사진·얼굴 이미지·저작권 이미지와 가사 인용을 사용하지 않았으며, 응답은 서버에 저장되지 않습니다.</p>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
