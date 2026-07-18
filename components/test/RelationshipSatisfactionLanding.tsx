import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { TestSeoContent } from "@/components/seo/TestSeoContent";
import type { TestDefinition } from "@/lib/types";

const guideItems = [
  "최근 2~3개월 동안의 평소 관계를 떠올리며 답해 주세요.",
  "가장 좋았던 날이나 가장 힘들었던 날 하나만 기준으로 답하지 않아도 괜찮아요.",
  "바람직해 보이는 답보다 실제 관계와 가장 가까운 답을 골라 주세요.",
  "장거리 연애, 주말 커플, 자주 만나는 연애 등 관계 형태와 관계없이 참여할 수 있어요.",
  "본 테스트는 관계를 간단히 돌아보는 참고용 콘텐츠이며 전문적인 심리검사나 커플 상담을 대신하지 않습니다.",
];

export function RelationshipSatisfactionLanding({ test }: { test: TestDefinition }) {
  return (
    <div className="container-page py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: test.shortTitle }]} />
      <section className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-card">
        <div className="relative aspect-[16/10] min-h-60 w-full bg-violet-50">
          <Image src={test.thumbnail ?? "/tests/relationship-satisfaction/cover.svg"} alt={test.title} fill sizes="(max-width:768px) 100vw, 768px" className="object-cover" priority />
        </div>
        <div className="p-6 sm:p-10">
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <Link href={`/category/${encodeURIComponent(test.category)}`} className="rounded-full bg-violet-50 px-3 py-1 text-violet-700">{test.category}</Link>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-500">{test.duration}</span>
          </div>
          <h1 className="mt-5 text-3xl font-black tracking-tight text-ink sm:text-4xl">{test.title}</h1>
          <p className="mt-3 text-lg font-bold leading-7 text-violet-700">지금 우리 관계, 얼마나 편안하고 만족스러울까?</p>
          <p className="mt-4 leading-7 text-slate-600">
            연인과 함께 있을 때 편안한가요? 중요한 이야기를 솔직하게 나누고, 의견이 다를 때에도 서로를 존중하고 있나요?
            최근 2~3개월 동안의 실제 관계를 떠올리며 15개의 질문에 답해 보세요.
          </p>
          <ul className="mt-6 grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
            <li>✓ 총 15문항</li>
            <li>✓ 4점 척도 응답</li>
            <li>✓ 회원가입 없음</li>
          </ul>
          <div className="mt-6 rounded-2xl bg-violet-50 p-5">
            <h2 className="text-sm font-black text-violet-950">시작 전 안내</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-violet-950">
              {guideItems.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </div>
          <Link href={`/tests/${test.slug}?start=1`} className="mt-8 block w-full rounded-2xl bg-primary px-6 py-4 text-center text-base font-extrabold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">무료로 테스트 시작하기</Link>
          <p className="mt-3 text-center text-xs text-slate-400">응답은 결과 계산에만 사용되며 서버에 저장되지 않습니다.</p>
        </div>
      </section>
      <TestSeoContent test={test} itemCount={15} answerType="4점 척도" />
    </div>
  );
}
