"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { REACTION_ROUNDS, averageReactionMs, getReactionGrade, randomWaitMs } from "@/lib/reaction-time-engine";

type Phase = "start" | "waiting" | "ready" | "tooSoon" | "roundResult" | "finishing";

export function ReactionTimeTestPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("start");
  const [round, setRound] = useState(1);
  const [lastMs, setLastMs] = useState<number | null>(null);
  // 측정값은 리렌더링과 무관하게 ref에 보관해 오차를 줄입니다.
  const roundsRef = useRef<number[]>([]);
  const greenAtRef = useRef(0);
  const timeoutRef = useRef(0);
  const lockRef = useRef(false);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  // 초록 배경이 실제로 화면에 그려진 직후를 측정 시작점으로 잡습니다.
  useEffect(() => {
    if (phase !== "ready") return;
    const frame = requestAnimationFrame(() => {
      greenAtRef.current = performance.now();
    });
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  // 측정 중 스크롤·당겨서 새로고침을 차단합니다.
  useEffect(() => {
    if (phase === "start") return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [phase]);

  const startRound = useCallback(() => {
    setPhase("waiting");
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setPhase("ready"), randomWaitMs());
  }, []);

  const handleTap = () => {
    if (lockRef.current) return;
    if (phase === "waiting") {
      window.clearTimeout(timeoutRef.current);
      setPhase("tooSoon");
      return;
    }
    if (phase === "tooSoon") {
      startRound();
      return;
    }
    if (phase === "ready") {
      const elapsed = Math.max(1, Math.round(performance.now() - greenAtRef.current));
      roundsRef.current = [...roundsRef.current, elapsed];
      setLastMs(elapsed);
      setPhase("roundResult");
      lockRef.current = true;
      window.setTimeout(() => {
        lockRef.current = false;
        if (roundsRef.current.length >= REACTION_ROUNDS) {
          setPhase("finishing");
          const rounds = roundsRef.current;
          const grade = getReactionGrade(averageReactionMs(rounds));
          router.push(`/reaction-time-test/result/${grade.slug}?r=${rounds.join("-")}`);
        } else {
          setRound(roundsRef.current.length + 1);
          startRound();
        }
      }, 850);
    }
  };

  if (phase === "start") {
    return (
      <main className="min-h-[calc(100vh-5rem)] bg-[radial-gradient(circle_at_top,#ffedd5_0,#f8fafc_45%,#f8fafc_100%)] py-10 sm:py-16">
        <div className="container-page mx-auto max-w-2xl">
          <section className="rounded-[2rem] border border-white/90 bg-white/90 p-8 text-center shadow-2xl shadow-orange-100/60 backdrop-blur sm:p-12">
            <p className="text-xs font-black tracking-[.16em] text-orange-500">REACTION TIME TEST</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">나의 반응속도는 몇 초일까?</h1>
            <div className="mx-auto mt-6 grid max-w-md gap-3 text-left">
              <div className="flex items-start gap-3 rounded-2xl bg-rose-50 px-4 py-3.5"><span className="mt-0.5 size-3 shrink-0 rounded-full bg-rose-500" aria-hidden="true" /><p className="text-sm font-bold leading-6 text-rose-900">빨간 화면에서는 <strong>기다리세요.</strong> 언제 바뀔지는 매번 랜덤입니다.</p></div>
              <div className="flex items-start gap-3 rounded-2xl bg-green-50 px-4 py-3.5"><span className="mt-0.5 size-3 shrink-0 rounded-full bg-green-500" aria-hidden="true" /><p className="text-sm font-bold leading-6 text-green-900">화면이 <strong>초록색으로 바뀌는 순간</strong> 최대한 빠르게 터치하세요.</p></div>
              <div className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3.5"><span className="mt-0.5 text-base leading-none" aria-hidden="true">📊</span><p className="text-sm font-bold leading-6 text-slate-700">총 <strong>3번 측정</strong>하여 평균 반응속도(ms)를 계산합니다.</p></div>
            </div>
            <button type="button" onClick={startRound} className="mt-8 w-full max-w-md rounded-2xl bg-ink px-6 py-4 text-base font-black text-white shadow-xl transition hover:bg-slate-800 active:scale-[.99]">테스트 시작</button>
            <p className="mt-4 text-xs text-slate-400">초록색 전에 터치하면 해당 회차는 다시 진행됩니다.</p>
          </section>
        </div>
      </main>
    );
  }

  const screens: Record<Exclude<Phase, "start">, { className: string; content: React.ReactNode }> = {
    waiting: {
      className: "bg-rose-600",
      content: (
        <>
          <p className="text-4xl font-black sm:text-5xl">기다려주세요...</p>
          <p className="mt-4 text-sm font-bold text-white/70">초록색으로 바뀌면 바로 터치!</p>
        </>
      ),
    },
    ready: {
      className: "bg-green-500",
      content: <p className="text-5xl font-black sm:text-6xl">지금 터치!</p>,
    },
    tooSoon: {
      className: "bg-slate-800",
      content: (
        <>
          <p className="text-4xl font-black sm:text-5xl">너무 빨랐어요!</p>
          <p className="mt-4 text-base font-bold text-white/80">초록색으로 바뀐 후 터치해주세요.</p>
          <p className="mt-10 animate-pulse text-sm font-bold text-white/60">화면을 터치하면 이 회차를 다시 시작합니다</p>
        </>
      ),
    },
    roundResult: {
      className: "bg-ink",
      content: (
        <>
          <p className="text-sm font-black tracking-[.2em] text-white/60">{roundsRef.current.length}회차 기록</p>
          <p className="mt-3 text-7xl font-black tabular-nums sm:text-8xl">{lastMs}<span className="text-3xl font-extrabold text-white/70">ms</span></p>
          {roundsRef.current.length < REACTION_ROUNDS && <p className="mt-8 text-sm font-bold text-white/60">잠시 후 다음 측정이 시작됩니다...</p>}
        </>
      ),
    },
    finishing: {
      className: "bg-ink",
      content: <p className="text-2xl font-black text-white/80">평균 계산 중...</p>,
    },
  };

  const screen = screens[phase];

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="반응속도 측정 영역"
      onPointerDown={(event) => {
        event.preventDefault();
        handleTap();
      }}
      onKeyDown={(event) => {
        if (event.key === " " || event.key === "Enter") handleTap();
      }}
      onContextMenu={(event) => event.preventDefault()}
      className={`fixed inset-0 z-[70] flex select-none flex-col items-center justify-center overscroll-none px-6 text-center text-white transition-none ${screen.className}`}
      style={{ touchAction: "none", WebkitTapHighlightColor: "transparent" }}
    >
      <div className="pointer-events-none absolute top-6 flex w-full items-center justify-center gap-2" aria-hidden="true">
        {Array.from({ length: REACTION_ROUNDS }, (_, roundIndex) => (
          <span key={roundIndex} className={`h-1.5 w-10 rounded-full ${roundIndex < roundsRef.current.length ? "bg-white" : roundIndex === roundsRef.current.length && phase !== "finishing" ? "bg-white/60" : "bg-white/25"}`} />
        ))}
      </div>
      <p className="pointer-events-none absolute top-10 text-xs font-black tracking-[.2em] text-white/50" aria-hidden="true">ROUND {Math.min(round, REACTION_ROUNDS)} / {REACTION_ROUNDS}</p>
      {screen.content}
    </div>
  );
}
