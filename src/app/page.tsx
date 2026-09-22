import { CATEGORIES } from "@/lib/tools/categories";
import {
  getNewTools,
  getPopularTools,
  getToolsByCategory,
} from "@/lib/tools/registry";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants/site";
import { JsonLd } from "@/components/seo/jsonld";
import { SearchBox } from "@/components/layout/search-box";
import { ToolCard } from "@/components/tools/tool-card";
import { SearchResults } from "@/components/tools/search-results";
import { Accordion } from "@/components/ui/accordion";
import { CATEGORY_ICONS } from "@/components/icons";
import { AdSlot } from "@/components/ui/ad-slot";
import Link from "next/link";

const SITE_FAQ = [
  {
    q: "Bu araçlar gerçekten ücretsiz mi?",
    a: "Evet. Tüm araçlar tamamen ücretsizdir; kayıt, abonelik veya gizli ücret yoktur.",
  },
  {
    q: "Dosyalarım ve verilerim nereye gidiyor?",
    a: "Hiçbir yere. Tüm işlemler tarayıcınızda gerçekleşir; dosyalarınız ve metinleriniz cihazınızdan çıkmaz, hiçbir sunucuya yüklenmez.",
  },
  {
    q: "Mobil cihazlarda çalışır mı?",
    a: "Evet, tüm araçlar akıllı telefon ve tabletlerde sorunsuz çalışacak şekilde tasarlanmıştır.",
  },
  {
    q: "İndirme veya kurulum gerekiyor mu?",
    a: "Hayır. Tüm araçlar doğrudan tarayıcınızda çalışır; uygulama kurmanız gerekmez.",
  },
  {
    q: "Oluşturulan QR kodların süresi dolar mı?",
    a: "Hayır. QR kodlar statiktir; içerdikleri bilgi değişmediği sürece sonsuza kadar çalışır.",
  },
];

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `${SITE_NAME} — Ücretsiz Çevrimiçi Araçlar`,
  description: SITE_TAGLINE,
  inLanguage: "tr-TR",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: SITE_FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function HomePage() {
  const popular = getPopularTools(8);
  const newTools = getNewTools(6);

  return (
    <div>
      <JsonLd data={homeJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* Hero */}
      <section className="py-10 text-center sm:py-14">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          FREE <span className="text-brand-600">ONLINE</span> TOOLS
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
          {SITE_TAGLINE}. QR kod, PDF, görsel, metin ve daha fazlası — hepsi
          tarayıcınızda, hepsi ücretsiz.
        </p>
        <div className="mx-auto mt-8 max-w-xl px-4">
          <SearchBox />
        </div>
        <SearchResults />
      </section>

      {/* Categories */}
      <section aria-label="Kategoriler" className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">Kategoriler</h2>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.icon];
            const count = getToolsByCategory(cat.slug).length;
            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}/`}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
              >
                <span className="w-fit rounded-lg bg-brand-50 p-2.5 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
                  <Icon size={22} />
                </span>
                <h3 className="mt-3 text-sm font-bold text-slate-800 group-hover:text-brand-700">
                  {cat.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500">{cat.tagline}</p>
                <p className="mt-2 text-[11px] font-medium text-slate-400">
                  {count} araç
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <AdSlot format="horizontal" />

      {/* Popular */}
      {popular.length > 0 && (
        <section aria-label="Popüler araçlar" className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">Popüler Araçlar</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* New */}
      {newTools.length > 0 && (
        <section aria-label="Yeni araçlar" className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">Yeni Araçlar</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {newTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section aria-label="Sık sorulan sorular" className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">Sık Sorulan Sorular</h2>
        <div className="mt-5">
          <Accordion items={SITE_FAQ} />
        </div>
      </section>
    </div>
  );
}
