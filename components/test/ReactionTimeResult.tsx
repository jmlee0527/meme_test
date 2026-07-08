"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { reactionGradeProfiles } from "@/data/reaction-time";
import type { ReactionGradeProfile } from "@/lib/types";

const SCALE_MIN = 120;
const SCALE_MAX = 400;

type Props = {
  grade: ReactionGradeProfile;
  averageMs: number | null;
  rounds: number[];
  encodedRounds: string | null;
};

export function ReactionTimeResult({ grade, averageMs, rounds, encodedRounds }: Props) {
  const hasResult = averageMs !== null;
  const shareMs = averageMs ?? grade.maxMs;
  const shareTitle = `나의 반응속도는 ${shareMs}ms ${grade.icon} ${grade.name}! 당신도 도전해보세요!`;
  const sharePath = `/reaction-time-test/result/${grade.slug}${encodedRounds ? `?r=${encodedRounds}` : ""}`;
  const markerRatio = Math.min(Math.max(((averageMs ?? grade.maxMs) - SCALE_MIN) / (SCALE_MAX - SCALE_MIN), 0), 1);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ffedd5_0,#fff7ed_34%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "반응속도 테스트", href: "/tests/reaction-time-test" }, { name: `${grade.name} 결과` }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="overflow-hidden rounded-3xl border border-orange-100 bg-white text-center shadow-card">
              <div className="bg-gradient-to-b from-orange-50 to-white px-6 pb-6 pt-10 sm:pt-14">
                <p className="text-sm font-extrabold text-orange-500">{hasResult ? "나의 평균 반응속도는" : "반응속도 테스트 결과 등급"}</p>
                <div className="mt-5 text-7xl" aria-hidden="true">{grade.icon}</div>
                <h1 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">{grade.name}</h1>
                <p className="mt-3 text-base font-medium text-slate-600">{grade.summary}</p>
                <p className="mt-7 text-7xl font-black tabular-nums tracking-tight text-orange-500 sm:text-8xl">
                  {hasResult ? averageMs : `${grade.minMs}~${grade.maxMs > 1000 ? "∞" : grade.maxMs}`}
                  <span className="text-3xl font-extrabold text-orange-300">ms</span>
                </p>
                {hasResult && rounds.length > 0 && (
                  <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-3">
                    {rounds.map((ms, roundIndex) => (
                      <div key={roundIndex} className="rounded-2xl border border-slate-200 bg-white px-3 py-4 shadow-card">
                        <p className="text-xs font-bold text-slate-400">{roundIndex + 1}회</p>
                        <p className="mt-1 text-xl font-black tabular-nums text-ink">{ms}<span className="text-xs font-bold text-slate-400">ms</span></p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="px-6 pb-8 sm:px-10">
                <div className="mx-auto max-w-xl">
                  <div className="relative h-3 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500" aria-hidden="true">
                    <span className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-ink shadow-md" style={{ left: `${markerRatio * 100}%` }} />
                  </div>
                  <div className="mt-2 flex justify-between text-[11px] font-bold text-slate-400" aria-hidden="true"><span>{SCALE_MIN}ms · 빠름</span><span>평균 250~300ms</span><span>{SCALE_MAX}ms · 느긋</span></div>
                </div>
                <p className="mx-auto mt-6 max-w-2xl leading-7 text-slate-700">{grade.description}</p>
              </div>
            </section>
          </SectionReveal>

          <AdRectangle />

          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-extrabold text-ink">반응속도 등급표</h2>
            <p className="mt-2 text-sm text-slate-500">평균 반응속도(3회 측정)에 따라 8개 등급으로 나뉩니다. 사람의 평균은 250~300ms 수준입니다.</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {reactionGradeProfiles.map((profile) => (
                <li key={profile.slug} className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${profile.slug === grade.slug ? "border-orange-400 bg-orange-50" : "border-slate-200 bg-white"}`}>
                  <span className="text-xl" aria-hidden="true">{profile.icon}</span>
                  <span className="text-sm font-extrabold text-ink">{profile.name}</span>
                  <span className="ml-auto text-xs font-black tabular-nums text-slate-400">{profile.maxMs > 1000 ? `${profile.minMs}ms~` : `${profile.minMs}~${profile.maxMs}ms`}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="share-card" className="mt-10 grid scroll-mt-24 gap-6 rounded-3xl bg-ink p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={grade.icon} eyebrow="나의 반응속도는" title={`${shareMs}ms`} subtitle={`${grade.icon} ${grade.name} — ${grade.summary}`} badge={`평균 ${shareMs}ms`} accent="orange" />
            <div>
              <h2 className="text-xl font-extrabold">친구는 나보다 빠를까?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">결과를 공유하고 누구의 반사신경이 더 빠른지 대결해보세요.</p>
              <div className="mt-5"><ShareButtons title={shareTitle} description={grade.summary} path={sharePath} /></div>
            </div>
          </section>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/tests/reaction-time-test?start=1" className="inline-flex rounded-xl bg-primary px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">다시하기</Link>
            <Link href="/tests" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50">다른 테스트 하기</Link>
          </div>
          <p className="mt-8 text-center text-xs leading-5 text-slate-400">기기의 입력 지연과 화면 주사율에 따라 기록이 달라질 수 있습니다. 기록은 서버에 저장되지 않습니다.</p>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
