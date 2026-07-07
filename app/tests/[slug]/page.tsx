import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
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
  if (test.type === "fortune") redirect(test.href ?? "/fortune/today");
  if (test.type === "worldcup") {
    const parsedSeed = Number(seed);
    return play === "1" && Number.isInteger(parsedSeed) && parsedSeed > 0
      ? <WorldcupGame items={foodWorldcupItems} seed={parsedSeed} />
      : <WorldcupIntro />;
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
  const currentAge = isMarriageTiming ? parseCurrentAge(age) : null;

  if (isBurnoutRisk && start === "1") return <BurnoutTestPage />;
  if (isConsumerStyle && start === "1") return <ConsumerStyleTestPage />;
  if (isLoveMbti && start === "1") return <LoveMbtiTestPage />;
  if (isAttachmentStyle && start === "1") return <AttachmentStyleTestPage />;
  if (start === "1" && (!isMarriageTiming || currentAge)) return <div className="container-page py-8 sm:py-12"><TestRunner test={test} currentAge={currentAge ?? undefined} /></div>;

  const itemCount=test.itemCount??test.questions.length;
  const answerType=test.type==="likert"||isBurnoutRisk?"5점 척도":isKkondaePower||isEnneagram||isEqTest?"4지선다":isJoseonDestiny||isPersonalityCountry||isLoverScore||isColorPersonality?"2지선다":"O/X";

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
      <section className="mx-auto mt-12 max-w-3xl rounded-3xl bg-white p-6 sm:p-8"><h2 className="text-xl font-extrabold text-ink">이 테스트로 알 수 있어요</h2><p className="mt-3 leading-7 text-slate-600">{isEqTest ? "EQ 테스트와 공감지수 테스트를 통해 자기인식, 자기조절, 공감능력, 사회성, 감정회복력 5개 영역을 확인합니다. 15개 문항의 응답을 바탕으로 EQ 점수와 공감지수 점수, 강점 영역과 보완 영역을 함께 보여주며, 결과에서는 성장 팁과 추천 행동까지 안내합니다." : isEnneagram ? "애니어그램 테스트는 겉으로 보이는 행동보다 내면의 동기, 두려움, 욕구와 관계 방식을 중심으로 9가지 성격유형 중 나와 가장 가까운 유형을 찾아봅니다. 18개 문항을 통해 대표 유형과 상위 3개 유형 점수를 함께 확인할 수 있으며, 결과에서는 강점, 주의점, 잘 맞는 관계와 성장 방향을 안내합니다." : isColorPersonality ? "외향성, 계획성, 감정 표현, 공감 능력, 도전 성향, 안정 추구, 창의성, 독립성, 현실성, 직관성 등 10가지 성향을 바탕으로 나의 성격 컬러를 분석합니다. 12개의 일상 상황형 질문에 답하면 대표 컬러와 보조 컬러가 함께 계산되며, 성격 특징뿐 아니라 인간관계, 연애 스타일, 스트레스 반응, 어울리는 직업 성향까지 확인할 수 있습니다." : isPersonalityCountry ? "개방성, 질서·계획성, 사교 에너지, 자율성, 자연 선호, 성장 욕구, 문화 감성, 안정감 8가지 성향을 바탕으로 나와 잘 맞는 해외 국가의 라이프스타일 이미지를 분석합니다. 특정 국가를 단정적으로 설명하기보다, 당신의 생활 방식과 가치관이 어떤 분위기와 잘 맞는지 여행·생활 키워드 중심으로 안내합니다." : isJoseonDestiny ? "리더십, 지략, 창의성, 모험심, 공감력, 실용성 6가지 성향을 바탕으로 조선시대에서 어떤 운명을 살았을지 분석합니다. 역사적 고증보다 재미와 공유성을 우선한 테스트이며, 왕부터 전설의 책사까지 32가지 결과 중 가장 가까운 조선 캐릭터를 확인할 수 있습니다." : isAttachmentStyle ? "가까운 관계에서 반복되는 애착 불안과 애착 회피 경향을 2축으로 살펴봅니다. 상대의 반응 변화에 얼마나 민감한지, 친밀감과 감정 공유를 얼마나 편안하게 느끼는지에 따라 안정형, 불안형, 회피형, 불안회피형 중 현재 가장 가까운 관계 패턴을 안내합니다." : isLoveMbti ? "애착 안정성, 감정 표현력, 관계 주도성, 독립성과 애정 표현 선호를 함께 분석합니다. 8개 유형 가운데 가장 가까운 대표·보조 성향과 유형별 궁합을 확인할 수 있으며, 결과는 관계의 성공을 단정하는 진단이 아닌 소통 패턴을 돌아보기 위한 정보입니다." : isLoverScore ? "배려심, 책임감, 표현력, 안정감, 갈등해결력, 독립성, 유머감각, 신뢰도 8가지 지표를 바탕으로 나의 애인 점수와 연애 유형을 분석합니다. 특정 답이 ‘정답’이 되지 않도록, 일상에서 자연스럽게 선택하는 연애 패턴을 중심으로 결과를 계산합니다." : isConsumerStyle ? "계획성, 충동성, 경험 선호, 미래 지향성과 품질 추구를 함께 분석합니다. 단순히 많이 쓰거나 적게 쓰는지를 판단하지 않고, 무엇을 중요하게 여기며 어떤 상황에서 소비 결정이 달라지는지 살펴봅니다." : isBurnoutRisk ? "에너지 고갈, 정서적 소진, 업무·학업 거리두기, 대인관계 피로와 회복 가능성을 함께 살펴봅니다. 초반 응답에 맞춰 후속 질문이 달라지며, 결과는 의료 진단이 아닌 현재 상태를 돌아보기 위한 자가 점검 정보입니다." : isKkondaePower ? "업무 방식, 회식과 퇴근에 대한 생각, 피드백 방식, 변화 수용성과 세대 감수성을 살펴 현재의 직장 소통 성향을 점검합니다. 가볍게 웃으면서도 좋은 선배와 동료가 되는 방법을 확인할 수 있습니다." : isMarriageTiming ? "결혼 의지, 현재 관계, 경제적 준비, 커리어 우선순위와 독립성을 함께 살펴 지금 성향에서 결혼 가능성이 자연스럽게 높아지는 시기를 안내합니다. 결과는 예언이 아닌 현재 선택 패턴에 대한 참고 정보입니다." : isOfficeAnimal ? "업무 추진 방식, 정보 탐색, 협업과 갈등 대처, 정확성, 성과 욕구 등 실제 직장 행동을 기준으로 12지신 동물 유형과 비교합니다. 대표 유형과 함께 숨은 보조 성향도 확인할 수 있습니다." : "초기 자본, 선호 업무 방식, 콘텐츠 제작, 디지털 도구, 수익화 속도 등 12가지 기준을 바탕으로 20개 부업과의 적합도를 비교합니다. 대표 추천뿐 아니라 함께 고려할 만한 후보 3개도 확인할 수 있습니다."}</p></section>
      {isEqTest&&<EqSeoContent />}
      {isEnneagram&&<EnneagramSeoContent />}
      {isColorPersonality&&<ColorPersonalitySeoContent />}
      {isAttachmentStyle&&<AttachmentSeoContent />}
      {(isLoveMbti||isAttachmentStyle)&&<><JsonLd data={{"@context":"https://schema.org","@type":"WebPage",name:test.title,description:test.description,url:absoluteUrl(`/tests/${test.slug}`),inLanguage:"ko-KR",mainEntity:{"@type":"Quiz","@id":absoluteUrl(`/tests/${test.slug}#quiz`)}}} /><JsonLd data={{"@context":"https://schema.org","@type":"Quiz","@id":absoluteUrl(`/tests/${test.slug}#quiz`),name:test.title,description:test.description,url:absoluteUrl(`/tests/${test.slug}`),inLanguage:"ko-KR",assesses:isAttachmentStyle?"성인 애착 불안과 애착 회피 경향":"연애 행동과 관계 성향",educationalUse:"assessment",interactivityType:"active",isAccessibleForFree:true}} /></>}
      <JsonLd data={{"@context":"https://schema.org","@type":"CreativeWork",name:test.title,description:test.description,url:absoluteUrl(`/tests/${test.slug}`),inLanguage:"ko-KR",genre:"Self-assessment test",interactivityType:"active",isAccessibleForFree:true,publisher:{"@type":"Organization","@id":absoluteUrl("/#organization"),name:siteConfig.name}}} />
      <JsonLd data={{ "@context":"https://schema.org", "@type":"WebApplication", name:test.title, description:test.description, url:absoluteUrl(`/tests/${test.slug}`), applicationCategory:"LifestyleApplication", operatingSystem:"Any", offers:{ "@type":"Offer", price:"0", priceCurrency:"KRW" } }} />
      <JsonLd data={{ "@context":"https://schema.org", "@type":"FAQPage", mainEntity:[
        { "@type":"Question", name:"테스트에는 얼마나 걸리나요?", acceptedAnswer:{ "@type":"Answer", text:`${itemCount}개 ${answerType} 질문으로 구성되어 ${test.duration}이면 완료할 수 있습니다.` } },
        { "@type":"Question", name:"내 답변이 저장되나요?", acceptedAnswer:{ "@type":"Answer", text:"아니요. 답변은 결과 계산에만 사용되며 별도 서버에 저장하지 않습니다." } },
      ] }} />
    </div>
  );
}

