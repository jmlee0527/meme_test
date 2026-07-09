import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { selfEsteemDomains } from "@/data/self-esteem";
import type { SelfEsteemDomainScores, SelfEsteemLevelProfile } from "@/lib/types";

function GrowthArtwork({ profile }: { profile: SelfEsteemLevelProfile }) {
  const sizes = ["h-8", "h-12", "h-16", "h-20", "h-24", "h-28"];
  return (
    <div
      className="relative mx-auto grid size-44 overflow-hidden rounded-[2.5rem] border border-white/30 shadow-2xl sm:size-52"
      style={{ background: `linear-gradient(145deg, ${profile.palette[0]}, ${profile.palette[1]})` }}
      role="img"
      aria-label={`${profile.name}을 표현한 성장 나무 오리지널 일러스트`}
    >
      <span className="absolute left-5 top-5 text-xl text-white/60">✦</span>
      <span className="absolute right-7 top-9 size-12 rounded-full bg-white/15" />
      <span className="absolute inset-x-0 bottom-0 h-12 rounded-t-[50%] bg-black/10" />
      <div className="relative place-self-center text-center">
        <span className="block text-7xl drop-shadow-lg" aria-hidden="true">{profile.icon}</span>
        <span className={`mx-auto mt-1 block w-2 rounded-full bg-white/70 ${sizes[profile.level - 1]}`} aria-hidden="true" />
      </div>
    </div>
  );
}

