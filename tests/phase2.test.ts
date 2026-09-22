import { describe, it, expect } from "vitest";
import { convertUnit, UNIT_CATEGORIES } from "../src/lib/convert";
import {
  calcPercentage,
  calcPercentChange,
  calcRatio,
  calcDiscount,
  calcDiscountRate,
  calcVat,
  calcAge,
  dateDiff,
  addDays,
  calcFuel,
  calcTip,
} from "../src/lib/calc";
import {
  escapeXml,
  buildMetaTags,
  buildOpenGraph,
  buildRobotsTxt,
  buildSitemapXml,
  buildCanonicalTags,
} from "../src/lib/seo-text";
import { medianCutPalette, rgbToHex } from "../src/lib/palette";
import { buildIco, parseIco } from "../src/lib/ico";
import { generateHashtags, normalizeTr, capitalize } from "../src/lib/social";
import { buildUtmUrl, slugifyCustomAlias, isValidUrl } from "../src/lib/utm";

describe("convertUnit", () => {
  it("çevirir: uzunluk m -> km", () => {
    expect(convertUnit("length", 1000, "m", "km")).toBe(1);
  });

  it("çevirir: uzunluk inch -> cm", () => {
    expect(convertUnit("length", 1, "in", "cm")).toBeCloseTo(2.54, 6);
  });

  it("çevirir: ağırlık kg -> lb", () => {
    expect(convertUnit("weight", 1, "kg", "lb")).toBeCloseTo(2.2046226218, 6);
  });

  it("çevirir: sıcaklık C -> F", () => {
    expect(convertUnit("temperature", 0, "c", "f")).toBe(32);
    expect(convertUnit("temperature", 100, "c", "f")).toBe(212);
  });

  it("çevirir: sıcaklık F -> K", () => {
    expect(convertUnit("temperature", 32, "f", "k")).toBeCloseTo(273.15, 6);
  });

  it("çevirir: veri GB -> MB", () => {
    expect(convertUnit("data", 1, "gb", "mb")).toBe(1024);
  });

  it("çevirir: hız mph -> kmh", () => {
    expect(convertUnit("speed", 100, "mph", "kmh")).toBeCloseTo(160.9344, 4);
  });

  it("geçersiz kategori veya birim null döner", () => {
    expect(convertUnit("unknown", 5, "m", "km")).toBeNull();
    expect(convertUnit("length", 5, "xx", "km")).toBeNull();
    expect(convertUnit("length", NaN, "m", "km")).toBeNull();
  });

  it("tüm kategoriler en az 2 birim içerir", () => {
    UNIT_CATEGORIES.forEach((c) => expect(c.units.length).toBeGreaterThanOrEqual(2));
  });
});

describe("calc", () => {
  it("yüzde hesaplar", () => {
    expect(calcPercentage(200, 15)).toBe(30);
  });

  it("yüzde değişim hesaplar", () => {
    expect(calcPercentChange(100, 125)).toBe(25);
    expect(calcPercentChange(100, 75)).toBe(-25);
    expect(calcPercentChange(0, 10)).toBeNaN();
  });

  it("oran hesaplar", () => {
    expect(calcRatio(25, 200)).toBe(12.5);
    expect(calcRatio(5, 0)).toBeNaN();
  });

  it("indirim hesaplar", () => {
    const d = calcDiscount(250, 20);
    expect(d.final).toBe(200);
    expect(d.saved).toBe(50);
  });

  it("indirim oranını geri hesaplar", () => {
    expect(calcDiscountRate(250, 200)).toBe(20);
  });

  it("KDV hariç hesaplar", () => {
    const v = calcVat(100, 20, false);
    expect(v.net).toBe(100);
    expect(v.vat).toBe(20);
    expect(v.gross).toBe(120);
  });

  it("KDV dahil hesaplar", () => {
    const v = calcVat(120, 20, true);
    expect(v.net).toBe(100);
    expect(v.vat).toBeCloseTo(20, 6);
    expect(v.gross).toBe(120);
  });

  it("yaş hesaplar (artık yıl dahil)", () => {
    const age = calcAge(new Date(2000, 1, 29), new Date(2026, 8, 22));
    expect(age.years).toBe(26);
    expect(age.totalDays).toBeGreaterThan(9000);
    expect(age.nextAge).toBe(27);
    expect(age.nextBirthdayInDays).toBeGreaterThan(0);
  });

  it("yaş: doğum günü bugünse", () => {
    const age = calcAge(new Date(2000, 8, 22), new Date(2026, 8, 22));
    expect(age.years).toBe(26);
    expect(age.months).toBe(0);
    expect(age.days).toBe(0);
  });

  it("tarih farkı hesaplar", () => {
    const d = dateDiff(new Date(2026, 0, 1), new Date(2026, 0, 10));
    expect(d.totalDays).toBe(9);
    expect(d.weekdays).toBe(7); // 3, 4 ve 10 Ocak hafta sonu
  });

  it("tarih farkı sıra bağımsızdır", () => {
    const a = dateDiff(new Date(2026, 0, 10), new Date(2026, 0, 1));
    expect(a.totalDays).toBe(9);
  });

  it("ay/yıl farkı hesaplar", () => {
    const d = dateDiff(new Date(2024, 0, 15), new Date(2026, 2, 15));
    expect(d.years).toBe(2);
    expect(d.months).toBe(2);
    expect(d.days).toBe(0);
  });

  it("gün ekler", () => {
    const d = addDays(new Date(2026, 0, 30), 5);
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(1);
    expect(d.getDate()).toBe(4);
  });

  it("yakıt maliyeti hesaplar", () => {
    const f = calcFuel(500, 7, 45, 2);
    expect(f.liters).toBe(35);
    expect(f.cost).toBe(1575);
    expect(f.perPerson).toBe(787.5);
  });

  it("bahşiş hesaplar", () => {
    const t = calcTip(300, 10, 3);
    expect(t.tip).toBe(30);
    expect(t.total).toBe(330);
    expect(t.perPerson).toBe(110);
  });

  it("bahşiş yuvarlama", () => {
    const t = calcTip(300, 10, 3, true);
    expect(t.perPerson).toBe(110);
    expect(t.total).toBe(330);
    expect(t.tip).toBe(30);
  });
});

