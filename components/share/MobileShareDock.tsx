export function MobileShareDock() {
  return <a href="#share-card" className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-30 flex min-h-12 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center justify-center rounded-2xl bg-ink px-6 text-sm font-black text-white shadow-2xl shadow-slate-500/40 transition active:scale-[.98] lg:hidden">결과 공유하기 <span className="ml-2" aria-hidden="true">↗</span></a>;
}
