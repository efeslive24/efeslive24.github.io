# Free Online Tools — Ücretsiz Çevrimiçi Araçlar

Türkçe, reklamsız-önyüklemeli, **65 araçlık** ücretsiz çevrimiçi araç platformu. Tüm araçlar tarayıcıda çalışır; girdiğiniz metinler ve dosyalar **cihazınızdan çıkmaz** (sunucuya yüklenmez).

## Araçlar

| Kategori | Araç sayısı | Örnekler |
|---|---|---|
| QR Kod | 8 | QR oluşturucu, Wi-Fi QR, WhatsApp QR, vCard QR |
| Link | 5 | URL kısaltıcı*, yönlendirme kontrolü*, UTM oluşturucu, URL kodlayıcı/çözücü |
| PDF | 8 | Birleştir, böl, sıkıştır, döndür, metadata, JPG'ye çevir, JPG'den PDF |
| Görsel | 10 | Sıkıştır, yeniden boyutlandır, dönüştür, kırp, aynala, renk paleti, favicon |
| Metin | 8 | Kelime sayacı, büyük/küçük harf, kopya tespiti, sıralama, etiket üretici |
| Geliştirici | 12 | JSON formatlayıcı, regex test, base64, hash, cron ifade, zaman damgası |
| SEO | 5 | Meta etiket, Open Graph, robots.txt, sitemap, canonical üretici |
| Hesap | 8 | Yüzde, indirim, KDV, yaş, tarih farkı, birim çevirici, yakıt, bahşiş |
| Sosyal Medya | 2 | Hashtag üretici, emoji kopyalayıcı |

\* Sunucu bileşeni gerektirir — aşağıdaki "Worker kurulumu" bölümüne bakın. Kurulum yapılmadan bu iki araç dürüstçe "Kurulum bekleniyor" durumunu gösterir; hiçbir şey uydurulmaz.

## Teknoloji

- **Next.js** (App Router, statik dışa aktarma) + **React 19** + **TypeScript** + **Tailwind CSS v4**
- İşleme tamamen istemci tarafında: pdf-lib, pdfjs-dist, jspdf, qrcode, exifr
- Testler: Vitest (113 test)
- Barındırma hedefi: **Cloudflare Pages** (ücretsiz katman) + tek bir **Cloudflare Worker** (yalnızca link araçları için)

## Yerel geliştirme

```bash
npm install
npm run dev        # http://localhost:3000
```

Kontroller:

```bash
npx eslint src     # kod kalitesi
npx tsc --noEmit   # tip kontrolü
npx vitest run     # testler
npm run build      # statik üretim çıktısı → out/
```

`out/` klasörünü yerel önizlemek için (Node 20+):

```bash
node scripts/serve-out.cjs   # http://localhost:8734
```

## Yayınlama (Cloudflare Pages — ücretsiz)

1. **Cloudflare hesabı** açın (site sahibi kendi hesabıyla; bu proje sizin adınıza hesap oluşturamaz).
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Direct Upload** (veya GitHub bağlantısı).
3. Derleme ayarları:
   - Build command: `npm run build`
   - Output directory: `out`
4. **Ortam değişkenleri** (Production ortamına):

   | Değişken | Açıklama | Zorunlu |
   |---|---|---|
   | `NEXT_PUBLIC_SITE_URL` | Sitenizin gerçek adresi, örn. `https://www.siteadiniz.com` | Evet (yayında) |
   | `NEXT_PUBLIC_WORKER_URL` | Worker adresi, örn. `https://free-tools-worker.xxxx.workers.dev` | Yalnızca link araçları için |
   | `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense yayıncı kimliği (`ca-pub-...`) | Yalnızca reklam için |
   | `NEXT_PUBLIC_ADSENSE_SLOT_AUTO` / `NEXT_PUBLIC_ADSENSE_SLOT_HORIZONTAL` | Reklam birimi kimlikleri | Yalnızca reklam için |

5. `public/_headers` dosyası güvenlik başlıklarını (CSP, nosniff, frame koruması) otomatik uygular; ek ayar gerekmez.

**Alan adı ve DNS:** Pages projesi → "Custom domains" ile kendi alan adınızı bağlayın (DNS kayıtları Cloudflare tarafından yönlendirilir). Ardından `NEXT_PUBLIC_SITE_URL` değerini güncelleyip **yeniden derleyin** — sitemap ve canonical adresleri bu değerden üretilir.

## Worker kurulumu (URL kısaltıcı + yönlendirme kontrolü)

Bu iki araç, tarayıcı güvenlik kuralları nedeniyle küçük bir sunucu bileşeni gerektirir. Kod hazırdır (`worker/`); kurulum sizin Cloudflare hesabınızla yapılır:

```bash
cd worker
npx wrangler login
npx wrangler kv namespace create SHORT_LINKS
# Çıktıdaki id değerini wrangler.toml içindeki
# REPLACE_WITH_KV_NAMESPACE_ID yerine yazın.
npx wrangler deploy
```

Ardından Pages projesine `NEXT_PUBLIC_WORKER_URL = https://free-tools-worker.<sizin>.workers.dev` ekleyin ve yeniden derleyin.

