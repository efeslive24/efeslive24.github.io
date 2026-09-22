import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants/site";
import { ALL_TOOLS } from "@/lib/tools/registry";
import { CATEGORIES } from "@/lib/tools/categories";

export const dynamic = "force-static";

const LEGAL_PAGES = [
  "/gizlilik-politikasi/",
  "/kvkk-aydinlatma-metni/",
  "/cerez-politikasi/",
  "/kullanim-kosullari/",
  "/telif-hakki-politikasi/",
  "/suistimal-bildirimi/",
  "/reklam-politikasi/",
  "/iletisim/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    ...LEGAL_PAGES.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    })),
    ...CATEGORIES.map((cat) => ({
      url: `${SITE_URL}/categories/${cat.slug}/`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  const toolPages: MetadataRoute.Sitemap = ALL_TOOLS.map((tool) => ({
    url: `${SITE_URL}/tools/${tool.slug}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...toolPages];
}
