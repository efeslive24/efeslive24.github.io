import { describe, expect, it } from "vitest";
import {
  countStats,
  convertCase,
  cleanText,
  removeDuplicateLines,
  sortLines,
  trToLower,
  trToUpper,
  loremIpsum,
} from "@/lib/text";

describe("countStats", () => {
  it("boş metinde sıfır döndürür", () => {
    const s = countStats("");
    expect(s.words).toBe(0);
    expect(s.chars).toBe(0);
    expect(s.lines).toBe(0);
  });

  it("kelime, karakter ve satır sayar", () => {
    const s = countStats("Merhaba dünya\nNasılsın?");
    expect(s.words).toBe(3);
    expect(s.lines).toBe(2);
    expect(s.charsNoSpaces).toBe("MerhabadünyaNasılsın?".length);
    expect(s.sentences).toBe(1);
  });

  it("boşlukları yalnızca kelime ayırıcı sayar", () => {
    const s = countStats("   a   b   c   ");
    expect(s.words).toBe(3);
  });
});

describe("Türkçe harf dönüşümleri", () => {
  it("trToUpper: ı → I, i → İ", () => {
    expect(trToUpper("ışık ilik")).toBe("IŞIK İLİK");
  });

  it("trToLower: I → ı, İ → i", () => {
    expect(trToLower("IŞIK İLİK")).toBe("ışık ilik");
  });

  it("convertCase title: her kelime doğru büyür", () => {
    expect(convertCase("istanbul ankara İZMİR", "title")).toBe("İstanbul Ankara İzmir");
  });

  it("convertCase camelCase ve snake_case", () => {
    expect(convertCase("Merhaba Dünya", "camel")).toBe("merhabaDünya");
    expect(convertCase("Merhaba Dünya", "snake")).toBe("merhaba_dünya");
    expect(convertCase("merhaba-dunya", "pascal")).toBe("MerhabaDunya");
    expect(convertCase("Merhaba Dünya", "kebab")).toBe("merhaba-dünya");
  });
});

describe("cleanText", () => {
  const opts = {
    collapseSpaces: true,
    trimLines: true,
    removeEmptyLines: true,
    removeTabs: true,
    stripHtml: false,
  };

  it("fazla boşlukları tek boşluğa indirir", () => {
    expect(cleanText("a    b\t\t c", opts)).toBe("a b c");
  });

  it("satır başı/sonu boşluklarını temizler", () => {
    expect(cleanText("  satır  \n  diğer  ", opts)).toBe("satır\ndiğer");
  });

  it("fazla boş satırları tek boş satıra indirir (paragraf yapısı korunur)", () => {
    expect(cleanText("a\n\n\n\nb", opts)).toBe("a\n\nb");
  });

  it("HTML etiketlerini kaldırır", () => {
    expect(
      cleanText('<p>Merhaba <b>dünya</b></p><script>alert(1)</script>', {
        ...opts,
        stripHtml: true,
      })
    ).toBe("Merhaba dünya");
  });
});

describe("removeDuplicateLines", () => {
  it("yinelenen satırları kaldırır ve sayar", () => {
    const { unique, removedCount } = removeDuplicateLines("elma\narmut\nelma\nüzüm\narmut", {
      caseSensitive: false,
      ignoreWhitespace: true,
    });
    expect(unique).toEqual(["elma", "armut", "üzüm"]);
    expect(removedCount).toBe(2);
  });

  it("büyük/küçük harf duyarlılığı çalışır", () => {
    const caseSensitive = removeDuplicateLines("Ali\nali", {
      caseSensitive: true,
      ignoreWhitespace: true,
    });
    expect(caseSensitive.removedCount).toBe(0);
    const caseInsensitive = removeDuplicateLines("Ali\nali", {
      caseSensitive: false,
      ignoreWhitespace: true,
    });
    expect(caseInsensitive.removedCount).toBe(1);
  });
});

describe("sortLines", () => {
  it("Türkçe alfabetik sıralar", () => {
    expect(sortLines("çilek\nelma\narmut", "alpha")).toEqual(["armut", "çilek", "elma"]);
  });

  it("sayısal sıralar (9 < 10)", () => {
    expect(sortLines("10\n9\n2", "numeric")).toEqual(["2", "9", "10"]);
    expect(sortLines("10\n9\n2", "numeric-desc")).toEqual(["10", "9", "2"]);
  });

  it("uzunluğa göre sıralar", () => {
    expect(sortLines("aaaa\na\naa", "length")).toEqual(["a", "aa", "aaaa"]);
  });
});

describe("loremIpsum", () => {
  it("istenen sayıda paragraf üretir", () => {
    const text = loremIpsum("paragraphs", 3);
    expect(text.split("\n\n")).toHaveLength(3);
  });

  it("istenen sayıda kelime üretir", () => {
    const words = loremIpsum("words", 25).split(" ");
    expect(words).toHaveLength(25);
  });

  it("sınırları uygular (1-1000)", () => {
    expect(loremIpsum("words", 0).split(" ")).toHaveLength(1);
    expect(loremIpsum("words", 99999).split(" ")).toHaveLength(1000);
  });
});