function EqSeoContent() {
  return (
    <section className="mx-auto mt-8 max-w-3xl rounded-3xl border border-pink-100 bg-white p-6 shadow-card sm:p-8">
      <h2 className="text-2xl font-black text-ink">EQ 테스트란?</h2>
      <div className="mt-4 space-y-5 text-sm leading-8 text-slate-700">
        <p>EQ 테스트는 감정지능(EQ)을 측정하는 심리테스트입니다. 공감지수 테스트와 함께 자신의 감정을 이해하고 타인의 감정에 반응하는 방식을 살펴볼 수 있습니다.</p>
        <p>감정지능은 자신의 감정을 이해하고 조절하는 능력뿐 아니라 타인의 감정을 공감하고 원활한 인간관계를 형성하는 능력을 의미합니다. 이 테스트는 자기인식, 자기조절, 공감능력, 사회성, 감정회복력 5개 영역을 나누어 현재의 감정 패턴을 확인합니다.</p>
        <p>공감지수 테스트, 감정지능 테스트, EQ 검사 등으로도 많이 알려져 있으며 최근에는 IQ보다 중요한 역량으로 주목받고 있습니다. 결과는 의학적 진단이 아니라 재미와 자기이해를 위한 참고용 콘텐츠입니다.</p>
      </div>
      <JsonLd data={{ "@context":"https://schema.org", "@type":"WebPage", name:"EQ 테스트", description:"나의 감정지능과 공감 능력을 확인하는 무료 심리테스트", url:absoluteUrl("/tests/eq-test"), inLanguage:"ko-KR", mainEntity:{ "@type":"Quiz", "@id":absoluteUrl("/tests/eq-test#quiz") } }} />
      <JsonLd data={{ "@context":"https://schema.org", "@type":"Quiz", "@id":absoluteUrl("/tests/eq-test#quiz"), name:"EQ 테스트", description:"나의 감정지능과 공감 능력을 확인하는 무료 심리테스트", url:absoluteUrl("/tests/eq-test"), inLanguage:"ko-KR", assesses:"감정지능과 공감 능력", educationalUse:"assessment", interactivityType:"active", isAccessibleForFree:true }} />
    </section>
  );
}

