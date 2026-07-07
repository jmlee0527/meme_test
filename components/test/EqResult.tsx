import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { eqDomainDescriptions, eqDomainLabels } from "@/data/eq-test";
import { eqResultPath } from "@/lib/eq-engine";
import type { EqDomain, EqDomainScores, EqResultProfile } from "@/lib/types";

const domainOrder: EqDomain[] = ["selfAwareness", "selfRegulation", "empathy", "socialSkills", "resilience"];

function radarPoint(index: number, value: number, radius = 84, center = 100) {
  const angle = (Math.PI * 2 * index) / domainOrder.length - Math.PI / 2;
  const scaled = (value / 100) * radius;
  return `${center + Math.cos(angle) * scaled},${center + Math.sin(angle) * scaled}`;
}

function RadarChart({ scores }: { scores: EqDomainScores }) {
  const rings = [20, 40, 60, 80, 100];
  const polygon = domainOrder.map((domain, index) => radarPoint(index, scores[domain])).join(" ");
  return (
    <div className="mx-auto max-w-sm">
      <svg viewBox="0 0 200 220" role="img" aria-label="EQ 영역별 레이더 차트" className="h-auto w-full">
        {rings.map((ring) => <polygon key={ring} points={domainOrder.map((_, index) => radarPoint(index, ring)).join(" ")} fill="none" stroke="#e2e8f0" strokeWidth="1" />)}
        {domainOrder.map((domain, index) => {
          const [x, y] = radarPoint(index, 100);
          return <line key={domain} x1="100" y1="100" x2={x} y2={y} stroke="#e2e8f0" strokeWidth="1" />;
        })}
        <polygon points={polygon} fill="rgba(236,72,153,.26)" stroke="#ec4899" strokeWidth="3" />
        {domainOrder.map((domain, index) => {
          const [x, y] = radarPoint(index, scores[domain]).split(",").map(Number);
          return <circle key={domain} cx={x} cy={y} r="4" fill="#ec4899" />;
        })}
        {domainOrder.map((domain, index) => {
          const [x, y] = radarPoint(index, 116).split(",").map(Number);
          return <text key={domain} x={x} y={y + 4} textAnchor="middle" className="fill-slate-600 text-[9px] font-bold">{eqDomainLabels[domain]}</text>;
        })}
      </svg>
    </div>
  );
}

