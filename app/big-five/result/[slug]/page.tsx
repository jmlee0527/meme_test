import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { BigFiveResult } from "@/components/test/BigFiveResult";
import { JsonLd } from "@/components/seo/JsonLd";
import { bigFiveDomainLabels, bigFiveResultProfiles, getBigFiveResultProfile } from "@/data/big-five";
import { absoluteUrl, createMetadata } from "@/lib/site";
import { bigFiveResultPath, calculateBigFiveScores, parseBigFiveAnswers } from "@/lib/big-five-engine";
import type { BigFiveScores } from "@/lib/types";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ answers?: string }> };

export function generateStaticParams() {
  return bigFiveResultProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = getBigFiveResultProfile(slug);
  if (!profile) return {};
  return createMetadata({
    title: `${profile.name} | Big Five 성격 테스트 결과`,
    description: `Big Five 성격 테스트 결과 ${profile.name}. 개방성, 성실성, 외향성, 친화성, 정서 민감성 OCEAN 프로필을 확인해보세요.`,
    path: bigFiveResultPath(profile.slug),
    keywords: ["Big Five 성격 테스트", "OCEAN 성격 테스트", "빅파이브 테스트", "성격 분석 테스트", profile.name, bigFiveDomainLabels[profile.domain]],
  });
}

export default async function BigFiveResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { answers: rawAnswers } = await searchParams;
  const profile = getBigFiveResultProfile(slug);
  if (!profile) notFound();

  const answers = parseBigFiveAnswers(rawAnswers);
  const calculated = answers ? calculateBigFiveScores(answers) : null;
  if (calculated && calculated.profile.slug !== slug) {
    redirect(`${bigFiveResultPath(calculated.profile.slug)}?answers=${rawAnswers}`);
  }

  const fallbackScores = {
    openness: profile.domain === "openness" ? 82 : 58,
    conscientiousness: profile.domain === "conscientiousness" ? 82 : 58,
    extraversion: profile.domain === "extraversion" ? 82 : 56,
    agreeableness: profile.domain === "agreeableness" ? 82 : 62,
    neuroticism: profile.domain === "neuroticism" ? 82 : 42,
  } satisfies BigFiveScores;

  return (
    <>
      <BigFiveResult
        profile={calculated?.profile ?? profile}
        scores={calculated?.scores ?? fallbackScores}
        dominantDomain={calculated?.dominantDomain ?? profile.domain}
        lowestDomain={calculated?.lowestDomain ?? "neuroticism"}
      />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `Big Five 성격 테스트 결과: ${profile.name}`,
        description: profile.summary,
        url: absoluteUrl(bigFiveResultPath(profile.slug)),
        inLanguage: "ko-KR",
        isAccessibleForFree: true,
      }} />
    </>
  );
}
