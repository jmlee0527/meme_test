import { TestCard } from "@/components/cards/TestCard";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { tests } from "@/data/tests";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({ title: "테스트 목록", description: "부업, 성격, 직업, 소비와 투자 성향 등 나를 발견하는 무료 테스트를 만나보세요.", path: "/tests", keywords: ["무료 테스트", "성향 테스트"] });

const testCategories = [...new Set(tests.map((test) => test.category))];

export default function TestsPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "테스트" }]} />
      <div className="max-w-2xl"><p className="text-sm font-extrabold text-primary">DISCOVER YOURSELF</p><h1 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">나를 발견하는 테스트</h1><p className="mt-4 leading-7 text-slate-600">짧고 명확한 질문에 답하고, 지금의 나에게 유용한 힌트를 얻어보세요. 새로운 테스트가 계속 추가됩니다.</p></div>
      <nav className="scrollbar-none -mx-4 mt-7 flex gap-2 overflow-x-auto px-4 pb-1 min-[480px]:-mx-5 min-[480px]:px-5 md:mx-0 md:px-0" aria-label="테스트 카테고리">
        <a href="#all-tests" className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-ink px-4 text-sm font-bold text-white">전체</a>
        {testCategories.map((category) => <a key={category} href={`/category/${encodeURIComponent(category)}`} className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-slate-200 bg-white px-4 text-sm font-bold text-slate-600 transition hover:border-blue-200 hover:text-primary">{category}</a>)}
      </nav>
      <div id="all-tests" className="test-card-grid mt-8 scroll-mt-24">{tests.map((test) => <TestCard key={test.slug} test={test} />)}</div>
    </div>
  );
}
