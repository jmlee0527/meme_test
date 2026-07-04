import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { createMetadata, siteConfig } from "@/lib/site";

export const metadata = createMetadata({ title: "문의하기", description: `${siteConfig.name}에 서비스, 콘텐츠 오류, 광고 및 제휴 관련 의견을 보내주세요.`, path: "/contact", keywords: ["미미테스트 문의"] });
export default function ContactPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@buupstory.kr";
  return (
    <div className="container-page py-10 sm:py-14"><Breadcrumbs items={[{ name:"문의하기" }]} />
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-7 shadow-card sm:p-10"><p className="text-sm font-extrabold text-primary">CONTACT</p><h1 className="mt-3 text-3xl font-black tracking-tight text-ink">무엇을 도와드릴까요?</h1><p className="mt-4 leading-7 text-slate-600">콘텐츠 오류, 기능 제안, 개인정보, 광고·제휴 문의를 아래 이메일로 보내주세요. 내용을 확인한 뒤 영업일 기준 3일 이내 답변을 목표로 합니다.</p>
        <a href={`mailto:${email}?subject=${encodeURIComponent(`[${siteConfig.name} 문의]`)}`} className="mt-8 block rounded-2xl border border-blue-100 bg-blue-50 p-6 transition hover:border-blue-300"><span className="text-xs font-bold text-blue-500">이메일 문의</span><strong className="mt-2 block text-lg text-blue-950">{email}</strong></a>
        <section className="mt-8 border-t border-slate-100 pt-8"><h2 className="font-extrabold text-ink">빠른 확인을 위해 포함해 주세요</h2><ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600"><li>• 문의 유형과 관련 페이지 주소</li><li>• 오류가 발생한 기기와 브라우저</li><li>• 재현 과정 또는 수정이 필요한 내용</li></ul></section>
      </div>
    </div>
  );
}
