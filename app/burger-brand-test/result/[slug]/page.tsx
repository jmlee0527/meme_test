import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { BurgerBrandResult } from "@/components/test/BurgerBrandResult";
import { burgerBrandProfiles, getBurgerBrandProfile } from "@/data/burger-brand";
import { absoluteUrl, createMetadata } from "@/lib/site";
import { calculateBurgerResult, parseBurgerAnswers } from "@/lib/burger-brand-engine";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ a?: string }>;
};

export function generateStaticParams() {
  return burgerBrandProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = getBurgerBrandProfile(slug);
  if (!profile) return {};

  return createMetadata({
    title: `${profile.name} | 나와 어울리는 햄버거 브랜드 테스트 결과`,
    description: `${profile.summary} 성격으로 알아본 나만의 햄버거 브랜드와 추천 메뉴, 잘 맞는 브랜드 TOP3를 확인해보세요.`,
    path: `/burger-brand-test/result/${profile.slug}`,
    keywords: ["햄버거 브랜드 테스트", "나와 어울리는 햄버거", profile.name, "햄버거 성격 테스트", "햄버거 심리테스트"],
  });
}

export default async function BurgerResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { a } = await searchParams;
  const profile = getBurgerBrandProfile(slug);
  if (!profile) notFound();

  const answers = parseBurgerAnswers(a);
  const result = answers ? calculateBurgerResult(answers) : null;
  if (result && result.profile.slug !== slug) redirect(`/burger-brand-test/result/${result.profile.slug}?a=${a}`);

  return (
    <>
      <BurgerBrandResult profile={result?.profile ?? profile} scores={result?.scores ?? null} encodedAnswers={result ? a ?? null : null} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `햄버거 브랜드 테스트 결과: ${profile.name}`,
          description: profile.summary,
          url: absoluteUrl(`/burger-brand-test/result/${profile.slug}`),
          inLanguage: "ko-KR",
          isAccessibleForFree: true,
          isPartOf: { "@type": "WebSite", url: absoluteUrl("/") },
          about: { "@type": "Quiz", "@id": absoluteUrl("/tests/burger-brand-test#quiz") },
        }}
      />
    </>
  );
}
