import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { wizardCharacterProfiles, wizardCharacterTraits } from "@/data/wizard-character";
import type { WizardCharacterProfile, WizardCharacterScores } from "@/lib/types";

function CharacterEmblem({ profile, compact = false }: { profile: WizardCharacterProfile; compact?: boolean }) {
  return (
    <div
      className={`relative mx-auto grid overflow-hidden rounded-[2rem] border border-white/30 shadow-2xl ${compact ? "size-24" : "size-40 sm:size-48"}`}
      style={{ background: `linear-gradient(145deg, ${profile.palette[0]}, ${profile.palette[1]})` }}
      role="img"
      aria-label={`${profile.koreanName}을 연상시키는 오리지널 심볼 일러스트`}
    >
      <span className="absolute -right-5 -top-7 size-24 rounded-full border border-white/20 bg-white/10" />
      <span className="absolute -bottom-8 -left-6 size-28 rounded-full border border-white/15 bg-black/10" />
      <span className="absolute left-5 top-5 text-sm text-white/60">✦</span>
      <span className="absolute bottom-5 right-5 text-xs text-white/50">✧</span>
      <span className={`relative place-self-center text-white drop-shadow-xl ${compact ? "text-5xl" : "text-8xl"}`} aria-hidden="true">{profile.symbol}</span>
    </div>
  );
}

