import Image from "next/image";
import Link from "next/link";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import {
  interpersonalDimensionGuides,
  interpersonalDimensionOrder,
  interpersonalResultProfiles,
} from "@/data/interpersonal-ability";
import {
  encodeInterpersonalDimensionScores,
  getInterpersonalDimensionTitles,
} from "@/lib/interpersonal-ability-engine";
import type {
  InterpersonalDimension,
  InterpersonalDimensionScores,
  InterpersonalResultProfile,
} from "@/lib/types";

type Props = {
  grade: InterpersonalResultProfile;
  score: number | null;
  dimensionScores: InterpersonalDimensionScores | null;
  strongestDimensions: InterpersonalDimension[] | null;
  growthDimensions: InterpersonalDimension[] | null;
};

const fallbackScores = {
  empathy_understanding: 64,
  self_expression: 58,
  relationship_reciprocity: 61,
  conflict_repair: 60,
} satisfies InterpersonalDimensionScores;

export function InterpersonalAbilityResult({ grade, score, dimensionScores, strongestDimensions, growthDimensions }: Props) {
  const hasResult = score !== null;
  const shareScore = score ?? Math.round((grade.minScore + grade.maxScore) / 2);
  const scores = dimensionScores ?? fallbackScores;
  const topDimensions = strongestDimensions ?? [interpersonalDimensionOrder.reduce((top, dimension) => scores[dimension] > scores[top] ? dimension : top)];
  const lowDimensions = growthDimensions ?? [interpersonalDimensionOrder.reduce((low, dimension) => scores[dimension] < scores[low] ? dimension : low)];
  const topLabel = getInterpersonalDimensionTitles(topDimensions, dimensionTitles);
  const lowLabel = getInterpersonalDimensionTitles(lowDimensions, dimensionTitles);
  const encodedScores = encodeInterpersonalDimensionScores(scores);
  const sharePath = `/interpersonal-ability-test/result/${grade.slug}?s=${shareScore}&d=${encodedScores}`;
  const shareTitle = `내 대인관계 능력 지수는 ${shareScore}점! ${grade.title}이 나왔어요.`;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ccfbf1_0,#eef2ff_38%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "대인관계 능력", href: "/tests/interpersonal-ability-test" }, { name: `${grade.title} 결과` }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="overflow-hidden rounded-3xl border border-teal-100 bg-white text-center shadow-card">
              <div className="relative mx-auto aspect-square w-full max-w-xl overflow-hidden bg-teal-50">
                <Image src={grade.image} alt={`${grade.title} 대표 이미지`} fill sizes="(max-width:768px) 100vw, 576px" className="object-cover" priority />
              </div>
              <div className="px-6 py-8 sm:px-10">
                <p className="text-sm font-extrabold text-teal-600">{hasResult ? "나의 대인관계 능력 지수는" : "대인관계 능력 결과 단계"}</p>
                <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">{grade.title}</h1>
                <p className="mx-auto mt-3 max-w-2xl text-base font-medium text-slate-600">{grade.summary}</p>
                <div className="mx-auto mt-7 grid size-36 place-items-center rounded-full p-2 shadow-lg" style={{ background: `conic-gradient(#0F766E ${shareScore}%, #CCFBF1 0)` }}>
                  <div className="grid size-full place-items-center rounded-full bg-white">
                    <span>
                      <strong className="block text-4xl font-black tabular-nums text-teal-600">{shareScore}<span className="text-lg text-teal-400">점</span></strong>
                      <span className="text-[11px] font-bold text-slate-400">대인관계 지수</span>
                    </span>
                  </div>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-left leading-7 text-slate-700">{grade.description}</p>
              </div>
            </section>
          </SectionReveal>

          <AdRectangle />

          <SectionReveal className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-ink">4개 관계 역량별 점수</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">각 영역은 3문항, 9점 만점 원점수를 0~100점으로 환산합니다.</p>
              </div>
              <span className="text-sm font-black text-teal-600">총점 {shareScore}점</span>
            </div>
            <div className="mt-6 grid gap-4">
              {interpersonalDimensionOrder.map((dimension) => {
                const guide = interpersonalDimensionGuides[dimension];
                const value = scores[dimension];
                return (
                  <div key={dimension} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                    <div className="flex items-center justify-between gap-3 text-sm font-black text-slate-700">
                      <span>{guide.title}</span>
                      <span className="tabular-nums text-teal-600">{value}점</span>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-white">
                      <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-indigo-500" style={{ width: `${value}%` }} />
                    </div>
                    <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">{guide.description}</p>
                  </div>
                );
              })}
            </div>
          </SectionReveal>

          <section className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6">
              <h2 className="font-extrabold text-emerald-950">나의 가장 강한 관계 역량</h2>
              <p className="mt-3 text-sm font-bold leading-6 text-emerald-900">{topLabel}</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-emerald-950">
                {grade.strengths.map((item) => <li key={item}>✓ {item}</li>)}
              </ul>
            </div>
            <div className="rounded-3xl border border-teal-100 bg-teal-50/70 p-6">
              <h2 className="font-extrabold text-teal-950">보완하면 좋은 관계 습관</h2>
              <p className="mt-3 text-sm font-bold leading-6 text-teal-900">{lowLabel}</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-teal-950">
                {grade.cautions.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-extrabold text-ink">실천 가능한 맞춤 조언 3가지</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {grade.recommendations.map((tip) => <div key={tip} className="rounded-2xl bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">{tip}</div>)}
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-indigo-100 bg-indigo-50/70 p-6 sm:p-8">
            <h2 className="text-xl font-extrabold text-indigo-950">낮은 영역을 위한 작은 연습</h2>
            <div className="mt-5 grid gap-4">
              {lowDimensions.map((dimension) => {
                const guide = interpersonalDimensionGuides[dimension];
                return (
                  <div key={dimension} className="rounded-2xl bg-white p-5 shadow-sm">
                    <h3 className="font-extrabold text-ink">{guide.title}</h3>
                    <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 sm:grid-cols-2">
                      {guide.recommendations.map((item) => <li key={item}>• {item}</li>)}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-extrabold text-ink">결과 유형별 점수 범위</h2>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-5">
              {interpersonalResultProfiles.map((profile) => (
                <li key={profile.slug}>
                  <Link href={`/interpersonal-ability-test/result/${profile.slug}`} className={`block rounded-2xl border px-3 py-4 text-center transition hover:-translate-y-0.5 ${profile.slug === grade.slug ? "border-teal-400 bg-teal-50" : "border-slate-200 bg-white hover:border-teal-200"}`}>
                    <span className="text-2xl" aria-hidden="true">{profile.icon}</span>
                    <p className="mt-2 text-xs font-extrabold text-ink">{profile.title}</p>
                    <p className="mt-1 text-[11px] font-black tabular-nums text-slate-400">{profile.minScore}~{profile.maxScore}점</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section id="share-card" className="mt-10 grid scroll-mt-24 gap-6 rounded-3xl bg-ink p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <ShareImageCard emoji={grade.icon} eyebrow="나의 대인관계 능력 지수는" title={`${shareScore}점 · ${grade.title}`} subtitle={grade.summary} badge={`관계 지수 ${shareScore}점`} accent="green" />
            <div>
              <h2 className="text-xl font-extrabold">당신은 사람들과 어떻게 관계를 만들어가나요?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">결과를 공유해도 문항별 답변이나 개인정보는 포함되지 않습니다.</p>
              <div className="mt-5"><ShareButtons title={shareTitle} description={grade.summary} path={sharePath} /></div>
            </div>
          </section>

          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-500 shadow-card">
            <p>본 테스트는 평소 대인관계와 의사소통 방식을 간단하게 돌아보기 위한 자가 점검용 콘텐츠입니다. 표준화된 전문 심리검사나 의학적 진단을 대신하지 않으며, 결과는 응답 당시의 상황과 관계 환경에 따라 달라질 수 있습니다.</p>
            <p className="mt-3 text-xs leading-6 text-slate-400">대인관계의 어려움으로 인해 불안이나 스트레스가 지속되고 일상생활에 큰 불편이 있다면 전문 상담기관의 도움을 고려할 수 있습니다.</p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-black text-ink">다른 성격·심리 테스트</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {relatedPersonalityTests.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-teal-200">
                  <span className="text-3xl" aria-hidden="true">{item.icon}</span>
                  <h3 className="mt-3 font-extrabold text-ink">{item.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/tests/interpersonal-ability-test?start=1" className="inline-flex rounded-xl bg-primary px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">테스트 다시 하기</Link>
            <Link href="/tests" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50">다른 테스트 하기</Link>
          </div>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}

const dimensionTitles = Object.fromEntries(
  interpersonalDimensionOrder.map((dimension) => [dimension, interpersonalDimensionGuides[dimension].title]),
) as Record<InterpersonalDimension, string>;

const relatedPersonalityTests = [
  { title: "자아탄력성 테스트", href: "/tests/ego-resilience-test", icon: "🌱", description: "스트레스 뒤 다시 회복하는 방식을 살펴봐요." },
  { title: "EQ 테스트", href: "/tests/eq-test", icon: "🧠", description: "감정 인식과 공감 능력의 균형을 확인해요." },
  { title: "Big Five 테스트", href: "/tests/big-five", icon: "🧭", description: "성격 5요인을 점수로 넓게 살펴봐요." },
];
