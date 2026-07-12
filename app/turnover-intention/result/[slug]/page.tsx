import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { TurnoverIntentionResult } from "@/components/test/TurnoverIntentionResult";
import { getTurnoverLevelById, turnoverResultLevels } from "@/data/turnover-intention";
import { calculateTurnoverResult, parseTurnoverAnswers } from "@/lib/turnover-intention-engine";
import { absoluteUrl, createMetadata } from "@/lib/site";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ a?: string }> };

export function generateStaticParams() {
  return turnoverResultLevels.map((level) => ({ slug: level.id }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { a } = await searchParams;
  const level = getTurnoverLevelById(slug);
  if (!level) return {};
  const answers = parseTurnoverAnswers(a);
  const result = answers ? calculateTurnoverResult(answers) : null;
  const effectiveLevel = result?.level ?? level;
  return createMetadata({
    title: result ? `이직 의향 ${result.overallScore}점, ${effectiveLevel.title} | 이직 의향 테스트 결과` : `${level.title} | 이직 의향 테스트 결과`,
    description: `${effectiveLevel.summary} 28문항으로 이직 의향 점수와 성장, 보상, 조직문화, 업무 부담 등 주요 원인을 확인해 보세요.`,
    path: `/turnover-intention/result/${level.id}`,
    keywords: ["이직 의향 테스트", "이직 고민 테스트", "퇴사 고민 테스트", "직장인 심리 테스트", effectiveLevel.title],
    ogImage: false,
  });
}

export default async function TurnoverResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { a } = await searchParams;
  const level = getTurnoverLevelById(slug);
  if (!level) notFound();

  const answers = parseTurnoverAnswers(a);
  const result = answers ? calculateTurnoverResult(answers) : null;
  if (result && result.level.id !== slug) redirect(`/turnover-intention/result/${result.level.id}?a=${a}`);

  return (
    <>
      <TurnoverIntentionResult
        level={result?.level ?? level}
        overallScore={result?.overallScore ?? null}
        riskScores={result?.riskScores ?? null}
        primaryFactors={result?.primaryFactors ?? []}
        encodedAnswers={answers ? a ?? null : null}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `이직 의향 테스트 결과: ${level.title}`,
          description: level.summary,
          url: absoluteUrl(`/turnover-intention/result/${level.id}`),
          inLanguage: "ko-KR",
          isAccessibleForFree: true,
          isPartOf: { "@type": "WebSite", url: absoluteUrl("/") },
          about: { "@type": "Quiz", "@id": absoluteUrl("/tests/turnover-intention#quiz") },
        }}
      />
    </>
  );
}
