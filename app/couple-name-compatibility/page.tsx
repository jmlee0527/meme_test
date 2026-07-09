import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { NameCompatibilityForm } from "@/components/name-compatibility/NameCompatibilityForm";
import { NameCompatibilityResult } from "@/components/name-compatibility/NameCompatibilityResult";
import { calculateNameCompatibility, isValidKoreanName, normalizeKoreanName } from "@/lib/name-compatibility-engine";
import { absoluteUrl, createMetadata } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "이름 궁합 테스트 | 이름으로 보는 커플 궁합",
  description: "남녀 한글 이름의 초성·모음·발음오행과 음양 균형을 분석해 0~100점 커플 궁합지수를 확인해보세요.",
  path: "/couple-name-compatibility",
  keywords: ["이름 궁합", "커플 이름 궁합", "이름 궁합 테스트", "발음오행", "음양오행", "커플 궁합 테스트"],
});

type Props = { searchParams: Promise<{ man?: string; woman?: string }> };

const faqs = [
  ["이름만으로 사주 궁합을 볼 수 있나요?", "아니요. 사주는 생년월일과 출생시각이 필요합니다. 이 테스트는 한글 이름에서 추출할 수 있는 초성·모음·음양과 발음오행만 분석합니다."],
  ["같은 이름을 입력하면 결과도 같나요?", "네. 무작위 값을 사용하지 않는 결정론적 계산이므로 같은 이름 조합에는 언제나 같은 결과가 나옵니다."],
  ["한자 이름의 획수도 계산하나요?", "아니요. 한자를 입력받지 않으므로 획수 수리와 자원오행은 계산하지 않습니다."],
  ["모음 오행은 어떻게 반영하나요?", "모음 오행 배속은 학파마다 차이가 있어 양성·음성·중성 및 천지인 계열에 따른 보조 지표로 사용하고, 초성 오음보다 낮은 가중치를 적용합니다."],
];

export default async function CoupleNameCompatibilityPage({ searchParams }: Props) {
  const params = await searchParams;
  const man = normalizeKoreanName(params.man ?? "");
  const woman = normalizeKoreanName(params.woman ?? "");
  const result = isValidKoreanName(man) && isValidKoreanName(woman) ? calculateNameCompatibility(man, woman) : null;
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ffe4e6_0,#f8fafc_42%,#f8fafc_100%)] py-10 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "이름 커플 궁합" }]} />
        <div className="mx-auto max-w-4xl">
          <header className="text-center">
            <span className="inline-flex rounded-full bg-white/80 px-4 py-2 text-xs font-black text-rose-600 shadow-sm">전통 발음오행 · 음양 균형 기반</span>
            <div className="mx-auto mt-6 grid size-24 place-items-center rounded-[2rem] bg-gradient-to-br from-rose-400 to-violet-500 text-5xl shadow-xl shadow-rose-200">💞</div>
            <h1 className="mt-6 text-4xl font-black tracking-[-0.06em] text-slate-950 sm:text-6xl">이름으로 보는 커플 궁합</h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">두 사람의 한글 이름을 초성·모음으로 분해해 발음오행, 음양 균형, 이름의 에너지 흐름과 발음 조화를 분석합니다.</p>
          </header>
          <div className="mt-9"><NameCompatibilityForm initialMan={man} initialWoman={woman} /></div>
          {result && <NameCompatibilityResult result={result} />}

          <section className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-9">
            <h2 className="text-2xl font-black">이름 궁합은 어떻게 계산하나요?</h2>
            <div className="mt-5 space-y-5 text-sm leading-8 text-slate-700">
              <p>이름 궁합 테스트는 입력한 한글 음절을 초성·중성·종성으로 분해하는 것부터 시작합니다. 초성은 훈민정음의 아음·설음·순음·치음·후음이라는 다섯 조음 위치에 따라 목·화·수·금·토 기운으로 변환합니다. 이름 안에서 이어지는 오행이 서로 생하는지, 같은 기운으로 이어지는지, 극하는 관계인지 계산해 각 이름의 내부 에너지 흐름을 구합니다.</p>
              <p>모음은 양성·음성·중성의 균형과 천지인 계열을 분석합니다. 모음 오행표는 작명 학파에 따라 차이가 있으므로 이 테스트에서는 보조 지표로만 사용하며, 널리 알려진 초성 발음오행에 더 높은 비중을 둡니다. 받침은 발음의 마무리와 안정감에 영향을 주는 보조 에너지로 낮은 가중치를 적용합니다.</p>
              <p>두 이름을 함께 분석할 때는 목생화·화생토·토생금·금생수·수생목의 상생 관계와 목극토·토극수·수극화·화극금·금극목의 상극 관계를 비교합니다. 한 이름에 부족한 오행을 다른 이름이 채우는지, 두 이름을 합친 오행 분포가 균형적인지도 함께 평가합니다.</p>
              <p>최종 궁합지수는 오행 조화 28%, 부족 오행 보완 18%, 음양 균형 15%, 발음 리듬 14%, 에너지 흐름 15%, 이름 안정감 10%로 계산합니다. 이름 길이 자체나 첫 글자 하나, 무작위 숫자로 점수를 만들지 않으며 같은 이름 조합은 항상 동일한 결과가 나옵니다.</p>
              <p>다만 생년월일과 한자를 받지 않기 때문에 사주오행, 용신, 한자 획수 수리와 자원오행은 분석할 수 없습니다. 결과는 전통 작명학의 발음 구조를 현대적으로 수치화한 엔터테인먼트 콘텐츠이며 실제 관계의 성공을 예언하거나 보장하지 않습니다.</p>
            </div>
          </section>
          <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-9"><h2 className="text-2xl font-black">자주 묻는 질문</h2><dl className="mt-5 space-y-5">{faqs.map(([q,a])=><div key={q}><dt className="font-black">{q}</dt><dd className="mt-1 text-sm leading-7 text-slate-600">{a}</dd></div>)}</dl></section>
        </div>
      </div>
      <JsonLd data={{ "@context":"https://schema.org", "@type":"WebPage", name:"이름으로 보는 커플 궁합", description:"한글 이름의 발음오행과 음양 균형을 분석하는 커플 궁합 테스트", url:absoluteUrl("/couple-name-compatibility"), inLanguage:"ko-KR", mainEntity:{ "@type":"WebApplication", name:"이름으로 보는 커플 궁합", applicationCategory:"EntertainmentApplication", operatingSystem:"Any", isAccessibleForFree:true } }} />
      <JsonLd data={{ "@context":"https://schema.org", "@type":"BreadcrumbList", itemListElement:[{ "@type":"ListItem", position:1, name:"홈", item:absoluteUrl("/") },{ "@type":"ListItem", position:2, name:"테스트", item:absoluteUrl("/tests") },{ "@type":"ListItem", position:3, name:"이름 커플 궁합", item:absoluteUrl("/couple-name-compatibility") }] }} />
      <JsonLd data={{ "@context":"https://schema.org", "@type":"FAQPage", mainEntity:faqs.map(([q,a])=>({ "@type":"Question", name:q, acceptedAnswer:{ "@type":"Answer", text:a } })) }} />
    </div>
  );
}
