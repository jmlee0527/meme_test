import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelationshipSatisfactionResult } from "@/components/test/RelationshipSatisfactionResult";
import { getRelationshipResultProfile, relationshipResultProfiles } from "@/data/relationship-satisfaction";
import { absoluteUrl, createMetadata } from "@/lib/site";
import {
  getRelationshipDimensionExtremes,
  getRelationshipResult,
  parseRelationshipDimensionScores,
  parseRelationshipScore,
} from "@/lib/relationship-satisfaction-engine";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ s?: string; d?: string }>;
};

export function generateStaticParams() {
  return relationshipResultProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { s } = await searchParams;
  const grade = getRelationshipResultProfile(slug);
  if (!grade) return {};
  const score = parseRelationshipScore(s);
  const effectiveGrade = score !== null ? getRelationshipResult(score) : grade;

  return createMetadata({
    title: score !== null ? `내 연애 관계 만족도는 ${score}점, ${effectiveGrade.title}` : `${grade.title} | 연애 관계 만족도 테스트 결과`,
    description: `${effectiveGrade.summary} 정서적 친밀감, 의사소통, 신뢰, 상호 노력과 전반적 만족도를 바탕으로 본 관계 만족도 결과입니다.`,
    path: `/relationship-satisfaction-test/result/${effectiveGrade.slug}`,
    keywords: ["연애 관계 만족도 테스트", "연애 만족도 테스트", "커플 관계 테스트", effectiveGrade.title],
    ogImage: false,
  });
}

export default async function RelationshipSatisfactionResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { s, d } = await searchParams;
  const grade = getRelationshipResultProfile(slug);
  if (!grade) notFound();

  const score = parseRelationshipScore(s);
  const dimensionScores = parseRelationshipDimensionScores(d);
  const resultGrade = score !== null ? getRelationshipResult(score) : grade;
  if (score !== null && resultGrade.slug !== slug) {
    redirect(`/relationship-satisfaction-test/result/${resultGrade.slug}?s=${score}${d ? `&d=${d}` : ""}`);
  }
  const extremes = dimensionScores ? getRelationshipDimensionExtremes(dimensionScores) : null;

  return (
    <>
      <RelationshipSatisfactionResult
        grade={resultGrade}
        score={score}
        dimensionScores={dimensionScores}
        strongestDimensions={extremes?.strongestDimensions ?? null}
        growthDimensions={extremes?.growthDimensions ?? null}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `연애 관계 만족도 테스트 결과: ${resultGrade.title}`,
          description: resultGrade.summary,
          url: absoluteUrl(`/relationship-satisfaction-test/result/${resultGrade.slug}`),
          inLanguage: "ko-KR",
          isAccessibleForFree: true,
          isPartOf: { "@type": "WebSite", url: absoluteUrl("/") },
          about: { "@type": "Quiz", "@id": absoluteUrl("/tests/relationship-satisfaction-test#quiz") },
        }}
      />
    </>
  );
}
