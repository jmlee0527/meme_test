import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { PersonalityCountryResult } from "@/components/test/PersonalityCountryResult";
import { countryResultProfiles, getCountryResultProfile } from "@/data/personality-country";
import { absoluteUrl, createMetadata } from "@/lib/site";
import { calculatePersonalityCountryResult, parseCountryAnswers } from "@/lib/personality-country-engine";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ answers?: string }> };

export function generateStaticParams() {
  return countryResultProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = getCountryResultProfile(slug);
  if (!profile) return {};
  return createMetadata({
    title: `내 성격과 가장 잘 맞는 해외 국가는 ${profile.country}? | Mimi Test`,
    description: `12개의 질문으로 알아보는 해외 국가 성향 테스트. 당신의 성격과 생활 방식은 ${profile.country}의 어떤 라이프스타일 이미지와 잘 맞을까요?`,
    path: `/personality-country-test/result/${profile.slug}`,
    keywords: ["해외 국가 테스트", "성격 국가 테스트", profile.country, "여행 성향 테스트", "심리테스트"],
  });
}

export default async function PersonalityCountryResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { answers: rawAnswers } = await searchParams;
  const profile = getCountryResultProfile(slug);
  if (!profile) notFound();

  const answers = parseCountryAnswers(rawAnswers);
  const calculated = answers ? calculatePersonalityCountryResult(answers) : null;
  if (calculated && calculated.profile.slug !== slug) {
    redirect(`/personality-country-test/result/${calculated.profile.slug}?answers=${rawAnswers}`);
  }

  return (
    <>
      <PersonalityCountryResult profile={calculated?.profile ?? profile} similar={calculated?.similar ?? []} scores={calculated?.scores ?? profile.targetScores} fitScore={calculated?.fitScore ?? 88} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `해외 국가 성향 테스트 결과: ${profile.country}`,
        description: profile.summary,
        url: absoluteUrl(`/personality-country-test/result/${profile.slug}`),
        inLanguage: "ko-KR",
        isAccessibleForFree: true,
      }} />
    </>
  );
}
