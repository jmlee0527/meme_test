import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TestCard } from "@/components/cards/TestCard";
import { CategoryTiles } from "@/components/category/CategoryTiles";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { tests } from "@/data/tests";
import { createMetadata } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
const categories = [...new Set(tests.map((test) => test.category))];
export function generateStaticParams() { return categories.map((slug) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = decodeURIComponent(slug);
  return createMetadata({ title: `${category} 테스트`, description: `${category}에 관한 무료 테스트를 모아보세요.`, path: `/category/${encodeURIComponent(category)}`, keywords: [`${category} 테스트`] });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = decodeURIComponent(slug);
  if (!categories.some((item) => item === category)) notFound();
  const matchingTests = tests.filter((test) => test.category === category);
  const description =
    category === "팬 퀴즈"
      ? "진짜 팬들은 안다! 찐팬임을 인증하는 테스트입니다."
      : `${category}에 관한 테스트입니다.`;
  return (
    <div className="container-page py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: category }]} />
      <h1 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">{category}</h1>
      <p className="mt-3 text-slate-600">{description}</p>
      <div className="mt-8"><CategoryTiles activeCategory={category} /></div>
      {matchingTests.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-black text-ink">테스트</h2>
          <div className="test-card-grid mt-5">{matchingTests.map((test) => <TestCard key={test.slug} test={test} />)}</div>
        </section>
      )}
    </div>
  );
}