describe("seo-text", () => {
  it("XML kaçışı yapar", () => {
    expect(escapeXml(`<a href="x">&'`)).toBe("&lt;a href=&quot;x&quot;&gt;&amp;&apos;");
  });

  it("meta tag üretir", () => {
    const tags = buildMetaTags({
      title: "Başlık",
      description: "Açıklama",
      keywords: "a, b",
      robots: ["index", "follow"],
    });
    expect(tags).toContain("<title>Başlık</title>");
    expect(tags).toContain('<meta name="description" content="Açıklama">');
    expect(tags).toContain('<meta name="robots" content="index, follow">');
  });

  it("boş robots listesi robots etiketi üretmez", () => {
    const tags = buildMetaTags({ title: "T", description: "D" });
    expect(tags).not.toContain("robots");
  });

  it("open graph üretir", () => {
    const tags = buildOpenGraph({
      title: "T",
      description: "D",
      url: "https://example.com/a",
      image: "https://example.com/i.jpg",
      type: "article",
    });
    expect(tags).toContain('<meta property="og:type" content="article">');
    expect(tags).toContain('<meta name="twitter:card" content="summary_large_image">');
  });

  it("robots.txt üretir", () => {
    const txt = buildRobotsTxt({
      groups: [
        { agent: "*", disallow: ["/admin/"], allow: ["/admin/giris/"] },
        { agent: "Googlebot", disallow: [], allow: [] },
      ],
      sitemap: "https://example.com/sitemap.xml",
    });
    expect(txt).toContain("User-agent: *");
    expect(txt).toContain("Disallow: /admin/");
    expect(txt).toContain("Allow: /admin/giris/");
    expect(txt).toContain("User-agent: Googlebot");
    expect(txt).toContain("Sitemap: https://example.com/sitemap.xml");
  });

  it("sitemap XML üretir ve kaçış yapar", () => {
    const xml = buildSitemapXml([
      { loc: "https://example.com/a?x=1&y=2", lastmod: "2026-01-01", changefreq: "weekly", priority: "0.8" },
    ]);
    expect(xml).toContain("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
    expect(xml).toContain("<loc>https://example.com/a?x=1&amp;y=2</loc>");
    expect(xml).toContain("<changefreq>weekly</changefreq>");
  });

  it("canonical etiketi üretir", () => {
    const tags = buildCanonicalTags("https://example.com/sayfa", [
      { href: "https://example.com/sayfa?mobil=1", media: "only screen and (max-width: 640px)" },
    ]);
    expect(tags).toContain('<link rel="canonical" href="https://example.com/sayfa">');
    expect(tags).toContain('media="only screen and (max-width: 640px)"');
  });
});

describe("palette", () => {
  const makePixels = (colors: [number, number, number][]) => {
    const arr = new Uint8ClampedArray(colors.length * 4);
    colors.forEach(([r, g, b], i) => {
      arr[i * 4] = r;
      arr[i * 4 + 1] = g;
      arr[i * 4 + 2] = b;
      arr[i * 4 + 3] = 255;
    });
    return arr;
  };

  it("tek renkli görsel tek renk döner", () => {
    const px = makePixels([[10, 20, 30], [10, 20, 30], [10, 20, 30]]);
    const palette = medianCutPalette(px, 5);
    expect(palette).toHaveLength(1);
    expect(palette[0]).toEqual({ r: 10, g: 20, b: 30 });
  });

  it("iki baskın renkli görsel 2 renk döner", () => {
    const px = makePixels([
      [255, 0, 0], [255, 0, 0], [255, 0, 0], [255, 0, 0],
      [0, 0, 255], [0, 0, 255], [0, 0, 255], [0, 0, 255],
    ]);
    const palette = medianCutPalette(px, 2);
    expect(palette).toHaveLength(2);
    expect(palette.some((c) => c.r > 200 && c.b < 50)).toBe(true);
    expect(palette.some((c) => c.b > 200 && c.r < 50)).toBe(true);
  });

  it("boş piksel boş palet döner", () => {
    expect(medianCutPalette(new Uint8ClampedArray(0), 5)).toEqual([]);
  });

  it("hex dönüşümü", () => {
    expect(rgbToHex({ r: 255, g: 10, b: 0 })).toBe("#FF0A00");
  });
});

describe("ico", () => {
  it("geçerli ICO üretir", () => {
    const png = new Uint8Array([137, 80, 78, 71, 1, 2, 3]);
    const ico = buildIco([
      { width: 16, height: 16, data: png },
      { width: 32, height: 32, data: png },
    ]);
    expect(parseIco(ico)).toBe(2);
    // başlık: reserved=0, type=1
    expect(ico[0]).toBe(0);
    expect(ico[1]).toBe(0);
    expect(ico[2]).toBe(1);
    expect(ico[3]).toBe(0);
    // ilk entry: genişlik/yükseklik
    expect(ico[6]).toBe(16);
    expect(ico[7]).toBe(16);
  });

  it("256px boyutu 0 olarak kodlar", () => {
    const ico = buildIco([{ width: 256, height: 256, data: new Uint8Array(5) }]);
    expect(ico[6]).toBe(0);
    expect(ico[7]).toBe(0);
  });

  it("geçersiz ICO -1 döner", () => {
    expect(parseIco(new Uint8Array([1, 2, 3, 4, 5, 6]))).toBe(-1);
  });
});

describe("social", () => {
  it("Türkçe karakterleri normalize eder", () => {
    expect(normalizeTr("ÇİĞÖŞÜ çığöşü İstanbul")).toBe("cigosu cigosu istanbul");
  });

  it("büyük harfe çevirir", () => {
    expect(capitalize("istanbul")).toBe("Istanbul");
  });

  it("hashtag üretir ve stopword'leri filtreler", () => {
    const tags = generateHashtags("İstanbul'da güzel bir tatil ve yemek", 6);
    expect(tags.length).toBeGreaterThan(0);
    expect(tags.length).toBeLessThanOrEqual(6);
    tags.forEach((t) => {
      expect(t.startsWith("#") === false).toBe(true); // # işareti bileşende eklenir
      expect(t).not.toContain(" ");
    });
    expect(tags).toContain("Istanbul");
    expect(tags).not.toContain("Bir");
    expect(tags).not.toContain("Ve");
  });

  it("istenen sayıdan fazla üretmez", () => {
    const tags = generateHashtags("sosyal medya pazarlama stratejisi örnekleri", 3);
    expect(tags.length).toBeLessThanOrEqual(3);
  });

  it("ikili kombinasyon üretir", () => {
    const tags = generateHashtags("sosyal medya", 5);
    expect(tags).toContain("SosyalMedya");
  });
});

describe("utm", () => {
  it("UTM parametreleri ekler", () => {
    const url = buildUtmUrl({
      url: "https://example.com/sayfa?x=1",
      source: "twitter",
      medium: "social",
      campaign: "bahar2026",
      term: "indirim",
      content: "banner",
    });
    expect(url).toBe(
      "https://example.com/sayfa?x=1&utm_source=twitter&utm_medium=social&utm_campaign=bahar2026&utm_term=indirim&utm_content=banner"
    );
  });

  it("şemasız URL'ye https ekler", () => {
    const url = buildUtmUrl({ url: "example.com", source: "x", medium: "y", campaign: "z" });
    expect(url).toBe("https://example.com/?utm_source=x&utm_medium=y&utm_campaign=z");
  });

  it("boş URL null döner", () => {
    expect(buildUtmUrl({ url: "  " })).toBeNull();
  });

  it("geçersiz URL null döner", () => {
    expect(buildUtmUrl({ url: "ht tp://bozuk" })).toBeNull();
  });

  it("alias sadeleştirir", () => {
    expect(slugifyCustomAlias("  Büyük Kampanya!  ")).toBe("buyuk-kampanya");
    expect(slugifyCustomAlias("a--b")).toBe("a-b");
  });

  it("URL doğrular", () => {
    expect(isValidUrl("https://example.com")).toBe(true);
    expect(isValidUrl("ftp://example.com")).toBe(false);
    expect(isValidUrl("example.com")).toBe(false);
  });
});
