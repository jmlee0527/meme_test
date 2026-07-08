import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { SnsTypeResult } from "@/components/test/SnsTypeResult";
import { getSnsResultProfile, snsResultProfiles } from "@/data/sns-type";
import { absoluteUrl, createMetadata } from "@/lib/site";
import { calculateSnsResult, parseSnsAnswers } from "@/lib/sns-type-engine";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ a?: string }>;
};

export function generateStaticParams() {
  return snsResultProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = getSnsResultProfile(slug);
  if (!profile) return {};

  return createMetadata({
    title: `${profile.name} | SNS 유형 테스트 결과`,
    description: `${profile.summary} SNS 사용 습관 12가지 선택으로 알아본 나의 온라인 성격과 어울리는 플랫폼을 확인해보세요.`,
    path: `/sns-type-test/result/${profile.slug}`,
    keywords: ["SNS 유형 테스트", "SNS 성격 테스트", profile.name, "SNS 심리테스트", "온라인 성격 테스트"],
  });
}

export default async function SnsResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { a } = await searchParams;
  const profile = getSnsResultProfile(slug);
  if (!profile) notFound();

  const answers = parseSnsAnswers(a);
  const result = answers ? calculateSnsResult(answers) : null;
  if (result && result.profile.slug !== slug) redirect(`/sns-type-test/result/${result.profile.slug}?a=${a}`);

  return (
    <>
      <SnsTypeResult profile={result?.profile ?? profile} topTraits={result?.topTraits ?? null} encodedAnswers={result ? a ?? null : null} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `SNS 유형 테스트 결과: ${profile.name}`,
          description: profile.summary,
          url: absoluteUrl(`/sns-type-test/result/${profile.slug}`),
          inLanguage: "ko-KR",
          isAccessibleForFree: true,
          isPartOf: { "@type": "WebSite", url: absoluteUrl("/") },
          about: { "@type": "Quiz", "@id": absoluteUrl("/tests/sns-type-test#quiz") },
        }}
      />
    </>
  );
}
