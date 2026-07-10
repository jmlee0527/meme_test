import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { loverFruitProfiles, loverFruitTraits } from "@/data/lover-fruit";
import type { LoverFruitProfile, LoverFruitScores } from "@/lib/types";

function FruitCharacterArtwork({ profile }: { profile: LoverFruitProfile }) {
  return (
    <div
      className="relative mx-auto grid aspect-square size-48 overflow-hidden rounded-[2.75rem] border border-white/50 shadow-2xl sm:size-56"
      style={{ background: `radial-gradient(circle at 35% 25%, rgba(255,255,255,.75), transparent 28%), linear-gradient(145deg, ${profile.palette[0]}, ${profile.palette[1]})` }}
      role="img"
      aria-label={`${profile.name} 과일 캐릭터 일러스트`}
    >
      <span className="absolute -right-10 -top-8 size-36 rounded-full bg-white/20" />
      <span className="absolute -bottom-12 -left-10 size-40 rounded-full bg-white/20" />
      <span className="absolute left-7 top-7 text-2xl text-white/70" aria-hidden="true">♡</span>
      <span className="absolute right-8 top-10 text-xl text-white/70" aria-hidden="true">✦</span>
      <span className="absolute bottom-8 right-9 text-lg text-white/60" aria-hidden="true">✧</span>
      <span className="relative place-self-center text-8xl drop-shadow-xl sm:text-9xl" aria-hidden="true">{profile.emoji}</span>
      <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/70 px-4 py-1 text-xs font-black text-slate-800 shadow-sm">FRUIT TYPE</span>
    </div>
  );
}

