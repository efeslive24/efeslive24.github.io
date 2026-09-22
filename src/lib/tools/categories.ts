import type { CategoryDef } from "./types";

export const CATEGORIES: CategoryDef[] = [
  {
    slug: "qr-tools",
    name: "QR Tools",
    nameTr: "QR Kod Araçları",
    tagline: "QR kod oluşturma araçları",
    description:
      "URL, Wi-Fi, WhatsApp, vCard ve daha fazlası için ücretsiz QR kod oluşturun. Kodlar tarayıcınızda üretilir, verileriniz hiçbir sunucuya gönderilmez.",
    icon: "qr",
    keywords: ["qr kod oluşturucu", "qr code generator", "wifi qr", "whatsapp qr"],
  },
  {
    slug: "pdf-tools",
    name: "PDF Tools",
    nameTr: "PDF Araçları",
    tagline: "PDF birleştirme, bölme, dönüştürme",
    description:
      "PDF dosyalarınızı ücretsiz birleştirin, bölün, sıkıştırın ve dönüştürün. Tüm işlemler tarayıcınızda gerçekleşir, dosyalarınız cihazınızdan ayrılmaz.",
    icon: "pdf",
    keywords: ["pdf birleştir", "pdf sıkıştır", "pdf dönüştür", "pdf to jpg"],
  },
  {
    slug: "image-tools",
    name: "Image Tools",
    nameTr: "Görsel Araçları",
    tagline: "Görsel sıkıştırma, dönüştürme, düzenleme",
    description:
      "Görsellerinizi ücretsiz sıkıştırın, yeniden boyutlandırın ve formatlar arasında dönüştürün. Tarayıcıda çalışır, gizliliğiniz korunur.",
    icon: "image",
    keywords: ["görsel sıkıştır", "resim boyutlandır", "jpg png dönüştür", "webp dönüştürücü"],
  },
  {
    slug: "text-tools",
    name: "Text Tools",
    nameTr: "Metin Araçları",
    tagline: "Metin sayma, dönüştürme, temizleme",
    description:
      "Kelime ve karakter sayma, harf dönüştürme, metin temizleme ve daha fazlası için ücretsiz metin araçları.",
    icon: "text",
    keywords: ["kelime sayacı", "karakter sayacı", "metin dönüştürücü", "text tools"],
  },
  {
    slug: "developer-tools",
    name: "Developer Tools",
    nameTr: "Geliştirici Araçları",
    tagline: "JSON, Base64, hash, regex araçları",
    description:
      "JSON biçimlendirme, Base64 kodlama, hash üretme, regex test etme ve daha fazlası — geliştiriciler için ücretsiz araçlar.",
    icon: "code",
    keywords: ["json formatter", "base64 encoder", "hash generator", "regex tester"],
  },
  {
    slug: "seo-tools",
    name: "SEO Tools",
    nameTr: "SEO Araçları",
    tagline: "Meta etiket, sitemap, robots.txt üreticileri",
    description:
      "Meta etiketleri, Open Graph etiketleri, robots.txt ve sitemap dosyalarını ücretsiz oluşturun.",
    icon: "search",
    keywords: ["meta tag generator", "sitemap generator", "robots.txt", "open graph"],
  },
  {
    slug: "webmaster-tools",
    name: "Webmaster Tools",
    nameTr: "Web Yöneticisi Araçları",
    tagline: "URL kodlama, UTM, yönlendirme kontrolü",
    description:
      "URL kodlama ve çözme, UTM parametresi oluşturma, yönlendirme kontrolü ve bağlantı araçları.",
    icon: "globe",
    keywords: ["url encoder", "url decoder", "utm builder", "redirect checker"],
  },
  {
    slug: "calculators",
    name: "Calculators",
    nameTr: "Hesap Makineleri",
    tagline: "Yüzde, KDV, indirim, tarih hesaplayıcıları",
    description:
      "Yüzde, KDV, indirim, yaş, tarih farkı ve daha fazlası için pratik, ücretsiz hesaplayıcılar.",
    icon: "calculator",
    keywords: ["yüzde hesaplama", "kdv hesaplama", "yaş hesaplama", "indirim hesaplama"],
  },
  {
    slug: "social-media-tools",
    name: "Social Media Tools",
    nameTr: "Sosyal Medya Araçları",
    tagline: "Hashtag ve içerik yardımcıları",
    description:
      "Sosyal medya paylaşımlarınız için hashtag oluşturma ve emoji kopyalama araçları.",
    icon: "share",
    keywords: ["hashtag generator", "emoji kopyala", "sosyal medya araçları"],
  },
];

export const CATEGORY_MAP: Record<string, CategoryDef> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c])
);

export function getCategory(slug: string): CategoryDef | undefined {
  return CATEGORY_MAP[slug];
}
