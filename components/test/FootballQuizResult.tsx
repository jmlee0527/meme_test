"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { formatFanQuizLevel, getFanQuizLevel } from "@/config/fanQuizThemes";
import { footballGradeProfiles } from "@/data/football-quiz";
import type { FootballGradeProfile, FootballQuizQuestion } from "@/lib/types";

const difficultyLabels = { easy: "쉬움", medium: "보통", hard: "어려움" } as const;

function useCountUp(target: number, duration = 1200) {
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
      // ease-out: 후반부로 갈수록 느려지는 카운트업
      setValue(Math.round(target * (1 - (1 - ratio) ** 3)));
      if (ratio < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return value;
}

type Props = {
  grade: FootballGradeProfile;
  score: number | null;
  correctCount: number | null;
  total: number;
  wrong: { question: FootballQuizQuestion; choice: number }[];
  encodedAnswers: string | null;
};

export function FootballQuizResult({ grade, score, correctCount, total, wrong, encodedAnswers }: Props) {
  const displayScore = useCountUp(score ?? 0);
  const hasResult = score !== null;
  const shareScore = score ?? grade.maxScore;
  const shareTitle = grade.shareTemplate.replace("{score}", String(shareScore));
  const sharePath = `/football-iq-test/result/${grade.slug}${encodedAnswers ? `?r=${encodedAnswers}` : ""}`;
  const level = getFanQuizLevel(shareScore, 100);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#dcfce7_0,#f0fdf4_34%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "축잘알 테스트", href: "/tests/football-iq-test" }, { name: `${grade.name} 결과` }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="overflow-hidden rounded-3xl border border-green-100 bg-white text-center shadow-card">
              <div className="bg-gradient-to-b from-green-50 to-white px-6 pb-6 pt-10 sm:pt-14">
                <p className="text-sm font-extrabold text-green-600">{hasResult ? "나의 축잘알 레벨은" : "축잘알 테스트 결과 등급"}</p>
                <div className="mt-5 text-7xl" aria-hidden="true">{grade.icon}</div>
                <h1 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">{grade.name}</h1>
                <p className="mt-3 text-base font-medium text-slate-600">{grade.summary}</p>
                <div className="mx-auto mt-7 grid size-36 place-items-center rounded-full p-2 shadow-lg" style={{ background: `conic-gradient(#16A34A ${hasResult ? displayScore : 100}%, #DCFCE7 0)` }}>
                  <div className="grid size-full place-items-center rounded-full bg-white">
                    <span>
                      <strong className="block text-3xl font-black text-green-600">{formatFanQuizLevel(level)}</strong>
                      <span className="mt-1 block text-[11px] font-bold text-slate-400">{hasResult ? `${displayScore}/100점` : `${grade.minScore}~${grade.maxScore}점 구간`}</span>
                    </span>
                  </div>
                </div>
                {hasResult && correctCount !== null && (
                  <p className="mt-5 text-sm font-bold text-slate-500">{total}문제 중 <strong className="text-green-700">{correctCount}문제</strong> 정답</p>
                )}
              </div>
              <div className="px-6 pb-8 sm:px-10">
                <p className="mx-auto max-w-2xl leading-7 text-slate-700">{grade.description}</p>
                <p className="mx-auto mt-4 max-w-2xl rounded-2xl bg-green-50 px-5 py-4 text-sm font-bold leading-6 text-green-900">💬 {grade.comment}</p>
              </div>
            </section>
          </SectionReveal>

          <AdRectangle />

          {hasResult && wrong.length > 0 && (
            <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-extrabold text-ink">틀린 문제 다시 보기 <span className="text-sm font-bold text-slate-400">({wrong.length}문제)</span></h2>
              <ol className="mt-6 space-y-5">
                {wrong.map(({ question, choice }) => (
                  <li key={question.id} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-extrabold leading-6 text-ink">{question.question}</p>
                      <span className="shrink-0 rounded-full bg-slate-200 px-2.5 py-1 text-[11px] font-black text-slate-600">{difficultyLabels[question.difficulty]}</span>
                    </div>
                    <dl className="mt-3 space-y-1.5 text-sm">
                      <div className="flex gap-2"><dt className="shrink-0 font-black text-rose-500">내 답</dt><dd className="text-slate-600 line-through decoration-rose-300">{question.choices[choice]}</dd></div>
                      <div className="flex gap-2"><dt className="shrink-0 font-black text-green-600">정답</dt><dd className="font-extrabold text-ink">{question.choices[question.correctAnswer]}</dd></div>
                    </dl>
                    <p className="mt-3 border-t border-slate-200 pt-3 text-sm leading-6 text-slate-600">💡 {question.explanation}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {hasResult && wrong.length === 0 && (
            <section className="mt-8 rounded-3xl border border-green-100 bg-green-50/60 p-6 text-center shadow-card sm:p-8">
              <h2 className="text-xl font-extrabold text-green-900">🎉 전 문제 정답!</h2>
              <p className="mt-2 text-sm leading-6 text-green-800">15문제를 모두 맞혔습니다. 더 이상 증명할 것이 없는 완벽한 축잘알이네요.</p>
            </section>
          )}

          {!hasResult && (
            <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-extrabold text-ink">축잘알 지수 등급표</h2>
              <p className="mt-2 text-sm text-slate-500">축잘알 테스트는 15문제로 0~100점의 축잘알 지수를 계산하고, 점수에 따라 5개 등급으로 나뉩니다.</p>
              <ul className="mt-5 grid gap-2.5">
                {footballGradeProfiles.map((profile) => (
                  <li key={profile.slug}>
                    <Link href={`/football-iq-test/result/${profile.slug}`} className={`flex items-center gap-4 rounded-2xl border px-4 py-3.5 transition hover:-translate-y-0.5 ${profile.slug === grade.slug ? "border-green-400 bg-green-50" : "border-slate-200 bg-white hover:border-green-200"}`}>
                      <span className="text-2xl" aria-hidden="true">{profile.icon}</span>
                      <span className="font-extrabold text-ink">{profile.name}</span>
                      <span className="ml-auto text-xs font-black text-slate-400">{profile.minScore}~{profile.maxScore}점</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section id="share-card" className="mt-10 grid scroll-mt-24 gap-6 rounded-3xl bg-ink p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={grade.icon} eyebrow="나의 축잘알 레벨은" title={`${formatFanQuizLevel(level)} · ${grade.name}`} subtitle={grade.summary} badge={`축잘알 지수 ${shareScore}점`} accent="green" />
            <div>
              <h2 className="text-xl font-extrabold">과연 친구는 나보다 축구를 더 잘 알까?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">결과를 공유하고 단톡방에서 진짜 축잘알을 가려보세요.</p>
              <div className="mt-5"><ShareButtons title={shareTitle} description={grade.summary} path={sharePath} /></div>
            </div>
          </section>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/tests/football-iq-test?start=1" className="inline-flex rounded-xl bg-primary px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">새로운 문제로 다시 도전하기</Link>
            <Link href="/tests/football-iq-test" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50">테스트 소개 보기</Link>
          </div>
          <p className="mt-8 text-center text-xs leading-5 text-slate-400">문제는 매번 문제은행에서 랜덤으로 출제되며, 응답은 서버에 저장되지 않습니다.</p>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
