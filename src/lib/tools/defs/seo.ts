import type { ToolDef } from "../types";

export const SEO_TOOLS: ToolDef[] = [
  {
    slug: "meta-tag-generator",
    title: "Meta Tag Oluşturucu",
    shortTitle: "Meta Tag",
    description: "Sayfanız için title, description ve meta etiketlerini ücretsiz oluşturun.",
    longDescription:
      "Meta Tag Oluşturucu ile web sayfanız için title, meta description, keywords ve robots meta etiketlerini doğru uzunluklarda oluşturun. Karakter sayacı sayesinde Google'da kesilmeden görünen başlık ve açıklamalar yazın; hazır kodu kopyalayıp sayfanızın <head> bölümüne yapıştırın. Arama sonuçlarında tıklama oranını artırmak için güçlü başlıklar yazmanıza yardımcı olur.",
    category: "seo-tools",
    keywords: ["meta tag", "meta description", "title tag", "seo etiketleri"],
    howTo: [
      "Sayfa başlığınızı yazın; uzunluk göstergesini takip edin.",
      "Açıklamanızı yazın (50-160 karakter önerilir).",
      "İsteğe bağlı anahtar kelimeler ve robots ayarlarını seçin.",
      "Oluşan HTML kodunu kopyalayıp sitenize yapıştırın.",
    ],
    useCases: [
      "Yeni bir blog yazısı için meta etiket hazırlama.",
      "Arama sonuçlarında görünen başlığı optimize etme.",
      "Sayfanın indekslenme kurallarını belirleme.",
    ],
    faq: [
      {
        q: "Title ve description ne kadar uzun olmalı?",
        a: "Title için 50-60 karakter, description için 140-160 karakter önerilir. Uzun içerikler arama sonuçlarında kesilir.",
      },
      {
        q: "Keywords meta etiketi hâlâ önemli mi?",
        a: "Google keywords etiketini sıralama sinyali olarak kullanmaz. Yine de bazı iç arama sistemleri için eklenebilir; asıl önemli olan title ve description'dır.",
      },
    ],
    related: ["open-graph-generator", "canonical-generator", "sitemap-generator"],
    isPopular: true,
  },
  {
    slug: "open-graph-generator",
    title: "Open Graph Oluşturucu",
    shortTitle: "Open Graph",
    description: "Sosyal medya paylaşım önizlemeleri için OG ve Twitter Card etiketleri üretin.",
    longDescription:
      "Open Graph Oluşturucu ile sayfanız sosyal medyada paylaşıldığında görünen önizlemeyi kontrol eden OG ve Twitter Card etiketlerini oluşturun. Başlık, açıklama, görsel, site adı ve tür gibi alanları doldurun; Facebook, X, LinkedIn ve WhatsApp için hazır kodu kopyalayın. Doğru OG etiketleri paylaşımlarınızın profesyonel görünmesini ve tıklama almasını sağlar.",
    category: "seo-tools",
    keywords: ["open graph", "og tags", "twitter card", "sosyal medya önizleme"],
    howTo: [
      "Sayfa başlığı, açıklama ve URL'yi girin.",
      "Önizleme görselinin URL'sini ekleyin (1200×630 önerilir).",
      "İçerik türünü seçin (website, article...).",
      "Kodu kopyalayıp sayfanızın <head> bölümüne ekleyin.",
    ],
    useCases: [
      "Blog yazılarının sosyal medya önizlemesini hazırlama.",
      "Ürün sayfaları için paylaşım kartı oluşturma.",
      "WhatsApp'ta zengin önizleme gösterilmesini sağlama.",
    ],
    faq: [
      {
        q: "OG etiketleri SEO'yu etkiler mi?",
        a: "Doğrudan sıralamayı etkilemez ama paylaşımların tıklanma oranını artırarak dolaylı trafik sağlar.",
      },
      {
        q: "Görsel boyutu neden önemli?",
        a: "Çoğu platform 1200×630 piksel önerir. Küçük görseller bulanık veya hiç gösterilmeyebilir.",
      },
      {
        q: "Etiketlerin çalıştığını nasıl kontrol ederim?",
        a: "Facebook Paylaşım Hata Ayıklayıcı veya X Card Validator gibi resmi araçlarla test edebilirsiniz.",
      },
    ],
    related: ["meta-tag-generator", "canonical-generator", "favicon-generator"],
  },
  {
    slug: "robots-txt-generator",
    title: "Robots.txt Oluşturucu",
    shortTitle: "Robots.txt",
    description: "Arama motoru tarama kurallarınızı içeren robots.txt dosyası oluşturun.",
    longDescription:
      "Robots.txt Oluşturucu ile sitenizin arama motoru tarama kurallarını belirleyen robots.txt dosyasını oluşturun. Hangi botların hangi bölümlere erişeceğini seçin, sitemap adresinizi ekleyin ve dosyayı indirin. Kuralları dikkatli belirleyin: yanlış bir kural, sitenizin arama sonuçlarından çıkmasına neden olabilir. Dosyayı sitenizin kök dizinine (example.com/robots.txt) yükleyin.",
    category: "seo-tools",
    keywords: ["robots.txt", "robots oluştur", "tarama kuralı", "robots generator"],
    howTo: [
      "Tüm botlar veya belirli botlar için kurallar seçin.",
      "Engellenecek veya izin verilecek yolları yazın.",
      "Sitemap adresinizi ekleyin.",
      "Oluşan dosyayı indirin ve sitenizin kök dizinine yükleyin.",
    ],
    useCases: [
      "Yönetim paneli gibi özel alanları taramadan gizleme.",
      "Yeni sitelerde sitemap adresini botlara bildirme.",
      "Belirli bir arama motorunun taramasını sınırlama.",
    ],
    faq: [
      {
        q: "robots.txt engellemesi gizlilik sağlar mı?",
        a: "Hayır. Kurallara uyan botlar için bir yönergedir; sayfalar yine de doğrudan ziyaret edilebilir. Gizli içerik için şifre koruması gerekir.",
      },
      {
        q: "Dosyayı nereye yüklemeliyim?",
        a: "Sitenizin kök dizinine: örn. https://site.com/robots.txt adresinden erişilebilir olmalıdır.",
      },
    ],
    related: ["sitemap-generator", "meta-tag-generator", "canonical-generator"],
  },
  {
    slug: "sitemap-generator",
    title: "Sitemap Oluşturucu",
    shortTitle: "Sitemap Üret",
    description: "URL listesinden XML sitemap oluşturun; arama motorlarına gönderin.",
    longDescription:
      "Sitemap Oluşturucu ile sitenizin URL'lerinden standartlara uygun bir XML sitemap oluşturun. URL'leri tek tek veya toplu yapıştırın; her sayfaya öncelik ve değişiklik sıklığı atayın. Oluşan dosyayı indirip sitenize yükleyin ve Google Search Console'dan gönderin. Sitemap, arama motorlarının sayfalarınızı keşfetmesini hızlandırır.",
    category: "seo-tools",
    keywords: ["sitemap oluştur", "xml sitemap", "site haritası", "sitemap generator"],
    howTo: [
      "Site URL'lerinizi her satıra bir tane olacak şekilde yapıştırın.",
      "Her URL için öncelik ve değişiklik sıklığı belirleyin (opsiyonel).",
      "XML sitemap'i oluşturun.",
      "Dosyayı indirin ve sitenizin kök dizinine yükleyin.",
    ],
    useCases: [
      "Yeni bir sitenin tüm sayfalarını botlara bildirme.",
      "Statik siteler için sitemap hazırlama.",
      "Yeniden tasarlanan sitenin yeni URL yapısını duyurma.",
    ],
    faq: [
      {
        q: "Sitemap'e kaç URL eklenebilir?",
        a: "Bir sitemap dosyası en fazla 50.000 URL ve 50 MB olabilir. Daha fazlası için birden çok dosya ve sitemap index kullanılır.",
      },
      {
        q: "Sitemap sıralamamı yükseltir mi?",
        a: "Doğrudan değil; ancak sayfaların keşfedilme hızını artırarak içeriğinizin daha çabuk dizine girmesini sağlar.",
      },
    ],
    related: ["robots-txt-generator", "canonical-generator", "url-encoder"],
  },
  {
    slug: "canonical-generator",
    title: "Canonical Etiket Oluşturucu",
    shortTitle: "Canonical",
    description: "Yinelenen içerik sorunlarını önlemek için canonical etiketi üretin.",
    longDescription:
      "Canonical Etiket Oluşturucu ile sayfalarınızın tercih edilen (kanonik) sürümünü arama motorlarına bildiren etiketi oluşturun. Aynı içeriğe farklı URL'lerden ulaşılabiliyorsa (parametreli URL'ler, http/https, www farkı) canonical etiketi hangi adresin esas olduğunu belirtir. Sayfa başına tek bir canonical etiketi kullanın ve mutlak URL yazın.",
    category: "seo-tools",
    keywords: ["canonical", "canonical tag", "yinelenen içerik", "rel canonical"],
    howTo: [
      "Sayfanızın tercih edilen (kanonik) URL'sini girin.",
      "İsteğe bağlı olarak dil veya mobil alternatiflerini ekleyin.",
      "Oluşan etiketi kopyalayın.",
      "Sayfanızın <head> bölümüne yerleştirin.",
    ],
    useCases: [
      "Parametreli URL'lerde (utm, sıralama) esas sayfayı belirtme.",
      "www'li ve www'suz sürümlerden birini seçme.",
      "Aynı ürünün farklı kategori yollarındaki kopyalarını birleştirme.",
    ],
    faq: [
      {
        q: "Canonical etiketi ne işe yarar?",
        a: "Arama motoruna \"bu sayfanın esas kopyası şu adrestedir\" der; böylece yinelenen içerik sinyalleri tek sayfada toplanır.",
      },
      {
        q: "Kendine referans veren canonical doğru mu?",
        a: "Evet, her sayfada kendi URL'sini gösteren canonical etiketi olması iyi bir uygulamadır.",
      },
    ],
    related: ["meta-tag-generator", "open-graph-generator", "redirect-checker"],
  },
];
