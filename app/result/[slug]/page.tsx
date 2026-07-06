import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { StatBars } from "@/components/results/StatBars";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { AnimalResult } from "@/components/test/AnimalResult";
import { MarriageResult } from "@/components/test/MarriageResult";
import { KkondaeResult } from "@/components/test/KkondaeResult";
import { WorldcupResult } from "@/components/worldcup/WorldcupResult";
import { BurnoutResult } from "@/components/test/BurnoutResult";
import { ConsumerStyleResult } from "@/components/test/ConsumerStyleResult";
import { getResultProfile, resultProfiles } from "@/data/tests";
import { animalProfiles, getAnimalProfile } from "@/data/office-animals";
import { getMarriageResultProfile, marriageResultProfiles } from "@/data/marriage-timing";
import { getKkondaeResultProfile, kkondaeResultProfiles } from "@/data/kkondae-power";
import { foodWorldcupItems, getFoodWorldcupItemByResult } from "@/data/food-worldcup";
import { burnoutResultProfiles, getBurnoutResultProfile } from "@/data/burnout-risk";
import { consumerResultProfiles, getConsumerResultProfile } from "@/data/consumer-style";
import { calculateResults, parseAnswers } from "@/lib/test-engine";
import { calculateOfficeAnimalResults, parseOfficeAnimalAnswers } from "@/lib/office-animal-engine";
import { calculateMarriageResult, parseCurrentAge, parseMarriageAnswers } from "@/lib/marriage-engine";
import { calculateKkondaeResult, parseKkondaeAnswers } from "@/lib/kkondae-engine";
import { createMetadata } from "@/lib/site";
import { calculateBurnoutResult, parseBurnoutAnswers } from "@/lib/burnout-engine";
import { calculateConsumerResult, parseConsumerAnswers } from "@/lib/consumer-style-engine";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ answers?: string; age?: string }> };

export function generateStaticParams() { return [...resultProfiles, ...animalProfiles, ...marriageResultProfiles, ...kkondaeResultProfiles, ...burnoutResultProfiles, ...consumerResultProfiles, ...foodWorldcupItems.map((item)=>({slug:item.resultSlug}))].map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const foodWinner = getFoodWorldcupItemByResult(slug);
  if (foodWinner) return createMetadata({ title:`${foodWinner.name} 우승 | 주말 배달음식 월드컵`, description:`주말 배달음식 월드컵 우승 메뉴는 ${foodWinner.name}! 배달 팁과 함께 먹기 좋은 메뉴를 확인하세요.`, path:`/result/${slug}`, keywords:["배달음식 월드컵",foodWinner.name,"오늘 뭐 먹지"] });
  const burnout=getBurnoutResultProfile(slug);
  if(burnout)return createMetadata({title:`${burnout.name} | 번아웃 위험도 테스트 결과`,description:`${burnout.summary} 에너지 고갈과 정서적 소진, 회복 가능성 영역별 결과를 확인해보세요.`,path:`/result/${slug}`,keywords:["번아웃 테스트","번아웃 자가진단",burnout.name]});
  const consumer=getConsumerResultProfile(slug);
  if(consumer)return createMetadata({title:`${consumer.name} | 소비성향 테스트 결과`,description:`${consumer.summary}. 계획성, 충동성, 경험 선호와 미래 지향성 점수를 확인해보세요.`,path:`/result/${slug}`,keywords:["소비성향 테스트","소비 유형 테스트",consumer.name]});
  const kkondae = getKkondaeResultProfile(slug);
  if (kkondae) return createMetadata({ title:`${kkondae.name} | 꼰대력 테스트 결과`, description:`${kkondae.summary} 나의 직장 꼰대력 점수와 소통 성향을 확인해보세요.`, path:`/result/${slug}`, keywords:["꼰대력 테스트",kkondae.name,"직장인 테스트"] });
  const marriage = getMarriageResultProfile(slug);
  if (marriage) return createMetadata({ title: `${marriage.name} | 예상 결혼 시기 결과`, description: `${marriage.summary}. 현재 성향에서 결혼 가능성이 높아지는 시기와 준비할 점을 확인하세요.`, path: `/result/${slug}`, keywords: ["결혼 시기 테스트", marriage.name, "예상 결혼 시기"] });
  const animal = getAnimalProfile(slug);
  if (animal) return createMetadata({ title: `회사 동물 유형: ${animal.alias} ${animal.animal}형`, description: `${animal.summary}. 직장 내 업무 스타일, 상사·동료 관계, 강점과 추천 직무를 확인하세요.`, path: `/result/${slug}`, keywords: ["회사 동물 테스트", `${animal.animal}형`, animal.alias] });
  const result = getResultProfile(slug);
  if (!result) return {};
  return createMetadata({ title: `부업 추천 결과: ${result.name}`, description: `${result.tagline}. ${result.name} 부업의 장단점, 시작 비용, 수익화 속도와 첫 시작 방법을 확인하세요.`, path: `/result/${slug}`, keywords: [`${result.name} 부업`, `${result.name} 시작`] });
}

