import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { colorPersonalityProfiles } from "@/data/color-personality";
import type { ColorPersonalityProfile } from "@/lib/types";

const traitLabels = [
  ["extraversion", "외향성"],
  ["planning", "계획성"],
  ["emotion", "감정 표현"],
  ["empathy", "공감 능력"],
  ["challenge", "도전 성향"],
  ["stability", "안정 추구"],
  ["creativity", "창의성"],
  ["independence", "독립성"],
  ["realism", "현실성"],
  ["intuition", "직관성"],
] as const;

const gradients: Record<string, string> = {
  red: "linear-gradient(135deg,#ef4444,#f43f5e,#fb923c)",
  blue: "linear-gradient(135deg,#2563eb,#0ea5e9,#22d3ee)",
  green: "linear-gradient(135deg,#22c55e,#34d399,#5eead4)",
  yellow: "linear-gradient(135deg,#fde047,#fbbf24,#fdba74)",
  purple: "linear-gradient(135deg,#7c3aed,#a855f7,#e879f9)",
  pink: "linear-gradient(135deg,#ec4899,#fb7185,#f0abfc)",
  orange: "linear-gradient(135deg,#f97316,#f59e0b,#fde047)",
  black: "linear-gradient(135deg,#020617,#27272a,#525252)",
  white: "linear-gradient(135deg,#f8fafc,#ffffff,#dbeafe)",
  brown: "linear-gradient(135deg,#92400e,#c2410c,#a16207)",
  turquoise: "linear-gradient(135deg,#2dd4bf,#22d3ee,#38bdf8)",
  navy: "linear-gradient(135deg,#172554,#3730a3,#2563eb)",
  gold: "linear-gradient(135deg,#eab308,#f59e0b,#f97316)",
  silver: "linear-gradient(135deg,#94a3b8,#d4d4d8,#e5e7eb)",
  lavender: "linear-gradient(135deg,#c4b5fd,#ddd6fe,#fbcfe8)",
  rainbow: "linear-gradient(135deg,#f87171,#fde047,#86efac,#60a5fa,#a78bfa)",
};

function colorLabel(slug: string) {
  const item = colorPersonalityProfiles.find((profile) => profile.slug === slug);
  return item ? `${item.emoji} ${item.colorName}` : slug;
}

