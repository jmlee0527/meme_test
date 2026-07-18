import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { InterpersonalAbilityResult } from "@/components/test/InterpersonalAbilityResult";
import { getInterpersonalResultProfile, interpersonalResultProfiles } from "@/data/interpersonal-ability";
import { absoluteUrl, createMetadata } from "@/lib/site";
import {
  getInterpersonalDimensionExtremes,
  getInterpersonalResult,
  parseInterpersonalDimensionScores,
  parseInterpersonalScore,
} from "@/lib/interpersonal-ability-engine";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ s?: string; d?: string }>;
};

export function generateStaticParams() {
  return interpersonalResultProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { s } = await searchParams;
  const grade = getInterpersonalResultProfile(slug);
  if (!grade) return {};
  const score = parseInterpersonalScore(s);
  const effectiveGrade = score !== null ? getInterpersonalResult(score) : grade;

  return createMetadata({
    title: score !== null ? `내 대인관계 능력 지수는 ${score}점, ${effectiveGrade.title}` : `${grade.title} | 대인관계 능력 테스트 결과`,
    description: `${effectiveGrade.summary} 공감, 자기표현, 관계 형성과 갈등 조율 능력을 바탕으로 본 대인관계 능력 테스트 결과입니다.`,
    path: `/interpersonal-ability-test/result/${effectiveGrade.slug}`,
    keywords: ["대인관계 능력 테스트", "대인관계 테스트", "의사소통 능력 테스트", effectiveGrade.title],
    ogImage: false,
  });
}

export default async function InterpersonalAbilityResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { s, d } = await searchParams;
  const grade = getInterpersonalResultProfile(slug);
  if (!grade) notFound();

  const score = parseInterpersonalScore(s);
  const dimensionScores = parseInterpersonalDimensionScores(d);
  const resultGrade = score !== null ? getInterpersonalResult(score) : grade;
  if (score !== null && resultGrade.slug !== slug) {
    redirect(`/interpersonal-ability-test/result/${resultGrade.slug}?s=${score}${d ? `&d=${d}` : ""}`);
  }
  const extremes = dimensionScores ? getInterpersonalDimensionExtremes(dimensionScores) : null;

  return (
    <>
      <InterpersonalAbilityResult
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
          name: `대인관계 능력 테스트 결과: ${resultGrade.title}`,
          description: resultGrade.summary,
          url: absoluteUrl(`/interpersonal-ability-test/result/${resultGrade.slug}`),
          inLanguage: "ko-KR",
          isAccessibleForFree: true,
          isPartOf: { "@type": "WebSite", url: absoluteUrl("/") },
          about: { "@type": "Quiz", "@id": absoluteUrl("/tests/interpersonal-ability-test#quiz") },
        }}
      />
    </>
  );
}
