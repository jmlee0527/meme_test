import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { enneagramProfiles } from "@/data/enneagram";
import { enneagramResultPath } from "@/lib/enneagram-engine";
import type { EnneagramProfile } from "@/lib/types";

type TopType = EnneagramProfile & { score: number; percentage: number };

function label(slug: string) {
  const profile = enneagramProfiles.find((item) => item.slug === slug);
  return profile ? `${profile.icon} ${profile.number}번 ${profile.name}` : slug;
}

export function EnneagramResult({ profile, topThree }: { profile: EnneagramProfile; topThree: TopType[] }) {
  const sharePath = enneagramResultPath(profile.slug);
  const visibleTopThree = topThree.length ? topThree : [{ ...profile, score: 100, percentage: 100 }];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ede9fe_0,#f8fafc_42%,#eef2ff_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "심리 테스트", href: "/category/심리" }, { name: "애니어그램 테스트", href: "/tests/enneagram" }, { name: `${profile.number}번 ${profile.name}` }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="relative overflow-hidden rounded-[2rem] border border-violet-100 bg-white text-center shadow-2xl shadow-violet-100/80">
              <div className="absolute inset-0 opacity-[.13] [background-image:radial-gradient(circle_at_1px_1px,#7c3aed_1px,transparent_0)] [background-size:22px_22px]" />
              <div className="relative bg-gradient-to-br from-violet-600 via-indigo-600 to-sky-500 px-6 py-10 text-white sm:px-10 sm:py-14">
                <p className="text-xs font-black tracking-[.18em] opacity-90">ENNEAGRAM RESULT</p>
                <div className="mx-auto mt-5 grid size-28 place-items-center rounded-[2rem] bg-white/20 text-7xl shadow-inner backdrop-blur" aria-hidden="true">{profile.icon}</div>
                <h1 className="mt-5 text-3xl font-black tracking-[-0.05em] sm:text-5xl">당신은 {profile.number}번 유형, {profile.name}입니다</h1>
                <p className="mx-auto mt-4 max-w-xl text-base font-bold leading-7 opacity-95">{profile.summary}</p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">{profile.keywords.map((keyword) => <span key={keyword} className="rounded-full bg-white/20 px-3 py-1.5 text-xs font-black backdrop-blur">{keyword}</span>)}</div>
              </div>
            </section>
          </SectionReveal>

          <SectionReveal className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-2xl font-black text-slate-950">가장 가까운 유형 TOP 3</h2>
            <div className="mt-6 space-y-4">
              {visibleTopThree.map((item) => (
                <div key={item.slug}>
                  <div className="flex items-center justify-between gap-4 text-sm font-black text-slate-700"><span>{item.icon} {item.number}번 {item.name}</span><span>{item.percentage}%</span></div>
                  <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-sky-400" style={{ width: `${item.percentage}%` }} /></div>
                </div>
              ))}
            </div>
          </SectionReveal>

          <section className="mt-7 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
            <SectionReveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <p className="text-xs font-black tracking-[.16em] text-violet-600">CORE DESCRIPTION</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">상세 설명</h2>
              <p className="mt-4 leading-8 text-slate-700">{profile.description}</p>
            </SectionReveal>
            <SectionReveal className="rounded-[2rem] border border-violet-100 bg-violet-50/70 p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-black text-slate-950">핵심 동기</h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-700"><strong>욕구:</strong> {profile.desire}</p>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-700"><strong>두려움:</strong> {profile.fear}</p>
            </SectionReveal>
          </section>

          <section className="mt-7 grid gap-5 sm:grid-cols-2">
            <SectionReveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-black text-slate-950">강점</h2>
              <ul className="mt-4 space-y-3 text-sm font-semibold leading-7 text-slate-600">{profile.strengths.map((item) => <li key={item}>✓ {item}</li>)}</ul>
            </SectionReveal>
            <SectionReveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-black text-slate-950">주의할 점</h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">{profile.caution}</p>
            </SectionReveal>
          </section>

          <section className="mt-7 grid gap-5 lg:grid-cols-3">
            <SectionReveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8"><h2 className="text-xl font-black text-slate-950">인간관계 스타일</h2><p className="mt-4 text-sm font-semibold leading-7 text-slate-600">{profile.relationshipStyle}</p></SectionReveal>
            <SectionReveal className="rounded-[2rem] border border-emerald-100 bg-emerald-50/70 p-6 shadow-card sm:p-8"><h2 className="text-xl font-black text-slate-950">잘 맞는 유형</h2><div className="mt-4 flex flex-wrap gap-2">{profile.goodMatches.map((slug) => <span key={slug} className="rounded-full bg-white px-3 py-2 text-xs font-black text-emerald-700">{label(slug)}</span>)}</div></SectionReveal>
            <SectionReveal className="rounded-[2rem] border border-amber-100 bg-amber-50/70 p-6 shadow-card sm:p-8"><h2 className="text-xl font-black text-slate-950">성장 팁</h2><p className="mt-4 text-sm font-semibold leading-7 text-slate-600">{profile.growthTip}</p></SectionReveal>
          </section>

          <p className="mt-7 rounded-2xl bg-white/70 px-5 py-4 text-center text-xs font-semibold leading-6 text-slate-500">이 결과는 정확한 진단이 아니라 재미로 보는 심리테스트이며, 자기이해를 돕는 참고용 콘텐츠입니다. 모든 유형은 고유한 강점과 성장 방향을 가지고 있습니다.</p>

          <section className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-black text-slate-950">다른 테스트 추천</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Link href="/tests/color-personality-test" className="rounded-2xl bg-slate-50 p-4 text-sm font-black text-slate-700 hover:bg-slate-100">컬러 성격 테스트</Link>
              <Link href="/tests/attachment-style-test" className="rounded-2xl bg-slate-50 p-4 text-sm font-black text-slate-700 hover:bg-slate-100">애착유형 테스트</Link>
              <Link href="/tests/love-mbti-test" className="rounded-2xl bg-slate-50 p-4 text-sm font-black text-slate-700 hover:bg-slate-100">연애 MBTI 테스트</Link>
            </div>
          </section>

          <section id="share-card" className="scroll-mt-24 mt-8 grid gap-6 rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={profile.icon} eyebrow="애니어그램 테스트 결과" title={`${profile.number}번 ${profile.name}`} subtitle={profile.summary} badge={profile.keywords.join(" · ")} accent="purple" />
            <div>
              <h2 className="text-xl font-black">친구의 애니어그램 유형은?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">결과를 공유하고 서로의 핵심 욕구와 관계 스타일을 비교해보세요.</p>
              <div className="mt-5"><ShareButtons title={profile.shareText} description={profile.summary} path={sharePath} /></div>
            </div>
          </section>

          <div className="mt-8 flex flex-col gap-3 text-center sm:flex-row sm:justify-center">
            <Link href="/tests/enneagram?start=1" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700 hover:bg-slate-50">다시 테스트하기</Link>
            <Link href="/tests" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-bold text-white hover:bg-slate-800">다른 테스트 보기</Link>
          </div>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
