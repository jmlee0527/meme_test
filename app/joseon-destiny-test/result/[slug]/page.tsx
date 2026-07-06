import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { JoseonDestinyResult } from "@/components/test/JoseonDestinyResult";
import { getJoseonResultProfile, joseonResultProfiles } from "@/data/joseon-destiny";
import { absoluteUrl, createMetadata } from "@/lib/site";
import { calculateJoseonDestinyResult, parseJoseonAnswers } from "@/lib/joseon-destiny-engine";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ answers?: string }> };

export function generateStaticParams() {
  return joseonResultProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = getJoseonResultProfile(slug);
  if (!profile) return {};
  return createMetadata({
    title: `조선시대에 환생했다면 나는 ${profile.name}?`,
    description: `12개의 질문으로 알아보는 조선시대 운명 테스트. 당신이 조선시대에 태어났다면 ${profile.name}처럼 살았을까요?`,
    path: `/joseon-destiny-test/result/${profile.slug}`,
    keywords: ["조선시대 테스트", "조선 운명 테스트", profile.name, "전생 테스트", "심리테스트"],
  });
}

export default async function JoseonDestinyResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { answers: rawAnswers } = await searchParams;
  const profile = getJoseonResultProfile(slug);
  if (!profile) notFound();

  const answers = parseJoseonAnswers(rawAnswers);
  const calculated = answers ? calculateJoseonDestinyResult(answers) : null;
  if (calculated && calculated.profile.slug !== slug) {
    redirect(`/joseon-destiny-test/result/${calculated.profile.slug}?answers=${rawAnswers}`);
  }

  return (
    <>
      <JoseonDestinyResult profile={calculated?.profile ?? profile} secondary={calculated?.secondary} scores={calculated?.scores ?? profile.targetScores} fitScore={calculated?.fitScore ?? 88} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `조선시대 운명 결과: ${profile.name}`,
        description: profile.summary,
        url: absoluteUrl(`/joseon-destiny-test/result/${profile.slug}`),
        inLanguage: "ko-KR",
        isAccessibleForFree: true,
      }} />
    </>
  );
}
