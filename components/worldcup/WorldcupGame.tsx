"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { FoodWorldcupItem } from "@/lib/types";

function shuffled(items:FoodWorldcupItem[], seed:number) {
  const output=[...items]; let state=seed || 1;
  const random=()=>{ state=(state*48271)%2147483647; return (state-1)/2147483646; };
  for(let index=output.length-1;index>0;index--){ const target=Math.floor(random()*(index+1)); [output[index],output[target]]=[output[target],output[index]]; }
  return output;
}

export function WorldcupGame({ items, seed }: { items:FoodWorldcupItem[]; seed:number }) {
  const router=useRouter(); const reduceMotion=useReducedMotion();
  const seeded=useMemo(()=>shuffled(items,seed),[items,seed]);
  const [round,setRound]=useState(seeded); const [match,setMatch]=useState(0); const [winners,setWinners]=useState<FoodWorldcupItem[]>([]); const [selected,setSelected]=useState<string|null>(null);
  const gameCount=round.length/2; const left=round[match*2]; const right=round[match*2+1]; const isFinal=round.length===2;
  const completed=32-round.length+match; const progress=Math.round((completed/31)*100);
  const choose=(item:FoodWorldcupItem)=>{ if(selected)return; setSelected(item.slug); window.setTimeout(()=>{ const next=[...winners,item]; if(match+1>=gameCount){ if(next.length===1){ router.push(`/result/${item.resultSlug}`); return; } setRound(next); setWinners([]); setMatch(0); } else { setWinners(next); setMatch(match+1); } setSelected(null); },320); };
  if(!left||!right)return null;
  return <div className={`min-h-[calc(100vh-4rem)] px-4 py-6 sm:py-10 ${isFinal?"bg-[radial-gradient(circle_at_top,#fff7ed,#f8fafc_65%)]":""}`}><div className="mx-auto max-w-4xl"><header className="text-center"><p className="text-xs font-black text-orange-500">주말 배달음식 월드컵</p><h1 className="mt-2 text-3xl font-black tracking-tight text-ink">{isFinal?"🎉 결승전":`${round.length}강`}</h1><p className="mt-2 text-sm font-bold text-slate-400">{match+1} / {gameCount} 경기</p><div className="mx-auto mt-5 h-2 max-w-xl overflow-hidden rounded-full bg-slate-200"><motion.div className="h-full rounded-full bg-gradient-to-r from-orange-400 to-rose-500" animate={{width:`${progress}%`}} transition={{duration:.35}} /></div></header>
    <AnimatePresence mode="wait"><motion.div key={`${round.length}-${match}`} initial={reduceMotion?false:{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={reduceMotion?undefined:{opacity:0,scale:.98}} className="relative mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-5"><FoodChoice item={left} selected={selected} onChoose={choose} /><motion.div animate={isFinal&&!reduceMotion?{scale:[1,1.18,1]}:undefined} transition={{repeat:Infinity,duration:1.4}} className="z-10 grid size-12 place-items-center rounded-full bg-ink text-sm font-black italic text-white shadow-xl sm:size-16 sm:text-lg">VS</motion.div><FoodChoice item={right} selected={selected} onChoose={choose} /></motion.div></AnimatePresence>
    <p className="mt-7 text-center text-xs font-bold text-slate-400">더 먹고 싶은 음식을 터치하세요 · 선택 즉시 다음 경기로 이동해요</p></div></div>;
}

function FoodChoice({item,selected,onChoose}:{item:FoodWorldcupItem;selected:string|null;onChoose:(item:FoodWorldcupItem)=>void}) {
  const active=selected===item.slug; const lost=Boolean(selected)&&!active;
  return <motion.button type="button" onClick={()=>onChoose(item)} disabled={Boolean(selected)} whileHover={{scale:1.03,y:-4}} whileTap={{scale:.98}} animate={active?{scale:1.04}:lost?{scale:.94,opacity:.55}:undefined} className={`group relative aspect-[3/4] min-w-0 overflow-hidden rounded-[1.5rem] border-2 bg-slate-200 text-left shadow-xl transition-shadow sm:rounded-[2rem] ${active?"border-orange-400 shadow-orange-200":"border-white hover:shadow-2xl"}`}><Image src={item.image} alt={`${item.name} 배달 음식`} fill sizes="(max-width:768px) 44vw, 360px" className="object-cover transition duration-500 group-hover:scale-105" priority /><div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" /><span className="absolute inset-x-2 bottom-5 text-center text-lg font-black text-white drop-shadow sm:text-2xl">{item.emoji} {item.name}</span>{active&&<span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-orange-500 text-white shadow-lg">✓</span>}</motion.button>;
}
