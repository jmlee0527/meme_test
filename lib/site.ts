import type { Metadata } from "next";

export const siteConfig = {
  name: "미미테스트",
  tagline: "나를 발견하는 순간",
  englishName: "Mimi Test",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://buupstory.kr",
  description:
    "재미있고 빠른 테스트로 나의 성향, 재능, 직장 스타일, 연애관과 가능성을 발견하는 종합 테스트 플랫폼",
  keywords: [
    "무료 테스트",
    "성향 테스트",
    "심리 테스트",
    "연애 테스트",
    "직장인 테스트",
    "부업 테스트",
    "미미테스트",
  ],
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
};

export function createMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
}: MetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: { canonical },
    openGraph: {
      type,
      locale: "ko_KR",
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      images: [{ url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}
