"use client";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { categoryKey } from "@/lib/i18n";
import type { TestDefinition } from "@/lib/types";

export function TestBreadcrumbs({ test }: { test: Pick<TestDefinition, "category" | "shortTitle"> }) {
  const { t } = useLanguage();
  const key = categoryKey(test.category);
  return <Breadcrumbs items={[{ name: key ? t(key) : test.category, href: `/category/${encodeURIComponent(test.category)}` }, { name: test.shortTitle }]} />;
}
