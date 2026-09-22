import type { ToolDef } from "../types";

export const WEBMASTER_TOOLS: ToolDef[] = [
  {
    slug: "url-shortener",
    title: "URL Kısaltıcı",
    shortTitle: "URL Kısalt",
    description: "Uzun bağlantılarınızı kısaltın; tıklanma sayısını takip edin.",
    longDescription:
      "URL Kısaltıcı ile uzun ve karmaşık bağlantıları kısa, paylaşılabilir linklere dönüştürün. Kısa linkler sosyal medya biyografilerinde, SMS'lerde ve basılı materyallerde yer kazandırır. Bu araç, kısa linklerin çalışması için küçük bir sunucu bileşeni gerektirir; site sahibi dağıtım ayarını yapana kadar arayüz hazır durumda bekler. Mevcut durumda yerel olarak çalışan alternatifler için UTM Oluşturucu'yu da inceleyebilirsiniz.",
    category: "webmaster-tools",
    keywords: ["url kısalt", "link kısaltma", "url shortener", "kısa link"],
    howTo: [
      "Kısaltmak istediğiniz URL'yi girin.",
      "İsteğe bağlı özel kısa ad tanımlayın.",
      "\"Kısalt\" düğmesine basın.",
      "Kısa linki kopyalayıp paylaşın.",
    ],
    useCases: [
      "Sosyal medya biyografilerinde yer kazanma.",
      "SMS ve basılı materyallerde kısa link kullanma.",
      "Kampanya linklerini tek merkezden yönetme.",
    ],
    faq: [
      {
        q: "Kısa linkler sürekli çalışır mı?",
        a: "Kısa link hizmeti, sitenin sunucu altyapısına bağlıdır. Kurulum tamamlandıktan sonra linkler kesintisiz çalışır.",
      },
      {
        q: "Kısa link güvenli mi?",
        a: "Linkler yalnızca bu sitenin alan adı altında üretilir. Tanımadığınız kısaltıcılardan gelen linklere karşı her zaman dikkatli olun.",
      },
      {
        q: "Suistimal bildirimi nasıl yapılır?",
        a: "Sitemizdeki Suistimal Bildirimi sayfasından kısaltılmış linklerle ilgili şikayetlerinizi iletebilirsiniz.",
      },
    ],
    related: ["utm-builder", "redirect-checker", "url-encoder"],
  },
  {
    slug: "utm-builder",
    title: "UTM Parametre Oluşturucu",
    shortTitle: "UTM Builder",
    description: "Kampanya linklerinizi UTM parametreleriyle oluşturup analiz edilebilir hale getirin.",
    longDescription:
      "UTM Parametre Oluşturucu ile kampanyalarınızın linklerine kaynak, ortam ve kampanya adı gibi UTM parametrelerini ekleyin. Böylece Google Analytics gibi araçlarda hangi kanaldan kaç ziyaret geldiğini ayrıntılı görürsünüz. Alanları doldurun; hazır link otomatik oluşur. Parametreleri tutarlı yazmak (ör. hep küçük harf) raporlamanızı sağlıklı tutar.",
    category: "webmaster-tools",
    keywords: ["utm builder", "utm parametre", "kampanya linki", "utm generator"],
    howTo: [
      "Hedef sayfanızın URL'sini girin.",
      "Kaynak, ortam ve kampanya adını doldurun.",
      "İsteğe bağlı terim ve içerik alanlarını ekleyin.",
      "Oluşan linki kopyalayıp kampanyanızda kullanın.",
    ],
    useCases: [
      "Sosyal medya kampanyalarının performansını ölçme.",
      "E-posta bültenindeki tıklamaları kaynağına göre ayırma.",
      "Reklam kampanyalarını tek tek etiketleme.",
    ],
    faq: [
      {
        q: "UTM parametreleri ziyaretçiyi etkiler mi?",
        a: "Hayır, sayfa içeriği değişmez; yalnızca analiz araçlarına kaynak bilgisi taşır.",
      },
      {
        q: "Hangi alanlar zorunlu?",
        a: "utm_source, utm_medium ve utm_campaign önerilen temel üçlüdür; utm_term ve utm_content isteğe bağlıdır.",
      },
    ],
    related: ["url-shortener", "url-encoder", "redirect-checker"],
  },
  {
    slug: "url-encoder",
    title: "URL Kodlayıcı",
    shortTitle: "URL Encode",
    description: "Metinleri URL'lerde güvenle kullanılabilecek biçime kodlayın.",
    longDescription:
      "URL Kodlayıcı ile metinleri URL'lerde güvenle kullanılabilecek biçime dönüştürün. Boşluk, Türkçe karakter ve &, ?, = gibi özel işaretler percent-encoding ile kodlanır; böylece linkler bozulmaz ve her tarayıcıda aynı çalışır. Query parametreleri hazırlarken, form verilerini aktarırken veya API istekleri oluştururken kullanın. Kodlama tamamen tarayıcınızda yapılır.",
    category: "webmaster-tools",
    keywords: ["url encode", "url kodla", "percent encoding", "url kodlama"],
    howTo: [
      "Kodlamak istediğiniz metni yapıştırın.",
      "Kodlanmış metin otomatik oluşur.",
      "Kopyalayın veya çift yönlü kodlayın.",
    ],
    useCases: [
      "Türkçe karakterli aramaları URL'e ekleme.",
      "Form verilerini GET parametresi olarak aktarma.",
      "API isteklerinde özel karakterleri güvenli hale getirme.",
    ],
    faq: [
      {
        q: "URL kodlama nedir?",
        a: "URL'lerde izin verilmeyen karakterlerin %XX biçiminde yazılmasıdır. Örneğin boşluk %20 olur.",
      },
      {
        q: "Neden kodlamaya ihtiyaç var?",
        a: "Kodlanmamış özel karakterler linkin kırılmasına veya parametrelerin yanlış ayrışmasına neden olabilir.",
      },
    ],
    related: ["url-decoder", "utm-builder", "base64-encoder"],
    isPopular: true,
  },
  {
    slug: "url-decoder",
    title: "URL Çözücü",
    shortTitle: "URL Decode",
    description: "Kodlanmış URL'leri okunabilir metne geri dönüştürün.",
    longDescription:
      "URL Çözücü ile percent-encoding ile kodlanmış URL'leri okunabilir metne dönüştürün. %20, %C3%BC gibi diziler boşluk ve Türkçe karakterlere çevrilir. Analiz araçlarından kopyaladığınız linklerin parametrelerini incelemek, form verilerini okumak veya kodlanmış içeriği doğrulamak için kullanın. İşlem tamamen tarayıcınızda yapılır.",
    category: "webmaster-tools",
    keywords: ["url decode", "url çöz", "url kod çözme", "percent decode"],
    howTo: [
      "Kodlanmış URL'yi veya metni yapıştırın.",
      "Çözülmüş metin otomatik oluşur.",
      "Kopyalayın veya tekrar kodlayın.",
    ],
    useCases: [
      "Analiz araçlarındaki link parametrelerini okuma.",
      "Kodlanmış API yanıtlarını inceleme.",
      "Form verilerinin doğruluğunu kontrol etme.",
    ],
    faq: [
      {
        q: "Bozuk çıktı alırsam ne yapmalıyım?",
        a: "Girdi zaten kodlanmamışsa veya çift kodlanmışsa sonuç garip görünebilir; \"tekrar kodla\" seçeneğiyle kontrol edin.",
      },
    ],
    related: ["url-encoder", "base64-decoder", "utm-builder"],
  },
  {
    slug: "redirect-checker",
    title: "Yönlendirme Kontrolü",
    shortTitle: "Redirect Check",
    description: "Bir URL'nin yönlendirme zincirini ve son durum kodunu kontrol edin.",
    longDescription:
      "Yönlendirme Kontrolü aracı ile bir URL'nin yönlendirme (redirect) zincirini inceleyin: kaç adımda, hangi HTTP durum kodlarıyla (301, 302...) nereye yönlendiğini görün. Tarayıcı güvenlik kuralları nedeniyle bu işlem küçük bir sunucu bileşeni gerektirir; site sahibi dağıtım ayarını yapana kadar arayüz hazır durumda bekler. Yönlendirme hataları, SEO sorunlarının ve ziyaretçi kaybının sık nedenlerindendir.",
    category: "webmaster-tools",
    keywords: ["redirect checker", "yönlendirme kontrol", "301 kontrol", "link takibi"],
    howTo: [
      "Kontrol etmek istediğiniz URL'yi girin.",
      "\"Kontrol Et\" düğmesine basın.",
      "Yönlendirme zinciri adım adım listelenir.",
      "Son durum kodunu ve hedefi inceleyin.",
    ],
    useCases: [
      "Eski linklerin doğru sayfaya yönlendiğini doğrulama.",
      "Zincirleme yönlendirmeleri tespit edip kısaltma.",
      "Site taşıma sonrası 301'leri kontrol etme.",
    ],
    faq: [
      {
        q: "301 ve 302 farkı nedir?",
        a: "301 kalıcı yönlendirmedir ve SEO değerini yeni adrese taşır; 302 geçicidir. Kalıcı taşımalarda 301 kullanılmalıdır.",
      },
      {
        q: "Zincirleme yönlendirme neden sorundur?",
        a: "Her adım yükleme süresini artırır ve arama motorlarının takibi bırakmasına yol açabilir. İdeal olan tek adımlı yönlendirmedir.",
      },
    ],
    related: ["url-shortener", "canonical-generator", "utm-builder"],
  },
];
