"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { buildBurnoutQuestions, calculateBurnoutResult, serializeBurnoutAnswers } from "@/lib/burnout-engine";
import type { BurnoutQuestion } from "@/lib/types";
import { burnoutCommonQuestions } from "@/data/burnout-risk";

const choices=[
  {value:1,label:"전혀 아니다"},{value:2,label:"아니다"},{value:3,label:"보통이다"},{value:4,label:"그렇다"},{value:5,label:"매우 그렇다"},
];

export function BurnoutTestPage() {
  const router=useRouter();
  const reduceMotion=useReducedMotion();
  const [questions,setQuestions]=useState<BurnoutQuestion[]>(burnoutCommonQuestions);
  const [answers,setAnswers]=useState<number[]>([]);
  const [index,setIndex]=useState(0);
  const current=questions[index];
  const selected=answers[index];
  const progress=Math.round(((index+1)/12)*100);
  const canFinish=questions.length===12&&answers.length===12&&answers.every((answer)=>Boolean(answer));
  const branchLabel=useMemo(()=>questions[3]?.id?.[0]??null,[questions]);

  const select=(value:number)=>{
    const nextAnswers=answers.slice(0,index);
    nextAnswers[index]=value;
    setAnswers(nextAnswers);
    if(index===2){
      const fullQuestions=buildBurnoutQuestions(nextAnswers.slice(0,3));
      setQuestions(fullQuestions);
      window.setTimeout(()=>setIndex(3),reduceMotion?0:180);
      return;
    }
    if(index<questions.length-1)window.setTimeout(()=>setIndex((currentIndex)=>currentIndex+1),reduceMotion?0:180);
  };

  const previous=()=>{
    if(index===0)return;
    const previousIndex=index-1;
    setIndex(previousIndex);
    if(previousIndex<3){
      setQuestions(burnoutCommonQuestions);
      setAnswers((currentAnswers)=>currentAnswers.slice(0,3));
    }
  };

  const finish=()=>{
    if(!canFinish)return;
    const {profile}=calculateBurnoutResult(answers);
    router.push(`/result/${profile.slug}?answers=${serializeBurnoutAnswers(answers)}`);
  };

  if(!current)return null;
  return <main className="min-h-[calc(100vh-5rem)] bg-[radial-gradient(circle_at_top,#d1fae5_0,#f8fafc_45%,#f8fafc_100%)] py-6 sm:py-12">
    <div className="container-page mx-auto max-w-2xl">
      <header className="mb-6">
        <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-black tracking-[.16em] text-emerald-600">BURNOUT SELF-CHECK</p><h1 className="mt-2 text-xl font-black text-ink sm:text-2xl">번아웃 위험도 테스트</h1></div><strong className="shrink-0 text-sm text-slate-500">{index+1} / 12</strong></div>
        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white shadow-inner" role="progressbar" aria-label="테스트 진행률" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" animate={{width:`${Math.max(progress,4)}%`}} transition={{duration:reduceMotion?0:.35}} /></div>
      </header>

      <AnimatePresence mode="wait">
        <motion.section key={current.id} initial={reduceMotion?false:{opacity:0,x:28}} animate={{opacity:1,x:0}} exit={reduceMotion?undefined:{opacity:0,x:-24}} transition={{duration:.22}} className="rounded-[2rem] border border-white/90 bg-white/90 p-6 shadow-2xl shadow-emerald-100/60 backdrop-blur sm:p-10">
          <div className="flex items-center justify-between"><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">질문 {index+1}</span>{index<3?<span className="text-xs font-bold text-slate-400">공통 점검</span>:branchLabel?<span className="text-xs font-bold text-slate-400">맞춤 질문</span>:null}</div>
          <h2 className="mt-7 min-h-24 text-balance text-2xl font-black leading-[1.45] tracking-tight text-ink sm:text-3xl">{current.text}</h2>
          <div className="mt-8 grid gap-2.5" role="radiogroup" aria-label="답변 선택">
            {choices.map((choice)=><button key={choice.value} type="button" role="radio" aria-checked={selected===choice.value} onClick={()=>select(choice.value)} className={`flex min-h-14 items-center gap-4 rounded-2xl border px-4 text-left text-sm font-bold transition active:scale-[.99] sm:px-5 ${selected===choice.value?"border-emerald-500 bg-emerald-50 text-emerald-800 shadow-md":"border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50"}`}><span className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-black ${selected===choice.value?"bg-emerald-600 text-white":"bg-slate-100 text-slate-500"}`}>{choice.value}</span>{choice.label}</button>)}
          </div>
          {index===11&&<button type="button" onClick={finish} disabled={!canFinish} className="mt-5 min-h-14 w-full rounded-2xl bg-ink px-6 text-base font-black text-white shadow-xl transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40">내 결과 확인하기 →</button>}
        </motion.section>
      </AnimatePresence>

      <div className="mt-5 flex items-center justify-between"><button type="button" onClick={previous} disabled={index===0} className="min-h-12 rounded-xl px-4 text-sm font-bold text-slate-500 transition hover:bg-white disabled:opacity-30">← 이전 질문</button><p className="text-right text-[11px] leading-5 text-slate-400">초반 응답에 따라 질문이 맞춤 조정됩니다.<br/>응답은 서버에 저장되지 않습니다.</p></div>
    </div>
  </main>;
}
