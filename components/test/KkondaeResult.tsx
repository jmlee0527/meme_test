import Link from "next/link";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { StatBars } from "@/components/results/StatBars";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import type { KkondaeResultProfile } from "@/lib/types";

export function KkondaeResult({ profile, score, percentage, points }: { profile:KkondaeResultProfile; score:number; percentage:number; points:{label:string;score:number}[] }) {
  const shareTitle = `나는 ${profile.name}! 내 꼰대력은 ${percentage}%입니다.`;
  const stats = [
    { label:"소통 유연성", value:Math.max(8, 100 - percentage) },
    { label:"변화 수용성", value:Math.max(10, 96 - percentage) },
    { label:"세대 감수성", value:Math.max(8, 98 - percentage) },
    { label:"권위적 사고", value:percentage },
  ];
  return <div className="container-page py-8 sm:py-14">
    <Breadcrumbs items={[{name:"테스트",href:"/tests"},{name:"꼰대력 결과"}]} />
    <div className="mx-auto max-w-4xl">
      <SectionReveal><section className="overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-card"><div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-white px-6 py-10 text-center sm:py-14"><div className="absolute -left-20 -top-20 size-64 rounded-full bg-orange-200/30 blur-3xl" /><p className="relative text-sm font-black text-orange-600">나의 직장 꼰대력은?</p><div className="relative mx-auto mt-6 grid size-36 place-items-center rounded-[2.25rem] border border-white bg-white/80 text-8xl shadow-xl shadow-orange-200/40">{profile.icon}</div><h1 className="relative mt-6 text-3xl font-black tracking-[-0.04em] text-ink sm:text-5xl">{profile.name}</h1><p className="relative mx-auto mt-4 max-w-xl leading-7 text-slate-600">{profile.summary}</p><div className="relative mx-auto mt-7 grid size-28 place-items-center rounded-full p-2 shadow-lg" style={{background:`conic-gradient(#F97316 ${percentage}%, #FFEDD5 0)`}}><div className="grid size-full place-items-center rounded-full bg-white"><span><strong className="block text-3xl font-black text-orange-600">{percentage}%</strong><span className="text-[10px] font-bold text-slate-400">나의 꼰대력</span></span></div></div><p className="relative mt-3 text-xs font-bold text-slate-400">총 {score}점 / 30점</p></div><div className="p-6 sm:p-9"><h2 className="text-xl font-black text-ink">상세 분석</h2><p className="mt-4 leading-8 text-slate-700">{profile.analysis}</p><div className="mt-6 flex flex-wrap gap-2">{profile.traits.map((trait)=><span key={trait} className="rounded-full bg-orange-50 px-3 py-2 text-xs font-bold text-orange-800">{trait}</span>)}</div></div></section></SectionReveal>

      <AdRectangle />

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8"><p className="text-xs font-black text-orange-500">COMMUNICATION STATS</p><h2 className="mt-2 text-xl font-black text-ink">직장 소통 능력치</h2><div className="mt-6"><StatBars stats={stats} /></div></section>

      <section className="mt-4 grid gap-4 sm:grid-cols-2"><div className="rounded-3xl border border-orange-100 bg-orange-50/70 p-6"><span className="text-3xl">🎯</span><h2 className="mt-4 font-black text-ink">내 꼰대 포인트</h2>{points.length ? <ul className="mt-4 space-y-3">{points.map((point)=><li key={point.label} className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-700"><span>{point.label}</span><span className="text-orange-600">{point.score}/3</span></li>)}</ul> : <p className="mt-4 text-sm leading-7 text-slate-600">특별히 강하게 나타난 꼰대 포인트가 없어요. 지금의 열린 태도를 유지해 보세요.</p>}</div><div className="rounded-3xl border border-amber-100 bg-amber-50/70 p-6"><span className="text-3xl">⚠️</span><h2 className="mt-4 font-black text-ink">주의할 점</h2><p className="mt-4 text-sm leading-7 text-slate-700">{profile.caution}</p></div></section>

      <section className="mt-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8"><h2 className="text-xl font-black text-ink">직장에서 조심하면 좋은 말</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{profile.phrases.map((phrase)=><blockquote key={phrase} className="rounded-2xl bg-slate-50 p-5 text-sm font-bold leading-6 text-slate-600">“{phrase}”</blockquote>)}</div></section>

      <section className="mt-4 rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6 sm:p-8"><span className="text-3xl">🌿</span><h2 className="mt-4 text-xl font-black text-ink">꼰대력 낮추는 방법 3가지</h2><ol className="mt-6 space-y-4">{profile.methods.map((method,index)=><li key={method} className="flex gap-4"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-emerald-600 text-sm font-black text-white">{index+1}</span><p className="pt-1 text-sm font-semibold leading-6 text-slate-700">{method}</p></li>)}</ol></section>

      <section id="share-card" className="scroll-mt-24 mt-8 grid gap-6 rounded-3xl bg-ink p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><ShareImageCard emoji={profile.icon} eyebrow="나의 꼰대력" title={profile.name} subtitle={profile.shareText} badge={`${percentage}% · ${score}/30점`} accent="orange" /><div><h2 className="text-xl font-black">동료에게 결과 공유하기</h2><p className="mt-2 text-sm leading-6 text-slate-300">{profile.shareText}</p><div className="mt-5"><ShareButtons title={shareTitle} description={`${profile.shareText} 당신의 꼰대력도 확인해보세요.`} path={`/result/${profile.slug}`} /></div></div></section>

      <section className="mt-10"><h2 className="text-xl font-black text-ink">함께 보면 좋은 테스트</h2><div className="mt-5 grid gap-3 sm:grid-cols-2"><Related href="/tests/office-animal-test" icon="🐯" title="회사에서 나는 어떤 동물일까?" /><Related href="/tests/side-job-recommendation" icon="✨" title="나에게 맞는 부업 추천 테스트" /></div></section>
      <div className="mt-8 text-center"><Link href="/tests/kkondae-power-test?start=1" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-600">테스트 다시 하기</Link></div>
      <p className="mt-7 text-center text-xs leading-5 text-slate-400">이 결과는 직장 커뮤니케이션 성향을 돌아보기 위한 참고 정보이며 개인을 단정하거나 평가하지 않습니다.</p>
    </div><MobileShareDock />
  </div>;
}

function Related({href,icon,title}:{href:string;icon:string;title:string}) { return <Link href={href} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:border-orange-200"><span className="text-4xl">{icon}</span><strong className="text-sm text-ink">{title}</strong></Link>; }
