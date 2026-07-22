"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { formatFanQuizLevel, getFanQuizLevel, getTestFanQuizTheme } from "@/config/fanQuizThemes";
import type { TestDefinition } from "@/lib/types";

type ShareAccent = "blue" | "orange" | "pink" | "purple" | "indigo" | "green";

export type CommonFanQuizWrongReview = {
  id: string;
  question: string;
  choiceText: string;
  correctText: string;
  explanation: string;
  point: number;
  note?: string;
};

type Props = {
  test: TestDefinition;
  gradeTitle: string;
  gradeSummary: string;
  gradeDescription: string;
  hasResult: boolean;
  correctCount: number | null;
  totalCount: number;
  pointScore: number | null;
  pointMaxScore: number;
  levelScore?: number;
  levelMaxScore?: number;
  wrongReviews: CommonFanQuizWrongReview[];
  resultPath: string;
  imageSrc?: string;
  imageAlt?: string;
  imageObjectPosition?: string;
  breadcrumbResultName?: string;
  shareDescription?: string;
  disclaimer?: string;
};

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

function toShareAccent(accent: TestDefinition["accent"]): ShareAccent {
  if (accent === "orange" || accent === "pink" || accent === "purple" || accent === "indigo" || accent === "green") return accent;
  if (accent === "teal") return "green";
  return "blue";
}

function scoreLabel(score: number | null, maxScore: number) {
  return score === null ? `0/${maxScore}점` : `${score}/${maxScore}점`;
}

