import Link from "next/link";
import { SiteBrand } from "@/components/brand/SiteBrand";
import { siteConfig } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[4.25rem] max-w-6xl items-center justify-between px-5 py-2 lg:px-8">
        <Link
          href="/"
          className="rounded-xl transition hover:opacity-90 focus-visible:outline-offset-4"
          aria-label={`${siteConfig.name} 홈`}
        >
          <SiteBrand />
        </Link>
        <nav className="flex items-center gap-1 text-sm font-semibold text-slate-600" aria-label="주요 메뉴">
          <Link className="rounded-lg px-3 py-2 transition hover:bg-slate-100 hover:text-ink" href="/tests">
            테스트
          </Link>
          <Link className="rounded-lg px-3 py-2 transition hover:bg-slate-100 hover:text-ink" href="/blog">
            가이드
          </Link>
          <Link className="hidden rounded-lg px-3 py-2 transition hover:bg-slate-100 hover:text-ink sm:block" href="/about">
            소개
          </Link>
        </nav>
      </div>
    </header>
  );
}
