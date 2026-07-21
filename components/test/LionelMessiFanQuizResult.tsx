"use client";

import Link from "next/link";
import { useState } from "react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { formatFanQuizLevel, getFanQuizLevel } from "@/config/fanQuizThemes";
import { MESSI_MAX_SCORE, MESSI_QUIZ_SIZE, messiBank } from "@/data/lionel-messi-fan";
import { calculateMessiResult, encodeMessiAnswers } from "@/lib/lionel-messi-fan-engine";
import type { MessiAnswer } from "@/lib/lionel-messi-fan-engine";

export function LionelMessiFanQuizResult({ answers }: { answers: MessiAnswer[] | null }) {
  const [showAll, setShowAll] = useState(false);
  if (!answers) {
    return (
      <main className="container-page py-16 text-center">
        <h1 className="text-3xl font-black">결과 정보가 없습니다</h1>
        <Link href="/tests/lionel-messi-true-fan-test?start=1" className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 font-bold text-white">테스트 시작하기</Link>
      </main>
    );
  }

  const result = calculateMessiResult(answers);
  const encoded = encodeMessiAnswers(answers);
  const sharePath = `/lionel-messi-true-fan-test/result/${result.grade.slug}?r=${encoded}`;
  const shownReviews = showAll ? result.reviews : result.reviews.filter((review) => !review.correct);
  const level = getFanQuizLevel(result.score, MESSI_MAX_SCORE);
  const shareText = `나는 ${result.grade.name} 등급! ${MESSI_QUIZ_SIZE}문제 중 ${result.score}문제를 맞혔어요. 당신의 메시 찐팬력은 몇 점인가요?`;

  const retry = () => {
    window.sessionStorage.removeItem("mimi-lionel-messi-true-fan-session");
    window.location.href = "/tests/lionel-messi-true-fan-test?start=1";
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#dbeafe_0,#fef3c7_42%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "리오넬 메시 찐팬 테스트", href: "/tests/lionel-messi-true-fan-test" }, { name: result.grade.name }]} />
        <div className="mx-auto max-w-4xl">
          <section className="overflow-hidden rounded-[2.25rem] border border-blue-100 bg-white text-center shadow-2xl shadow-blue-100/70">
            <div className="bg-gradient-to-br from-sky-600 via-blue-600 to-amber-400 px-6 py-10 text-white sm:py-14">
              <p className="text-sm font-bold text-white/80">나의 메시 찐팬력 결과</p>
              <div className="mt-5 text-6xl">{result.grade.icon}</div>
              <h1 className="mt-3 text-4xl font-black sm:text-5xl">{result.grade.name}</h1>
              <p className="mx-auto mt-4 max-w-xl font-semibold leading-7 text-white/90">{result.grade.summary}</p>
            </div>
            <div className="grid grid-cols-3 gap-px bg-slate-100">
              <div className="bg-white p-5"><span className="block text-xs text-slate-500">LEVEL</span><strong className="text-2xl text-blue-700">{level}</strong></div>
              <div className="bg-white p-5"><span className="block text-xs text-slate-500">정답률</span><strong className="text-2xl text-blue-700">{result.accuracy}%</strong></div>
              <div className="bg-white p-5"><span className="block text-xs text-slate-500">점수</span><strong className="text-2xl text-blue-700">{result.score}/{MESSI_MAX_SCORE}</strong></div>
            </div>
          </section>

          <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-ink">{showAll ? "전체 정답 보기" : "틀린 문제 해설"}</h2>
                <p className="mt-1 text-sm text-slate-500">문제별 정답과 해설을 확인할 수 있어요.</p>
              </div>
              <button type="button" onClick={() => setShowAll((value) => !value)} className="min-h-11 rounded-xl border border-blue-200 px-4 text-sm font-bold text-blue-700">{showAll ? "오답만 보기" : "전체 정답 펼치기"}</button>
            </div>
            {shownReviews.length ? (
              <div className="mt-5 space-y-3">
                {shownReviews.map((review) => (
                  <details key={review.question.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <summary className="cursor-pointer font-extrabold text-ink"><span className={review.correct ? "text-emerald-600" : "text-rose-500"}>{review.correct ? "정답" : "오답"}</span> · {review.question.question}</summary>
                    <dl className="mt-4 grid gap-2 text-sm">
                      <div><dt className="inline font-black text-slate-500">내 답: </dt><dd className="inline">{review.question.options[review.choice]}</dd></div>
                      <div><dt className="inline font-black text-emerald-600">정답: </dt><dd className="inline font-bold">{review.question.answer}</dd></div>
                    </dl>
                    <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-6 text-slate-600">{review.question.explanation}</p>
                    <p className="mt-2 text-xs text-slate-400">검증 기준: {messiBank.verification.verifiedAt} · 출처 키: {review.question.sourceIds.join(", ")}</p>
                  </details>
                ))}
              </div>
            ) : (
              <p className="mt-5 rounded-2xl bg-emerald-50 p-5 text-sm font-bold text-emerald-800">12문제를 모두 맞혔습니다!</p>
            )}
          </section>

          <section id="share-card" className="mt-8 grid scroll-mt-24 gap-6 rounded-3xl bg-slate-950 p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={result.grade.icon} eyebrow="메시 찐팬 테스트" title={`${formatFanQuizLevel(level)} · ${result.grade.name}`} subtitle={`${result.score}/${MESSI_MAX_SCORE} 정답 · 정답률 ${result.accuracy}%`} badge="미미테스트" accent="blue" />
            <div>
              <h2 className="text-2xl font-black">결과 공유하기</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{shareText}</p>
              <div className="mt-5"><ShareButtons title={shareText} description="당신의 메시 찐팬력도 확인해 보세요." path={sharePath} /></div>
            </div>
          </section>

          <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-6 text-center">
            <h2 className="font-black text-ink">다른 팬덤 테스트도 도전해 보세요</h2>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Link href="/tests/football-iq-test" className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold">축잘알 테스트</Link>
              <Link href="/tests/worldcup-winner-quiz" className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold">월드컵 우승국 퀴즈</Link>
              <Link href="/category/%ED%8C%AC%20%ED%80%B4%EC%A6%88" className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold">다른 팬덤 테스트</Link>
            </div>
            <button type="button" onClick={retry} className="mt-5 min-h-12 rounded-xl bg-primary px-6 font-black text-white">팬 퀴즈 다시 시작하기</button>
          </section>

          <p className="mt-6 text-center text-xs leading-5 text-slate-500">{messiBank.test.disclaimer}</p>
        </div>
      </div>
      <MobileShareDock />
    </main>
  );
}
