import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { JealousyResult } from "@/components/test/JealousyResult";
import { getJealousyGradeProfile, jealousyGradeProfiles } from "@/data/jealousy-test";
import { absoluteUrl, createMetadata } from "@/lib/site";
import { calculateJealousyResult, getJealousyGrade, parseJealousyAnswers } from "@/lib/jealousy-engine";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ a?: string }>;
};

export function generateStaticParams() {
  return jealousyGradeProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { a } = await searchParams;
  const grade = getJealousyGradeProfile(slug);
  if (!grade) return {};
  const answers = parseJealousyAnswers(a);
  const result = answers ? calculateJealousyResult(answers) : null;
  const effectiveGrade = result?.grade ?? grade;
  const effectiveScore = result?.score;

  return createMetadata({
    title: effectiveScore !== undefined ? `내 질투심은 ${effectiveScore}점, ${effectiveGrade.name}` : `${grade.name} | 질투심 테스트 결과`,
    description: `${effectiveGrade.summary} 관계 불안, 확인 욕구, 비교 민감도와 감정 조절 방식을 바탕으로 본 질투심 테스트 결과입니다.`,
    path: `/jealousy-test/result/${grade.slug}`,
    keywords: ["질투심 테스트", "질투 테스트", "연애 질투 테스트", "관계 불안 테스트", effectiveGrade.name],
    ogImage: false,
  });
}

export default async function JealousyResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { a } = await searchParams;
  const grade = getJealousyGradeProfile(slug);
  if (!grade) notFound();

  const answers = parseJealousyAnswers(a);
  const result = answers ? calculateJealousyResult(answers) : null;
  if (result && getJealousyGrade(result.score).slug !== slug) redirect(`/jealousy-test/result/${result.grade.slug}?a=${a}`);

  return (
    <>
      <JealousyResult
        grade={result?.grade ?? grade}
        score={result?.score ?? null}
        domainScores={result?.domainScores ?? null}
        dominantDomain={result?.dominantDomain ?? null}
        calmDomain={result?.calmDomain ?? null}
        encodedAnswers={answers ? a ?? null : null}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `질투심 테스트 결과: ${grade.name}`,
          description: grade.summary,
          url: absoluteUrl(`/jealousy-test/result/${grade.slug}`),
          inLanguage: "ko-KR",
          isAccessibleForFree: true,
          isPartOf: { "@type": "WebSite", url: absoluteUrl("/") },
          about: { "@type": "Quiz", "@id": absoluteUrl("/tests/jealousy-test#quiz") },
        }}
      />
    </>
  );
}
