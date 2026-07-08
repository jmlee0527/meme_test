import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { snsResultProfiles } from "@/data/sns-type";
import type { SnsResultProfile, SnsTrait } from "@/lib/types";

type Props = {
  profile: SnsResultProfile;
  topTraits: { key: SnsTrait; label: string; score: number }[] | null;
  encodedAnswers: string | null;
};

export function SnsTypeResult({ profile, topTraits, encodedAnswers }: Props) {
  const sharePath = `/sns-type-test/result/${profile.slug}${encodedAnswers ? `?a=${encodedAnswers}` : ""}`;
  const otherProfiles = snsResultProfiles.filter((item) => item.slug !== profile.slug).slice(0, 8);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fce7f3_0,#fdf2f8_34%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "SNS 유형 테스트", href: "/tests/sns-type-test" }, { name: `${profile.name} 결과` }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="overflow-hidden rounded-3xl border border-pink-100 bg-white text-center shadow-card">
              <div className="bg-gradient-to-b from-pink-50 to-white px-6 pb-6 pt-10 sm:pt-14">
                <p className="text-sm font-extrabold text-pink-500">📱 SNS 습관 분석 완료! 나의 SNS 유형은</p>
                <div className="mt-5 text-7xl" aria-hidden="true">{profile.icon}</div>
                <h1 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">{profile.name}</h1>
                <p className="mt-3 text-base font-medium text-slate-600">{profile.summary}</p>
                {topTraits && (
                  <div className="mx-auto mt-6 flex max-w-md flex-wrap justify-center gap-2">
                    {topTraits.map((trait) => <span key={trait.key} className="rounded-full bg-pink-50 px-3 py-1.5 text-xs font-black text-pink-700">#{trait.label} {trait.score}%</span>)}
                  </div>
                )}
              </div>
              <div className="px-6 pb-8 sm:px-10">
                <p className="mx-auto max-w-2xl text-left leading-7 text-slate-700">{profile.analysis}</p>
              </div>
            </section>
          </SectionReveal>

          <AdRectangle />

          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-extrabold text-ink">📲 SNS에서 자주 보이는 행동</h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-3">
              {profile.behaviors.map((item) => <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3.5 text-sm font-bold leading-6 text-slate-700">{item}</li>)}
            </ul>
          </section>

          <section className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6"><h2 className="font-extrabold text-emerald-900">이런 점이 강점이에요</h2><ul className="mt-4 space-y-3 text-sm leading-6 text-emerald-950">{profile.strengths.map((item) => <li key={item}>✓ {item}</li>)}</ul></div>
            <div className="rounded-3xl border border-amber-100 bg-amber-50/60 p-6"><h2 className="font-extrabold text-amber-900">이것만 주의하세요</h2><ul className="mt-4 space-y-3 text-sm leading-6 text-amber-950">{profile.cautions.map((item) => <li key={item}>• {item}</li>)}</ul></div>
          </section>

          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <h2 className="text-sm font-black text-pink-600">💞 잘 맞는 SNS 친구</h2>
                <p className="mt-3 text-sm leading-6 text-slate-700">{profile.goodMatch}</p>
              </div>
              <div>
                <h2 className="text-sm font-black text-pink-600">🎬 추천 콘텐츠 스타일</h2>
                <div className="mt-3 flex flex-wrap gap-2">{profile.contentStyles.map((style) => <span key={style} className="rounded-full bg-pink-50 px-3 py-1.5 text-xs font-bold text-pink-800">#{style}</span>)}</div>
              </div>
              <div>
                <h2 className="text-sm font-black text-pink-600">📱 어울리는 플랫폼</h2>
                <div className="mt-3 flex flex-wrap gap-2">{profile.platforms.map((platform) => <span key={platform} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700">{platform}</span>)}</div>
              </div>
            </div>
          </section>

          <section id="share-card" className="mt-10 grid scroll-mt-24 gap-6 rounded-3xl bg-ink p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={profile.icon} eyebrow="나의 SNS 유형은" title={profile.name} subtitle={profile.summary} badge="SNS 유형 테스트" accent="pink" />
            <div>
              <h2 className="text-xl font-extrabold">친구는 어떤 SNS 유형일까?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">스토리에 결과를 올리면 "나도 해볼래"가 자동으로 돌아옵니다. 24가지 유형이라 겹칠 확률도 낮아요.</p>
              <div className="mt-5"><ShareButtons title={profile.shareText} description={profile.summary} path={sharePath} /></div>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-black text-ink">다른 SNS 유형 구경하기</h2>
            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {otherProfiles.map((item) => (
                <Link key={item.slug} href={`/sns-type-test/result/${item.slug}`} className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-card transition hover:-translate-y-0.5 hover:border-pink-200">
                  <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                  <p className="mt-2 text-xs font-extrabold leading-4 text-ink">{item.name}</p>
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/tests/sns-type-test?start=1" className="inline-flex rounded-xl bg-primary px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">테스트 다시 하기</Link>
            <Link href="/tests" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50">다른 테스트 하기</Link>
          </div>
          <p className="mt-8 text-center text-xs leading-5 text-slate-400">이 테스트는 SNS 사용 패턴을 바탕으로 한 재미용 성격 콘텐츠입니다. 나의 온라인 모습을 가볍게 돌아보는 용도로 즐겨주세요.</p>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
