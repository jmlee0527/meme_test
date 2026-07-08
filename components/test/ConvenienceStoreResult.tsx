import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { cvsResultProfiles } from "@/data/convenience-store";
import type { CvsResultProfile, CvsTrait } from "@/lib/types";

type Props = {
  profile: CvsResultProfile;
  topTraits: { key: CvsTrait; label: string; score: number }[] | null;
  encodedAnswers: string | null;
};

export function ConvenienceStoreResult({ profile, topTraits, encodedAnswers }: Props) {
  const sharePath = `/convenience-store-test/result/${profile.slug}${encodedAnswers ? `?a=${encodedAnswers}` : ""}`;
  const otherProfiles = cvsResultProfiles.filter((item) => item.slug !== profile.slug).slice(0, 8);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#e0e7ff_0,#eef2ff_34%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "편의점 성격 테스트", href: "/tests/convenience-store-test" }, { name: `${profile.name} 결과` }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="overflow-hidden rounded-3xl border border-indigo-100 bg-white text-center shadow-card">
              <div className="bg-gradient-to-b from-indigo-50 to-white px-6 pb-6 pt-10 sm:pt-14">
                <p className="text-sm font-extrabold text-indigo-500">🛒 장바구니 분석 완료! 당신의 숨겨진 성격은</p>
                <div className="mt-5 text-7xl" aria-hidden="true">{profile.icon}</div>
                <h1 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">{profile.name}</h1>
                <p className="mt-3 text-base font-medium text-slate-600">{profile.summary}</p>
                {topTraits && (
                  <div className="mx-auto mt-6 flex max-w-md flex-wrap justify-center gap-2">
                    {topTraits.map((trait) => <span key={trait.key} className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-black text-indigo-700">#{trait.label} {trait.score}%</span>)}
                  </div>
                )}
              </div>
              <div className="px-6 pb-8 sm:px-10">
                <p className="mx-auto max-w-2xl text-left leading-7 text-slate-700">{profile.analysis}</p>
              </div>
            </section>
          </SectionReveal>

          <AdRectangle />

          <section className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6"><h2 className="font-extrabold text-emerald-900">이런 점이 매력이에요</h2><ul className="mt-4 space-y-3 text-sm leading-6 text-emerald-950">{profile.strengths.map((item) => <li key={item}>✓ {item}</li>)}</ul></div>
            <div className="rounded-3xl border border-amber-100 bg-amber-50/60 p-6"><h2 className="font-extrabold text-amber-900">이것만 조심하면 완벽</h2><ul className="mt-4 space-y-3 text-sm leading-6 text-amber-950">{profile.cautions.map((item) => <li key={item}>• {item}</li>)}</ul></div>
          </section>

          <section className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
              <h2 className="font-extrabold text-ink">💞 이런 사람과 잘 맞아요</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700">{profile.goodMatch}</p>
            </div>
            <div className="rounded-3xl border border-indigo-100 bg-indigo-50/60 p-6">
              <h2 className="font-extrabold text-indigo-900">🏪 오늘의 추천 편의점 조합</h2>
              <ul className="mt-4 space-y-2.5">
                {profile.combo.map((item) => (
                  <li key={item.name} className="flex items-center gap-3 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-700"><span className="text-xl" aria-hidden="true">{item.emoji}</span>{item.name}</li>
                ))}
              </ul>
            </div>
          </section>

          <section id="share-card" className="mt-10 grid scroll-mt-24 gap-6 rounded-3xl bg-ink p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={profile.icon} eyebrow="편의점에서 장봤더니" title={profile.name} subtitle={profile.summary} badge="편의점 성격 테스트" accent="purple" />
            <div>
              <h2 className="text-xl font-extrabold">친구는 어떤 유형일까?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">🛒 결과를 공유하면 "나도 해볼래"가 자동으로 돌아옵니다. 30가지 유형이라 겹칠 확률도 낮아요.</p>
              <div className="mt-5"><ShareButtons title={profile.shareText} description={profile.summary} path={sharePath} /></div>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-black text-ink">다른 사람들은 어떤 유형이 나왔을까?</h2>
            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {otherProfiles.map((item) => (
                <Link key={item.slug} href={`/convenience-store-test/result/${item.slug}`} className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-card transition hover:-translate-y-0.5 hover:border-indigo-200">
                  <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                  <p className="mt-2 text-xs font-extrabold leading-4 text-ink">{item.name}</p>
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/tests/convenience-store-test?start=1" className="inline-flex rounded-xl bg-primary px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">다시 장보러 가기</Link>
            <Link href="/tests" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50">다른 테스트 하기</Link>
          </div>
          <p className="mt-8 text-center text-xs leading-5 text-slate-400">이 테스트는 선택 패턴을 바탕으로 한 재미용 성격 콘텐츠입니다. 오늘 저녁 메뉴 고민까지 해결됐다면 성공!</p>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
