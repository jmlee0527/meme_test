import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { createMetadata, siteConfig } from "@/lib/site";

export const metadata = createMetadata({ title: "서비스 소개", description: `${siteConfig.name}가 어떤 기준으로 테스트와 부업 정보를 만드는지 소개합니다.`, path: "/about", keywords: ["미미테스트 소개"] });

export default function AboutPage() {
  return (
    <div className="container-page py-10 sm:py-14"><Breadcrumbs items={[{ name: "서비스 소개" }]} />
      <div className="mx-auto max-w-3xl">
        <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-card sm:p-12"><span className="text-sm font-extrabold text-primary">미미테스트 소개</span><h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">재미로 시작하고,<br />새로운 나를 발견해요.</h1><p className="mt-6 leading-8 text-slate-700">{siteConfig.name}는 성향, 재능, 직장생활, 연애관, 결혼관과 돈 관리 습관까지 다양한 관점으로 자신을 알아보는 종합 테스트 플랫폼입니다. 짧고 재미있지만 결과는 구체적이고 현실적인 테스트를 만드는 것을 중요하게 생각합니다.</p></section>
        <section className="mt-8 grid gap-4 sm:grid-cols-3">{[["명확하게","읽기 쉬운 질문과 결론부터 제시하는 콘텐츠"],["정직하게","수익 보장 없이 장점과 한계를 함께 안내"],["실용적으로","오늘 실행할 수 있는 작은 첫 단계 제공"]].map(([title,text]) => <div key={title} className="rounded-2xl bg-white p-6 shadow-card"><h2 className="font-extrabold text-ink">{title}</h2><p className="mt-3 text-sm leading-6 text-slate-600">{text}</p></div>)}</section>
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 sm:p-9"><h2 className="text-xl font-black text-ink">콘텐츠 원칙</h2><ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700"><li>• 독자의 중요한 결정을 대신하지 않습니다.</li><li>• 시장 상황에 따라 달라지는 정보에는 작성·수정일을 표시합니다.</li><li>• 광고와 제휴 관계가 있는 경우 알아보기 쉽게 공개합니다.</li><li>• 오류 제보와 수정 요청을 검토해 콘텐츠를 개선합니다.</li></ul><Link href="/contact" className="mt-7 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-blue-700">의견 보내기</Link></section>
      </div>
    </div>
  );
}
