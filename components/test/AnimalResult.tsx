import Link from "next/link";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { StatBars } from "@/components/results/StatBars";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import type { ScoredAnimal } from "@/lib/types";

type Props = { result: ScoredAnimal; secondary?: ScoredAnimal; isTie?: boolean };

export function AnimalResult({ result, secondary, isTie = false }: Props) {
  const shareTitle = `회사에서 나는 '${result.alias} ${result.animal}형'이 나왔다!`;
  const shareDescription = result.summary;
  const stats = animalStats(result.slug);
  const growth = animalGrowth(result.slug);
  return (
    <div className="container-page py-8 sm:py-14">
      <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: `${result.animal}형 결과` }]} />
      <div className="mx-auto max-w-4xl">
        <SectionReveal><section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-card">
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-100 via-blue-50 to-amber-50 px-6 py-10 text-center sm:py-14">
            <div className="absolute -left-16 -top-16 size-52 rounded-full bg-white/50 blur-2xl" />
            <div className="absolute -bottom-20 -right-10 size-60 rounded-full bg-blue-200/40 blur-3xl" />
            <p className="relative text-sm font-extrabold text-primary">회사에서 나는 어떤 동물일까?</p>
            <div className="relative mx-auto mt-6 grid size-44 place-items-center rounded-[2.5rem] border border-white/80 bg-white/70 text-9xl shadow-xl shadow-blue-200/40 backdrop-blur sm:size-52 sm:text-[9rem]" role="img" aria-label={`${result.animal} 일러스트`}>
              {result.emoji}
            </div>
            <p className="relative mt-7 text-sm font-black tracking-wide text-primary">{result.alias}</p>
            <h1 className="relative mt-1 text-4xl font-black tracking-[-0.04em] text-ink sm:text-5xl">{result.animal}형</h1>
            <p className="relative mx-auto mt-4 max-w-xl text-base font-medium leading-7 text-slate-600">{result.summary}</p>
            <div className="relative mx-auto mt-6 grid size-24 place-items-center rounded-full p-2 shadow-lg" style={{ background: `conic-gradient(#2563EB ${result.percentage}%, rgba(255,255,255,.7) 0)` }}><div className="grid size-full place-items-center rounded-full bg-white/95"><span><strong className="block text-2xl font-black text-primary">{result.percentage}%</strong><span className="text-[10px] font-bold text-slate-400">적합도</span></span></div></div>
          </div>
          <div className="p-6 sm:p-9">
            <p className="text-xs font-black uppercase tracking-wider text-primary">회사에서 보이는 모습</p>
            <p className="mt-3 text-lg font-bold leading-8 text-ink">“{result.workplaceScene}”</p>
            <div className="mt-6 flex flex-wrap gap-2">{result.traits.map((trait) => <span key={trait} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600">{trait}</span>)}</div>
          </div>
        </section></SectionReveal>

        <AdRectangle />

        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          <RelationCard icon="👔" title="상사와의 관계" text={result.bossRelation} />
          <RelationCard icon="🤝" title="동료와의 관계" text={result.colleagueRelation} />
        </section>

        <section className="mt-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
          <p className="text-xs font-black text-primary">WORK STYLE</p><h2 className="mt-2 text-xl font-black text-ink">업무 스타일</h2><p className="mt-4 leading-8 text-slate-700">{result.workStyle}</p>
        </section>

        <section className="mt-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8"><p className="text-xs font-black text-primary">WORK STATS</p><h2 className="mt-2 text-xl font-black text-ink">직장 능력치</h2><div className="mt-6"><StatBars stats={stats} /></div></section>

        <section className="mt-4 grid gap-4 sm:grid-cols-2">
          <ListCard title="빛나는 강점" items={result.strengths} tone="blue" />
          <ListCard title="조심할 약점" items={result.weaknesses} tone="amber" />
        </section>

        <section className="mt-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
          <h2 className="text-xl font-black text-ink">잘 맞는 직무</h2><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">{result.roles.map((role) => <div key={role} className="rounded-2xl bg-blue-50 px-3 py-4 text-center text-sm font-extrabold text-blue-900">{role}</div>)}</div>
        </section>

        <section className="mt-4 grid gap-4 sm:grid-cols-2"><div className="rounded-3xl border border-indigo-100 bg-indigo-50/70 p-6"><span className="text-3xl">💼</span><h2 className="mt-4 font-black text-ink">추천 부업</h2><div className="mt-4 flex flex-wrap gap-2">{growth.sideJobs.map((item) => <span key={item} className="rounded-full bg-white px-3 py-2 text-xs font-bold text-indigo-800 shadow-sm">{item}</span>)}</div></div><div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6"><span className="text-3xl">🌱</span><h2 className="mt-4 font-black text-ink">성장 포인트</h2><ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">{growth.points.map((item) => <li key={item}>✓ {item}</li>)}</ul></div></section>

        <section className="mt-4 flex items-start gap-4 rounded-3xl border border-violet-100 bg-violet-50 p-6 sm:p-8"><span className="text-4xl" aria-hidden="true">🎭</span><div><p className="text-xs font-black text-violet-600">닮은 유명 캐릭터</p><p className="mt-2 font-bold leading-7 text-violet-950">{result.famousCharacter}</p></div></section>

        {secondary && <section className="mt-8 rounded-3xl border border-dashed border-blue-300 bg-white p-6 shadow-card sm:p-8"><div className="flex items-center gap-4"><span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-blue-50 text-4xl">{secondary.emoji}</span><div><p className="text-xs font-black text-primary">{isTie ? "공동 1위 보조 성향" : "내 안의 보조 성향"}</p><h2 className="mt-1 text-xl font-black text-ink">{secondary.alias} {secondary.animal}형</h2></div></div><p className="mt-4 text-sm leading-7 text-slate-600">주된 모습은 {result.animal}형이지만, 상황에 따라 {secondary.summary}의 특성도 함께 나타납니다.</p></section>}

        <section id="share-card" className="scroll-mt-24 mt-8 grid gap-6 rounded-3xl bg-ink p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><ShareImageCard emoji={result.emoji} eyebrow="회사에서 나는" title={`${result.animal}형`} subtitle={result.alias} badge={`성향 일치 ${result.percentage}%`} accent="orange" /><div><h2 className="text-xl font-black">동료에게 내 유형 알려주기</h2><p className="mt-2 text-sm leading-6 text-slate-300">“회사에서 나는 {result.alias} {result.animal}형!” 결과를 공유하고 팀원들과 비교해 보세요.</p><div className="mt-5"><ShareButtons title={shareTitle} description={shareDescription} path={`/result/${result.slug}`} /></div></div></section>
        <div className="mt-8 text-center"><Link href="/tests/office-animal-test?start=1" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50">테스트 다시 하기</Link></div>
        <p className="mt-7 text-center text-xs leading-5 text-slate-400">결과는 현재의 업무 행동 패턴을 바탕으로 한 성향 정보이며, 개인의 능력이나 가치를 평가하지 않습니다.</p>
      </div>
      <MobileShareDock />
    </div>
  );
}

function animalGrowth(slug: string) {
  const sideJobs: Record<string, string[]> = {
    "office-tiger":["영업 컨설팅","클래스 운영","프로젝트 리딩"], "office-dragon":["사업 기획","전자책","브랜드 컨설팅"],
    "office-horse":["배달·현장 업무","SNS 마케팅","행사 스태프"], "office-rabbit":["고객 상담","커뮤니티 운영","튜터링"],
    "office-sheep":["온라인 운영","문서 지원","데이터 라벨링"], "office-dog":["재능 판매","고객 관리","운영 대행"],
    "office-ox":["스마트스토어 운영","문서 정리","온라인 비서"], "office-rooster":["교정·검수","회계 보조","데이터 정리"],
    "office-snake":["데이터 분석","재무 콘텐츠","리서치"], "office-rat":["블로그","제휴마케팅","리서치 대행"],
    "office-monkey":["콘텐츠 제작","이모티콘","SNS 수익화"], "office-pig":["커뮤니티 운영","라이브 커머스","모임 호스트"],
  };
  return { sideJobs: sideJobs[slug] ?? ["블로그","재능 판매","온라인 운영"], points:["강점을 의식적으로 반복해 나만의 방식으로 만들기","약점이 드러나는 상황에서는 중간 피드백 받기","성과와 과정을 짧게 기록해 성장 패턴 확인하기"] };
}

function animalStats(slug: string) {
  const presets: Record<string, [number, number, number, number]> = {
    "office-tiger": [96, 72, 98, 88], "office-dragon": [94, 76, 92, 78], "office-horse": [82, 78, 97, 73],
    "office-rabbit": [62, 96, 68, 86], "office-sheep": [55, 97, 64, 89], "office-dog": [74, 91, 80, 98],
    "office-ox": [66, 82, 85, 99], "office-rooster": [72, 70, 76, 96], "office-snake": [84, 61, 78, 90],
    "office-rat": [79, 84, 88, 85], "office-monkey": [76, 88, 91, 72], "office-pig": [60, 95, 74, 82],
  };
  const [leadership, collaboration, drive, responsibility] = presets[slug] ?? [75, 75, 75, 75];
  return [{ label:"리더십", value:leadership }, { label:"협업", value:collaboration }, { label:"추진력", value:drive }, { label:"책임감", value:responsibility }];
}

function RelationCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card"><span className="text-3xl" aria-hidden="true">{icon}</span><h2 className="mt-4 text-lg font-black text-ink">{title}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{text}</p></div>;
}

function ListCard({ title, items, tone }: { title: string; items: string[]; tone: "blue" | "amber" }) {
  const classes = tone === "blue" ? "border-blue-100 bg-blue-50 text-blue-950" : "border-amber-100 bg-amber-50 text-amber-950";
  return <div className={`rounded-3xl border p-6 ${classes}`}><h2 className="font-black">{title}</h2><ul className="mt-4 space-y-3 text-sm font-medium">{items.map((item) => <li key={item} className="flex gap-2"><span aria-hidden="true">{tone === "blue" ? "✓" : "•"}</span>{item}</li>)}</ul></div>;
}
