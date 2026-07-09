import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { coffeeBrandProfiles, coffeeBrandTraits } from "@/data/coffee-brand";
import type { CoffeeBrandProfile, CoffeeBrandScores } from "@/lib/types";

function CoffeeMoodArtwork({ profile }: { profile: CoffeeBrandProfile }) {
  return (
    <div
      className="relative mx-auto grid size-44 overflow-hidden rounded-[2.5rem] border border-white/30 shadow-2xl sm:size-52"
      style={{ background: `linear-gradient(145deg, ${profile.palette[0]}, ${profile.palette[1]})` }}
      role="img"
      aria-label={`${profile.name}의 분위기를 재해석한 오리지널 추상 카페 일러스트`}
    >
      <span className="absolute -right-8 -top-8 size-32 rounded-full border border-white/20 bg-white/10" />
      <span className="absolute -bottom-10 -left-8 size-36 rounded-full border border-white/15 bg-black/10" />
      <span className="absolute left-6 top-5 text-xl text-white/60">⌁</span>
      <span className="absolute bottom-6 right-6 text-lg text-white/50">· · ·</span>
      <span className="relative place-self-center text-8xl text-white drop-shadow-xl" aria-hidden="true">☕</span>
      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-2xl font-black text-white/85" aria-hidden="true">{profile.symbol}</span>
    </div>
  );
}

