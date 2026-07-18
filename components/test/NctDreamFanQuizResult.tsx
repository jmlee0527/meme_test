"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FanQuizResultBadge } from "@/components/fan-quiz/FanQuizResultBadge";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { ShareButtons } from "@/components/share/ShareButtons";
import { nctDreamFanTest } from "@/data/nct-dream-fan";
import { formatFanQuizLevel, getFanQuizLevel, getTestFanQuizTheme } from "@/config/fanQuizThemes";
import { calculateNctDreamResult, encodeNctDreamAnswers } from "@/lib/nct-dream-fan-engine";
import type { NctDreamAnswer } from "@/lib/nct-dream-fan-engine";

const track = (event: string, params?: Record<string, string | number>) =>
  (window as Window & { gtag?: (command: string, event: string, params?: Record<string, unknown>) => void }).gtag?.("event", event, params);

export function NctDreamFanQuizResult({ answers }: { answers: NctDreamAnswer[] | null }) {
  const [showAll, setShowAll] = useState(false);
  const theme = getTestFanQuizTheme(nctDreamFanTest);

  if (!answers) {
    return (
      <main className="container-page py-16 text-center">
        <h1 className="text-3xl font-black">결과 정보가 없습니다</h1>
        <Link href="/tests/nct-dream-true-fan-test?start=1" className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 font-bold text-white">테스트 시작하기</Link>
      </main>
    );
  }

  const result = calculateNctDreamResult(answers);
  const encoded = encodeNctDreamAnswers(answers);
  const sharePath = `/nct-dream-true-fan-test/result/${result.grade.slug}?r=${encoded}`;
  const shown = showAll ? result.reviews : result.reviews.filter((review) => !review.correct);
  const level = getFanQuizLevel(result.score, 30);
  const shareText = `NCT DREAM 찐팬 테스트 ${level}레벨! ${result.score}/30점, 나의 시즈니 레벨은 ‘${result.grade.title}’`;
  const retry = () => {
    sessionStorage.removeItem("mimi-nct-dream-true-fan-session");
    track("test_retry", { test_id: "nct-dream-true-fan-test" });
    location.href = "/tests/nct-dream-true-fan-test?start=1";
  };

  return (
    <main className="min-h-screen pb-24 pt-8 sm:py-14" style={{ background: `linear-gradient(180deg, ${theme.background} 0%, #f8fafc 100%)` }}>
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "NCT DREAM 찐팬 테스트", href: "/tests/nct-dream-true-fan-test" }, { name: result.grade.title }]} />
        <div className="mx-auto max-w-4xl">
          <section className="relative overflow-hidden rounded-[2.25rem] border bg-white text-center shadow-2xl" style={{ borderColor: theme.border, boxShadow: `0 24px 60px ${theme.shadow}` }}>
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_1px_1px,var(--fan-border)_1px,transparent_0)] [background-size:22px_22px]" style={{ "--fan-border": theme.border } as CSSProperties} aria-hidden="true" />
            <div className="relative px-6 py-10 sm:py-14">
              <p className="text-sm font-black tracking-[.14em]" style={{ color: theme.primary }}>{theme.label}</p>
              <div className="mt-6">
                <FanQuizResultBadge theme={theme} label="NCTZEN LEVEL" score={formatFanQuizLevel(level)} subtitle={`${result.score}/30점 · ${result.correctCount}/15 정답`} />
              </div>
              <div className="mt-6 text-6xl" aria-hidden="true">{result.grade.icon}</div>
              <h1 className="mt-3 text-4xl font-black sm:text-5xl" style={{ color: theme.text }}>{result.grade.title}</h1>
              <p className="mt-3 text-lg font-black" style={{ color: theme.primary }}>{result.grade.badge}</p>
              <p className="mx-auto mt-3 max-w-xl font-semibold leading-7" style={{ color: theme.mutedText }}>{result.grade.summary}</p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-slate-100 sm:grid-cols-4">
              <Stat label="LEVEL" value={String(level)} color={theme.primary} />
              <Stat label="정답" value={`${result.correctCount}/15`} color={theme.primary} />
              <Stat label="팬심 지수" value={`${result.percentage}%`} color={theme.primary} />
              <Stat label="문항" value="15" color={theme.primary} />
            </div>
          </section>

          <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-black text-ink">난이도별 정답 수</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {result.byDifficulty.map((row) => (
                <div key={row.difficulty} className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex justify-between font-bold"><span>{row.difficulty}</span><span>{row.correct}/{row.total}</span></div>
                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full rounded-full" style={{ width: `${(row.correct / row.total) * 100}%`, background: theme.primary }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-black text-ink">{showAll ? "전체 정답 보기" : "틀린 문제 해설"}</h2>
              <button type="button" onClick={() => setShowAll((value) => !value)} className="min-h-11 rounded-xl border px-4 text-sm font-bold" style={{ borderColor: theme.border, color: theme.primary }}>{showAll ? "오답만 보기" : "전체 정답 펼치기"}</button>
            </div>
            {shown.length ? (
              <div className="mt-5 space-y-3">
                {shown.map((review) => (
                  <details key={review.question.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <summary className="cursor-pointer break-words font-extrabold text-ink"><span className={review.correct ? "text-emerald-600" : "text-rose-500"}>{review.correct ? "✓ 정답" : "✕ 오답"}</span> · {review.question.question}</summary>
                    <dl className="mt-4 grid gap-2 text-sm">
                      <div><dt className="inline font-black text-slate-500">내 답: </dt><dd className="inline">{review.question.choices[review.choice]}</dd></div>
                      <div><dt className="inline font-black text-emerald-600">정답: </dt><dd className="inline font-bold">{review.question.answer}</dd></div>
                      <div><dt className="inline font-black text-slate-500">난이도: </dt><dd className="inline">{review.question.difficulty} · {review.question.weight}점</dd></div>
                    </dl>
                    <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-6 text-slate-600">{review.question.explanation}</p>
                    <p className="mt-2 text-xs text-slate-400">검증 기준: 2026년 7월</p>
                  </details>
                ))}
              </div>
            ) : (
              <p className="mt-5 rounded-2xl p-5 text-sm font-bold" style={{ background: theme.background, color: theme.primaryStrong }}>15문제를 모두 맞혔습니다!</p>
            )}
          </section>

          <section id="share-card" className="mt-8 rounded-3xl bg-slate-950 p-6 text-white sm:p-8">
            <h2 className="text-2xl font-black">내 시즈니 팬심 공유하기</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{shareText}</p>
            <div className="mt-5" onClick={() => track("test_share", { test_id: "nct-dream-true-fan-test" })}>
              <ShareButtons title={shareText} description="당신의 NCT DREAM 팬심도 확인해 보세요." path={sharePath} />
            </div>
          </section>

          <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-6 text-center">
            <h2 className="font-black text-ink">다른 팬 퀴즈도 도전해 보세요</h2>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Link href="/tests/seventeen-true-fan" className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold">세븐틴 찐팬 테스트</Link>
              <Link href="/tests/stray-kids-true-fan-test" className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold">스트레이 키즈 찐팬 테스트</Link>
            </div>
            <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
              <button type="button" onClick={retry} className="min-h-12 rounded-xl px-6 font-black text-white" style={{ background: theme.primary }}>새 문제로 다시 테스트하기</button>
              <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 px-6 font-black text-slate-700">홈으로 이동</Link>
            </div>
          </section>
          <p className="mt-6 text-center text-xs leading-5 text-slate-500">공식 사이트·공식 음원·공식 공연 공지를 기준으로 검증한 미미테스트의 비공식 팬 퀴즈입니다.</p>
        </div>
      </div>
      <MobileShareDock />
    </main>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-white p-5">
      <span className="block text-xs text-slate-500">{label}</span>
      <strong className="text-2xl" style={{ color }}>{value}</strong>
    </div>
  );
}