function EnneagramSeoContent() {
  return (
    <section className="mx-auto mt-8 max-w-3xl rounded-3xl border border-violet-100 bg-white p-6 shadow-card sm:p-8">
      <h2 className="text-2xl font-black text-ink">애니어그램 테스트란?</h2>
      <div className="mt-4 space-y-5 text-sm leading-8 text-slate-700">
        <p>애니어그램 테스트는 사람의 성격을 9가지 유형으로 나누어 내면의 동기, 두려움, 욕구, 관계 방식을 이해하는 성격유형 테스트입니다. MBTI가 행동 경향을 중심으로 성격을 이해한다면, 애니어그램은 내가 왜 그런 선택을 하는지에 더 집중합니다.</p>
        <p>미미테스트의 무료 애니어그램 테스트는 일상적인 상황에서 어떤 기준으로 선택하고, 스트레스와 갈등 상황에서 어떤 반응을 보이는지 살펴봅니다. 이를 통해 1번 개혁가부터 9번 평화주의자까지 애니어그램 9가지 유형 중 현재 나와 가장 가까운 유형을 안내합니다.</p>
        <p>결과는 정확한 진단이 아니라 자기이해를 돕는 심리테스트 콘텐츠입니다. 대표 유형과 함께 상위 3개 유형 점수를 확인하면 내가 주로 쓰는 성격 패턴과 보조적으로 나타나는 경향을 더 입체적으로 볼 수 있습니다.</p>
      </div>
      <JsonLd data={{ "@context":"https://schema.org", "@type":"WebPage", name:"애니어그램 테스트", description:"9가지 애니어그램 유형 중 나와 가장 가까운 성격 유형을 확인하는 심리테스트", url:absoluteUrl("/tests/enneagram"), inLanguage:"ko-KR", mainEntity:{ "@type":"Quiz", "@id":absoluteUrl("/tests/enneagram#quiz") } }} />
      <JsonLd data={{ "@context":"https://schema.org", "@type":"Quiz", "@id":absoluteUrl("/tests/enneagram#quiz"), name:"애니어그램 테스트", description:"9가지 애니어그램 유형 중 나와 가장 가까운 성격 유형을 확인하는 심리테스트", url:absoluteUrl("/tests/enneagram"), inLanguage:"ko-KR", assesses:"애니어그램 9가지 성격유형", educationalUse:"assessment", interactivityType:"active", isAccessibleForFree:true }} />
    </section>
  );
}

