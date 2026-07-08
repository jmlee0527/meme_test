import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { MbtiResult } from "@/components/test/MbtiResult";
import { getMbtiTypeProfile, mbtiTypeProfiles } from "@/data/mbti";
import { absoluteUrl, createMetadata } from "@/lib/site";
import { parseMbtiPercents } from "@/lib/mbti-engine";

type Props = {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ p?: string }>;
};

export function generateStaticParams() {
  return mbtiTypeProfiles.map(({ slug }) => ({ type: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const profile = getMbtiTypeProfile(type);
  if (!profile) return {};

  return createMetadata({
    title: `${profile.code} ${profile.name} | MBTI 성격유형 테스트 결과`,
    description: `${profile.tagline}. MBTI ${profile.code} 유형의 성격 특징, 강점과 주의할 점, 어울리는 직업과 관계 팁을 확인해보세요.`,
    path: `/tests/mbti/result/${profile.slug}`,
    keywords: [profile.code, `${profile.code} 특징`, `${profile.code} 성격`, `MBTI ${profile.code}`, profile.name, "MBTI 테스트", "MBTI 유형"],
    ogImage: false,
  });
}

export default async function MbtiResultPage({ params, searchParams }: Props) {
  const { type } = await params;
  const { p } = await searchParams;
  const profile = getMbtiTypeProfile(type);
  if (!profile) notFound();

  return (
    <>
      <MbtiResult profile={profile} percents={parseMbtiPercents(p)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `MBTI 테스트 결과: ${profile.code} ${profile.name}`,
          description: profile.tagline,
          url: absoluteUrl(`/tests/mbti/result/${profile.slug}`),
          inLanguage: "ko-KR",
          isAccessibleForFree: true,
          isPartOf: { "@type": "WebSite", url: absoluteUrl("/") },
          about: { "@type": "Quiz", "@id": absoluteUrl("/tests/mbti#quiz") },
        }}
      />
    </>
  );
}
