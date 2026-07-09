import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { CoffeeBrandResult } from "@/components/test/CoffeeBrandResult";
import { coffeeBrandProfiles, getCoffeeBrandProfile } from "@/data/coffee-brand";
import { absoluteUrl, createMetadata, siteConfig } from "@/lib/site";
import { calculateCoffeeBrandResult, parseCoffeeBrandAnswers } from "@/lib/coffee-brand-engine";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ answers?: string }> };

export function generateStaticParams() {
  return coffeeBrandProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = getCoffeeBrandProfile(slug);
  if (!profile) return {};
  return createMetadata({
    title: `커피 브랜드 테스트 결과: 나는 ${profile.name}`,
    description: `나와 어울리는 커피 브랜드는 ${profile.name}! ${profile.summary}. 성격과 라이프스타일로 나의 카페 취향을 확인해보세요.`,
    path: `/coffee-brand-test/result/${profile.slug}`,
    keywords: ["커피 브랜드 테스트", "나와 어울리는 커피", "커피 취향 테스트", "카페 취향 테스트", profile.name],
  });
}

export default async function CoffeeBrandResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { answers: rawAnswers } = await searchParams;
  const profile = getCoffeeBrandProfile(slug);
  if (!profile) notFound();

  const answers = parseCoffeeBrandAnswers(rawAnswers);
  const calculated = answers ? calculateCoffeeBrandResult(answers) : null;
  if (calculated && calculated.profile.slug !== slug) {
    redirect(`/coffee-brand-test/result/${calculated.profile.slug}?answers=${rawAnswers}`);
  }

  const resultProfile = calculated?.profile ?? profile;
  return (
    <>
      <CoffeeBrandResult profile={resultProfile} secondary={calculated?.secondary} scores={calculated?.scores ?? profile.targetScores} fitScore={calculated?.fitScore ?? 88} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `커피 브랜드 테스트 결과: ${profile.name}`,
        description: profile.summary,
        url: absoluteUrl(`/coffee-brand-test/result/${profile.slug}`),
        inLanguage: "ko-KR",
        isPartOf: { "@type": "WebSite", "@id": absoluteUrl("/#website"), name: siteConfig.name },
        isAccessibleForFree: true,
      }} />
    </>
  );
}
