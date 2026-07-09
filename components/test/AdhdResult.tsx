import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { adhdConsultChecklist, adhdLevelProfiles } from "@/data/adhd-test";
import type { AdhdLevelProfile } from "@/lib/types";

type Props = {
  profile: AdhdLevelProfile;
  score: number | null;
  inattention: number | null;
  hyperactivity: number | null;
  encodedAnswers: string | null;
};

function DomainBar({ label, value, colorClass }: { label: string; value: number; colorClass: string }) {
  return (
    <div>
      <div className="flex items-end justify-between">
        <span className="text-sm font-black text-slate-700">{label}</span>
        <span className="text-sm font-black tabular-nums text-slate-500">{value}점</span>
      </div>
      <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-slate-100" role="img" aria-label={`${label} ${value}점`}>
        <div className={`h-full rounded-full bg-gradient-to-r ${colorClass}`} style={{ width: `${Math.max(value, 3)}%` }} />
      </div>
    </div>
  );
}

export function AdhdResult({ profile, score, inattention, hyperactivity, encodedAnswers }: Props) {
  const hasResult = score !== null;
  const displayScore = score ?? Math.round((profile.minScore + profile.maxScore) / 2);
  const sharePath = `/adhd-test/result/${profile.slug}${encodedAnswers ? `?a=${encodedAnswers}` : ""}`;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#e0e7ff_0,#eef2ff_34%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "ADHD 자가진단", href: "/tests/adhd-test" }, { name: `${profile.name} 결과` }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="overflow-hidden rounded-3xl border border-indigo-100 bg-white text-center shadow-card">
              <div className="bg-gradient-to-b from-indigo-50 to-white px-6 pb-6 pt-10 sm:pt-14">
                <p className="text-sm font-extrabold text-indigo-500">{hasResult ? "나의 ADHD 자가 체크 결과" : "ADHD 자가 체크 단계"}</p>
                <div className="mt-5 text-6xl" aria-hidden="true">{profile.icon}</div>
                <p className="mt-3 text-xs font-black tracking-widest text-slate-400">LEVEL {profile.level}</p>
                <h1 className="mt-1 text-3xl font-black tracking-tight text-ink sm:text-4xl">{profile.name}</h1>
                <p className="mx-auto mt-3 max-w-xl text-base font-medium text-slate-600">{profile.summary}</p>
                <div className="mx-auto mt-7 grid size-36 place-items-center rounded-full p-2 shadow-lg" style={{ background: `conic-gradient(#6366F1 ${displayScore}%, #E0E7FF 0)` }}>
                  <div className="grid size-full place-items-center rounded-full bg-white">
                    <span>
                      {hasResult ? (
                        <strong className="block text-4xl font-black tabular-nums text-indigo-600">{score}<span className="text-lg text-indigo-300"> / 100</span></strong>
                      ) : (
                        <strong className="block text-2xl font-black text-indigo-600">{profile.minScore}~{profile.maxScore}점</strong>
                      )}
                      <span className="text-[11px] font-bold text-slate-400">ADHD 특성 점수</span>
                    </span>
                  </div>
                </div>
                {hasResult && inattention !== null && hyperactivity !== null && (
                  <div className="mx-auto mt-8 grid max-w-md gap-4 text-left">
                    <DomainBar label="주의력 부족" value={inattention} colorClass="from-indigo-500 to-blue-400" />
                    <DomainBar label="과잉행동·충동성" value={hyperactivity} colorClass="from-violet-500 to-fuchsia-400" />
                  </div>
                )}
              </div>
              <div className="px-6 pb-8 sm:px-10">
                <p className="mx-auto max-w-2xl text-left leading-7 text-slate-700">{profile.description}</p>
                <p className="mx-auto mt-5 max-w-2xl rounded-2xl bg-slate-50 px-5 py-4 text-left text-xs leading-6 text-slate-500">
                  ⚕️ 이 결과는 <strong>의료적 진단이 아닌 참고용 선별(자가 체크) 결과</strong>입니다. ADHD의 정확한 진단은 정신건강의학과 전문의의 종합적인 평가를 통해서만 이루어질 수 있습니다.
                </p>
              </div>
            </section>
          </SectionReveal>

          <AdRectangle />

          <section className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6">
              <h2 className="font-extrabold text-emerald-900">🌟 이런 특성은 강점이 되기도 해요</h2>
              <ul className="mt-4 space-y-2.5 text-sm leading-6 text-emerald-950">{profile.strengths.map((item) => <li key={item}>✓ {item}</li>)}</ul>
            </div>
            <div className="rounded-3xl border border-indigo-100 bg-indigo-50/60 p-6">
              <h2 className="font-extrabold text-indigo-900">🛠️ 생활 속 관리 팁</h2>
              <ul className="mt-4 space-y-2.5 text-sm leading-6 text-indigo-950">{profile.tips.map((item) => <li key={item}>• {item}</li>)}</ul>
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-amber-200 bg-amber-50/60 p-6 sm:p-8">
            <h2 className="font-extrabold text-amber-900">🩺 이런 신호가 있다면 전문가 상담을 고려해보세요</h2>
            <p className="mt-2 text-xs text-amber-800">아래 항목 중 여러 개에 해당하고 그 상태가 지속된다면, 정신건강의학과 전문의의 평가가 도움이 될 수 있습니다.</p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {adhdConsultChecklist.map((item) => (
                <li key={item} className="flex items-start gap-2.5 rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-6 text-slate-700"><span className="mt-0.5 text-amber-500" aria-hidden="true">☐</span>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-extrabold text-ink">단계 기준표</h2>
            <p className="mt-2 text-sm text-slate-500">전체 점수(0~100)에 따라 5단계로 안내됩니다.</p>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-5">
              {adhdLevelProfiles.map((level) => (
                <li key={level.slug}>
                  <Link href={`/adhd-test/result/${level.slug}`} className={`block rounded-2xl border px-3 py-4 text-center transition hover:-translate-y-0.5 ${level.slug === profile.slug ? "border-indigo-400 bg-indigo-50" : "border-slate-200 bg-white hover:border-indigo-200"}`}>
                    <span className="text-xl" aria-hidden="true">{level.icon}</span>
                    <p className="mt-1.5 text-[11px] font-black text-slate-400">LV.{level.level}</p>
                    <p className="mt-0.5 text-xs font-black tabular-nums text-slate-500">{level.minScore}~{level.maxScore}점</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section id="share-card" className="mt-10 grid scroll-mt-24 gap-6 rounded-3xl bg-ink p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={profile.icon} eyebrow="ADHD 자가 체크 결과" title={`LEVEL ${profile.level}`} subtitle={profile.name} badge={hasResult ? `${score}점 / 100점` : "참고용 자가 체크"} accent="purple" />
            <div>
              <h2 className="text-xl font-extrabold">주변에도 알려주세요</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">비슷한 어려움을 겪는 사람에게 이 자가 체크가 자신을 이해하는 첫 단서가 될 수 있어요.</p>
              <div className="mt-5"><ShareButtons title={profile.shareText} description={profile.summary} path={sharePath} /></div>
            </div>
          </section>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/tests/adhd-test?start=1" className="inline-flex rounded-xl bg-primary px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">테스트 다시 하기</Link>
            <Link href="/tests" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50">다른 테스트 하기</Link>
          </div>
          <p className="mt-8 text-center text-xs leading-5 text-slate-400">이 테스트는 의료적 진단이 아닌 참고용 자가 체크입니다. 일상에 지장을 주는 어려움이 지속된다면 정신건강의학과 전문의와 상담하세요.</p>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
