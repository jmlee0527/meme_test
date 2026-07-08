import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { sbtiModels, sbtiTypeProfiles } from "@/data/sbti";
import type { SbtiLevels, SbtiTypeProfile } from "@/lib/types";

const levelStyles = {
  L: "bg-slate-100 text-slate-500",
  M: "bg-amber-100 text-amber-700",
  H: "bg-rose-100 text-rose-700",
} as const;
const levelLabels = { L: "낮음", M: "보통", H: "높음" } as const;

type Props = {
  profile: SbtiTypeProfile;
  levels: SbtiLevels | null;
  match: number | null;
  encodedQuery: string | null;
};

export function SbtiResult({ profile, levels, match, encodedQuery }: Props) {
  const sharePath = `/tests/sbti/result/${profile.slug}${encodedQuery ? `?${encodedQuery}` : ""}`;
  const displayLevels = levels ?? profile.targets;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ffe4e6_0,#fdf2f8_34%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "SBTI 테스트", href: "/tests/sbti" }, { name: `${profile.code} ${profile.name}` }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="overflow-hidden rounded-3xl border border-rose-100 bg-white text-center shadow-card">
              <div className="bg-gradient-to-b from-rose-50 to-white px-6 pb-6 pt-10 sm:pt-14">
                <p className="text-sm font-extrabold text-rose-500">나의 SBTI 유형은</p>
                {profile.special === "hidden" && <p className="mx-auto mt-3 w-fit rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-700">🔒 히든 유형 발견!</p>}
                {profile.special === "fallback" && <p className="mx-auto mt-3 w-fit rounded-full bg-violet-100 px-3 py-1 text-xs font-black text-violet-700">💎 분류 불가 초희귀 유형!</p>}
                <div className="mt-5 text-7xl" aria-hidden="true">{profile.icon}</div>
                <p className="mt-4 text-2xl font-black tracking-[.18em] text-rose-500">{profile.code}</p>
                <h1 className="mt-1 text-4xl font-black tracking-tight text-ink sm:text-5xl">{profile.name}</h1>
                <p className="mt-3 text-base font-medium text-slate-600">{profile.summary}</p>
                {match !== null && (
                  <div className="mx-auto mt-6 grid size-28 place-items-center rounded-full p-2 shadow-lg" style={{ background: `conic-gradient(#F43F5E ${match}%, #FFE4E6 0)` }}>
                    <div className="grid size-full place-items-center rounded-full bg-white">
                      <span><strong className="block text-3xl font-black text-rose-500">{match}%</strong><span className="text-[11px] font-bold text-slate-400">매칭도</span></span>
                    </div>
                  </div>
                )}
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
            <p className="text-xs font-black text-rose-500">5 MODELS · 15 DIMENSIONS</p>
            <h2 className="mt-2 text-xl font-black text-ink">나의 15개 차원 분석</h2>
            <p className="mt-2 text-xs text-slate-400">{levels ? "30개 문항의 응답으로 계산된 나의 L(낮음)/M(보통)/H(높음) 조합입니다." : "아래는 이 유형의 기준 조합입니다. 테스트를 하면 나만의 조합이 계산돼요."}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sbtiModels.map((model) => (
                <div key={model.name} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                  <h3 className="text-xs font-black tracking-wide text-slate-400">{model.name}</h3>
                  <ul className="mt-3 space-y-2">
                    {model.dimensions.map(({ key, label }) => (
                      <li key={key} className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-slate-700">{label}</span>
                        <span className={`rounded-lg px-2.5 py-1 text-xs font-black ${levelStyles[displayLevels[key]]}`}>{displayLevels[key]} · {levelLabels[displayLevels[key]]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section id="share-card" className="mt-10 grid scroll-mt-24 gap-6 rounded-3xl bg-ink p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={profile.icon} eyebrow="나의 SBTI는" title={`${profile.code} · ${profile.name}`} subtitle={profile.summary} badge={match !== null ? `매칭도 ${match}%` : profile.code} accent="pink" />
            <div>
              <h2 className="text-xl font-extrabold">단톡방에 던질 시간입니다</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">결과를 공유하면 반드시 "이거 완전 너잖아ㅋㅋ"라는 답장이 옵니다.</p>
              <div className="mt-5"><ShareButtons title={profile.shareText} description={profile.summary} path={sharePath} /></div>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-black text-ink">SBTI 27가지 유형 도감</h2>
            <div className="mt-5 grid grid-cols-3 gap-2.5 sm:grid-cols-5 lg:grid-cols-7">
              {sbtiTypeProfiles.filter((item) => item.slug !== profile.slug).map((item) => (
                <Link key={item.slug} href={`/tests/sbti/result/${item.slug}`} className="rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-card transition hover:-translate-y-0.5 hover:border-rose-200">
                  <span className="text-xl" aria-hidden="true">{item.icon}</span>
                  <p className="mt-1.5 text-[10px] font-black tracking-wide text-rose-400">{item.code}</p>
                  <p className="mt-0.5 text-[11px] font-extrabold leading-4 text-ink">{item.name}</p>
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/tests/sbti?start=1" className="inline-flex rounded-xl bg-primary px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">테스트 다시 하기</Link>
            <Link href="/tests" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50">다른 테스트 하기</Link>
          </div>
          <p className="mt-8 text-center text-xs leading-5 text-slate-400">SBTI는 MBTI를 패러디한 유머 콘텐츠로, 심리학적 진단이 아닌 재미로 즐기는 밈 테스트입니다.</p>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
