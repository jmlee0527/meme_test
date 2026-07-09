import Link from "next/link";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "./JsonLd";

type Item = { name: string; href?: string };

export function Breadcrumbs({ items }: { items: Item[] }) {
  const allItems: Item[] = [{ name: "홈", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="현재 위치" className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
        {allItems.map((item, index) => (
          <span key={`${item.name}-${index}`} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.href ? <Link href={item.href} className="hover:text-primary">{item.name}</Link> : <span aria-current="page">{item.name}</span>}
          </span>
        ))}
      </nav>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        // 구글 규칙: 마지막 ListItem을 제외한 모든 항목에는 item(URL)이 필수입니다.
        // 링크가 없는 중간 항목은 JSON-LD에서 제외해 리치 결과 오류를 방지합니다.
        itemListElement: allItems
          .filter((item, index) => item.href || index === allItems.length - 1)
          .map((item, index) => ({
            "@type": "ListItem", position: index + 1, name: item.name,
            ...(item.href ? { item: absoluteUrl(item.href) } : {}),
          })),
      }} />
    </>
  );
}