const colorFaqs = [
  ["컬러 성격 테스트는 무엇인가요?", "컬러 성격 테스트는 사용자의 선택 패턴을 바탕으로 성격 유형을 색상으로 표현하는 심리 테스트입니다. 행동 방식, 인간관계 스타일, 감정 표현과 의사결정 방식을 함께 살펴 나의 성격 컬러를 안내합니다."],
  ["결과는 어떻게 계산되나요?", "12개의 질문에 대한 답변마다 여러 컬러에 가중치를 부여하고, 누적 점수가 가장 높은 컬러를 대표 결과로 보여줍니다. 두 번째로 높은 컬러는 보조 성향으로 함께 표시합니다."],
  ["성격 컬러는 바뀔 수 있나요?", "네. 현재의 감정 상태, 생활 환경, 인간관계 변화에 따라 결과가 조금씩 달라질 수 있습니다. 컬러 결과는 고정된 성격표가 아니라 지금의 경향을 이해하기 위한 참고 정보입니다."],
  ["MBTI와 어떤 차이가 있나요?", "MBTI보다 가볍고 직관적으로 성격을 색상으로 표현하는 테스트입니다. 복잡한 유형 코드보다 컬러 이미지를 통해 성격 진단 결과를 쉽게 이해하고 공유할 수 있도록 구성했습니다."],
  ["친구와 결과를 비교해도 되나요?", "네. 친구와 컬러 성격 테스트 결과를 비교하면 서로의 성격 유형, 연애 스타일, 인간관계 방식과 잘 맞는 컬러를 재미있게 확인할 수 있습니다."],
];

