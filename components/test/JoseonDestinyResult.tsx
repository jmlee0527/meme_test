import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { joseonTraits } from "@/data/joseon-destiny";
import type { JoseonResultProfile, JoseonScores } from "@/lib/types";

export function JoseonDestinyResult({ profile, secondary, scores, fitScore }: { profile: JoseonResultProfile; secondary?: JoseonResultProfile; scores: JoseonScores; fitScore: number }) {
  const sharePath = `/joseon-destiny-test/result/${profile.slug}`;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fef3c7_0,#f8fafc_40%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "조선 운명 결과" }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="relative overflow-hidden rounded-[2rem] border border-amber-100 bg-[#fffaf0] text-center shadow-2xl shadow-amber-100/80">
              <div className="absolute inset-0 opacity-[.08] [background-image:radial-gradient(circle_at_1px_1px,#78350f_1px,transparent_0)] [background-size:18px_18px]" />
              <div className="relative bg-gradient-to-b from-amber-100/80 via-[#fffaf0] to-white px-6 pb-8 pt-10 sm:pt-14">
                <p className="text-xs font-black tracking-[.18em] text-amber-700">조선시대에 환생했다면...</p>
                <div className="mx-auto mt-5 grid size-28 place-items-center rounded-[2rem] border border-amber-200 bg-white/75 text-7xl shadow-inner" aria-hidden="true">{profile.icon}</div>
                <h1 className="mt-5 text-4xl font-black tracking-[-0.06em] text-stone-950 sm:text-6xl">{profile.name}</h1>
                <p className="mx-auto mt-4 max-w-xl text-base font-bold leading-7 text-stone-700">{profile.summary}</p>
                <div className="mx-auto mt-7 grid size-36 place-items-center rounded-full p-2.5 shadow-xl" style={{ background: `conic-gradient(#92400e ${fitScore}%,#fde68a 0)` }}>
                  <div className="grid size-full place-items-center rounded-full bg-white"><span><strong className="block text-4xl font-black text-amber-800">{fitScore}%</strong><span className="text-xs font-bold text-stone-400">운명 일치도</span></span></div>
                </div>
                {secondary && <p className="mx-auto mt-5 max-w-xl rounded-2xl bg-white/75 px-4 py-3 text-xs font-bold text-stone-500">숨은 보조 운명: <strong className="text-stone-800">{secondary.icon} {secondary.name}</strong></p>}
              </div>
            </section>
          </SectionReveal>

          <section className="mt-7 grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
            <SectionReveal className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-card sm:p-8">
              <p className="text-xs font-black tracking-[.16em] text-amber-700">PERSONALITY</p>
              <h2 className="mt-2 text-2xl font-black text-stone-950">성격 설명</h2>
              <p className="mt-4 leading-8 text-stone-700">{profile.personality}</p>
            </SectionReveal>
            <SectionReveal className="rounded-[2rem] border border-amber-100 bg-amber-50/70 p-6 shadow-card sm:p-8">
              <p className="text-xs font-black tracking-[.16em] text-amber-700">JOSEON LIFE</p>
              <h2 className="mt-2 text-2xl font-black text-stone-950">조선시대에서의 삶</h2>
              <p className="mt-4 leading-8 text-stone-700">{profile.joseonLife}</p>
            </SectionReveal>
          </section>

          <SectionReveal className="mt-7 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-card sm:p-9">
            <p className="text-xs font-black tracking-[.16em] text-amber-700">DESTINY STATS</p>
            <h2 className="mt-2 text-2xl font-black text-stone-950">나의 조선 능력치</h2>
            <div className="mt-7 space-y-5">
              {joseonTraits.map(({ key, label, color }) => {
                const value = scores[key];
                return <div key={key}><div className="flex items-end justify-between gap-4"><strong className="text-sm text-stone-800">{label}</strong><strong className="text-amber-800">{value}%</strong></div><div className="mt-2.5 h-3 overflow-hidden rounded-full bg-stone-100"><div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${value}%` }} /></div></div>;
              })}
            </div>
          </SectionReveal>

          <section className="mt-7 grid gap-5 sm:grid-cols-2">
            <SectionReveal className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-black text-stone-950">현대에 태어났다면</h2>
              <div className="mt-5 flex flex-wrap gap-2">{profile.modernJobs.map((job) => <span key={job} className="rounded-full bg-stone-100 px-3 py-2 text-xs font-black text-stone-700">{job}</span>)}</div>
            </SectionReveal>
            <SectionReveal className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-black text-stone-950">유명 인물 비유</h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-stone-600">{profile.famousComparison}</p>
            </SectionReveal>
          </section>

          <section id="share-card" className="scroll-mt-24 mt-8 grid gap-6 rounded-[2rem] bg-stone-950 p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={profile.icon} eyebrow="조선시대 내 운명은" title={profile.name} subtitle={profile.summary} badge={`운명 일치도 ${fitScore}%`} accent="orange" />
            <div>
              <h2 className="text-xl font-black">친구는 조선에서 어떤 삶을 살았을까?</h2>
              <p className="mt-2 text-sm leading-6 text-stone-300">결과를 공유하고 왕, 거상, 의적, 책사 중 누가 나오는지 비교해 보세요.</p>
              <div className="mt-5"><ShareButtons title={`조선시대에 환생했다면 당신의 운명은? 나는 ${profile.name}이 나왔다!`} description={profile.summary} path={sharePath} /></div>
            </div>
          </section>

          <div className="mt-8 flex flex-col gap-3 text-center sm:flex-row sm:justify-center">
            <Link href="/tests/joseon-destiny-test?start=1" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-stone-300 bg-white px-5 text-sm font-bold text-stone-700 hover:bg-stone-50">다시 테스트하기</Link>
            <Link href="/tests" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-stone-950 px-5 text-sm font-bold text-white hover:bg-stone-800">다른 테스트 보기</Link>
          </div>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
