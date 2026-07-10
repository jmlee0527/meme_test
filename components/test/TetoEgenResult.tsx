import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { tetoEgenResultProfiles } from "@/data/teto-egen";
import type { TetoEgenResultProfile } from "@/lib/types";

type Props = {
  profile: TetoEgenResultProfile;
  tetoPercent: number | null;
  encodedAnswers: string | null;
};

const sections: { title: string; icon: string; key: keyof Pick<TetoEgenResultProfile, "personality" | "perception" | "love" | "friendship" | "work" | "stress"> }[] = [
  { title: "당신의 성향", icon: "🧭", key: "personality" },
  { title: "사람들이 보는 당신", icon: "👀", key: "perception" },
  { title: "연애 스타일", icon: "💘", key: "love" },
  { title: "친구 관계", icon: "🤝", key: "friendship" },
  { title: "직장·학교에서의 모습", icon: "💼", key: "work" },
  { title: "스트레스를 받을 때", icon: "🌧️", key: "stress" },
];

export function TetoEgenResult({ profile, tetoPercent, encodedAnswers }: Props) {
  const hasResult = tetoPercent !== null;
  const shownTeto = tetoPercent ?? Math.round((profile.minTeto + profile.maxTeto) / 2);
  const shownEgen = 100 - shownTeto;
  const shareTitle = `나는 테토력 ${shownTeto}%, ${profile.name}!`;
  const sharePath = `/teto-egen-test/result/${profile.slug}${encodedAnswers ? `?r=${encodedAnswers}` : ""}`;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ede9fe_0,#fdf4ff_34%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "테토 에겐 테스트", href: "/tests/teto-egen-test" }, { name: `${profile.name} 결과` }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="overflow-hidden rounded-3xl border border-violet-100 bg-white text-center shadow-card">
              <div className="bg-gradient-to-b from-violet-50 to-white px-6 pb-8 pt-10 sm:pt-14">
                <p className="text-sm font-extrabold text-violet-600">{hasResult ? "테토·에겐 테스트 결과" : "테토·에겐 테스트 유형 소개"}</p>
                <div className="mt-5 text-7xl" aria-hidden="true">{profile.icon}</div>
                <h1 className="mt-4 text-3xl font-black tracking-tight text-ink sm:text-4xl">당신은 <span className="text-violet-600">{profile.name}</span>입니다</h1>
                <p className="mx-auto mt-3 max-w-xl text-base font-medium text-slate-600">{profile.summary}</p>

                <div className="mx-auto mt-8 max-w-md space-y-4 text-left">
                  <div>
                    <div className="flex items-center justify-between text-sm font-black">
                      <span className="text-orange-600">🔥 테토력</span>
                      <span className="tabular-nums text-orange-600">{shownTeto}%</span>
                    </div>
                    <div className="mt-1.5 h-4 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-gradient-to-r from-orange-400 to-rose-500" style={{ width: `${Math.max(shownTeto, 3)}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm font-black">
                      <span className="text-sky-600">🌊 에겐력</span>
                      <span className="tabular-nums text-sky-600">{shownEgen}%</span>
                    </div>
                    <div className="mt-1.5 h-4 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-500" style={{ width: `${Math.max(shownEgen, 3)}%` }} />
                    </div>
                  </div>
                </div>
                {!hasResult && <p className="mt-4 text-xs text-slate-400">위 비율은 유형 구간의 예시입니다. 테스트를 완료하면 나의 실제 비율이 표시됩니다.</p>}
              </div>
              <div className="border-t border-violet-50 bg-violet-50/40 px-6 py-5">
                <p className="text-sm font-black text-violet-900">✍️ 한 줄 요약 — {profile.oneLiner}</p>
              </div>
            </section>
          </SectionReveal>

          <AdRectangle />

          <SectionReveal className="mt-8 grid gap-5">
            {sections.map(({ title, icon, key }) => (
              <section key={key} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
                <h2 className="text-lg font-extrabold text-ink">{icon} {title}</h2>
                <p className="mt-3 leading-8 text-slate-700">{profile[key]}</p>
              </section>
            ))}
          </SectionReveal>

          <section className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
              <h2 className="font-extrabold text-ink">💪 강점</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">{profile.strengths.map((item) => <li key={item}>✓ {item}</li>)}</ul>
            </div>
            <div className="rounded-3xl border border-amber-100 bg-amber-50/60 p-6">
              <h2 className="font-extrabold text-amber-900">🚧 약점</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-amber-950">{profile.weaknesses.map((item) => <li key={item}>• {item}</li>)}</ul>
            </div>
          </section>

          <section className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6 sm:p-8">
              <h2 className="font-extrabold text-emerald-950">💚 잘 맞는 성향</h2>
              <p className="mt-3 text-sm leading-7 text-emerald-900">{profile.goodMatch}</p>
            </div>
            <div className="rounded-3xl border border-violet-100 bg-violet-50/70 p-6 sm:p-8">
              <h2 className="font-extrabold text-violet-950">⚡ 반대 성향과의 케미</h2>
              <p className="mt-3 text-sm leading-7 text-violet-900">{profile.oppositeChemistry}</p>
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-extrabold text-ink">🌱 성장 포인트</h2>
            <p className="mt-3 leading-8 text-slate-700">{profile.growth}</p>
          </section>

          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-extrabold text-ink">테토력 기준 8가지 유형</h2>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-4">
              {tetoEgenResultProfiles.map((item) => (
                <li key={item.slug}>
                  <Link href={`/teto-egen-test/result/${item.slug}`} className={`block rounded-2xl border px-3 py-4 text-center transition hover:-translate-y-0.5 ${item.slug === profile.slug ? "border-violet-400 bg-violet-50" : "border-slate-200 bg-white hover:border-violet-200"}`}>
                    <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                    <p className="mt-2 text-xs font-extrabold text-ink">{item.name}</p>
                    <p className="mt-1 text-[11px] font-black tabular-nums text-slate-400">테토력 {item.minTeto}~{item.maxTeto}%</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section id="share-card" className="mt-10 grid scroll-mt-24 gap-6 rounded-3xl bg-ink p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={profile.icon} eyebrow="나의 테토·에겐 비율은" title={`테토 ${shownTeto}% · 에겐 ${shownEgen}%`} subtitle={`${profile.name} — ${profile.summary}`} badge={profile.name} accent="purple" />
            <div>
              <h2 className="text-xl font-extrabold">친구는 테토일까, 에겐일까?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">결과를 공유하고 서로의 테토력·에겐력 비율을 비교해보세요.</p>
              <div className="mt-5"><ShareButtons title={shareTitle} description={profile.shareText} path={sharePath} /></div>
            </div>
          </section>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/tests/teto-egen-test?start=1" className="inline-flex rounded-xl bg-primary px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">테스트 다시 하기</Link>
            <Link href="/tests" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50">다른 테스트 하기</Link>
          </div>
          <p className="mt-8 text-center text-xs leading-5 text-slate-400">테토·에겐은 인터넷 밈에서 출발한 개념으로, 이 테스트는 과학적 성격 검사가 아닌 자기이해와 재미를 위한 콘텐츠입니다.</p>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}
