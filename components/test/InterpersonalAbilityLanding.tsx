import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { TestSeoContent } from "@/components/seo/TestSeoContent";
import type { TestDefinition } from "@/lib/types";

const guideItems = [
  "총 12문항, 약 2~3분이 소요됩니다.",
  "최근 3개월 동안 사람들과 지낼 때의 실제 모습을 기준으로 답해 주세요.",
  "정답이 없는 테스트이므로 이상적인 모습보다 평소 행동과 가까운 답을 골라 주세요.",
  "내향적 또는 외향적인 성격을 평가하는 테스트가 아닙니다.",
  "전문적인 심리검사나 진단을 대신하지 않는 참고용 콘텐츠입니다.",
];

export function InterpersonalAbilityLanding({ test }: { test: TestDefinition }) {
  return (
    <div className="container-page py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: test.shortTitle }]} />
      <section className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-teal-100 bg-white shadow-card">
        <div className="relative aspect-[16/10] min-h-60 w-full bg-teal-50">
          <Image src={test.thumbnail ?? "/tests/interpersonal-ability/cover.svg"} alt={test.title} fill sizes="(max-width:768px) 100vw, 768px" className="object-cover" priority />
        </div>
        <div className="p-6 sm:p-10">
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <Link href={`/category/${encodeURIComponent(test.category)}`} className="rounded-full bg-teal-50 px-3 py-1 text-teal-700">{test.category}</Link>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-500">{test.duration}</span>
          </div>
          <h1 className="mt-5 text-3xl font-black tracking-tight text-ink sm:text-4xl">{test.title}</h1>
          <p className="mt-3 text-lg font-bold leading-7 text-teal-700">나는 사람들과 얼마나 편안하게 소통하는 사람일까?</p>
          <p className="mt-4 leading-7 text-slate-600">
            사람들과 잘 지낸다는 것은 말을 많이 하거나 언제나 분위기를 주도한다는 뜻만은 아니에요.
            상대방의 마음을 이해하고, 내 생각을 적절하게 표현하며, 의견 차이가 생겼을 때 관계를 조율하는 것도 중요한 대인관계 능력이에요.
          </p>
          <p className="mt-3 leading-7 text-slate-600">최근 3개월 동안 사람들과 지낼 때의 실제 모습을 떠올리며 12개의 질문에 답해 보세요.</p>
          <div className="mt-6 rounded-2xl bg-teal-50 p-5">
            <h2 className="text-sm font-black text-teal-950">시작 전 안내</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-teal-950">
              {guideItems.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </div>
          <Link href={`/tests/${test.slug}?start=1`} className="mt-8 block w-full rounded-2xl bg-primary px-6 py-4 text-center text-base font-extrabold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">무료로 테스트 시작하기</Link>
          <p className="mt-3 text-center text-xs text-slate-400">응답은 결과 계산에만 사용되며 서버에 저장되지 않습니다.</p>
        </div>
      </section>
      <TestSeoContent test={test} itemCount={12} answerType="4점 척도" />
    </div>
  );
}
