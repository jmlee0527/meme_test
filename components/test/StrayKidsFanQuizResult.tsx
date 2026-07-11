"use client";

import Link from "next/link";
import { useState } from "react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { ShareButtons } from "@/components/share/ShareButtons";
import type { StrayKidsAnswer } from "@/lib/stray-kids-fan-engine";
import { calculateStrayKidsResult, encodeStrayKidsAnswers } from "@/lib/stray-kids-fan-engine";

export function StrayKidsFanQuizResult({ answers }: { answers: StrayKidsAnswer[] | null }) {
  const [showAll, setShowAll] = useState(false);
  if (!answers) return <main className="container-page py-16 text-center"><h1 className="text-3xl font-black">결과 정보가 없습니다</h1><Link href="/tests/stray-kids-true-fan-test?start=1" className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 font-bold text-white">테스트 시작하기</Link></main>;
  const result = calculateStrayKidsResult(answers);
  const encoded = encodeStrayKidsAnswers(answers);
  const sharePath = `/stray-kids-true-fan-test/result/${result.grade.slug}?r=${encoded}`;
  const shownReviews = showAll ? result.reviews : result.reviews.filter((review) => !review.correct);
  const shareText = `나는 스트레이 키즈 찐팬 테스트에서 15문제 중 ${result.score}문제 정답! 내 STAY 팬심은 ‘${result.grade.name}’ 💎`;

  const track = (name: string) => (window as Window & { gtag?: (command: string, event: string) => void }).gtag?.("event", name);
  const retrySame = () => { const key = "mimi-stray-kids-true-fan-session"; const stored = JSON.parse(window.sessionStorage.getItem(key) ?? "{}"); window.sessionStorage.setItem(key, JSON.stringify({ ...stored, answers: [], index: 0 })); track("stray_kids_fan_retry_same"); window.location.href = "/tests/stray-kids-true-fan-test?start=1"; };
  const retry = () => { window.sessionStorage.removeItem("mimi-stray-kids-true-fan-session"); track("stray_kids_fan_retry_new"); window.location.href = "/tests/stray-kids-true-fan-test?start=1"; };

  return <main className="min-h-screen bg-[radial-gradient(circle_at_top,#ede9fe_0,#fff7ed_40%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
    <div className="container-page"><Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "스트레이 키즈 찐팬 테스트", href: "/tests/stray-kids-true-fan-test" }, { name: result.grade.name }]} />
      <div className="mx-auto max-w-4xl">
        <section className="overflow-hidden rounded-[2.25rem] border border-violet-100 bg-white text-center shadow-2xl shadow-violet-100/70">
          <div className="bg-gradient-to-br from-violet-600 via-fuchsia-500 to-rose-400 px-6 py-10 text-white sm:py-14"><p className="text-sm font-bold text-white/80">나의 STAY 팬심 결과</p><div className="mt-5 text-6xl">{result.grade.icon}</div><h1 className="mt-3 text-4xl font-black sm:text-5xl">{result.grade.name}</h1><p className="mt-3 text-lg font-black text-white">{result.grade.headline}</p><p className="mx-auto mt-3 max-w-xl font-semibold leading-7 text-white/90">{result.grade.description}</p></div>
          <div className="grid grid-cols-2 gap-px bg-slate-100 sm:grid-cols-4"><div className="bg-white p-5"><span className="block text-xs text-slate-500">정답</span><strong className="text-2xl text-violet-700">{result.score}/15</strong></div><div className="bg-white p-5"><span className="block text-xs text-slate-500">가중 점수</span><strong className="text-2xl text-violet-700">{result.weightedScore}/29</strong></div><div className="bg-white p-5"><span className="block text-xs text-slate-500">팬심</span><strong className="text-2xl text-violet-700">{result.accuracy}%</strong></div><div className="bg-white p-5"><span className="block text-xs text-slate-500">문항</span><strong className="text-2xl text-violet-700">15</strong></div></div>
        </section>

        <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8"><h2 className="text-xl font-black text-ink">난이도별 정답 수</h2><div className="mt-5 grid gap-3 sm:grid-cols-3">{result.byDifficulty.map((row) => <div key={row.difficulty} className="rounded-2xl bg-slate-50 p-4"><div className="flex justify-between font-bold"><span>{row.difficulty}</span><span>{row.correct}/{row.total}</span></div><div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-rose-400" style={{ width: `${(row.correct / row.total) * 100}%` }} /></div></div>)}</div></section>

        <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-black text-ink">{showAll ? "전체 정답 보기" : "틀린 문제 해설"}</h2><button type="button" onClick={() => setShowAll((value) => !value)} className="min-h-11 rounded-xl border border-violet-200 px-4 text-sm font-bold text-violet-700">{showAll ? "오답만 보기" : "전체 정답 펼치기"}</button></div>
          {shownReviews.length ? <div className="mt-5 space-y-3">{shownReviews.map((review) => <details key={review.question.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><summary className="cursor-pointer font-extrabold text-ink"><span className={review.correct ? "text-emerald-600" : "text-rose-500"}>{review.correct ? "✓ 정답" : "✕ 오답"}</span> · {review.question.question}</summary><dl className="mt-4 grid gap-2 text-sm"><div><dt className="inline font-black text-slate-500">내 답: </dt><dd className="inline">{review.question.options[review.choice]}</dd></div><div><dt className="inline font-black text-emerald-600">정답: </dt><dd className="inline font-bold">{review.question.answer}</dd></div><div><dt className="inline font-black text-slate-500">난이도: </dt><dd className="inline">{review.question.difficulty}</dd></div></dl><p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-6 text-slate-600">{review.question.explanation}</p><p className="mt-2 text-xs text-slate-400">검증 기준: {review.question.source.verifiedAt.replaceAll("-", ".")}</p></details>)}</div> : <p className="mt-5 rounded-2xl bg-emerald-50 p-5 text-sm font-bold text-emerald-800">15문제를 모두 맞혔습니다!</p>}
        </section>

        <section id="share-card" className="mt-8 rounded-3xl bg-slate-950 p-6 text-white sm:p-8"><h2 className="text-2xl font-black">내 STAY 팬심 공유하기</h2><p className="mt-2 text-sm leading-6 text-slate-300">{shareText}</p><div className="mt-5" onClick={() => track("stray_kids_fan_result_share")}><ShareButtons title={shareText} description="당신의 STAY 팬심도 확인해 보세요." path={sharePath} /></div></section>
        <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-6 text-center"><h2 className="font-black text-ink">다른 팬 퀴즈도 도전해 보세요</h2><div className="mt-4 flex flex-wrap justify-center gap-2"><Link href="/tests/bts-fan-test" className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold">BTS 찐팬 테스트</Link><Link href="/tests/fromis9-fan-test" className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold">프로미스나인 찐팬 테스트</Link></div><div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row"><button type="button" onClick={retrySame} className="min-h-12 rounded-xl border border-slate-300 bg-white px-6 font-black text-slate-700">같은 문제 다시 풀기</button><button type="button" onClick={retry} className="min-h-12 rounded-xl bg-primary px-6 font-black text-white">새로운 문제로 다시 하기</button></div></section>
        <p className="mt-6 text-center text-xs leading-5 text-slate-500">본 테스트는 공개된 공식 자료를 바탕으로 미미테스트가 자체 제작한 비공식 팬 퀴즈입니다.</p>
      </div>
    </div><MobileShareDock />
  </main>;
}
