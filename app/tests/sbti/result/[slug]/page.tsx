import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { SbtiResult } from "@/components/test/SbtiResult";
import { getSbtiTypeProfile, sbtiTypeProfiles } from "@/data/sbti";
import { absoluteUrl, createMetadata } from "@/lib/site";
import { parseSbtiLevels, parseSbtiMatch } from "@/lib/sbti-engine";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ d?: string; m?: string }>;
};

export function generateStaticParams() {
  return sbtiTypeProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = getSbtiTypeProfile(slug);
  if (!profile) return {};

  return createMetadata({
    title: `SBTI ${profile.code} ${profile.name} | SBTI 테스트 결과`,
    description: `${profile.summary} 5개 모델 15개 차원으로 알아본 SBTI ${profile.code} 유형의 특징과 매칭도를 확인해보세요.`,
    path: `/tests/sbti/result/${profile.slug}`,
    keywords: [`SBTI ${profile.code}`, `${profile.code} 유형`, profile.name, "SBTI 테스트", "SBTI 유형", "밈 테스트"],
    ogImage: false,
  });
}

export default async function SbtiResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { d, m } = await searchParams;
  const profile = getSbtiTypeProfile(slug);
  if (!profile) notFound();

  const levels = parseSbtiLevels(d);
  const match = levels ? parseSbtiMatch(m) : null;
  const encodedQuery = levels ? `d=${d}${match !== null ? `&m=${match}` : ""}` : null;

  return (
    <>
      <SbtiResult profile={profile} levels={levels} match={match} encodedQuery={encodedQuery} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `SBTI 테스트 결과: ${profile.code} ${profile.name}`,
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
