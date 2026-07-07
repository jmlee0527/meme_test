import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { bigFiveDomainDescriptions, bigFiveDomainLabels, bigFiveDomainOrder, bigFiveDomainShortLabels } from "@/data/big-five";
import { bigFiveResultPath } from "@/lib/big-five-engine";
import type { BigFiveDomain, BigFiveResultProfile, BigFiveScores } from "@/lib/types";

function radarPoint(index: number, value: number, radius = 84, center = 100) {
  const angle = (Math.PI * 2 * index) / bigFiveDomainOrder.length - Math.PI / 2;
  const scaled = (value / 100) * radius;
  return `${center + Math.cos(angle) * scaled},${center + Math.sin(angle) * scaled}`;
}

function levelText(value: number) {
  if (value >= 70) return "높음";
  if (value <= 39) return "낮음";
  return "균형";
}

function domainInterpretation(domain: BigFiveDomain, value: number) {
  const descriptions = bigFiveDomainDescriptions[domain];
  if (value >= 70) return descriptions.high;
  if (value <= 39) return descriptions.low;
  return descriptions.neutral;
}

function RadarChart({ scores }: { scores: BigFiveScores }) {
  const rings = [20, 40, 60, 80, 100];
  const polygon = bigFiveDomainOrder.map((domain, index) => radarPoint(index, scores[domain])).join(" ");
  return (
    <div className="mx-auto max-w-sm">
      <svg viewBox="0 0 200 220" role="img" aria-label="Big Five OCEAN 성격 점수 레이더 차트" className="h-auto w-full">
        {rings.map((ring) => <polygon key={ring} points={bigFiveDomainOrder.map((_, index) => radarPoint(index, ring)).join(" ")} fill="none" stroke="#e2e8f0" strokeWidth="1" />)}
        {bigFiveDomainOrder.map((domain, index) => {
          const [x, y] = radarPoint(index, 100).split(",").map(Number);
          return <line key={domain} x1="100" y1="100" x2={x} y2={y} stroke="#e2e8f0" strokeWidth="1" />;
        })}
        <polygon points={polygon} fill="rgba(79,70,229,.24)" stroke="#4f46e5" strokeWidth="3" />
        {bigFiveDomainOrder.map((domain, index) => {
          const [x, y] = radarPoint(index, scores[domain]).split(",").map(Number);
          return <circle key={domain} cx={x} cy={y} r="4" fill="#4f46e5" />;
        })}
        {bigFiveDomainOrder.map((domain, index) => {
          const [x, y] = radarPoint(index, 117).split(",").map(Number);
          return (
            <text key={domain} x={x} y={y + 4} textAnchor="middle" className="fill-slate-700 text-[8px] font-black">
              {bigFiveDomainShortLabels[domain]} {bigFiveDomainLabels[domain]}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export function BigFiveResult({
  profile,
  scores,
  dominantDomain,
  lowestDomain,
}: {
  profile: BigFiveResultProfile;
  scores: BigFiveScores;
  dominantDomain: BigFiveDomain;
  lowestDomain: BigFiveDomain;
}) {
  const sharePath = bigFiveResultPath(profile.slug);
  const scoreLines = bigFiveDomainOrder.map((domain) => `${bigFiveDomainLabels[domain]} ${scores[domain]}점`).join("\n");

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#e0e7ff_0,#f8fafc_42%,#eef2ff_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "성격 테스트", href: "/category/성격" }, { name: "Big Five 성격 테스트", href: "/tests/big-five" }, { name: profile.name }]} />
        <div className="mx-auto max-w-5xl">
          <SectionReveal>
            <section className="overflow-hidden rounded-[2rem] border border-indigo-100 bg-white text-center shadow-2xl shadow-indigo-100/80">
              <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-500 px-6 py-10 text-white sm:px-10 sm:py-14">
                <p className="text-xs font-black tracking-[.18em] opacity-90">OCEAN PERSONALITY PROFILE</p>
                <div className="mx-auto mt-5 grid size-28 place-items-center rounded-[2rem] bg-white/20 text-7xl shadow-inner backdrop-blur" aria-hidden="true">{profile.icon}</div>
                <h1 className="mt-5 text-4xl font-black tracking-[-0.06em] sm:text-6xl">당신의 Big Five 성격 프로필</h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg font-bold leading-8 opacity-95">{profile.name} · {profile.summary}</p>
                <div className="mx-auto mt-7 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-5">
                  {bigFiveDomainOrder.map((domain) => (
                    <div key={domain} className="rounded-3xl bg-white/18 p-4 backdrop-blur">
                      <strong className="block text-3xl font-black">{scores[domain]}</strong>
                      <span className="text-[11px] font-bold opacity-90">{bigFiveDomainLabels[domain]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </SectionReveal>

          <section className="mt-7 grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
            <SectionReveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <p className="text-xs font-black tracking-[.16em] text-indigo-600">OCEAN RADAR</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">5개 성격 차원 레이더</h2>
              <RadarChart scores={scores} />
            </SectionReveal>
            <SectionReveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <p className="text-xs font-black tracking-[.16em] text-indigo-600">CORE ANALYSIS</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">{profile.name}</h2>
              <p className="mt-4 leading-8 text-slate-700">{profile.description}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-indigo-50 p-4 text-sm font-bold text-indigo-950">가장 두드러진 차원<br /><span className="text-lg">{bigFiveDomainLabels[dominantDomain]}</span></div>
                <div className="rounded-2xl bg-sky-50 p-4 text-sm font-bold text-sky-950">상대적으로 낮은 차원<br /><span className="text-lg">{bigFiveDomainLabels[lowestDomain]}</span></div>
              </div>
            </SectionReveal>
          </section>

          <SectionReveal className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-2xl font-black text-slate-950">영역별 해석</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {bigFiveDomainOrder.map((domain) => {
                const value = scores[domain];
                return (
                  <div key={domain} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex justify-between gap-3 text-sm font-black text-slate-700">
                      <span>{bigFiveDomainShortLabels[domain]} · {bigFiveDomainLabels[domain]}</span>
                      <span>{value}점 · {levelText(value)}</span>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-500" style={{ width: `${value}%` }} /></div>
                    <p className="mt-3 text-xs font-semibold leading-5 text-slate-500">{domainInterpretation(domain, value)}</p>
                  </div>
                );
              })}
            </div>
          </SectionReveal>

          <section className="mt-7 grid gap-5 lg:grid-cols-2">
            <SectionReveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8"><h2 className="text-xl font-black text-slate-950">업무 스타일</h2><p className="mt-4 leading-7 text-slate-700">{profile.workStyle}</p></SectionReveal>
            <SectionReveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8"><h2 className="text-xl font-black text-slate-950">인간관계 스타일</h2><p className="mt-4 leading-7 text-slate-700">{profile.relationshipStyle}</p></SectionReveal>
            <SectionReveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8"><h2 className="text-xl font-black text-slate-950">연애 스타일</h2><p className="mt-4 leading-7 text-slate-700">{profile.loveStyle}</p></SectionReveal>
            <SectionReveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8"><h2 className="text-xl font-black text-slate-950">스트레스 반응</h2><p className="mt-4 leading-7 text-slate-700">{profile.stressStyle}</p></SectionReveal>
          </section>

          <section className="mt-7 grid gap-5 sm:grid-cols-2">
            <SectionReveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8"><h2 className="text-xl font-black text-slate-950">강점</h2><ul className="mt-4 space-y-3 text-sm font-semibold leading-7 text-slate-600">{profile.strengths.map((item) => <li key={item}>✓ {item}</li>)}</ul></SectionReveal>
            <SectionReveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8"><h2 className="text-xl font-black text-slate-950">주의할 점</h2><ul className="mt-4 space-y-3 text-sm font-semibold leading-7 text-slate-600">{profile.cautions.map((item) => <li key={item}>• {item}</li>)}</ul></SectionReveal>
          </section>

          <SectionReveal className="mt-7 rounded-[2rem] border border-emerald-100 bg-emerald-50/70 p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-black text-slate-950">성장 포인트</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">{profile.growthPoints.map((point) => <div key={point} className="rounded-2xl bg-white px-4 py-4 text-sm font-black text-emerald-700 shadow-sm">{point}</div>)}</div>
          </SectionReveal>

          <p className="mt-7 rounded-2xl bg-white/75 px-5 py-4 text-center text-xs font-semibold leading-6 text-slate-500">이 테스트는 의학적 진단이나 임상 심리검사가 아닌, 재미와 자기이해를 위한 참고용 성격 분석 콘텐츠입니다. 특정 점수가 좋고 나쁘다는 뜻은 아니며 모든 성향에는 장점과 주의점이 함께 있습니다.</p>

          <section className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-black text-slate-950">다른 성격 테스트 추천</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Link href="/tests/enneagram" className="rounded-2xl bg-slate-50 p-4 text-sm font-black text-slate-700 hover:bg-slate-100">애니어그램 테스트</Link>
              <Link href="/tests/color-personality-test" className="rounded-2xl bg-slate-50 p-4 text-sm font-black text-slate-700 hover:bg-slate-100">컬러 성격 테스트</Link>
              <Link href="/tests/eq-test" className="rounded-2xl bg-slate-50 p-4 text-sm font-black text-slate-700 hover:bg-slate-100">EQ 테스트</Link>
            </div>
          </section>

          <section id="share-card" className="scroll-mt-24 mt-8 grid gap-6 rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={profile.icon} eyebrow="Big Five 성격 분석 결과" title={profile.name} subtitle={`${bigFiveDomainLabels[dominantDomain]} ${scores[dominantDomain]}점`} badge="OCEAN PROFILE" accent="purple" />
            <div>
              <h2 className="text-xl font-black">친구의 OCEAN 프로필은?</h2>
              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-300">{scoreLines}</p>
              <div className="mt-5"><ShareButtons title={`나의 Big Five 성격 분석 결과: ${profile.name}`} description={`${scoreLines}\n너도 테스트해봐 👇`} path={sharePath} /></div>
            </div>
          </section>

          <div className="mt-8 flex flex-col gap-3 text-center sm:flex-row sm:justify-center">
            <Link href="/tests/big-five?start=1" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700 hover:bg-slate-50">다시 테스트하기</Link>
            <Link href="/tests" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-bold text-white hover:bg-slate-800">다른 테스트 보기</Link>
          </div>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