export function CoffeeBrandResult({
  profile,
  secondary,
  scores,
  fitScore,
}: {
  profile: CoffeeBrandProfile;
  secondary?: CoffeeBrandProfile;
  scores: CoffeeBrandScores;
  fitScore: number;
}) {
  const sharePath = `/coffee-brand-test/result/${profile.slug}`;
  const featuredTraits = coffeeBrandTraits
    .filter(({ key }) => profile.coreTraits.includes(key))
    .sort((a, b) => scores[b.key] - scores[a.key]);
  const matches = profile.goodMatches
    .map((slug) => coffeeBrandProfiles.find((item) => item.slug === slug))
    .filter((item): item is CoffeeBrandProfile => Boolean(item));
  const opposite = coffeeBrandProfiles.find((item) => item.slug === profile.oppositeMatch);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ffedd5_0,#f8fafc_40%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "커피 브랜드 테스트 결과" }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="relative overflow-hidden rounded-[2.25rem] bg-[#1c1917] px-6 py-10 text-center text-white shadow-2xl sm:px-10 sm:py-14">
              <div className="absolute inset-0 opacity-[.12] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:24px_24px]" />
              <div className="relative">
                <p className="text-xs font-black tracking-[.22em] text-orange-300">나와 어울리는 커피 브랜드는?</p>
                <div className="mt-6"><CoffeeMoodArtwork profile={profile} /></div>
                <h1 className="mt-7 text-4xl font-black tracking-[-0.06em] sm:text-6xl">{profile.name}</h1>
                <p className="mx-auto mt-4 max-w-xl text-base font-semibold leading-7 text-stone-200">{profile.summary}</p>
                <div className="mx-auto mt-7 grid size-32 place-items-center rounded-full p-2" style={{ background: `conic-gradient(${profile.palette[1]} ${fitScore}%,#44403c 0)` }}>
                  <div className="grid size-full place-items-center rounded-full bg-[#1c1917]"><span><strong className="block text-3xl font-black">{fitScore}%</strong><span className="text-xs text-stone-400">브랜드 매칭도</span></span></div>
                </div>
                {secondary && <p className="mx-auto mt-5 max-w-lg rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold text-stone-300">숨은 보조 취향: <strong className="text-white">{secondary.name}</strong></p>}
              </div>
            </section>
          </SectionReveal>

          <SectionReveal className="mt-7 rounded-[2rem] border border-orange-100 bg-white p-6 shadow-card sm:p-9">
            <p className="text-xs font-black tracking-[.18em] text-orange-600">LIFESTYLE ANALYSIS</p>
            <h2 className="mt-2 text-2xl font-black text-stone-950">당신의 성격과 라이프스타일</h2>
            <p className="mt-5 leading-8 text-stone-700">{profile.description}</p>
          </SectionReveal>

          <SectionReveal className="mt-7 rounded-[2rem] border border-orange-100 bg-orange-50/70 p-6 sm:p-9">
            <h2 className="text-2xl font-black text-stone-950">이 브랜드와 어울리는 이유</h2>
            <p className="mt-4 leading-8 text-stone-700">{profile.matchReason}</p>
          </SectionReveal>

          <SectionReveal className="mt-7 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-card sm:p-9">
            <h2 className="text-2xl font-black text-stone-950">핵심 성향</h2>
            <div className="mt-7 space-y-5">
              {featuredTraits.map(({ key, label, color }) => (
                <div key={key}>
                  <div className="flex items-end justify-between gap-4"><strong className="text-sm text-stone-700">{label}</strong><strong className="text-orange-700">{scores[key]}%</strong></div>
                  <div className="mt-2.5 h-3 overflow-hidden rounded-full bg-stone-100"><div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${scores[key]}%` }} /></div>
                </div>
              ))}
            </div>
          </SectionReveal>

          <section className="mt-7 grid gap-5 md:grid-cols-2">
            <SectionReveal className="rounded-[2rem] border border-emerald-100 bg-emerald-50/60 p-6 sm:p-8">
              <h2 className="text-xl font-black text-emerald-950">핵심 강점 5가지</h2>
              <ul className="mt-5 space-y-3">{profile.strengths.map((item) => <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-emerald-900"><span aria-hidden="true">✓</span>{item}</li>)}</ul>
            </SectionReveal>
            <SectionReveal className="rounded-[2rem] border border-amber-100 bg-amber-50/60 p-6 sm:p-8">
              <h2 className="text-xl font-black text-amber-950">조금 주의할 점</h2>
              <ul className="mt-5 space-y-3">{profile.cautions.map((item) => <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-amber-900"><span aria-hidden="true">•</span>{item}</li>)}</ul>
            </SectionReveal>
          </section>

          <SectionReveal className="mt-7 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-card sm:p-9">
            <h2 className="text-2xl font-black text-stone-950">추천 커피 메뉴</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {profile.menus.map((menu, index) => <div key={menu} className="rounded-2xl bg-stone-100 p-4"><span className="text-xl" aria-hidden="true">{["☕", "🥛", "🧊"][index]}</span><strong className="mt-2 block text-sm text-stone-900">{menu}</strong></div>)}
            </div>
          </SectionReveal>

          <SectionReveal className="mt-7 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-card sm:p-9">
            <h2 className="text-2xl font-black text-stone-950">브랜드 취향 케미</h2>
            <p className="mt-2 text-sm leading-6 text-stone-500">브랜드의 우열이 아니라 선택 기준이 닮았거나 서로 보완되는 조합이에요.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {matches.map((match, index) => (
                <div key={match.slug} className="rounded-2xl bg-orange-50 p-4 text-center">
                  <span className="text-3xl" aria-hidden="true">☕</span>
                  <p className="mt-2 text-xs font-black text-orange-500">TOP {index + 1}</p>
                  <strong className="mt-1 block text-sm text-stone-900">{match.name}</strong>
                </div>
              ))}
            </div>
            {opposite && <div className="mt-4 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm leading-6 text-stone-600"><strong className="text-stone-900">반대 결의 브랜드: {opposite.name}</strong><br />공간과 소비에서 중요하게 보는 기준이 달라 평소와 다른 기분을 내고 싶을 때 오히려 새롭게 느껴질 수 있어요.</div>}
          </SectionReveal>

          <section id="share-card" className="mt-8 grid scroll-mt-24 gap-6 rounded-[2rem] bg-stone-950 p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji="☕" eyebrow="나와 어울리는 커피 브랜드" title={profile.name} subtitle={profile.summary} badge={`브랜드 매칭도 ${fitScore}%`} accent="orange" />
            <div>
              <h2 className="text-xl font-black">친구의 카페 취향도 궁금하다면?</h2>
              <p className="mt-2 text-sm leading-6 text-stone-300">결과를 공유하고 서로 어떤 커피 브랜드 분위기인지 비교해 보세요.</p>
              <div className="mt-5"><ShareButtons title={profile.shareText} description={profile.summary} path={sharePath} /></div>
            </div>
          </section>

          <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-5 text-stone-400">이 테스트는 각 브랜드와 제휴되지 않은 비공식 성향 콘텐츠입니다. 공식 로고·상표 이미지·매장 사진을 사용하지 않았으며, 결과는 브랜드의 품질이나 우열을 평가하지 않습니다.</p>
          <div className="mt-8 flex flex-col gap-3 text-center sm:flex-row sm:justify-center">
            <Link href="/tests/coffee-brand-test?start=1" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-stone-300 bg-white px-5 text-sm font-bold text-stone-700 hover:bg-stone-50">다시 테스트하기</Link>
            <Link href="/tests" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-orange-600 px-5 text-sm font-bold text-white hover:bg-orange-700">다른 테스트 보기</Link>
          </div>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