function ColorPersonalitySeoContent() {
  return (
    <section className="mx-auto mt-8 max-w-3xl rounded-3xl border border-purple-100 bg-white p-6 shadow-card sm:p-8">
      <h2 className="text-2xl font-black text-ink">컬러 성격 테스트란?</h2>
      <div className="mt-4 space-y-5 text-sm leading-8 text-slate-700">
        <p>컬러 성격 테스트는 당신의 행동 패턴과 인간관계 스타일을 분석해 가장 잘 어울리는 성격 컬러를 찾아주는 심리 테스트입니다. 각 색상은 서로 다른 성격 유형과 감정 표현 방식, 의사결정 스타일을 의미합니다. 단순히 좋아하는 색을 고르는 방식이 아니라, 일상 상황에서 어떤 선택을 하는지에 따라 대표 컬러와 보조 컬러를 계산합니다.</p>
        <p>이 테스트는 친구들과 여행을 갈 때, 새로운 모임에 참석했을 때, 중요한 결정을 내려야 할 때처럼 누구나 겪을 수 있는 장면을 바탕으로 구성되어 있습니다. 그래서 직접적으로 “나는 외향적인 사람이다”처럼 묻지 않고, 자연스러운 선택을 통해 나의 성격 컬러와 성격 유형을 분석합니다.</p>
        <p>결과 페이지에서는 나의 성격 컬러뿐 아니라 핵심 성격, 인간관계 스타일, 연애 스타일, 스트레스 받을 때의 모습, 어울리는 직업 성향까지 함께 확인할 수 있습니다. 컬러 성격 테스트를 통해 나의 성격 진단 결과를 가볍게 이해하고, 친구와 결과를 비교하며 서로 다른 매력을 발견해보세요.</p>
      </div>
      <div className="mt-8 rounded-2xl bg-purple-50 p-5">
        <h3 className="font-black text-purple-950">컬러 성격 테스트 FAQ</h3>
        <dl className="mt-4 space-y-4 text-sm leading-7 text-purple-950">
          {colorFaqs.map(([question, answer]) => (
            <div key={question}><dt className="font-black">{question}</dt><dd className="mt-1">{answer}</dd></div>
          ))}
        </dl>
      </div>
      <JsonLd data={{ "@context":"https://schema.org", "@type":"FAQPage", mainEntity: colorFaqs.map(([question, answer]) => ({ "@type":"Question", name: question, acceptedAnswer:{ "@type":"Answer", text: answer } })) }} />
      <JsonLd data={{ "@context":"https://schema.org", "@type":"WebPage", name:"컬러 성격 테스트", description:"12개의 질문으로 알아보는 컬러 성격 테스트. 나를 가장 닮은 색을 찾고 성격, 연애 스타일, 인간관계, 직업 성향까지 확인해보세요.", url:absoluteUrl("/tests/color-personality-test"), inLanguage:"ko-KR", breadcrumb:{ "@type":"BreadcrumbList", itemListElement:[
        { "@type":"ListItem", position:1, name:"홈", item:absoluteUrl("/") },
        { "@type":"ListItem", position:2, name:"심리 테스트", item:absoluteUrl("/category/심리") },
        { "@type":"ListItem", position:3, name:"컬러 성격 테스트", item:absoluteUrl("/tests/color-personality-test") },
      ] } }} />
    </section>
  );
}

