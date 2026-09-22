export interface TextStats {
  chars: number;
  charsNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTimeMin: number;
}

export function countStats(text: string): TextStats {
  const trimmed = text.trim();
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const sentences = trimmed
    ? (trimmed.match(/[.!?…]+(\s|$)/g) ?? []).length
    : 0;
  const paragraphs = trimmed
    ? trimmed.split(/\n\s*\n/).filter((p) => p.trim()).length
    : 0;
  const lines = trimmed ? trimmed.split("\n").length : 0;
  const readingTimeMin = Math.max(1, Math.ceil(words / 200));
  return { chars, charsNoSpaces, words, sentences, paragraphs, lines, readingTimeMin };
}

const TR_UPPER: Record<string, string> = {
  i: "İ",
  ı: "I",
  ç: "Ç",
  ğ: "Ğ",
  ö: "Ö",
  ş: "Ş",
  ü: "Ü",
};
const TR_LOWER: Record<string, string> = {
  I: "ı",
  İ: "i",
  Ç: "ç",
  Ğ: "ğ",
  Ö: "ö",
  Ş: "ş",
  Ü: "ü",
};

function mapChars(s: string, map: Record<string, string>): string {
  return s.replace(/[iıçğöşüIİÇĞÖŞÜ]/g, (c) => map[c] ?? c);
}

export function trToLower(s: string): string {
  return mapChars(s, TR_LOWER).toLowerCase();
}

export function trToUpper(s: string): string {
  return mapChars(s, TR_UPPER).toUpperCase();
}

function trCapitalize(word: string): string {
  if (!word) return word;
  return trToUpper(word[0]) + trToLower(word.slice(1));
}

export type CaseType =
  | "upper"
  | "lower"
  | "title"
  | "sentence"
  | "camel"
  | "pascal"
  | "snake"
  | "kebab";

export function convertCase(text: string, type: CaseType): string {
  switch (type) {
    case "upper":
      return trToUpper(text);
    case "lower":
      return trToLower(text);
    case "title":
      return text
        .split(/\s+/)
        .filter(Boolean)
        .map((w) => trCapitalize(w))
        .join(" ");
    case "sentence":
      return text
        .split(/(?<=[.!?…])\s+/)
        .map((s) => trCapitalize(s.trim()))
        .join(" ");
    case "camel": {
      const words = text.split(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ]+/).filter(Boolean);
      return words
        .map((w, i) => (i === 0 ? trToLower(w) : trCapitalize(w)))
        .join("");
    }
    case "pascal": {
      const words = text.split(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ]+/).filter(Boolean);
      return words.map((w) => trCapitalize(w)).join("");
    }
    case "snake":
      return text
        .split(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ]+/)
        .filter(Boolean)
        .map((w) => trToLower(w))
        .join("_");
    case "kebab":
      return text
        .split(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ]+/)
        .filter(Boolean)
        .map((w) => trToLower(w))
        .join("-");
  }
}

export interface CleanOptions {
  collapseSpaces: boolean;
  trimLines: boolean;
  removeEmptyLines: boolean;
  removeTabs: boolean;
  stripHtml: boolean;
  removeNonLatin?: boolean;
}

export const DEFAULT_CLEAN_OPTIONS: CleanOptions = {
  collapseSpaces: true,
  trimLines: true,
  removeEmptyLines: true,
  removeTabs: true,
  stripHtml: false,
};

export function cleanText(text: string, opts: CleanOptions): string {
  let result = text;
  if (opts.stripHtml) {
    result = result.replace(/<style[\s\S]*?<\/style>/gi, " ");
    result = result.replace(/<script[\s\S]*?<\/script>/gi, " ");
    result = result.replace(/<[^>]+>/g, " ");
    result = result
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  }
  if (opts.removeTabs) {
    result = result.replace(/\t+/g, " ");
  }
  if (opts.collapseSpaces) {
    result = result.replace(/[ \t]+/g, " ");
  }
  if (opts.trimLines) {
    result = result
      .split("\n")
      .map((l) => l.trim())
      .join("\n");
  }
  if (opts.removeEmptyLines) {
    result = result.replace(/\n{3,}/g, "\n\n");
    result = result.replace(/^\n+|\n+$/g, "");
  }
  return result;
}

export function removeDuplicateLines(
  text: string,
  opts: { caseSensitive: boolean; ignoreWhitespace: boolean }
): { unique: string[]; removedCount: number } {
  const seen = new Set<string>();
  const unique: string[] = [];
  let removedCount = 0;
  for (const raw of text.split("\n")) {
    let key = opts.ignoreWhitespace ? raw.trim() : raw;
    if (!opts.caseSensitive) key = key.toLocaleLowerCase("tr");
    if (seen.has(key)) {
      removedCount++;
    } else {
      seen.add(key);
      unique.push(raw);
    }
  }
  return { unique, removedCount };
}

export type SortMode = "alpha" | "alpha-desc" | "numeric" | "numeric-desc" | "length" | "length-desc";

export function sortLines(text: string, mode: SortMode): string[] {
  const lines = text.split("\n");
  const trCompare = new Intl.Collator("tr", { numeric: true, sensitivity: "base" });
  switch (mode) {
    case "alpha":
      return lines.sort((a, b) => trCompare.compare(a, b));
    case "alpha-desc":
      return lines.sort((a, b) => trCompare.compare(b, a));
    case "numeric":
      return lines.sort(
        (a, b) => (parseFloat(a.replace(",", ".")) || 0) - (parseFloat(b.replace(",", ".")) || 0)
      );
    case "numeric-desc":
      return lines.sort(
        (a, b) => (parseFloat(b.replace(",", ".")) || 0) - (parseFloat(a.replace(",", ".")) || 0)
      );
    case "length":
      return lines.sort((a, b) => a.length - b.length);
    case "length-desc":
      return lines.sort((a, b) => b.length - a.length);
  }
}

const LOREM_WORDS =
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(
    " "
  );

export function loremSentence(): string {
  const count = 6 + Math.floor(Math.random() * 10);
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
  }
  return words.join(" ") + ".";
}

export function loremIpsum(unit: "paragraphs" | "sentences" | "words", count: number): string {
  const n = Math.min(Math.max(count, 1), 1000);
  if (unit === "words") {
    const words: string[] = [];
    for (let i = 0; i < n; i++) {
      words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
    }
    return words.join(" ");
  }
  if (unit === "sentences") {
    return Array.from({ length: n }, () => loremSentence()).join(" ");
  }
  return Array.from({ length: n }, () => {
    const sentenceCount = 3 + Math.floor(Math.random() * 4);
    return Array.from({ length: sentenceCount }, () => loremSentence()).join(" ");
  }).join("\n\n");
}
