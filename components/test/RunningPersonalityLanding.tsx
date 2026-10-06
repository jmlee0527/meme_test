import Link from "next/link";
import { TestBreadcrumbs } from "@/components/seo/TestBreadcrumbs";
import { TestSeoContent } from "@/components/seo/TestSeoContent";
import { TestRecommendations } from "@/components/discovery/TestRecommendations";
import { RUNNING_TEST_PATH, runningTest } from "@/data/running-personality";

export function RunningPersonalityLanding() {
  return (
    <div className="container-page py-8 sm:py-14">
      <TestBreadcrumbs test={runningTest} />
      <section className="paper-card container-readable overflow-hidden">
        <div className="relative flex min-h-52 items-center justify-center overflow-hidden border-b border-emerald-900/15 bg-[#CDEFE1] p-8 sm:min-h-64">
          <div aria-hidden="true" className="absolute -bottom-16 left-1/2 h-40 w-[140%] -translate-x-1/2 rotate-[-8deg] rounded-[50%] border-4 border-dashed border-emerald-800/20" />
          <div className="relative text-center">
            <span aria-hidden="true" className="block text-7xl sm:text-8xl">🏃</span>
            <p className="mt-5 text-sm font-black tracking-wide text-emerald-900">같은 길, 각자의 재미</p>
          </div>
        </div>
        <div className="p-6 sm:p-10">
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <Link href="/category/직업.일상" className="rounded-sm bg-[#CDEFE1] px-3 py-1.5 text-emerald-900">직업·일상</Link>
            <span className="rounded-sm bg-[#f4f1df] px-3 py-1.5 text-slate-600">12문항 · 약 2분</span>
          </div>
          <h1 className="mt-5 text-3xl font-black tracking-tight text-ink sm:text-4xl">{runningTest.title}</h1>
          <p className="mt-4 text-xl font-bold text-emerald-900">넌 무슨 재미로 뛰는 편이야?</p>
          <p className="mt-3 leading-7 text-slate-600">12개만 골라봐. 아직 안 뛰어봤어도 괜찮아.<br />‘나라면 이럴 듯?’ 싶은 걸 고르면 돼!</p>
          <Link href={`${RUNNING_TEST_PATH}?start=1`} className="paper-button mt-8 flex min-h-14 items-center justify-center gap-3 bg-emerald-800 px-6 py-4 text-center font-extrabold text-white hover:bg-emerald-900">가볍게 시작해볼까? <span aria-hidden="true">→</span></Link>
          <p className="mt-3 text-center text-xs leading-5 text-slate-500">가입 없이 바로 시작 · 정답은 없어</p>
        </div>
      </section>
      <TestSeoContent test={runningTest} />
      <TestRecommendations current={runningTest} title="이 테스트도 한번 해볼래?" />
      <p className="mt-8 text-center text-xs leading-5 text-slate-500">{runningTest.disclaimer}</p>
    </div>
  );
}
