import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { countryTraits } from "@/data/personality-country";
import type { CountryResultProfile, CountryScores } from "@/lib/types";

export function PersonalityCountryResult({ profile, similar, scores, fitScore }: { profile: CountryResultProfile; similar: CountryResultProfile[]; scores: CountryScores; fitScore: number }) {
  const sharePath = `/personality-country-test/result/${profile.slug}`;
  const similarCountries = similar.length ? similar.map((item) => `${item.flag} ${item.country}`) : profile.similarCountries;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#ccfbf1_0,#f8fafc_34%,#eef2ff_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "해외 국가 결과" }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 text-center shadow-2xl shadow-teal-100/80 backdrop-blur">
              <div className="absolute inset-0 opacity-[.18] [background-image:linear-gradient(90deg,#0f766e_1px,transparent_1px),linear-gradient(#0f766e_1px,transparent_1px)] [background-size:44px_44px]" />
              <div className="absolute -right-12 -top-12 size-44 rounded-full bg-cyan-200/50 blur-2xl" />
              <div className="absolute -bottom-14 -left-12 size-52 rounded-full bg-indigo-200/50 blur-2xl" />
              <div className="relative px-6 pb-8 pt-10 sm:pt-14">
                <p className="text-xs font-black tracking-[.18em] text-teal-700">내 성격과 가장 잘 맞는 해외 국가는?</p>
                <div className="mx-auto mt-5 grid size-28 place-items-center rounded-[2rem] border border-teal-100 bg-white/80 text-7xl shadow-inner" aria-hidden="true">{profile.flag}</div>
                <h1 className="mt-5 text-4xl font-black tracking-[-0.06em] text-slate-950 sm:text-6xl">{profile.country}</h1>
                <p className="mx-auto mt-4 max-w-xl text-base font-bold leading-7 text-slate-700">{profile.summary}</p>
                <div className="mx-auto mt-7 grid size-36 place-items-center rounded-full p-2.5 shadow-xl" style={{ background: `conic-gradient(#0f766e ${fitScore}%,#ccfbf1 0)` }}>
                  <div className="grid size-full place-items-center rounded-full bg-white"><span><strong className="block text-4xl font-black text-teal-700">{fitScore}%</strong><span className="text-xs font-bold text-slate-400">성향 매칭도</span></span></div>
                </div>
              </div>
            </section>
          </SectionReveal>

          <section className="mt-7 grid gap-5 lg:grid-cols-[.95fr_1.05fr]">
            <SectionReveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <p className="text-xs font-black tracking-[.16em] text-teal-700">PERSONALITY</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">당신의 성격 요약</h2>
              <p className="mt-4 leading-8 text-slate-700">{profile.personality}</p>
            </SectionReveal>
            <SectionReveal className="rounded-[2rem] border border-teal-100 bg-teal-50/70 p-6 shadow-card sm:p-8">
              <p className="text-xs font-black tracking-[.16em] text-teal-700">WHY MATCH</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">이 나라와 잘 맞는 이유</h2>
              <p className="mt-4 leading-8 text-slate-700">{profile.matchReason}</p>
            </SectionReveal>
          </section>

          <SectionReveal className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-9">
            <p className="text-xs font-black tracking-[.16em] text-teal-700">MATCHING MAP</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">나의 성향 지도</h2>
            <div className="mt-7 space-y-5">
              {countryTraits.map(({ key, label, color }) => {
                const value = scores[key];
                return <div key={key}><div className="flex items-end justify-between gap-4"><strong className="text-sm text-slate-800">{label}</strong><strong className="text-teal-700">{value}%</strong></div><div className="mt-2.5 h-3 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${value}%` }} /></div></div>;
              })}
            </div>
          </SectionReveal>

          <section className="mt-7 grid gap-5 sm:grid-cols-2">
            <SectionReveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-black text-slate-950">예상 라이프스타일</h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">{profile.lifestyle}</p>
            </SectionReveal>
            <SectionReveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-black text-slate-950">여행·생활 키워드</h2>
              <div className="mt-5 flex flex-wrap gap-2">{profile.keywords.map((keyword) => <span key={keyword} className="rounded-full bg-teal-50 px-3 py-2 text-xs font-black text-teal-700">{keyword}</span>)}</div>
            </SectionReveal>
          </section>

          <SectionReveal className="mt-7 rounded-[2rem] border border-indigo-100 bg-indigo-50/70 p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-black text-slate-950">비슷하게 잘 맞는 나라</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {similarCountries.map((country) => <div key={country} className="rounded-2xl bg-white px-4 py-4 text-sm font-black text-slate-700 shadow-sm">{country}</div>)}
            </div>
          </SectionReveal>

          <section id="share-card" className="scroll-mt-24 mt-8 grid gap-6 rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={profile.flag} eyebrow="나와 잘 맞는 해외 국가는" title={profile.country} subtitle={profile.summary} badge={`성향 매칭도 ${fitScore}%`} accent="blue" />
            <div>
              <h2 className="text-xl font-black">친구는 어떤 나라가 나올까?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">결과를 공유하고 서로의 여행·생활 성향을 비교해 보세요.</p>
              <div className="mt-5"><ShareButtons title={`내 성격과 가장 잘 맞는 나라는 ${profile.flag} ${profile.country}!`} description="너는 어떤 나라가 나올까?" path={sharePath} /></div>
            </div>
          </section>

          <div className="mt-8 flex flex-col gap-3 text-center sm:flex-row sm:justify-center">
            <Link href="/tests/personality-country-test?start=1" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700 hover:bg-slate-50">다시 테스트하기</Link>
            <Link href="/tests" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-bold text-white hover:bg-slate-800">다른 테스트 보기</Link>
          </div>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
