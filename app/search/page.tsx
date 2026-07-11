import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { TestCard } from "@/components/cards/TestCard";
import { tests } from "@/data/tests";
import { createMetadata } from "@/lib/site";
import { SearchForm } from "@/components/search/SearchForm";

export const metadata: Metadata = {
  ...createMetadata({
    title: "테스트 검색",
    description: "키워드로 미미테스트의 심리, 성격, 연애, 직장, 팬 퀴즈를 검색해 보세요.",
    path: "/search",
    keywords: ["테스트 검색", "심리테스트 찾기", "무료 테스트"],
  }),
  robots: { index: false, follow: true },
};

type Props = { searchParams: Promise<{ q?: string }> };

const normalize = (value: string) => value.trim().replace(/\s+/g, " ").toLocaleLowerCase("ko-KR");

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = normalize(q);
  const results = query
    ? tests.filter((test) => normalize([
        test.title,
        test.shortTitle,
        test.cardTitle ?? "",
        test.description,
        test.category,
        ...(test.keywords ?? []),
      ].join(" ")).includes(query))
    : [];

  return (
    <main className="container-page py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "테스트 검색" }]} />
      <section className="mx-auto max-w-3xl">
        <p className="text-sm font-extrabold text-primary">FIND YOUR TEST</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">어떤 테스트를 찾고 있나요?</h1>
        <p className="mt-4 leading-7 text-slate-600">테스트 이름이나 관심 키워드를 입력해 보세요. 성격, 연애, 직장, 팬 퀴즈처럼 카테고리 이름으로도 검색할 수 있습니다.</p>
        <SearchForm initialQuery={q} />
      </section>

      {query ? (
        <section className="mt-10" aria-live="polite">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div><p className="text-sm font-bold text-slate-500">‘{q.trim()}’ 검색 결과</p><h2 className="mt-1 text-2xl font-black text-ink">{results.length}개의 테스트를 찾았어요</h2></div>
            <Link href="/categories" className="text-sm font-bold text-primary hover:underline">전체 카테고리 보기 →</Link>
          </div>
          {results.length > 0 ? <div className="test-card-grid mt-7">{results.map((test) => <TestCard key={test.slug} test={test} />)}</div> : <div className="mt-7 rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-card"><span className="text-5xl" aria-hidden="true">🔍</span><h2 className="mt-5 text-xl font-black text-ink">일치하는 테스트가 없어요</h2><p className="mt-2 text-sm leading-6 text-slate-500">검색어를 짧게 바꾸거나 카테고리에서 직접 둘러보세요.</p><Link href="/categories" className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-slate-950 px-5 text-sm font-black text-white">카테고리 둘러보기</Link></div>}
        </section>
      ) : <section className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center"><span className="text-5xl" aria-hidden="true">✨</span><h2 className="mt-4 text-xl font-black text-ink">키워드를 입력하면 바로 찾아드려요</h2><div className="mt-5 flex flex-wrap justify-center gap-2">{["성격", "연애", "직장", "팬 퀴즈"].map((keyword) => <Link key={keyword} href={`/search?q=${encodeURIComponent(keyword)}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 hover:border-primary hover:text-primary">{keyword}</Link>)}</div></section>}
    </main>
  );
}
