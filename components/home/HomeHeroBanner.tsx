"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { HomeBanner } from "@/data/home-banners";

const SLIDE_INTERVAL_MS = 5200;

export function HomeHeroBanner({ banners }: { banners: HomeBanner[] }) {
  const items = banners.slice(0, 3);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % items.length), SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-card" aria-roledescription="carousel" aria-label="홈 광고 배너">
      <div className="relative aspect-[16/9] overflow-hidden rounded-[1.35rem] bg-slate-100">
        {items.map((banner, index) => {
          const isActive = active === index;
          const content = (
            <>
              <Image
                src={banner.image}
                alt={banner.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className={`object-cover transition duration-700 ${isActive ? "scale-100 opacity-100" : "scale-[1.02] opacity-0"}`}
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/62 via-slate-950/20 to-transparent" aria-hidden="true" />
              <div className="absolute inset-y-0 left-0 flex w-[72%] max-w-md flex-col justify-center p-5 text-white sm:p-8">
                <p className="text-xs font-black tracking-[.18em] text-white/75">MIMI TEST</p>
                <h2 className="mt-3 text-2xl font-black leading-tight sm:text-4xl">{banner.title}</h2>
                <p className="mt-3 line-clamp-2 text-sm font-bold leading-6 text-white/86">{banner.subtitle}</p>
                {banner.href && <span className="mt-5 inline-flex min-h-10 w-fit items-center rounded-xl bg-white px-4 text-sm font-black text-slate-950">바로 보기 →</span>}
              </div>
            </>
          );

          return (
            <div key={banner.id} aria-hidden={!isActive} className={`absolute inset-0 transition ${isActive ? "pointer-events-auto" : "pointer-events-none"}`}>
              {banner.href ? (
                <Link href={banner.href} className="block h-full focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[-4px] focus-visible:outline-white">
                  {content}
                </Link>
              ) : content}
            </div>
          );
        })}
      </div>

      {items.length > 1 && (
        <div className="absolute bottom-5 right-5 flex gap-1.5 rounded-full bg-white/88 px-2 py-1.5 shadow-sm backdrop-blur" role="tablist" aria-label="배너 선택">
          {items.map((banner, index) => (
            <button
              key={banner.id}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-label={`${index + 1}번째 배너 보기: ${banner.title}`}
              onClick={() => setActive(index)}
              className="size-2.5 rounded-full bg-slate-300 transition aria-[selected=true]:w-6 aria-[selected=true]:bg-primary"
            />
          ))}
        </div>
      )}
    </section>
  );
}
