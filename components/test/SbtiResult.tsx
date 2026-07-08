import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { StatBars } from "@/components/results/StatBars";
import { sbtiLabelProfiles, sbtiStatLabels } from "@/data/sbti";
import { sbtiStatKeys } from "@/lib/sbti-engine";
import type { SbtiLabelProfile, SbtiStats } from "@/lib/types";

type Props = {
  profile: SbtiLabelProfile;
  stats: SbtiStats | null;
  encodedStats: string | null;
};

export function SbtiResult({ profile, stats, encodedStats }: Props) {
  const sharePath = `/tests/sbti/result/${profile.slug}${encodedStats ? `?v=${encodedStats}` : ""}`;
  const displayStats = (stats ? sbtiStatKeys.map((key) => ({ label: sbtiStatLabels[key], value: stats[key] })) : sbtiStatKeys.map((key) => ({ label: sbtiStatLabels[key], value: profile.targetStats[key] })));

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ffe4e6_0,#fdf2f8_34%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "SBTI 밈 테스트", href: "/tests/sbti" }, { name: `${profile.name} 결과` }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="overflow-hidden rounded-3xl border border-rose-100 bg-white text-center shadow-card">
              <div className="bg-gradient-to-b from-rose-50 to-white px-6 pb-6 pt-10 sm:pt-14">
                <p className="text-sm font-extrabold text-rose-500">나의 밈 유형은</p>
                <div className="mt-5 text-7xl" aria-hidden="true">{profile.icon}</div>
                <h1 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">{profile.name}</h1>
                <p className="mt-3 text-base font-medium text-slate-600">{profile.summary}</p>
                <div className="mx-auto mt-6 flex max-w-md flex-wrap justify-center gap-2">
                  {profile.traits.map((trait) => <span key={trait} className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-black text-rose-700">#{trait}</span>)}
                </div>
              </div>
              <div className="px-6 pb-8 sm:px-10">
                <p className="mx-auto max-w-2xl text-left leading-7 text-slate-700">{profile.description}</p>
              </div>
            </section>
          </SectionReveal>

          <AdRectangle />

          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <p className="text-xs font-black text-rose-500">MY MEME STATS</p>
            <h2 className="mt-2 text-xl font-black text-ink">나의 밈 스탯 6종</h2>
            {stats === null && <p className="mt-2 text-xs text-slate-400">아래는 이 유형의 대표 스탯입니다. 테스트를 하면 나만의 스탯이 계산돼요.</p>}
            <div className="mt-6"><StatBars stats={displayStats} /></div>
          </section>

          <section id="share-card" className="mt-10 grid scroll-mt-24 gap-6 rounded-3xl bg-ink p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={profile.icon} eyebrow="나의 밈 유형은" title={profile.name} subtitle={profile.summary} badge="SBTI" accent="pink" />
            <div>
              <h2 className="text-xl font-extrabold">단톡방에 던질 시간입니다</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">결과를 공유하면 반드시 "이거 완전 너잖아ㅋㅋ"라는 답장이 옵니다.</p>
              <div className="mt-5"><ShareButtons title={profile.shareText} description={profile.summary} path={sharePath} /></div>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-black text-ink">다른 밈 유형 구경하기</h2>
            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
              {sbtiLabelProfiles.filter((item) => item.slug !== profile.slug).map((item) => (
                <Link key={item.slug} href={`/tests/sbti/result/${item.slug}`} className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-card transition hover:-translate-y-0.5 hover:border-rose-200">
                  <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                  <p className="mt-2 text-xs font-extrabold leading-4 text-ink">{item.name}</p>
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/tests/sbti?start=1" className="inline-flex rounded-xl bg-primary px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">테스트 다시 하기</Link>
            <Link href="/tests" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50">다른 테스트 하기</Link>
          </div>
          <p className="mt-8 text-center text-xs leading-5 text-slate-400">SBTI는 심리학적 근거를 표방하지 않는 100% 재미용 밈 테스트입니다. 스탯에는 약간의 랜덤 요소가 포함되어 있어요.</p>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
