"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { mentalAgeDomains, type MentalAgeScores } from "@/data/mental-age";
import { calculateMentalAge, calculateMentalAgeScores, createMentalAgeInsight, formatAgeDifference, selectMentalAgeQuestions, type MentalAgeSessionQuestion } from "@/lib/mental-age-engine";

type Screen = "intro" | "questions" | "analysing" | "result";
const storageKey = "mimi-mental-age-seed";
const track = (name: string) => {
  if (typeof window === "undefined") return;
  (window as Window & { gtag?: (command: string, event: string) => void }).gtag?.("event", name);
};

function newSeed() {
  if (typeof window === "undefined") return Date.now();
  const value = new Uint32Array(1);
  window.crypto?.getRandomValues?.(value);
  return value[0] || Date.now();
}

export function MentalAgeTestPage() {
  const reduceMotion = useReducedMotion();
  const [screen, setScreen] = useState<Screen>("intro");
  const [actualAge, setActualAge] = useState("");
  const [ageError, setAgeError] = useState("");
  const [questions, setQuestions] = useState<MentalAgeSessionQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [index, setIndex] = useState(0);
  const [resultState, setResultState] = useState<{ age: number; scores: MentalAgeScores; stable: number; vital: number } | null>(null);
  const [showAllScores, setShowAllScores] = useState(false);

  const begin = () => {
    const parsedAge = actualAge === "" ? null : Number(actualAge);
    if (actualAge !== "" && (parsedAge === null || !Number.isInteger(parsedAge) || parsedAge < 10 || parsedAge > 99)) {
      setAgeError("실제 나이는 만 10세부터 99세 사이의 숫자로 입력해 주세요.");
      return;
    }
    const seed = newSeed();
    window.sessionStorage.setItem(storageKey, String(seed));
    setQuestions(selectMentalAgeQuestions(seed));
    setAnswers({});
    setIndex(0);
    setResultState(null);
    setAgeError("");
    setScreen("questions");
    track("mental_age_test_start");
  };

  const choose = (questionId: string, optionId: string) => {
    const next = { ...answers, [questionId]: optionId };
    setAnswers(next);
    track("mental_age_question_answer");
    if (index < questions.length - 1) window.setTimeout(() => setIndex((value) => value + 1), reduceMotion ? 0 : 180);
  };

  const complete = () => {
    if (Object.keys(answers).length !== questions.length) return;
    setScreen("analysing");
    window.setTimeout(() => {
      const scores = calculateMentalAgeScores(questions, answers);
      const calculated = calculateMentalAge(scores);
      setResultState({ age: calculated.age, scores, stable: calculated.stable, vital: calculated.vital });
      setScreen("result");
      track("mental_age_test_complete");
    }, reduceMotion ? 0 : 850);
  };

  const restart = () => {
    window.sessionStorage.removeItem(storageKey);
    setActualAge("");
    setQuestions([]);
    setAnswers({});
    setIndex(0);
    setResultState(null);
    setScreen("intro");
    track("mental_age_test_restart");
  };

  if (screen === "intro") return <Intro age={actualAge} setAge={setActualAge} error={ageError} onStart={begin} />;
  if (screen === "analysing") return <Analysing />;
  if (screen === "result" && resultState) return <MentalAgeResult actualAge={actualAge === "" ? null : Number(actualAge)} {...resultState} onRestart={restart} onShare={() => track("mental_age_result_share")} />;
  const current = questions[index];
  if (!current) return null;
  const selected = answers[current.id];
  const options = current.optionOrder.map((id) => current.options.find((option) => option.id === id)).filter(Boolean) as typeof current.options;
  const progress = Math.round(((index + 1) / questions.length) * 100);
  return <main className="min-h-[calc(100vh-5rem)] bg-[radial-gradient(circle_at_top,#ede9fe_0,#f8fafc_48%,#f8fafc_100%)] py-6 sm:py-12"><div className="container-page max-w-2xl">
    <header className="mb-6"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-black tracking-[.16em] text-violet-700">MENTAL AGE TEST</p><h1 className="mt-2 text-xl font-black text-ink sm:text-2xl">나의 정신연령은 몇 살일까?</h1></div><strong className="shrink-0 text-sm text-slate-500">{index + 1} / {questions.length}</strong></div><div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white shadow-inner" role="progressbar" aria-label="정신연령 테스트 진행률" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><motion.div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" animate={{ width: `${progress}%` }} transition={{ duration: reduceMotion ? 0 : 0.3 }} /></div></header>
    <AnimatePresence mode="wait"><motion.section key={current.id} initial={reduceMotion ? false : { opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -18 }} transition={{ duration: 0.2 }} className="rounded-[2rem] border border-white/90 bg-white/95 p-6 shadow-2xl shadow-violet-100/80 backdrop-blur sm:p-10"><div className="flex items-center justify-between gap-4"><span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-black text-violet-700">일상 속 선택</span><span className="text-right text-xs font-bold text-slate-400">가장 가까운 반응을 골라 주세요</span></div><h2 className="mt-7 min-h-28 text-balance text-2xl font-black leading-[1.45] tracking-tight text-ink sm:text-3xl">{current.prompt}</h2><div className="mt-8 grid gap-2.5" role="radiogroup" aria-label="답변 선택">{options.map((option, optionIndex) => <button key={option.id} type="button" role="radio" aria-checked={selected === option.id} onClick={() => choose(current.id, option.id)} className={`flex min-h-16 items-center gap-4 rounded-2xl border px-4 text-left text-sm font-bold transition active:scale-[.99] sm:px-5 ${selected === option.id ? "border-violet-500 bg-violet-50 text-violet-950" : "border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:bg-violet-50/60"}`}><span className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-black ${selected === option.id ? "bg-violet-700 text-white" : "bg-slate-100 text-slate-500"}`}>{optionIndex + 1}</span>{option.text}</button>)}</div>{index === questions.length - 1 && <button type="button" onClick={complete} disabled={!selected} className="mt-5 min-h-14 w-full rounded-2xl bg-slate-950 px-6 text-base font-black text-white shadow-xl transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40">결과 분석하기 →</button>}</motion.section></AnimatePresence>
    <div className="mt-5 flex items-center justify-between"><button type="button" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0} className="min-h-12 rounded-xl px-4 text-sm font-bold text-slate-500 transition hover:bg-white disabled:opacity-30">← 이전 질문</button><p className="text-right text-[11px] leading-5 text-slate-400">응답과 실제 나이는 서버에 저장되지 않습니다.</p></div>
  </div></main>;
}

