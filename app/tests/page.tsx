import { TestCard } from "@/components/cards/TestCard";
import { CategoryTiles } from "@/components/category/CategoryTiles";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { tests } from "@/data/tests";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({ title: "테스트 목록", description: "부업, 성격, 직업, 소비와 투자 성향 등 나를 발견하는 무료 테스트를 만나보세요.", path: "/tests", keywords: ["무료 테스트", "성향 테스트"] });

export default function TestsPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "테스트" }]} />
      <div className="max-w-2xl">
        <p className="text-sm font-extrabold text-primary">DISCOVER YOURSELF</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">나를 발견하는 테스트</h1>
        <p className="mt-4 leading-7 text-slate-600">짧고 명확한 질문에 답하고, 지금의 나에게 유용한 힌트를 얻어보세요. 새로운 테스트가 계속 추가됩니다.</p>
      </div>
      <div className="mt-8"><CategoryTiles /></div>
      <div id="all-tests" className="test-card-grid mt-8 scroll-mt-24">{tests.map((test) => <TestCard key={test.slug} test={test} />)}</div>
    </div>
  );
}