export function SelfEsteemResult({
  profile,
  score,
  domainScores,
}: {
  profile: SelfEsteemLevelProfile;
  score: number;
  domainScores: SelfEsteemDomainScores;
}) {
  const sharePath = `/self-esteem-test/result/${profile.slug}`;
  const strongest = [...selfEsteemDomains]
    .map((domain) => ({ ...domain, healthyScore: domain.positive ? domainScores[domain.key] : 100 - domainScores[domain.key] }))
    .sort((a, b) => b.healthyScore - a.healthyScore)[0];
  const support = [...selfEsteemDomains]
    .map((domain) => ({ ...domain, healthyScore: domain.positive ? domainScores[domain.key] : 100 - domainScores[domain.key] }))
    .sort((a, b) => a.healthyScore - b.healthyScore)[0];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#dcfce7_0,#f8fafc_40%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "자존감 테스트 결과" }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="relative overflow-hidden rounded-[2.25rem] bg-slate-950 px-6 py-10 text-center text-white shadow-2xl sm:px-10 sm:py-14">
              <div className="absolute inset-0 opacity-[.1] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:24px_24px]" />
              <div className="relative">
                <p className="text-xs font-black tracking-[.22em] text-emerald-300">현재 나의 자존감 지수</p>
                <div className="mt-6"><GrowthArtwork profile={profile} /></div>
                <p className="mt-7 text-sm font-black text-emerald-300">LEVEL {profile.level}</p>
                <h1 className="mt-1 text-3xl font-black tracking-[-0.05em] sm:text-5xl">{profile.name}</h1>
                <p className="mx-auto mt-4 max-w-xl text-base font-semibold leading-7 text-slate-200">{profile.summary}</p>
                <div className="mx-auto mt-7 grid size-36 place-items-center rounded-full p-2.5" style={{ background: `conic-gradient(${profile.palette[1]} ${score}%,#334155 0)` }}>
                  <div className="grid size-full place-items-center rounded-full bg-slate-950"><span><strong className="block text-4xl font-black">{score}점</strong><span className="text-xs text-slate-400">100점 만점</span></span></div>
                </div>
              </div>
            </section>
          </SectionReveal>

          <SectionReveal className="mt-7 rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-card sm:p-9">
            <p className="text-xs font-black tracking-[.18em] text-emerald-600">CURRENT PATTERN</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">현재 자존감 특징</h2>
            <p className="mt-5 leading-8 text-slate-700">{profile.description}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-emerald-50 p-4"><p className="text-xs font-bold text-emerald-600">현재 가장 든든한 영역</p><strong className="mt-1 block text-emerald-950">{strongest.label}</strong></div>
              <div className="rounded-2xl bg-violet-50 p-4"><p className="text-xs font-bold text-violet-600">조금 더 돌보면 좋은 영역</p><strong className="mt-1 block text-violet-950">{support.label}</strong></div>
            </div>
          </SectionReveal>

          <SectionReveal className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-9">
            <h2 className="text-2xl font-black text-slate-950">8가지 심리요인</h2>
            <p className="mt-2 text-xs leading-5 text-slate-500">사회적 비교와 타인 평가 민감도는 점수가 높을수록 최근 영향을 더 많이 받고 있음을 뜻합니다.</p>
            <div className="mt-7 space-y-5">
              {selfEsteemDomains.map(({ key, label, positive, color }) => {
                const value = domainScores[key];
                return <div key={key}><div className="flex items-end justify-between gap-4"><strong className="text-sm text-slate-700">{label}</strong><strong className={positive ? "text-emerald-700" : "text-amber-700"}>{value}%</strong></div><div className="mt-2.5 h-3 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${value}%` }} /></div></div>;
              })}
            </div>
          </SectionReveal>

          <section className="mt-7 grid gap-5 md:grid-cols-2">
            <SectionReveal className="rounded-[2rem] border border-emerald-100 bg-emerald-50/60 p-6 sm:p-8">
              <h2 className="text-xl font-black text-emerald-950">잘하고 있는 부분</h2>
              <ul className="mt-5 space-y-3">{profile.strengths.map((item) => <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-emerald-900"><span aria-hidden="true">✓</span>{item}</li>)}</ul>
            </SectionReveal>
            <SectionReveal className="rounded-[2rem] border border-amber-100 bg-amber-50/60 p-6 sm:p-8">
              <h2 className="text-xl font-black text-amber-950">조심해서 살펴볼 부분</h2>
              <ul className="mt-5 space-y-3">{profile.cautions.map((item) => <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-amber-900"><span aria-hidden="true">•</span>{item}</li>)}</ul>
            </SectionReveal>
          </section>

          <SectionReveal className="mt-7 rounded-[2rem] border border-violet-100 bg-violet-50/60 p-6 sm:p-9">
            <h2 className="text-2xl font-black text-violet-950">자존감을 건강하게 만드는 5가지 팁</h2>
            <ol className="mt-6 space-y-3">{profile.tips.map((tip, index) => <li key={tip} className="flex gap-4 rounded-2xl bg-white p-4 text-sm font-semibold leading-6 text-slate-700"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-violet-600 text-xs font-black text-white">{index + 1}</span>{tip}</li>)}</ol>
          </SectionReveal>

          <section id="share-card" className="mt-8 grid scroll-mt-24 gap-6 rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={profile.icon} eyebrow="나의 자존감 레벨은" title={`${score}점 · LEVEL ${profile.level}`} subtitle={profile.name} badge="현재의 나를 이해하는 시간" accent="green" />
            <div>
              <h2 className="text-xl font-black">친구와 가볍게 비교해 보세요</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">점수의 높고 낮음보다 서로에게 힘이 되는 회복 방법을 이야기해 보세요.</p>
              <div className="mt-5"><ShareButtons title={`나의 자존감 레벨은 ${score}점! 당신의 자존감은 몇 점일까요?`} description={profile.summary} path={sharePath} /></div>
            </div>
          </section>

          <p className="mx-auto mt-7 max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 text-center text-xs leading-6 text-slate-500">이 테스트는 의학적 진단이나 표준화된 심리검사를 대체하지 않는 자가 점검용 콘텐츠입니다. 일상생활에 큰 어려움이 있거나 우울감, 불안, 수면 문제 또는 자신을 해치고 싶은 생각이 지속된다면 혼자 견디기보다 정신건강 전문가나 지역의 도움 기관에 상담해 보세요.</p>
          <div className="mt-8 flex flex-col gap-3 text-center sm:flex-row sm:justify-center">
            <Link href="/tests/self-esteem-test?start=1" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700 hover:bg-slate-50">다시 테스트하기</Link>
            <Link href="/tests" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-700 px-5 text-sm font-bold text-white hover:bg-emerald-800">다른 테스트 보기</Link>
          </div>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
