import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

type Section = { title: string; content: React.ReactNode };
export function PolicyLayout({ title, description, updatedAt, sections }: { title: string; description: string; updatedAt: string; sections: Section[] }) {
  return (
    <div className="container-page py-10 sm:py-14">
      <Breadcrumbs items={[{ name: title }]} />
      <article className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-10">
        <h1 className="text-3xl font-black tracking-tight text-ink">{title}</h1><p className="mt-4 leading-7 text-slate-600">{description}</p><p className="mt-3 text-xs text-slate-400">최종 업데이트: {updatedAt}</p>
        <div className="prose-buup mt-8">{sections.map((section) => <section key={section.title}><h2>{section.title}</h2><div className="leading-8 text-slate-700">{section.content}</div></section>)}</div>
      </article>
    </div>
  );
}
