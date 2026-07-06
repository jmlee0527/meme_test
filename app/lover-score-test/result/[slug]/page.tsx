import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { LoverScoreResult } from "@/components/test/LoverScoreResult";
import { loverResultProfiles, getLoverResultProfile } from "@/data/lover-score";
import { absoluteUrl, createMetadata } from "@/lib/site";
import { calculateLoverResult, parseLoverAnswers } from "@/lib/lover-score-engine";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ answers?: string; score?: string; gender?: string }>;
};

export function generateStaticParams() {
  return loverResultProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { score: rawScore } = await searchParams;
  const profile = getLoverResultProfile(slug);
  if (!profile) return {};
  const score = rawScore ? Number(rawScore) : parseInt(profile.scoreLabel, 10) || 90;

  return createMetadata({
    title: `내 애인 점수는 ${score}점, ${profile.name}`,
    description: `${profile.summary} 15개의 질문으로 알아본 나의 애인감 점수와 연애 성향 결과입니다.`,
    path: `/lover-score-test/result/${profile.slug}`,
    keywords: ["애인 점수 테스트", "남친감 테스트", "여친감 테스트", profile.name, "연애 성향 테스트"],
  });
}

export default async function LoverScoreResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { answers: rawAnswers, score: rawScore, gender } = await searchParams;
  const profile = getLoverResultProfile(slug);
  if (!profile) notFound();

  const answers = parseLoverAnswers(rawAnswers);
  const calculated = answers ? calculateLoverResult(answers) : null;

  if (calculated && calculated.profile.slug !== slug) {
    return redirect(
      `/lover-score-test/result/${calculated.profile.slug}?answers=${rawAnswers}&score=${calculated.overallScore}${
        gender ? `&gender=${gender}` : ""
      }`,
    );
  }

  const overallScore = calculated?.overallScore ?? (rawScore ? Number(rawScore) : parseInt(profile.scoreLabel, 10) || 90);
  const scores = calculated?.scores ?? profile.typicalScores;
  const effectiveProfile = calculated?.profile ?? profile;
  const effectiveGender = gender === "male" || gender === "female" ? gender : "none";

  return (
    <>
      <LoverScoreResult profile={effectiveProfile} scores={scores} overallScore={overallScore} gender={effectiveGender} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `애인 점수 테스트 결과: ${effectiveProfile.name}`,
          description: effectiveProfile.summary,
          url: absoluteUrl(`/lover-score-test/result/${effectiveProfile.slug}`),
          inLanguage: "ko-KR",
          isAccessibleForFree: true,
        }}
      />
    </>
  );
}

