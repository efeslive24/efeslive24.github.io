import type { ToolDef } from "../types";

export const QR_TOOLS: ToolDef[] = [
  {
    slug: "qr-code-generator",
    title: "QR Kod Oluşturucu",
    shortTitle: "QR Kod Oluştur",
    description: "URL ve metinlerden ücretsiz QR kod oluşturun, PNG/SVG indirin.",
    longDescription:
      "QR Kod Oluşturucu ile herhangi bir URL'den veya metinden saniyeler içinde QR kod oluşturun. Boyut, renk ve hata düzeltme seviyesini ayarlayın; PNG veya SVG olarak indirin. QR kod tarayıcınızda üretilir, veriniz hiçbir sunucuya gönderilmez. Menüler, kartvizitler, broşürler ve etiketler için idealdir.",
    category: "qr-tools",
    keywords: ["qr kod oluştur", "qr code generator", "ücretsiz qr", "qr oluşturucu"],
    howTo: [
      "QR'a dönüştürmek istediğiniz URL'yi veya metni girin.",
      "Boyut, renk ve hata düzeltme seviyesini seçin.",
      "Kodu PNG veya SVG olarak indirin.",
    ],
    useCases: [
      "Basılı menüleri QR ile dijital menüye bağlama.",
      "Broşür ve afişlerde web sitenize yönlendirme.",
      "Ürün etiketlerinde teknik sayfalara erişim sağlama.",
    ],
    faq: [
      {
        q: "QR kod üretimi ücretsiz mi?",
        a: "Evet, tamamen ücretsizdir; kayıt gerekmez ve oluşturulan kodun süresi dolmaz.",
      },
      {
        q: "QR kodum verileri bir sunucuda mı saklanıyor?",
        a: "Hayır. Kod tarayıcınızda üretilir ve içeriği yalnızca kodun kendisinde bulunur.",
      },
      {
        q: "Hata düzeltme seviyesi nedir?",
        a: "QR kodun bir kısmı hasar görse bile okunmasını sağlayan dayanıklılık seviyesidir. Yüksek seviye, kod üzerine logo yerleştirmek için de gereklidir.",
      },
    ],
    related: ["wifi-qr-generator", "whatsapp-qr-generator", "vcard-qr-generator"],
    isPopular: true,
  },
  {
    slug: "wifi-qr-generator",
    title: "Wi-Fi QR Kod Oluşturucu",
    shortTitle: "Wi-Fi QR",
    description: "Wi-Fi ağınıza bağlantı sağlayan QR kod oluşturun; misafirleriniz tek taramayla bağlansın.",
    longDescription:
      "Wi-Fi QR Kod Oluşturucu ile ağ adınızı (SSID), şifrenizi ve güvenlik türünü içeren bir QR kod oluşturun. Misafirleriniz telefonlarıyla kodu taradığında şifre yazmadan doğrudan ağınıza bağlanır. Kafe, ofis, otel ve ev kullanımı için idealdir. Şifreniz yalnızca üretilen kodun içinde yer alır, hiçbir yere gönderilmez.",
    category: "qr-tools",
    keywords: ["wifi qr", "wifi qr kod", "misafir wifi", "wifi şifre qr"],
    howTo: [
      "Wi-Fi ağ adınızı (SSID) girin.",
      "Şifrenizi ve güvenlik türünü (WPA/WEP) seçin.",
      "QR kodu oluşturun, yazdırın veya indirin.",
    ],
    useCases: [
      "Kafe ve restoranlarda misafir ağına hızlı bağlantı.",
      "Ev ziyaretlerinde şifre söylemek yerine QR gösterme.",
      "Ofis toplantı odalarında ağ erişimi sağlama.",
    ],
    faq: [
      {
        q: "Şifrem güvende mi?",
        a: "Şifre yalnızca QR kodun içine gömülür ve hiçbir sunucuya gönderilmez. Kodu yalnızca güvendiğiniz kişilerle paylaşın.",
      },
      {
        q: "Gizli (hidden) ağlar desteklenir mi?",
        a: "Evet, 'Gizli Ağ' seçeneğiyle SSID'si yayınlanmayan ağlar için de kod oluşturabilirsiniz.",
      },
    ],
    related: ["qr-code-generator", "whatsapp-qr-generator", "vcard-qr-generator"],
    isPopular: true,
  },
  {
    slug: "whatsapp-qr-generator",
    title: "WhatsApp QR Kod Oluşturucu",
    shortTitle: "WhatsApp QR",
    description: "Telefon numaranızı tarayanların sizi WhatsApp'ta bulmasını sağlayan QR kod üretin.",
    longDescription:
      "WhatsApp QR Kod Oluşturucu ile telefon numaranızı ve isteğe bağlı hazır mesajı içeren bir QR kod oluşturun. Tarayan kişi doğrudan sizinle WhatsApp sohbeti başlatır. Kartvizitlerde, tabelalarda ve ürün ambalajlarında müşterilerinizin size tek taramayla ulaşmasını sağlayın.",
    category: "qr-tools",
    keywords: ["whatsapp qr", "whatsapp qr kod", "wa.me qr", "whatsapp bağlantı"],
    howTo: [
      "Telefon numaranızı ülke koduyla girin (örn. +90...).",
      "İsterseniz otomatik gönderilecek hazır mesajı yazın.",
      "QR kodu indirin ve yazdırın.",
    ],
    useCases: [
      "Kartvizitte WhatsApp üzerinden hızlı iletişim.",
      "Ürün ambalajında destek hattına erişim.",
      "İlan ve afişlerde sohbet başlatma kolaylığı.",
    ],
    faq: [
      {
        q: "Numara formatı nasıl olmalı?",
        a: "Ülke koduyla birlikte, boşluksuz ve '+90' şeklinde girilmelidir.",
      },
      {
        q: "Tarayan kişi numaramı görür mü?",
        a: "Evet, QR kod numaranızı içerir; bu nedenle yalnızca kamuya açık olmasını istediğiniz numaraları kullanın.",
      },
    ],
    related: ["qr-code-generator", "vcard-qr-generator", "social-profile-qr-generator"],
  },
  {
    slug: "vcard-qr-generator",
    title: "vCard QR Kod Oluşturucu",
    shortTitle: "vCard QR",
    description: "İletişim bilgilerinizi içeren vCard QR kodu oluşturun; tarayan kişi sizi rehberine eklesin.",
    longDescription:
      "vCard QR Kod Oluşturucu ile ad, telefon, e-posta, unvan, şirket ve web sitesi bilgilerinizi içeren bir dijital kartvizit QR kodu oluşturun. Tarayan kişi tüm bilgilerinizi tek dokunuşla telefon rehberine kaydeder. Fuarlar, toplantılar ve kartvizitler için kağıtsız iletişim çözümüdür.",
    category: "qr-tools",
    keywords: ["vcard qr", "dijital kartvizit", "vcard generator", "kartvizit qr"],
    howTo: [
      "Ad, soyad ve iletişim bilgilerinizi doldurun.",
      "Şirket, unvan ve web sitesi gibi ek bilgileri girin.",
      "QR kodu indirin; tarayan kişi bilgilerinizi rehberine kaydeder.",
    ],
    useCases: [
      "Fuarlarda kağıtsız kartvizit paylaşımı.",
      "E-posta imzalarında dijital kartvizit.",
      "Toplantılarda hızlı iletişim bilgisi aktarımı.",
    ],
    faq: [
      {
        q: "Tarayan kişi ne görür?",
        a: "Telefonu, 'Yeni Kişi Ekle' ekranını bilgileriniz dolu olarak açar; kaydetmek tarayan kişinin onayına bağlıdır.",
      },
      {
        q: "Hangi bilgiler eklenebilir?",
        a: "Ad, soyad, telefon, e-posta, unvan, şirket, adres, web sitesi ve doğum günü gibi standart vCard alanları.",
      },
    ],
    related: ["whatsapp-qr-generator", "qr-code-generator", "email-qr-generator"],
  },
  {
    slug: "email-qr-generator",
    title: "E-posta QR Kod Oluşturucu",
    shortTitle: "E-posta QR",
    description: "Tarayan kişinin size hazır konu ve içerikle e-posta göndermesini sağlayın.",
    longDescription:
      "E-posta QR Kod Oluşturucu ile e-posta adresinizi, hazır konu satırını ve mesaj gövdesini içeren bir QR kod oluşturun. Tarayan kişinin telefonu, e-posta uygulamasını sizin belirlediğiniz içerikle dolu olarak açar. İş başvuruları, destek talepleri ve etkinlik kayıtları için idealdir.",
    category: "qr-tools",
    keywords: ["email qr", "e-posta qr", "mailto qr", "e-posta kodu"],
    howTo: [
      "E-posta adresinizi girin.",
      "İsterseniz konu satırını ve gövde metnini belirleyin.",
      "QR kodu indirin; tarayan kişi hazır e-postayla size ulaşır.",
    ],
    useCases: [
      "Etkinlik kayıt formlarına alternatif başvuru yolu.",
      "Destek taleplerinde standart format sağlama.",
      "İlanlarda hızlı e-posta iletişimi.",
    ],
    faq: [
      {
        q: "Konu ve gövde önceden doldurulabilir mi?",
        a: "Evet, mailto: standardı sayesinde konu (subject) ve gövde (body) alanları önceden doldurulabilir.",
      },
      {
        q: "Kod her cihazda çalışır mı?",
        a: "Evet, e-posta uygulaması olan her akıllı telefonda çalışır.",
      },
    ],
    related: ["vcard-qr-generator", "sms-qr-generator", "qr-code-generator"],
  },
  {
    slug: "sms-qr-generator",
    title: "SMS QR Kod Oluşturucu",
    shortTitle: "SMS QR",
    description: "Tarayan kişinin size hazır metinle SMS göndermesini sağlayan QR kod üretin.",
    longDescription:
      "SMS QR Kod Oluşturucu ile telefon numaranızı ve hazır mesaj metnini içeren bir QR kod oluşturun. Tarayan kişinin telefonu SMS uygulamasını sizin belirlediğiniz mesajla açar; tek dokunuşla gönderebilir. Kampanya katılımları, anketler ve hızlı bildirimler için kullanışlıdır.",
    category: "qr-tools",
    keywords: ["sms qr", "sms qr kod", "sms kodu", "hazır sms"],
    howTo: [
      "Hedef telefon numarasını ülke koduyla girin.",
      "Hazır mesaj metnini yazın.",
      "QR kodu indirin ve kullanın.",
    ],
    useCases: [
      "Kampanya katılımı için hazır SMS formatı.",
      "Anket ve oylamalarda standart mesaj gönderimi.",
      "Acil durumlarda hızlı bildirim.",
    ],
    faq: [
      {
        q: "Mesaj otomatik mi gönderilir?",
        a: "Hayır, tarayan kişi mesajı görür ve göndermeyi kendisi onaylar; bu, kullanıcı gizliliği açısından önemlidir.",
      },
      {
        q: "Numara görünür mü?",
        a: "Evet, SMS uygulamasında numaranız görünür.",
      },
    ],
    related: ["email-qr-generator", "whatsapp-qr-generator", "qr-code-generator"],
  },
  {
    slug: "text-qr-generator",
    title: "Metin QR Kod Oluşturucu",
    shortTitle: "Metin QR",
    description: "Herhangi bir metni QR koda dönüştürün; tarayan kişi metni doğrudan okusun.",
    longDescription:
      "Metin QR Kod Oluşturucu ile not, adres, talimat veya seri numarası gibi herhangi bir metni QR koda dönüştürün. Tarayan kişi internet bağlantısı olmasa bile metni doğrudan okuyabilir. Depo etiketleri, davetiye notları ve teknik dokümantasyon için idealdir.",
    category: "qr-tools",
    keywords: ["metin qr", "text qr", "yazı qr kod", "not qr"],
    howTo: [
      "QR'a dönüştürmek istediğiniz metni girin.",
      "Boyut ve renk ayarlarını yapın.",
      "Kodu indirin veya yazdırın.",
    ],
    useCases: [
      "Depo ve raf etiketlerinde ürün notları.",
      "Davetiyelerde kısa mesajlar.",
      "Cihaz üzerinde bakım talimatları.",
    ],
    faq: [
      {
        q: "Metin uzunluğu sınırı var mı?",
        a: "QR standartları yaklaşık 4.000 karaktere kadar destekler; çok uzun metinlerde kod karmaşıklaşır ve okunması zorlaşır.",
      },
      {
        q: "İnternetsiz okunur mu?",
        a: "Evet, metin doğrudan kodun içinde saklanır; URL gerektirmez.",
      },
    ],
    related: ["qr-code-generator", "sms-qr-generator", "email-qr-generator"],
  },
  {
    slug: "social-profile-qr-generator",
    title: "Sosyal Profil QR Kod Oluşturucu",
    shortTitle: "Sosyal QR",
    description: "Instagram, X, TikTok, LinkedIn ve YouTube profilleriniz için QR kod oluşturun.",
    longDescription:
      "Sosyal Profil QR Kod Oluşturucu ile sosyal medya profillerinize yönlendiren QR kodlar oluşturun. Instagram, X (Twitter), TikTok, LinkedIn, YouTube ve Facebook profillerinizi tek koda bağlayın veya her profil için ayrı kod üretin. Basılı materyallerde ve vitrinlerde takipçilerinizi tek taramayla profilinize ulaştırın.",
    category: "qr-tools",
    keywords: ["instagram qr", "sosyal medya qr", "linkedin qr", "tiktok qr"],
    howTo: [
      "Platformu seçin (Instagram, X, TikTok vb.).",
      "Profil kullanıcı adınızı veya profil bağlantınızı girin.",
      "QR kodu indirin ve paylaşın.",
    ],
    useCases: [
      "Mağaza vitrininde Instagram profiline yönlendirme.",
      "Kartvizitte LinkedIn profiline hızlı erişim.",
      "Afişlerde YouTube kanalına bağlantı.",
    ],
    faq: [
      {
        q: "Hangi platformlar destekleniyor?",
        a: "Instagram, X (Twitter), TikTok, LinkedIn, YouTube, Facebook ve genel URL.",
      },
      {
        q: "Kullanıcı adı mı yoksa tam bağlantı mı gerekli?",
        a: "İkisi de kabul edilir; kullanıcı adı girdiğinizde bağlantı otomatik oluşturulur.",
      },
    ],
    related: ["whatsapp-qr-generator", "qr-code-generator", "hashtag-generator"],
    isNew: true,
  },
];
