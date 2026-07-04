"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { getHeroCopyVariant, getHeroCta, heroSharedCopy } from "@/lib/hero-copy";

const previews = [
  { icon: "💰", label: "부업 추천", color: "from-blue-500 to-indigo-500" },
  { icon: "🐯", label: "회사 동물", color: "from-orange-400 to-rose-500" },
  { icon: "💍", label: "결혼 시기", color: "from-violet-500 to-indigo-600" },
  { icon: "🧠", label: "숨은 재능", color: "from-teal-500 to-emerald-600" },
  { icon: "📈", label: "승진 유형", color: "from-indigo-500 to-blue-600" },
  { icon: "💕", label: "연애 스타일", color: "from-rose-500 to-pink-600" },
];

const copy = getHeroCopyVariant();
const primaryCta = getHeroCta();
const descriptionLines = heroSharedCopy.description.split("\n");

export function HeroExperience() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-white/70 bg-[radial-gradient(circle_at_15%_20%,#dbeafe_0,transparent_34%),radial-gradient(circle_at_85%_12%,#fce7f3_0,transparent_30%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
      <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-300/20 blur-3xl" />
      <div className="container-page relative grid min-h-[700px] items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center lg:text-left"
        >
          <span className="glass-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black text-rose-600">
            {heroSharedCopy.badge}
          </span>

          <h1 className="mt-7 text-[2.6rem] font-black leading-[1.12] tracking-[-0.055em] text-ink sm:text-6xl lg:text-[4.25rem]">
            {copy.headline}
            <span className="mt-4 block text-[.62em] leading-[1.25] tracking-[-0.04em]">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                {copy.accent}
              </span>
              {copy.tagline && (
                <>
                  <br />
                  <span className="text-slate-700">{copy.tagline}</span>
                </>
              )}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base font-medium leading-8 text-slate-600 lg:mx-0 sm:text-lg">
            {descriptionLines.map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href={primaryCta.href}
              data-hero-cta={primaryCta.key}
              className="group inline-flex min-h-14 items-center justify-center rounded-2xl bg-primary px-8 text-base font-black text-white shadow-xl shadow-blue-300/50 transition hover:-translate-y-1 hover:bg-blue-700"
            >
              <span>{primaryCta.label}</span>
              <span className="ml-2 transition group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </Link>
            <Link
              href="/tests"
              className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/80 bg-white/70 px-8 text-base font-extrabold text-slate-700 shadow-lg shadow-slate-200/60 backdrop-blur transition hover:-translate-y-1 hover:bg-white"
            >
              {heroSharedCopy.secondaryCta}
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-bold text-slate-500 lg:justify-start">
            {heroSharedCopy.trustSignals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
        </motion.div>

        <div className="relative mx-auto h-[460px] w-full max-w-lg" aria-label="테스트 미리보기">
          <motion.div
            className="absolute left-1/2 top-1/2 grid size-48 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[3rem] border border-white/80 bg-white/60 text-center shadow-2xl shadow-blue-200/50 backdrop-blur-xl sm:size-56"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div>
              <span className="text-6xl" aria-hidden="true">
                ✨
              </span>
              <p className="mt-3 text-sm font-black text-ink">새로운 나를 발견</p>
              <p className="mt-1 text-xs text-slate-500">오늘은 어떤 테스트?</p>
            </div>
          </motion.div>
          {previews.map((item, index) => {
            const positions = [
              "left-0 top-1 sm:left-3",
              "right-0 top-10",
              "left-0 top-36",
              "right-0 top-52",
              "bottom-10 left-2 sm:left-8",
              "bottom-0 right-0 sm:right-7",
            ];
            return (
              <motion.div
                key={item.label}
                className={`absolute ${positions[index]} flex items-center gap-2 rounded-2xl border border-white/80 bg-white/80 p-2.5 pr-4 shadow-xl shadow-slate-300/30 backdrop-blur-xl`}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: [0, -9, 0] }}
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: { delay: 0.35 + index * 0.08, duration: 0.35 },
                        y: { delay: index * 0.28, duration: 3.5 + index * 0.2, repeat: Infinity, ease: "easeInOut" },
                      }
                }
              >
                <span className={`grid size-10 place-items-center rounded-xl bg-gradient-to-br ${item.color} text-xl shadow-md`}>
                  {item.icon}
                </span>
                <span className="text-xs font-black text-ink sm:text-sm">{item.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
