// QR içerik biçimleri (pure functions — test edilebilir)

export function buildUrlQr(url: string): string {
  let u = url.trim();
  if (u && !/^https?:\/\//i.test(u)) u = `https://${u}`;
  return u;
}

export function buildWifiQr(opts: {
  ssid: string;
  password?: string;
  encryption: "WPA" | "WEP" | "nopass";
  hidden?: boolean;
}): string {
  const fields = [
    `T:${opts.encryption === "nopass" ? "nopass" : opts.encryption}`,
    `S:${escapeWifiField(opts.ssid)}`,
  ];
  if (opts.encryption !== "nopass" && opts.password) {
    fields.push(`P:${escapeWifiField(opts.password)}`);
  }
  if (opts.hidden) fields.push("H:true");
  return `WIFI:${fields.join(";")};;`;
}

function escapeWifiField(value: string): string {
  return value.replace(/([\\;,:"'])/g, "\\$1");
}

export function buildWhatsappQr(opts: { phone: string; message?: string }): string {
  const digits = opts.phone.replace(/[^\d]/g, "");
  const message = opts.message?.trim();
  const params = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${params}`;
}

export function buildVCardQr(opts: {
  firstName: string;
  lastName?: string;
  phone?: string;
  email?: string;
  org?: string;
  title?: string;
  url?: string;
}): string {
  const lines = ["BEGIN:VCARD", "VERSION:3.0"];
  lines.push(`N:${opts.lastName ?? ""};${opts.firstName};;;`);
  lines.push(`FN:${[opts.firstName, opts.lastName].filter(Boolean).join(" ")}`);
  if (opts.phone) lines.push(`TEL;TYPE=CELL:${opts.phone}`);
  if (opts.email) lines.push(`EMAIL:${opts.email}`);
  if (opts.title) lines.push(`TITLE:${opts.title}`);
  if (opts.org) lines.push(`ORG:${opts.org}`);
  if (opts.url) lines.push(`URL:${opts.url}`);
  lines.push("END:VCARD");
  return lines.join("\n");
}

export function buildEmailQr(opts: { email: string; subject?: string; body?: string }): string {
  const params = new URLSearchParams();
  if (opts.subject) params.set("subject", opts.subject);
  if (opts.body) params.set("body", opts.body);
  const qs = params.toString();
  return `mailto:${opts.email}${qs ? `?${qs}` : ""}`;
}

export function buildSmsQr(opts: { phone: string; message?: string }): string {
  const digits = opts.phone.replace(/[^\d]/g, "");
  const message = opts.message?.trim();
  return message ? `SMSTO:${digits}:${message}` : `SMSTO:${digits}`;
}

const SOCIAL_TEMPLATES: Record<string, (handle: string) => string | null> = {
  instagram: (h) => `https://instagram.com/${h}`,
  x: (h) => `https://x.com/${h}`,
  twitter: (h) => `https://twitter.com/${h}`,
  tiktok: (h) => `https://tiktok.com/@${h}`,
  linkedin: (h) => `https://linkedin.com/in/${h}`,
  youtube: (h) => `https://youtube.com/@${h}`,
  facebook: (h) => `https://facebook.com/${h}`,
};

export function buildSocialQr(platform: string, handle: string): string {
  const trimmed = handle.trim().replace(/^@/, "");
  const builder = SOCIAL_TEMPLATES[platform];
  if (builder) {
    const url = builder(trimmed);
    if (url) return url;
  }
  return trimmed;
}
