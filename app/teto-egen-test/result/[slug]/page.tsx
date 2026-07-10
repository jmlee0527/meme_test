import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { TetoEgenResult } from "@/components/test/TetoEgenResult";
import { getTetoEgenResultProfile, tetoEgenResultProfiles } from "@/data/teto-egen";
import { absoluteUrl, createMetadata } from "@/lib/site";
import { calculateTetoEgenResult, parseTetoEgenAnswers } from "@/lib/teto-egen-engine";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ r?: string }>;
};

export function generateStaticParams() {
  return tetoEgenResultProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { r } = await searchParams;
  const profile = getTetoEgenResultProfile(slug);
  if (!profile) return {};
  const answers = parseTetoEgenAnswers(r);
  const result = answers ? calculateTetoEgenResult(answers) : null;
  const effectiveProfile = result?.profile ?? profile;

  return createMetadata({
    title: result
      ? `테토력 ${result.tetoPercent}% · 에겐력 ${result.egenPercent}%, ${effectiveProfile.name} | 테토 테스트 결과`
      : `${profile.name} | 테토 테스트 · 에겐 테스트 결과`,
    description: `${effectiveProfile.summary} 테토 테스트로 확인한 테토력·에겐력 비율과 성향 분석 결과입니다.`,
    path: `/teto-egen-test/result/${profile.slug}`,
    keywords: ["테토 테스트", "에겐 테스트", "테토력 테스트", "에겐력 테스트", "테토 에겐 테스트", effectiveProfile.name],
    ogImage: false,
  });
}

export default async function TetoEgenResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { r } = await searchParams;
  const profile = getTetoEgenResultProfile(slug);
  if (!profile) notFound();

  const answers = parseTetoEgenAnswers(r);
  const result = answers ? calculateTetoEgenResult(answers) : null;
  if (result && result.profile.slug !== slug) redirect(`/teto-egen-test/result/${result.profile.slug}?r=${r}`);

  return (
    <>
      <TetoEgenResult profile={result?.profile ?? profile} tetoPercent={result?.tetoPercent ?? null} encodedAnswers={result ? r ?? null : null} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `테토 테스트 결과: ${profile.name}`,
          description: profile.summary,
          url: absoluteUrl(`/teto-egen-test/result/${profile.slug}`),
          inLanguage: "ko-KR",
          isAccessibleForFree: true,
          isPartOf: { "@type": "WebSite", url: absoluteUrl("/") },
          about: { "@type": "Quiz", "@id": absoluteUrl("/tests/teto-egen-test#quiz") },
        }}
      />
    </>
  );
}
