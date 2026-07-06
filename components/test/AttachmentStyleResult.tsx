import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import type { AttachmentAxisScores, AttachmentResultProfile } from "@/lib/types";

const axisMeta = [
  { key: "anxiety", label: "애착 불안", low: "확신이 비교적 안정적", high: "확인과 반응에 민감" },
  { key: "avoidance", label: "애착 회피", low: "친밀감이 비교적 편안", high: "거리와 독립성 필요" },
] as const;

export function AttachmentStyleResult({ profile, axisScores, fitScore, isBoundary }: { profile: AttachmentResultProfile; axisScores: AttachmentAxisScores; fitScore: number; isBoundary: boolean }) {
  const x = Math.min(94, Math.max(6, axisScores.avoidance));
  const y = Math.min(94, Math.max(6, 100 - axisScores.anxiety));

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ffe4e6_0,#faf5ff_42%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "애착유형 결과" }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="overflow-hidden rounded-[2rem] border border-white bg-white/90 text-center shadow-2xl shadow-rose-100/80 backdrop-blur">
              <div className="bg-gradient-to-b from-rose-50 via-violet-50/60 to-white px-6 pb-8 pt-10 sm:pt-14">
                <p className="text-xs font-black tracking-[.18em] text-rose-600">MY ATTACHMENT STYLE</p>
                <div className="mt-5 text-7xl" aria-hidden="true">{profile.icon}</div>
                <h1 className="mt-4 text-3xl font-black tracking-tight text-ink sm:text-5xl">{profile.name}</h1>
                <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-6 text-slate-600 sm:text-base">{profile.summary}</p>
                <div className="mx-auto mt-7 grid size-36 place-items-center rounded-full p-2.5 shadow-xl" style={{ background: `conic-gradient(#e11d48 ${fitScore}%,#ffe4e6 0)` }}>
                  <div className="grid size-full place-items-center rounded-full bg-white">
                    <span><strong className="block text-4xl font-black text-rose-600">{fitScore}%</strong><span className="text-xs font-bold text-slate-400">유형 선명도</span></span>
                  </div>
                </div>
                {isBoundary && <p className="mx-auto mt-5 max-w-2xl rounded-2xl bg-white/75 px-4 py-3 text-xs font-bold leading-5 text-slate-500">일부 점수가 기준선 근처에 있어 중간 경향이 함께 나타납니다. 상황과 상대, 관계 경험에 따라 다른 모습이 나올 수 있어요.</p>}
              </div>
              <div className="px-6 pb-9 sm:px-12">
                <p className="mx-auto max-w-2xl leading-8 text-slate-700">{profile.description}</p>
              </div>
            </section>
          </SectionReveal>

          <SectionReveal className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-9">
            <p className="text-xs font-black tracking-[.16em] text-rose-600">TWO AXIS MATRIX</p>
            <h2 className="mt-2 text-2xl font-black text-ink">불안 × 회피 2축 그래프</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">가로축은 회피 성향, 세로축은 불안 성향을 나타냅니다. 점이 위치한 사분면이 현재 결과 유형입니다.</p>
            <div className="mt-7 grid gap-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
              <div className="relative aspect-square rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-rose-50 p-4">
                <div className="absolute inset-x-4 top-1/2 h-px bg-slate-300" />
                <div className="absolute inset-y-4 left-1/2 w-px bg-slate-300" />
                <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black text-emerald-700 shadow-sm">안정형</span>
                <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black text-rose-700 shadow-sm">불안형</span>
                <span className="absolute bottom-5 right-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black text-blue-700 shadow-sm">회피형</span>
                <span className="absolute right-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black text-violet-700 shadow-sm">불안회피형</span>
                <div className="absolute -bottom-6 left-5 right-5 flex justify-between text-[10px] font-bold text-slate-400"><span>회피 낮음</span><span>회피 높음</span></div>
                <div className="absolute -left-8 bottom-5 top-5 flex rotate-180 items-center justify-between text-[10px] font-bold text-slate-400 [writing-mode:vertical-rl]"><span>불안 낮음</span><span>불안 높음</span></div>
                <div className="absolute grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-rose-600 text-xs font-black text-white shadow-xl ring-8 ring-rose-100" style={{ left: `${x}%`, top: `${y}%` }}>나</div>
              </div>
              <div className="space-y-5">
                {axisMeta.map(({ key, label, low, high }) => {
                  const value = axisScores[key];
                  return (
                    <div key={key}>
                      <div className="flex items-end justify-between gap-4"><div><strong className="text-sm text-slate-800">{label}</strong><p className="mt-1 text-[11px] text-slate-400">{value < 50 ? low : high}</p></div><strong className="text-rose-600">{value}%</strong></div>
                      <div className="mt-2.5 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-rose-500 to-violet-500" style={{ width: `${value}%` }} /></div>
                    </div>
                  );
                })}
                <div className="rounded-2xl bg-slate-50 p-5 text-sm font-semibold leading-6 text-slate-600">현재 위치: <strong className="text-slate-900">{profile.matrixLabel}</strong>. {profile.name}은 관계에서 반복되는 반응 패턴을 이해하기 위한 참고 유형입니다.</div>
              </div>
            </div>
          </SectionReveal>

          <section className="mt-7 grid gap-5 sm:grid-cols-2">
            <InfoList title="관계에서의 강점" tone="emerald" items={profile.strengths} />
            <InfoList title="주의할 점" tone="amber" items={profile.cautions} />
          </section>

          <SectionReveal className="mt-7 rounded-[2rem] border border-rose-100 bg-rose-50/70 p-6 sm:p-9">
            <p className="text-xs font-black tracking-[.16em] text-rose-700">RELATIONSHIP TIPS</p>
            <h2 className="mt-2 text-2xl font-black text-rose-950">더 편안한 관계를 위한 팁</h2>
            <ol className="mt-6 grid gap-3 sm:grid-cols-3">
              {profile.tips.map((tip, index) => <li key={tip} className="rounded-2xl bg-white/90 p-5 text-sm font-bold leading-6 text-slate-700"><span className="mb-3 grid size-8 place-items-center rounded-full bg-rose-600 text-xs text-white">{index + 1}</span>{tip}</li>)}
            </ol>
          </SectionReveal>

          <section className="mt-7 grid gap-5 sm:grid-cols-2">
            <SectionReveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8"><h2 className="text-xl font-black text-ink">나와 잘 맞는 관계 스타일</h2><p className="mt-4 text-sm font-semibold leading-7 text-slate-600">{profile.goodFit}</p></SectionReveal>
            <SectionReveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8"><h2 className="text-xl font-black text-ink">조심해야 할 관계 패턴</h2><p className="mt-4 text-sm font-semibold leading-7 text-slate-600">{profile.watchPattern}</p></SectionReveal>
          </section>

          <SectionReveal className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-black text-ink">다른 연애 테스트 추천</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link href="/tests/love-mbti-test" className="rounded-2xl bg-rose-50 p-5 font-bold text-rose-900 transition hover:-translate-y-0.5">💞 연애 MBTI 테스트</Link>
              <Link href="/tests/marriage-timing-test" className="rounded-2xl bg-violet-50 p-5 font-bold text-violet-900 transition hover:-translate-y-0.5">💌 나는 언제 결혼할까?</Link>
            </div>
          </SectionReveal>

          <section id="share-card" className="scroll-mt-24 mt-8 grid gap-6 rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={profile.icon} eyebrow="나의 애착유형은" title={profile.name} subtitle={profile.summary} badge={`불안 ${axisScores.anxiety}% · 회피 ${axisScores.avoidance}%`} accent="pink" />
            <div><h2 className="text-xl font-black">친구의 관계 패턴도 궁금하다면?</h2><p className="mt-2 text-sm leading-6 text-slate-300">결과를 공유하고 서로의 관계 언어를 비교해 보세요.</p><div className="mt-5"><ShareButtons title={profile.shareText} description={profile.summary} path={`/result/${profile.slug}`} /></div></div>
          </section>

          <div className="mt-8 text-center"><Link href="/tests/attachment-style-test?start=1" className="inline-flex min-h-12 items-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-600 hover:bg-slate-50">다시 테스트하기</Link></div>
          <p className="mt-8 rounded-2xl bg-white/70 px-5 py-4 text-center text-xs leading-6 text-slate-500">이 테스트는 의학적 진단이나 상담을 대체하지 않는 자가 점검용 콘텐츠입니다. 애착유형은 고정된 성격이 아니라 관계 경험과 상황에 따라 달라질 수 있는 경향성입니다.</p>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}

function InfoList({ title, items, tone }: { title: string; items: string[]; tone: "emerald" | "amber" }) {
  const className = tone === "emerald" ? "border-emerald-100 bg-emerald-50/70 text-emerald-950" : "border-amber-100 bg-amber-50/70 text-amber-950";
  return <SectionReveal className={`rounded-[2rem] border p-6 sm:p-8 ${className}`}><h2 className="text-xl font-black">{title}</h2><ul className="mt-5 space-y-3 text-sm font-semibold leading-6">{items.map((item) => <li key={item}>• {item}</li>)}</ul></SectionReveal>;
}
