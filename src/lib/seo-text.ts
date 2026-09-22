export function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export interface MetaTagOptions {
  title: string;
  description: string;
  keywords?: string;
  robots?: string[];
  author?: string;
  charset?: string;
  viewport?: string;
}

export function buildMetaTags(opts: MetaTagOptions): string {
  const lines: string[] = [];
  if (opts.charset) lines.push(`<meta charset="${escapeXml(opts.charset)}">`);
  if (opts.viewport)
    lines.push(`<meta name="viewport" content="${escapeXml(opts.viewport)}">`);
  if (opts.title) lines.push(`<title>${escapeXml(opts.title)}</title>`);
  if (opts.description)
    lines.push(`<meta name="description" content="${escapeXml(opts.description)}">`);
  if (opts.keywords)
    lines.push(`<meta name="keywords" content="${escapeXml(opts.keywords)}">`);
  if (opts.author)
    lines.push(`<meta name="author" content="${escapeXml(opts.author)}">`);
  const robots = opts.robots?.filter(Boolean) ?? [];
  if (robots.length)
    lines.push(`<meta name="robots" content="${escapeXml(robots.join(", "))}">`);
  return lines.join("\n");
}

export interface OpenGraphOptions {
  title: string;
  description: string;
  url: string;
  image: string;
  type?: string;
  siteName?: string;
  locale?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

export function buildOpenGraph(opts: OpenGraphOptions): string {
  const lines: string[] = [];
  const t = opts.twitterTitle || opts.title;
  const d = opts.twitterDescription || opts.description;
  const img = opts.twitterImage || opts.image;

  lines.push(`<meta property="og:title" content="${escapeXml(opts.title)}">`);
  lines.push(`<meta property="og:description" content="${escapeXml(opts.description)}">`);
  lines.push(`<meta property="og:url" content="${escapeXml(opts.url)}">`);
  lines.push(`<meta property="og:image" content="${escapeXml(opts.image)}">`);
  lines.push(`<meta property="og:type" content="${escapeXml(opts.type || "website")}">`);
  if (opts.siteName)
    lines.push(`<meta property="og:site_name" content="${escapeXml(opts.siteName)}">`);
  if (opts.locale)
    lines.push(`<meta property="og:locale" content="${escapeXml(opts.locale)}">`);

  lines.push(`<meta name="twitter:card" content="${escapeXml(opts.twitterCard || "summary_large_image")}">`);
  lines.push(`<meta name="twitter:title" content="${escapeXml(t)}">`);
  lines.push(`<meta name="twitter:description" content="${escapeXml(d)}">`);
  lines.push(`<meta name="twitter:image" content="${escapeXml(img)}">`);
  if (opts.twitterSite)
    lines.push(`<meta name="twitter:site" content="${escapeXml(opts.twitterSite)}">`);
  return lines.join("\n");
}

export interface RobotsOptions {
  groups: { agent: string; disallow: string[]; allow: string[] }[];
  sitemap?: string;
  crawlDelay?: number;
}

export function buildRobotsTxt(opts: RobotsOptions): string {
  const lines: string[] = [];
  opts.groups.forEach((g, i) => {
    if (i > 0) lines.push("");
    lines.push(`User-agent: ${g.agent || "*"}`);
    g.disallow.filter(Boolean).forEach((p) => lines.push(`Disallow: ${p}`));
    g.allow.filter(Boolean).forEach((p) => lines.push(`Allow: ${p}`));
  });
  if (opts.crawlDelay && opts.crawlDelay > 0) {
    lines.push("");
    lines.push(`Crawl-delay: ${Math.round(opts.crawlDelay)}`);
  }
  if (opts.sitemap) {
    lines.push("");
    lines.push(`Sitemap: ${opts.sitemap}`);
  }
  return lines.join("\n") + "\n";
}

export interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

export function buildSitemapXml(entries: SitemapEntry[]): string {
  const items = entries
    .map((e) => {
      const parts = [`  <url>`];
      parts.push(`    <loc>${escapeXml(e.loc)}</loc>`);
      if (e.lastmod) parts.push(`    <lastmod>${escapeXml(e.lastmod)}</lastmod>`);
      if (e.changefreq)
        parts.push(`    <changefreq>${escapeXml(e.changefreq)}</changefreq>`);
      if (e.priority) parts.push(`    <priority>${escapeXml(e.priority)}</priority>`);
      parts.push(`  </url>`);
      return parts.join("\n");
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`;
}

export interface AlternateRef {
  href: string;
  hreflang?: string;
  media?: string;
}

export function buildCanonicalTags(canonical: string, alternates: AlternateRef[] = []): string {
  const lines: string[] = [];
  if (canonical)
    lines.push(`<link rel="canonical" href="${escapeXml(canonical)}">`);
  alternates
    .filter((a) => a.href)
    .forEach((a) => {
      const attrs = [`rel="alternate"`, `href="${escapeXml(a.href)}"`];
      if (a.hreflang) attrs.push(`hreflang="${escapeXml(a.hreflang)}"`);
      if (a.media) attrs.push(`media="${escapeXml(a.media)}"`);
      lines.push(`<link ${attrs.join(" ")}>`);
    });
  return lines.join("\n");
}
