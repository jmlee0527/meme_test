"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { TestDefinition } from "@/lib/types";

const accentClasses = {
  blue: "from-blue-100 via-sky-50 to-indigo-100 text-blue-700",
  orange: "from-orange-100 via-amber-50 to-rose-100 text-orange-700",
  pink: "from-pink-100 via-rose-50 to-fuchsia-100 text-pink-700",
  purple: "from-violet-100 via-purple-50 to-indigo-100 text-violet-700",
  green: "from-emerald-100 via-green-50 to-teal-100 text-emerald-700",
  indigo: "from-indigo-100 via-blue-50 to-violet-100 text-indigo-700",
  teal: "from-teal-100 via-cyan-50 to-emerald-100 text-teal-700",
} as const;

export function TestCard({ test, rank }: { test: TestDefinition; rank?: number }) {
  const reduceMotion = useReducedMotion();
  const href = test.href ?? `/tests/${test.slug}`;
  const countLabel = test.type === "worldcup" ? `${test.itemCount}강` : test.type === "fortune" ? `${test.itemCount ?? 5}장 카드` : test.type === "calculator" ? "이름 2개" : `${test.itemCount ?? test.questions.length}문항`;
  return (
    <motion.article whileHover={reduceMotion ? undefined : { y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 320, damping: 24 }} className="group relative overflow-hidden rounded-[1.75rem] border border-white bg-white shadow-card transition-shadow duration-300 hover:shadow-2xl hover:shadow-slate-300/50">
      {rank && <span className="absolute left-4 top-4 z-10 grid size-10 place-items-center rounded-2xl border border-white/80 bg-white/85 text-lg font-black shadow-md backdrop-blur" aria-label={`인기 ${rank}위`}>{["🥇","🥈","🥉"][rank-1] ?? rank}</span>}
      <Link href={href} className="block">
        <div className={`relative grid aspect-[4/3] place-items-center overflow-hidden bg-gradient-to-br ${accentClasses[test.accent]}`}>
          <div className="absolute -right-12 -top-12 size-44 rounded-full bg-white/55 blur-2xl" /><div className="absolute -bottom-16 -left-12 size-48 rounded-full bg-white/45 blur-3xl" />
          <span className="relative text-7xl drop-shadow-lg transition duration-500 group-hover:scale-110 group-hover:-rotate-3 sm:text-8xl" aria-hidden="true">{test.icon}</span>
          {test.isNew && <span className="absolute right-4 top-4 rounded-full bg-ink px-3 py-1.5 text-[10px] font-black tracking-wider text-white">NEW</span>}
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className={`rounded-full bg-slate-100 px-3 py-1 ${accentClasses[test.accent].split(" ").at(-1)}`}>{test.category}</span>
            <span className="text-slate-400">{test.duration}</span>
          </div>
          <h3 className="mt-4 text-xl font-black tracking-tight text-ink transition group-hover:text-primary">{test.cardTitle ?? test.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{test.description}</p>
          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-400"><span>{countLabel}</span><span>참여자 {test.participants.toLocaleString("ko-KR")}명</span></div>
        </div>
      </Link>
    </motion.article>
  );
}
