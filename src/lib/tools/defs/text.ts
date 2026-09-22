import type { ToolDef } from "../types";

export const TEXT_TOOLS: ToolDef[] = [
  {
    slug: "word-counter",
    title: "Kelime Sayacı",
    shortTitle: "Kelime Sayacı",
    description: "Metninizdeki kelime, karakter, cümle ve paragraf sayısını anında hesaplayın.",
    longDescription:
      "Kelime Sayacı ile bir metindeki kelime, karakter (boşluksuz ve boşluklu), cümle, paragraf ve satır sayısını anında öğrenin. Ödev, makale, blog yazısı, tweet veya sosyal medya gönderisi hazırlarken karakter sınırlarına uyup uymadığınızı kolayca kontrol edin. Tüm işlem tarayıcınızda gerçekleşir; metniniz hiçbir sunucuya gönderilmez.",
    category: "text-tools",
    keywords: ["kelime sayacı", "karakter sayacı", "word counter", "kaç kelime"],
    howTo: [
      "Metninizi üstteki kutuya yapıştırın veya yazın.",
      "Kelime, karakter, cümle ve paragraf sayıları anında güncellenir.",
      "İsterseniz 'Temizle' düğmesiyle kutuyu boşaltın.",
    ],
    useCases: [
      "Ödev veya makale yazarken minimum kelime sayısına ulaştığınızı kontrol etme.",
      "Tweet (280), Instagram (2.200) gibi karakter sınırlarına uyum sağlama.",
      "SEO içeriklerinde hedef kelime sayısını takip etme.",
    ],
    faq: [
      {
        q: "Kelime sayacı ücretsiz mi?",
        a: "Evet, tamamen ücretsizdir ve kayıt gerektirmez.",
      },
      {
        q: "Metnim sunucuya gönderiliyor mu?",
        a: "Hayır. Tüm sayım işlemi tarayıcınızda gerçekleşir, metniniz cihazınızdan çıkmaz.",
      },
      {
        q: "Türkçe karakterler doğru sayılıyor mu?",
        a: "Evet, ı, ğ, ü, ş, ö, ç gibi Türkçe karakterler doğru şekilde sayılır.",
      },
    ],
    related: ["character-counter", "case-converter", "text-cleaner", "text-sorter"],
    isPopular: true,
  },
  {
    slug: "character-counter",
    title: "Karakter Sayacı",
    shortTitle: "Karakter Sayacı",
    description: "Boşluklu ve boşluksuz karakter sayısını, satır ve kelime sayısını hesaplayın.",
    longDescription:
      "Karakter Sayacı, metninizdeki karakter sayısını boşluklu ve boşluksuz olarak ayrı ayrı gösterir. Twitter/X, SMS, meta açıklama, başlık etiketi veya uygulama formları gibi karakter sınırı olan alanlar için metninizin uzunluğunu hızlıca doğrulayın. Metniniz tamamen cihazınızda işlenir.",
    category: "text-tools",
    keywords: ["karakter sayacı", "kaç karakter", "character counter", "harf sayısı"],
    howTo: [
      "Metninizi kutuya yapıştırın veya yazın.",
      "Boşluklu, boşluksuz karakter, kelime ve satır sayıları anında görüntülenir.",
      "Belirli bir sınır için ilerleme çubuğunu takip edin.",
    ],
    useCases: [
      "Meta description'ları 155-160 karakter sınırında tutma.",
      "SMS mesajlarını 160 karakterlik dilimlere göre planlama.",
      "Başvuru formlarındaki karakter sınırlarını kontrol etme.",
    ],
    faq: [
      {
        q: "Boşluklar karakter sayılır mı?",
        a: "Araç her ikisini de ayrı gösterir: boşluklu ve boşluksuz karakter sayısı.",
      },
      {
        q: "Emoji karakter olarak sayılır mı?",
        a: "Evet, emojiler de karakter olarak sayılır. Bazı platformlar emojileri 2 karakter sayar; araç Unicode kod noktası bazında sayım yapar.",
      },
    ],
    related: ["word-counter", "text-cleaner", "case-converter"],
    isPopular: true,
  },
  {
    slug: "case-converter",
    title: "Büyük/Küçük Harf Dönüştürücü",
    shortTitle: "Harf Dönüştürücü",
    description: "Metni büyük harf, küçük harf, Başlık Düzeni ve daha fazlasına dönüştürün.",
    longDescription:
      "Büyük/Küçük Harf Dönüştürücü ile metninizi BÜYÜK HARF, küçük harf, Başlık Düzeni, cümle düzeni, camelCase, snake_case ve kebab-case gibi formatlara tek tıkla dönüştürün. Türkçe karakterleri (İ, ı, ğ, ş) doğru işler. Programlama, SEO başlıkları veya belge düzenleme için idealdir.",
    category: "text-tools",
    keywords: ["büyük küçük harf", "case converter", "uppercase", "lowercase", "title case"],
    howTo: [
      "Metninizi kutuya yapıştırın.",
      "İstediğiniz dönüşüm türünü seçin (BÜYÜK, küçük, Başlık Düzeni vb.).",
      "Sonucu kopyalayın veya indirin.",
    ],
    useCases: [
      "Yanlışlıkla büyük harfle yazılmış metinleri düzeltme.",
      "Blog başlıklarını Title Case formatına getirme.",
      "Kod yazarken değişken adlarını camelCase veya snake_case'e çevirme.",
    ],
    faq: [
      {
        q: "Türkçe İ ve ı harfleri doğru dönüşür mü?",
        a: "Evet. Dönüştürücü Türkçe karakter kurallarına (İ↔i, I↔ı) göre çalışır.",
      },
      {
        q: "Title Case nedir?",
        a: "Her kelimenin ilk harfinin büyük, kalanının küçük yazıldığı başlık düzenidir.",
      },
    ],
    related: ["text-cleaner", "word-counter", "text-sorter"],
  },
  {
    slug: "text-cleaner",
    title: "Metin Temizleyici",
    shortTitle: "Metin Temizleyici",
    description: "Fazla boşlukları, boş satırları ve kopyala-yapıştır kaynaklı kirliliği temizleyin.",
    longDescription:
      "Metin Temizleyici, PDF'lerden veya web sayfalarından kopyaladığınız metinlerdeki fazla boşlukları, boş satırları, sekmeleri ve özel karakterleri temizler. Satır sonu tirelemelerini birleştirme, HTML etiketlerini kaldırma gibi seçeneklerle metninizi saniyeler içinde temiz ve kullanılabilir hale getirin.",
    category: "text-tools",
    keywords: ["metin temizleme", "fazla boşluk sil", "text cleaner", "metin düzenleme"],
    howTo: [
      "Kirli metninizi kutuya yapıştırın.",
      "Uygulamak istediğiniz temizleme seçeneklerini işaretleyin.",
      "'Metni Temizle' düğmesine tıklayın ve sonucu kopyalayın.",
    ],
    useCases: [
      "PDF'ten kopyalanan bozuk satır yapısını düzeltme.",
      "E-posta veya sohbetten alınan metni yayına hazırlama.",
      "HTML içinden düz metin çıkarma.",
    ],
    faq: [
      {
        q: "Hangi temizleme seçenekleri var?",
        a: "Fazla boşlukları tek boşluğa indirme, boş satırları silme, satır başı/sonundaki boşlukları alma, HTML etiketlerini kaldırma ve daha fazlası.",
      },
      {
        q: "Metnim kaybolur mu?",
        a: "Hayır, temizleme işlemi yalnızca kutu içeriğini düzenler; işlemi tekrarlayabilir veya yeni metin yapıştırabilirsiniz.",
      },
    ],
    related: ["duplicate-line-remover", "text-sorter", "case-converter"],
  },
  {
    slug: "duplicate-line-remover",
    title: "Yinelenen Satır Temizleyici",
    shortTitle: "Tekrar Satır Sil",
    description: "Listelerinizdeki yinelenen satırları kaldırın veya yalnızca tekrarları bulun.",
    longDescription:
      "Yinelenen Satır Temizleyici, listelerinizdeki (e-posta, anahtar kelime, URL, telefon numarası vb.) tekrar eden satırları saniyeler içinde kaldırır. Büyük/küçük harf duyarlılığını ve boşlukları yok sayma seçenekleriyle tam kontrol sağlar. Sonucu sıralı veya orijinal sırada alabilirsiniz.",
    category: "text-tools",
    keywords: ["tekrar satır sil", "duplicate remover", "yinelenen satır", "duplicate line"],
    howTo: [
      "Listenizi kutuya yapıştırın (her satır bir kayıt).",
      "Büyük/küçük harf ve boşluk seçeneklerini belirleyin.",
      "Sonucu kopyalayın veya indirin.",
    ],
    useCases: [
      "E-posta listelerinden mükerrer kayıtları ayıklama.",
      "Anahtar kelime listelerini benzersizleştirme.",
      "İki veri kümesini birleştirirken tekrarları temizleme.",
    ],
    faq: [
      {
        q: "Büyük/küçük harf farkı dikkate alınır mı?",
        a: "İsteğe bağlıdır; seçeneği kapatarak 'Ali' ve 'ali' satırlarını aynı kabul edebilirsiniz.",
      },
      {
        q: "Kaç satır desteklenir?",
        a: "Tarayıcınızın belleği elverdiği sürece binlerce satır işlenebilir.",
      },
    ],
    related: ["text-sorter", "text-cleaner", "word-counter"],
  },
  {
    slug: "text-sorter",
    title: "Metin Sıralayıcı",
    shortTitle: "Metin Sıralayıcı",
    description: "Satırlarınızı alfabetik (A-Z, Z-A) veya sayısal olarak sıralayın.",
    longDescription:
      "Metin Sıralayıcı ile listenizdeki satırları alfabetik olarak A'dan Z'ye veya Z'den A'ya, sayısal değere göre ya da uzunluğa göre sıralayın. Türkçe alfabe kurallarına uygun sıralama desteklenir. Adlar, ürün listeleri, anahtar kelimeler ve daha fazlası için idealdir.",
    category: "text-tools",
    keywords: ["metin sıralama", "alfabetik sırala", "sort lines", "liste sıralama"],
    howTo: [
      "Sıralamak istediğiniz satırları kutuya yapıştırın.",
      "Sıralama ölçütünü ve yönünü seçin.",
      "Sonucu kopyalayın veya indirin.",
    ],
    useCases: [
      "İsim ve öğrenci listelerini alfabetik sıralama.",
      "Sayısal veri listelerini büyükten küçüğe dizme.",
      "URL listelerini düzenleme.",
    ],
    faq: [
      {
        q: "Türkçe karakterler doğru sıralanır mı?",
        a: "Evet, sıralama Türkçe yerel ayarlarına (locale) göre yapılır; ç, ğ, ı, ö, ş, ü doğru konumlanır.",
      },
      {
        q: "Sayılar metin olarak mı sıralanır?",
        a: "Sayısal sıralama seçildiğinde '9' yerine '10' büyük sayılır (doğal sayısal sıralama).",
      },
    ],
    related: ["duplicate-line-remover", "text-cleaner", "case-converter"],
  },
  {
    slug: "text-diff",
    title: "Metin Karşılaştırıcı (Diff)",
    shortTitle: "Metin Diff",
    description: "İki metni karşılaştırın; eklenen ve silinen satırları renkli olarak görün.",
    longDescription:
      "Metin Karşılaştırıcı ile iki metin sürümünü yan yana karşılaştırın. Eklenen satırlar yeşil, silinen satırlar kırmızı olarak işaretlenir; değişen kelimeler vurgulanır. Sözleşme revizyonları, kod değişiklikleri veya belge sürümleri arasındaki farkları saniyeler içinde bulun.",
    category: "text-tools",
    keywords: ["metin karşılaştırma", "text diff", "fark bul", "compare text"],
    howTo: [
      "Orijinal metni sol kutuya, yeni sürümü sağ kutuya yapıştırın.",
      "'Karşılaştır' düğmesine tıklayın.",
      "Satır bazlı farkları renkli olarak inceleyin.",
    ],
    useCases: [
      "Sözleşme veya rapor revizyonlarında neyin değiştiğini görme.",
      "Kod parçacıklarının iki sürümünü karşılaştırma.",
      "Ödev veya makale düzeltmelerini takip etme.",
    ],
    faq: [
      {
        q: "Karşılaştırma nasıl yapılır?",
        a: "Satır ve kelime bazında; eklenen içerik yeşil, silinen içerik kırmızı ile gösterilir.",
      },
      {
        q: "Büyük metinler desteklenir mi?",
        a: "Evet, ancak çok büyük metinlerde (100 bin+ satır) tarayıcı performansı düşebilir.",
      },
    ],
    related: ["duplicate-line-remover", "text-cleaner", "json-validator"],
    isNew: true,
  },
  {
    slug: "lorem-ipsum-generator",
    title: "Lorem Ipsum Üretici",
    shortTitle: "Lorem Ipsum",
    description: "Tasarımlarınız için belirli sayıda paragraf, cümle veya kelime üretin.",
    longDescription:
      "Lorem Ipsum Üretici ile tasarım ve yerleşim çalışmalarınız için istediğiniz sayıda paragraf, cümle veya kelime üretin. Web sitesi, broşür, poster veya uygulama taslağı hazırlarken içerik yerine anlamlı olmayan dolgu metni kullanarak tipografi ve düzeni gerçekçi şekilde test edin.",
    category: "text-tools",
    keywords: ["lorem ipsum", "dolgu metni", "placeholder text", "tasarım metni"],
    howTo: [
      "Üretmek istediğiniz birimi (paragraf, cümle, kelime) ve miktarı seçin.",
      "'Üret' düğmesine tıklayın.",
      "Metni kopyalayıp tasarımınıza yapıştırın.",
    ],
    useCases: [
      "Web sitesi taslağında içerik düzenini test etme.",
      "Broşür veya katalog mizanpajında tipografi kontrolü.",
      "Yazı tipi seçiminde görsel karşılaştırma.",
    ],
    faq: [
      {
        q: "Lorem Ipsum nedir?",
        a: "MÖ 1. yüzyıla ait bir Latince metinden türetilmiş, içerik anlamı taşımayan standart dolgu metnidir. Tasarımda okuyucunun içeriğe değil düzene odaklanmasını sağlar.",
      },
      {
        q: "SEO için lorem ipsum kullanılmalı mı?",
        a: "Hayır, yayındaki sitelerde gerçek içerik kullanılmalıdır. Lorem Ipsum yalnızca tasarım aşaması içindir.",
      },
    ],
    related: ["word-counter", "text-cleaner", "case-converter"],
    isNew: true,
  },
];
