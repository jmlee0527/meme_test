import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { mbtiTypeProfiles } from "@/data/mbti";
import { mbtiAxes } from "@/lib/mbti-engine";
import type { MbtiTypeProfile } from "@/lib/types";

type Props = {
  profile: MbtiTypeProfile;
  /** 축 순서대로 결과 글자 비율(50~100). 직접 방문 시 null */
  percents: number[] | null;
};

export function MbtiResult({ profile, percents }: Props) {
  const sharePath = `/tests/mbti/result/${profile.slug}${percents ? `?p=${percents.join("-")}` : ""}`;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ede9fe_0,#f5f3ff_34%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "성격 유형 테스트", href: "/tests/mbti" }, { name: `${profile.code} ${profile.name}` }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="overflow-hidden rounded-3xl border border-violet-100 bg-white text-center shadow-card">
              <div className="bg-gradient-to-b from-violet-50 to-white px-6 pb-6 pt-10 sm:pt-14">
                <p className="text-sm font-extrabold text-violet-600">나의 성격 유형은</p>
                <div className="mt-5 text-7xl" aria-hidden="true">{profile.icon}</div>
                <p className="mt-4 text-lg font-black tracking-[.3em] text-violet-500">{profile.code}</p>
                <h1 className="mt-1 text-4xl font-black tracking-tight text-ink sm:text-5xl">{profile.name}</h1>
                <p className="mt-3 text-base font-medium text-slate-600">{profile.tagline}</p>
              </div>
              <div className="px-6 pb-8 sm:px-10">
                <div className="mx-auto grid max-w-xl gap-4">
                  {mbtiAxes.map(({ poles, labels }, axisIndex) => {
                    const letter = profile.code[axisIndex];
                    const isFirst = letter === poles[0];
                    const percent = percents?.[axisIndex] ?? null;
                    const firstPercent = percent === null ? null : isFirst ? percent : 100 - percent;
                    return (
                      <div key={poles.join("")}>
                        <div className="flex justify-between text-xs font-black">
                          <span className={isFirst ? "text-violet-700" : "text-slate-400"}>{labels[0]} ({poles[0]}){percent !== null && isFirst ? ` ${percent}%` : ""}</span>
                          <span className={!isFirst ? "text-violet-700" : "text-slate-400"}>{percent !== null && !isFirst ? `${percent}% ` : ""}{labels[1]} ({poles[1]})</span>
                        </div>
                        <div className="mt-1.5 flex h-2.5 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
                          <div className={`h-full rounded-full ${isFirst ? "bg-violet-500" : "bg-violet-200"}`} style={{ width: `${firstPercent ?? (isFirst ? 72 : 28)}%` }} />
                          <div className={`h-full flex-1 ${!isFirst ? "bg-violet-500 rounded-full" : ""}`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mx-auto mt-7 max-w-2xl space-y-4 text-left leading-7 text-slate-700">
                  {profile.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </div>
            </section>
          </SectionReveal>

          <AdRectangle />

          <section className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6"><h2 className="font-extrabold text-emerald-900">이런 점이 강점이에요</h2><ul className="mt-4 space-y-3 text-sm leading-6 text-emerald-950">{profile.strengths.map((item) => <li key={item}>✓ {item}</li>)}</ul></div>
            <div className="rounded-3xl border border-amber-100 bg-amber-50/60 p-6"><h2 className="font-extrabold text-amber-900">이런 점은 주의하세요</h2><ul className="mt-4 space-y-3 text-sm leading-6 text-amber-950">{profile.cautions.map((item) => <li key={item}>• {item}</li>)}</ul></div>
          </section>

          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-extrabold text-ink">어울리는 일과 관계 팁</h2>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-black text-violet-700">잘 맞는 직업 방향</h3>
                <div className="mt-3 flex flex-wrap gap-2">{profile.careers.map((career) => <span key={career} className="rounded-full bg-violet-50 px-3 py-2 text-xs font-bold text-violet-800">{career}</span>)}</div>
              </div>
              <div>
                <h3 className="text-sm font-black text-violet-700">관계가 편해지는 팁</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">💡 {profile.relationshipTip}</p>
              </div>
            </div>
          </section>

          <section id="share-card" className="mt-10 grid scroll-mt-24 gap-6 rounded-3xl bg-ink p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={profile.icon} eyebrow="나의 성격 유형은" title={`${profile.code} · ${profile.name}`} subtitle={profile.tagline} badge={profile.code} accent="purple" />
            <div>
              <h2 className="text-xl font-extrabold">친구는 어떤 유형일까?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">결과를 공유하고 서로의 유형 궁합을 비교해보세요.</p>
              <div className="mt-5"><ShareButtons title={profile.shareText} description={profile.tagline} path={sharePath} /></div>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-black text-ink">다른 15가지 유형 살펴보기</h2>
            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {mbtiTypeProfiles.filter((item) => item.slug !== profile.slug).map((item) => (
                <Link key={item.slug} href={`/tests/mbti/result/${item.slug}`} className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-card transition hover:-translate-y-0.5 hover:border-violet-200">
                  <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                  <p className="mt-2 text-[11px] font-black tracking-[.2em] text-violet-500">{item.code}</p>
                  <p className="mt-0.5 text-xs font-extrabold text-ink">{item.name}</p>
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/tests/mbti?start=1" className="inline-flex rounded-xl bg-primary px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">테스트 다시 하기</Link>
            <Link href="/tests" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50">다른 테스트 하기</Link>
          </div>
          <p className="mt-8 text-center text-xs leading-5 text-slate-400">이 테스트는 공식 MBTI® 검사가 아닌 자체 제작 콘텐츠이며, 결과는 자기이해와 재미를 위한 참고 정보입니다.</p>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
