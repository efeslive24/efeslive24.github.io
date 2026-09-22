import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_TOOLS, getRelatedTools, getTool } from "@/lib/tools/registry";
import { getCategory } from "@/lib/tools/categories";
import { SITE_NAME, SITE_URL } from "@/lib/constants/site";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ToolRunner } from "@/components/tools/tool-runner";
import { ToolCard } from "@/components/tools/tool-card";
import { Accordion } from "@/components/ui/accordion";
import { AdSlot } from "@/components/ui/ad-slot";
import { JsonLd } from "@/components/seo/jsonld";
import { IconCheck } from "@/components/icons";

export function generateStaticParams() {
  return ALL_TOOLS.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  const url = `${SITE_URL}/tools/${tool.slug}/`;
  return {
    title: `${tool.title} — Ücretsiz Online Araç`,
    description: tool.description,
    keywords: tool.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url,
      title: tool.title,
      description: tool.description,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary",
      title: tool.title,
      description: tool.description,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const category = getCategory(tool.category);
  const related = getRelatedTools(tool);
  const url = `${SITE_URL}/tools/${tool.slug}/`;

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    description: tool.longDescription,
    url,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    inLanguage: "tr-TR",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "TRY" },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const crumbs = [
    { label: "Ana Sayfa", href: "/" },
    ...(category
      ? [{ label: category.name, href: `/categories/${category.slug}/` }]
      : []),
    { label: tool.title },
  ];

  return (
    <article>
      <JsonLd data={softwareJsonLd} />
      <JsonLd data={faqJsonLd} />
      <Breadcrumbs items={crumbs} />

      <header className="mb-2">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          {tool.title}
        </h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-slate-600">
          {tool.longDescription}
        </p>
      </header>

      <ToolRunner slug={tool.slug} />

      <AdSlot format="horizontal" />

      <section aria-label="Nasıl kullanılır" className="mt-10">
        <h2 className="text-lg font-bold text-slate-900">Nasıl Kullanılır?</h2>
        <ol className="mt-4 space-y-3">
          {tool.howTo.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed text-slate-700">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-label="Kullanım alanları" className="mt-8">
        <h2 className="text-lg font-bold text-slate-900">Kullanım Alanları</h2>
        <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {tool.useCases.map((useCase, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700">
              <IconCheck size={16} className="mt-0.5 shrink-0 text-emerald-600" />
              {useCase}
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Sık sorulan sorular" className="mt-10">
        <h2 className="mb-4 text-lg font-bold text-slate-900">
          {tool.title} Hakkında Sık Sorulan Sorular
        </h2>
        <Accordion items={tool.faq} />
      </section>

      {related.length > 0 && (
        <section aria-label="İlgili araçlar" className="mt-10">
          <h2 className="text-lg font-bold text-slate-900">İlgili Araçlar</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t) => (
              <ToolCard key={t.slug} tool={t} showCategory={false} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
