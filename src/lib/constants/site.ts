export const SITE_NAME = "Free Online Tools";
export const SITE_SHORT_NAME = "FOT";
export const SITE_TAGLINE = "Ücretsiz, hızlı ve güvenli çevrimiçi araçlar";
export const SITE_DESCRIPTION =
  "QR kod, PDF, görsel, metin, geliştirici, SEO ve hesap makinesi araçları — hepsi ücretsiz, tarayıcınızda çalışır ve dosyalarınız cihazınızdan çıkmaz.";

// Varsayılan, GitHub Pages kullanıcı sitesidir; kendi alan adınızı bağlarken
// NEXT_PUBLIC_SITE_URL ortam değişkeni ile değiştirilmelidir.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://efeslive24.github.io";

// GitHub Pages gibi alt yol barındırmaları için derleme sırasında
// NEXT_PUBLIC_BASE_PATH=/depo-adi şeklinde tanımlanır (kök barındırmada boş).
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const PDFJS_WORKER_SRC = `${BASE_PATH}/pdfjs/pdf.worker.min.mjs`;

export const CONTACT_EMAIL = "contact@freeonlinetools.example";
