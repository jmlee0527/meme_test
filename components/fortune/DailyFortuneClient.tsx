"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import {
  FORTUNE_STORAGE_KEY,
  findFortuneCard,
  findFortuneResult,
  getKoreanDateKey,
  isStoredFortune,
  pickFortuneResult,
  selectDailyCards,
  type StoredFortune,
} from "@/lib/fortune-engine";
import type { FortuneCard, FortuneCardId, FortuneResult } from "@/lib/types";

const cardStyles: Record<FortuneCardId, string> = {
  start: "from-rose-400 via-orange-300 to-amber-200",
  chance: "from-violet-500 via-fuchsia-400 to-sky-300",
  rest: "from-indigo-500 via-slate-500 to-blue-300",
  love: "from-pink-500 via-rose-400 to-orange-200",
  focus: "from-blue-500 via-cyan-400 to-teal-200",
  luck: "from-emerald-500 via-lime-300 to-yellow-200",
  change: "from-purple-500 via-sky-400 to-cyan-200",
  growth: "from-green-500 via-emerald-300 to-lime-200",
  balance: "from-slate-500 via-violet-300 to-pink-200",
  courage: "from-orange-500 via-red-400 to-rose-200",
};

const statCards = [
  ["총운", "total"],
  ["금전운", "money"],
  ["연애운", "love"],
  ["일/학업운", "work"],
] as const;

