import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CategoryTiles, TEST_CATEGORY_TILES } from "@/components/category/CategoryTiles";
import { TestCard } from "@/components/cards/TestCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { tests } from "@/data/tests";
import { absoluteUrl, createMetadata } from "@/lib/site";

export const metadata = createMetadata({ title: "테스트 카테고리", description: "성격·심리, 연애·관계, 직업·일상, 팬 퀴즈, 건강·운세 카테고리별 테스트를 둘러보세요.", path: "/categories", keywords: ["테스트 카테고리", "심리테스트 목록", "팬 퀴즈"] });

const categoryDescriptions: Record<string, string> = {
  "성격.심리": "성향과 마음의 신호를 살펴보는 성격·심리 테스트",
  "연애.관계": "연애 스타일과 관계 패턴을 알아보는 테스트",
  "직업.일상": "일과 소비, 생활 습관을 점검하는 테스트",
  "팬 퀴즈": "좋아하는 아티스트·팀의 덕력을 확인하는 팬덤 퀴즈",
  "건강.운세": "자가 점검과 오늘의 운세를 담은 테스트",
};

export default function CategoriesPage() {
  return (
    <main className="container-page py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "카테고리" }]} />
      <div className="max-w-2xl">
        <p className="text-sm font-extrabold text-primary">EXPLORE BY CATEGORY</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">관심사별 테스트 찾기</h1>
        <p className="mt-4 leading-7 text-slate-600">지금 궁금한 주제를 고르면 해당 카테고리의 테스트만 모아서 볼 수 있어요.</p>
      </div>
      <div className="mt-8">
        <CategoryTiles />
      </div>
      <div className="mt-12 space-y-14">
        {TEST_CATEGORY_TILES.map(([icon, category]) => {
          const all = tests.filter((test) => test.category === category);
          const items = all.slice(0, 4);
          return (
            <section key={category}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-black text-primary">{icon} CATEGORY</p>
                  <h2 className="mt-2 text-2xl font-black text-ink">
                    {category} <span className="align-middle text-sm font-bold text-slate-400">{all.length}개 테스트</span>
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{categoryDescriptions[category]}</p>
                </div>
                <Link href={`/category/${encodeURIComponent(category)}`} className="w-fit shrink-0 text-sm font-bold text-primary hover:underline">
                  전체 보기 →
                </Link>
              </div>
              <div className="test-card-grid mt-6">{items.map((test) => <TestCard key={test.slug} test={test} />)}</div>
            </section>
          );
        })}
      </div>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "미미테스트 카테고리",
        itemListElement: TEST_CATEGORY_TILES.map(([, category], index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: category,
          url: absoluteUrl(`/category/${encodeURIComponent(category)}`),
        })),
      }} />
    </main>
  );
}
