"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { FanQuizResultBadge } from "@/components/fan-quiz/FanQuizResultBadge";
import { formatFanQuizLevel, getFanQuizLevel, getTestFanQuizTheme } from "@/config/fanQuizThemes";
import { BTS_FAN_QUIZ_SIZE, btsFanGradeProfiles, btsFanTest } from "@/data/bts-fan";
import type { BtsFanGradeProfile, BtsQuizQuestion } from "@/lib/types";

function useCountUp(target: number, duration = 900) {
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
  grade: BtsFanGradeProfile;
  score: number | null;
  easyCorrect: number | null;
  mediumCorrect: number | null;
  hardCorrect: number | null;
  wrong: { question: BtsQuizQuestion; choice: number }[];
  categoryRates: { label: string; correct: number; total: number; rate: number }[];
  encodedAnswers: string | null;
};

export function BtsFanQuizResult({ grade, score, wrong, categoryRates, encodedAnswers }: Props) {
  const hasResult = score !== null;
  const shownScore = score ?? grade.maxScore;
  const displayScore = useCountUp(score ?? 0);
  const shareTitle = grade.shareText.replace("{score}", String(shownScore));
  const sharePath = `/bts-fan-test/result/${grade.slug}${encodedAnswers ? `?r=${encodedAnswers}` : ""}`;
  const theme = getTestFanQuizTheme(btsFanTest);
  const level = getFanQuizLevel(shownScore, BTS_FAN_QUIZ_SIZE);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ede9fe_0,#faf5ff_34%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "BTS 찐팬 테스트", href: "/tests/bts-fan-test" }, { name: `${grade.name} 결과` }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="relative overflow-hidden rounded-[2.25rem] bg-[#1e1b4b] text-center text-white shadow-2xl">
              {/* 콘서트 조명·별빛을 연상시키는 보라색 그라데이션 배경 (실제 사진 미사용) */}
              <div className="absolute inset-0 opacity-[.16] [background-image:radial-gradient(circle_at_20%_20%,rgba(255,255,255,.5)_1px,transparent_1.5px),radial-gradient(circle_at_70%_60%,rgba(255,255,255,.4)_1px,transparent_1.5px),radial-gradient(circle_at_40%_80%,rgba(255,255,255,.4)_1px,transparent_1.5px)] [background-size:120px_120px,90px_90px,150px_150px]" />
              <div className="absolute -left-24 top-10 size-64 rounded-full bg-violet-500/40 blur-3xl" />
              <div className="absolute -right-24 bottom-8 size-64 rounded-full bg-fuchsia-400/30 blur-3xl" />
              <div className="relative px-6 pb-8 pt-10 sm:px-10 sm:pt-14">
                <p className="text-sm font-extrabold text-violet-300">{hasResult ? "나의 BTS 팬심 지수는" : "BTS 찐팬 테스트 결과 등급"}</p>
                <div className="mt-6">
                  <FanQuizResultBadge
                    theme={theme}
                    label="ARMY LEVEL"
                    score={formatFanQuizLevel(level)}
                    subtitle={hasResult ? `${displayScore}/${BTS_FAN_QUIZ_SIZE} 정답` : grade.minScore === grade.maxScore ? `${grade.maxScore}점 구간` : `${grade.minScore}~${grade.maxScore}점 구간`}
                  />
                </div>
                <div className="mt-6 text-6xl" aria-hidden="true">{grade.icon}</div>
                <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">{grade.name}</h1>
                <p className="mx-auto mt-3 max-w-xl text-base font-semibold leading-7 text-violet-100">{grade.subtitle}</p>
                {hasResult && (
                  <div className="mx-auto mt-6 grid max-w-sm grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-3"><span className="block text-xs text-violet-200">정답</span><strong className="text-xl">{shownScore}/{BTS_FAN_QUIZ_SIZE}</strong></div>
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-3"><span className="block text-xs text-violet-200">LEVEL</span><strong className="text-xl">{formatFanQuizLevel(level)}</strong></div>
                  </div>
                )}
              </div>
              <div className="relative border-t border-white/10 bg-white px-6 py-7 text-slate-700 sm:px-10">
                <p className="mx-auto max-w-2xl leading-7">{grade.description}</p>
                <p className="mx-auto mt-4 max-w-2xl rounded-2xl bg-violet-50 px-4 py-3 text-sm font-bold leading-6 text-violet-900">💜 {grade.recommendation}</p>
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
                      <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-400" style={{ width: `${item.rate}%` }} /></div>
                    </div>
                  ))}
                </div>
              ) : <p className="mt-4 text-sm text-slate-500">퀴즈를 풀면 분야별 정답률이 표시됩니다.</p>}
            </SectionReveal>
          </section>

          {hasResult && wrong.length > 0 && (
            <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-extrabold text-ink">오답 노트 <span className="text-sm font-bold text-slate-400">({wrong.length}문제)</span></h2>
              <div className="mt-5 space-y-3">
                {wrong.map(({ question, choice }, index) => (
                  <details key={question.id} className="group rounded-2xl border border-slate-100 bg-slate-50/70 p-4 open:bg-white">
                    <summary className="cursor-pointer list-none font-extrabold leading-6 text-ink">
                      <span className="mr-2 text-violet-600">Q{index + 1}</span>{question.question}
                      <span className="float-right text-xs text-slate-400 group-open:hidden">펼치기</span>
                    </summary>
                    <dl className="mt-4 space-y-2 text-sm">
                      <div className="flex gap-2"><dt className="shrink-0 font-black text-rose-500">내 답</dt><dd className="text-slate-600 line-through decoration-rose-300">{question.choices[choice]}</dd></div>
                      <div className="flex gap-2"><dt className="shrink-0 font-black text-green-600">정답</dt><dd className="font-extrabold text-ink">{question.choices[question.correctAnswer]}</dd></div>
                      <div className="flex gap-2"><dt className="shrink-0 font-black text-slate-500">분야</dt><dd className="text-slate-600">{question.category}</dd></div>
                    </dl>
                    <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-6 text-slate-600">💡 {question.explanation}</p>
                    <p className="mt-2 text-xs text-slate-400">출처: {question.source}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {hasResult && wrong.length === 0 && (
            <section className="mt-8 rounded-3xl border border-violet-100 bg-violet-50/70 p-6 text-center shadow-card sm:p-8">
              <h2 className="text-xl font-extrabold text-violet-900">🎉 15문제 전부 정답!</h2>
              <p className="mt-2 text-sm leading-6 text-violet-800">15문제를 모두 해결했습니다. 이 정도면 공식 콘텐츠 아카이브 담당자급 레전드 ARMY입니다.</p>
            </section>
          )}

          {!hasResult && (
            <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-extrabold text-ink">BTS 팬심 지수 등급표</h2>
              <ul className="mt-5 grid gap-2.5">
                {btsFanGradeProfiles.map((profile) => (
                  <li key={profile.slug}>
                    <Link href={`/bts-fan-test/result/${profile.slug}`} className={`flex items-center gap-4 rounded-2xl border px-4 py-3.5 transition hover:-translate-y-0.5 ${profile.slug === grade.slug ? "border-violet-400 bg-violet-50" : "border-slate-200 bg-white hover:border-violet-200"}`}>
                      <span className="grid size-9 place-items-center rounded-full bg-violet-100 text-lg">{profile.icon}</span>
                      <span className="font-extrabold text-ink">{profile.name}</span>
                      <span className="ml-auto text-xs font-black text-slate-400">{profile.minScore === profile.maxScore ? `${profile.maxScore}점` : `${profile.minScore}~${profile.maxScore}점`}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section id="share-card" className="mt-10 grid scroll-mt-24 gap-6 rounded-3xl bg-ink p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={grade.icon} eyebrow="BTS 찐팬 테스트" title={`${formatFanQuizLevel(level)} · ${grade.name}`} subtitle={grade.subtitle} badge={`${shownScore}/${BTS_FAN_QUIZ_SIZE}점`} accent="purple" />
            <div>
              <h2 className="text-xl font-extrabold">친구는 진짜 ARMY일까?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">결과를 공유하고 누가 더 찐팬인지 가려보세요. 문제는 매번 새로 출제되며 정답 내용은 공유되지 않습니다.</p>
              <div className="mt-5"><ShareButtons title={shareTitle} description={grade.subtitle} path={sharePath} /></div>
            </div>
          </section>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/tests/bts-fan-test?start=1" className="inline-flex rounded-xl bg-primary px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">랜덤 15문제 다시 풀기</Link>
            <Link href="/tests/bts-fan-test" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50">테스트 소개 보기</Link>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-5 text-slate-400">본 테스트는 BTS, 하이브, 빅히트 뮤직의 공식 서비스가 아닌 비공식 팬 퀴즈입니다. 실제 사진·공식 로고를 사용하지 않았으며, 응답은 서버에 저장되지 않습니다.</p>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