export function LoverFruitResult({
  profile,
  secondary,
  third,
  scores,
  fitScore,
}: {
  profile: LoverFruitProfile;
  secondary?: LoverFruitProfile;
  third?: LoverFruitProfile;
  scores: LoverFruitScores;
  fitScore: number;
}) {
  const sharePath = `/lover-fruit-test/result/${profile.slug}`;
  const graphTraits = loverFruitTraits.filter(({ key }) => ["affection", "stability", "independence", "consideration", "humor", "responsibility"].includes(key));
  const matches = profile.goodMatches
    .map((slug) => loverFruitProfiles.find((item) => item.slug === slug))
    .filter((item): item is LoverFruitProfile => Boolean(item));
  const difficult = loverFruitProfiles.find((item) => item.slug === profile.difficultMatch);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ffe4e6_0,#fdf2f8_36%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "연인 과일 테스트 결과" }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="relative overflow-hidden rounded-[2.5rem] bg-[#1f1020] px-6 py-10 text-center text-white shadow-2xl sm:px-10 sm:py-14">
              <div className="absolute inset-0 opacity-[.16] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:22px_22px]" />
              <div className="absolute -left-24 top-10 size-60 rounded-full bg-pink-500/20 blur-3xl" />
              <div className="absolute -right-24 bottom-8 size-64 rounded-full bg-orange-400/20 blur-3xl" />
              <div className="relative">
                <p className="text-xs font-black tracking-[.22em] text-pink-200">나의 연인은 어떤 과일일까?</p>
                <div className="mt-6"><FruitCharacterArtwork profile={profile} /></div>
                <h1 className="mt-7 text-3xl font-black tracking-[-0.05em] sm:text-5xl">{profile.title}</h1>
                <p className="mx-auto mt-4 max-w-xl text-base font-semibold leading-7 text-pink-50/90">{profile.summary}</p>
                <div className="mx-auto mt-7 grid size-32 place-items-center rounded-full p-2" style={{ background: `conic-gradient(${profile.palette[1]} ${fitScore}%,rgba(255,255,255,.16) 0)` }}>
                  <div className="grid size-full place-items-center rounded-full bg-[#1f1020]">
                    <span><strong className="block text-3xl font-black">{fitScore}%</strong><span className="text-xs text-pink-100/70">과일 매칭도</span></span>
                  </div>
                </div>
                {(secondary || third) && (
                  <p className="mx-auto mt-5 max-w-lg rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold text-pink-50/80">
                    함께 나타난 성향: {secondary && <strong className="text-white">{secondary.name}</strong>}{secondary && third ? " · " : ""}{third && <strong className="text-white">{third.name}</strong>}
                  </p>
                )}
              </div>
            </section>
          </SectionReveal>

          <SectionReveal className="mt-7 rounded-[2rem] border border-pink-100 bg-white p-6 shadow-card sm:p-9">
            <p className="text-xs font-black tracking-[.18em] text-pink-600">LOVE STYLE ANALYSIS</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">연인의 과일 성격 분석</h2>
            <p className="mt-5 leading-8 text-slate-700">{profile.description}</p>
          </SectionReveal>

          <SectionReveal className="mt-7 rounded-[2rem] border border-pink-100 bg-pink-50/70 p-6 sm:p-9">
            <h2 className="text-2xl font-black text-slate-950">연애할 때의 모습</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {profile.loveStyle.map((item) => (
                <div key={item} className="rounded-2xl border border-white bg-white/75 p-4 text-sm font-semibold leading-6 text-slate-700 shadow-sm">
                  <span className="mr-2" aria-hidden="true">💞</span>{item}
                </div>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-9">
            <h2 className="text-2xl font-black text-slate-950">핵심 성향 그래프</h2>
            <div className="mt-7 space-y-5">
              {graphTraits.map(({ key, label, color }) => (
                <div key={key}>
                  <div className="flex items-end justify-between gap-4">
                    <strong className="text-sm text-slate-700">{label}</strong>
                    <strong className="text-pink-700">{scores[key]}%</strong>
                  </div>
                  <div className="mt-2.5 h-3 overflow-hidden rounded-full bg-slate-100">
                    <div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${scores[key]}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </SectionReveal>

          <section className="mt-7 grid gap-5 md:grid-cols-2">
            <SectionReveal className="rounded-[2rem] border border-emerald-100 bg-emerald-50/70 p-6 sm:p-8">
              <h2 className="text-xl font-black text-emerald-950">연인의 장점 5가지</h2>
              <ul className="mt-5 space-y-3">
                {profile.strengths.map((item) => <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-emerald-900"><span aria-hidden="true">✓</span>{item}</li>)}
              </ul>
            </SectionReveal>
            <SectionReveal className="rounded-[2rem] border border-amber-100 bg-amber-50/70 p-6 sm:p-8">
              <h2 className="text-xl font-black text-amber-950">갈등이 생겼을 때</h2>
              <p className="mt-5 text-sm font-semibold leading-7 text-amber-900">{profile.conflictStyle}</p>
            </SectionReveal>
          </section>

          <SectionReveal className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-9">
            <h2 className="text-2xl font-black text-slate-950">오래가는 연애를 위한 팁</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {profile.tips.map((tip, index) => (
                <div key={tip} className="rounded-2xl bg-slate-50 p-4">
                  <span className="text-xs font-black text-pink-500">TIP {index + 1}</span>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{tip}</p>
                </div>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-9">
            <h2 className="text-2xl font-black text-slate-950">과일 궁합</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">비슷해서 편안하거나 서로의 빈칸을 부드럽게 채워주는 과일 조합이에요.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {matches.map((match, index) => (
                <div key={match.slug} className="rounded-2xl bg-pink-50 p-4 text-center">
                  <span className="text-4xl" aria-hidden="true">{match.emoji}</span>
                  <p className="mt-2 text-xs font-black text-pink-500">TOP {index + 1}</p>
                  <strong className="mt-1 block text-sm text-slate-900">{match.name}</strong>
                </div>
              ))}
            </div>
            {difficult && (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                <strong className="text-slate-900">{profile.difficultLabel}: {difficult.name}</strong><br />
                두 과일 모두 매력이 있지만 애정 표현의 속도나 안정감을 느끼는 기준이 다를 수 있어요. 서로의 방식을 “틀림”이 아니라 “리듬 차이”로 보면 훨씬 편해집니다.
              </div>
            )}
          </SectionReveal>

          <section id="share-card" className="mt-8 grid scroll-mt-24 gap-6 rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={profile.emoji} eyebrow="나의 연인은 어떤 과일일까?" title={profile.name} subtitle={profile.summary} badge={`과일 매칭도 ${fitScore}%`} accent="pink" />
            <div>
              <h2 className="text-xl font-black">친구의 연인은 어떤 과일일까요?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">결과를 공유하고 서로의 연애 스타일을 과일로 비교해 보세요.</p>
              <div className="mt-5"><ShareButtons title={profile.shareText} description={profile.summary} path={sharePath} /></div>
            </div>
          </section>

          <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-5 text-slate-400">이 테스트는 연인의 행동 경향을 과일 이미지로 풀어낸 비공식 심리 콘텐츠입니다. 결과는 관계를 단정하거나 평가하기 위한 것이 아니라 서로의 표현 방식과 리듬을 이해하기 위한 참고 정보입니다.</p>
          <div className="mt-8 flex flex-col gap-3 text-center sm:flex-row sm:justify-center">
            <Link href="/tests/lover-fruit-test?start=1" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700 hover:bg-slate-50">다시 테스트하기</Link>
            <Link href="/tests" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-pink-600 px-5 text-sm font-bold text-white hover:bg-pink-700">다른 테스트 보기</Link>
          </div>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