export default async function ResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { answers: rawAnswers, age: rawAge } = await searchParams;
  const foodWinner = getFoodWorldcupItemByResult(slug);
  if (foodWinner) return <WorldcupResult item={foodWinner} />;
  const burnoutProfile=getBurnoutResultProfile(slug);
  if(burnoutProfile){
    const burnoutAnswers=parseBurnoutAnswers(rawAnswers);
    const calculated=burnoutAnswers?calculateBurnoutResult(burnoutAnswers):null;
    if(calculated&&calculated.profile.slug!==slug)redirect(`/result/${calculated.profile.slug}?answers=${rawAnswers}`);
    const fallbackScore=Math.round((burnoutProfile.minScore+burnoutProfile.maxScore)/2);
    const fallbackAreas={energy:fallbackScore,emotional:fallbackScore,disengagement:fallbackScore,interpersonal:fallbackScore,recovery:100-fallbackScore};
    return <BurnoutResult profile={calculated?.profile??burnoutProfile} riskScore={calculated?.riskScore??fallbackScore} areaScores={calculated?.areaScores??fallbackAreas} />;
  }
  const consumerProfile=getConsumerResultProfile(slug);
  if(consumerProfile){
    const consumerAnswers=parseConsumerAnswers(rawAnswers);
    const calculated=consumerAnswers?calculateConsumerResult(consumerAnswers):null;
    if(calculated&&calculated.profile.slug!==slug)redirect(`/result/${calculated.profile.slug}?answers=${rawAnswers}`);
    return <ConsumerStyleResult profile={calculated?.profile??consumerProfile} fitScore={calculated?.fitScore??86} areaScores={calculated?.areaScores??consumerProfile.typicalScores} secondary={calculated?.secondary} />;
  }
  const kkondaeProfile = getKkondaeResultProfile(slug);
  if (kkondaeProfile) {
    const kkondaeAnswers = parseKkondaeAnswers(rawAnswers);
    const calculated = kkondaeAnswers ? calculateKkondaeResult(kkondaeAnswers) : null;
    if (calculated && calculated.profile.slug !== slug) redirect(`/result/${calculated.profile.slug}?answers=${rawAnswers}`);
    const score = calculated?.score ?? Math.round((kkondaeProfile.minScore + kkondaeProfile.maxScore) / 2);
    return <KkondaeResult profile={calculated?.profile ?? kkondaeProfile} score={score} percentage={calculated?.percentage ?? Math.round((score/30)*100)} points={calculated?.points ?? []} />;
  }
  const marriageProfile = getMarriageResultProfile(slug);
  if (marriageProfile) {
    const marriageAnswers = parseMarriageAnswers(rawAnswers);
    const currentAge = parseCurrentAge(rawAge);
    const calculated = marriageAnswers ? calculateMarriageResult(marriageAnswers) : null;
    if (calculated && calculated.profile.slug !== slug) redirect(`/result/${calculated.profile.slug}?answers=${rawAnswers}${currentAge ? `&age=${currentAge}` : ""}`);
    return <MarriageResult profile={calculated?.profile ?? marriageProfile} currentAge={currentAge} scores={calculated?.scores} />;
  }
  const animalProfile = getAnimalProfile(slug);
  if (animalProfile) {
    const animalAnswers = parseOfficeAnimalAnswers(rawAnswers);
    const animalRanked = animalAnswers ? calculateOfficeAnimalResults(animalAnswers) : [{ ...animalProfile, score: 0, percentage: 86 }];
    if (animalAnswers && animalRanked[0]?.slug !== slug) redirect(`/result/${animalRanked[0].slug}?answers=${rawAnswers}`);
    const animalResult = animalRanked[0];
    const secondary = animalAnswers ? animalRanked[1] : undefined;
    return <AnimalResult result={animalResult} secondary={secondary} isTie={Boolean(secondary && secondary.score === animalResult.score)} />;
  }
  const baseResult = getResultProfile(slug);
  if (!baseResult) notFound();
  const answers = parseAnswers(rawAnswers);
  const ranked = answers ? calculateResults(answers) : [{ ...baseResult, score: 0, percentage: 86 }];
  if (answers && ranked[0]?.slug !== slug) redirect(`/result/${ranked[0].slug}?answers=${rawAnswers}`);
  const result = ranked[0];
  const alternatives = ranked.slice(1, 4);
  const sharePath = `/result/${result.slug}`;
  const resultStats = [
    { label: "성향 적합도", value: result.percentage },
    { label: "실행 가능성", value: result.difficulty === "쉬움" ? 92 : result.difficulty === "보통" ? 82 : 72 },
    { label: "성장 잠재력", value: 88 },
    { label: "업무 자율성", value: 84 },
  ];

  return (
    <div className="container-page py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: `${result.name} 결과` }]} />
      <div className="mx-auto max-w-4xl">
        <SectionReveal><section className="overflow-hidden rounded-3xl border border-slate-200 bg-white text-center shadow-card">
          <div className="bg-gradient-to-b from-blue-50 to-white px-6 pb-4 pt-10 sm:pt-14">
            <p className="text-sm font-extrabold text-primary">나에게 가장 잘 맞는 부업은</p>
            <div className="mt-5 text-7xl" aria-hidden="true">{result.icon}</div>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">{result.name}</h1>
            <p className="mt-3 text-base font-medium text-slate-600">{result.tagline}</p>
            <div className="mx-auto mt-6 grid size-28 place-items-center rounded-full p-2 shadow-lg" style={{ background: `conic-gradient(#2563EB ${result.percentage}%, #DBEAFE 0)` }}><div className="grid size-full place-items-center rounded-full bg-white"><span><strong className="block text-3xl font-black text-primary">{result.percentage}%</strong><span className="text-[11px] font-bold text-slate-400">적합도</span></span></div></div>
          </div>
          <div className="px-6 pb-8 sm:px-10"><p className="mx-auto max-w-2xl leading-7 text-slate-700">{result.reason}</p></div>
        </section></SectionReveal>

        <AdRectangle />

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          {[["시작 난이도", result.difficulty], ["초기 비용", result.initialCost], ["예상 수익화", result.monetizationSpeed]].map(([label,value]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-card"><p className="text-xs font-bold text-slate-400">{label}</p><p className="mt-2 font-extrabold text-ink">{value}</p></div>)}
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8"><h2 className="text-xl font-extrabold text-ink">내 성향 분석</h2><p className="mt-4 leading-8 text-slate-700">{result.analysis}</p></section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8"><p className="text-xs font-black text-primary">SIDE JOB STATS</p><h2 className="mt-2 text-xl font-black text-ink">부업 능력치</h2><div className="mt-6"><StatBars stats={resultStats} /></div></section>

        <section className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6"><h2 className="font-extrabold text-emerald-900">이런 점이 좋아요</h2><ul className="mt-4 space-y-3 text-sm leading-6 text-emerald-950">{result.pros.map((item) => <li key={item}>✓ {item}</li>)}</ul></div>
          <div className="rounded-3xl border border-amber-100 bg-amber-50/60 p-6"><h2 className="font-extrabold text-amber-900">미리 알아두세요</h2><ul className="mt-4 space-y-3 text-sm leading-6 text-amber-950">{result.cons.map((item) => <li key={item}>• {item}</li>)}</ul></div>
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8"><h2 className="text-xl font-extrabold text-ink">오늘 바로 시작하는 방법</h2><ol className="mt-6 space-y-5">{result.firstSteps.map((step,index) => <li key={step} className="flex gap-4"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-black text-white">{index+1}</span><p className="pt-1 text-sm leading-6 text-slate-700">{step}</p></li>)}</ol><div className="mt-7 border-t border-slate-100 pt-6"><p className="text-sm font-extrabold text-ink">추천 플랫폼</p><div className="mt-3 flex flex-wrap gap-2">{result.platforms.map((item) => <span key={item} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600">{item}</span>)}</div></div></section>

        {alternatives.length > 0 && <section className="mt-10"><h2 className="text-xl font-black text-ink">함께 잘 맞는 부업</h2><div className="mt-5 grid gap-3 sm:grid-cols-3">{alternatives.map((item,index) => <Link key={item.slug} href={`/result/${item.slug}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-blue-200"><div className="flex items-center justify-between"><span className="text-3xl">{item.icon}</span><span className="text-xs font-bold text-primary">{index+2}위 · {item.percentage}%</span></div><h3 className="mt-4 font-extrabold text-ink">{item.name}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{item.tagline}</p></Link>)}</div></section>}

        <section id="share-card" className="scroll-mt-24 mt-10 grid gap-6 rounded-3xl bg-ink p-6 text-white sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><ShareImageCard emoji={result.icon} eyebrow="나에게 맞는 부업은" title={result.name} subtitle={result.tagline} badge={`적합도 ${result.percentage}%`} accent="blue" /><div><h2 className="text-xl font-extrabold">친구의 결과도 궁금하다면?</h2><p className="mt-2 text-sm leading-6 text-slate-300">결과를 공유하고 서로에게 맞는 부업을 비교해 보세요.</p><div className="mt-5"><ShareButtons title={`내 부업 추천 결과는 ${result.name}!`} description={result.tagline} path={sharePath} /></div></div></section>
        <div className="mt-8 text-center"><Link href="/tests/side-job-recommendation?start=1" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50">테스트 다시 하기</Link></div>
        <p className="mt-8 text-center text-xs leading-5 text-slate-400">이 결과는 성향 탐색을 위한 참고 정보이며 실제 수익이나 성과를 보장하지 않습니다.</p>
      </div>
      <MobileShareDock />
    </div>
  );
}
