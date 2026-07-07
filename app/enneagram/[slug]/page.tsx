import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { EnneagramResult } from "@/components/test/EnneagramResult";
import { JsonLd } from "@/components/seo/JsonLd";
import { enneagramProfiles, getEnneagramProfile } from "@/data/enneagram";
import { absoluteUrl, createMetadata } from "@/lib/site";
import { calculateEnneagramResult, enneagramResultPath, parseEnneagramAnswers } from "@/lib/enneagram-engine";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ answers?: string }> };

export function generateStaticParams() {
  return enneagramProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = getEnneagramProfile(slug);
  if (!profile) return {};
  return createMetadata({
    title: `애니어그램 ${profile.number}번 ${profile.name} 특징 | 애니어그램 테스트 결과`,
    description: `애니어그램 테스트에서 ${profile.number}번 ${profile.name} 유형이 나온 사람의 핵심 욕구, 두려움, 인간관계 스타일과 성장 방향을 확인해보세요.`,
    path: enneagramResultPath(profile.slug),
    keywords: ["애니어그램 테스트", `애니어그램 ${profile.number}번`, profile.name, "애니어그램 유형", "성격유형 테스트", "심리테스트"],
  });
}

export default async function EnneagramResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { answers: rawAnswers } = await searchParams;
  const profile = getEnneagramProfile(slug);
  if (!profile) notFound();

  const answers = parseEnneagramAnswers(rawAnswers);
  const calculated = answers ? calculateEnneagramResult(answers) : null;
  if (calculated && calculated.profile.slug !== slug) {
    redirect(`${enneagramResultPath(calculated.profile.slug)}?answers=${rawAnswers}`);
  }

  return (
    <>
      <EnneagramResult profile={calculated?.profile ?? profile} topThree={calculated?.topThree ?? []} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `애니어그램 ${profile.number}번 ${profile.name} 결과`,
        description: profile.summary,
        url: absoluteUrl(enneagramResultPath(profile.slug)),
        inLanguage: "ko-KR",
        isAccessibleForFree: true,
      }} />
    </>
  );
}
