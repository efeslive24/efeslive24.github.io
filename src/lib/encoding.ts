import md5 from "blueimp-md5";

// UTF-8 güvenli Base64
export function encodeBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

export function decodeBase64(encoded: string): string {
  const cleaned = encoded.replace(/\s/g, "");
  const binary = atob(cleaned);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}

export function urlEncode(text: string): string {
  return encodeURIComponent(text);
}

export function urlDecode(text: string): string {
  return decodeURIComponent(text);
}

// Base64'ü URL-güvenli varyanta çevir (JWT için)
export function base64UrlDecode(segment: string): string {
  let b64 = segment.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4 !== 0) b64 += "=";
  const binary = atob(b64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}

export interface JsonFormatResult {
  ok: boolean;
  output: string;
  error?: string;
}

export function formatJson(input: string, indent = 2): JsonFormatResult {
  try {
    const parsed = JSON.parse(input);
    return { ok: true, output: JSON.stringify(parsed, null, indent) };
  } catch (e) {
    return { ok: false, error: (e as Error).message, output: "" };
  }
}

export function minifyJson(input: string): JsonFormatResult {
  try {
    const parsed = JSON.parse(input);
    return { ok: true, output: JSON.stringify(parsed) };
  } catch (e) {
    return { ok: false, error: (e as Error).message, output: "" };
  }
}

export function sortJsonKeys(input: string, indent = 2): JsonFormatResult {
  try {
    const sortDeep = (v: unknown): unknown => {
      if (Array.isArray(v)) return v.map(sortDeep);
      if (v && typeof v === "object") {
        const entries = Object.entries(v as Record<string, unknown>).sort(([a], [b]) =>
          a.localeCompare(b)
        );
        return Object.fromEntries(entries.map(([k, val]) => [k, sortDeep(val)]));
      }
      return v;
    };
    const parsed = sortDeep(JSON.parse(input));
    return { ok: true, output: JSON.stringify(parsed, null, indent) };
  } catch (e) {
    return { ok: false, error: (e as Error).message, output: "" };
  }
}

export interface JsonStats {
  keys: number;
  depth: number;
  sizeBytes: number;
}

export function jsonStats(input: string): JsonStats | null {
  try {
    const parsed = JSON.parse(input);
    let keys = 0;
    let maxDepth = 0;
    const walk = (v: unknown, depth: number) => {
      maxDepth = Math.max(maxDepth, depth);
      if (Array.isArray(v)) v.forEach((item) => walk(item, depth + 1));
      else if (v && typeof v === "object") {
        Object.entries(v).forEach(([, val]) => {
          keys++;
          walk(val, depth + 1);
        });
      }
    };
    walk(parsed, 0);
    return { keys, depth: maxDepth, sizeBytes: new Blob([input]).size };
  } catch {
    return null;
  }
}

function flattenObject(obj: Record<string, unknown>, prefix = ""): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value as Record<string, unknown>, path));
    } else if (Array.isArray(value)) {
      result[path] = JSON.stringify(value);
    } else {
      result[path] = value;
    }
  }
  return result;
}

export function jsonToCsv(input: string, delimiter = ","): { ok: boolean; output?: string; error?: string } {
  try {
    const parsed = JSON.parse(input);
    if (!Array.isArray(parsed) || parsed.length === 0 || typeof parsed[0] !== "object") {
      return { ok: false, error: "Girdi, nesnelerden oluşan bir JSON dizisi olmalıdır (örn. [{...}, {...}])." };
    }
    const flat = parsed.map((row) => flattenObject(row as Record<string, unknown>));
    const headers = Array.from(new Set(flat.flatMap((row) => Object.keys(row))));
    const escape = (v: unknown): string => {
      const s = v === null || v === undefined ? "" : String(v);
      if (s.includes(delimiter) || s.includes('"') || s.includes("\n")) {
        return `"${s.replace(/"/g, '""')}"`;
      }
      return s;
    };
    const lines = [
      headers.map(escape).join(delimiter),
      ...flat.map((row) => headers.map((h) => escape(row[h] ?? "")).join(delimiter)),
    ];
    return { ok: true, output: "\uFEFF" + lines.join("\n") };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export interface CsvParseResult {
  ok: boolean;
  output?: string;
  error?: string;
  rowCount?: number;
}

export function csvToJson(
  input: string,
  opts: { delimiter?: string; hasHeader: boolean; parseNumbers: boolean } = {
    hasHeader: true,
    parseNumbers: true,
  }
): CsvParseResult {
  try {
    const delimiter = opts.delimiter ?? detectDelimiter(input);
    const parseLine = (line: string): string[] => {
      const cells: string[] = [];
      let current = "";
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (inQuotes) {
          if (ch === '"') {
            if (line[i + 1] === '"') {
              current += '"';
              i++;
            } else inQuotes = false;
          } else current += ch;
        } else if (ch === '"') {
          inQuotes = true;
        } else if (ch === delimiter) {
          cells.push(current);
          current = "";
        } else {
          current += ch;
        }
      }
      cells.push(current);
      return cells;
    };

    const lines = input.replace(/^\uFEFF/, "").split(/\r?\n/).filter((l) => l.trim() !== "");
    if (lines.length === 0) return { ok: false, error: "Boş girdi." };

    const rows = lines.map(parseLine);
    const headers = opts.hasHeader ? rows[0] : rows[0].map((_, i) => `column_${i + 1}`);
    const dataRows = opts.hasHeader ? rows.slice(1) : rows;
    const normalize = (v: string): string => v.trim();
    const toValue = (v: string): string | number | boolean | null => {
      const s = normalize(v);
      if (!opts.parseNumbers) return s;
      if (s === "") return null;
      if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
      if (s === "true") return true;
      if (s === "false") return false;
      return s;
    };
    const objects = dataRows.map((row) => {
      const obj: Record<string, string | number | boolean | null> = {};
      headers.forEach((header, i) => {
        const key = normalize(header);
        if (key) obj[key] = toValue(row[i] ?? "");
      });
      return obj;
    });
    return { ok: true, output: JSON.stringify(objects, null, 2), rowCount: objects.length };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export function detectDelimiter(input: string): string {
  const firstLine = input.split(/\r?\n/)[0] ?? "";
  const counts: Record<string, number> = { ",": 0, ";": 0, "\t": 0, "|": 0 };
  for (const ch of firstLine) {
    if (ch in counts) counts[ch]++;
  }
  return (Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[1] ?? 0) > 0
    ? (Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? ",")
    : ",";
}

export interface JwtDecoded {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  expired: boolean;
  expiresAt?: string;
}

export function decodeJwt(token: string): { ok: boolean; data?: JwtDecoded; error?: string } {
  const parts = token.trim().split(".");
  if (parts.length !== 3) {
    return { ok: false, error: "Geçersiz JWT: token üç bölümden (header.payload.signature) oluşmalıdır." };
  }
  try {
    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    const exp = typeof payload.exp === "number" ? payload.exp * 1000 : null;
    const expired = exp !== null && Date.now() > exp;
    return {
      ok: true,
      data: {
        header,
        payload,
        signature: parts[2],
        expired,
        expiresAt: exp ? new Date(exp).toISOString() : undefined,
      },
    };
  } catch {
    return { ok: false, error: "Geçersiz JWT: bölümler doğru Base64 ile kodlanmamış." };
  }
}

export type HashAlgo = "MD5" | "SHA-1" | "SHA-256" | "SHA-512";

export async function hashText(text: string, algo: HashAlgo): Promise<string> {
  if (algo === "MD5") return md5(text);
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest(algo.replace("-", "-"), data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
