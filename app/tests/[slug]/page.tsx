import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { TestSeoContent } from "@/components/seo/TestSeoContent";
import { TestRunner } from "@/components/test/TestRunner";
import { AgeStartForm } from "@/components/test/AgeStartForm";
import { getTest, tests } from "@/data/tests";
import { absoluteUrl, createMetadata, siteConfig } from "@/lib/site";
import { parseCurrentAge } from "@/lib/marriage-engine";
import { WorldcupIntro } from "@/components/worldcup/WorldcupIntro";
import { WorldcupGame } from "@/components/worldcup/WorldcupGame";
import { foodWorldcupItems } from "@/data/food-worldcup";
import { BurnoutTestPage } from "@/components/test/BurnoutTestPage";
import { ConsumerStyleTestPage } from "@/components/test/ConsumerStyleTestPage";
import { LoveMbtiTestPage } from "@/components/test/LoveMbtiTestPage";
import { AttachmentStyleTestPage } from "@/components/test/AttachmentStyleTestPage";
import { FootballQuizTestPage } from "@/components/test/FootballQuizTestPage";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ start?: string; age?: string; play?: string; seed?: string }> };

export function generateStaticParams() { return tests.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const test = getTest(slug);
  if (!test) return {};
  return createMetadata({ title: test.seoTitle ?? test.title, description: test.seoDescription ?? test.description, path: `/tests/${slug}`, keywords: [...(test.keywords ?? []), test.shortTitle, `${test.category} 테스트`], ogImage: false });
}

