import Link from "next/link";

const links = [
  ["서비스 소개", "/about"], ["개인정보처리방침", "/privacy"],
  ["이용약관", "/terms"], ["문의하기", "/contact"],
] as const;

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="container-page py-10">
        <div className="flex flex-col justify-between gap-7 sm:flex-row">
          <div>
            <p className="font-black text-ink">미미테스트</p>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">나에게 맞는 가능성을 발견하고, 현실적인 첫걸음을 설계하도록 돕습니다.</p>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-600" aria-label="하단 메뉴">
            {links.map(([label, href]) => <Link key={href} href={href} className="hover:text-primary">{label}</Link>)}
          </nav>
        </div>
        <div className="mt-8 border-t border-slate-100 pt-6 text-xs leading-5 text-slate-400">
          <p>© {new Date().getFullYear()} 미미테스트. All rights reserved.</p>
          <p className="mt-1">테스트 결과와 콘텐츠는 일반적인 정보이며, 수익을 보장하거나 전문적인 재무 조언을 제공하지 않습니다.</p>
        </div>
      </div>
    </footer>
  );
}
