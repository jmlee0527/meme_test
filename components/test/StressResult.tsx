import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { stressGradeProfiles } from "@/data/stress-test";
import { STRESS_MAX_SCORE } from "@/lib/stress-engine";
import type { StressGradeProfile } from "@/lib/types";

type Props = {
  grade: StressGradeProfile;
  score: number | null;
};

export function StressResult({ grade, score }: Props) {
  const hasResult = score !== null;
  const shareScore = score ?? Math.round((grade.minScore + grade.maxScore) / 2);
  const shareTitle = grade.shareText.replace("{score}", String(shareScore));
  const sharePath = `/stress-test/result/${grade.slug}${hasResult ? `?s=${score}` : ""}`;
  const gaugePercent = Math.round((shareScore / STRESS_MAX_SCORE) * 100);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ccfbf1_0,#f0fdfa_34%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "스트레스 지수 테스트", href: "/tests/stress-test" }, { name: `${grade.name} 결과` }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="overflow-hidden rounded-3xl border border-teal-100 bg-white text-center shadow-card">
              <div className="bg-gradient-to-b from-teal-50 to-white px-6 pb-6 pt-10 sm:pt-14">
                <p className="text-sm font-extrabold text-teal-600">{hasResult ? "나의 스트레스 지수는" : "스트레스 지수 단계"}</p>
                <div className="mt-5 text-7xl" aria-hidden="true">{grade.icon}</div>
                <h1 className="mt-4 text-3xl font-black tracking-tight text-ink sm:text-4xl">{grade.name}</h1>
                <p className="mx-auto mt-3 max-w-xl text-base font-medium text-slate-600">{grade.summary}</p>
                <div className="mx-auto mt-7 grid size-36 place-items-center rounded-full p-2 shadow-lg" style={{ background: `conic-gradient(#0D9488 ${gaugePercent}%, #CCFBF1 0)` }}>
                  <div className="grid size-full place-items-center rounded-full bg-white">
                    <span>
                      {hasResult ? (
                        <strong className="block text-4xl font-black tabular-nums text-teal-600">{score}<span className="text-lg text-teal-400"> / 40</span></strong>
                      ) : (
                        <strong className="block text-2xl font-black text-teal-600">{grade.minScore}~{grade.maxScore}점</strong>
                      )}
                      <span className="text-[11px] font-bold text-slate-400">PSS 스트레스 지수</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-8 sm:px-10">
                <div className="mx-auto max-w-xl">
                  <div className="relative flex h-3 overflow-hidden rounded-full" aria-hidden="true">
                    <div className="h-full bg-emerald-400" style={{ width: "35%" }} />
                    <div className="h-full bg-amber-400" style={{ width: "32.5%" }} />
                    <div className="h-full bg-rose-400" style={{ width: "32.5%" }} />
                    <span className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-ink shadow-md" style={{ left: `${Math.min(Math.max((shareScore / STRESS_MAX_SCORE) * 100, 2), 98)}%` }} />
                  </div>
                  <div className="mt-2 flex justify-between text-[11px] font-bold text-slate-400" aria-hidden="true"><span>0~13 낮음</span><span>14~26 중간</span><span>27~40 높음</span></div>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-left leading-7 text-slate-700">{grade.description}</p>
              </div>
            </section>
          </SectionReveal>

          <AdRectangle />

          <section className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
              <h2 className="font-extrabold text-ink">이 단계에서 흔한 신호</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">{grade.signals.map((item) => <li key={item}>• {item}</li>)}</ul>
            </div>
            <div className="rounded-3xl border border-teal-100 bg-teal-50/60 p-6">
              <h2 className="font-extrabold text-teal-900">지금 해볼 수 있는 관리법</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-teal-950">{grade.tips.map((item) => <li key={item}>✓ {item}</li>)}</ul>
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-extrabold text-ink">PSS 점수 해석 기준</h2>
            <p className="mt-2 text-sm text-slate-500">지각된 스트레스 척도(PSS-10)의 일반적인 해석 기준입니다. 총점은 0~40점입니다.</p>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-3">
              {stressGradeProfiles.map((profile) => (
                <li key={profile.slug}>
                  <Link href={`/stress-test/result/${profile.slug}`} className={`block rounded-2xl border px-4 py-4 text-center transition hover:-translate-y-0.5 ${profile.slug === grade.slug ? "border-teal-400 bg-teal-50" : "border-slate-200 bg-white hover:border-teal-200"}`}>
                    <span className="text-2xl" aria-hidden="true">{profile.icon}</span>
                    <p className="mt-2 text-sm font-extrabold text-ink">{profile.name}</p>
                    <p className="mt-1 text-xs font-black tabular-nums text-slate-400">{profile.minScore}~{profile.maxScore}점</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section id="share-card" className="mt-10 grid scroll-mt-24 gap-6 rounded-3xl bg-ink p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={grade.icon} eyebrow="나의 스트레스 지수는" title={`${shareScore}점 / 40점`} subtitle={grade.name} badge={`PSS ${shareScore}점`} accent="green" />
            <div>
              <h2 className="text-xl font-extrabold">친구의 스트레스 지수는 몇 점일까?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">결과를 공유하고 서로의 상태를 확인해보세요. 안부를 묻는 좋은 핑계가 됩니다.</p>
              <div className="mt-5"><ShareButtons title={shareTitle} description={grade.summary} path={sharePath} /></div>
            </div>
          </section>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/tests/stress-test?start=1" className="inline-flex rounded-xl bg-primary px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">테스트 다시 하기</Link>
            <Link href="/tests" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50">다른 테스트 하기</Link>
          </div>
          <p className="mt-8 text-center text-xs leading-5 text-slate-400">이 테스트는 의학적 진단이 아닌 자가 점검용 참고 정보입니다. 높은 스트레스와 함께 수면 문제·무기력이 2주 이상 지속되면 전문가 상담을 권합니다.</p>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
