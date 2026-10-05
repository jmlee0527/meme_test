"use client";

import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CategoryTiles } from "@/components/category/CategoryTiles";
import { TestCard } from "@/components/cards/TestCard";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { categoryKey, type TranslationKey } from "@/lib/i18n";
import type { TestDefinition } from "@/lib/types";

export function CategoryPageContent({ category, title, description, tests, guide }: { category: string; title: string; description: string; tests: TestDefinition[]; guide: ReactNode }) {
  const { locale, t } = useLanguage();
  const translatedCategoryKey = categoryKey(category);
  const categoryName = translatedCategoryKey ? t(translatedCategoryKey) : category;
  const descriptionKeys: Record<string, TranslationKey> = {
    "성격.심리": "categories.personalityDescription",
    "연애.관계": "categories.relationshipDescription",
    "직업.일상": "categories.workDescription",
    "팬 퀴즈": "categories.fanDescription",
    "건강.운세": "categories.healthDescription",
  };
  return (
    <div className="container-page py-10 sm:py-14">
      <Breadcrumbs items={[{ name: t("nav.tests"), href: "/categories" }, { name: categoryName }]} />
      <p className="text-sm font-black tracking-[.14em] text-primary">EXPLORE {tests.length} TESTS</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">{locale === "ko" ? title : categoryName}</h1>
      <p className="mt-4 max-w-3xl leading-7 text-slate-600">{locale === "ko" ? description : descriptionKeys[category] ? t(descriptionKeys[category]) : description}</p>
      <div className="mt-8"><CategoryTiles activeCategory={category} /></div>
      {guide}
      {tests.length > 0 && (
        <section className="mt-12">
          <p className="text-xs font-black tracking-[.14em] text-primary">ALL TESTS</p>
          <h2 className="mt-2 text-2xl font-black text-ink">전체 {categoryName} 테스트</h2>
          <div className="test-card-grid mt-5">{tests.map((test) => <TestCard key={test.slug} test={test} />)}</div>
        </section>
      )}
    </div>
  );
}
