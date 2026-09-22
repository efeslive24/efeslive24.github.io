export interface UtmOptions {
  url: string;
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

export function buildUtmUrl(opts: UtmOptions): string | null {
  let base = opts.url.trim();
  if (!base) return null;
  if (!/^https?:\/\//i.test(base)) base = `https://${base}`;

  let parsed: URL;
  try {
    parsed = new URL(base);
  } catch {
    return null;
  }

  const params: [string, string][] = [];
  if (opts.source) params.push(["utm_source", opts.source]);
  if (opts.medium) params.push(["utm_medium", opts.medium]);
  if (opts.campaign) params.push(["utm_campaign", opts.campaign]);
  if (opts.term) params.push(["utm_term", opts.term]);
  if (opts.content) params.push(["utm_content", opts.content]);
  params.forEach(([k, v]) => parsed.searchParams.set(k, v));

  return parsed.toString();
}

export function slugifyCustomAlias(alias: string): string {
  const trMap: Record<string, string> = {
    ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u",
  };
  return alias
    .trim()
    .toLocaleLowerCase("tr")
    .split("")
    .map((ch) => trMap[ch] ?? ch)
    .join("")
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

export function isValidUrl(input: string): boolean {
  try {
    const u = new URL(input);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}
