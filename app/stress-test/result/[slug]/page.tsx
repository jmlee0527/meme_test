import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { StressResult } from "@/components/test/StressResult";
import { getStressGradeProfile, stressGradeProfiles } from "@/data/stress-test";
import { absoluteUrl, createMetadata } from "@/lib/site";
import { getStressGrade, parseStressScore } from "@/lib/stress-engine";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ s?: string }>;
};

export function generateStaticParams() {
  return stressGradeProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { s } = await searchParams;
  const grade = getStressGradeProfile(slug);
  if (!grade) return {};
  const score = parseStressScore(s);
  const effectiveGrade = score !== null ? getStressGrade(score) : grade;

  return createMetadata({
    title: score !== null ? `내 스트레스 지수는 ${score}점, ${effectiveGrade.name}` : `${grade.name} | 스트레스 지수 테스트 결과`,
    description: `${effectiveGrade.summary} 지각된 스트레스 척도(PSS-10)로 알아본 스트레스 지수 결과와 관리 방법입니다.`,
    path: `/stress-test/result/${grade.slug}`,
    keywords: ["스트레스 지수 테스트", "스트레스 자가진단", "PSS 테스트", "스트레스 검사", effectiveGrade.name],
  });
}

export default async function StressResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { s } = await searchParams;
  const grade = getStressGradeProfile(slug);
  if (!grade) notFound();

  const score = parseStressScore(s);
  if (score !== null && getStressGrade(score).slug !== slug) redirect(`/stress-test/result/${getStressGrade(score).slug}?s=${score}`);

  return (
    <>
      <StressResult grade={grade} score={score} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `스트레스 지수 테스트 결과: ${grade.name}`,
          description: grade.summary,
          url: absoluteUrl(`/stress-test/result/${grade.slug}`),
          inLanguage: "ko-KR",
          isAccessibleForFree: true,
          isPartOf: { "@type": "WebSite", url: absoluteUrl("/") },
          about: { "@type": "Quiz", "@id": absoluteUrl("/tests/stress-test#quiz") },
        }}
      />
    </>
  );
}