function Intro({ age, setAge, error, onStart }: { age: string; setAge: (value: string) => void; error: string; onStart: () => void }) {
  return <main className="min-h-[calc(100vh-5rem)] bg-[radial-gradient(circle_at_top,#f5f3ff_0,#f8fafc_52%,#f8fafc_100%)] py-8 sm:py-14"><div className="container-page max-w-2xl"><section className="overflow-hidden rounded-[2rem] border border-violet-100 bg-white shadow-card"><div className="bg-gradient-to-br from-violet-700 via-indigo-600 to-fuchsia-600 px-6 py-10 text-center text-white sm:px-10"><span className="grid mx-auto size-20 place-items-center rounded-[1.75rem] bg-white/15 text-5xl">🧠</span><p className="mt-5 text-xs font-black tracking-[.2em] text-white/70">MENTAL AGE TEST</p><h1 className="mt-3 text-3xl font-black tracking-[-.05em] sm:text-5xl">나의 정신연령은<br />몇 살일까?</h1><p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/85 sm:text-base">일상 속 선택을 바탕으로 현재의 사고방식을 재미있게 살펴봐요.</p></div><div className="p-6 sm:p-10"><label htmlFor="mental-age" className="text-base font-black text-ink">실제 나이 <span className="font-medium text-slate-400">(선택)</span></label><p className="mt-2 text-sm leading-6 text-slate-500">입력하면 결과에서 사고방식 이미지와의 차이를 보여드려요. 생년월일은 수집하지 않아요.</p><div className="mt-4 flex gap-3"><input id="mental-age" inputMode="numeric" pattern="[0-9]*" maxLength={2} value={age} onChange={(event) => setAge(event.target.value.replace(/\D/g, ""))} placeholder="만 10~99세" className="min-h-14 w-full rounded-2xl border border-slate-200 px-4 text-base font-bold outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100" aria-describedby="mental-age-help" /><span className="flex min-h-14 items-center text-sm font-bold text-slate-500">세</span></div><p id="mental-age-help" className="mt-2 text-xs text-slate-400">비워두어도 바로 테스트할 수 있습니다.</p>{error && <p className="mt-2 text-sm font-bold text-rose-600" role="alert">{error}</p>}<button type="button" onClick={onStart} className="mt-7 min-h-14 w-full rounded-2xl bg-violet-700 px-6 text-base font-black text-white shadow-lg shadow-violet-200 transition hover:bg-violet-800">15개 질문 시작하기 →</button><div className="mt-5 rounded-2xl bg-slate-50 p-4 text-xs leading-6 text-slate-500">이 테스트는 생활 습관과 성향을 바탕으로 현재의 사고방식을 재미있게 분석하는 콘텐츠입니다. 의학적·심리학적 진단이나 실제 지능 및 발달 수준을 측정하는 검사가 아니며, 자기 이해와 재미를 위한 참고 자료로 활용해 주세요.</div></div></section></div></main>;
}

