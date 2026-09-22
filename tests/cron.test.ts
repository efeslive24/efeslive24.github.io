import { describe, expect, it } from "vitest";
import { buildCron, parseCron, nextRuns } from "@/lib/cron";

describe("buildCron", () => {
  it("beş alanlı ifade üretir", () => {
    expect(
      buildCron({ minute: "0", hour: "3", dayOfMonth: "*", month: "*", dayOfWeek: "*" })
    ).toBe("0 3 * * *");
  });
});

describe("parseCron", () => {
  it("geçerli ifadeyi kabul eder", () => {
    expect(parseCron("0 3 * * *").ok).toBe(true);
    expect(parseCron("*/15 9-17 * * 1-5").ok).toBe(true);
    expect(parseCron("0,30 0,12 * * 0").ok).toBe(true);
  });

  it("eksik alanı reddeder", () => {
    const r = parseCron("0 3 * *");
    expect(r.ok).toBe(false);
    expect(r.error).toContain("5 alan");
  });

  it("aralık dışı değeri reddeder", () => {
    expect(parseCron("60 * * * *").ok).toBe(false);
    expect(parseCron("* 24 * * *").ok).toBe(false);
  });
});

describe("nextRuns", () => {
  it("günlük zamanlama için ardışık günler döndürür", () => {
    const from = new Date(2026, 0, 1, 10, 0, 0); // 1 Oca 2026 10:00
    const runs = nextRuns("0 3 * * *", 3, from);
    expect(runs).toHaveLength(3);
    expect(runs[0].getHours()).toBe(3);
    expect(runs[0].getDate()).toBe(2); // ertesi gün 03:00
    expect(runs[1].getDate()).toBe(3);
  });

  it("her dakika ifadesi 60 saniye arayla üretir", () => {
    const from = new Date(2026, 0, 1, 10, 0, 30);
    const runs = nextRuns("* * * * *", 3, from);
    expect(runs).toHaveLength(3);
    expect(runs[0].getMinutes()).toBe(1);
    expect(runs[1].getMinutes()).toBe(2);
    expect(runs[2].getMinutes()).toBe(3);
  });

  it("hafta içi zamanlaması hafta sonunu atlar", () => {
    // 2 Oca 2026 Cuma'dan başlayarak: sonraki çalışma 5 Oca Pazartesi
    const from = new Date(2026, 0, 2, 10, 0, 0); // Cuma
    const runs = nextRuns("0 9 * * 1-5", 2, from);
    expect(runs[0].getDay()).toBe(1); // Pazartesi
    expect(runs[0].getDate()).toBe(5);
  });

  it("geçersiz ifade için boş dizi döndürür", () => {
    expect(nextRuns("geçersiz", 5)).toEqual([]);
  });
});
