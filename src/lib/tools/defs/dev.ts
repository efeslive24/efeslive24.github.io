import type { ToolDef } from "../types";

export const DEV_TOOLS: ToolDef[] = [
  {
    slug: "json-formatter",
    title: "JSON Biçimlendirici",
    shortTitle: "JSON Format",
    description: "Karışık JSON'u okunaklı, girintili biçime dönüştürün.",
    longDescription:
      "JSON Biçimlendirici ile tek satıra sıkıştırılmış veya düzensiz JSON verilerini okunaklı, girintili biçime dönüştürün. Anahtarları alfabetik sıralama, girinti boyutunu ayarlama ve küçültme (minify) seçenekleriyle JSON ile çalışmayı kolaylaştırır. Verileriniz tarayıcınızdan çıkmaz.",
    category: "developer-tools",
    keywords: ["json formatter", "json biçimlendir", "json beautify", "json düzenle"],
    howTo: [
      "JSON verinizi kutuya yapıştırın.",
      "'Biçimlendir' düğmesine tıklayın.",
      "İsterseniz anahtarları sıralayın veya kodu küçültün, sonucu kopyalayın.",
    ],
    useCases: [
      "API yanıtlarını incelerken okunabilirlik sağlama.",
      "Günlük (log) dosyalarındaki JSON satırlarını analiz etme.",
      "Dağıtım öncesi JSON'u küçülterek boyut azaltma.",
    ],
    faq: [
      {
        q: "Geçersiz JSON'da ne olur?",
        a: "Araç hatanın konumunu ve açıklamasını gösterir; böylece sorunu hızla düzeltebilirsiniz.",
      },
      {
        q: "Verilerim güvende mi?",
        a: "Evet, tüm işlem tarayıcınızda yapılır; veriniz hiçbir sunucuya gönderilmez.",
      },
    ],
    related: ["json-validator", "json-to-csv", "csv-to-json"],
    isPopular: true,
  },
  {
    slug: "json-validator",
    title: "JSON Doğrulayıcı",
    shortTitle: "JSON Validate",
    description: "JSON'unuzun geçerli olup olmadığını kontrol edin, hatanın yerini bulun.",
    longDescription:
      "JSON Doğrulayıcı, JSON verinizin sözdizimini kontrol eder. Veri geçerliyse onay mesajı ve istatistikler (anahtar sayısı, derinlik, boyut) gösterir; geçersizse hatanın tam satırını ve nedenini belirtir. API geliştirme, yapılandırma dosyası düzenleme ve veri alışverişinde hata ayıklamayı hızlandırır.",
    category: "developer-tools",
    keywords: ["json validator", "json doğrula", "json hata", "json check"],
    howTo: [
      "JSON metnini kutuya yapıştırın.",
      "'Doğrula' düğmesine tıklayın.",
      "Sonucu inceleyin: geçerliyse istatistikler, hatalıysa hata konumu gösterilir.",
    ],
    useCases: [
      "API'ye göndermeden önce JSON yükünü doğrulama.",
      "package.json gibi yapılandırma dosyalarını kontrol etme.",
      "Veri içe aktarmadan önce bütünlük doğrulama.",
    ],
    faq: [
      {
        q: "Hangi hatalar tespit edilir?",
        a: "Eksik virgül, fazladan virgül, eşleşmeyen parantez, geçersiz tırnak işareti ve geçersiz değerler gibi tüm sözdizimi hataları.",
      },
      {
        q: "Büyük dosyalar desteklenir mi?",
        a: "Evet, tarayıcı belleği dahilinde büyük JSON dosyaları da doğrulanabilir.",
      },
    ],
    related: ["json-formatter", "json-to-csv", "regex-tester"],
  },
  {
    slug: "json-to-csv",
    title: "JSON → CSV Dönüştürücü",
    shortTitle: "JSON → CSV",
    description: "JSON verilerini Excel uyumlu CSV dosyasına dönüştürün.",
    longDescription:
      "JSON → CSV Dönüştürücü, JSON dizilerini ve nesnelerini Excel, Google Sheets veya herhangi bir tablo programında açılabilen CSV formatına çevirir. Alanları seçme, ayraç karakterini (virgül/noktalı virgül) belirleme ve başlık satırı ekleme seçenekleri sunar. Dönüşüm tamamen tarayıcınızda gerçekleşir.",
    category: "developer-tools",
    keywords: ["json to csv", "json csv dönüştür", "json excel", "csv export"],
    howTo: [
      "JSON dizinizi (array) kutuya yapıştırın.",
      "Ayraç karakterini ve çıktı seçeneklerini belirleyin.",
      "CSV'yi kopyalayın veya dosya olarak indirin.",
    ],
    useCases: [
      "API verilerini Excel'de analiz etme.",
      "Raporlama için JSON yanıtlarını tabloya çevirme.",
      "Veri aktarımı için format dönüştürme.",
    ],
    faq: [
      {
        q: "İç içe (nested) JSON desteklenir mi?",
        a: "Evet, iç içe nesneler ve diziler nokta notasyonuyla düzleştirilir (örn. user.name).",
      },
      {
        q: "Türkçe karakterler bozulur mu?",
        a: "Hayır, CSV UTF-8 BOM ile üretilir; Excel'de Türkçe karakterler doğru görünür.",
      },
    ],
    related: ["csv-to-json", "json-formatter", "json-validator"],
  },
  {
    slug: "csv-to-json",
    title: "CSV → JSON Dönüştürücü",
    shortTitle: "CSV → JSON",
    description: "CSV verilerini JSON dizisine dönüştürün.",
    longDescription:
      "CSV → JSON Dönüştürücü, Excel veya tablo programlarından dışa aktarılan CSV verilerini JSON dizisine çevirir. Ayraç karakterini otomatik algılar, başlık satırını anahtar olarak kullanır ve sayısal değerleri otomatik tür dönüşümüyle işler. API geliştirme ve veri hazırlama işlerinizi hızlandırır.",
    category: "developer-tools",
    keywords: ["csv to json", "csv json dönüştür", "csv parse", "excel json"],
    howTo: [
      "CSV verinizi kutuya yapıştırın veya dosya yükleyin.",
      "Başlık satırı ve ayraç seçeneklerini kontrol edin.",
      "JSON çıktısını kopyalayın veya indirin.",
    ],
    useCases: [
      "Mock API verisi hazırlama.",
      "Excel tablolarını uygulama verisine dönüştürme.",
      "CSV'yi NoSQL veritabanına aktarmadan önce dönüştürme.",
    ],
    faq: [
      {
        q: "Sayılar metin mi sayı mı olur?",
        a: "Araç sayısal değerleri otomatik olarak JSON sayısına dönüştürür; isterseniz bu davranışı kapatabilirsiniz.",
      },
      {
        q: "Büyük CSV dosyaları desteklenir mi?",
        a: "Evet, tarayıcı belleği sınırları içinde büyük dosyalar işlenebilir.",
      },
    ],
    related: ["json-to-csv", "json-formatter", "json-validator"],
  },
  {
    slug: "base64-encoder",
    title: "Base64 Kodlayıcı",
    shortTitle: "Base64 Encode",
    description: "Metni Base64 formatına kodlayın — Unicode destekli.",
    longDescription:
      "Base64 Kodlayıcı, metinleri ve dosya içeriklerini Base64 formatına dönüştürür. Türkçe karakterler ve emojiler dahil tüm Unicode metinler UTF-8 ile doğru şekilde kodlanır. URL-güvenli Base64 seçeneğiyle web adreslerinde güvenle kullanılabilir çıktı alın.",
    category: "developer-tools",
    keywords: ["base64 encoder", "base64 kodla", "base64 encode", "metin kodlama"],
    howTo: [
      "Metninizi kutuya yazın veya yapıştırın.",
      "'Kodla' düğmesine tıklayın.",
      "Base64 çıktısını kopyalayın.",
    ],
    useCases: [
      "Verileri URL'de güvenle taşıma.",
      "E-posta ekleri için ikili veriyi metne çevirme.",
      "Yapılandırma dosyalarında veri gömmek için kodlama.",
    ],
    faq: [
      {
        q: "Base64 şifreleme midir?",
        a: "Hayır. Base64 yalnızca bir kodlamadır; veriyi gizlemez. Hassas veriler için şifreleme kullanmalısınız.",
      },
      {
        q: "Türkçe karakterler doğru kodlanır mı?",
        a: "Evet, metin önce UTF-8'e çevrilir, böylece ı, ğ, ü, ş, ö, ç ve emojiler doğru kodlanır.",
      },
    ],
    related: ["base64-decoder", "url-encoder", "hash-generator"],
    isPopular: true,
  },
  {
    slug: "base64-decoder",
    title: "Base64 Çözücü",
    shortTitle: "Base64 Decode",
    description: "Base64 kodlu metni çözün ve orijinal içeriğine ulaşın.",
    longDescription:
      "Base64 Çözücü, Base64 ile kodlanmış metinleri çözerek orijinal içeriğine dönüştürür. UTF-8 desteği sayesinde Türkçe karakterler ve emojiler doğru şekilde çözülür. Kod çözme tamamen tarayıcınızda yapılır; veriniz hiçbir sunucuya gönderilmez.",
    category: "developer-tools",
    keywords: ["base64 decoder", "base64 çöz", "base64 decode", "kod çözme"],
    howTo: [
      "Base64 metnini kutuya yapıştırın.",
      "'Çöz' düğmesine tıklayın.",
      "Orijinal metni kopyalayın.",
    ],
    useCases: [
      "JWT veya URL parametrelerindeki kodlu veriyi okuma.",
      "E-posta eklerindeki kodlu içeriği çözme.",
      "Yapılandırma dosyalarındaki gömülü veriyi okuma.",
    ],
    faq: [
      {
        q: "Geçersiz Base64 girilirse ne olur?",
        a: "Araç hatayı bildirir; geçersiz karakterleri yok sayma seçeneğiyle yine de deneyebilirsiniz.",
      },
      {
        q: "Çözülen metin bozuk görünüyor, neden?",
        a: "Kaynak kodlama UTF-8 değilse bozulma olabilir. İkili çıktılar için 'onaltılık görünüm' seçeneğini kullanın.",
      },
    ],
    related: ["base64-encoder", "jwt-decoder", "url-decoder"],
  },
  {
    slug: "uuid-generator",
    title: "UUID Oluşturucu",
    shortTitle: "UUID Generator",
    description: "Tek tıkla UUID v4 üretin veya toplu UUID listesi oluşturun.",
    longDescription:
      "UUID Oluşturucu ile sürüm 4 (rastgele) UUID'leri tek tek veya toplu olarak üretin. Veritabanı anahtarları, oturum kimlikleri, dosya adları ve test verileri için benzersiz tanımlayıcılara ihtiyacınız olduğunda idealdir. Üretim, kriptografik olarak güvenli rastgelelik kaynağı kullanır.",
    category: "developer-tools",
    keywords: ["uuid generator", "uuid üret", "guid", "benzersiz kimlik"],
    howTo: [
      "Üretmek istediğiniz UUID sayısını seçin.",
      "'Üret' düğmesine tıklayın.",
      "Listeyi kopyalayın veya indirin.",
    ],
    useCases: [
      "Veritabanı kayıtları için benzersiz anahtar üretme.",
      "Test verisi oluşturma.",
      "Dosya adları için çakışmasız tanımlayıcı üretme.",
    ],
    faq: [
      {
        q: "İki UUID aynı olabilir mi?",
        a: "Teorik olarak olasılık sıfıra yakındır (2¹²² kombinasyon). Pratikte çakışma yaşanmaz.",
      },
      {
        q: "UUID v4 nedir?",
        a: "Tamamen rastgele üretilen UUID sürümüdür; donanım adresi gibi kişisel bilgi içermez.",
      },
    ],
    related: ["hash-generator", "jwt-decoder", "cron-generator"],
    isPopular: true,
  },
  {
    slug: "regex-tester",
    title: "Regex (Düzenli İfade) Test Edici",
    shortTitle: "Regex Tester",
    description: "Düzenli ifadelerinizi canlı test edin, eşleşmeleri vurgulayın.",
    longDescription:
      "Regex Test Edici ile düzenli ifadelerinizi (regular expression) gerçek metin üzerinde canlı olarak test edin. Eşleşmeler vurgulanır, yakalanan gruplar (capture groups) ayrı ayrı listelenir. Bayraklar (i, g, m, s) desteklenir ve sık kullanılan kalıplardan oluşan hazır örneklerle başlayabilirsiniz.",
    category: "developer-tools",
    keywords: ["regex tester", "regex test", "düzenli ifade", "regular expression"],
    howTo: [
      "Düzenli ifadenizi yazın (örn. ^\d{3}-\d{4}$).",
      "Test metnini kutuya yapıştırın.",
      "Eşleşmeler canlı olarak vurgulanır; grupları ve bayrakları ayarlayın.",
    ],
    useCases: [
      "Form doğrulama kalıplarını geliştirme.",
      "Günlük dosyalarından desen çıkarma.",
      "E-posta, telefon, posta kodu gibi kalıpları sınama.",
    ],
    faq: [
      {
        q: "Hangi regex motoru kullanılıyor?",
        a: "Tarayıcınızın JavaScript regex motoru. Çoğu senaryo için uygundur; geri izleme (backtracking) ağır kalıplarda yavaşlayabilir.",
      },
      {
        q: "Gruplar nasıl görünür?",
        a: "Eşleşen her kayıt için yakalanan gruplar ayrı bir tabloda listelenir.",
      },
    ],
    related: ["json-validator", "text-diff", "cron-generator"],
  },
  {
    slug: "timestamp-converter",
    title: "Zaman Damgası (Timestamp) Dönüştürücü",
    shortTitle: "Timestamp Converter",
    description: "Unix timestamp ile okunabilir tarih arasında anında dönüşüm yapın.",
    longDescription:
      "Zaman Damgası Dönüştürücü, Unix zaman damgalarını (epoch) okunabilir tarih-saat biçimine veya tersine çevirir. Saniye ve milisaniye desteklenir; UTC ve yerel saat diliminiz birlikte gösterilir. Geçerli anın zaman damgası tek tıkla alınabilir. Programlama, günlük analizi ve API çalışmaları için vazgeçilmezdir.",
    category: "developer-tools",
    keywords: ["timestamp converter", "unix timestamp", "epoch dönüştür", "zaman damgası"],
    howTo: [
      "Zaman damgasını girin veya tarih-saat seçin.",
      "Dönüşüm anında yapılır; UTC ve yerel saat birlikte gösterilir.",
      "'Şimdi' düğmesiyle geçerli anın damgasını kopyalayın.",
    ],
    useCases: [
      "API yanıtlarındaki epoch değerlerini okunabilir hale getirme.",
      "Günlük dosyalarındaki zaman damgalarını analiz etme.",
      "Veritabanı sorguları için doğru zaman aralığı hesaplama.",
    ],
    faq: [
      {
        q: "Saniye mi milisaniye mi?",
        a: "Araç her ikisini de destekler ve girdinin büyüklüğüne göre otomatik algılar.",
      },
      {
        q: "Saat dilimi dönüşümü yapılıyor mu?",
        a: "Evet, sonuç hem UTC hem de cihazınızın yerel saat diliminde gösterilir.",
      },
    ],
    related: ["date-difference-calculator", "age-calculator", "jwt-decoder"],
    isPopular: true,
  },
  {
    slug: "hash-generator",
    title: "Hash (Özet) Oluşturucu",
    shortTitle: "Hash Generator",
    description: "MD5, SHA-1, SHA-256 ve SHA-512 özetleri üretin.",
    longDescription:
      "Hash Oluşturucu ile metninizden MD5, SHA-1, SHA-256 ve SHA-512 özetleri (digest) üretin. SHA algoritmaları tarayıcınızın kriptografik altyapısıyla hesaplanır; veriniz sunucuya gönderilmez. Dosya bütünlüğü kontrolü, veri doğrulama ve geliştirme işlerinde kullanın.",
    category: "developer-tools",
    keywords: ["hash generator", "sha256", "md5", "hash oluştur", "checksum"],
    howTo: [
      "Metninizi kutuya yazın veya dosya seçin.",
      "İstediğiniz algoritmalar için özetler anında hesaplanır.",
      "İlgili hash'i kopyalayın.",
    ],
    useCases: [
      "İndirilen dosyaların bütünlüğünü (checksum) doğrulama.",
      "Parola özeti üretimi için referans alma.",
      "Önbellek anahtarı oluşturma.",
    ],
    faq: [
      {
        q: "MD5 güvenli mi?",
        a: "Hayır, MD5 ve SHA-1 parola saklama için güvensizdir; yalnızca bütünlük kontrolünde kullanın. Parolalar için bcrypt/argon2 gibi özel algoritmalar kullanılmalıdır.",
      },
      {
        q: "Verim sunucuya gidiyor mu?",
        a: "Hayır, tüm hesaplama tarayıcınızda yapılır.",
      },
    ],
    related: ["uuid-generator", "base64-encoder", "jwt-decoder"],
  },
  {
    slug: "jwt-decoder",
    title: "JWT Çözücü",
    shortTitle: "JWT Decoder",
    description: "JWT token'larının içeriğini çözümleyin; header ve payload'u okuyun.",
    longDescription:
      "JWT Çözücü ile JSON Web Token'larını çözümleyin; başlık (header) ve yük (payload) bölümlerini okunaklı biçimde görüntüleyin. İmza doğrulaması yapmaz — bu yalnızca içerik inceleme aracıdır. Token'ın süresinin dolup dolmadığını kontrol eder ve iddiaları (claims) tablo halinde listeler.",
    category: "developer-tools",
    keywords: ["jwt decoder", "jwt çöz", "jwt decode", "token incele"],
    howTo: [
      "JWT token'ınızı kutuya yapıştırın.",
      "Header ve payload otomatik çözümlenir.",
      "Süre kontrolünü ve iddiaları inceleyin.",
    ],
    useCases: [
      "Kimlik doğrulama sorunlarında token içeriğini inceleme.",
      "Token süresinin dolup dolmadığını kontrol etme.",
      "API entegrasyonlarında iddiaları doğrulama.",
    ],
    faq: [
      {
        q: "Bu araç imzayı doğrular mı?",
        a: "Hayır, yalnızca içeriği çözer. Güvenlik açısından, çözülmüş bir token'a asla güvenilmemelidir; doğrulama sunucuda yapılmalıdır.",
      },
      {
        q: "Verim güvende mi?",
        a: "Token tarayıcınızdan dışarı gönderilmez; tüm işlem yereldir.",
      },
    ],
    related: ["base64-decoder", "hash-generator", "timestamp-converter"],
    isNew: true,
  },
  {
    slug: "cron-generator",
    title: "Cron İfadesi Oluşturucu",
    shortTitle: "Cron Generator",
    description: "Cron zamanlamalarını görsel olarak oluşturun, sonraki çalışma zamanlarını görün.",
    longDescription:
      "Cron İfadesi Oluşturucu ile sunucu görevleriniz için cron zamanlamalarını kod yazmadan oluşturun. Dakika, saat, gün, ay ve haftanın günü alanlarını seçin; araç geçerli cron ifadesini üretir ve sonraki çalışma zamanlarını gösterir. Linux crontab, Kubernetes ve çoğu bulut hizmetiyle uyumludur.",
    category: "developer-tools",
    keywords: ["cron generator", "cron ifadesi", "crontab", "zamanlama"],
    howTo: [
      "Zamanlama alanlarını (dakika, saat, gün vb.) seçin.",
      "Üretilen cron ifadesini görün.",
      "Sonraki çalışma zamanlarını kontrol edin ve ifadeyi kopyalayın.",
    ],
    useCases: [
      "Yedekleme görevlerini zamanlama.",
      "E-posta bülteni gönderimlerini planlama.",
      "Veritabanı temizlik görevlerini tanımlama.",
    ],
    faq: [
      {
        q: "Cron ifadesi hangi formatlarda üretilir?",
        a: "5 alanlı standart cron formatı (dakika saat gün ay hafta-günü) üretilir; çoğu sistemle uyumludur.",
      },
      {
        q: "Sonraki çalışma zamanları nasıl hesaplanır?",
        a: "İfadeniz çözümlenerek gelecekteki ilk 5 çalışma zamanı yerel saatinize göre gösterilir.",
      },
    ],
    related: ["timestamp-converter", "regex-tester", "uuid-generator"],
    isNew: true,
  },
];