export function CommonFanQuizResult({
  test,
  gradeTitle,
  gradeSummary,
  gradeDescription,
  hasResult,
  correctCount,
  totalCount,
  pointScore,
  pointMaxScore,
  levelScore,
  levelMaxScore,
  wrongReviews,
  resultPath,
  imageSrc,
  imageAlt,
  imageObjectPosition = "center",
  breadcrumbResultName,
  shareDescription,
  disclaimer = "본 테스트는 공개된 자료를 바탕으로 미미테스트가 자체 제작한 비공식 팬 퀴즈입니다. 응답은 서버에 저장되지 않습니다.",
}: Props) {
  const theme = getTestFanQuizTheme(test);
  const effectiveImageSrc = imageSrc ?? test.thumbnail;
  const scoreForLevel = levelScore ?? pointScore ?? correctCount ?? 0;
  const maxForLevel = levelMaxScore ?? pointMaxScore;
  const level = getFanQuizLevel(scoreForLevel, maxForLevel);
  const displayPointScore = useCountUp(hasResult ? pointScore ?? 0 : 0);
  const displayCorrectCount = useCountUp(hasResult ? correctCount ?? 0 : 0);
  const progress = hasResult ? Math.round(((pointScore ?? 0) / pointMaxScore) * 100) : Math.round((scoreForLevel / maxForLevel) * 100);
  const pointText = scoreLabel(pointScore, pointMaxScore);
  const shareText = `${test.shortTitle ?? test.title} 결과 ${formatFanQuizLevel(level)}, ${pointText}`;

  return (
    <main className="min-h-screen pb-24 pt-8 sm:py-14" style={{ background: `radial-gradient(circle at top, ${theme.background} 0%, #fff 38%, #f8fafc 100%)` }}>
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: test.shortTitle ?? test.title, href: `/tests/${test.slug}` }, { name: breadcrumbResultName ?? `${gradeTitle} 결과` }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="relative overflow-hidden rounded-[2.25rem] text-center text-white shadow-2xl">
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${theme.primaryStrong}, ${theme.primary})` }} />
              <div className="absolute inset-0 opacity-[.15] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.55)_1px,transparent_0)] [background-size:28px_28px]" />
              <div className="absolute -left-24 top-10 size-64 rounded-full bg-white/20 blur-3xl" />
              <div className="absolute -right-24 bottom-8 size-64 rounded-full bg-white/15 blur-3xl" />
              <div className="relative grid gap-7 px-6 pb-8 pt-10 sm:px-10 sm:pt-14 lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:text-left">
                <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-2 shadow-2xl shadow-slate-950/20 lg:max-w-none">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-slate-950/30">
                    {effectiveImageSrc ? (
                      <Image
                        src={effectiveImageSrc}
                        alt={imageAlt ?? `${test.shortTitle ?? test.title} 이미지`}
                        fill
                        sizes="(max-width:1024px) 360px, 380px"
                        className="object-cover"
                        style={{ objectPosition: imageObjectPosition }}
                        priority
                      />
                    ) : (
                      <div className="grid size-full place-items-center text-7xl">{test.icon}</div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 to-transparent px-5 pb-5 pt-16 text-left">
                      <p className="text-xs font-black tracking-[.18em]" style={{ color: theme.secondary }}>{theme.label}</p>
                      <p className="mt-1 text-sm font-bold text-white/90">{test.shortTitle ?? test.title}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-extrabold" style={{ color: theme.secondary }}>{hasResult ? "나의 팬 퀴즈 레벨은" : "팬 퀴즈 결과"}</p>
                  <div className="mx-auto mt-6 grid size-40 place-items-center rounded-full p-2 shadow-lg lg:mx-0" style={{ background: `conic-gradient(${theme.accent} ${progress}%, rgba(255,255,255,.15) 0)` }}>
                    <div className="grid size-full place-items-center rounded-full" style={{ background: theme.primaryStrong }}>
                      <span>
                        <strong className="block text-3xl font-black text-white">{formatFanQuizLevel(level)}</strong>
                        <span className="mt-1 block text-[11px] font-bold text-slate-200">{pointText}</span>
                      </span>
                    </div>
                  </div>
                  <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">{gradeTitle}</h1>
                  <p className="mx-auto mt-3 max-w-xl text-base font-semibold leading-7 text-slate-100 lg:mx-0">{gradeSummary}</p>
                  {hasResult && (
                    <div className="mx-auto mt-6 grid max-w-lg grid-cols-3 gap-3 lg:mx-0">
                      <div className="rounded-2xl border border-white/10 bg-white/10 p-3"><span className="block text-xs text-slate-300">LEVEL</span><strong className="text-xl">{level}</strong></div>
                      <div className="rounded-2xl border border-white/10 bg-white/10 p-3"><span className="block text-xs text-slate-300">정답 개수</span><strong className="text-xl">{displayCorrectCount}/{totalCount}</strong></div>
                      <div className="rounded-2xl border border-white/10 bg-white/10 p-3"><span className="block text-xs text-slate-300">점수</span><strong className="text-xl">{displayPointScore}/{pointMaxScore}</strong></div>
                    </div>
                  )}
                </div>
              </div>
              <div className="relative border-t border-white/10 bg-white px-6 py-7 text-slate-700 sm:px-10">
                <p className="mx-auto max-w-2xl leading-7">{gradeDescription}</p>
              </div>
            </section>
          </SectionReveal>

          <AdRectangle />

          {hasResult && wrongReviews.length > 0 && (
            <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-extrabold text-ink">오답 노트 <span className="text-sm font-bold text-slate-400">({wrongReviews.length}문제)</span></h2>
              <div className="mt-5 space-y-3">
                {wrongReviews.map((review, index) => (
                  <details key={review.id} className="group rounded-2xl border border-slate-100 bg-slate-50/70 p-4 open:bg-white">
                    <summary className="cursor-pointer list-none font-extrabold leading-6 text-ink">
                      <span className="mr-2" style={{ color: theme.primary }}>Q{index + 1}</span>
                      {review.question}
                      <span className="ml-2 inline-flex rounded-full bg-white px-2.5 py-1 text-[11px] font-black text-slate-500 ring-1 ring-slate-200">배점 {review.point}점</span>
                      <span className="float-right text-xs text-slate-400 group-open:hidden">펼치기</span>
                    </summary>
                    <dl className="mt-4 space-y-2 text-sm">
                      <div className="flex gap-2"><dt className="shrink-0 font-black text-rose-500">내 답</dt><dd className="text-slate-600 line-through decoration-rose-300">{review.choiceText}</dd></div>
                      <div className="flex gap-2"><dt className="shrink-0 font-black text-green-600">정답</dt><dd className="font-extrabold text-ink">{review.correctText}</dd></div>
                    </dl>
                    <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-6 text-slate-600">💡 {review.explanation}</p>
                    {review.note && <p className="mt-2 text-xs leading-5 text-slate-400">{review.note}</p>}
                  </details>
                ))}
              </div>
            </section>
          )}

          {hasResult && wrongReviews.length === 0 && (
            <section className="mt-8 rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6 text-center shadow-card sm:p-8">
              <h2 className="text-xl font-extrabold text-emerald-900">전 문항 정답!</h2>
              <p className="mt-2 text-sm leading-6 text-emerald-800">모든 문제를 맞혔어요.</p>
            </section>
          )}

          <section id="share-card" className="mt-10 grid scroll-mt-24 gap-6 rounded-3xl bg-ink p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard
              emoji={test.icon}
              eyebrow={test.shortTitle ?? test.title}
              title={formatFanQuizLevel(level)}
              subtitle={pointText}
              accent={toShareAccent(test.accent)}
              imageSrc={effectiveImageSrc}
              imageAlt={imageAlt ?? `${test.shortTitle ?? test.title} 이미지`}
            />
            <div>
              <h2 className="text-xl font-extrabold">결과 공유하기</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">결과 카드를 저장하거나 친구에게 링크를 공유해보세요. 정답과 문제 내용은 공유되지 않습니다.</p>
              <div className="mt-5"><ShareButtons title={shareText} description={shareDescription ?? gradeSummary} path={resultPath} /></div>
            </div>
          </section>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={`/tests/${test.slug}?start=1`} className="inline-flex rounded-xl bg-primary px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">재도전</Link>
            <Link href={`/tests/${test.slug}`} className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50">테스트 소개 보기</Link>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-5 text-slate-400">{disclaimer}</p>
        </div>
      </div>
      <MobileShareDock />
    </main>
  );
}