export function EqResult({ profile, domainPercentages, eqScore, empathyScore, strongestDomain, growthDomain }: { profile: EqResultProfile; domainPercentages: EqDomainScores; eqScore: number; empathyScore: number; strongestDomain: EqDomain; growthDomain: EqDomain }) {
  const sharePath = eqResultPath(profile.slug);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fce7f3_0,#f8fafc_42%,#eef2ff_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "심리 테스트", href: "/category/심리" }, { name: "EQ 테스트", href: "/tests/eq-test" }, { name: profile.name }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="overflow-hidden rounded-[2rem] border border-pink-100 bg-white text-center shadow-2xl shadow-pink-100/80">
              <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-violet-500 px-6 py-10 text-white sm:px-10 sm:py-14">
                <p className="text-xs font-black tracking-[.18em] opacity-90">EMOTIONAL INTELLIGENCE</p>
                <div className="mx-auto mt-5 grid size-28 place-items-center rounded-[2rem] bg-white/20 text-7xl shadow-inner backdrop-blur" aria-hidden="true">{profile.icon}</div>
                <h1 className="mt-5 text-4xl font-black tracking-[-0.06em] sm:text-6xl">{profile.name}</h1>
                <p className="mx-auto mt-4 max-w-xl text-base font-bold leading-7 opacity-95">{profile.summary}</p>
                <div className="mx-auto mt-7 grid max-w-md grid-cols-2 gap-3">
                  <div className="rounded-3xl bg-white/20 p-5 backdrop-blur"><strong className="block text-4xl font-black">{eqScore}점</strong><span className="text-xs font-bold opacity-90">EQ 점수</span></div>
                  <div className="rounded-3xl bg-white/20 p-5 backdrop-blur"><strong className="block text-4xl font-black">{empathyScore}점</strong><span className="text-xs font-bold opacity-90">공감지수</span></div>
                </div>
              </div>
            </section>
          </SectionReveal>

          <section className="mt-7 grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
            <SectionReveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <p className="text-xs font-black tracking-[.16em] text-pink-600">EQ RADAR</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">5개 영역 레이더 차트</h2>
              <RadarChart scores={domainPercentages} />
            </SectionReveal>
            <SectionReveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <p className="text-xs font-black tracking-[.16em] text-pink-600">ANALYSIS</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">결과 해석</h2>
              <p className="mt-4 leading-8 text-slate-700">{profile.description}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-pink-50 p-4 text-sm font-bold text-pink-950">강점 영역<br /><span className="text-lg">{eqDomainLabels[strongestDomain]}</span></div>
                <div className="rounded-2xl bg-violet-50 p-4 text-sm font-bold text-violet-950">보완 영역<br /><span className="text-lg">{eqDomainLabels[growthDomain]}</span></div>
              </div>
            </SectionReveal>
          </section>

          <SectionReveal className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-2xl font-black text-slate-950">영역별 점수</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {domainOrder.map((domain) => {
                const value = domainPercentages[domain];
                return <div key={domain} className="rounded-2xl border border-slate-100 bg-slate-50 p-4"><div className="flex justify-between gap-3 text-sm font-black text-slate-700"><span>{eqDomainLabels[domain]}</span><span>{value}점</span></div><div className="mt-2 h-3 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-gradient-to-r from-pink-500 to-violet-500" style={{ width: `${value}%` }} /></div><p className="mt-3 text-xs font-semibold leading-5 text-slate-500">{eqDomainDescriptions[domain]}</p></div>;
              })}
            </div>
          </SectionReveal>

          <section className="mt-7 grid gap-5 sm:grid-cols-2">
            <SectionReveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8"><h2 className="text-xl font-black text-slate-950">강점</h2><ul className="mt-4 space-y-3 text-sm font-semibold leading-7 text-slate-600">{profile.strengths.map((item) => <li key={item}>✓ {item}</li>)}</ul></SectionReveal>
            <SectionReveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8"><h2 className="text-xl font-black text-slate-950">성장 팁</h2><ul className="mt-4 space-y-3 text-sm font-semibold leading-7 text-slate-600">{profile.growthTips.map((item) => <li key={item}>• {item}</li>)}</ul></SectionReveal>
          </section>

          <SectionReveal className="mt-7 rounded-[2rem] border border-emerald-100 bg-emerald-50/70 p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-black text-slate-950">추천 행동</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">{profile.recommendedActions.map((action) => <div key={action} className="rounded-2xl bg-white px-4 py-4 text-sm font-black text-emerald-700 shadow-sm">{action}</div>)}</div>
          </SectionReveal>

          <p className="mt-7 rounded-2xl bg-white/70 px-5 py-4 text-center text-xs font-semibold leading-6 text-slate-500">이 테스트는 의학적 진단이나 전문 심리검사가 아닌, 재미와 자기이해를 위한 참고용 심리테스트입니다.</p>

          <section className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-black text-slate-950">다른 테스트 추천</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Link href="/tests/enneagram" className="rounded-2xl bg-slate-50 p-4 text-sm font-black text-slate-700 hover:bg-slate-100">애니어그램 테스트</Link>
              <Link href="/tests/attachment-style-test" className="rounded-2xl bg-slate-50 p-4 text-sm font-black text-slate-700 hover:bg-slate-100">애착유형 테스트</Link>
              <Link href="/tests/color-personality-test" className="rounded-2xl bg-slate-50 p-4 text-sm font-black text-slate-700 hover:bg-slate-100">컬러 성격 테스트</Link>
            </div>
          </section>

          <section id="share-card" className="scroll-mt-24 mt-8 grid gap-6 rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={profile.icon} eyebrow="EQ 테스트 결과" title={`${eqScore}점`} subtitle={profile.name} badge={`공감지수 ${empathyScore}점`} accent="purple" />
            <div>
              <h2 className="text-xl font-black">친구의 EQ와 공감지수는?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">결과를 공유하고 서로의 감정지능과 강점 영역을 비교해보세요.</p>
              <div className="mt-5"><ShareButtons title={`나는 EQ ${eqScore}점! 공감지수 ${empathyScore}점 😎`} description="너의 감정지능도 테스트해봐 👇" path={sharePath} /></div>
            </div>
          </section>

          <div className="mt-8 flex flex-col gap-3 text-center sm:flex-row sm:justify-center">
            <Link href="/tests/eq-test?start=1" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700 hover:bg-slate-50">다시 테스트하기</Link>
            <Link href="/tests" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-bold text-white hover:bg-slate-800">다른 테스트 보기</Link>
          </div>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
