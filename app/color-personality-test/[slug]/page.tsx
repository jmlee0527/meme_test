import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ColorPersonalityResult } from "@/components/test/ColorPersonalityResult";
import { JsonLd } from "@/components/seo/JsonLd";
import { colorPersonalityProfiles, getColorPersonalityProfile } from "@/data/color-personality";
import { absoluteUrl, createMetadata } from "@/lib/site";
import { calculateColorPersonalityResult, parseColorPersonalityAnswers } from "@/lib/color-personality-engine";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ answers?: string }> };

export function generateStaticParams() {
  return colorPersonalityProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = getColorPersonalityProfile(slug);
  if (!profile) return {};
  return createMetadata({
    title: `${profile.colorName} 성격 특징 | 컬러 성격 테스트 결과 | 미미테스트`,
    description: `컬러 성격 테스트에서 ${profile.colorName}가 나온 사람의 성격, 연애 스타일, 인간관계, 잘 맞는 컬러를 확인해보세요.`,
    path: `/color-personality-test/${profile.slug}`,
    keywords: ["컬러 성격 테스트", `${profile.colorName} 성격`, `${profile.englishName} 성격`, "성격 색깔 테스트", "나의 성격 컬러", "색깔 심리 테스트"],
  });
}

export default async function ColorPersonalityResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { answers: rawAnswers } = await searchParams;
  const profile = getColorPersonalityProfile(slug);
  if (!profile) notFound();

  const answers = parseColorPersonalityAnswers(rawAnswers);
  const calculated = answers ? calculateColorPersonalityResult(answers) : null;
  if (calculated && calculated.primary.slug !== slug) {
    redirect(`/color-personality-test/${calculated.primary.slug}?answers=${rawAnswers}`);
  }

  const secondary = calculated?.secondary ?? getColorPersonalityProfile(profile.goodMatches[0]) ?? profile;

  return (
    <>
      <ColorPersonalityResult primary={calculated?.primary ?? profile} secondary={secondary} primaryPercent={calculated?.primaryPercent ?? 72} secondaryPercent={calculated?.secondaryPercent ?? 28} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `${profile.colorName} 성격 특징 | 컬러 성격 테스트 결과`,
        description: profile.summary,
        url: absoluteUrl(`/color-personality-test/${profile.slug}`),
        inLanguage: "ko-KR",
        isAccessibleForFree: true,
      }} />
    </>
  );
}