export function WizardCharacterResult({
  profile,
  secondary,
  scores,
  fitScore,
}: {
  profile: WizardCharacterProfile;
  secondary?: WizardCharacterProfile;
  scores: WizardCharacterScores;
  fitScore: number;
}) {
  const sharePath = `/harry-potter-character-test/result/${profile.slug}`;
  const featuredTraits = wizardCharacterTraits
    .filter(({ key }) => profile.coreTraits.includes(key))
    .sort((a, b) => scores[b.key] - scores[a.key]);
  const matches = profile.goodMatches
    .map((slug) => wizardCharacterProfiles.find((item) => item.slug === slug))
    .filter((item): item is WizardCharacterProfile => Boolean(item));
  const difficult = wizardCharacterProfiles.find((item) => item.slug === profile.difficultMatch);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ede9fe_0,#f8fafc_38%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "해리포터 성격 테스트 결과" }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="relative overflow-hidden rounded-[2.25rem] bg-slate-950 px-6 py-10 text-center text-white shadow-2xl sm:px-10 sm:py-14">
              <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:22px_22px]" />
              <div className="relative">
                <p className="text-xs font-black tracking-[.22em] text-violet-300">내가 해리포터 주인공이라면</p>
                <div className="mt-6"><CharacterEmblem profile={profile} /></div>
                <p className="mt-7 text-sm font-bold text-violet-200">{profile.name}</p>
                <h1 className="mt-1 text-4xl font-black tracking-[-0.06em] sm:text-6xl">{profile.koreanName}</h1>
                <p className="mx-auto mt-4 max-w-xl text-base font-semibold leading-7 text-slate-200">{profile.summary}</p>
                <div className="mx-auto mt-7 grid size-32 place-items-center rounded-full p-2" style={{ background: `conic-gradient(${profile.palette[1]} ${fitScore}%,#334155 0)` }}>
                  <div className="grid size-full place-items-center rounded-full bg-slate-950"><span><strong className="block text-3xl font-black">{fitScore}%</strong><span className="text-xs text-slate-400">캐릭터 일치도</span></span></div>
                </div>
                {secondary && <p className="mx-auto mt-5 max-w-lg rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold text-slate-300">숨은 보조 캐릭터: <strong className="text-white">{secondary.symbol} {secondary.koreanName}</strong></p>}
              </div>
            </section>
          </SectionReveal>

          <SectionReveal className="mt-7 rounded-[2rem] border border-violet-100 bg-white p-6 shadow-card sm:p-9">
            <p className="text-xs font-black tracking-[.18em] text-violet-600">PERSONALITY ANALYSIS</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">당신의 성격 분석</h2>
            <p className="mt-5 whitespace-pre-line leading-8 text-slate-700">{profile.description}</p>
          </SectionReveal>

          <SectionReveal className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-9">
            <h2 className="text-2xl font-black text-slate-950">핵심 성향</h2>
            <div className="mt-7 space-y-5">
              {featuredTraits.map(({ key, label, color }) => (
                <div key={key}>
                  <div className="flex items-end justify-between gap-4"><strong className="text-sm text-slate-700">{label}</strong><strong className="text-violet-700">{scores[key]}%</strong></div>
                  <div className="mt-2.5 h-3 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${scores[key]}%` }} /></div>
                </div>
              ))}
            </div>
          </SectionReveal>

          <section className="mt-7 grid gap-5 md:grid-cols-2">
            <SectionReveal className="rounded-[2rem] border border-emerald-100 bg-emerald-50/60 p-6 sm:p-8">
              <h2 className="text-xl font-black text-emerald-950">당신의 강점 5가지</h2>
              <ul className="mt-5 space-y-3">{profile.strengths.map((item) => <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-emerald-900"><span aria-hidden="true">✓</span>{item}</li>)}</ul>
            </SectionReveal>
            <SectionReveal className="rounded-[2rem] border border-amber-100 bg-amber-50/60 p-6 sm:p-8">
              <h2 className="text-xl font-black text-amber-950">조금 주의할 점</h2>
              <ul className="mt-5 space-y-3">{profile.cautions.map((item) => <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-amber-900"><span aria-hidden="true">•</span>{item}</li>)}</ul>
            </SectionReveal>
          </section>

          <SectionReveal className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-9">
            <h2 className="text-2xl font-black text-slate-950">캐릭터 케미</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">성격의 좋고 나쁨이 아니라 서로의 강점이 자연스럽게 보완되는 조합이에요.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {matches.map((match, index) => (
                <div key={match.slug} className="rounded-2xl bg-violet-50 p-4 text-center">
                  <span className="text-3xl" aria-hidden="true">{match.symbol}</span>
                  <p className="mt-2 text-xs font-black text-violet-500">TOP {index + 1}</p>
                  <strong className="mt-1 block text-sm text-slate-900">{match.koreanName}</strong>
                </div>
              ))}
            </div>
            {difficult && <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600"><strong className="text-slate-900">조율이 필요한 캐릭터: {difficult.symbol} {difficult.koreanName}</strong><br />서로 중요하게 보는 기준과 결정 속도가 달라 충분한 설명이 필요할 수 있어요.</div>}
          </SectionReveal>

          <section id="share-card" className="mt-8 grid scroll-mt-24 gap-6 rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={profile.symbol} eyebrow="내가 해리포터 주인공이라면" title={profile.koreanName} subtitle={profile.summary} badge={`캐릭터 일치도 ${fitScore}%`} accent="purple" />
            <div>
              <h2 className="text-xl font-black">친구는 어떤 캐릭터일까?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">결과를 공유하고 서로의 캐릭터 케미를 비교해 보세요.</p>
              <div className="mt-5"><ShareButtons title={profile.shareText} description={profile.summary} path={sharePath} /></div>
            </div>
          </section>

          <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-5 text-slate-400">이 테스트는 작품에서 영감을 받아 독자적으로 만든 비공식 팬 콘텐츠입니다. 공식 제작사·출판사와 관련이 없으며 공식 이미지나 배우 사진을 사용하지 않습니다.</p>
          <div className="mt-8 flex flex-col gap-3 text-center sm:flex-row sm:justify-center">
            <Link href="/tests/harry-potter-character-test?start=1" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700 hover:bg-slate-50">다시 테스트하기</Link>
            <Link href="/tests" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-violet-700 px-5 text-sm font-bold text-white hover:bg-violet-800">다른 테스트 보기</Link>
          </div>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
