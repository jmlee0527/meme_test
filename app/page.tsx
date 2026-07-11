import Link from "next/link";
import { HeroExperience } from "@/components/home/HeroExperience";
import { TestCard } from "@/components/cards/TestCard";
import { BlogCard } from "@/components/cards/BlogCard";
import { CategoryTiles } from "@/components/category/CategoryTiles";
import { AdBanner } from "@/components/ads/AdBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { tests } from "@/data/tests";
import { blogPosts } from "@/data/blog";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({ title: "미미테스트 | 나를 알아보는 종합 테스트 플랫폼", absoluteTitle: true, description: "짧고 재미있는 다양한 테스트로 새로운 나를 발견해보세요.", path: "/", keywords: ["무료 테스트", "성향 테스트", "종합 테스트", "심리 테스트", "연애 테스트","찐팬 테스트"] });

const rankedTests = [...tests].sort((a, b) => b.participants - a.participants);
const bySlug = (slug: string) => tests.find((test) => test.slug === slug)!;

export default function HomePage() {
  return (
    <>
      <HeroExperience />

      <section id="popular-tests" className="container-page scroll-mt-20 py-14 sm:py-20">
        <SectionReveal>
          <SectionHeading icon="🔥" eyebrow="TRENDING NOW" title="지금 가장 인기 있는 테스트" description="다른 사람들은 지금 어떤 테스트에 빠져 있을까요?" href="/tests" />
          <div className="test-card-grid mt-7">{rankedTests.slice(0, 8).map((test, index) => <TestCard key={test.slug} test={test} rank={index + 1} />)}</div>
        </SectionReveal>
        <AdBanner />
      </section>

      <section className="border-y border-white bg-[linear-gradient(135deg,#eff6ff_0%,#faf5ff_52%,#fff1f2_100%)]">
        <div className="container-page py-14 sm:py-20"><SectionReveal><SectionHeading icon="✨" eyebrow="JUST DROPPED" title="새로 나온 테스트" description="따끈따끈한 질문으로 새로운 나를 발견해 보세요." /><div className="test-card-grid mt-7">{tests.filter((test) => test.isNew).slice(0, 4).map((test) => <TestCard key={test.slug} test={test} />)}</div></SectionReveal></div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <SectionReveal>
          <SectionHeading icon="🎯" eyebrow="DISCOVER YOURSELF" title="나를 알아보는 테스트" description="지금 가장 궁금한 나의 모습을 골라보세요. 카테고리는 계속 확장됩니다." />
          <div className="mt-7"><CategoryTiles /></div>
        </SectionReveal>
      </section>

      <CategoryShowcase id="직장" icon="💼" eyebrow="OFFICE LIFE" title="직장인 테스트" description="회사 속 나의 행동과 성장 가능성을 발견해 보세요." test={bySlug("office-animal-test")} extraTest={bySlug("kkondae-power-test")} upcoming={[["📈","나는 승진형 인간일까?","성과와 영향력"]]} tone="orange" />
      <CategoryShowcase id="결혼" icon="💕" eyebrow="LOVE & MARRIAGE" title="연애 · 결혼 테스트" description="관계 속 나의 마음과 자연스러운 다음 타이밍을 알아보세요." test={bySlug("lover-score-test")} extraTest={bySlug("love-mbti-test")} upcoming={[["🧲","나의 애착 관계 유형","가까움과 거리감"]]} tone="pink" reverse />
      <CategoryShowcase id="부업" icon="💰" eyebrow="MONEY & SIDE JOB" title="돈 · 부업 테스트" description="나의 강점과 돈을 대하는 습관을 현실적인 가능성으로 연결해 보세요." test={bySlug("side-job-recommendation")} extraTest={bySlug("consumer-style-test")} upcoming={[["📊","나의 투자 성향 테스트","위험과 안정 선호"]]} tone="blue" />
      <CategoryShowcase id="성격" icon="🧠" eyebrow="PERSONALITY & MIND" title="성격 · 심리 테스트" description="마음과 에너지의 신호를 살피고, 아직 이름 붙이지 못한 성향을 발견해 보세요." test={bySlug("burnout-risk-test")} upcoming={[["💎","나의 숨은 재능 찾기","강점과 몰입 영역"],["🌿","나는 내향형일까 외향형일까?","에너지 충전 방식"],["🧩","나의 문제 해결 스타일","사고와 판단 방식"]]} tone="green" reverse />
      <CategoryShowcase id="음식" icon="🍕" eyebrow="FOOD GAME" title="음식 월드컵" description="고민할수록 배고파지는 재미있는 선택 게임으로 오늘의 메뉴를 결정해 보세요." test={bySlug("weekend-food-worldcup")} upcoming={[["🌙","야식 메뉴 월드컵","밤에 더 당기는 메뉴"],["🍜","최애 라면 월드컵","국물과 볶음면 대결"]]} tone="orange" />
      <CategoryShowcase id="운세" icon="🔮" eyebrow="DAILY LUCK" title="오늘의 운세" description="매일 가볍게 카드 한 장을 뽑고 오늘의 작은 힌트를 확인해 보세요." test={bySlug("daily-fortune")} upcoming={[["🌟","이번 주 행운 카드","일주일 흐름 보기"],["🧭","오늘의 선택 카드","결정이 필요할 때"]]} tone="purple" reverse />

      <section className="border-y border-slate-200/70 bg-white">
        <div className="container-page grid gap-10 py-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center sm:py-20">
          <SectionReveal><p className="text-sm font-black text-orange-500">📈 LIVE RANKING</p><h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-ink sm:text-4xl">지금 가장 많이 하는 테스트</h2><p className="mt-4 max-w-md leading-7 text-slate-600">오늘도 많은 사람들이 새로운 자기 모습을 발견하고 있어요. 참여 수는 현재 서비스 기준의 예시 데이터입니다.</p><div className="mt-7 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-black text-emerald-700"><span className="size-2 animate-pulse rounded-full bg-emerald-500" /> 지금 참여 중</div></SectionReveal>
          <SectionReveal className="rounded-[2rem] bg-slate-950 p-4 shadow-2xl shadow-slate-300 sm:p-6"><ol className="space-y-3">{rankedTests.map((test, index) => <li key={test.slug}><Link href={test.href ?? `/tests/${test.slug}`} className="flex min-h-20 items-center gap-4 rounded-2xl border border-white/10 bg-white/[.06] p-4 transition hover:bg-white/[.11]"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-xl">{["🥇","🥈","🥉"][index] ?? index + 1}</span><span className="min-w-0 flex-1"><strong className="block truncate text-sm text-white sm:text-base">{test.cardTitle ?? test.title}</strong><span className="mt-1 block text-xs text-slate-400">{test.type === "worldcup" ? `${test.itemCount}강` : test.type === "fortune" ? `${test.itemCount ?? 5}장 카드` : `${test.itemCount ?? test.questions.length}문항`} · {test.duration}</span></span><span className="shrink-0 text-right"><strong className="block text-sm text-white">{test.participants.toLocaleString("ko-KR")}</strong><span className="text-[10px] text-slate-500">명 참여</span></span></Link></li>)}</ol></SectionReveal>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20"><SectionReveal><SectionHeading icon="💬" eyebrow="SAMPLE REVIEW" title="이런 반응이 나오는 테스트" description="결과를 읽는 순간 ‘어, 진짜 나 같은데?’라는 느낌을 목표로 만들었어요." /><div className="mt-7 grid gap-4 sm:grid-cols-3">{[["“친구랑 같이 했는데 서로 결과가 너무 딱 맞아서 한참 웃었어요.”","직장 동물 테스트"],["“막연했던 부업 후보가 세 개로 좁혀져서 바로 하나 시작해 보려고요.”","부업 추천 테스트"],["“예언처럼 단정하지 않고 지금 제 상황을 설명해 줘서 더 공감됐어요.”","결혼 시기 테스트"]].map(([quote, test]) => <figure key={test} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-card"><div className="text-amber-400" aria-label="별점 5점">★★★★★</div><blockquote className="mt-4 text-sm font-semibold leading-7 text-slate-700">{quote}</blockquote><figcaption className="mt-5 border-t border-slate-100 pt-4 text-xs font-bold text-slate-400">{test} · 후기 예시</figcaption></figure>)}</div></SectionReveal></section>

      <section className="border-t border-slate-200 bg-white"><div className="container-page py-14 sm:py-20"><SectionReveal><SectionHeading icon="📚" eyebrow="TEST GUIDE" title="테스트 가이드" description="재미로 발견하고, 현실적인 정보로 한 걸음 더 나아가세요." href="/blog" /><div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{blogPosts.slice(0, 3).map((post) => <BlogCard key={post.slug} post={post} />)}</div></SectionReveal></div></section>

      <JsonLd data={{ "@context":"https://schema.org", "@type":"FAQPage", mainEntity:[{ "@type":"Question", name:"테스트는 무료인가요?", acceptedAnswer:{ "@type":"Answer", text:"네, 모든 테스트는 회원가입 없이 무료로 이용할 수 있습니다." } },{ "@type":"Question", name:"결과는 어떻게 계산하나요?", acceptedAnswer:{ "@type":"Answer", text:"각 답변을 테스트별 성향 가중치와 비교해 가장 가까운 결과를 제공합니다." } }] }} />
    </>
  );
}

type Tone = "blue" | "orange" | "pink" | "green" | "purple";
const showcaseClasses: Record<Tone, { section:string; text:string; icon:string }> = {
  blue:{ section:"from-blue-50 to-indigo-50", text:"text-blue-600", icon:"from-blue-500 to-indigo-600" },
  orange:{ section:"from-orange-50 to-amber-50", text:"text-orange-600", icon:"from-orange-400 to-rose-500" },
  pink:{ section:"from-rose-50 to-violet-50", text:"text-rose-600", icon:"from-rose-500 to-violet-600" },
  green:{ section:"from-emerald-50 to-teal-50", text:"text-emerald-600", icon:"from-emerald-500 to-teal-600" },
  purple:{ section:"from-violet-50 to-fuchsia-50", text:"text-violet-600", icon:"from-violet-500 to-fuchsia-600" },
};

function CategoryShowcase({ id, icon, eyebrow, title, description, test, extraTest, upcoming, tone, reverse = false }: { id:string; icon:string; eyebrow:string; title:string; description:string; test?: (typeof tests)[number]; extraTest?: (typeof tests)[number]; upcoming:[string,string,string][]; tone:Tone; reverse?:boolean }) {
  const colors = showcaseClasses[tone];
  const actualTests = [test, extraTest].filter(Boolean) as (typeof tests)[number][];
  return <section id={id} className={`scroll-mt-20 border-y border-white bg-gradient-to-br ${colors.section}`}><div className={`container-page grid gap-10 py-14 lg:grid-cols-[.72fr_1.28fr] lg:items-center sm:py-20 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}><SectionReveal><p className={`text-sm font-black ${colors.text}`}>{icon} {eyebrow}</p><h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-ink sm:text-4xl">{title}</h2><p className="mt-4 max-w-md leading-7 text-slate-600">{description}</p>{test && <Link href={test.href ?? `/tests/${test.slug}`} className={`mt-7 inline-flex min-h-12 items-center rounded-xl bg-gradient-to-r ${colors.icon} px-5 text-sm font-black text-white shadow-lg`}>지금 테스트하기 →</Link>}</SectionReveal><SectionReveal className="grid gap-4 sm:grid-cols-2">{actualTests.map((item)=><Link key={item.slug} href={item.href ?? `/tests/${item.slug}`} className="group glass-panel flex min-h-52 flex-col justify-between rounded-[1.75rem] p-6 transition hover:-translate-y-1"><div><span className="text-5xl">{item.icon}</span><span className={`ml-3 align-top text-xs font-black ${colors.text}`}>{item.category}</span><h3 className="mt-5 text-xl font-black text-ink">{item.cardTitle ?? item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p></div><span className="mt-5 text-xs font-bold text-slate-400">{item.duration} · {item.participants.toLocaleString("ko-KR")}명 참여</span></Link>)}{upcoming.map(([itemIcon,itemTitle,itemText]) => <div key={itemTitle} className="flex min-h-40 flex-col justify-between rounded-[1.75rem] border border-white/80 bg-white/55 p-5 opacity-80 backdrop-blur"><div><span className="text-4xl">{itemIcon}</span><h3 className="mt-4 font-black text-ink">{itemTitle}</h3><p className="mt-2 text-xs text-slate-500">{itemText}</p></div><span className="mt-4 w-fit rounded-full bg-slate-900 px-3 py-1 text-[9px] font-black tracking-wider text-white">COMING SOON</span></div>)}</SectionReveal></div></section>;
}

function SectionHeading({ icon, eyebrow, title, description, href }: { icon:string; eyebrow:string; title:string; description:string; href?:string }) {
  return <div className="flex items-end justify-between gap-5"><div><p className="text-sm font-black text-primary">{icon} {eyebrow}</p><h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-ink sm:text-4xl">{title}</h2><p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">{description}</p></div>{href && <Link href={href} className="hidden shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-blue-200 hover:text-primary sm:block">전체 보기 →</Link>}</div>;
}
