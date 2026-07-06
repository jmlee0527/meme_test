import type { MetadataRoute } from "next";
import { blogPosts, blogCategories } from "@/data/blog";
import { tests } from "@/data/tests";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/tests"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/fortune/today"), lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terms"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];
  const testRoutes: MetadataRoute.Sitemap = tests.filter((test) => !test.href).map((test) => ({ url: absoluteUrl(`/tests/${test.slug}`), lastModified: now, changeFrequency: "monthly", priority: 0.8 }));
  const resultSlugs = [...new Set(tests.flatMap((test)=>test.resultSlugs))];
  const resultRoutes: MetadataRoute.Sitemap = resultSlugs.map((slug) => ({ url: absoluteUrl(`/result/${slug}`), lastModified: now, changeFrequency: "monthly", priority: 0.6 }));
  const postRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({ url: absoluteUrl(`/blog/${post.slug}`), lastModified: new Date(post.updatedAt), changeFrequency: "monthly", priority: 0.75 }));
  const categoryRoutes: MetadataRoute.Sitemap = [...new Set([...blogCategories, ...tests.map((test) => test.category)])].map((category) => ({ url: absoluteUrl(`/category/${encodeURIComponent(category)}`), lastModified: now, changeFrequency: "weekly", priority: 0.6 }));
  return [...staticRoutes, ...testRoutes, ...resultRoutes, ...postRoutes, ...categoryRoutes];
}
