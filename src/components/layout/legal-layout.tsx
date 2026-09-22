import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

interface Section {
  heading: string;
  body: ReactNode;
}

export function LegalLayout({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: Section[];
}) {
  return (
    <article className="mx-auto max-w-3xl">
      <Breadcrumbs items={[{ label: "Ana Sayfa", href: "/" }, { label: title }]} />
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h1>
      <p className="mt-2 text-sm text-slate-500">Son güncelleme: {updated}</p>
      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-800">
        Bu sayfadaki metinler genel bilgilendirme amaçlıdır ve profesyonel hukuk
        danışmanlığının yerine geçmez. Sitenizin özel koşulları için bir avukata
        danışmanız önerilir.
      </div>
      <div className="mt-6 space-y-8">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-bold text-slate-900">{section.heading}</h2>
            <div className="mt-2 space-y-3 text-sm leading-relaxed text-slate-700">
              {section.body}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
