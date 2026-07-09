import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { StatBars } from "@/components/results/StatBars";
import { burgerBrandProfiles } from "@/data/burger-brand";
import { burgerTraitLabels } from "@/lib/burger-brand-engine";
import type { BurgerBrandProfile, BurgerScores } from "@/lib/types";

type Props = {
  profile: BurgerBrandProfile;
  scores: BurgerScores | null;
  encodedAnswers: string | null;
};

export function BurgerBrandResult({ profile, scores, encodedAnswers }: Props) {
  const sharePath = `/burger-brand-test/result/${profile.slug}${encodedAnswers ? `?a=${encodedAnswers}` : ""}`;
  // ⑨ 성향 그래프: 브랜드의 6개 핵심 성향 기준, 실제 응답 점수(없으면 브랜드 기준값) 표시
  const graphStats = profile.keyTraits.map((key) => ({ label: burgerTraitLabels[key], value: (scores ?? profile.targets)[key] }));
  const matchProfiles = profile.goodMatches.map((name) => burgerBrandProfiles.find((item) => item.name === name)).filter(Boolean) as BurgerBrandProfile[];
  const oppositeProfile = burgerBrandProfiles.find((item) => item.name === profile.opposite);
  const otherProfiles = burgerBrandProfiles.filter((item) => item.slug !== profile.slug);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ffedd5_0,#fff7ed_34%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "햄버거 브랜드 테스트", href: "/tests/burger-brand-test" }, { name: `${profile.name} 결과` }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="overflow-hidden rounded-3xl border border-orange-100 bg-white text-center shadow-card">
              <div className="bg-gradient-to-b from-orange-100 via-amber-50 to-white px-6 pb-6 pt-10 sm:pt-14">
                <p className="text-sm font-extrabold text-orange-500">🍔 나와 어울리는 햄버거 브랜드는</p>
                <div className="mx-auto mt-6 grid size-28 place-items-center rounded-[2rem] bg-gradient-to-br from-orange-400 to-amber-500 text-6xl shadow-lg shadow-orange-200" aria-hidden="true">{profile.icon}</div>
                <h1 className="mt-5 text-4xl font-black tracking-tight text-ink sm:text-5xl">{profile.name}</h1>
                <p className="mt-2 text-sm font-black text-orange-500">{profile.tagline}</p>
                <p className="mx-auto mt-3 max-w-xl text-base font-medium text-slate-600">{profile.summary}</p>
              </div>
              <div className="px-6 pb-8 sm:px-10">
                <h2 className="text-left text-sm font-black text-orange-600">💡 왜 {profile.name}와(과) 잘 어울릴까?</h2>
                <p className="mx-auto mt-3 max-w-2xl text-left leading-7 text-slate-700">{profile.reason}</p>
              </div>
            </section>
          </SectionReveal>

          <AdRectangle />

          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <p className="text-xs font-black text-orange-500">PERSONALITY GRAPH</p>
            <h2 className="mt-2 text-xl font-black text-ink">나의 6가지 핵심 성향</h2>
            {!scores && <p className="mt-2 text-xs text-slate-400">아래는 이 브랜드의 기준 성향입니다. 테스트를 하면 나만의 점수가 계산돼요.</p>}
            <div className="mt-6"><StatBars stats={graphStats} /></div>
          </section>

          <section className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6"><h2 className="font-extrabold text-emerald-900">이런 점이 강점이에요</h2><ul className="mt-4 space-y-2.5 text-sm leading-6 text-emerald-950">{profile.strengths.map((item) => <li key={item}>✓ {item}</li>)}</ul></div>
            <div className="rounded-3xl border border-amber-100 bg-amber-50/60 p-6"><h2 className="font-extrabold text-amber-900">이것만 주의하세요</h2><ul className="mt-4 space-y-2.5 text-sm leading-6 text-amber-950">{profile.cautions.map((item) => <li key={item}>• {item}</li>)}</ul></div>
          </section>

          <section className="mt-6 rounded-3xl border border-orange-100 bg-orange-50/60 p-6 sm:p-8">
            <h2 className="font-extrabold text-orange-900">🍟 오늘 가면 이걸 드세요 — {profile.name} 추천 메뉴</h2>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
              {profile.menus.map((menu) => <div key={menu} className="rounded-2xl bg-white px-4 py-3.5 text-center text-sm font-extrabold text-slate-700 shadow-card">🍔 {menu}</div>)}
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h2 className="text-sm font-black text-orange-600">💞 잘 맞는 브랜드 TOP3</h2>
                <ol className="mt-3 space-y-2">
                  {matchProfiles.map((item, matchIndex) => (
                    <li key={item.slug}>
                      <Link href={`/burger-brand-test/result/${item.slug}`} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-orange-50">
                        <span className="font-black text-orange-400">{matchIndex + 1}</span><span aria-hidden="true">{item.icon}</span>{item.name}
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h2 className="text-sm font-black text-slate-500">🧊 반대 성향 브랜드</h2>
                {oppositeProfile && (
                  <Link href={`/burger-brand-test/result/${oppositeProfile.slug}`} className="mt-3 flex items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:border-orange-300">
                    <span aria-hidden="true">{oppositeProfile.icon}</span>{oppositeProfile.name}
                    <span className="ml-auto text-[11px] font-bold text-slate-400">서로 배울 점이 많아요</span>
                  </Link>
                )}
                <p className="mt-3 text-xs leading-5 text-slate-400">반대 성향은 나쁜 궁합이 아니라, 나에게 없는 것을 가진 브랜드예요.</p>
              </div>
            </div>
          </section>

          <section id="share-card" className="mt-10 grid scroll-mt-24 gap-6 rounded-3xl bg-ink p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={profile.icon} eyebrow="나와 어울리는 햄버거 브랜드" title={profile.name} subtitle={profile.tagline} badge="햄버거 브랜드 테스트" accent="orange" />
            <div>
              <h2 className="text-xl font-extrabold">친구는 어떤 브랜드일까?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">결과를 공유하고 오늘 점심 메뉴까지 한 번에 정해보세요. 11개 브랜드 중 뭐가 나올지 모릅니다.</p>
              <div className="mt-5"><ShareButtons title={profile.shareText} description={profile.summary} path={sharePath} /></div>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-black text-ink">다른 브랜드 결과 구경하기</h2>
            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
              {otherProfiles.map((item) => (
                <Link key={item.slug} href={`/burger-brand-test/result/${item.slug}`} className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-card transition hover:-translate-y-0.5 hover:border-orange-200">
                  <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                  <p className="mt-2 text-xs font-extrabold leading-4 text-ink">{item.name}</p>
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/tests/burger-brand-test?start=1" className="inline-flex rounded-xl bg-primary px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">테스트 다시 하기</Link>
            <Link href="/tests" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50">다른 테스트 하기</Link>
          </div>
          <p className="mt-8 text-center text-xs leading-5 text-slate-400">이 테스트는 각 브랜드의 대중적 이미지를 재미로 활용한 팬메이드 콘텐츠로, 해당 브랜드들과 공식적인 관련이 없습니다.</p>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
