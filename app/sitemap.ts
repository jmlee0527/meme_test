import type { MetadataRoute } from "next";
import { blogPosts, blogCategories } from "@/data/blog";
import { resultProfiles, tests } from "@/data/tests";
import { animalProfiles } from "@/data/office-animals";
import { marriageResultProfiles } from "@/data/marriage-timing";
import { kkondaeResultProfiles } from "@/data/kkondae-power";
import { foodWorldcupItems } from "@/data/food-worldcup";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/tests"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terms"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];
  const testRoutes: MetadataRoute.Sitemap = tests.map((test) => ({ url: absoluteUrl(`/tests/${test.slug}`), lastModified: now, changeFrequency: "monthly", priority: 0.9 }));
  const resultRoutes: MetadataRoute.Sitemap = [...resultProfiles, ...animalProfiles, ...marriageResultProfiles, ...kkondaeResultProfiles, ...foodWorldcupItems.map((item)=>({slug:item.resultSlug}))].map((result) => ({ url: absoluteUrl(`/result/${result.slug}`), lastModified: now, changeFrequency: "monthly", priority: 0.65 }));
  const postRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({ url: absoluteUrl(`/blog/${post.slug}`), lastModified: new Date(post.updatedAt), changeFrequency: "monthly", priority: 0.75 }));
  const categoryRoutes: MetadataRoute.Sitemap = [...new Set([...blogCategories, ...tests.map((test) => test.category)])].map((category) => ({ url: absoluteUrl(`/category/${encodeURIComponent(category)}`), lastModified: now, changeFrequency: "weekly", priority: 0.6 }));
  return [...staticRoutes, ...testRoutes, ...resultRoutes, ...postRoutes, ...categoryRoutes];
}
