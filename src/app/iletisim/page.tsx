import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SITE_NAME, SITE_URL, CONTACT_EMAIL } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "İletişim",
  description: `${SITE_NAME} iletişim sayfası: soru, öneri ve iş birliği talepleriniz için bize ulaşın.`,
  alternates: { canonical: `${SITE_URL}/iletisim/` },
};

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-2xl">
      <Breadcrumbs items={[{ label: "Ana Sayfa", href: "/" }, { label: "İletişim" }]} />
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
        İletişim
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        Soru, öneri, hata bildirimi veya iş birliği talepleriniz için bize yazabilirsiniz.
        Yanıt süremiz genellikle 1-3 iş günüdür.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Genel İletişim")}`}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-300 hover:shadow-md"
        >
          <h2 className="text-sm font-bold text-slate-800">Genel İletişim</h2>
          <p className="mt-1 break-all text-sm text-brand-600">{CONTACT_EMAIL}</p>
        </a>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Hata Bildirimi")}`}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-300 hover:shadow-md"
        >
          <h2 className="text-sm font-bold text-slate-800">Hata Bildirimi</h2>
          <p className="mt-1 text-sm text-slate-500">
            Bir aracın çalışmaması durumunda; araç adı, tarayıcı ve sorunun açıklamasıyla bildirin.
          </p>
        </a>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Yasal / KVKK Talebi")}`}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-300 hover:shadow-md"
        >
          <h2 className="text-sm font-bold text-slate-800">Yasal ve KVKK Talepleri</h2>
          <p className="mt-1 text-sm text-slate-500">
            Veri hakları, telif ve suistimal bildirimleri için ilgili politika sayfalarındaki süreçleri izleyin.
          </p>
        </a>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("İş Birliği")}`}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-300 hover:shadow-md"
        >
          <h2 className="text-sm font-bold text-slate-800">İş Birliği</h2>
          <p className="mt-1 text-sm text-slate-500">
            İçerik, araç entegrasyonu ve medya iş birlikleri.
          </p>
        </a>
      </div>

      <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-500">
        Not: {SITE_NAME} hakkında bilgi için site genelindeki yasal sayfalara (Gizlilik
        Politikası, Kullanım Koşulları vb.) göz atabilirsiniz.
      </div>
    </article>
  );
}
