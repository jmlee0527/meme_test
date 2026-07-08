import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { SbtiResult } from "@/components/test/SbtiResult";
import { getSbtiLabelProfile, sbtiLabelProfiles } from "@/data/sbti";
import { absoluteUrl, createMetadata } from "@/lib/site";
import { parseSbtiStats } from "@/lib/sbti-engine";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ v?: string }>;
};

export function generateStaticParams() {
  return sbtiLabelProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = getSbtiLabelProfile(slug);
  if (!profile) return {};

  return createMetadata({
    title: `${profile.name} | SBTI 밈 테스트 결과`,
    description: `${profile.summary} 귀찮음, 눈치, 텐션 등 6가지 밈 스탯으로 알아본 SBTI 테스트 결과입니다.`,
    path: `/tests/sbti/result/${profile.slug}`,
    keywords: ["SBTI 테스트", "밈 테스트", profile.name, "재미 테스트", "웃긴 심리테스트"],
    ogImage: false,
  });
}

export default async function SbtiResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { v } = await searchParams;
  const profile = getSbtiLabelProfile(slug);
  if (!profile) notFound();

  const stats = parseSbtiStats(v);

  return (
    <>
      <SbtiResult profile={profile} stats={stats} encodedStats={stats ? v ?? null : null} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `SBTI 밈 테스트 결과: ${profile.name}`,
          description: profile.summary,
          url: absoluteUrl(`/tests/sbti/result/${profile.slug}`),
          inLanguage: "ko-KR",
          isAccessibleForFree: true,
          isPartOf: { "@type": "WebSite", url: absoluteUrl("/") },
          about: { "@type": "Quiz", "@id": absoluteUrl("/tests/sbti#quiz") },
        }}
      />
    </>
  );
}
