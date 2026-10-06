import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { RunningPersonalityResult } from "@/components/test/RunningPersonalityResult";
import { getRunningProfile, runningProfiles, runningResultPath, RUNNING_TEST_PATH } from "@/data/running-personality";
import { calculateRunningResult, encodeRunningAnswers, parseRunningAnswers } from "@/lib/running-personality-engine";
import { absoluteUrl, createMetadata } from "@/lib/site";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ a?: string | string[] }> };

export function generateStaticParams() {
  return runningProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = getRunningProfile(slug);
  if (!profile) return {};
  return createMetadata({ title: `${profile.name} | 러닝 성향 테스트 결과`, description: profile.tagline, path: runningResultPath(profile.slug), keywords: ["러닝 성향 테스트", "러너 유형", profile.name] });
}

export default async function RunningResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { a } = await searchParams;
  const profile = getRunningProfile(slug);
  if (!profile) notFound();
  const answers = parseRunningAnswers(a);
  const result = answers ? calculateRunningResult(answers) : null;
  const encodedAnswers = answers ? encodeRunningAnswers(answers) : null;
  if (result && result.profile.slug !== slug) redirect(`${runningResultPath(result.profile.slug)}?a=${encodedAnswers}`);
  return (
    <>
      <RunningPersonalityResult profile={result?.profile ?? profile} secondary={result?.secondary ?? null} encodedAnswers={encodedAnswers} />
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "WebPage", name: `러닝 성향 테스트 결과: ${profile.name}`,
        description: profile.tagline, url: absoluteUrl(runningResultPath(profile.slug)), inLanguage: "ko-KR", isAccessibleForFree: true,
        isPartOf: { "@type": "WebSite", url: absoluteUrl("/") }, about: { "@type": "Quiz", "@id": absoluteUrl(`${RUNNING_TEST_PATH}#quiz`) },
      }} />
    </>
  );
}
