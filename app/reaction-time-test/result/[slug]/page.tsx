import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { ReactionTimeResult } from "@/components/test/ReactionTimeResult";
import { getReactionGradeProfile, reactionGradeProfiles } from "@/data/reaction-time";
import { absoluteUrl, createMetadata } from "@/lib/site";
import { averageReactionMs, getReactionGrade, parseReactionRounds } from "@/lib/reaction-time-engine";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ r?: string }>;
};

export function generateStaticParams() {
  return reactionGradeProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { r } = await searchParams;
  const grade = getReactionGradeProfile(slug);
  if (!grade) return {};
  const rounds = parseReactionRounds(r);
  const average = rounds ? averageReactionMs(rounds) : null;
  const effectiveGrade = average !== null ? getReactionGrade(average) : grade;

  return createMetadata({
    title: average !== null ? `내 반응속도는 ${average}ms, ${effectiveGrade.name}` : `${grade.name} | 반응속도 테스트 결과`,
    description: `${effectiveGrade.summary} 3번의 측정으로 알아본 평균 반응속도와 반사신경 등급 결과입니다.`,
    path: `/reaction-time-test/result/${grade.slug}`,
    keywords: ["반응속도 테스트", "순발력 테스트", "반사신경 테스트", "반응속도 측정", effectiveGrade.name],
  });
}

export default async function ReactionTimeResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { r } = await searchParams;
  const grade = getReactionGradeProfile(slug);
  if (!grade) notFound();

  const rounds = parseReactionRounds(r);
  const average = rounds ? averageReactionMs(rounds) : null;
  if (average !== null && getReactionGrade(average).slug !== slug) redirect(`/reaction-time-test/result/${getReactionGrade(average).slug}?r=${r}`);

  return (
    <>
      <ReactionTimeResult grade={grade} averageMs={average} rounds={rounds ?? []} encodedRounds={rounds ? r ?? null : null} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `반응속도 테스트 결과: ${grade.name}`,
          description: grade.summary,
          url: absoluteUrl(`/reaction-time-test/result/${grade.slug}`),
          inLanguage: "ko-KR",
          isAccessibleForFree: true,
          isPartOf: { "@type": "WebSite", url: absoluteUrl("/") },
          about: { "@type": "Quiz", "@id": absoluteUrl("/tests/reaction-time-test#quiz") },
        }}
      />
    </>
  );
}
