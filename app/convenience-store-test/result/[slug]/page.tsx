import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { ConvenienceStoreResult } from "@/components/test/ConvenienceStoreResult";
import { cvsResultProfiles, getCvsResultProfile } from "@/data/convenience-store";
import { absoluteUrl, createMetadata } from "@/lib/site";
import { calculateCvsResult, parseCvsAnswers } from "@/lib/convenience-store-engine";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ a?: string }>;
};

export function generateStaticParams() {
  return cvsResultProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = getCvsResultProfile(slug);
  if (!profile) return {};

  return createMetadata({
    title: `${profile.name} | 편의점 성격 테스트 결과`,
    description: `${profile.summary} 편의점 장보기 10번의 선택으로 알아본 숨겨진 성격과 오늘의 추천 편의점 조합을 확인해보세요.`,
    path: `/convenience-store-test/result/${profile.slug}`,
    keywords: ["편의점 테스트", "편의점 심리테스트", profile.name, "성격 테스트", "재미있는 테스트"],
  });
}

export default async function CvsResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { a } = await searchParams;
  const profile = getCvsResultProfile(slug);
  if (!profile) notFound();

  const answers = parseCvsAnswers(a);
  const result = answers ? calculateCvsResult(answers) : null;
  if (result && result.profile.slug !== slug) redirect(`/convenience-store-test/result/${result.profile.slug}?a=${a}`);

  return (
    <>
      <ConvenienceStoreResult profile={result?.profile ?? profile} topTraits={result?.topTraits ?? null} encodedAnswers={result ? a ?? null : null} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `편의점 성격 테스트 결과: ${profile.name}`,
          description: profile.summary,
          url: absoluteUrl(`/convenience-store-test/result/${profile.slug}`),
          inLanguage: "ko-KR",
          isAccessibleForFree: true,
          isPartOf: { "@type": "WebSite", url: absoluteUrl("/") },
          about: { "@type": "Quiz", "@id": absoluteUrl("/tests/convenience-store-test#quiz") },
        }}
      />
    </>
  );
}
