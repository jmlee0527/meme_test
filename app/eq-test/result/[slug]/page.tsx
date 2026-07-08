import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { EqResult } from "@/components/test/EqResult";
import { JsonLd } from "@/components/seo/JsonLd";
import { eqResultProfiles, getEqResultProfile } from "@/data/eq-test";
import { absoluteUrl, createMetadata } from "@/lib/site";
import { calculateEqScores, eqResultPath, parseEqAnswers } from "@/lib/eq-engine";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ answers?: string }> };

export function generateStaticParams() {
  return eqResultProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = getEqResultProfile(slug);
  if (!profile) return {};
  return createMetadata({
    title: `${profile.name} | EQ 테스트 결과`,
    description: `EQ 테스트 결과 ${profile.name}. 감정지능, 공감지수, 자기인식, 감정조절, 사회성 영역별 점수를 확인해보세요.`,
    path: eqResultPath(profile.slug),
    keywords: ["EQ 테스트", "공감지수 테스트", "감정지능 테스트", "EQ 검사", profile.name, "공감 능력 테스트"],
  });
}

export default async function EqResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { answers: rawAnswers } = await searchParams;
  const profile = getEqResultProfile(slug);
  if (!profile) notFound();

  const answers = parseEqAnswers(rawAnswers);
  const calculated = answers ? calculateEqScores(answers) : null;
  if (calculated && calculated.profile.slug !== slug) {
    redirect(`${eqResultPath(calculated.profile.slug)}?answers=${rawAnswers}`);
  }

  const fallbackScores = {
    selfAwareness: Math.min(profile.maxPercent, Math.max(profile.minPercent, 72)),
    selfRegulation: Math.min(profile.maxPercent, Math.max(profile.minPercent, 70)),
    empathy: Math.min(profile.maxPercent, Math.max(profile.minPercent, 76)),
    socialSkills: Math.min(profile.maxPercent, Math.max(profile.minPercent, 74)),
    resilience: Math.min(profile.maxPercent, Math.max(profile.minPercent, 71)),
  };

  return (
    <>
      <EqResult
        profile={calculated?.profile ?? profile}
        domainPercentages={calculated?.domainPercentages ?? fallbackScores}
        eqScore={calculated?.eqScore ?? Math.round((profile.minPercent + profile.maxPercent) / 2)}
        empathyScore={calculated?.empathyScore ?? fallbackScores.empathy}
        strongestDomain={calculated?.strongestDomain ?? "empathy"}
        growthDomain={calculated?.growthDomain ?? "selfRegulation"}
      />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `EQ 테스트 결과: ${profile.name}`,
        description: profile.summary,
        url: absoluteUrl(eqResultPath(profile.slug)),
        inLanguage: "ko-KR",
        isAccessibleForFree: true,
      }} />
    </>
  );
}
