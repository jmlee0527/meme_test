import { DailyFortuneClient } from "@/components/fortune/DailyFortuneClient";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { TestSeoContent } from "@/components/seo/TestSeoContent";
import { dailyFortuneTest } from "@/data/fortune-data";
import { absoluteUrl, createMetadata, siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "오늘의 운세 카드 뽑기 | 무료 오늘 운세 보기",
  description: "카드 한 장을 뽑아 오늘의 운세, 행운 점수, 금전운, 연애운, 일/학업운을 확인해보세요.",
  path: "/fortune/today",
  keywords: ["오늘의 운세", "무료 운세", "운세 카드", "오늘 운세 보기", "카드 뽑기 운세"],
});

export default function TodayFortunePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#ede9fe_0%,transparent_32%),radial-gradient(circle_at_top_right,#ffe4e6_0%,transparent_30%),linear-gradient(180deg,#f8fafc_0%,#fff_55%,#f5f3ff_100%)]">
      <div className="container-page py-8 sm:py-10">
        <Breadcrumbs items={[{ name: "운세", href: "/category/%EC%9A%B4%EC%84%B8" }, { name: "오늘의 운세" }]} />
        <DailyFortuneClient />
        <TestSeoContent test={dailyFortuneTest} path="/fortune/today" includeQuizSchema={false} />
      </div>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: dailyFortuneTest.title,
        description: dailyFortuneTest.description,
        url: absoluteUrl("/fortune/today"),
        inLanguage: "ko-KR",
        isAccessibleForFree: true,
        publisher: { "@type": "Organization", "@id": absoluteUrl("/#organization"), name: siteConfig.name },
        mainEntity: { "@type": "CreativeWork", "@id": absoluteUrl("/fortune/today#fortune-card") },
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": absoluteUrl("/fortune/today#fortune-card"),
        name: "오늘의 운세 카드 뽑기",
        description: "카드 한 장을 선택해 오늘의 운세와 행운 점수를 확인하는 엔터테인먼트 콘텐츠입니다.",
        url: absoluteUrl("/fortune/today"),
        inLanguage: "ko-KR",
        genre: "Entertainment",
        interactivityType: "active",
        isAccessibleForFree: true,
      }} />
    </main>
  );
}
