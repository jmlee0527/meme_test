import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { TestSeoContent } from "@/components/seo/TestSeoContent";
import type { TestDefinition } from "@/lib/types";

export function StandardTestLanding({ test, insight, answerType = "4지선다" }: { test: TestDefinition; insight: string; answerType?: string }) {
  const itemCount = test.itemCount ?? test.questions.length;
  return (
    <div className="container-page py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: test.shortTitle }]} />
      <section className="container-readable overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
        {test.thumbnail ? (
          <div className="relative aspect-[4/3] w-full bg-slate-100 sm:aspect-[16/10]">
            <Image src={test.thumbnail} alt={test.title} fill sizes="(max-width:768px) 100vw, 768px" className="object-cover object-[center_20%]" priority />
          </div>
        ) : (
          <div className="grid min-h-60 place-items-center bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-100"><span className="text-7xl" aria-hidden="true">{test.icon}</span></div>
        )}
        <div className="p-6 sm:p-10">
          <div className="flex gap-2 text-xs font-bold"><Link href={`/category/${encodeURIComponent(test.category)}`} className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">{test.category}</Link><span className="rounded-full bg-slate-100 px-3 py-1 text-slate-500">{test.duration}</span></div>
          <h1 className="mt-5 text-3xl font-black tracking-tight text-ink sm:text-4xl">{test.title}</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">{test.description}</p>
          <ul className="mt-6 grid gap-2 text-sm text-slate-600 sm:grid-cols-3"><li>✓ 총 {itemCount}문항</li><li>✓ {answerType} 간편 응답</li><li>✓ 회원가입 없음</li></ul>
          <Link href={`/tests/${test.slug}?start=1`} className="mt-8 block w-full rounded-2xl bg-primary px-6 py-4 text-center text-base font-extrabold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">무료로 테스트 시작하기</Link>
          <p className="mt-3 text-center text-xs text-slate-400">응답은 서버에 저장되지 않습니다.</p>
        </div>
      </section>
      <section className="container-readable mt-12 rounded-3xl bg-white p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-ink">이 테스트로 알 수 있어요</h2>
        <p className="mt-3 leading-7 text-slate-600">{insight}</p>
      </section>
      <TestSeoContent test={test} itemCount={itemCount} answerType={answerType} />
      <div className="container-readable mt-8 text-center"><Link href="/tests" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 hover:bg-slate-50">다른 테스트 둘러보기</Link></div>
    </div>
  );
}
