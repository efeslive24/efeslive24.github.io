export const SITE_NAME = "Free Online Tools";
export const SITE_SHORT_NAME = "FOT";
export const SITE_TAGLINE = "Ücretsiz, hızlı ve güvenli çevrimiçi araçlar";
export const SITE_DESCRIPTION =
  "QR kod, PDF, görsel, metin, geliştirici, SEO ve hesap makinesi araçları — hepsi ücretsiz, tarayıcınızda çalışır ve dosyalarınız cihazınızdan çıkmaz.";

// Gerçek alan adı yayına alınırken NEXT_PUBLIC_SITE_URL ortam değişkeni ile değiştirilmeli.
// .example TLD'si rezerve edilmiştir (RFC 2606), gerçek bir siteye işaret etmez.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://freeonlinetools.example";

// GitHub Pages gibi alt yol barındırmaları için derleme sırasında
// NEXT_PUBLIC_BASE_PATH=/depo-adi şeklinde tanımlanır (kök barındırmada boş).
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const PDFJS_WORKER_SRC = `${BASE_PATH}/pdfjs/pdf.worker.min.mjs`;

export const CONTACT_EMAIL = "contact@freeonlinetools.example";
