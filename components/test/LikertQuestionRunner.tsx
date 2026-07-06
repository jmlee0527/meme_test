"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Question={id:string;text:string};
const choices=[{value:1,label:"전혀 아니다"},{value:2,label:"아니다"},{value:3,label:"보통이다"},{value:4,label:"그렇다"},{value:5,label:"매우 그렇다"}];
const tones={
  indigo:{page:"bg-[radial-gradient(circle_at_top,#e0e7ff_0,#f8fafc_45%,#f8fafc_100%)]",text:"text-indigo-700",soft:"bg-indigo-50 text-indigo-700",selected:"border-indigo-500 bg-indigo-50 text-indigo-900",hover:"hover:border-indigo-300 hover:bg-indigo-50/60",bar:"from-indigo-500 to-violet-500",shadow:"shadow-indigo-100/70"},
  emerald:{page:"bg-[radial-gradient(circle_at_top,#d1fae5_0,#f8fafc_45%,#f8fafc_100%)]",text:"text-emerald-700",soft:"bg-emerald-50 text-emerald-700",selected:"border-emerald-500 bg-emerald-50 text-emerald-900",hover:"hover:border-emerald-300 hover:bg-emerald-50/60",bar:"from-emerald-500 to-teal-500",shadow:"shadow-emerald-100/70"},
};

export function LikertQuestionRunner({title,eyebrow,questions,onComplete,tone="indigo",footer="응답은 서버에 저장되지 않습니다."}:{title:string;eyebrow:string;questions:Question[];onComplete:(answers:number[])=>void;tone?:keyof typeof tones;footer?:string}){
  const reduceMotion=useReducedMotion();
  const [answers,setAnswers]=useState<number[]>([]);
  const [index,setIndex]=useState(0);
  const colors=tones[tone];
  const current=questions[index];
  const selected=answers[index];
  const complete=answers.length===questions.length&&answers.every(Boolean);
  const select=(value:number)=>{const next=answers.slice(0,index);next[index]=value;setAnswers(next);if(index<questions.length-1)window.setTimeout(()=>setIndex((value)=>value+1),reduceMotion?0:180);};
  if(!current)return null;
  return <main className={`min-h-[calc(100vh-5rem)] py-6 sm:py-12 ${colors.page}`}><div className="container-page mx-auto max-w-2xl">
    <header className="mb-6"><div className="flex items-end justify-between gap-4"><div><p className={`text-xs font-black tracking-[.16em] ${colors.text}`}>{eyebrow}</p><h1 className="mt-2 text-xl font-black text-ink sm:text-2xl">{title}</h1></div><strong className="shrink-0 text-sm text-slate-500">{index+1} / {questions.length}</strong></div><div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white shadow-inner" role="progressbar" aria-label="테스트 진행률" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(((index+1)/questions.length)*100)}><motion.div className={`h-full rounded-full bg-gradient-to-r ${colors.bar}`} animate={{width:`${((index+1)/questions.length)*100}%`}} transition={{duration:reduceMotion?0:.3}} /></div></header>
    <AnimatePresence mode="wait"><motion.section key={current.id} initial={reduceMotion?false:{opacity:0,x:24}} animate={{opacity:1,x:0}} exit={reduceMotion?undefined:{opacity:0,x:-20}} transition={{duration:.2}} className={`rounded-[2rem] border border-white/90 bg-white/95 p-6 shadow-2xl backdrop-blur sm:p-10 ${colors.shadow}`}><div className="flex items-center justify-between"><span className={`rounded-full px-3 py-1.5 text-xs font-black ${colors.soft}`}>질문 {index+1}</span><span className="text-xs font-bold text-slate-400">가장 가까운 답을 선택하세요</span></div><h2 className="mt-7 min-h-24 text-balance text-2xl font-black leading-[1.45] tracking-tight text-ink sm:text-3xl">{current.text}</h2><div className="mt-8 grid gap-2.5" role="radiogroup" aria-label="답변 선택">{choices.map((choice)=><button key={choice.value} type="button" role="radio" aria-checked={selected===choice.value} onClick={()=>select(choice.value)} className={`flex min-h-14 items-center gap-4 rounded-2xl border px-4 text-left text-sm font-bold transition active:scale-[.99] sm:px-5 ${selected===choice.value?colors.selected:`border-slate-200 bg-white text-slate-700 ${colors.hover}`}`}><span className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-black ${selected===choice.value?"bg-slate-900 text-white":"bg-slate-100 text-slate-500"}`}>{choice.value}</span>{choice.label}</button>)}</div>{index===questions.length-1&&<button type="button" onClick={()=>complete&&onComplete(answers)} disabled={!complete} className="mt-5 min-h-14 w-full rounded-2xl bg-ink px-6 text-base font-black text-white shadow-xl transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40">분석 결과 확인하기 →</button>}</motion.section></AnimatePresence>
    <div className="mt-5 flex items-center justify-between"><button type="button" onClick={()=>setIndex((value)=>Math.max(0,value-1))} disabled={index===0} className="min-h-12 rounded-xl px-4 text-sm font-bold text-slate-500 transition hover:bg-white disabled:opacity-30">← 이전 질문</button><p className="text-right text-[11px] leading-5 text-slate-400">{footer}</p></div>
  </div></main>;
}
