import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdInArticle } from "@/components/ads/AdInArticle";
import { BlogCard } from "@/components/cards/BlogCard";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogPosts, getBlogPost } from "@/data/blog";
import { absoluteUrl, createMetadata, siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return blogPosts.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const base = createMetadata({ title: post.title, description: post.description, path: `/blog/${slug}`, keywords: post.keywords, type: "article" });
  return {
    ...base,
    openGraph: {
      type: "article",
      locale: "ko_KR",
      siteName: siteConfig.name,
      title: post.title,
      description: post.description,
      url: absoluteUrl(`/blog/${slug}`),
      images: [{ url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: post.title }],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [siteConfig.name],
      section: post.category,
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);
  return (
    <div className="container-page py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "가이드", href: "/blog" }, { name: post.title }]} />
      <article className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-10 lg:p-12">
        <header><Link href={`/category/${encodeURIComponent(post.category)}`} className="text-sm font-extrabold text-primary">{post.category}</Link><h1 className="mt-4 text-3xl font-black leading-tight tracking-[-0.03em] text-ink sm:text-4xl">{post.title}</h1><p className="mt-5 text-base leading-7 text-slate-600">{post.description}</p><div className="mt-6 flex flex-wrap items-center gap-3 border-b border-slate-100 pb-7 text-xs text-slate-400"><span>&apos;나&apos; 테스트 부스 편집팀</span><span>·</span><time dateTime={post.publishedAt}>{post.publishedAt.replaceAll("-", ". ")}</time><span>·</span><span>{post.readTime} 읽기</span></div></header>
        <div className="prose-buup">{post.sections.map((section,index) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}{index === 0 && <AdInArticle />}</section>)}</div>
        <div className="mt-12 rounded-2xl bg-blue-50 p-5 text-sm leading-6 text-blue-950"><strong>알아두세요.</strong> 수익과 비용은 개인의 상황과 시장 환경에 따라 달라질 수 있습니다. 큰 비용을 지출하기 전에 작은 규모로 충분히 검증하세요.</div>
      </article>
      <section className="mx-auto mt-14 max-w-5xl"><h2 className="text-xl font-black text-ink">함께 읽으면 좋은 글</h2><div className="mt-5 grid gap-4 sm:grid-cols-3">{related.map((item) => <BlogCard key={item.slug} post={item} />)}</div></section>
      <JsonLd data={{ "@context":"https://schema.org", "@type":"Article", headline:post.title, description:post.description, datePublished:post.publishedAt, dateModified:post.updatedAt, inLanguage:"ko-KR", mainEntityOfPage:absoluteUrl(`/blog/${post.slug}`), author:{ "@type":"Organization", name:`${siteConfig.name} 편집팀` }, publisher:{ "@type":"Organization", name:siteConfig.name, url:siteConfig.url }, image:absoluteUrl("/opengraph-image") }} />
    </div>
  );
}