export function ColorPersonalityResult({ primary, secondary, primaryPercent, secondaryPercent }: { primary: ColorPersonalityProfile; secondary: ColorPersonalityProfile; primaryPercent: number; secondaryPercent: number }) {
  const sharePath = `/color-personality-test/${primary.slug}`;
  const gradient = gradients[primary.slug] ?? primary.gradient;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f5f3ff_0,#f8fafc_40%,#fdf2f8_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "심리 테스트", href: "/category/심리" }, { name: "컬러 성격 테스트", href: "/tests/color-personality-test" }, { name: `${primary.colorName} 결과` }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-2xl shadow-purple-100/80">
              <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] [background-size:22px_22px]" />
              <div className="relative px-6 py-10 text-center text-white sm:px-10 sm:py-14" style={{ background: gradient }}>
                <p className="text-xs font-black tracking-[.18em] opacity-90">COLOR PERSONALITY TEST</p>
                <div className="mx-auto mt-5 grid size-28 place-items-center rounded-[2rem] bg-white/20 text-7xl shadow-inner backdrop-blur" aria-hidden="true">{primary.emoji}</div>
                <h1 className="mt-5 text-5xl font-black tracking-[-0.07em] sm:text-7xl">{primary.englishName}</h1>
                <p className="mt-2 text-xl font-black">{primary.typeName}</p>
                <p className="mx-auto mt-4 max-w-xl text-sm font-bold leading-7 opacity-95 sm:text-base">{primary.summary}</p>
                <div className="mx-auto mt-7 max-w-md rounded-3xl bg-white/20 p-4 text-left backdrop-blur">
                  <div className="flex items-center justify-between text-sm font-black"><span>{primary.emoji} {primary.colorName}</span><span>{primaryPercent}%</span></div>
                  <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/25"><div className="h-full rounded-full bg-white" style={{ width: `${primaryPercent}%` }} /></div>
                  <div className="mt-4 flex items-center justify-between text-sm font-black"><span>{secondary.emoji} {secondary.colorName}</span><span>{secondaryPercent}%</span></div>
                  <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/25"><div className="h-full rounded-full bg-white/70" style={{ width: `${secondaryPercent}%` }} /></div>
                  <p className="mt-4 text-xs font-bold opacity-90">당신은 {primary.colorName}를 중심으로 {secondary.colorName} 성향이 섞여 있습니다.</p>
                </div>
              </div>
            </section>
          </SectionReveal>

          <section className="mt-7 grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
            <SectionReveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <p className="text-xs font-black tracking-[.16em] text-purple-600">CORE PERSONALITY</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">핵심 성격</h2>
              <p className="mt-4 leading-8 text-slate-700">{primary.description}</p>
            </SectionReveal>
            <SectionReveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <p className="text-xs font-black tracking-[.16em] text-purple-600">TRAIT MAP</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">성향 점수</h2>
              <div className="mt-5 space-y-3">
                {traitLabels.slice(0, 6).map(([key, label]) => {
                  const value = primary.traitScores[key];
                  return <div key={key}><div className="flex justify-between text-xs font-black text-slate-600"><span>{label}</span><span>{value}%</span></div><div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: `${value}%`, background: primary.hex }} /></div></div>;
                })}
              </div>
            </SectionReveal>
          </section>

          <section className="mt-7 grid gap-5 sm:grid-cols-2">
            <SectionReveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8"><h2 className="text-xl font-black text-slate-950">강점</h2><ul className="mt-4 space-y-3 text-sm font-semibold leading-7 text-slate-600">{primary.strengths.map((item) => <li key={item}>✓ {item}</li>)}</ul></SectionReveal>
            <SectionReveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8"><h2 className="text-xl font-black text-slate-950">주의할 점</h2><ul className="mt-4 space-y-3 text-sm font-semibold leading-7 text-slate-600">{primary.cautions.map((item) => <li key={item}>• {item}</li>)}</ul></SectionReveal>
          </section>

          <section className="mt-7 grid gap-5 lg:grid-cols-2">
            {[["인간관계 스타일", primary.relationshipStyle], ["연애 스타일", primary.loveStyle], ["스트레스 받을 때", primary.stressStyle], ["어울리는 직업 성향", primary.careerStyle]].map(([title, body]) => (
              <SectionReveal key={title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
                <h2 className="text-xl font-black text-slate-950">{title}</h2>
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">{body}</p>
              </SectionReveal>
            ))}
          </section>

          <section className="mt-7 grid gap-5 sm:grid-cols-2">
            <SectionReveal className="rounded-[2rem] border border-emerald-100 bg-emerald-50/70 p-6 shadow-card sm:p-8"><h2 className="text-xl font-black text-slate-950">잘 맞는 컬러</h2><div className="mt-4 flex flex-wrap gap-2">{primary.goodMatches.map((slug) => <span key={slug} className="rounded-full bg-white px-3 py-2 text-xs font-black text-emerald-700">{colorLabel(slug)}</span>)}</div></SectionReveal>
            <SectionReveal className="rounded-[2rem] border border-rose-100 bg-rose-50/70 p-6 shadow-card sm:p-8"><h2 className="text-xl font-black text-slate-950">조율이 필요한 컬러</h2><div className="mt-4 flex flex-wrap gap-2">{primary.difficultMatches.map((slug) => <span key={slug} className="rounded-full bg-white px-3 py-2 text-xs font-black text-rose-700">{colorLabel(slug)}</span>)}</div></SectionReveal>
          </section>

          <section className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-black text-slate-950">이 테스트도 해보세요</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Link href="/tests/attachment-style-test" className="rounded-2xl bg-slate-50 p-4 text-sm font-black text-slate-700 hover:bg-slate-100">애착유형 테스트</Link>
              <Link href="/tests/love-mbti-test" className="rounded-2xl bg-slate-50 p-4 text-sm font-black text-slate-700 hover:bg-slate-100">연애 MBTI 테스트</Link>
              <Link href="/tests/personality-country-test" className="rounded-2xl bg-slate-50 p-4 text-sm font-black text-slate-700 hover:bg-slate-100">성격 국가 테스트</Link>
            </div>
          </section>

          <section id="share-card" className="scroll-mt-24 mt-8 grid gap-6 rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={primary.emoji} eyebrow="컬러 성격 테스트" title={primary.colorName} subtitle={primary.typeName} badge={primary.summary} accent="purple" />
            <div>
              <h2 className="text-xl font-black">친구의 성격 컬러도 확인해보세요</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">결과를 공유하고 서로의 컬러 궁합과 성향 차이를 비교해보세요.</p>
              <div className="mt-5"><ShareButtons title={primary.shareText} description="12개의 질문으로 알아보는 나의 성격 컬러" path={sharePath} /></div>
            </div>
          </section>

          <div className="mt-8 flex flex-col gap-3 text-center sm:flex-row sm:justify-center">
            <Link href="/tests/color-personality-test?start=1" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700 hover:bg-slate-50">다시 테스트하기</Link>
            <Link href="/tests" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-bold text-white hover:bg-slate-800">다른 테스트 보기</Link>
          </div>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
