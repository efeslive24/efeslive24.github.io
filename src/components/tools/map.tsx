"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const loading = (
  <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 py-16 text-sm text-slate-500">
    Araç yükleniyor…
  </div>
);

const load = (path: string) =>
  dynamic(() => import(`@/components/tools/${path}`), {
    ssr: false,
    loading: () => loading,
  });

export const TOOL_COMPONENTS: Record<string, ComponentType> = {
  // QR
  "qr-code-generator": load("qr/qr-code-generator"),
  "wifi-qr-generator": load("qr/wifi-qr-generator"),
  "whatsapp-qr-generator": load("qr/whatsapp-qr-generator"),
  "vcard-qr-generator": load("qr/vcard-qr-generator"),
  "email-qr-generator": load("qr/email-qr-generator"),
  "sms-qr-generator": load("qr/sms-qr-generator"),
  "text-qr-generator": load("qr/text-qr-generator"),
  "social-profile-qr-generator": load("qr/social-profile-qr-generator"),

  // Text
  "word-counter": load("text/word-counter"),
  "character-counter": load("text/character-counter"),
  "case-converter": load("text/case-converter"),
  "text-cleaner": load("text/text-cleaner"),
  "duplicate-line-remover": load("text/duplicate-line-remover"),
  "text-sorter": load("text/text-sorter"),
  "text-diff": load("text/text-diff"),
  "lorem-ipsum-generator": load("text/lorem-ipsum-generator"),

  // Developer
  "json-formatter": load("dev/json-formatter"),
  "json-validator": load("dev/json-validator"),
  "json-to-csv": load("dev/json-to-csv"),
  "csv-to-json": load("dev/csv-to-json"),
  "base64-encoder": load("dev/base64-encoder"),
  "base64-decoder": load("dev/base64-decoder"),
  "uuid-generator": load("dev/uuid-generator"),
  "regex-tester": load("dev/regex-tester"),
  "timestamp-converter": load("dev/timestamp-converter"),
  "hash-generator": load("dev/hash-generator"),
  "jwt-decoder": load("dev/jwt-decoder"),
  "cron-generator": load("dev/cron-generator"),

  // PDF
  "pdf-merge": load("pdf/pdf-merge"),
  "pdf-split": load("pdf/pdf-split"),
  "pdf-extract": load("pdf/pdf-extract"),
  "pdf-rotate": load("pdf/pdf-rotate"),
  "pdf-metadata": load("pdf/pdf-metadata"),
  "pdf-compress": load("pdf/pdf-compress"),
  "pdf-to-jpg": load("pdf/pdf-to-jpg"),
  "jpg-to-pdf": load("pdf/jpg-to-pdf"),

  // Image
  "image-compress": load("image/image-compress"),
  "image-resize": load("image/image-resize"),
  "image-convert": load("image/image-convert"),
  "image-crop": load("image/image-crop"),
  "image-mirror": load("image/image-mirror"),
  "image-rotate-tool": load("image/image-rotate-tool"),
  "image-metadata": load("image/image-metadata"),
  "color-palette": load("image/color-palette"),
  "favicon-generator": load("image/favicon-generator"),

  // SEO
  "meta-tag-generator": load("seo/meta-tag-generator"),
  "open-graph-generator": load("seo/open-graph-generator"),
  "robots-txt-generator": load("seo/robots-txt-generator"),
  "sitemap-generator": load("seo/sitemap-generator"),
  "canonical-generator": load("seo/canonical-generator"),

  // Calculator
  "percentage-calculator": load("calc/percentage-calculator"),
  "discount-calculator": load("calc/discount-calculator"),
  "vat-calculator": load("calc/vat-calculator"),
  "age-calculator": load("calc/age-calculator"),
  "date-difference-calculator": load("calc/date-difference-calculator"),
  "unit-converter": load("calc/unit-converter"),
  "fuel-cost-calculator": load("calc/fuel-cost-calculator"),
  "tip-calculator": load("calc/tip-calculator"),

  // Webmaster
  "url-shortener": load("webmaster/url-shortener"),
  "redirect-checker": load("webmaster/redirect-checker"),
  "utm-builder": load("webmaster/utm-builder"),
  "url-encoder": load("webmaster/url-encoder"),
  "url-decoder": load("webmaster/url-decoder"),

  // Social
  "hashtag-generator": load("social/hashtag-generator"),
  "emoji-copy": load("social/emoji-copy"),
};
