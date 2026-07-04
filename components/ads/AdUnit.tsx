"use client";

import { useEffect } from "react";

declare global { interface Window { adsbygoogle?: Record<string, unknown>[] } }

type AdUnitProps = { slot?: string; format?: "auto" | "rectangle" | "fluid"; className?: string; label?: string };

export function AdUnit({ slot, format = "auto", className = "", label = "광고" }: AdUnitProps) {
  useEffect(() => {
    if (!slot) return;
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch { /* 광고 차단 환경에서도 페이지는 정상 동작합니다. */ }
  }, [slot]);

  if (!slot) return null;
  return (
    <aside className={`my-8 overflow-hidden text-center ${className}`} aria-label={label}>
      <span className="mb-2 block text-[10px] tracking-widest text-slate-400">ADVERTISEMENT</span>
      <ins className="adsbygoogle block" data-ad-client="ca-pub-7299086820204972" data-ad-slot={slot} data-ad-format={format} data-full-width-responsive="true" />
    </aside>
  );
}
