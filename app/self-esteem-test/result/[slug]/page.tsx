import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { SelfEsteemResult } from "@/components/test/SelfEsteemResult";
import { getSelfEsteemLevelProfile, selfEsteemLevelProfiles } from "@/data/self-esteem";
import { absoluteUrl, createMetadata, siteConfig } from "@/lib/site";
import { calculateSelfEsteemResult, parseSelfEsteemAnswers } from "@/lib/self-esteem-engine";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ answers?: string }> };

export function generateStaticParams() {
  return selfEsteemLevelProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = getSelfEsteemLevelProfile(slug);
  if (!profile) return {};
  return createMetadata({
    title: `자존감 테스트 결과 | ${profile.name}`,
    description: `${profile.summary} 자기수용, 자기효능감, 비교 성향과 실패 회복력을 분석한 자존감 지수 결과를 확인해보세요.`,
    path: `/self-esteem-test/result/${profile.slug}`,
    keywords: ["자존감 테스트", "자존감 지수 테스트", "자존감 레벨 테스트", "자존감 심리테스트", profile.name],
  });
}

export default async function SelfEsteemResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { answers: rawAnswers } = await searchParams;
  const profile = getSelfEsteemLevelProfile(slug);
  if (!profile) notFound();

  const answers = parseSelfEsteemAnswers(rawAnswers);
  const calculated = answers ? calculateSelfEsteemResult(answers) : null;
  if (calculated && calculated.profile.slug !== slug) {
    redirect(`/self-esteem-test/result/${calculated.profile.slug}?answers=${rawAnswers}`);
  }

  const fallbackScores = {
    selfAcceptance: 60, selfEfficacy: 60, socialComparison: 40, resilience: 60,
    evaluationSensitivity: 40, selfConfidence: 60, emotionalStability: 60, selfCompassion: 60,
  };
  return (
    <>
      <SelfEsteemResult profile={calculated?.profile ?? profile} score={calculated?.score ?? Math.round((profile.minScore + profile.maxScore) / 2)} domainScores={calculated?.domainScores ?? fallbackScores} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `자존감 테스트 결과: ${profile.name}`,
        description: profile.summary,
        url: absoluteUrl(`/self-esteem-test/result/${profile.slug}`),
        inLanguage: "ko-KR",
        isPartOf: { "@type": "WebSite", "@id": absoluteUrl("/#website"), name: siteConfig.name },
        isAccessibleForFree: true,
      }} />
    </>
  );
}
