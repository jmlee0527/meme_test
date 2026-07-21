"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiteBrand } from "@/components/brand/SiteBrand";
import { siteConfig } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const trackNav = (destination: string) => (window as Window & { gtag?: (command:string,event:string,params?:Record<string,string>)=>void }).gtag?.("event", "nav_click", { destination });
  const current = (key: "home" | "categories" | "search") => key === "home" ? pathname === "/" : key === "categories" ? pathname === "/categories" || pathname === "/tests" || pathname.startsWith("/category/") || pathname.startsWith("/tests/") : pathname === "/search";
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="container-page flex min-h-[4.25rem] items-center justify-between py-2">
        <Link
          href="/"
          className="rounded-xl transition hover:opacity-90 focus-visible:outline-offset-4"
          aria-label={`${siteConfig.name} 홈`}
        >
          <SiteBrand />
        </Link>
        <nav className="flex items-center gap-0.5 text-xs font-semibold text-slate-600 sm:gap-1 sm:text-sm" aria-label="주요 메뉴">
          <Link onClick={() => trackNav("home")} aria-current={current("home") ? "page" : undefined} className="rounded-lg px-2 py-2 transition hover:bg-slate-100 hover:text-ink aria-[current=page]:bg-slate-100 aria-[current=page]:text-ink sm:px-3" href="/">
            홈
          </Link>
          <Link onClick={() => trackNav("categories")} aria-current={current("categories") ? "page" : undefined} className="rounded-lg px-2 py-2 transition hover:bg-slate-100 hover:text-ink aria-[current=page]:bg-slate-100 aria-[current=page]:text-ink sm:px-3" href="/categories">
            카테고리
          </Link>
          <Link onClick={() => trackNav("search")} aria-current={current("search") ? "page" : undefined} className="rounded-lg px-2 py-2 transition hover:bg-slate-100 hover:text-ink aria-[current=page]:bg-slate-100 aria-[current=page]:text-ink sm:px-3" href="/search" aria-label="테스트 검색">
            검색
          </Link>
        </nav>
      </div>
    </header>
  );
}
