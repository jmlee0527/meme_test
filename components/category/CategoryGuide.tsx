import Link from "next/link";
import { getArticle, getArticlesByCategory, getRecentArticles } from "@/data/articles";
import type { CategoryLanding } from "@/data/test-discovery";

export function CategoryGuide({ landing }: { landing: CategoryLanding }) {
  const selected = landing.featuredArticles.map(getArticle).filter((article) => article !== undefined);
  const articles = selected.length ? selected : getRecentArticles(getArticlesByCategory(landing.articleCategory ?? "")).slice(0, 2);
  return (
    <section className="paper-card mt-8 p-6 sm:p-8" aria-labelledby="category-guide-title">
      <h2 id="category-guide-title" className="text-xl font-black text-ink">어떤 테스트부터 해볼까요?</h2>
      <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
        {landing.selectionGuide.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      {articles.length > 0 && <div className="mt-6 border-t border-slate-200 pt-5">
        <h3 className="font-bold text-ink">함께 읽으면 좋은 이야기</h3>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {articles.map((article) => <li key={article.slug}><Link href={`/articles/${article.slug}`} className="block rounded-sm bg-slate-50 p-4 hover:text-primary"><span className="font-bold">{article.title}</span><span className="mt-2 block text-sm leading-6 text-slate-600">{article.description}</span></Link></li>)}
        </ul>
        <Link href={`/articles/category/${landing.articleCategory}`} className="mt-4 inline-flex min-h-11 items-center text-sm font-bold text-primary hover:underline">이 주제의 읽을거리 더 보기 →</Link>
      </div>}
    </section>
  );
}
