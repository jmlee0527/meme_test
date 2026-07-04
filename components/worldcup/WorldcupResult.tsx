import Image from "next/image";
import Link from "next/link";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { foodWinnerStats } from "@/data/food-worldcup";
import type { FoodWorldcupItem } from "@/lib/types";

export function WorldcupResult({ item }:{item:FoodWorldcupItem}) {
  const shareTitle=`주말 배달음식 월드컵 우승은 ${item.name}!`;
  return <div className="container-page py-8 sm:py-14"><Breadcrumbs items={[{name:"테스트",href:"/tests"},{name:"배달음식 월드컵 우승"}]} /><div className="mx-auto max-w-4xl">
    <section className="overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-card"><div className="p-6 text-center sm:p-9"><p className="text-5xl">🏆</p><p className="mt-4 text-sm font-black text-orange-600">당신의 주말 배달음식 우승은?</p><h1 className="mt-2 text-4xl font-black tracking-[-.04em] text-ink sm:text-6xl">{item.emoji} {item.name}</h1></div><div className="relative mx-4 aspect-[4/3] overflow-hidden rounded-[1.5rem] sm:mx-8 sm:rounded-[2rem]"><Image src={item.image} alt={`${item.name} 우승 메뉴`} fill sizes="(max-width:768px) 92vw, 800px" className="object-cover" priority /><div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" /><p className="absolute inset-x-5 bottom-6 text-center text-xl font-black text-white drop-shadow sm:text-3xl">오늘은 고민 끝. 당신의 선택은 {item.name}입니다.</p></div><div className="p-6 sm:p-9"><p className="text-center text-lg font-black text-orange-600">{item.recommendation}</p><p className="mx-auto mt-3 max-w-2xl text-center leading-7 text-slate-600">{item.description}</p><div className="mt-6 flex flex-wrap justify-center gap-2">{item.reasons.map((reason)=><span key={reason} className="rounded-full bg-orange-50 px-4 py-2 text-xs font-bold text-orange-800">✓ {reason}</span>)}</div></div></section>

    <AdRectangle />

    <section className="mt-6 grid gap-4 sm:grid-cols-2"><div className="rounded-3xl border border-blue-100 bg-blue-50/70 p-6"><span className="text-3xl">🛵</span><h2 className="mt-4 text-lg font-black text-ink">배달 팁</h2><p className="mt-3 text-sm leading-7 text-slate-700">{item.deliveryTip}</p></div><div className="rounded-3xl border border-rose-100 bg-rose-50/70 p-6"><span className="text-3xl">🥤</span><h2 className="mt-4 text-lg font-black text-ink">함께 먹기 좋은 메뉴</h2><div className="mt-4 flex flex-wrap gap-2">{item.sides.map((side)=><span key={side} className="rounded-full bg-white px-3 py-2 text-xs font-bold text-rose-700 shadow-sm">{side}</span>)}</div></div></section>

    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8"><h2 className="text-xl font-black text-ink">이번 주 우승 TOP5</h2><ol className="mt-5 space-y-3">{foodWinnerStats.map((stat,index)=><li key={stat.name} className="flex items-center gap-3"><span className="text-lg">{["🥇","🥈","🥉","🏅","🏅"][index]}</span><span className="text-lg">{stat.emoji}</span><strong className="w-16 text-sm">{stat.name}</strong><div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-orange-400 to-rose-500" style={{width:`${stat.value*3.4}%`}} /></div><span className="text-xs font-black text-orange-600">{stat.value}%</span></li>)}</ol></section>

    <section id="share-card" className="scroll-mt-24 mt-8 grid gap-6 rounded-3xl bg-ink p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><ShareImageCard emoji={item.emoji} eyebrow="주말 배달음식 월드컵" title={item.name} subtitle="오늘의 우승 메뉴" badge="🏆 최종 우승" accent="orange" /><div><h2 className="text-xl font-black">친구에게 우승 메뉴 공유하기</h2><p className="mt-2 text-sm leading-6 text-slate-300">내 선택은 {item.name}! 친구의 우승 메뉴도 확인해 보세요.</p><div className="mt-5"><ShareButtons title={shareTitle} description={item.recommendation} path={`/result/${item.resultSlug}`} /></div></div></section>
    <div className="mt-8 text-center"><Link href="/tests/weekend-food-worldcup" className="inline-flex min-h-12 items-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-black text-slate-700">다시 월드컵 하기</Link></div>
  </div><MobileShareDock /></div>;
}