API sözleşmesi (önyüz ile birebir uyumlu):

- `POST /shorten` — gövde `{"url": "...", "alias?": "..."}` → `{"ok": true, "shortUrl": "..."}` veya `{"ok": false, "error": "..."}`
- `GET /check?url=...` → `{"ok": true, "chain": [{"url", "status"}], "finalUrl", "finalStatus"}` veya hata
- `GET /{alias}` → kayıtlı hedefe 301 yönlendirme

Worker güvenliği: SSRF koruması (özel ağ adresleri reddedilir), kısa ad doğrulaması, bellek içi hız sınırı. Kalıcı hız sınırı için Cloudflare WAF → Rate limiting rules önerilir.

## AdSense (isteğe bağlı)

Reklam altyapısı hazırdır ancak **varsayılan olarak tamamen kapalıdır**: yayıncı kimliği tanımlanmadan sayfaya tek bir reklam kodu bile eklenmez. Yayına almak için:

1. Kendi Google hesabınızla AdSense'e başvurun (kimlik doğrulama, ödeme ve banka bilgileri **yalnızca size aittir** — bu proje bu işlemleri sizin adınıza yapamaz ve yapmaz).
2. Onay sonrası `NEXT_PUBLIC_ADSENSE_CLIENT` (ve birim kimlikleri) değerlerini ortam değişkenlerine ekleyip yeniden derleyin.

**Analitik:** Cloudflare Web Analytics'i dashboard'dan tek tıkla etkinleştirebilirsiniz — ek kod gerekmez, gizlilik dostudur ve siteye ek yük getirmez.

**Google Search Console:** `sitemap.xml` hazırdır. Doğrulama ve mülk ekleme kendi Google hesabınızla yapılır (DNS TXT kaydı veya dosya yükleme).

## Güvenlik ve gizlilik

- Dosya işleme tamamen tarayıcıda; yükleme/saklama yok (KVKK uyumlu çalışma biçimi).
- Worker'da SSRF koruması, giriş doğrulama ve hız sınırı.
- Güvenlik başlıkları: CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy.
- 8 yasal sayfa (gizlilik, çerez, KVKK aydınlatma, kullanım koşulları, telif, reklam, suistimal, iletişim). **Not:** Bu metinler bilgilendirme amaçlıdır ve profesyonel hukuk danışmanlığının yerine geçmez; yayından önce bir avukata gösterilmesi önerilir.

## SEO

- Her araç sayfası: benzersiz başlık/açıklama, canonical, Open Graph + Twitter kartları, breadcrumb ve FAQPage yapısal verisi, iç bağlantılar (ilgili araçlar).
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest` otomatik üretilir.
- İçerik tamamen özgündür; başka sitelerden kopyalanmamıştır. Keyword stuffing, doorway page, cloaking veya gizli anahtar kelime yoktur.

## Lisans

MIT — ayrıntılar `LICENSE` dosyasında.

## Katkı

Hata bildirimi ve öneriler için GitHub Issues kullanılabilir. Yeni araç eklemek için: `src/lib/tools/defs/` içinde tanım + `src/components/tools/` içinde bileşen + `src/components/tools/map.tsx` içinde kayıt yeterlidir.