export function DailyFortuneClient() {
  const reduceMotion = useReducedMotion();
  const [dateKey, setDateKey] = useState("");
  const [cards, setCards] = useState<FortuneCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<FortuneCard | null>(null);
  const [result, setResult] = useState<FortuneResult | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [drawCount, setDrawCount] = useState(0);
  const [nativeShared, setNativeShared] = useState(false);

  useEffect(() => {
    const today = getKoreanDateKey();
    setDateKey(today);
    setCards(selectDailyCards(today));

    try {
      const parsed = JSON.parse(localStorage.getItem(FORTUNE_STORAGE_KEY) ?? "null") as unknown;
      if (isStoredFortune(parsed) && parsed.dateKey === today) {
        const storedCard = findFortuneCard(parsed.cardId);
        const storedResult = findFortuneResult(parsed.resultId);
        if (storedCard && storedResult) {
          setSelectedCard(storedCard);
          setResult(storedResult);
          setDrawCount(parsed.drawCount);
        }
      }
    } catch {
      localStorage.removeItem(FORTUNE_STORAGE_KEY);
    }
  }, []);

  const progressText = result ? "오늘의 카드 확인 완료" : "마음이 끌리는 카드 한 장을 골라보세요";
  const shareText = result ? `오늘 내 운세는 ${result.score}점! 당신도 오늘의 운세 카드를 뽑아보세요.` : "오늘의 운세 카드를 뽑아보세요.";

  const saveResult = (card: FortuneCard, fortune: FortuneResult, nextDrawCount: number) => {
    const stored: StoredFortune = { dateKey, cardId: card.id, resultId: fortune.id, drawCount: nextDrawCount };
    localStorage.setItem(FORTUNE_STORAGE_KEY, JSON.stringify(stored));
  };

  const chooseCard = (card: FortuneCard) => {
    if (isRevealing || result) return;
    setSelectedCard(card);
    setIsRevealing(true);
    window.setTimeout(() => {
      const fortune = pickFortuneResult(card.id, `${dateKey}:first-draw`);
      setResult(fortune);
      setDrawCount(1);
      saveResult(card, fortune, 1);
      setIsRevealing(false);
    }, reduceMotion ? 250 : 950);
  };

  const reroll = () => {
    const card = selectedCard ?? cards[0];
    if (!card || !dateKey) return;
    const nextDrawCount = drawCount + 1;
    const fortune = pickFortuneResult(card.id, `${dateKey}:reroll:${nextDrawCount}:${Date.now()}`);
    setSelectedCard(card);
    setResult(fortune);
    setDrawCount(nextDrawCount);
    saveResult(card, fortune, nextDrawCount);
  };

  const resetCards = () => {
    setResult(null);
    setSelectedCard(null);
    setIsRevealing(false);
    setDrawCount(0);
    localStorage.removeItem(FORTUNE_STORAGE_KEY);
  };

  const nativeShare = async () => {
    if (!navigator.share || !result) return;
    await navigator.share({ title: "오늘의 운세 카드 뽑기", text: shareText, url: window.location.href });
    setNativeShared(true);
    window.setTimeout(() => setNativeShared(false), 1400);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <section className="grid gap-8 py-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center sm:py-12">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-xs font-black text-violet-700 shadow-sm backdrop-blur">
            <span className="size-2 animate-pulse rounded-full bg-violet-500" />
            매일 한 번, 가볍게 뽑는 오늘의 운
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-[-0.06em] text-ink sm:text-6xl">
            오늘의 운세
            <span className="block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">카드 뽑기</span>
          </h1>
          <p className="mt-5 text-lg font-bold text-slate-700">오늘 나에게 찾아올 운은?</p>
          <p className="mt-3 max-w-xl leading-7 text-slate-600">카드 한 장을 선택하면 오늘의 운세, 행운 점수, 금전운, 연애운, 일/학업운과 행운 아이템을 확인할 수 있습니다.</p>
          <div className="mt-7 flex flex-wrap gap-2 text-xs font-black text-slate-500">
            {["날짜 기반 추천", "하루 결과 저장", "가벼운 엔터테인먼트", "공유 가능"].map((item) => <span key={item} className="rounded-full bg-white/75 px-3 py-2 shadow-sm backdrop-blur">{item}</span>)}
          </div>
        </motion.div>

        <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.55 }} className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/60 p-5 shadow-2xl shadow-violet-200/60 backdrop-blur-xl sm:p-7">
          <div className="absolute -right-16 -top-16 size-48 rounded-full bg-fuchsia-200/70 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 size-56 rounded-full bg-sky-200/70 blur-3xl" />
          <div className="relative flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black text-violet-500">TODAY CARD</p>
              <h2 className="mt-1 text-xl font-black text-ink">{progressText}</h2>
            </div>
            <div className="rounded-2xl bg-white/80 px-3 py-2 text-right text-xs font-black text-slate-500 shadow-sm">
              <span className="block text-violet-600">{dateKey || "오늘"}</span>
              KST 기준
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div key="cards" exit={{ opacity: 0, y: -16 }} className="relative mt-7">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4">
                  {cards.map((card, index) => {
                    const selected = selectedCard?.id === card.id;
                    const muted = Boolean(selectedCard && !selected);
                    return (
                      <motion.button
                        key={card.id}
                        type="button"
                        onClick={() => chooseCard(card)}
                        disabled={isRevealing}
                        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                        animate={{
                          opacity: muted ? 0.24 : 1,
                          y: reduceMotion ? 0 : [0, index % 2 === 0 ? -6 : 6, 0],
                          scale: selected ? 1.08 : muted ? 0.94 : 1,
                          rotateY: selected && isRevealing ? 180 : 0,
                          filter: muted ? "blur(2px)" : "blur(0px)",
                        }}
                        transition={{
                          opacity: { duration: 0.25 },
                          scale: { type: "spring", stiffness: 280, damping: 22 },
                          rotateY: { duration: 0.72 },
                          y: reduceMotion ? { duration: 0 } : { duration: 3.4 + index * 0.16, repeat: Infinity, ease: "easeInOut" },
                        }}
                        whileHover={reduceMotion || isRevealing ? undefined : { y: -8, scale: 1.03 }}
                        className="group relative min-h-56 overflow-hidden rounded-[1.5rem] border border-white/80 bg-white p-2 text-left shadow-card outline-none transition focus-visible:ring-4 focus-visible:ring-violet-200 sm:min-h-64"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <div className={`relative flex h-full min-h-52 flex-col justify-between overflow-hidden rounded-[1.15rem] bg-gradient-to-br ${cardStyles[card.id]} p-4 text-white shadow-inner sm:min-h-60`}>
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,.55),transparent_24%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,.35),transparent_20%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,.25),transparent_28%)]" />
                          <span className="relative text-2xl font-black opacity-80">{card.symbol}</span>
                          <div className="relative grid place-items-center text-center">
                            <span className="text-5xl drop-shadow-lg sm:text-6xl">{selected && isRevealing ? card.icon : "✦"}</span>
                            <span className="mt-3 rounded-full bg-white/20 px-3 py-1 text-[10px] font-black backdrop-blur">{selected && isRevealing ? card.name : "MIMI FORTUNE"}</span>
                          </div>
                          <div className="relative flex items-center justify-between text-xl opacity-80"><span>☾</span><span>♡</span><span>✧</span></div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
                {isRevealing && <SparkleOverlay />}
                {isRevealing && <p className="mt-6 text-center text-sm font-black text-violet-600">카드가 오늘의 작은 신호를 읽는 중…</p>}
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mt-7">
                <FortuneResultView result={result} card={selectedCard} onReroll={reroll} onReset={resetCards} onNativeShare={nativeShare} nativeShared={nativeShared} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}

function SparkleOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center">
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <motion.span
          key={item}
          initial={{ opacity: 0, scale: 0.4, x: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0.4, 1.6, 0.7], x: (item - 2.5) * 38, y: item % 2 === 0 ? -42 : 34 }}
          transition={{ duration: 0.9, delay: item * 0.08 }}
          className="absolute text-3xl"
        >
          ✨
        </motion.span>
      ))}
    </div>
  );
}

