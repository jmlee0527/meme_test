import type { MetadataRoute } from "next";
import { blogPosts, blogCategories } from "@/data/blog";
import { tests } from "@/data/tests";
import { joseonResultProfiles } from "@/data/joseon-destiny";
import { countryResultProfiles } from "@/data/personality-country";
import { loverResultProfiles } from "@/data/lover-score";
import { jealousyGradeProfiles } from "@/data/jealousy-test";
import { colorPersonalityProfiles } from "@/data/color-personality";
import { enneagramProfiles } from "@/data/enneagram";
import { eqResultProfiles } from "@/data/eq-test";
import { bigFiveResultProfiles } from "@/data/big-five";
import { footballGradeProfiles } from "@/data/football-quiz";
import { worldCupWinnerGradeProfiles } from "@/data/worldcup-winners";
import { reactionGradeProfiles } from "@/data/reaction-time";
import { mbtiTypeProfiles } from "@/data/mbti";
import { sbtiTypeProfiles } from "@/data/sbti";
import { stressGradeProfiles } from "@/data/stress-test";
import { cvsResultProfiles } from "@/data/convenience-store";
import { snsResultProfiles } from "@/data/sns-type";
import { burgerBrandProfiles } from "@/data/burger-brand";
import { wizardCharacterProfiles } from "@/data/wizard-character";
import { coffeeBrandProfiles } from "@/data/coffee-brand";
import { selfEsteemLevelProfiles } from "@/data/self-esteem";
import { adhdLevelProfiles } from "@/data/adhd-screening";
import { dementiaLevelProfiles } from "@/data/dementia-risk";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // lastModified는 실제 갱신일을 아는 라우트(블로그, 매일 갱신되는 운세)에만 표기합니다.
  // 매 요청 시각을 넣으면 구글이 갱신 신호를 신뢰하지 않게 됩니다.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/tests"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/couple-name-compatibility"), changeFrequency: "monthly", priority: 0.85 },
    { url: absoluteUrl("/fortune/today"), lastModified: new Date(), changeFrequency: "daily", priority: 0.85 },
    { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terms"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.4 },
  ];
  const testRoutes: MetadataRoute.Sitemap = tests.filter((test) => !test.href).map((test) => ({ url: absoluteUrl(`/tests/${test.slug}`), changeFrequency: "monthly", priority: 0.8 }));
  const resultSlugs = [...new Set(tests.flatMap((test)=>test.resultSlugs))];
  const resultRoutes: MetadataRoute.Sitemap = resultSlugs.map((slug) => ({ url: absoluteUrl(`/result/${slug}`), changeFrequency: "monthly", priority: 0.6 }));
  const joseonResultRoutes: MetadataRoute.Sitemap = joseonResultProfiles.map((profile) => ({ url: absoluteUrl(`/joseon-destiny-test/result/${profile.slug}`), changeFrequency: "monthly", priority: 0.65 }));
  const countryResultRoutes: MetadataRoute.Sitemap = countryResultProfiles.map((profile) => ({ url: absoluteUrl(`/personality-country-test/result/${profile.slug}`), changeFrequency: "monthly", priority: 0.65 }));
  const loverResultRoutes: MetadataRoute.Sitemap = loverResultProfiles.map((profile) => ({ url: absoluteUrl(`/lover-score-test/result/${profile.slug}`), changeFrequency: "monthly", priority: 0.7 }));
  const jealousyResultRoutes: MetadataRoute.Sitemap = jealousyGradeProfiles.map((profile) => ({ url: absoluteUrl(`/jealousy-test/result/${profile.slug}`), changeFrequency: "monthly", priority: 0.7 }));
  const colorResultRoutes: MetadataRoute.Sitemap = colorPersonalityProfiles.map((profile) => ({ url: absoluteUrl(`/color-personality-test/${profile.slug}`), changeFrequency: "monthly", priority: 0.7 }));
  const enneagramResultRoutes: MetadataRoute.Sitemap = enneagramProfiles.map((profile) => ({ url: absoluteUrl(`/enneagram/${profile.slug}`), changeFrequency: "monthly", priority: 0.7 }));
  const eqResultRoutes: MetadataRoute.Sitemap = eqResultProfiles.map((profile) => ({ url: absoluteUrl(`/eq-test/result/${profile.slug}`), changeFrequency: "monthly", priority: 0.7 }));
  const bigFiveResultRoutes: MetadataRoute.Sitemap = bigFiveResultProfiles.map((profile) => ({ url: absoluteUrl(`/big-five/result/${profile.slug}`), changeFrequency: "monthly", priority: 0.7 }));
  const footballGradeRoutes: MetadataRoute.Sitemap = footballGradeProfiles.map((profile) => ({ url: absoluteUrl(`/football-iq-test/result/${profile.slug}`), changeFrequency: "monthly", priority: 0.7 }));
  const worldCupWinnerGradeRoutes: MetadataRoute.Sitemap = worldCupWinnerGradeProfiles.map((profile) => ({ url: absoluteUrl(`/worldcup-winner-quiz/result/${profile.slug}`), changeFrequency: "monthly", priority: 0.7 }));
  const reactionGradeRoutes: MetadataRoute.Sitemap = reactionGradeProfiles.map((profile) => ({ url: absoluteUrl(`/reaction-time-test/result/${profile.slug}`), changeFrequency: "monthly", priority: 0.7 }));
  const mbtiResultRoutes: MetadataRoute.Sitemap = mbtiTypeProfiles.map((profile) => ({ url: absoluteUrl(`/tests/mbti/result/${profile.slug}`), changeFrequency: "monthly", priority: 0.7 }));
  const sbtiResultRoutes: MetadataRoute.Sitemap = sbtiTypeProfiles.map((profile) => ({ url: absoluteUrl(`/tests/sbti/result/${profile.slug}`), changeFrequency: "monthly", priority: 0.7 }));
  const stressResultRoutes: MetadataRoute.Sitemap = stressGradeProfiles.map((profile) => ({ url: absoluteUrl(`/stress-test/result/${profile.slug}`), changeFrequency: "monthly", priority: 0.7 }));
  const cvsResultRoutes: MetadataRoute.Sitemap = cvsResultProfiles.map((profile) => ({ url: absoluteUrl(`/convenience-store-test/result/${profile.slug}`), changeFrequency: "monthly", priority: 0.7 }));
  const snsResultRoutes: MetadataRoute.Sitemap = snsResultProfiles.map((profile) => ({ url: absoluteUrl(`/sns-type-test/result/${profile.slug}`), changeFrequency: "monthly", priority: 0.7 }));
  const burgerResultRoutes: MetadataRoute.Sitemap = burgerBrandProfiles.map((profile) => ({ url: absoluteUrl(`/burger-brand-test/result/${profile.slug}`), changeFrequency: "monthly", priority: 0.7 }));
  const wizardCharacterResultRoutes: MetadataRoute.Sitemap = wizardCharacterProfiles.map((profile) => ({ url: absoluteUrl(`/harry-potter-character-test/result/${profile.slug}`), changeFrequency: "monthly", priority: 0.7 }));
  const coffeeBrandResultRoutes: MetadataRoute.Sitemap = coffeeBrandProfiles.map((profile) => ({ url: absoluteUrl(`/coffee-brand-test/result/${profile.slug}`), changeFrequency: "monthly", priority: 0.7 }));
  const selfEsteemResultRoutes: MetadataRoute.Sitemap = selfEsteemLevelProfiles.map((profile) => ({ url: absoluteUrl(`/self-esteem-test/result/${profile.slug}`), changeFrequency: "monthly", priority: 0.7 }));
  const adhdResultRoutes: MetadataRoute.Sitemap = adhdLevelProfiles.map((profile) => ({ url: absoluteUrl(`/adhd-self-check/result/${profile.slug}`), changeFrequency: "monthly", priority: 0.7 }));
  const dementiaResultRoutes: MetadataRoute.Sitemap = dementiaLevelProfiles.map((profile) => ({ url: absoluteUrl(`/dementia-risk-test/result/${profile.slug}`), changeFrequency: "monthly", priority: 0.7 }));
  const postRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({ url: absoluteUrl(`/blog/${post.slug}`), lastModified: new Date(post.updatedAt), changeFrequency: "monthly", priority: 0.75 }));
  const categoryRoutes: MetadataRoute.Sitemap = [...new Set([...blogCategories, ...tests.map((test) => test.category)])].map((category) => ({ url: absoluteUrl(`/category/${encodeURIComponent(category)}`), changeFrequency: "weekly", priority: 0.6 }));
  return [...staticRoutes, ...testRoutes, ...resultRoutes, ...joseonResultRoutes, ...countryResultRoutes, ...loverResultRoutes, ...jealousyResultRoutes, ...colorResultRoutes, ...enneagramResultRoutes, ...eqResultRoutes, ...bigFiveResultRoutes, ...footballGradeRoutes, ...worldCupWinnerGradeRoutes, ...reactionGradeRoutes, ...mbtiResultRoutes, ...sbtiResultRoutes, ...stressResultRoutes, ...cvsResultRoutes, ...snsResultRoutes, ...burgerResultRoutes, ...wizardCharacterResultRoutes, ...coffeeBrandResultRoutes, ...selfEsteemResultRoutes, ...adhdResultRoutes, ...dementiaResultRoutes, ...postRoutes, ...categoryRoutes];
}
