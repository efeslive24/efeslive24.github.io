import { describe, expect, it } from "vitest";
import {
  encodeBase64,
  decodeBase64,
  urlEncode,
  urlDecode,
  formatJson,
  minifyJson,
  sortJsonKeys,
  jsonStats,
  jsonToCsv,
  csvToJson,
  detectDelimiter,
  decodeJwt,
  hashText,
} from "@/lib/encoding";

describe("Base64", () => {
  it("Türkçe karakterlerle gidiş-dönüş çalışır", () => {
    const text = "Merhaba dünya ığüşöçİ 😀";
    expect(decodeBase64(encodeBase64(text))).toBe(text);
  });

  it("bilinen değer için doğru kodlar", () => {
    // "Merhaba" UTF-8 → TWVyaGFiYQ==
    expect(encodeBase64("Merhaba")).toBe("TWVyaGFiYQ==");
  });

  it("boşlukları yok sayarak çözer", () => {
    expect(decodeBase64("TWVy aGFi YQ==")).toBe("Merhaba");
  });
});

describe("URL kodlama", () => {
  it("gidiş-dönüş çalışır", () => {
    const s = "https://ornek.com/a b?x=ığüş&y=1";
    expect(urlDecode(urlEncode(s))).toBe(s);
  });
});

describe("JSON işlemleri", () => {
  it("formatJson girintili çıktı üretir", () => {
    const r = formatJson('{"a":1,"b":[2,3]}');
    expect(r.ok).toBe(true);
    expect(r.output).toBe('{\n  "a": 1,\n  "b": [\n    2,\n    3\n  ]\n}');
  });

  it("geçersiz JSON'da hata döndürür", () => {
    const r = formatJson('{"a":1,}');
    expect(r.ok).toBe(false);
    expect(r.error).toBeTruthy();
  });

  it("minifyJson tek satır üretir", () => {
    const r = minifyJson('{\n  "a": 1\n}');
    expect(r.output).toBe('{"a":1}');
  });

  it("sortJsonKeys anahtarları alfabetik sıralar", () => {
    const r = sortJsonKeys('{"b":1,"a":2}');
    expect(r.ok).toBe(true);
    expect(r.output).toContain('"a"');
    expect(r.output!.indexOf('"a"')).toBeLessThan(r.output!.indexOf('"b"'));
  });

  it("jsonStats anahtar ve derinlik sayar", () => {
    const stats = jsonStats('{"a":{"b":{"c":1}},"d":2}');
    expect(stats?.keys).toBe(4);
    expect(stats?.depth).toBe(3);
  });
});

describe("JSON ↔ CSV", () => {
  it("jsonToCsv başlık ve satır üretir", () => {
    const r = jsonToCsv('[{"ad":"Ali","yas":30},{"ad":"Ayşe","yas":25}]');
    expect(r.ok).toBe(true);
    const lines = r.output!.replace(/^\uFEFF/, "").split("\n");
    expect(lines[0]).toBe("ad,yas");
    expect(lines[1]).toBe("Ali,30");
    expect(lines).toHaveLength(3);
  });

  it("jsonToCsv iç içe nesneleri düzleştirir", () => {
    const r = jsonToCsv('[{"kullanici":{"ad":"Ali"}}]');
    expect(r.ok).toBe(true);
    expect(r.output).toContain("kullanici.ad");
  });

  it("jsonToCsv dizi olmayan girdiyi reddeder", () => {
    const r = jsonToCsv('{"a":1}');
    expect(r.ok).toBe(false);
  });

  it("csvToJson başlıklı CSV'yi nesnelere çevirir", () => {
    const r = csvToJson("ad,yas\nAli,30\nAyşe,25");
    expect(r.ok).toBe(true);
    const parsed = JSON.parse(r.output!);
    expect(parsed).toEqual([
      { ad: "Ali", yas: 30 },
      { ad: "Ayşe", yas: 25 },
    ]);
    expect(r.rowCount).toBe(2);
  });

  it("csvToJson tırnak içi ayraçları doğru işler", () => {
    const r = csvToJson('ad,not\n"Ali","Merhaba, dünya"');
    expect(r.ok).toBe(true);
    const parsed = JSON.parse(r.output!);
    expect(parsed[0].not).toBe("Merhaba, dünya");
  });

  it("detectDelimiter noktalı virgülü bulur", () => {
    expect(detectDelimiter("ad;yas\nAli;30")).toBe(";");
    expect(detectDelimiter("ad,yas\nAli,30")).toBe(",");
  });
});

describe("JWT", () => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" })).replace(/=+$/, "");
  const payload = btoa(JSON.stringify({ sub: "123", name: "Ali", exp: 4102444800 })).replace(/=+$/, "");

  it("header ve payload'u çözer", () => {
    const r = decodeJwt(`${header}.${payload}.sig`);
    expect(r.ok).toBe(true);
    expect(r.data?.header.alg).toBe("HS256");
    expect(r.data?.payload.name).toBe("Ali");
  });

  it("süresi dolmuş token'ı tespit eder", () => {
    const oldPayload = btoa(JSON.stringify({ exp: 1000000000 })).replace(/=+$/, "");
    const r = decodeJwt(`${header}.${oldPayload}.sig`);
    expect(r.data?.expired).toBe(true);
  });

  it("geçersiz token'ı reddeder", () => {
    expect(decodeJwt("abc.def").ok).toBe(false);
    expect(decodeJwt("a.b.c").ok).toBe(false);
  });
});

describe("hashText", () => {
  it("SHA-256 doğru özet üretir", async () => {
    // "abc" → ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad
    const hash = await hashText("abc", "SHA-256");
    expect(hash).toBe("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
  });

  it("MD5 doğru özet üretir", async () => {
    // "abc" → 900150983cd24fb0d6963f7d28e17f72
    const hash = await hashText("abc", "MD5");
    expect(hash).toBe("900150983cd24fb0d6963f7d28e17f72");
  });

  it("SHA-1 doğru özet üretir", async () => {
    // "abc" → a9993e364706816aba3e25717850c26c9cd0d89d
    const hash = await hashText("abc", "SHA-1");
    expect(hash).toBe("a9993e364706816aba3e25717850c26c9cd0d89d");
  });
});