function FortuneResultView({ result, card, onReroll, onReset, onNativeShare, nativeShared }: { result: FortuneResult; card: FortuneCard | null; onReroll: () => void; onReset: () => void; onNativeShare: () => void; nativeShared: boolean }) {
  const shareDescription = `오늘 내 운세는 ${result.score}점! 당신도 오늘의 운세 카드를 뽑아보세요.`;
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(Boolean(navigator.share));
  }, []);

  return (
    <>
      <div className={`relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br ${card ? cardStyles[card.id] : "from-violet-500 via-fuchsia-400 to-rose-300"} p-5 text-white shadow-2xl shadow-violet-200`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,.4),transparent_24%),radial-gradient(circle_at_10%_90%,rgba(255,255,255,.28),transparent_26%)]" />
        <div className="relative grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
          <div className="grid size-28 place-items-center rounded-[2rem] bg-white/20 text-6xl shadow-inner backdrop-blur">{card?.icon ?? "✨"}</div>
          <div>
            <p className="text-xs font-black tracking-[.22em] text-white/70">TODAY RESULT</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.05em]">{result.grade}</h2>
            <p className="mt-2 text-sm font-semibold text-white/85">{card?.name ?? "오늘의 카드"} · {card?.description ?? "오늘의 작은 행운을 확인해보세요."}</p>
          </div>
        </div>
        <div className="relative mt-6 rounded-[1.4rem] bg-white/18 p-5 backdrop-blur">
          <div className="flex items-end justify-between">
            <span className="text-sm font-black text-white/75">오늘의 행운 점수</span>
            <strong className="text-5xl font-black tracking-[-0.06em]">{result.score}<span className="text-2xl">점</span></strong>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/20">
            <motion.div initial={{ width: 0 }} animate={{ width: `${result.score}%` }} transition={{ duration: 0.75, ease: "easeOut" }} className="h-full rounded-full bg-white" />
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {statCards.map(([label, key]) => <InfoCard key={key} label={label} text={result[key]} />)}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <LuckyChip label="행운의 색상" value={result.luckyColor} icon="🎨" />
        <LuckyChip label="행운의 숫자" value={`${result.luckyNumber}`} icon="🔢" />
        <LuckyChip label="행운 아이템" value={result.luckyItem} icon="🎁" />
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-amber-100 bg-amber-50 p-5">
        <p className="text-xs font-black text-amber-600">조심할 점</p>
        <p className="mt-2 text-sm font-bold leading-6 text-slate-700">{result.caution}</p>
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-violet-100 bg-white p-5 text-center shadow-sm">
        <p className="text-xs font-black text-violet-500">오늘의 한마디</p>
        <p className="mt-2 text-lg font-black text-ink">“{result.message}”</p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button type="button" onClick={onReroll} className="min-h-12 rounded-2xl bg-ink px-5 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5">다시 뽑기</button>
        <button type="button" onClick={onReset} className="min-h-12 rounded-2xl bg-white px-5 text-sm font-black text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5">다른 카드 고르기</button>
      </div>

      <section id="share-card" className="mt-7 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-card">
        <h3 className="text-lg font-black text-ink">오늘 운세 공유하기</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">가볍게 저장하거나 친구에게 링크를 보내보세요.</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-[.85fr_1.15fr]">
          <ShareImageCard emoji={card?.icon ?? "✨"} eyebrow="오늘의 운세" title={`${result.score}점 · ${result.grade}`} subtitle={result.message} badge={card?.name ?? "미미 운세"} accent="purple" />
          <div className="flex flex-col justify-center gap-3">
            <ShareButtons title="오늘의 운세 카드 뽑기" description={shareDescription} path="/fortune/today" />
            {canNativeShare && <button type="button" onClick={onNativeShare} className="min-h-12 rounded-xl bg-violet-600 px-4 text-sm font-black text-white transition hover:bg-violet-700">{nativeShared ? "공유 완료!" : "기기 공유하기"}</button>}
          </div>
        </div>
      </section>
      <MobileShareDock />
    </>
  );
}

function InfoCard({ label, text }: { label: string; text: string }) {
  return <div className="rounded-[1.35rem] border border-slate-100 bg-white p-5 shadow-sm"><p className="text-xs font-black text-violet-500">{label}</p><p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{text}</p></div>;
}

function LuckyChip({ label, value, icon }: { label: string; value: string; icon: string }) {
  return <div className="rounded-[1.35rem] border border-white bg-white/80 p-4 text-center shadow-sm backdrop-blur"><span className="text-2xl">{icon}</span><p className="mt-2 text-[10px] font-black text-slate-400">{label}</p><p className="mt-1 font-black text-ink">{value}</p></div>;
}
