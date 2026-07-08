import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { WizardCharacterResult } from "@/components/test/WizardCharacterResult";
import { getWizardCharacterProfile, wizardCharacterProfiles } from "@/data/wizard-character";
import { absoluteUrl, createMetadata, siteConfig } from "@/lib/site";
import { calculateWizardCharacterResult, parseWizardCharacterAnswers } from "@/lib/wizard-character-engine";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ answers?: string }> };

export function generateStaticParams() {
  return wizardCharacterProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = getWizardCharacterProfile(slug);
  if (!profile) return {};
  return createMetadata({
    title: `해리포터 테스트 결과: 나는 ${profile.koreanName}`,
    description: `내가 해리포터 주인공이라면 ${profile.koreanName}! ${profile.summary}. 10개 질문으로 나와 닮은 캐릭터를 확인해보세요.`,
    path: `/harry-potter-character-test/result/${profile.slug}`,
    keywords: ["해리포터 테스트", "해리포터 성격 테스트", "해리포터 캐릭터 테스트", profile.koreanName, profile.name],
  });
}

export default async function WizardCharacterResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { answers: rawAnswers } = await searchParams;
  const profile = getWizardCharacterProfile(slug);
  if (!profile) notFound();

  const answers = parseWizardCharacterAnswers(rawAnswers);
  const calculated = answers ? calculateWizardCharacterResult(answers) : null;
  if (calculated && calculated.profile.slug !== slug) {
    redirect(`/harry-potter-character-test/result/${calculated.profile.slug}?answers=${rawAnswers}`);
  }

  const resultProfile = calculated?.profile ?? profile;
  return (
    <>
      <WizardCharacterResult profile={resultProfile} secondary={calculated?.secondary} scores={calculated?.scores ?? profile.targetScores} fitScore={calculated?.fitScore ?? 88} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `해리포터 성격 테스트 결과: ${profile.koreanName}`,
        description: profile.summary,
        url: absoluteUrl(`/harry-potter-character-test/result/${profile.slug}`),
        inLanguage: "ko-KR",
        isPartOf: { "@type": "WebSite", "@id": absoluteUrl("/#website"), name: siteConfig.name },
        isAccessibleForFree: true,
      }} />
    </>
  );
}
