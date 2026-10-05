import Link from "next/link";
import { getArticle, getArticlesForTest } from "@/data/articles";
import { categoryLandings, getDiscoveryMetadata } from "@/data/test-discovery";
import { getTest } from "@/data/tests";

export function RelatedArticlesForTest({ testSlug }: { testSlug: string }) {
  const test = getTest(testSlug);
  const explicit = test ? (getDiscoveryMetadata(test).relatedArticles ?? []).map(getArticle).filter((article) => article !== undefined) : [];
  const related = [...explicit, ...getArticlesForTest(testSlug)].filter((article, index, all) => all.findIndex((item) => item.slug === article.slug) === index).slice(0, 4);
  if (!test) return null;
  const articleCategory = categoryLandings[test.category].articleCategory;
  if (!related.length) return <aside className="container-readable mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-600"><p>결과를 일상에서 해석하는 데 도움이 되는 이야기도 살펴보세요.</p><Link href={articleCategory ? `/articles/category/${articleCategory}` : "/articles"} className="mt-2 inline-flex min-h-11 items-center font-bold text-primary hover:underline">이 주제의 읽을거리 보기 →</Link></aside>;
  return (
    <section className="paper-card mx-auto mt-8 max-w-3xl p-6 sm:p-8" aria-labelledby={`related-articles-${testSlug}`}>
      <p className="text-sm font-black text-primary">함께 읽어보세요</p>
      <h2 id={`related-articles-${testSlug}`} className="mt-2 text-xl font-black text-ink">관련 읽을거리</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">{related.map((article) => <Link key={article.slug} href={`/articles/${article.slug}`} className="rounded-sm border border-[#353535]/20 bg-[#f4f1df] p-5 transition hover:-translate-y-0.5 hover:border-[#4267A8]"><span className="font-extrabold text-ink">{article.title}</span><span className="mt-2 block text-sm leading-6 text-slate-600">{article.description}</span></Link>)}</div>
    </section>
  );
}
