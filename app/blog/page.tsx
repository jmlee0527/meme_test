import { BlogCard } from "@/components/cards/BlogCard";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { blogCategories, blogPosts } from "@/data/blog";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({ title: "부업 가이드", description: "부업을 고르고 시작하고 성장시키는 데 필요한 현실적인 정보와 실행 가이드를 읽어보세요.", path: "/blog", keywords: ["부업 정보", "부업 가이드", "부업 블로그"] });

export default function BlogPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "가이드" }]} />
      <div className="max-w-2xl"><p className="text-sm font-extrabold text-primary">BUUP GUIDE</p><h1 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">실행에 도움 되는 부업 가이드</h1><p className="mt-4 leading-7 text-slate-600">과장된 수익 약속 대신, 시작 전에 알아야 할 비용과 시간, 위험 요소를 꼼꼼히 정리합니다.</p></div>
      <div className="mt-8 flex flex-wrap gap-2"><a href="/blog" className="rounded-full bg-ink px-4 py-2 text-xs font-bold text-white">전체</a>{blogCategories.map((category) => <a key={category} href={`/category/${encodeURIComponent(category)}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 hover:border-blue-200 hover:text-primary">{category}</a>)}</div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{blogPosts.map((post) => <BlogCard key={post.slug} post={post} />)}</div>
    </div>
  );
}
