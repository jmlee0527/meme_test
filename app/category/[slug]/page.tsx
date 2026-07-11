import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/cards/BlogCard";
import { TestCard } from "@/components/cards/TestCard";
import { CategoryTiles } from "@/components/category/CategoryTiles";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { blogCategories, blogPosts } from "@/data/blog";
import { tests } from "@/data/tests";
import { createMetadata } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
const categories = [...new Set([...blogCategories, ...tests.map((test) => test.category)])];
export function generateStaticParams() { return categories.map((slug) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = decodeURIComponent(slug);
  return createMetadata({ title: `${category} 테스트와 가이드`, description: `${category}에 관한 무료 테스트와 현실적인 시작 가이드를 모아보세요.`, path: `/category/${encodeURIComponent(category)}`, keywords: [`${category} 테스트`, `${category} 가이드`] });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = decodeURIComponent(slug);
  if (!categories.includes(category)) notFound();
  const matchingTests = tests.filter((test) => test.category === category);
  const matchingPosts = blogPosts.filter((post) => post.category === category);
  return (
    <div className="container-page py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: category }]} />
      <h1 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">{category}</h1>
      <p className="mt-3 text-slate-600">{category}에 관한 테스트와 실용적인 가이드를 모았습니다.</p>
      <div className="mt-8"><CategoryTiles activeCategory={category} /></div>
      {matchingTests.length > 0 && <section className="mt-10"><h2 className="text-xl font-black text-ink">테스트</h2><div className="test-card-grid mt-5">{matchingTests.map((test) => <TestCard key={test.slug} test={test} />)}</div></section>}
      {matchingPosts.length > 0 && <section className="mt-12"><h2 className="text-xl font-black text-ink">가이드</h2><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{matchingPosts.map((post) => <BlogCard key={post.slug} post={post} />)}</div></section>}
    </div>
  );
}
