"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export function SearchForm({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    const timer = window.setTimeout(() => {
      const normalized = value.trim().replace(/\s+/g, " ");
      router.replace(normalized ? `/search?q=${encodeURIComponent(normalized)}` : "/search", { scroll: false });
    }, 300);
    return () => window.clearTimeout(timer);
  }, [router, value]);

  return <form action="/search" method="get" role="search" className="mt-7 flex gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-card"><label htmlFor="test-search" className="sr-only">테스트 검색어</label><input id="test-search" name="q" type="search" value={value} onChange={(event)=>setValue(event.target.value)} onKeyDown={(event)=>{if(event.key==="Escape"){setValue("");event.currentTarget.blur();}}} placeholder="예: 애착, 직장, RESCENE, 팬 퀴즈" autoComplete="off" className="min-h-12 min-w-0 flex-1 rounded-xl border-0 bg-slate-50 px-4 text-base text-ink outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-primary"/><button type="submit" className="min-h-12 shrink-0 rounded-xl bg-primary px-5 text-sm font-black text-white transition hover:bg-blue-700">검색</button></form>;
}
