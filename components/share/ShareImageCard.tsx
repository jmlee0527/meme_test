"use client";

import { useRef, useState } from "react";

const gradients = {
  blue: "from-blue-600 to-indigo-700",
  orange: "from-orange-500 to-rose-600",
  pink: "from-rose-500 to-violet-600",
  purple: "from-violet-600 to-indigo-700",
} as const;

type Props = { emoji: string; eyebrow: string; title: string; subtitle: string; badge: string; accent?: keyof typeof gradients };

export function ShareImageCard({ emoji, eyebrow, title, subtitle, badge, accent = "blue" }: Props) {
  const exportRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const download = async () => {
    if (!exportRef.current || status === "loading") return;
    setStatus("loading");
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(exportRef.current, { cacheBust: true, pixelRatio: 1 });
      const link = document.createElement("a");
      link.download = `mimi-test-${title.replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
      setStatus("idle");
    } catch { setStatus("error"); }
  };

  return (
    <div>
      <div className={`overflow-hidden rounded-2xl bg-gradient-to-br ${gradients[accent]} p-5 text-center text-white shadow-lg`}>
        <div className="mx-auto grid size-20 place-items-center rounded-2xl bg-white/15 text-5xl backdrop-blur">{emoji}</div>
        <p className="mt-4 text-[10px] font-black tracking-[.18em] text-white/70">{eyebrow}</p><p className="mt-1 text-2xl font-black">{title}</p><p className="mt-2 text-xs text-white/80">{subtitle}</p><span className="mt-4 inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-black text-ink">{badge}</span>
      </div>
      <button type="button" onClick={download} disabled={status === "loading"} className="mt-3 flex min-h-12 w-full items-center justify-center rounded-xl bg-white px-4 text-sm font-black text-ink shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60">{status === "loading" ? "카드 만드는 중…" : status === "error" ? "다시 눌러 PNG 저장" : "인스타 공유 카드 PNG 저장"}</button>
      <div className="pointer-events-none fixed -left-[9999px] top-0" aria-hidden="true"><div ref={exportRef} style={{ width: 1080, height: 1350 }} className={`relative flex flex-col items-center justify-center bg-gradient-to-br ${gradients[accent]} p-24 text-center text-white`}><div style={{ width: 300, height: 300 }} className="grid place-items-center rounded-[80px] bg-white/15 text-[240px]">{emoji}</div><p className="mt-20 text-4xl font-black tracking-[.2em] text-white/70">{eyebrow}</p><p className="mt-8 text-8xl font-black leading-tight">{title}</p><p className="mt-10 max-w-3xl text-4xl leading-normal text-white/85">{subtitle}</p><span className="mt-16 rounded-full bg-white px-12 py-6 text-4xl font-black text-slate-900">{badge}</span><p className="absolute bottom-16 text-3xl font-black text-white/65">미미테스트</p></div></div>
    </div>
  );
}
