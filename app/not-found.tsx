import Link from "next/link";
export default function NotFound() {
  return <div className="container-page py-24 text-center"><p className="text-sm font-black text-primary">404</p><h1 className="mt-3 text-3xl font-black text-ink">페이지를 찾을 수 없어요</h1><p className="mt-4 text-slate-600">주소가 변경되었거나 존재하지 않는 페이지입니다.</p><Link href="/" className="mt-8 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white">홈으로 돌아가기</Link></div>;
}
