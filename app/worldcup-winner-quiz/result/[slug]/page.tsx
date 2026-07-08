import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { WorldCupWinnerQuizResult } from "@/components/test/WorldCupWinnerQuizResult";
import { JsonLd } from "@/components/seo/JsonLd";
import { getWorldCupWinnerGradeProfile, worldCupWinnerGradeProfiles } from "@/data/worldcup-winners";
import { absoluteUrl, createMetadata } from "@/lib/site";
import { calculateWorldCupWinnerQuizResult, parseWorldCupWinnerAnswers, worldCupWinnerResultPath } from "@/lib/worldcup-winner-engine";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ r?: string }> };

export function generateStaticParams() {
  return worldCupWinnerGradeProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const grade = getWorldCupWinnerGradeProfile(slug);
  if (!grade) return {};
  return createMetadata({
    title: `${grade.name} | 역대 월드컵 우승국 퀴즈 결과 | 미미테스트`,
    description: `역대 월드컵 우승국 퀴즈 결과 ${grade.name}. 1930년부터 2022년까지 월드컵 우승국을 얼마나 맞혔는지 확인해보세요.`,
    path: worldCupWinnerResultPath(grade.slug),
    keywords: ["역대 월드컵 우승국", "월드컵 우승국 퀴즈", "월드컵 퀴즈", "축구 퀴즈", grade.name],
    ogImage: false,
  });
}

export default async function WorldCupWinnerQuizResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { r } = await searchParams;
  const grade = getWorldCupWinnerGradeProfile(slug);
  if (!grade) notFound();

  const answers = parseWorldCupWinnerAnswers(r);
  const result = answers ? calculateWorldCupWinnerQuizResult(answers) : null;
  if (result && result.grade.slug !== slug) redirect(`${worldCupWinnerResultPath(result.grade.slug)}?r=${r}`);

  return (
    <>
      <WorldCupWinnerQuizResult
        grade={result?.grade ?? grade}
        score={result?.score ?? null}
        correctCount={result?.correctCount ?? null}
        total={result?.total ?? 10}
        wrong={result?.wrong ?? []}
        encodedAnswers={answers ? r ?? null : null}
      />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `역대 월드컵 우승국 퀴즈 결과: ${grade.name}`,
        description: grade.summary,
        url: absoluteUrl(worldCupWinnerResultPath(grade.slug)),
        inLanguage: "ko-KR",
        isAccessibleForFree: true,
        about: { "@type": "Quiz", "@id": absoluteUrl("/tests/worldcup-winner-quiz#quiz") },
      }} />
    </>
  );
}
