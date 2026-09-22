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
- Canlı yayın: **https://free-online-tools-5bg.pages.dev** (Cloudflare Pages, ücretsiz)
- Ücretsiz kısa adres başvurusu: **https://efeslive24.js.org** — js.org PR'ı açıldı (https://github.com/js-org/js.org/pull/12527); birleştirilince custom domain Pages projesinde zaten tanımlı olduğundan otomatik yayına girer, ardından `NEXT_PUBLIC_SITE_URL` bu adresle yeniden derlenir.
- Link araçları Worker'ı: **https://free-tools-worker.efeslive24.workers.dev** (Cloudflare Workers + KV)
- Eski adres `https://efeslive24.github.io/` yeni adrese yönlendirir.

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

## Yayınlama (Cloudflare Pages — ücretsiz, mevcut üretim ortamı)

Bu site şu anda Cloudflare Pages'ta yayındadır. Yayın, `wrangler pages deploy` ile doğrudan yükleme (direct upload) yöntemiyle yapılır:

```bash
# Yayın adreslerine göre derle
# Windows/Git Bash: MSYS_NO_PATHCONV=1 gerekir
NEXT_PUBLIC_SITE_URL=https://free-online-tools-5bg.pages.dev \
NEXT_PUBLIC_WORKER_URL=https://free-tools-worker.efeslive24.workers.dev \
npm run build

# Cloudflare'a yükle (giriş: npx wrangler login veya CLOUDFLARE_API_TOKEN)
npx wrangler pages deploy out --project-name=free-online-tools --branch=main --commit-dirty=true
```

`public/_headers` dosyası güvenlik başlıklarını (CSP, nosniff, frame koruması) Pages tarafından otomatik uygulanır; ek ayar gerekmez.

**Alan adı ve DNS:** Pages projesi → "Custom domains" ile kendi alan adınızı bağlayın (alan adınız Cloudflare'da olmalı; kayıt şirketinizde Cloudflare ad sunucularına geçirin). Ardından `NEXT_PUBLIC_SITE_URL` değerini kendi alan adınıza güncelleyip **yeniden derleyin** — sitemap ve canonical adresleri bu değerden üretilir.

### Eski adres: GitHub Pages

Statik çıktı GitHub Pages'ta da çalışır; `efeslive24.github.io` deposu şu anda yalnızca yeni adrese **yönlendirme sayfası** içerir (kopya içerik oluşmaması için). GitHub Pages `_headers` güvenlik başlıklarını uygulamaz; üretim için Cloudflare Pages kullanılır.

## Worker kurulumu (URL kısaltıcı + yönlendirme kontrolü)

Bu iki araç, tarayıcı güvenlik kuralları nedeniyle küçük bir sunucu bileşeni gerektirir. **Worker kuruludur ve canlıdır:** `https://free-tools-worker.efeslive24.workers.dev` (KV: `SHORT_LINKS`, id `688f36695eec412bbad5863798fab008` — `worker/wrangler.toml` içinde kayıtlı).

Yeni bir Cloudflare hesabına taşırken kurulum:

```bash
cd worker
npx wrangler login   # veya CLOUDFLARE_API_TOKEN ortam değişkeni
npx wrangler kv namespace create SHORT_LINKS
# Çıktıdaki id değerini wrangler.toml içindeki id satırına yazın.
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
