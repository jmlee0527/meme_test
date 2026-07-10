import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { LoverFruitResult } from "@/components/test/LoverFruitResult";
import { getLoverFruitProfile, loverFruitProfiles } from "@/data/lover-fruit";
import { absoluteUrl, createMetadata, siteConfig } from "@/lib/site";
import { calculateLoverFruitResult, parseLoverFruitAnswers } from "@/lib/lover-fruit-engine";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ answers?: string }> };

export function generateStaticParams() {
  return loverFruitProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = getLoverFruitProfile(slug);
  if (!profile) return {};
  return createMetadata({
    title: `연인 과일 테스트 결과: 내 연인은 ${profile.name} 타입`,
    description: `나의 연인은 ${profile.name} 타입! ${profile.summary}. 연인의 애정 표현과 연애 스타일을 과일 성격 테스트로 확인해보세요.`,
    path: `/lover-fruit-test/result/${profile.slug}`,
    keywords: ["연애 테스트", "커플 테스트", "과일 성격 테스트", "연인 성격 테스트", profile.name],
  });
}

export default async function LoverFruitResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { answers: rawAnswers } = await searchParams;
  const profile = getLoverFruitProfile(slug);
  if (!profile) notFound();

  const answers = parseLoverFruitAnswers(rawAnswers);
  const calculated = answers ? calculateLoverFruitResult(answers) : null;
  if (calculated && calculated.profile.slug !== slug) {
    redirect(`/lover-fruit-test/result/${calculated.profile.slug}?answers=${rawAnswers}`);
  }

  const resultProfile = calculated?.profile ?? profile;
  return (
    <>
      <LoverFruitResult
        profile={resultProfile}
        secondary={calculated?.secondary}
        third={calculated?.third}
        scores={calculated?.scores ?? profile.targetScores}
        fitScore={calculated?.fitScore ?? 88}
      />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `연인 과일 테스트 결과: ${profile.name}`,
        description: profile.summary,
        url: absoluteUrl(`/lover-fruit-test/result/${profile.slug}`),
        inLanguage: "ko-KR",
        isPartOf: { "@type": "WebSite", "@id": absoluteUrl("/#website"), name: siteConfig.name },
        isAccessibleForFree: true,
      }} />
    </>
  );
}
