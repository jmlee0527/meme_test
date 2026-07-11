import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CategoryTiles, TEST_CATEGORY_TILES } from "@/components/category/CategoryTiles";
import { TestCard } from "@/components/cards/TestCard";
import { tests } from "@/data/tests";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({ title: "테스트 카테고리", description: "성격·심리, 연애·관계, 직업·일상, 팬 퀴즈, 건강·운세 카테고리별 테스트를 둘러보세요.", path: "/categories", keywords: ["테스트 카테고리", "심리테스트 목록", "팬 퀴즈"] });

export default function CategoriesPage() {
  return <main className="container-page py-10 sm:py-14"><Breadcrumbs items={[{ name: "카테고리" }]} /><div className="max-w-2xl"><p className="text-sm font-extrabold text-primary">EXPLORE BY CATEGORY</p><h1 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">관심사별 테스트 찾기</h1><p className="mt-4 leading-7 text-slate-600">지금 궁금한 주제를 고르면 해당 카테고리의 테스트만 모아서 볼 수 있어요.</p></div><div className="mt-8"><CategoryTiles /></div><div className="mt-12 space-y-14">{TEST_CATEGORY_TILES.map(([icon, category]) => { const items=tests.filter(test=>test.category===category).slice(0,4); return <section key={category}><div className="flex items-end justify-between gap-3"><div><p className="text-sm font-black text-primary">{icon} CATEGORY</p><h2 className="mt-2 text-2xl font-black text-ink">{category}</h2></div><Link href={`/category/${encodeURIComponent(category)}`} className="text-sm font-bold text-primary hover:underline">전체 보기 →</Link></div><div className="test-card-grid mt-6">{items.map(test=><TestCard key={test.slug} test={test}/>)}</div></section>; })}</div></main>;
}
