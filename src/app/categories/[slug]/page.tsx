import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategory } from "@/lib/tools/categories";
import { getToolsByCategory } from "@/lib/tools/registry";
import { SITE_NAME, SITE_URL } from "@/lib/constants/site";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ToolCard } from "@/components/tools/tool-card";
import { JsonLd } from "@/components/seo/jsonld";
import { AdSlot } from "@/components/ui/ad-slot";
import { CATEGORY_ICONS } from "@/components/icons";

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  const url = `${SITE_URL}/categories/${category.slug}/`;
  return {
    title: `${category.name} — Ücretsiz ${category.nameTr}`,
    description: category.description,
    keywords: category.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url,
      title: category.name,
      description: category.description,
      siteName: SITE_NAME,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const tools = getToolsByCategory(slug);
  const Icon = CATEGORY_ICONS[category.icon];
  const url = `${SITE_URL}/categories/${category.slug}/`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} — ${SITE_NAME}`,
    description: category.description,
    url,
    inLanguage: "tr-TR",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: tools.map((tool, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/tools/${tool.slug}/`,
        name: tool.title,
      })),
    },
  };

  return (
    <div>
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[{ label: "Ana Sayfa", href: "/" }, { label: category.name }]}
      />

      <header className="flex items-center gap-4">
        <span className="rounded-xl bg-brand-50 p-3 text-brand-600">
          <Icon size={28} />
        </span>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            {category.name}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{category.tagline}</p>
        </div>
      </header>

      <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-slate-600">
        {category.description}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} showCategory={false} />
        ))}
      </div>

      <AdSlot format="horizontal" />
    </div>
  );
}
