import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { HogwartsCharacterResult } from "@/components/test/HogwartsCharacterResult";
import { getHogwartsProfile, hogwartsProfiles } from "@/data/hogwarts-character";
import { calculateHogwartsResult, parseHogwartsAnswers } from "@/lib/hogwarts-character-engine";
import { absoluteUrl, createMetadata } from "@/lib/site";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ answers?: string | string[] }> };
export function generateStaticParams() { return hogwartsProfiles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const profile = getHogwartsProfile((await params).slug);
  if (!profile) return {};
  const metadata = createMetadata({ title: `나의 호그와트 캐릭터: ${profile.name}`, description: profile.tagline, path: `/hogwarts-character-test/result/${profile.slug}`, index: false });
  return { ...metadata, openGraph: { ...metadata.openGraph, images: [{ url: absoluteUrl(profile.image), alt: profile.name }] }, twitter: { ...metadata.twitter, images: [absoluteUrl(profile.image)] } };
}
export default async function Page({ params, searchParams }: Props) {
  const profile = getHogwartsProfile((await params).slug);
  if (!profile) notFound();
  const answers = parseHogwartsAnswers((await searchParams).answers);
  const calculated = answers ? calculateHogwartsResult(answers) : null;
  if (calculated && calculated.profile.slug !== profile.slug) redirect(`/hogwarts-character-test/result/${calculated.profile.slug}?answers=${answers!.join("")}`);
  return <HogwartsCharacterResult profile={calculated?.profile ?? profile} personalized={Boolean(calculated)} />;
}
