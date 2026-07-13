import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { JobStressResult } from "@/components/test/JobStressResult";
import { getJobStressLevelById, jobStressFactors, jobStressLevels } from "@/data/job-stress";
import { calculateJobStressResult, parseJobStressAnswers } from "@/lib/job-stress-engine";
import { absoluteUrl, createMetadata } from "@/lib/site";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ a?: string }> };
export const generateStaticParams = () => jobStressLevels.map((level) => ({ slug: level.id }));
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params, level = getJobStressLevelById(slug);
  if (!level) return {};
  return createMetadata({ title: `${level.title} | 직무 스트레스 테스트 결과`, description: `직무 스트레스 점수와 업무량, 관계, 조직문화, 보상 등 8개 영역별 원인을 확인해 보세요. ${level.summary}`, path: `/job-stress/result/${slug}`, keywords: ["직무 스트레스 테스트", "직장 스트레스 지수", level.title], ogImage: false });
}
export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params, { a } = await searchParams, level = getJobStressLevelById(slug);
  if (!level) notFound();
  const answers = parseJobStressAnswers(a), result = answers ? calculateJobStressResult(answers) : null;
  if (result && result.level.id !== slug) redirect(`/job-stress/result/${result.level.id}?a=${a}`);
  return <><JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: `${level.title} | 직무 스트레스 테스트 결과`, url: absoluteUrl(`/job-stress/result/${slug}`), isPartOf: { "@type": "WebSite", name: "미미테스트", url: absoluteUrl("/") } }} /><JobStressResult level={level} overallScore={result?.overallScore ?? null} factorScores={result?.factorScores ?? null} primaryFactors={result?.primaryFactors ?? []} stableFactor={result?.stableFactor ?? jobStressFactors[0]} encodedAnswers={answers ? a ?? null : null} /></>;
}
