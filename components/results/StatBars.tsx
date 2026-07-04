"use client";

import { motion, useReducedMotion } from "framer-motion";

export function StatBars({ stats }: { stats: { label: string; value: number }[] }) {
  const reduceMotion = useReducedMotion();
  return <div className="space-y-5">{stats.map((stat) => <div key={stat.label}><div className="mb-2 flex items-center justify-between text-sm font-bold"><span className="text-slate-700">{stat.label}</span><span className="text-primary">{stat.value}%</span></div><div className="h-3 overflow-hidden rounded-full bg-slate-100"><motion.div className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" initial={reduceMotion ? { width: `${stat.value}%` } : { width: 0 }} whileInView={{ width: `${stat.value}%` }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }} /></div></div>)}</div>;
}
