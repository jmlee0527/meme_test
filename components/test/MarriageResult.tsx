import Link from "next/link";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { StatBars } from "@/components/results/StatBars";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { calculateMarriageAgeRange } from "@/lib/marriage-engine";
import type { MarriageResultProfile, MarriageScores, MarriageTendency } from "@/lib/types";

const tendencyLabels: Record<MarriageTendency, string> = {
  marriageIntent: "결혼 의지", relationshipReady: "관계 준비", financialReady: "현실 준비",
  careerPriority: "커리어 우선", independence: "독립성", familyPressure: "주변 영향",
  stability: "관계 안정", romanticImpulse: "감정적 확신", cautiousness: "신중함",
};

export function MarriageResult({ profile, currentAge, scores }: { profile: MarriageResultProfile; currentAge: number | null; scores?: MarriageScores }) {
  const ageRange = currentAge ? calculateMarriageAgeRange(profile, currentAge) : null;
  const ageLabel = profile.ageOffset
    ? ageRange ? `${ageRange[0]}세 ~ ${ageRange[1]}세` : "현재 나이를 입력하면 확인할 수 있어요"
    : "결혼 시기보다 삶의 방향을 먼저 정하는 타입";
  const topTendencies = scores
    ? (Object.entries(scores) as [MarriageTendency, number][]).sort((a, b) => b[1] - a[1]).slice(0, 3)
    : [];
  const tendencyStats = topTendencies.map(([key, score]) => ({ label: tendencyLabels[key], value: Math.min(96, 52 + score * 6) }));
  const shareTitle = `내 예상 결혼 타이밍은 '${profile.name}'!`;
  const shareDescription = profile.ageOffset ? `현재 성향상 자연스러운 결혼 타이밍은 ${ageLabel}` : profile.summary;

  return (
    <div className="container-page py-8 sm:py-14">
      <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "결혼 시기 결과" }]} />
      <div className="mx-auto max-w-4xl">
        <SectionReveal><section className="overflow-hidden rounded-[2rem] border border-rose-100 bg-white shadow-card">
          <div className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-violet-50 px-6 py-10 text-center sm:py-14">
            <div className="absolute -left-20 -top-20 size-64 rounded-full bg-rose-200/30 blur-3xl" />
            <div className="absolute -bottom-24 -right-16 size-72 rounded-full bg-violet-200/30 blur-3xl" />
            <p className="relative text-sm font-extrabold text-rose-600">현재 성향상 자연스러운 결혼 타이밍</p>
            <div className="relative mx-auto mt-6 grid size-32 place-items-center rounded-[2rem] border border-white bg-white/80 text-7xl shadow-xl shadow-rose-100 backdrop-blur" role="img" aria-label={`${profile.name} 일러스트`}>{profile.icon}</div>
            <h1 className="relative mt-6 text-3xl font-black tracking-[-0.04em] text-ink sm:text-5xl">{profile.name}</h1>
            <p className="relative mx-auto mt-3 max-w-xl leading-7 text-slate-600">{profile.summary}</p>
            <div className="relative mx-auto mt-7 max-w-lg rounded-2xl border border-rose-100 bg-white/90 px-5 py-5 shadow-sm">
              <p className="text-xs font-black text-rose-500">{profile.ageOffset ? "결혼 가능성이 높아지는 시기" : "지금 더 중요한 방향"}</p>
              <p className={`${profile.ageOffset ? "text-3xl" : "text-lg leading-7"} mt-2 font-black text-ink`}>{ageLabel}</p>
              {currentAge && ageRange && <p className="mt-2 text-xs text-slate-400">현재 {currentAge}세 기준 · 현재 나이보다 이른 결과는 표시하지 않아요.</p>}
            </div>
          </div>
          <div className="p-6 sm:p-9"><h2 className="text-xl font-black text-ink">현재 성향 분석</h2><p className="mt-4 leading-8 text-slate-700">{profile.analysis}</p>{topTendencies.length > 0 && <div className="mt-6 flex flex-wrap gap-2">{topTendencies.map(([key, score]) => <span key={key} className="rounded-full bg-rose-50 px-3 py-2 text-xs font-extrabold text-rose-700">{tendencyLabels[key]} {score}</span>)}</div>}</div>
        </section></SectionReveal>

        <AdRectangle />

        {tendencyStats.length > 0 && <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8"><p className="text-xs font-black text-rose-500">RELATIONSHIP STATS</p><h2 className="mt-2 text-xl font-black text-ink">지금의 관계 성향</h2><div className="mt-6"><StatBars stats={tendencyStats} /></div></section>}

        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          <InsightCard icon="💗" title="결혼이 빨라질 수 있는 조건" items={profile.accelerators} tone="rose" />
          <InsightCard icon="⏳" title="결혼이 늦어질 수 있는 이유" items={profile.delays} tone="amber" />
        </section>

        <section className="mt-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8"><p className="text-xs font-black text-violet-600">GOOD MATCH</p><h2 className="mt-2 text-xl font-black text-ink">잘 맞는 연애 상대 유형</h2><p className="mt-4 leading-8 text-slate-700">{profile.partnerType}</p></section>

        <section className="mt-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8"><h2 className="text-xl font-black text-ink">결혼 전 준비하면 좋은 것</h2><ol className="mt-6 space-y-4">{profile.preparations.map((item, index) => <li key={item} className="flex items-center gap-4"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-rose-500 text-sm font-black text-white">{index + 1}</span><span className="text-sm font-semibold leading-6 text-slate-700">{item}</span></li>)}</ol></section>

        <section id="share-card" className="scroll-mt-24 mt-8 grid gap-6 rounded-3xl bg-gradient-to-br from-rose-500 to-violet-600 p-6 text-white shadow-xl shadow-rose-200 sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><ShareImageCard emoji={profile.icon} eyebrow="나의 결혼 타이밍" title={profile.name} subtitle={profile.summary} badge={ageLabel} accent="pink" /><div><h2 className="text-xl font-black">내 결혼 타이밍 공유하기</h2><p className="mt-2 text-sm leading-6 text-rose-50">결과는 예언이 아니라 지금의 관계와 선택 패턴을 보여주는 힌트예요.</p><div className="mt-5 rounded-2xl bg-white/10 p-2 backdrop-blur"><ShareButtons title={shareTitle} description={shareDescription} path={`/result/${profile.slug}`} /></div></div></section>

        <section className="mt-10"><h2 className="text-xl font-black text-ink">함께 보면 좋은 테스트</h2><div className="mt-5 grid gap-3 sm:grid-cols-2"><RelatedTest href="/tests/office-animal-test" icon="🐾" title="회사에서 나는 어떤 동물일까?" text="업무와 협업 성향을 12지신 동물로 알아보세요." /><RelatedTest href="/tests/side-job-recommendation" icon="✨" title="나에게 맞는 부업 추천 테스트" text="내 성향과 생활 방식에 맞는 부업을 찾아보세요." /></div></section>
        <div className="mt-8 text-center"><Link href="/tests/marriage-timing-test" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50">나이부터 다시 입력하기</Link></div>
        <p className="mt-7 text-center text-xs leading-5 text-slate-400">이 결과는 현재 응답을 바탕으로 한 성향 분석이며 실제 결혼 시기를 예언하거나 보장하지 않습니다.</p>
      </div>
      <MobileShareDock />
    </div>
  );
}

function InsightCard({ icon, title, items, tone }: { icon: string; title: string; items: string[]; tone: "rose" | "amber" }) {
  const classes = tone === "rose" ? "border-rose-100 bg-rose-50/70" : "border-amber-100 bg-amber-50/70";
  return <div className={`rounded-3xl border p-6 ${classes}`}><span className="text-3xl" aria-hidden="true">{icon}</span><h2 className="mt-4 font-black text-ink">{title}</h2><ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">{items.map((item) => <li key={item} className="flex gap-2"><span aria-hidden="true">•</span>{item}</li>)}</ul></div>;
}

function RelatedTest({ href, icon, title, text }: { href: string; icon: string; title: string; text: string }) {
  return <Link href={href} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-rose-200"><span className="text-4xl" aria-hidden="true">{icon}</span><span><strong className="block text-sm text-ink">{title}</strong><span className="mt-1 block text-xs leading-5 text-slate-500">{text}</span></span></Link>;
}
