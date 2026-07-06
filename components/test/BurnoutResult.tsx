import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { burnoutGuides } from "@/lib/burnout-engine";
import type { BurnoutDomainScores, BurnoutResultProfile } from "@/lib/types";

const labels=[
  {key:"energy",label:"에너지 고갈",hint:"높을수록 피로 신호가 큼"},
  {key:"emotional",label:"정서적 소진",hint:"높을수록 감정 소모가 큼"},
  {key:"disengagement",label:"업무/학업 거리두기",hint:"높을수록 의미와 동기가 낮음"},
  {key:"interpersonal",label:"대인관계 피로",hint:"높을수록 관계 부담이 큼"},
  {key:"recovery",label:"회복 가능성",hint:"높을수록 회복 자원이 충분함"},
] as const;

function barColor(key:string,value:number){
  if(key==="recovery")return "from-emerald-400 to-teal-500";
  if(value>=80)return "from-rose-500 to-red-500";
  if(value>=60)return "from-orange-400 to-rose-500";
  if(value>=40)return "from-amber-400 to-orange-400";
  return "from-sky-400 to-emerald-400";
}

export function BurnoutResult({profile,riskScore,areaScores}:{profile:BurnoutResultProfile;riskScore:number;areaScores:BurnoutDomainScores}) {
  const guides=burnoutGuides(areaScores,profile.baseGuides);
  const sharePath=`/result/${profile.slug}`;
  return <div className="min-h-screen bg-[radial-gradient(circle_at_top,#d1fae5_0,#f8fafc_35%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
    <div className="container-page"><Breadcrumbs items={[{name:"테스트",href:"/tests"},{name:"번아웃 위험도 결과"}]} />
      <div className="mx-auto max-w-4xl">
        <SectionReveal><section className="overflow-hidden rounded-[2rem] border border-white bg-white/90 text-center shadow-2xl shadow-emerald-100/70 backdrop-blur">
          <div className="bg-gradient-to-b from-emerald-50 via-teal-50/60 to-white px-6 pb-8 pt-10 sm:pt-14">
            <p className="text-xs font-black tracking-[.18em] text-emerald-700">MY BURNOUT CHECK</p>
            <div className="mt-5 text-7xl" aria-hidden="true">{profile.icon}</div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-ink sm:text-5xl">{profile.name}</h1>
            <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-6 text-slate-600 sm:text-base">{profile.summary}</p>
            <div className="mx-auto mt-7 grid size-36 place-items-center rounded-full p-2.5 shadow-xl" style={{background:`conic-gradient(#059669 ${riskScore}%,#d1fae5 0)`}}><div className="grid size-full place-items-center rounded-full bg-white"><span><strong className="block text-4xl font-black text-emerald-700">{riskScore}</strong><span className="text-xs font-bold text-slate-400">위험도 / 100</span></span></div></div>
          </div>
          <div className="px-6 pb-9 sm:px-12"><p className="mx-auto max-w-2xl leading-8 text-slate-700">{profile.description}</p><p className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-xs font-semibold leading-5 text-slate-500">이 결과는 현재 상태를 돌아보기 위한 자가 점검이며, 질환 여부를 판단하는 의료 진단이 아닙니다.</p></div>
        </section></SectionReveal>

        <SectionReveal className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-9">
          <p className="text-xs font-black tracking-[.16em] text-emerald-600">SCORE BREAKDOWN</p><h2 className="mt-2 text-2xl font-black text-ink">영역별 상태</h2>
          <div className="mt-7 space-y-6">{labels.map(({key,label,hint})=>{const value=areaScores[key];return <div key={key}><div className="flex items-end justify-between gap-4"><div><strong className="text-sm text-slate-800">{label}</strong><p className="mt-1 text-[11px] text-slate-400">{hint}</p></div><strong className={key==="recovery"?"text-emerald-600":"text-slate-700"}>{value}%</strong></div><div className="mt-2.5 h-3 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full bg-gradient-to-r ${barColor(key,value)}`} style={{width:`${value}%`}} /></div></div>})}</div>
        </SectionReveal>

        <SectionReveal className="mt-7 rounded-[2rem] border border-emerald-100 bg-emerald-50/70 p-6 sm:p-9">
          <p className="text-xs font-black tracking-[.16em] text-emerald-700">RECOVERY GUIDE</p><h2 className="mt-2 text-2xl font-black text-emerald-950">지금 나에게 맞는 회복 가이드</h2>
          <ol className="mt-6 space-y-3">{guides.map((guide,index)=><li key={guide} className="flex gap-4 rounded-2xl bg-white/80 p-4 text-sm font-semibold leading-6 text-slate-700"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-emerald-600 font-black text-white">{index+1}</span><span className="pt-1">{guide}</span></li>)}</ol>
        </SectionReveal>

        <section id="share-card" className="scroll-mt-24 mt-8 grid gap-6 rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><ShareImageCard emoji={profile.icon} eyebrow="나의 번아웃 위험도" title={profile.name} subtitle={profile.summary} badge={`${riskScore}점 / 100점`} accent="purple" /><div><h2 className="text-xl font-black">지금 내 상태를 가볍게 나눠보세요</h2><p className="mt-2 text-sm leading-6 text-slate-300">결과를 공유하거나, 잠시 뒤 다시 점검해 변화를 비교할 수 있어요.</p><div className="mt-5"><ShareButtons title={`내 번아웃 자가 점검 결과는 '${profile.name}'`} description={`${profile.summary} 위험도 ${riskScore}점`} path={sharePath} /></div></div></section>

        <div className="mt-8 text-center"><Link href="/tests/burnout-risk-test?start=1" className="inline-flex min-h-12 items-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-50">다시 테스트하기</Link></div>
        <aside className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-xs font-semibold leading-6 text-amber-950"><strong className="block text-sm">꼭 확인해 주세요</strong><p className="mt-2">이 테스트는 의학적 진단이 아닌 자가 점검용 콘텐츠입니다. 일상생활에 큰 어려움이 있거나 우울감, 불안, 수면 문제 등이 지속된다면 전문가의 도움을 받아보는 것을 권장합니다.</p></aside>
        <p className="mt-5 text-center text-[11px] leading-5 text-slate-400">CBI·OLBI의 영역 구조를 참고해 자체 작성한 콘텐츠이며, 표준화된 임상 척도를 대체하지 않습니다.</p>
      </div>
    </div><MobileShareDock />
  </div>;
}
