import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { TestRunner } from "@/components/test/TestRunner";
import { AgeStartForm } from "@/components/test/AgeStartForm";
import { getTest, tests } from "@/data/tests";
import { absoluteUrl, createMetadata } from "@/lib/site";
import { parseCurrentAge } from "@/lib/marriage-engine";
import { WorldcupIntro } from "@/components/worldcup/WorldcupIntro";
import { WorldcupGame } from "@/components/worldcup/WorldcupGame";
import { foodWorldcupItems } from "@/data/food-worldcup";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ start?: string; age?: string; play?: string; seed?: string }> };

export function generateStaticParams() { return tests.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const test = getTest(slug);
  if (!test) return {};
  return createMetadata({ title: test.seoTitle ?? test.title, description: test.seoDescription ?? test.description, path: `/tests/${slug}`, keywords: [...(test.keywords ?? []), test.shortTitle, `${test.category} 테스트`] });
}

export default async function TestDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { start, age, play, seed } = await searchParams;
  const test = getTest(slug);
  if (!test) notFound();
  if (test.type === "worldcup") {
    const parsedSeed = Number(seed);
    return play === "1" && Number.isInteger(parsedSeed) && parsedSeed > 0
      ? <WorldcupGame items={foodWorldcupItems} seed={parsedSeed} />
      : <WorldcupIntro />;
  }
  const isOfficeAnimal = test.slug === "office-animal-test";
  const isMarriageTiming = test.slug === "marriage-timing-test";
  const isKkondaePower = test.slug === "kkondae-power-test";
  const currentAge = isMarriageTiming ? parseCurrentAge(age) : null;

  if (start === "1" && (!isMarriageTiming || currentAge)) return <div className="container-page py-8 sm:py-12"><TestRunner test={test} currentAge={currentAge ?? undefined} /></div>;

  return (
    <div className="container-page py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: test.shortTitle }]} />
      <section className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
        <div className="grid min-h-60 place-items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-100"><span className="text-7xl" aria-hidden="true">{test.icon}</span></div>
        <div className="p-6 sm:p-10">
          <div className="flex gap-2 text-xs font-bold"><Link href={`/category/${encodeURIComponent(test.category)}`} className="rounded-full bg-blue-50 px-3 py-1 text-primary">{test.category}</Link><span className="rounded-full bg-slate-100 px-3 py-1 text-slate-500">{test.duration}</span></div>
          <h1 className="mt-5 text-3xl font-black tracking-tight text-ink sm:text-4xl">{test.title}</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">{test.description}</p>
          <ul className="mt-6 grid gap-2 text-sm text-slate-600 sm:grid-cols-3"><li>✓ 총 {test.questions.length}문항</li><li>✓ {isKkondaePower ? "4지선다 간편 응답" : "O/X 간편 응답"}</li><li>✓ 회원가입 없음</li></ul>
          {isMarriageTiming ? <AgeStartForm testSlug={test.slug} /> : <Link href={`/tests/${test.slug}?start=1`} className="mt-8 block w-full rounded-2xl bg-primary px-6 py-4 text-center text-base font-extrabold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">무료로 테스트 시작하기</Link>}
          {!isMarriageTiming && <p className="mt-3 text-center text-xs text-slate-400">응답은 서버에 저장되지 않습니다.</p>}
        </div>
      </section>
      <section className="mx-auto mt-12 max-w-3xl rounded-3xl bg-white p-6 sm:p-8"><h2 className="text-xl font-extrabold text-ink">이 테스트로 알 수 있어요</h2><p className="mt-3 leading-7 text-slate-600">{isKkondaePower ? "업무 방식, 회식과 퇴근에 대한 생각, 피드백 방식, 변화 수용성과 세대 감수성을 살펴 현재의 직장 소통 성향을 점검합니다. 가볍게 웃으면서도 좋은 선배와 동료가 되는 방법을 확인할 수 있습니다." : isMarriageTiming ? "결혼 의지, 현재 관계, 경제적 준비, 커리어 우선순위와 독립성을 함께 살펴 지금 성향에서 결혼 가능성이 자연스럽게 높아지는 시기를 안내합니다. 결과는 예언이 아닌 현재 선택 패턴에 대한 참고 정보입니다." : isOfficeAnimal ? "업무 추진 방식, 정보 탐색, 협업과 갈등 대처, 정확성, 성과 욕구 등 실제 직장 행동을 기준으로 12지신 동물 유형과 비교합니다. 대표 유형과 함께 숨은 보조 성향도 확인할 수 있습니다." : "초기 자본, 선호 업무 방식, 콘텐츠 제작, 디지털 도구, 수익화 속도 등 12가지 기준을 바탕으로 20개 부업과의 적합도를 비교합니다. 대표 추천뿐 아니라 함께 고려할 만한 후보 3개도 확인할 수 있습니다."}</p></section>
      <JsonLd data={{ "@context":"https://schema.org", "@type":"WebApplication", name:test.title, description:test.description, url:absoluteUrl(`/tests/${test.slug}`), applicationCategory:"LifestyleApplication", operatingSystem:"Any", offers:{ "@type":"Offer", price:"0", priceCurrency:"KRW" } }} />
      <JsonLd data={{ "@context":"https://schema.org", "@type":"FAQPage", mainEntity:[
        { "@type":"Question", name:"테스트에는 얼마나 걸리나요?", acceptedAnswer:{ "@type":"Answer", text:`${test.questions.length}개 ${isKkondaePower ? "선택형" : "O/X"} 질문으로 구성되어 약 2분이면 완료할 수 있습니다.` } },
        { "@type":"Question", name:"내 답변이 저장되나요?", acceptedAnswer:{ "@type":"Answer", text:"아니요. 답변은 결과 계산에만 사용되며 별도 서버에 저장하지 않습니다." } },
      ] }} />
    </div>
  );
}
