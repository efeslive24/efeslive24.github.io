const TR_MAP: Record<string, string> = {
  ç: "c",
  Ç: "c",
  ğ: "g",
  Ğ: "g",
  ı: "i",
  I: "i",
  İ: "i",
  ö: "o",
  Ö: "o",
  ş: "s",
  Ş: "s",
  ü: "u",
  Ü: "u",
};

export const TR_STOPWORDS = new Set([
  "ve", "ile", "icin", "bir", "bu", "su", "o", "da", "de", "mi", "mu",
  "cok", "daha", "en", "ne", "nasil", "olan", "ama", "fakat", "veya",
  "ya", "ki", "ise", "gibi", "kadar", "her", "bazi",
  "yeni", "guzel", "harika", "mukemmel", "basit", "hizli", "kolay",
]);

export function normalizeTr(text: string): string {
  return text
    .toLocaleLowerCase("tr")
    .split("")
    .map((ch) => TR_MAP[ch] ?? ch)
    .join("");
}

export function capitalize(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function wordsOf(text: string): string[] {
  return text
    .split(/[^a-zA-ZçğıöşüÇĞİÖŞÜ0-9]+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 1);
}

export function generateHashtags(input: string, count: number): string[] {
  const words = wordsOf(input)
    .map((w) => normalizeTr(w))
    .filter((w) => !TR_STOPWORDS.has(w));

  const tags: string[] = [];
  const seen = new Set<string>();

  const push = (word: string) => {
    const tag = capitalize(word);
    if (!seen.has(tag)) {
      seen.add(tag);
      tags.push(tag);
    }
  };

  words.forEach((w) => push(w));
  for (let i = 0; i < words.length - 1 && tags.length < count * 2; i++) {
    push(`${capitalize(words[i])}${capitalize(words[i + 1])}`);
  }

  return tags.slice(0, Math.max(1, Math.min(count, 50)));
}
