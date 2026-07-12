"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { turnoverDisclaimer, turnoverFactorLabels, turnoverResultLevels } from "@/data/turnover-intention";
import type { TurnoverFactor, TurnoverResultFactor, TurnoverResultLevel } from "@/data/turnover-intention";

const track = (name: string) => {
  if (typeof window === "undefined") return;
  (window as Window & { gtag?: (command: string, event: string) => void }).gtag?.("event", name);
};

const areaOrder: TurnoverFactor[] = ["direct_intention", "attachment", "growth", "compensation", "culture", "workload"];
const levelIcons: Record<string, string> = { stable: "🌿", light_exploration: "🔭", considering: "⚖️", active_consideration: "🧭", high_readiness: "🧳" };

type Props = {
  level: TurnoverResultLevel;
  overallScore: number | null;
  riskScores: Record<TurnoverFactor, number> | null;
  primaryFactors: TurnoverResultFactor[];
  encodedAnswers: string | null;
};

export function TurnoverIntentionResult({ level, overallScore, riskScores, primaryFactors, encodedAnswers }: Props) {
  const hasResult = overallScore !== null;
  const shownScore = overallScore ?? Math.round((level.minScore + level.maxScore) / 2);
  const icon = levelIcons[level.id] ?? "🧳";
  const primaryLabel = primaryFactors.map((factor) => factor.title).join(" + ");
  const shareTitle = hasResult && primaryLabel
    ? `내 이직 의향은 ${shownScore}점, ${level.title} · 주요 원인: ${primaryLabel}`
    : `이직 의향 테스트 결과: ${level.title}`;
  const sharePath = `/turnover-intention/result/${level.id}${encodedAnswers ? `?a=${encodedAnswers}` : ""}`;

  const restart = () => {
    track("turnover_test_restart");
    window.sessionStorage.removeItem("mimi-turnover-intention-progress");
    window.location.href = "/tests/turnover-intention?start=1";
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#e0e7ff_0,#f5f3ff_34%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "이직 의향 테스트", href: "/tests/turnover-intention" }, { name: level.title }]} />
        <div className="mx-auto max-w-4xl">
          {/* 1~5. 대표 이미지·점수·단계·한 줄 요약·상세 설명 */}
          <SectionReveal>
            <section className="overflow-hidden rounded-3xl border border-indigo-100 bg-white text-center shadow-card">
              <div className="bg-gradient-to-b from-indigo-50 to-white px-6 pb-6 pt-10 sm:pt-14">
                <p className="text-sm font-extrabold text-indigo-600">{hasResult ? "나의 이직 의향 점수는" : "이직 의향 테스트 결과 단계"}</p>
                <div className="mt-5 text-7xl" aria-hidden="true">{icon}</div>
                <div className="mx-auto mt-6 grid size-36 place-items-center rounded-full p-2 shadow-lg" style={{ background: `conic-gradient(#4F46E5 ${shownScore}%, #E0E7FF 0)` }}>
                  <div className="grid size-full place-items-center rounded-full bg-white">
                    <span>
                      <strong className="block text-4xl font-black tabular-nums text-indigo-600">{shownScore}<span className="text-lg text-indigo-400">점</span></strong>
                      <span className="text-[11px] font-bold text-slate-400">이직 의향</span>
                    </span>
                  </div>
                </div>
                <h1 className="mt-5 text-3xl font-black tracking-tight text-ink sm:text-4xl">{level.title}</h1>
                <p className="mx-auto mt-3 max-w-xl text-base font-medium text-slate-600">{level.summary}</p>
              </div>
              <div className="px-6 pb-8 sm:px-10">
                <p className="mx-auto max-w-2xl text-left leading-7 text-slate-700">{level.description}</p>
              </div>
            </section>
          </SectionReveal>

          <AdRectangle />

          {/* 6. 주요 이직 원인 */}
          {primaryFactors.length > 0 && (
            <SectionReveal className="mt-8 rounded-3xl border border-indigo-100 bg-indigo-50/60 p-6 sm:p-8">
              <h2 className="text-xl font-extrabold text-indigo-950">이직을 고민하게 만드는 주요 원인{primaryFactors.length > 1 ? " (동점 2개)" : ""}</h2>
              <div className={`mt-5 grid gap-4 ${primaryFactors.length > 1 ? "sm:grid-cols-2" : ""}`}>
                {primaryFactors.map((factor) => (
                  <div key={factor.factor} className="rounded-2xl bg-white p-5 shadow-sm">
                    <strong className="text-lg font-black text-indigo-700">{factor.typeName}</strong>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{factor.description}</p>
                    <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
                      {factor.guide.map((tip) => <li key={tip}>✓ {tip}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </SectionReveal>
          )}

          {/* 7. 영역별 점수 그래프 */}
          <SectionReveal className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-extrabold text-ink">영역별 이직 신호</h2>
            <p className="mt-2 text-xs leading-5 text-slate-500">막대가 길수록 그 영역이 이직 고민을 자극하고 있다는 뜻이에요. 조직 애착·업무 의미는 애착이 낮을수록 막대가 길어집니다.</p>
            {riskScores ? (
              <div className="mt-6 grid gap-4">
                {areaOrder.map((factor) => {
                  const value = riskScores[factor];
                  return (
                    <div key={factor} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                      <div className="flex items-center justify-between gap-3 text-sm font-black text-slate-700">
                        <span>{turnoverFactorLabels[factor]}</span>
                        <span className="tabular-nums text-indigo-600">{value}점</span>
                      </div>
                      <div className="mt-2 h-3 overflow-hidden rounded-full bg-white" role="img" aria-label={`${turnoverFactorLabels[factor]} ${value}점`}>
                        <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-400" style={{ width: `${value}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : <p className="mt-5 text-sm text-slate-500">테스트를 완료하면 6개 영역의 점수 그래프가 표시됩니다.</p>}
          </SectionReveal>

          {/* 8~9. 남을 경우 / 이직 준비 시 확인할 점 */}
          <section className="mt-8 grid gap-5 lg:grid-cols-2">
            <SectionReveal className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-lg font-extrabold text-ink">🏢 현재 직장에 남는다면 확인할 점</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">{level.stayAdvice.map((item) => <li key={item}>• {item}</li>)}</ul>
            </SectionReveal>
            <SectionReveal className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-lg font-extrabold text-ink">🧭 이직을 준비한다면 확인할 점</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">{level.moveAdvice.map((item) => <li key={item}>• {item}</li>)}</ul>
            </SectionReveal>
          </section>

          {/* 결과 단계 기준 */}
          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-extrabold text-ink">이직 의향 단계 기준</h2>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-5">
              {turnoverResultLevels.map((item) => (
                <li key={item.id}>
                  <Link href={`/turnover-intention/result/${item.id}`} className={`block h-full rounded-2xl border px-3 py-4 text-center transition hover:-translate-y-0.5 ${item.id === level.id ? "border-indigo-400 bg-indigo-50" : "border-slate-200 bg-white hover:border-indigo-200"}`}>
                    <span className="text-2xl" aria-hidden="true">{levelIcons[item.id]}</span>
                    <p className="mt-2 text-xs font-extrabold leading-4 text-ink">{item.title}</p>
                    <p className="mt-1 text-[11px] font-black tabular-nums text-slate-400">{item.minScore}~{item.maxScore}점</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* 12. 공유 */}
          <section id="share-card" className="mt-10 grid scroll-mt-24 gap-6 rounded-3xl bg-ink p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center" onClickCapture={() => track("turnover_test_share")}>
            <ShareImageCard emoji={icon} eyebrow="이직 의향 테스트" title={`${shownScore}점 · ${level.title}`} subtitle={primaryLabel ? `주요 원인: ${primaryLabel}` : level.summary} badge={`이직 의향 ${shownScore}점`} accent="blue" />
            <div>
              <h2 className="text-xl font-extrabold">동료의 이직 의향은 몇 점일까?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">결과를 공유하고 서로의 직장생활 이야기를 나눠보세요. 개별 답변 내용은 공유되지 않습니다.</p>
              <div className="mt-5"><ShareButtons title={shareTitle} description={level.summary} path={sharePath} /></div>
            </div>
          </section>

          {/* 11·13. 다시 하기 / 다른 테스트 */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={restart} className="inline-flex min-h-12 items-center rounded-xl bg-primary px-6 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">다시 테스트하기</button>
            <Link href="/tests/office-animal-test" className="inline-flex min-h-12 items-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-600 hover:bg-slate-50">직장 동물 테스트</Link>
            <Link href="/tests/burnout-risk-test" className="inline-flex min-h-12 items-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-600 hover:bg-slate-50">번아웃 자가 점검</Link>
            <Link href="/category/%EC%A7%81%EC%97%85.%EC%9D%BC%EC%83%81" className="inline-flex min-h-12 items-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-600 hover:bg-slate-50">직업·일상 테스트 더 보기</Link>
          </div>

          {/* 10. 주의사항 */}
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-5 text-slate-400">{turnoverDisclaimer}</p>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
