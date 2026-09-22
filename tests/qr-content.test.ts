import { describe, expect, it } from "vitest";
import {
  buildUrlQr,
  buildWifiQr,
  buildWhatsappQr,
  buildVCardQr,
  buildEmailQr,
  buildSmsQr,
  buildSocialQr,
} from "@/lib/qr-content";

describe("buildUrlQr", () => {
  it("protokolsüz URL'ye https ekler", () => {
    expect(buildUrlQr("ornek.com")).toBe("https://ornek.com");
  });

  it("mevcut protokolü korur", () => {
    expect(buildUrlQr("http://ornek.com")).toBe("http://ornek.com");
    expect(buildUrlQr("https://ornek.com")).toBe("https://ornek.com");
  });
});

describe("buildWifiQr", () => {
  it("WPA şifreli ağ üretir", () => {
    const qr = buildWifiQr({ ssid: "EvWiFi", password: "sifre123", encryption: "WPA" });
    expect(qr).toBe("WIFI:T:WPA;S:EvWiFi;P:sifre123;;");
  });

  it("şifresiz ağ üretir", () => {
    const qr = buildWifiQr({ ssid: "Misafir", encryption: "nopass" });
    expect(qr).toBe("WIFI:T:nopass;S:Misafir;;");
  });

  it("özel karakterleri kaçışlar", () => {
    const qr = buildWifiQr({ ssid: "A;B", password: "p:w", encryption: "WPA" });
    expect(qr).toBe("WIFI:T:WPA;S:A\\;B;P:p\\:w;;");
  });

  it("gizli ağ işaretini ekler", () => {
    const qr = buildWifiQr({ ssid: "Gizli", encryption: "WPA", hidden: true });
    expect(qr).toContain("H:true");
  });
});

describe("buildWhatsappQr", () => {
  it("numarayı sadeleştirir ve wa.me bağlantısı üretir", () => {
    expect(buildWhatsappQr({ phone: "+90 555 123 45 67" })).toBe(
      "https://wa.me/905551234567"
    );
  });

  it("mesajı URL-kodlar", () => {
    expect(buildWhatsappQr({ phone: "905551234567", message: "Merhaba dünya" })).toBe(
      "https://wa.me/905551234567?text=Merhaba%20d%C3%BCnya"
    );
  });
});

describe("buildVCardQr", () => {
  it("vCard 3.0 formatı üretir", () => {
    const vcard = buildVCardQr({
      firstName: "Ali",
      lastName: "Yılmaz",
      phone: "+905551234567",
      email: "ali@ornek.com",
    });
    expect(vcard).toContain("BEGIN:VCARD");
    expect(vcard).toContain("VERSION:3.0");
    expect(vcard).toContain("N:Yılmaz;Ali;;;");
    expect(vcard).toContain("FN:Ali Yılmaz");
    expect(vcard).toContain("TEL;TYPE=CELL:+905551234567");
    expect(vcard).toContain("EMAIL:ali@ornek.com");
    expect(vcard).toContain("END:VCARD");
  });
});

describe("buildEmailQr", () => {
  it("yalnız adres içeren mailto üretir", () => {
    expect(buildEmailQr({ email: "ali@ornek.com" })).toBe("mailto:ali@ornek.com");
  });

  it("konu ve gövdeyi kodlar", () => {
    const qr = buildEmailQr({ email: "ali@ornek.com", subject: "Merhaba dünya" });
    expect(qr).toBe("mailto:ali@ornek.com?subject=Merhaba+d%C3%BCnya");
  });
});

describe("buildSmsQr", () => {
  it("yalnız numara üretir", () => {
    expect(buildSmsQr({ phone: "+90 555" })).toBe("SMSTO:90555");
  });

  it("mesajlı SMSTO üretir", () => {
    expect(buildSmsQr({ phone: "90555", message: "KATIL" })).toBe("SMSTO:90555:KATIL");
  });
});

describe("buildSocialQr", () => {
  it("platform şablonlarını uygular", () => {
    expect(buildSocialQr("instagram", "@kullanici")).toBe("https://instagram.com/kullanici");
    expect(buildSocialQr("x", "kullanici")).toBe("https://x.com/kullanici");
    expect(buildSocialQr("tiktok", "@kullanici")).toBe("https://tiktok.com/@kullanici");
    expect(buildSocialQr("linkedin", "ali-yilmaz")).toBe("https://linkedin.com/in/ali-yilmaz");
    expect(buildSocialQr("youtube", "@kanal")).toBe("https://youtube.com/@kanal");
  });

  it("bilinmeyen platformda girişi aynen döndürür", () => {
    expect(buildSocialQr("bilinmeyen", "@x")).toBe("x");
  });
});
