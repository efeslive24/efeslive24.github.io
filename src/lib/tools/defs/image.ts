import type { ToolDef } from "../types";

export const IMAGE_TOOLS: ToolDef[] = [
  {
    slug: "image-compress",
    title: "Görsel Sıkıştırıcı",
    shortTitle: "Görsel Sıkıştır",
    description: "JPG, PNG ve WebP görsellerinizi kaliteyi seçerek küçültün.",
    longDescription:
      "Görsel Sıkıştırıcı ile JPG, PNG ve WebP görsellerinizin dosya boyutunu küçültün. Kalite seviyesini ayarlayın, sıkıştırma öncesi ve sonrası boyutu anında karşılaştırın. Sıkıştırma tamamen tarayıcınızda yapılır; görselleriniz hiçbir sunucuya yüklenmez. Web sitesi performansı için görselleri optimize etmek, e-posta ek limitine takılmamak ve depolama alanı kazanmak için idealdir.",
    category: "image-tools",
    keywords: ["görsel sıkıştır", "resim boyut küçültme", "image compress", "fotoğraf küçült"],
    howTo: [
      "Görselinizi yükleyin (JPG, PNG veya WebP).",
      "Kalite seviyesini kaydırıcı ile ayarlayın.",
      "Önizlemede sıkıştırılmış hali inceleyin.",
      "Görseli indirin; boyut tasarrufu ekranda gösterilir.",
    ],
    useCases: [
      "Web sitesine yüklenen görselleri hafifletme.",
      "E-posta ekine sığmayan fotoğrafları küçültme.",
      "Sosyal medya yüklemelerini hızlandırma.",
    ],
    faq: [
      {
        q: "Kalite düştüğünde görsel bozulur mu?",
        a: "Kalite seviyesi düştükçe dosya küçülür ama ince ayrıntılarda kayıp oluşabilir. Önizleme ile sonucu indirmeden kontrol edebilirsiniz.",
      },
      {
        q: "Görselim sunucuya yükleniyor mu?",
        a: "Hayır, sıkıştırma tamamen tarayıcınızda yapılır.",
      },
      {
        q: "PNG sıkıştırması JPG'den farklı mı?",
        a: "Evet. PNG kayıpsız formattır; şeffaflığı korumak istiyorsanız WebP veya PNG çıktısı seçin, fotoğraflar için JPG en küçük sonucu verir.",
      },
    ],
    related: ["image-resize", "image-convert", "pdf-compress"],
    isPopular: true,
  },
  {
    slug: "image-resize",
    title: "Görsel Boyutlandırıcı",
    shortTitle: "Boyutlandır",
    description: "Görsellerinizi piksel veya yüzde olarak yeniden boyutlandırın.",
    longDescription:
      "Görsel Boyutlandırıcı ile görsellerinizi piksel veya yüzde cinsinden yeniden boyutlandırın. En-boy oranını koruyarak veya serbestçe değiştirin; yaygın hazır boyutları (1080p, kare, thumbnail) tek tıkla uygulayın. İşlem tarayıcınızda yapılır, görseliniz hiçbir sunucuya yüklenmez. Profil fotoğrafları, ürün görselleri ve web bannerları için idealdir.",
    category: "image-tools",
    keywords: ["görsel boyutlandır", "resim yeniden boyutlandır", "image resize", "fotoğraf boyutu"],
    howTo: [
      "Görselinizi yükleyin.",
      "Yeni genişlik/yükseklik girin veya yüzde seçin.",
      "En-boy oranını kilitleyip kilitlememeyi seçin.",
      "Yeniden boyutlandırılmış görseli indirin.",
    ],
    useCases: [
      "Profil ve kapak fotoğraflarını platform boyutlarına uydurma.",
      "Web sitesi için küçük thumbnail üretme.",
      "Baskıya gönderilecek görselleri büyütme.",
    ],
    faq: [
      {
        q: "Görsel büyütülürse kalite düşer mi?",
        a: "Evet, görseli orijinalinden büyük yapmak keskinliği azaltabilir. Küçültme işleminde kalite kaybı çok daha azdır.",
      },
      {
        q: "En-boy oranı kilidi ne işe yarar?",
        a: "Kilit açıkken bir kenarı değiştirdiğinizde diğeri otomatik hesaplanır, böylece görsel bozulmaz.",
      },
    ],
    related: ["image-compress", "image-convert", "favicon-generator"],
  },
  {
    slug: "image-convert",
    title: "Görsel Format Dönüştürücü",
    shortTitle: "Format Dönüştür",
    description: "JPG, PNG ve WebP arasında tek tıkla dönüşüm yapın.",
    longDescription:
      "Görsel Format Dönüştürücü ile JPG, PNG ve WebP formatları arasında dönüşüm yapın. PNG'ye dönüştürürken şeffaflık korunur; WebP, web için en küçük dosya boyutunu sunar; JPG fotoğraflar için yaygın tercihtir. Dönüşüm tamamen tarayıcınızda gerçekleşir, görseliniz hiçbir sunucuya yüklenmez. Farklı platformların format zorunluluklarına uyum için idealdir.",
    category: "image-tools",
    keywords: ["jpg png", "png webp", "format dönüştür", "image converter"],
    howTo: [
      "Görselinizi yükleyin.",
      "Hedef formatı seçin: JPG, PNG veya WebP.",
      "Kaliteyi (JPG/WebP için) ayarlayın.",
      "Dönüştürülmüş görseli indirin.",
    ],
    useCases: [
      "Web sitesi için görselleri WebP'ye çevirme.",
      "Şeffaf arka plan gerektiren görselleri PNG yapma.",
      "Uyumsuz format nedeniyle açılmayan görselleri düzeltme.",
    ],
    faq: [
      {
        q: "Hangi dönüşümler destekleniyor?",
        a: "JPG → PNG, JPG → WebP, PNG → JPG, PNG → WebP, WebP → JPG ve WebP → PNG; hepsi tek araçta.",
      },
      {
        q: "Şeffaflık korunur mu?",
        a: "PNG ve WebP şeffaflığı destekler. JPG desteklemediği için şeffaf alanlar beyaz arka planla doldurulur.",
      },
    ],
    related: ["image-compress", "image-resize", "image-metadata"],
  },
  {
    slug: "favicon-generator",
    title: "Favicon Oluşturucu",
    shortTitle: "Favicon Üret",
    description: "Görselinizden tüm boyutlarda favicon seti ve ICO dosyası üretin.",
    longDescription:
      "Favicon Oluşturucu ile görselinizden web siteniz için eksiksiz bir favicon seti üretin: 16×16'dan 512×512'ye tüm yaygın boyutlarda PNG'ler, tek dosyada çoklu boyut içeren ICO dosyası ve site manifestinize ekleyebileceğiniz hazır kod parçası. Tarayıcı sekmelerinde, mobil kısayollarda ve yer imlerinde sitenizin logosu düzgün görünür. İşlem tamamen tarayıcınızda yapılır.",
    category: "image-tools",
    keywords: ["favicon oluştur", "favicon generator", "site ikonu", "ico dosyası"],
    howTo: [
      "Logo veya görselinizi yükleyin (kare görsel önerilir).",
      "Arka plan ve yuvarlatma seçeneklerini ayarlayın.",
      "Favicon setini oluşturun.",
      "PNG'leri, ICO dosyasını ve HTML kodunu indirin.",
    ],
    useCases: [
      "Yeni bir web sitesi için favicon seti hazırlama.",
      "Mevcut faviconu yüksek çözünürlüklü setle yenileme.",
      "PWA manifesti için ikon üretme.",
    ],
    faq: [
      {
        q: "Favicon için en uygun görsel nedir?",
        a: "Kare (1:1) ve mümkünse basit tasarımlı bir görsel en iyi sonucu verir; küçük boyutlarda karmaşık detaylar kaybolur.",
      },
      {
        q: "ICO dosyası ne işe yarar?",
        a: "ICO, birden fazla boyutu tek dosyada taşıyan klasik favicon formatıdır; eski tarayıcılar ve masaüstü kısayolları için gereklidir.",
      },
    ],
    related: ["image-resize", "image-convert", "meta-tag-generator"],
    isNew: true,
  },
  {
    slug: "color-palette",
    title: "Renk Paleti Çıkarıcı",
    shortTitle: "Renk Paleti",
    description: "Görselinizden baskın renkleri çıkarıp hex kodu paleti oluşturun.",
    longDescription:
      "Renk Paleti Çıkarıcı ile herhangi bir görselden baskın renkleri analiz edin ve hex kodlu bir palet oluşturun. 4-10 arası renk sayısı seçebilir, renkleri kopyalayabilir veya paleti metin olarak indirebilirsiniz. Analiz tamamen tarayıcınızda yapılır. Marka renkleri çıkarmak, web tasarımında uyumlu palet bulmak ve fotoğraftan renk ilhamı almak için idealdir.",
    category: "image-tools",
    keywords: ["renk paleti", "görselden renk", "color palette", "hex kod"],
    howTo: [
      "Görselinizi yükleyin.",
      "Paletteki renk sayısını seçin (4-10).",
      "Paleti oluşturun.",
      "Renk kodlarını kopyalayın veya indirin.",
    ],
    useCases: [
      "Logo ve marka materyallerinden ana renkleri çıkarma.",
      "Web sitesi tasarımında görselle uyumlu palet oluşturma.",
      "Fotoğraftan ilham alarak renk şeması belirleme.",
    ],
    faq: [
      {
        q: "Renkler nasıl belirleniyor?",
        a: "Görselin pikselleri analiz edilir ve en baskın renk grupları matematiksel bir algoritmayla (median cut) belirlenir.",
      },
      {
        q: "Görselim yükleniyor mu?",
        a: "Hayır, analiz tamamen tarayıcınızda yapılır.",
      },
    ],
    related: ["image-compress", "image-metadata", "image-convert"],
    isPopular: true,
  },
  {
    slug: "image-metadata",
    title: "Görsel Metadata Görüntüleyici",
    shortTitle: "Görsel Metadata",
    description: "Fotoğrafınızın EXIF, boyut, format ve çekim bilgilerini görüntüleyin.",
    longDescription:
      "Görsel Metadata Görüntüleyici ile bir görselin EXIF bilgilerini görüntüleyin: kamera modeli, lens, çekim tarihi, enstantane, diyafram, ISO, GPS koordinatları, boyutlar ve dosya bilgileri. İşlem tamamen tarayıcınızda yapılır; fotoğrafınız hiçbir sunucuya yüklenmez. Fotoğrafın hangi ayarlarla çekildiğini öğrenmek veya bir görselin kaynağını doğrulamak için idealdir.",
    category: "image-tools",
    keywords: ["exif görüntüle", "fotoğraf bilgisi", "image metadata", "kamera ayarları"],
    howTo: [
      "Görselinizi yükleyin.",
      "EXIF ve dosya bilgilerini inceleyin.",
      "İsterseniz bilgileri metin olarak kopyalayın.",
    ],
    useCases: [
      "Bir fotoğrafın hangi kamerayla çekildiğini öğrenme.",
      "Çekim ayarlarını inceleyerek fotoğrafçılık öğrenme.",
      "Görselin çözünürlük ve formatını doğrulama.",
    ],
    faq: [
      {
        q: "Neden bazı görsellerde EXIF bilgisi yok?",
        a: "Sosyal medya platformları ve bazı programlar kaydederken EXIF bilgisini siler. Ayrıca ekran görüntülerinde genellikle bulunmaz.",
      },
      {
        q: "GPS bilgim görünür mü?",
        a: "Yalnızca siz yüklerseniz ve fotoğrafta GPS kaydı varsa görünür; bilgiler tarayıcınızdan çıkmaz ve hiçbir yere kaydedilmez.",
      },
    ],
    related: ["color-palette", "pdf-metadata", "image-convert"],
  },
  {
    slug: "image-mirror",
    title: "Görsel Aynalayıcı",
    shortTitle: "Aynala",
    description: "Görsellerinizi yatay veya dikey olarak çevirin.",
    longDescription:
      "Görsel Aynalayıcı ile görsellerinizi yatay (sağ-sol) veya dikey (alt-üst) çevirin. Selfie'lerde yazıların düzeltilmesi, simetrik kompozisyon denemeleri ve baskı öncesi son düzeltmeler için kullanışlıdır. İşlem tamamen tarayıcınızda yapılır, görseliniz hiçbir sunucuya yüklenmez.",
    category: "image-tools",
    keywords: ["görsel aynala", "resim çevir", "flip image", "yatay çevir"],
    howTo: [
      "Görselinizi yükleyin.",
      "Yatay veya dikey çevirme seçin.",
      "Önizlemeyi kontrol edin.",
      "Çevrilmiş görseli indirin.",
    ],
    useCases: [
      "Selfie'lerde ters görünen yazıları düzeltme.",
      "Logo ve ikonları yönüne göre hizalama.",
      "Simetrik kompozisyon çalışmaları yapma.",
    ],
    faq: [
      {
        q: "Çevirme kaliteyi etkiler mi?",
        a: "Hayır, çevirme piksel kaybı olmadan yapılır.",
      },
      {
        q: "Şeffaf PNG'ler desteklenir mi?",
        a: "Evet, şeffaflık korunur.",
      },
    ],
    related: ["image-resize", "image-convert", "image-compress"],
  },
  {
    slug: "image-rotate-tool",
    title: "Görsel Döndürücü",
    shortTitle: "Görsel Döndür",
    description: "Görsellerinizi 90° adımlarla veya serbest açıyla döndürün.",
    longDescription:
      "Görsel Döndürücü ile görsellerinizi 90°, 180°, 270° döndürün veya serbest açı verin. Telefonla çekilmiş yan dönük fotoğrafları düzeltmek, hafif eğik taramaları hizalamak için idealdir. İşlem tamamen tarayıcınızda yapılır, görseliniz hiçbir sunucuya yüklenmez.",
    category: "image-tools",
    keywords: ["görsel döndür", "resim çevir", "rotate image", "fotoğraf düzelt"],
    howTo: [
      "Görselinizi yükleyin.",
      "Döndürme açısını seçin veya girin.",
      "Önizlemeyi kontrol edin.",
      "Döndürülmüş görseli indirin.",
    ],
    useCases: [
      "Telefonla çekilen yan dönük fotoğrafları düzeltme.",
      "Hafif eğik taramaları hizalama.",
      "Tasarım çalışmalarında görseli açılı yerleştirme.",
    ],
    faq: [
      {
        q: "Serbest açıyla döndürme kaliteyi düşürür mü?",
        a: "90° katları kayıpsızdır. Serbest açılar yeniden örnekleme gerektirdiği için hafif yumuşama olabilir; boşluklar şeffaf (PNG) veya beyaz (JPG) kalır.",
      },
    ],
    related: ["image-mirror", "image-resize", "image-convert"],
  },
  {
    slug: "image-crop",
    title: "Görsel Kırpıcı",
    shortTitle: "Kırp",
    description: "Görsellerinizi kare, 4:3, 16:9 gibi oranlarda veya serbestçe kırpın.",
    longDescription:
      "Görsel Kırpıcı ile görsellerinizi serbestçe veya hazır oranlarda (kare, 4:3, 16:9, 3:2) kırpın. Fazla alanları kaldırın, kompozisyonu iyileştirin ve sosyal medya boyutlarına uygun hale getirin. İşlem tamamen tarayıcınızda yapılır, görseliniz hiçbir sunucuya yüklenmez.",
    category: "image-tools",
    keywords: ["görsel kırp", "resim kes", "crop image", "fotoğraf kırpma"],
    howTo: [
      "Görselinizi yükleyin.",
      "Kırpma oranını seçin (veya serbest).",
      "Kırpma alanını sürükleyerek ayarlayın.",
      "Kırpılmış görseli indirin.",
    ],
    useCases: [
      "Profil fotoğraflarını kareye getirme.",
      "Ürün fotoğraflarında fazla arka planı kaldırma.",
      "Sosyal medya gönderilerini platform oranlarına uydurma.",
    ],
    faq: [
      {
        q: "Oran seçersem görsel bozulur mu?",
        a: "Hayır, kırpma yalnızca alan seçimidir; görsel uzatılmaz veya sıkıştırılmaz.",
      },
    ],
    related: ["image-resize", "image-rotate-tool", "image-mirror"],
  },
];