function Analysing() { return <main className="grid min-h-[calc(100vh-5rem)] place-items-center bg-[radial-gradient(circle_at_top,#ede9fe_0,#f8fafc_52%,#f8fafc_100%)] p-5"><section className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-2xl shadow-violet-100"><motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} className="mx-auto grid size-16 place-items-center rounded-full border-4 border-violet-100 border-t-violet-600 text-2xl">✨</motion.div><h1 className="mt-6 text-2xl font-black text-ink">사고방식을 분석하고 있어요</h1><p className="mt-3 text-sm leading-7 text-slate-500">감정 반응과 일상 속 선택 패턴을 살펴본 뒤, 가장 가까운 나이 이미지를 찾고 있어요.</p></section></main>; }

function MentalAgeResult({ actualAge, age, scores, stable, vital, onRestart, onShare }: { actualAge: number | null; age: number; scores: MentalAgeScores; stable: number; vital: number; onRestart: () => void; onShare: () => void }) {
  const calculated = calculateMentalAge(scores);
  const profile = calculated.result;
  const insight = createMentalAgeInsight(scores, stable, vital);
  const difference = formatAgeDifference(actualAge, age);
  const visibleDomains = [...mentalAgeDomains].sort(([left], [right]) => scores[right] - scores[left]);
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? visibleDomains : visibleDomains.slice(0, 5);
  const shareTitle = `내 정신연령은 ${age}세! ${profile.title}이래요. 당신의 정신연령도 확인해 보세요.`;
  return <main className="bg-[radial-gradient(circle_at_top,#ede9fe_0,#f8fafc_42%,#f8fafc_100%)] py-8 pb-28 sm:py-14"><div className="container-page max-w-3xl"><section className="overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl shadow-violet-200"><div className="bg-[radial-gradient(circle_at_75%_25%,#c4b5fd_0,transparent_31%),linear-gradient(135deg,#312e81,#6d28d9_58%,#db2777)] p-7 text-center sm:p-12"><span className="grid mx-auto size-24 place-items-center rounded-[2rem] bg-white/15 text-6xl">{profile.emoji}</span><p className="mt-6 text-xs font-black tracking-[.22em] text-violet-200">나의 정신연령은</p><h1 className="mt-2 text-5xl font-black tracking-[-.07em] sm:text-7xl">{age}세</h1><p className="mt-5 text-xl font-black sm:text-2xl">{profile.title}</p><p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/80">{profile.shortDescription}</p>{difference && <p className="mx-auto mt-6 max-w-md rounded-2xl bg-white/12 px-4 py-3 text-sm font-bold text-white/90">{difference}</p>}</div></section>
    <section className="mt-7 rounded-[2rem] border border-violet-100 bg-white p-6 shadow-card sm:p-9"><p className="text-xs font-black tracking-[.18em] text-violet-700">WHY THIS RESULT</p><h2 className="mt-2 text-2xl font-black text-ink">이 결과가 나온 이유</h2><p className="mt-5 leading-8 text-slate-700">{profile.fullDescription} {insight.text}</p></section>
    <section className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-9"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-black tracking-[.18em] text-violet-700">THINKING PROFILE</p><h2 className="mt-2 text-2xl font-black text-ink">핵심 성향</h2></div><div className="text-right text-xs font-bold text-slate-500">안정·숙고 {stable}%<br />활력·탐색 {vital}%</div></div><div className="mt-7 space-y-5">{displayed.map(([key, label]) => <div key={key}><div className="flex items-end justify-between gap-4"><strong className="text-sm text-slate-700">{label}</strong><strong className="text-violet-700">{scores[key]}%</strong></div><div className="mt-2.5 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" style={{ width: `${scores[key]}%` }} /></div></div>)}</div><button type="button" onClick={() => setShowAll((value) => !value)} className="mt-6 min-h-11 rounded-xl bg-violet-50 px-4 text-sm font-bold text-violet-700">{showAll ? "핵심 5개만 보기" : "10개 지표 자세히 보기"}</button></section>
    <section className="mt-7 grid gap-5 md:grid-cols-2"><article className="rounded-[2rem] border border-emerald-100 bg-emerald-50/65 p-6 sm:p-8"><h2 className="text-xl font-black text-emerald-950">이 성향의 강점</h2><ul className="mt-5 space-y-3">{profile.strengths.map((item) => <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-emerald-900"><span>✓</span>{item}</li>)}</ul></article><article className="rounded-[2rem] border border-amber-100 bg-amber-50/65 p-6 sm:p-8"><h2 className="text-xl font-black text-amber-950">이럴 때는 살펴보기</h2><ul className="mt-5 space-y-3">{profile.cautions.map((item) => <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-amber-900"><span>•</span>{item}</li>)}</ul></article></section>
    <section className="mt-7 grid gap-4 sm:grid-cols-2"><InfoCard title="인간관계" text={profile.relationship} /><InfoCard title="연애 성향" text={profile.dating} /><InfoCard title="업무·학업 성향" text={profile.workStyle} /><InfoCard title="스트레스 상황" text={profile.stressResponse} /></section>
    <section className="mt-7 rounded-[2rem] border border-violet-100 bg-violet-50/70 p-6 sm:p-9"><h2 className="text-2xl font-black text-violet-950">나에게 맞는 다음 한 걸음</h2><p className="mt-4 leading-8 text-violet-950/80">{profile.growthTip}</p><p className="mt-3 text-sm leading-7 text-violet-900/70">잘 맞는 관계 스타일: {profile.compatibleStyle}</p></section>
    <section id="share-card" className="mt-8 grid scroll-mt-24 gap-6 rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><ShareImageCard emoji={profile.emoji} eyebrow="나의 정신연령은" title={`${age}세 · ${profile.title}`} subtitle={profile.shortDescription} badge="일상 선택으로 알아본 사고방식" accent="purple" /><div><h2 className="text-xl font-black">결과 공유하기</h2><p className="mt-2 text-sm leading-6 text-slate-300">서로의 결과를 비교하며 어떤 생활 리듬이 잘 맞는지 이야기해 보세요.</p><div className="mt-5" onClick={onShare}><ShareButtons title={shareTitle} description={profile.shortDescription} path="/tests/mental-age" /></div></div></section>
    <p className="mx-auto mt-7 max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 text-center text-xs leading-6 text-slate-500">이 테스트는 생활 습관과 성향을 바탕으로 현재의 사고방식을 재미있게 분석하는 콘텐츠입니다. 의학적·심리학적 진단이나 실제 지능 및 발달 수준을 측정하는 검사가 아니며, 자기 이해와 재미를 위한 참고 자료로 활용해 주세요.</p><div className="mt-8 flex flex-col gap-3 text-center sm:flex-row sm:justify-center"><button type="button" onClick={onRestart} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700 hover:bg-slate-50">새 문항으로 다시 하기</button><Link href="/tests" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-violet-700 px-5 text-sm font-bold text-white hover:bg-violet-800">다른 테스트 보기</Link></div>
  </div><MobileShareDock /></main>;
}

function InfoCard({ title, text }: { title: string; text: string }) { return <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-card"><h2 className="text-base font-black text-ink">{title}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{text}</p></article>; }