export default async function TestDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { start, age, play, seed } = await searchParams;
  const test = getTest(slug);
  if (!test) notFound();
  if (test.type === "fortune") redirect(test.href ?? "/fortune/today");
  if (test.type === "worldcup") {
    const parsedSeed = Number(seed);
    return play === "1" && Number.isInteger(parsedSeed) && parsedSeed > 0
      ? <WorldcupGame items={foodWorldcupItems} seed={parsedSeed} />
      : <><WorldcupIntro /><div className="container-page pb-10 sm:pb-14"><TestSeoContent test={test} /><RelatedTests current={test} /></div></>;
  }
  const isOfficeAnimal = test.slug === "office-animal-test";
  const isMarriageTiming = test.slug === "marriage-timing-test";
  const isKkondaePower = test.slug === "kkondae-power-test";
  const isBurnoutRisk = test.slug === "burnout-risk-test";
  const isConsumerStyle = test.slug === "consumer-style-test";
  const isLoveMbti = test.slug === "love-mbti-test";
  const isLoverScore = test.slug === "lover-score-test";
  const isAttachmentStyle = test.slug === "attachment-style-test";
  const isJoseonDestiny = test.slug === "joseon-destiny-test";
  const isPersonalityCountry = test.slug === "personality-country-test";
  const isColorPersonality = test.slug === "color-personality-test";
  const isEnneagram = test.slug === "enneagram";
  const isEqTest = test.slug === "eq-test";
  const isBigFive = test.slug === "big-five";
  const isFootballQuiz = test.slug === "football-iq-test";
  const currentAge = isMarriageTiming ? parseCurrentAge(age) : null;

  if (isFootballQuiz && start === "1") return <FootballQuizTestPage />;
  if (isBurnoutRisk && start === "1") return <BurnoutTestPage />;
  if (isConsumerStyle && start === "1") return <ConsumerStyleTestPage />;
  if (isLoveMbti && start === "1") return <LoveMbtiTestPage />;
  if (isAttachmentStyle && start === "1") return <AttachmentStyleTestPage />;
  if (start === "1" && (!isMarriageTiming || currentAge)) return <div className="container-page py-8 sm:py-12"><TestRunner test={test} currentAge={currentAge ?? undefined} /></div>;

  const itemCount=test.itemCount??test.questions.length;
  const answerType=test.type==="likert"||isBurnoutRisk||isBigFive?"5점 척도":isKkondaePower||isEnneagram||isEqTest||isFootballQuiz?"4지선다":isJoseonDestiny||isPersonalityCountry||isLoverScore||isColorPersonality?"2지선다":"O/X";

  return (
    <div className="container-page py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: test.shortTitle }]} />
      <section className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
        <div className="grid min-h-60 place-items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-100"><span className="text-7xl" aria-hidden="true">{test.icon}</span></div>
        <div className="p-6 sm:p-10">
          <div className="flex gap-2 text-xs font-bold"><Link href={`/category/${encodeURIComponent(test.category)}`} className="rounded-full bg-blue-50 px-3 py-1 text-primary">{test.category}</Link><span className="rounded-full bg-slate-100 px-3 py-1 text-slate-500">{test.duration}</span></div>
          <h1 className="mt-5 text-3xl font-black tracking-tight text-ink sm:text-4xl">{test.title}</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">{test.description}</p>
          <ul className="mt-6 grid gap-2 text-sm text-slate-600 sm:grid-cols-3"><li>✓ 총 {itemCount}문항</li><li>✓ {answerType} 간편 응답</li><li>✓ 회원가입 없음</li></ul>
          {isMarriageTiming ? <AgeStartForm testSlug={test.slug} /> : <Link href={`/tests/${test.slug}?start=1`} className="mt-8 block w-full rounded-2xl bg-primary px-6 py-4 text-center text-base font-extrabold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">무료로 테스트 시작하기</Link>}
          {!isMarriageTiming && <p className="mt-3 text-center text-xs text-slate-400">응답은 서버에 저장되지 않습니다.</p>}
        </div>
      </section>
      <section className="mx-auto mt-12 max-w-3xl rounded-3xl bg-white p-6 sm:p-8"><h2 className="text-xl font-extrabold text-ink">이 테스트로 알 수 있어요</h2><p className="mt-3 leading-7 text-slate-600">{isFootballQuiz ? "월드컵, 챔피언스리그, 프리미어리그·라리가 등 유럽 리그, 레전드 선수와 축구 역사까지 다양한 영역의 축구 상식을 15문제로 점검합니다. 쉬움·보통·어려움 문제은행에서 매번 랜덤으로 출제되며, 난이도별 배점을 반영해 0~100점의 축잘알 지수와 5단계 등급을 알려드립니다. 틀린 문제는 결과에서 정답과 해설로 다시 확인할 수 있습니다." : isBigFive ? "개방성, 성실성, 외향성, 친화성, 정서 민감성 5개 OCEAN 성격 차원을 25개 문항으로 분석합니다. MBTI처럼 하나의 유형으로 단정하지 않고, 각 성격 특성이 얼마나 두드러지는지 점수와 레이더 차트로 보여주며 업무 스타일, 인간관계 스타일, 연애 스타일, 스트레스 반응과 성장 포인트까지 함께 안내합니다." : isEqTest ? "EQ 테스트와 공감지수 테스트를 통해 자기인식, 자기조절, 공감능력, 사회성, 감정회복력 5개 영역을 확인합니다. 15개 문항의 응답을 바탕으로 EQ 점수와 공감지수 점수, 강점 영역과 보완 영역을 함께 보여주며, 결과에서는 성장 팁과 추천 행동까지 안내합니다." : isEnneagram ? "애니어그램 테스트는 겉으로 보이는 행동보다 내면의 동기, 두려움, 욕구와 관계 방식을 중심으로 9가지 성격유형 중 나와 가장 가까운 유형을 찾아봅니다. 18개 문항을 통해 대표 유형과 상위 3개 유형 점수를 함께 확인할 수 있으며, 결과에서는 강점, 주의점, 잘 맞는 관계와 성장 방향을 안내합니다." : isColorPersonality ? "외향성, 계획성, 감정 표현, 공감 능력, 도전 성향, 안정 추구, 창의성, 독립성, 현실성, 직관성 등 10가지 성향을 바탕으로 나의 성격 컬러를 분석합니다. 12개의 일상 상황형 질문에 답하면 대표 컬러와 보조 컬러가 함께 계산되며, 성격 특징뿐 아니라 인간관계, 연애 스타일, 스트레스 반응, 어울리는 직업 성향까지 확인할 수 있습니다." : isPersonalityCountry ? "개방성, 질서·계획성, 사교 에너지, 자율성, 자연 선호, 성장 욕구, 문화 감성, 안정감 8가지 성향을 바탕으로 나와 잘 맞는 해외 국가의 라이프스타일 이미지를 분석합니다. 특정 국가를 단정적으로 설명하기보다, 당신의 생활 방식과 가치관이 어떤 분위기와 잘 맞는지 여행·생활 키워드 중심으로 안내합니다." : isJoseonDestiny ? "리더십, 지략, 창의성, 모험심, 공감력, 실용성 6가지 성향을 바탕으로 조선시대에서 어떤 운명을 살았을지 분석합니다. 역사적 고증보다 재미와 공유성을 우선한 테스트이며, 왕부터 전설의 책사까지 32가지 결과 중 가장 가까운 조선 캐릭터를 확인할 수 있습니다." : isAttachmentStyle ? "가까운 관계에서 반복되는 애착 불안과 애착 회피 경향을 2축으로 살펴봅니다. 상대의 반응 변화에 얼마나 민감한지, 친밀감과 감정 공유를 얼마나 편안하게 느끼는지에 따라 안정형, 불안형, 회피형, 불안회피형 중 현재 가장 가까운 관계 패턴을 안내합니다." : isLoveMbti ? "애착 안정성, 감정 표현력, 관계 주도성, 독립성과 애정 표현 선호를 함께 분석합니다. 8개 유형 가운데 가장 가까운 대표·보조 성향과 유형별 궁합을 확인할 수 있으며, 결과는 관계의 성공을 단정하는 진단이 아닌 소통 패턴을 돌아보기 위한 정보입니다." : isLoverScore ? "배려심, 책임감, 표현력, 안정감, 갈등해결력, 독립성, 유머감각, 신뢰도 8가지 지표를 바탕으로 나의 애인 점수와 연애 유형을 분석합니다. 특정 답이 ‘정답’이 되지 않도록, 일상에서 자연스럽게 선택하는 연애 패턴을 중심으로 결과를 계산합니다." : isConsumerStyle ? "계획성, 충동성, 경험 선호, 미래 지향성과 품질 추구를 함께 분석합니다. 단순히 많이 쓰거나 적게 쓰는지를 판단하지 않고, 무엇을 중요하게 여기며 어떤 상황에서 소비 결정이 달라지는지 살펴봅니다." : isBurnoutRisk ? "에너지 고갈, 정서적 소진, 업무·학업 거리두기, 대인관계 피로와 회복 가능성을 함께 살펴봅니다. 초반 응답에 맞춰 후속 질문이 달라지며, 결과는 의료 진단이 아닌 현재 상태를 돌아보기 위한 자가 점검 정보입니다." : isKkondaePower ? "업무 방식, 회식과 퇴근에 대한 생각, 피드백 방식, 변화 수용성과 세대 감수성을 살펴 현재의 직장 소통 성향을 점검합니다. 가볍게 웃으면서도 좋은 선배와 동료가 되는 방법을 확인할 수 있습니다." : isMarriageTiming ? "결혼 의지, 현재 관계, 경제적 준비, 커리어 우선순위와 독립성을 함께 살펴 지금 성향에서 결혼 가능성이 자연스럽게 높아지는 시기를 안내합니다. 결과는 예언이 아닌 현재 선택 패턴에 대한 참고 정보입니다." : isOfficeAnimal ? "업무 추진 방식, 정보 탐색, 협업과 갈등 대처, 정확성, 성과 욕구 등 실제 직장 행동을 기준으로 12지신 동물 유형과 비교합니다. 대표 유형과 함께 숨은 보조 성향도 확인할 수 있습니다." : "초기 자본, 선호 업무 방식, 콘텐츠 제작, 디지털 도구, 수익화 속도 등 12가지 기준을 바탕으로 20개 부업과의 적합도를 비교합니다. 대표 추천뿐 아니라 함께 고려할 만한 후보 3개도 확인할 수 있습니다."}</p></section>
      <TestSeoContent test={test} itemCount={itemCount} answerType={answerType} />
      <RelatedTests current={test} />
      <JsonLd data={{"@context":"https://schema.org","@type":"CreativeWork",name:test.title,description:test.description,url:absoluteUrl(`/tests/${test.slug}`),inLanguage:"ko-KR",genre:"Self-assessment test",interactivityType:"active",isAccessibleForFree:true,publisher:{"@type":"Organization","@id":absoluteUrl("/#organization"),name:siteConfig.name}}} />
      <JsonLd data={{ "@context":"https://schema.org", "@type":"WebApplication", name:test.title, description:test.description, url:absoluteUrl(`/tests/${test.slug}`), applicationCategory:"LifestyleApplication", operatingSystem:"Any", offers:{ "@type":"Offer", price:"0", priceCurrency:"KRW" } }} />
    </div>
  );
}

function RelatedTests({ current }: { current: (typeof tests)[number] }) {
  const related = [...tests]
    .filter((item) => item.slug !== current.slug)
    .sort((a, b) => Number(b.category === current.category) - Number(a.category === current.category) || b.participants - a.participants)
    .slice(0, 3);
  if (related.length === 0) return null;
  return (
    <section className="mx-auto mt-8 max-w-3xl">
      <h2 className="text-xl font-black text-ink">함께 해보면 좋은 테스트</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {related.map((item) => (
          <Link key={item.slug} href={item.href ?? `/tests/${item.slug}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-blue-200">
            <span className="text-3xl" aria-hidden="true">{item.icon}</span>
            <h3 className="mt-3 font-extrabold text-ink">{item.shortTitle}</h3>
            <p className="mt-1 text-xs leading-5 text-slate-500">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
