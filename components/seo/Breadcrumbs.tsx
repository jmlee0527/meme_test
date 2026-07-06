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
        itemListElement: allItems.map((item, index) => ({
          "@type": "ListItem", position: index + 1, name: item.name,
          ...(item.href ? { item: absoluteUrl(item.href) } : {}),
        })),
      }} />
    </>
  );
}
