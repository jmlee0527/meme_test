import Link from "next/link";
import type { BlogPost } from "@/lib/types";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-blue-200 sm:p-6">
      <div className="flex items-center gap-2 text-xs font-bold text-primary"><span>{post.category}</span><span className="text-slate-300">·</span><span className="text-slate-400">{post.readTime}</span></div>
      <h3 className="mt-3 text-lg font-extrabold leading-snug tracking-tight text-ink"><Link href={`/blog/${post.slug}`} className="hover:text-primary">{post.title}</Link></h3>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{post.description}</p>
      <time className="mt-4 block text-xs text-slate-400" dateTime={post.publishedAt}>{post.publishedAt.replaceAll("-", ". ")}</time>
    </article>
  );
}
