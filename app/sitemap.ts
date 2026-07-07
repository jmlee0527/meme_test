import type { MetadataRoute } from "next";
import { blogPosts, blogCategories } from "@/data/blog";
import { tests } from "@/data/tests";
import { joseonResultProfiles } from "@/data/joseon-destiny";
import { countryResultProfiles } from "@/data/personality-country";
import { loverResultProfiles } from "@/data/lover-score";
import { colorPersonalityProfiles } from "@/data/color-personality";
import { enneagramProfiles } from "@/data/enneagram";
import { eqResultProfiles } from "@/data/eq-test";
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
  const joseonResultRoutes: MetadataRoute.Sitemap = joseonResultProfiles.map((profile) => ({ url: absoluteUrl(`/joseon-destiny-test/result/${profile.slug}`), lastModified: now, changeFrequency: "monthly", priority: 0.65 }));
  const countryResultRoutes: MetadataRoute.Sitemap = countryResultProfiles.map((profile) => ({ url: absoluteUrl(`/personality-country-test/result/${profile.slug}`), lastModified: now, changeFrequency: "monthly", priority: 0.65 }));
  const loverResultRoutes: MetadataRoute.Sitemap = loverResultProfiles.map((profile) => ({ url: absoluteUrl(`/lover-score-test/result/${profile.slug}`), lastModified: now, changeFrequency: "monthly", priority: 0.7 }));
  const colorResultRoutes: MetadataRoute.Sitemap = colorPersonalityProfiles.map((profile) => ({ url: absoluteUrl(`/color-personality-test/${profile.slug}`), lastModified: now, changeFrequency: "monthly", priority: 0.7 }));
  const enneagramResultRoutes: MetadataRoute.Sitemap = enneagramProfiles.map((profile) => ({ url: absoluteUrl(`/enneagram/${profile.slug}`), lastModified: now, changeFrequency: "monthly", priority: 0.7 }));
  const eqResultRoutes: MetadataRoute.Sitemap = eqResultProfiles.map((profile) => ({ url: absoluteUrl(`/eq-test/result/${profile.slug}`), lastModified: now, changeFrequency: "monthly", priority: 0.7 }));
  const postRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({ url: absoluteUrl(`/blog/${post.slug}`), lastModified: new Date(post.updatedAt), changeFrequency: "monthly", priority: 0.75 }));
  const categoryRoutes: MetadataRoute.Sitemap = [...new Set([...blogCategories, ...tests.map((test) => test.category)])].map((category) => ({ url: absoluteUrl(`/category/${encodeURIComponent(category)}`), lastModified: now, changeFrequency: "weekly", priority: 0.6 }));
  return [...staticRoutes, ...testRoutes, ...resultRoutes, ...joseonResultRoutes, ...countryResultRoutes, ...loverResultRoutes, ...colorResultRoutes, ...enneagramResultRoutes, ...eqResultRoutes, ...postRoutes, ...categoryRoutes];
}
