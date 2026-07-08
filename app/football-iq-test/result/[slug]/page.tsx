import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { FootballQuizResult } from "@/components/test/FootballQuizResult";
import { footballGradeProfiles, getFootballGradeProfile } from "@/data/football-quiz";
import { absoluteUrl, createMetadata } from "@/lib/site";
import { calculateFootballQuizResult, parseFootballAnswers } from "@/lib/football-quiz-engine";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ r?: string }>;
};

export function generateStaticParams() {
  return footballGradeProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { r } = await searchParams;
  const grade = getFootballGradeProfile(slug);
  if (!grade) return {};
  const answers = parseFootballAnswers(r);
  const result = answers ? calculateFootballQuizResult(answers) : null;
  const effectiveGrade = result?.grade ?? grade;

  return createMetadata({
    title: result ? `내 축잘알 지수는 ${result.score}점, ${effectiveGrade.name}` : `${grade.name} | 축잘알 테스트 결과`,
    description: `${effectiveGrade.summary} 월드컵, 챔피언스리그, 해외 축구 상식 15문제로 알아본 축잘알 테스트 결과입니다.`,
    path: `/football-iq-test/result/${grade.slug}`,
    keywords: ["축잘알 테스트", "축잘알 지수", "축구 상식 테스트", "축구 퀴즈", effectiveGrade.name],
  });
}

export default async function FootballQuizResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { r } = await searchParams;
  const grade = getFootballGradeProfile(slug);
  if (!grade) notFound();

  const answers = parseFootballAnswers(r);
  const result = answers ? calculateFootballQuizResult(answers) : null;
  if (result && result.grade.slug !== slug) redirect(`/football-iq-test/result/${result.grade.slug}?r=${r}`);

  return (
    <>
      <FootballQuizResult
        grade={result?.grade ?? grade}
        score={result?.score ?? null}
        correctCount={result?.correctCount ?? null}
        total={result?.total ?? 15}
        wrong={result?.wrong ?? []}
        encodedAnswers={result ? r ?? null : null}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `축잘알 테스트 결과: ${grade.name}`,
          description: grade.summary,
          url: absoluteUrl(`/football-iq-test/result/${grade.slug}`),
          inLanguage: "ko-KR",
          isAccessibleForFree: true,
          isPartOf: { "@type": "WebSite", url: absoluteUrl("/") },
          about: { "@type": "Quiz", "@id": absoluteUrl("/tests/football-iq-test#quiz") },
        }}
      />
    </>
  );
}
