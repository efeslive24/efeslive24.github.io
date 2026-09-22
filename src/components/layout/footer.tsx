import Link from "next/link";
import { CATEGORIES } from "@/lib/tools/categories";
import { getPopularTools } from "@/lib/tools/registry";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants/site";

const LEGAL_LINKS = [
  { href: "/gizlilik-politikasi/", label: "Gizlilik Politikası" },
  { href: "/kvkk-aydinlatma-metni/", label: "KVKK Aydınlatma Metni" },
  { href: "/cerez-politikasi/", label: "Çerez Politikası" },
  { href: "/kullanim-kosullari/", label: "Kullanım Koşulları" },
  { href: "/telif-hakki-politikasi/", label: "Telif Hakkı Politikası" },
  { href: "/suistimal-bildirimi/", label: "Suistimal Bildirimi" },
  { href: "/reklam-politikasi/", label: "Reklam Politikası" },
  { href: "/iletisim/", label: "İletişim" },
];

export function Footer() {
  const popular = getPopularTools(6);

  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-sm font-bold text-slate-900">{SITE_NAME}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{SITE_TAGLINE}.</p>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">
            Tüm araçlar tarayıcınızda çalışır; dosyalarınız ve verileriniz cihazınızdan çıkmaz.
          </p>
        </div>
        <nav aria-label="Kategoriler">
          <p className="text-sm font-bold text-slate-900">Kategoriler</p>
          <ul className="mt-3 space-y-2">
            {CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/categories/${cat.slug}/`}
                  className="text-sm text-slate-600 hover:text-brand-600"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Popüler araçlar">
          <p className="text-sm font-bold text-slate-900">Popüler Araçlar</p>
          <ul className="mt-3 space-y-2">
            {popular.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={`/tools/${tool.slug}/`}
                  className="text-sm text-slate-600 hover:text-brand-600"
                >
                  {tool.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Yasal">
          <p className="text-sm font-bold text-slate-900">Yasal</p>
          <ul className="mt-3 space-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-600 hover:text-brand-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. Tüm hakları saklıdır.
          </p>
          <p>Ücretsiz • Kayıt gerekmez • Gizlilik öncelikli</p>
        </div>
      </div>
    </footer>
  );
}
