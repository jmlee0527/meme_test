import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { DementiaRiskResult } from "@/components/test/DementiaRiskResult";
import {
  dementiaLevelProfiles,
  getDementiaLevelProfile,
} from "@/data/dementia-risk";
import {
  calculateDementiaResult,
  parseDementiaAnswers,
} from "@/lib/dementia-risk-engine";
import { createMetadata } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ answers?: string }>;
};

export function generateStaticParams() {
  return dementiaLevelProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = getDementiaLevelProfile(slug);
  if (!profile) return {};
  return createMetadata({
    title: `치매 위험 지수 자가 체크 결과 | ${profile.name}`,
    description: `최근 기억력·인지 변화와 생활습관 위험요인을 분석한 참고용 자가 체크 결과입니다. ${profile.summary}`,
    path: `/dementia-risk-test/result/${slug}`,
    keywords: ["치매 테스트", "치매 자가진단", "치매 위험 지수 테스트", "기억력 테스트"],
  });
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const { answers: raw } = await searchParams;
  const profile = getDementiaLevelProfile(slug);
  if (!profile) notFound();
  const answers = parseDementiaAnswers(raw);
  const calculated = answers ? calculateDementiaResult(answers) : null;
  if (calculated && calculated.profile.slug !== slug) {
    redirect(`/dementia-risk-test/result/${calculated.profile.slug}?answers=${raw}`);
  }
  const midpoint = Math.round((profile.minScore + profile.maxScore) / 2 / 25);
  const fallback = calculateDementiaResult(Array(15).fill(midpoint));
  return <DementiaRiskResult profile={calculated?.profile ?? profile} scores={calculated?.scores ?? fallback.scores} />;
}
