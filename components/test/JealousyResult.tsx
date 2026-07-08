import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { jealousyDomainDescriptions, jealousyDomainLabels, jealousyGradeProfiles } from "@/data/jealousy-test";
import type { JealousyDomain, JealousyDomainScores, JealousyGradeProfile } from "@/lib/types";

const domainOrder: JealousyDomain[] = ["relationshipAnxiety", "comparisonSensitivity", "reassuranceNeed", "emotionRegulation", "trustFlexibility"];

type Props = {
  grade: JealousyGradeProfile;
  score: number | null;
  domainScores: JealousyDomainScores | null;
  dominantDomain: JealousyDomain | null;
  calmDomain: JealousyDomain | null;
  encodedAnswers: string | null;
};

export function JealousyResult({ grade, score, domainScores, dominantDomain, calmDomain, encodedAnswers }: Props) {
  const hasResult = score !== null;
  const shareScore = score ?? Math.round((grade.minScore + grade.maxScore) / 2);
  const shareTitle = grade.shareText;
  const sharePath = `/jealousy-test/result/${grade.slug}${encodedAnswers ? `?a=${encodedAnswers}` : ""}`;
  const fallbackScores = {
    relationshipAnxiety: shareScore,
    comparisonSensitivity: Math.max(0, shareScore - 8),
    reassuranceNeed: shareScore,
    emotionRegulation: Math.max(0, shareScore - 12),
    trustFlexibility: Math.max(0, shareScore - 10),
  } satisfies JealousyDomainScores;
  const scores = domainScores ?? fallbackScores;
  const mainDomain = dominantDomain ?? domainOrder.sort((a, b) => scores[b] - scores[a])[0];
  const stableDomain = calmDomain ?? domainOrder.sort((a, b) => scores[a] - scores[b])[0];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fce7f3_0,#fff7ed_34%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "질투심 테스트", href: "/tests/jealousy-test" }, { name: `${grade.name} 결과` }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="overflow-hidden rounded-3xl border border-pink-100 bg-white text-center shadow-card">
              <div className="bg-gradient-to-b from-pink-50 to-white px-6 pb-6 pt-10 sm:pt-14">
                <p className="text-sm font-extrabold text-pink-600">{hasResult ? "나의 질투심 레벨은" : "질투심 테스트 결과 단계"}</p>
                <div className="mt-5 text-7xl" aria-hidden="true">{grade.icon}</div>
                <h1 className="mt-4 text-3xl font-black tracking-tight text-ink sm:text-4xl">{grade.name}</h1>
                <p className="mx-auto mt-3 max-w-xl text-base font-medium text-slate-600">{grade.summary}</p>
                <div className="mx-auto mt-7 grid size-36 place-items-center rounded-full p-2 shadow-lg" style={{ background: `conic-gradient(#DB2777 ${shareScore}%, #FCE7F3 0)` }}>
                  <div className="grid size-full place-items-center rounded-full bg-white">
                    <span>
                      <strong className="block text-4xl font-black tabular-nums text-pink-600">{shareScore}<span className="text-lg text-pink-400">점</span></strong>
                      <span className="text-[11px] font-bold text-slate-400">질투심 레벨</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-8 sm:px-10">
                <p className="mx-auto max-w-2xl text-left leading-7 text-slate-700">{grade.description}</p>
                <div className="mx-auto mt-5 grid max-w-2xl gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-pink-50 p-4 text-sm font-bold text-pink-950">가장 민감한 영역<br /><span className="text-lg">{jealousyDomainLabels[mainDomain]}</span></div>
                  <div className="rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-950">상대적으로 안정적인 영역<br /><span className="text-lg">{jealousyDomainLabels[stableDomain]}</span></div>
                </div>
              </div>
            </section>
          </SectionReveal>

          <AdRectangle />

          <SectionReveal className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-extrabold text-ink">영역별 질투심 패턴</h2>
            <div className="mt-6 grid gap-4">
              {domainOrder.map((domain) => {
                const value = scores[domain];
                return (
                  <div key={domain} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                    <div className="flex items-center justify-between gap-3 text-sm font-black text-slate-700">
                      <span>{jealousyDomainLabels[domain]}</span>
                      <span className="text-pink-600">{value}점</span>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-gradient-to-r from-pink-500 to-rose-500" style={{ width: `${value}%` }} /></div>
                    <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">{jealousyDomainDescriptions[domain]}</p>
                  </div>
                );
              })}
            </div>
          </SectionReveal>

          <section className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
              <h2 className="font-extrabold text-ink">관계에서의 강점</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">{grade.strengths.map((item) => <li key={item}>✓ {item}</li>)}</ul>
            </div>
            <div className="rounded-3xl border border-pink-100 bg-pink-50/60 p-6">
              <h2 className="font-extrabold text-pink-900">주의할 점</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-pink-950">{grade.cautions.map((item) => <li key={item}>• {item}</li>)}</ul>
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-extrabold text-ink">건강하게 다루는 방법</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">{grade.tips.map((tip) => <div key={tip} className="rounded-2xl bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">{tip}</div>)}</div>
          </section>

          <section className="mt-6 rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6 sm:p-8">
            <h2 className="text-xl font-extrabold text-emerald-950">이렇게 말해보세요</h2>
            <div className="mt-5 grid gap-3">
              {grade.communicationScripts.map((script) => <blockquote key={script} className="rounded-2xl bg-white px-5 py-4 text-sm font-bold leading-7 text-emerald-900 shadow-sm">“{script}”</blockquote>)}
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-extrabold text-ink">질투심 레벨 기준</h2>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-5">
              {jealousyGradeProfiles.map((profile) => (
                <li key={profile.slug}>
                  <Link href={`/jealousy-test/result/${profile.slug}`} className={`block rounded-2xl border px-3 py-4 text-center transition hover:-translate-y-0.5 ${profile.slug === grade.slug ? "border-pink-400 bg-pink-50" : "border-slate-200 bg-white hover:border-pink-200"}`}>
                    <span className="text-2xl" aria-hidden="true">{profile.icon}</span>
                    <p className="mt-2 text-xs font-extrabold text-ink">{profile.name}</p>
                    <p className="mt-1 text-[11px] font-black tabular-nums text-slate-400">{profile.minScore}~{profile.maxScore}점</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section id="share-card" className="mt-10 grid scroll-mt-24 gap-6 rounded-3xl bg-ink p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={grade.icon} eyebrow="나의 질투심 레벨은" title={`${shareScore}점 · ${grade.name}`} subtitle={grade.summary} badge={`질투심 ${shareScore}점`} accent="purple" />
            <div>
              <h2 className="text-xl font-extrabold">친구의 질투심 레벨은?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">결과를 공유하고 서로의 관계 패턴을 가볍게 비교해보세요.</p>
              <div className="mt-5"><ShareButtons title={shareTitle} description={grade.summary} path={sharePath} /></div>
            </div>
          </section>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/tests/jealousy-test?start=1" className="inline-flex rounded-xl bg-primary px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">테스트 다시 하기</Link>
            <Link href="/tests" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50">다른 테스트 하기</Link>
          </div>
          <p className="mt-8 text-center text-xs leading-5 text-slate-400">이 테스트는 의학적 진단이나 상담을 대체하지 않는 자기이해용 콘텐츠입니다. 반복적인 불안과 통제 충동으로 관계가 힘들다면 전문가와 이야기해보는 것을 권합니다.</p>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
