import type { ToolDef } from "../types";

export const PDF_TOOLS: ToolDef[] = [
  {
    slug: "pdf-merge",
    title: "PDF Birleştirici",
    shortTitle: "PDF Birleştir",
    description: "Birden fazla PDF dosyasını ücretsiz birleştirin; dosyalar cihazınızdan çıkmaz.",
    longDescription:
      "PDF Birleştirici ile birden fazla PDF dosyasını tek bir belgede birleştirin. Dosyaların sırasını sürükleyerek değiştirin, tek tıkla birleştirin ve indirin. Tüm işlem tarayıcınızda gerçekleşir; belgeleriniz hiçbir sunucuya yüklenmez, bu sayede sözleşmeler ve özel belgeler gibi hassas dosyalar için de güvenlidir. Raporları, faturaları veya ders notlarını tek PDF'te toplamak için idealdir.",
    category: "pdf-tools",
    keywords: ["pdf birleştir", "pdf merge", "pdf birleştirme", "pdf tek dosya"],
    howTo: [
      "Birleştirmek istediğiniz PDF dosyalarını seçin veya sürükleyin.",
      "Dosyaları istediğiniz sıraya getirin.",
      "\"PDF'leri Birleştir\" düğmesine basın.",
      "Oluşan tek PDF dosyasını indirin.",
    ],
    useCases: [
      "Farklı dönem faturalarını tek dosyada arşivleme.",
      "Sözleşme ve eklerini tek belgede toplama.",
      "Ders notlarını ve sunumları birleştirme.",
    ],
    faq: [
      {
        q: "Birleştirme sırasında kalite kaybı olur mu?",
        a: "Hayır, sayfalar olduğu gibi aktarılır; içerik ve çözünürlük korunur.",
      },
      {
        q: "Kaç dosya birleştirebilirim?",
        a: "Tarayıcınızın belleği elverdiği sürece dilediğiniz kadar dosya ekleyebilirsiniz. Büyük belgeler için dosya sayısını makul tutmanız önerilir.",
      },
      {
        q: "Dosyalarım sunucuya yükleniyor mu?",
        a: "Hayır. Birleştirme tamamen tarayıcınızda yapılır, dosyalarınız cihazınızdan çıkmaz.",
      },
    ],
    related: ["pdf-split", "pdf-extract", "pdf-compress"],
    isPopular: true,
  },
  {
    slug: "pdf-split",
    title: "PDF Bölücü",
    shortTitle: "PDF Böl",
    description: "Çok sayfalı PDF'i tek sayfalık dosyalara veya istediğiniz aralıklara bölün.",
    longDescription:
      "PDF Bölücü ile çok sayfalı bir PDF'i ayrı dosyalara ayırın. Her sayfayı tek tek indirebilir veya belirli sayfa aralıklarını ayrı PDF dosyaları olarak kaydedebilirsiniz. İşlem tarayıcınızda gerçekleştiği için belgeniz hiçbir sunucuya gönderilmez. Uzun bir raporun yalnızca ilgili bölümünü paylaşmak veya taranmış bir belgeyi sayfalara ayırmak için kullanın.",
    category: "pdf-tools",
    keywords: ["pdf böl", "pdf split", "pdf ayır", "sayfa ayır"],
    howTo: [
      "Bölmek istediğiniz PDF dosyasını yükleyin.",
      "Bölme modunu seçin: her sayfa ayrı dosya veya özel aralıklar.",
      "Aralık modunda sayfa aralıklarını girin (örn. 1-3, 5).",
      "İşlemi başlatın ve oluşan dosyaları indirin.",
    ],
    useCases: [
      "Uzun raporun yalnızca ilgili sayfalarını paylaşma.",
      "Taranmış belgeyi tek sayfalık dosyalara ayırma.",
      "Sözleşmenin imzalı sayfasını ayrı kaydetme.",
    ],
    faq: [
      {
        q: "Hangi bölme seçenekleri var?",
        a: "Her sayfayı ayrı dosyaya bölebilir veya \"1-3, 7\" gibi özel aralıklar tanımlayabilirsiniz.",
      },
      {
        q: "Bölme işlemi orijinal dosyayı etkiler mi?",
        a: "Hayır, orijinal dosya değişmez; bölünen parçalar yeni dosyalar olarak indirilir.",
      },
    ],
    related: ["pdf-merge", "pdf-extract", "pdf-rotate"],
  },
  {
    slug: "pdf-compress",
    title: "PDF Sıkıştırıcı",
    shortTitle: "PDF Sıkıştır",
    description: "PDF dosyanızın boyutunu küçültün; e-postaya sığsın, hızlı yüklensin.",
    longDescription:
      "PDF Sıkıştırıcı ile PDF dosyanızın boyutunu küçültün. İki yöntem sunulur: \"Hafif Optimizasyon\" metni ve kaliteyi koruyarak dosya yapısını sadeleştirir; \"Güçlü Sıkıştırma\" sayfaları görüntüye dönüştürerek özellikle taranmış belgelerde çok daha küçük boyut sağlar (bu modda metin artık aranamaz). Tüm işlem tarayıcınızda gerçekleşir, dosyanız hiçbir sunucuya yüklenmez.",
    category: "pdf-tools",
    keywords: ["pdf sıkıştır", "pdf boyut küçültme", "pdf compress", "pdf küçült"],
    howTo: [
      "Sıkıştırmak istediğiniz PDF'i yükleyin.",
      "Sıkıştırma modunu seçin: Hafif veya Güçlü.",
      "Güçlü modda görüntü kalitesini ayarlayın.",
      "Sıkıştırılmış dosyayı indirin ve boyut farkını görün.",
    ],
    useCases: [
      "E-posta ek limitine takılan belgeleri küçültme.",
      "Web sitesine yüklenen katalog ve broşürleri hafifletme.",
      "Arşiv alanından tasarruf etme.",
    ],
    faq: [
      {
        q: "Sıkıştırma kaliteyi düşürür mü?",
        a: "Hafif optimizasyon kaliteyi korur. Güçlü sıkıştırma sayfaları görüntüye çevirdiği için metin keskinliği azalabilir ve metin aranamaz hale gelir; taranmış belgeler için idealdir.",
      },
      {
        q: "Dosya boyutu neden bazen küçülmez?",
        a: "Zaten optimize edilmiş veya tamamen metinden oluşan küçük dosyalarda kazanç sınırlı olabilir. En iyi sonuç taranmış veya görsel ağırlıklı PDF'lerde alınır.",
      },
      {
        q: "Dosyam güvende mi?",
        a: "Evet, sıkıştırma tamamen tarayıcınızda yapılır; dosyanız hiçbir sunucuya gönderilmez.",
      },
    ],
    related: ["pdf-merge", "pdf-to-jpg", "image-compress"],
    isNew: true,
  },
  {
    slug: "pdf-to-jpg",
    title: "PDF → JPG Dönüştürücü",
    shortTitle: "PDF → JPG",
    description: "PDF sayfalarını yüksek kaliteli JPG görüntülere dönüştürün.",
    longDescription:
      "PDF → JPG Dönüştürücü ile PDF'inizin her sayfasını ayrı bir JPG görüntüsüne dönüştürün. Sayfa başına kalite ve çözünürlük seçebilir, istediğiniz sayfaları indirebilirsiniz. Dönüştürme tarayıcınızda gerçekleşir; belgeniz hiçbir sunucuya yüklenmez. Sunum görselleri hazırlamak, belgeyi sosyal medyada paylaşmak veya PDF açamayan programlarda sayfayı göstermek için idealdir.",
    category: "pdf-tools",
    keywords: ["pdf jpg", "pdf görüntüye çevir", "pdf to jpg", "pdf sayfa resim"],
    howTo: [
      "PDF dosyanızı yükleyin.",
      "Dönüştürmek istediğiniz sayfaları seçin.",
      "Kalite ve ölçek ayarını yapın.",
      "Sayfaları JPG olarak indirin.",
    ],
    useCases: [
      "PDF içindeki bir sayfayı sosyal medyada paylaşma.",
      "Belge sayfasını web sitesinde görsel olarak kullanma.",
      "PDF desteklemeyen bir programa görüntü aktarma.",
    ],
    faq: [
      {
        q: "Tüm sayfalar tek seferde dönüşür mü?",
        a: "Evet, tüm sayfaları tek seferde dönüştürebilir veya yalnızca seçtiğiniz sayfaları indirebilirsiniz.",
      },
      {
        q: "Görüntü kalitesini nasıl artırırım?",
        a: "Ölçek değerini artırın (örn. 2x) ve kaliteyi yüksek seçin; çıktı boyutu buna bağlı olarak büyür.",
      },
    ],
    related: ["jpg-to-pdf", "pdf-compress", "pdf-extract"],
  },
  {
    slug: "jpg-to-pdf",
    title: "JPG → PDF Dönüştürücü",
    shortTitle: "JPG → PDF",
    description: "JPG görüntülerinizi tek bir PDF belgesine dönüştürün.",
    longDescription:
      "JPG → PDF Dönüştürücü ile JPG, PNG veya WebP görüntülerinizi tek bir PDF belgesine dönüştürün. Sayfa boyutunu (A4, Letter veya görüntü boyutu) ve yönü seçin, görüntü sırasını ayarlayın. Dönüştürme tamamen tarayıcınızda yapılır; görüntüleriniz hiçbir sunucuya yüklenmez. Fatura fotoğraflarını, taranmış belgeleri veya ekran görüntülerini PDF'te toplamak için idealdir.",
    category: "pdf-tools",
    keywords: ["jpg pdf", "resmi pdf yap", "jpg to pdf", "fotoğraf pdf"],
    howTo: [
      "PDF'e dönüştürmek istediğiniz görüntüleri seçin.",
      "Görüntü sırasını düzenleyin.",
      "Sayfa boyutu ve yönünü seçin.",
      "PDF'i oluşturun ve indirin.",
    ],
    useCases: [
      "Telefonla çekilen belge fotoğraflarını PDF'e çevirme.",
      "Ekran görüntülerini tek belgede toplama.",
      "Portfolyo veya katalog görsellerini PDF yapma.",
    ],
    faq: [
      {
        q: "Hangi formatlar destekleniyor?",
        a: "JPG, PNG ve WebP görüntülerini PDF'e dönüştürebilirsiniz.",
      },
      {
        q: "A4 boyutuna sığmayan görüntüler ne olur?",
        a: "Görüntüler sayfaya orantılı şekilde sığdırılır. \"Görüntü Boyutu\" seçeneğiyle her sayfanın görüntünün kendi boyutunda olmasını sağlayabilirsiniz.",
      },
    ],
    related: ["pdf-to-jpg", "image-convert", "pdf-merge"],
  },
  {
    slug: "pdf-rotate",
    title: "PDF Döndürücü",
    shortTitle: "PDF Döndür",
    description: "PDF sayfalarını 90°, 180° veya 270° döndürün ve yeni dosya olarak kaydedin.",
    longDescription:
      "PDF Döndürücü ile yanlış yönlenmiş PDF sayfalarını düzeltin. Tüm sayfaları birden veya yalnızca seçtiğiniz sayfaları 90°, 180° veya 270° döndürebilirsiniz. İşlem tarayıcınızda gerçekleşir, dosyanız hiçbir sunucuya yüklenmez. Taranmış belgelerdeki yatay sayfaları düzeltmek için idealdir.",
    category: "pdf-tools",
    keywords: ["pdf döndür", "pdf rotate", "pdf sayfa çevir", "pdf yön değiştir"],
    howTo: [
      "PDF dosyanızı yükleyin.",
      "Döndürmek istediğiniz sayfaları seçin (veya tümü).",
      "Döndürme açısını seçin: 90°, 180° veya 270°.",
      "Döndürülmüş PDF'i indirin.",
    ],
    useCases: [
      "Tarayıcıda yan dönen sayfaları düzeltme.",
      "Yatay tabloları okunabilir hale getirme.",
      "Sunum PDF'lerinde sayfa yönünü birleştirme.",
    ],
    faq: [
      {
        q: "Döndürme kalıcı olarak kaydedilir mi?",
        a: "Evet, döndürme işlemi yeni dosyaya kaydedilir; indirdiğiniz PDF düzeltilmiş yönde açılır.",
      },
      {
        q: "Tek tek sayfa döndürebilir miyim?",
        a: "Evet, \"Tümü\" veya belirli sayfalar (örn. 2, 4-6) seçeneklerinden birini kullanabilirsiniz.",
      },
    ],
    related: ["pdf-extract", "pdf-split", "pdf-merge"],
  },
  {
    slug: "pdf-extract",
    title: "PDF Sayfa Çıkarıcı",
    shortTitle: "Sayfa Çıkar",
    description: "PDF'ten istediğiniz sayfaları çıkarıp yeni bir PDF dosyası oluşturun.",
    longDescription:
      "PDF Sayfa Çıkarıcı ile büyük bir PDF'ten yalnızca ihtiyacınız olan sayfaları çıkarın ve yeni bir dosya oluşturun. \"2-5\" veya \"1, 3, 7\" gibi aralıklar girerek seçiminizi yapın. İşlem tamamen tarayıcınızda gerçekleşir; belgeniz hiçbir sunucuya yüklenmez. Uzun bir rapordan özet bölümü paylaşmak için idealdir.",
    category: "pdf-tools",
    keywords: ["pdf sayfa çıkar", "pdf extract", "pdf sayfa seç", "pdf parça"],
    howTo: [
      "PDF dosyanızı yükleyin.",
      "Çıkarmak istediğiniz sayfa numaralarını girin (örn. 2-5, 9).",
      "\"Sayfaları Çıkar\" düğmesine basın.",
      "Yeni PDF'i indirin.",
    ],
    useCases: [
      "Raporun yalnızca sonuç bölümünü paylaşma.",
      "Sözleşmenin belirli maddelerini ayrı kaydetme.",
      "Kitaptan tek bir bölümü çıkarma.",
    ],
    faq: [
      {
        q: "Sayfa numaralarını nasıl yazmalıyım?",
        a: "Virgülle ayırarak tek sayfaları, tire ile aralıkları belirtin: \"1, 3, 5-8\" gibi.",
      },
      {
        q: "Çıkarılan sayfalar orijinalden silinir mi?",
        a: "Hayır, orijinal dosyanız değişmez; seçtiğiniz sayfalardan yeni bir PDF oluşturulur.",
      },
    ],
    related: ["pdf-split", "pdf-rotate", "pdf-merge"],
  },
  {
    slug: "pdf-metadata",
    title: "PDF Metadata Görüntüleyici",
    shortTitle: "PDF Metadata",
    description: "PDF'in başlık, yazar, anahtar kelime ve tarih bilgilerini görüntüleyin ve düzenleyin.",
    longDescription:
      "PDF Metadata Görüntüleyici ile bir PDF dosyasının başlık, yazar, konu, anahtar kelime, üretici ve oluşturulma/değiştirilme tarihi gibi bilgilerini görüntüleyin. İsterseniz bu bilgileri düzenleyip yeni dosya olarak kaydedebilirsiniz. Doğru metadata, PDF'inizin arama motorlarında ve doküman yönetim sistemlerinde daha iyi listelenmesini sağlar. İşlem tamamen tarayıcınızda yapılır.",
    category: "pdf-tools",
    keywords: ["pdf metadata", "pdf bilgi", "pdf başlık yazar", "pdf özellik"],
    howTo: [
      "PDF dosyanızı yükleyin.",
      "Mevcut metadata bilgilerini inceleyin.",
      "Dilerseniz alanları düzenleyin.",
      "Güncellenmiş PDF'i indirin.",
    ],
    useCases: [
      "Web sitesine yüklenen PDF'lerin SEO bilgilerini düzeltme.",
      "Kurumsal belgelerde yazar ve başlık bilgisi ekleme.",
      "Bir PDF'in hangi programla oluşturulduğunu tespit etme.",
    ],
    faq: [
      {
        q: "Metadata nedir?",
        a: "Metadata, dosyanın içine gömülü başlık, yazar, tarih gibi tanımlayıcı bilgilerdir. Dosya içeriğini etkilemez.",
      },
      {
        q: "Düzenleme orijinal dosyayı değiştirir mi?",
        a: "Hayır, düzenlemeleriniz yeni bir PDF dosyası olarak kaydedilir.",
      },
    ],
    related: ["pdf-compress", "image-metadata", "pdf-merge"],
  },
];