function AttachmentSeoContent() {
  return (
    <section className="mx-auto mt-8 max-w-3xl rounded-3xl border border-rose-100 bg-white p-6 shadow-card sm:p-8">
      <h2 className="text-2xl font-black text-ink">애착유형이란?</h2>
      <div className="mt-4 space-y-5 text-sm leading-8 text-slate-700">
        <p>애착유형은 가까운 사람과 관계를 맺을 때 반복적으로 나타나는 감정 반응과 행동 패턴을 설명하는 개념입니다. 어린 시절의 경험만으로 고정되는 성격표가 아니라, 이후의 연애, 우정, 가족관계, 안전했던 경험과 상처받았던 경험이 함께 쌓이며 달라질 수 있는 경향성에 가깝습니다. 그래서 같은 사람도 안정적인 상대와 있을 때는 편안하지만, 불확실한 관계에서는 불안하거나 거리를 두는 모습이 더 강하게 나타날 수 있습니다.</p>
        <p>이 테스트는 성인 애착 연구에서 자주 쓰이는 두 축인 애착 불안과 애착 회피를 기준으로 결과를 계산합니다. 애착 불안은 상대가 나를 떠나거나 마음이 식을까 봐 걱정하는 정도, 연락과 애정 표현의 변화에 민감하게 반응하는 정도를 의미합니다. 반대로 애착 회피는 지나치게 가까워지는 상황을 부담스럽게 느끼거나, 감정을 나누고 기대는 일을 어려워하는 정도를 말합니다.</p>
        <p>두 점수가 모두 낮으면 안정형, 불안은 높고 회피는 낮으면 불안형, 불안은 낮고 회피가 높으면 회피형, 두 점수가 모두 높으면 불안회피형으로 분류합니다. 안정형은 신뢰와 독립성의 균형이 좋고, 불안형은 확인과 확신을 중요하게 느끼며, 회피형은 자기 공간과 독립성을 중시합니다. 불안회피형은 가까워지고 싶은 마음과 상처받기 싫은 마음이 동시에 커져 관계 안에서 다가감과 거리두기가 반복될 수 있습니다.</p>
        <p>결과는 14개 문항의 응답을 1~5점으로 계산하고, 역산 문항을 반영한 뒤 불안과 회피 각각을 0~100점으로 환산합니다. 50점을 기준으로 낮음과 높음을 나누지만, 45~55점처럼 경계값에 가까운 경우에는 중간 경향으로 안내합니다. 이 테스트는 나를 단정하기 위한 검사가 아니라, 관계 속에서 내가 어떤 상황에 민감해지고 어떤 방식으로 안전감을 찾는지 이해하기 위한 자가 점검용 콘텐츠입니다.</p>
      </div>
      <div className="mt-8 rounded-2xl bg-rose-50 p-5">
        <h3 className="font-black text-rose-950">FAQ</h3>
        <dl className="mt-4 space-y-4 text-sm leading-7 text-rose-950">
          <div><dt className="font-black">애착유형은 평생 바뀌지 않나요?</dt><dd className="mt-1">아니요. 안정적인 관계 경험, 자기 이해, 상담, 반복되는 안전한 소통을 통해 달라질 수 있습니다.</dd></div>
          <div><dt className="font-black">불안형이나 회피형이면 문제가 있는 건가요?</dt><dd className="mt-1">문제가 아니라 관계에서 안전감을 지키기 위해 익숙해진 반응 패턴입니다. 이해하고 조정할 수 있습니다.</dd></div>
          <div><dt className="font-black">연애 중이 아니어도 할 수 있나요?</dt><dd className="mt-1">가능합니다. 연애뿐 아니라 친한 친구, 가족, 중요한 사람과의 가까운 관계를 떠올리며 답하면 됩니다.</dd></div>
          <div><dt className="font-black">결과가 애매하게 느껴지면 어떻게 보나요?</dt><dd className="mt-1">점수가 기준선 근처라면 상황에 따라 다른 유형처럼 보일 수 있습니다. 결과 페이지의 불안·회피 점수를 함께 보는 것이 좋습니다.</dd></div>
        </dl>
      </div>
    </section>
  );
}
