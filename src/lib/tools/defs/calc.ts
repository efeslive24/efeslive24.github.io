import type { ToolDef } from "../types";

export const CALC_TOOLS: ToolDef[] = [
  {
    slug: "percentage-calculator",
    title: "Yüzde Hesaplama",
    shortTitle: "Yüzde Hesapla",
    description: "Yüzde, yüzde değişim ve pay oranını anında hesaplayın.",
    longDescription:
      "Yüzde Hesaplama aracı ile en sık ihtiyaç duyulan yüzde işlemlerini anında yapın: bir sayının yüzdesini bulma, yüzde değişim (artış/azalış) hesaplama ve bir sayının diğerine oranını yüzde olarak görme. Sonuçlar adım adım formülüyle gösterilir; böylece hesabın doğruluğunu kendiniz de kontrol edebilirsiniz. İndirimler, zamlar, not ortalamaları ve istatistikler için idealdir.",
    category: "calculators",
    keywords: ["yüzde hesaplama", "yüzde kaçı", "percentage calculator", "yüzde değişim"],
    howTo: [
      "Hesaplama türünü seçin: yüzdesini bul, değişim, oran.",
      "İlgili değerleri girin.",
      "Sonuç otomatik hesaplanır.",
      "Formül açıklamasıyla sonucu doğrulayın.",
    ],
    useCases: [
      "Maaş zammı oranını hesaplama.",
      "İndirimli fiyatın yüzde karşılığını bulma.",
      "Sınav puanının yüzdelik karşılığını görme.",
    ],
    faq: [
      {
        q: "Yüzde değişim nasıl hesaplanır?",
        a: "(Yeni Değer - Eski Değer) ÷ Eski Değer × 100 formülüyle hesaplanır. Negatif sonuç azalış, pozitif sonuç artış anlamına gelir.",
      },
      {
        q: "Verilerim kaydediliyor mu?",
        a: "Hayır, tüm hesaplamalar tarayıcınızda anlık yapılır.",
      },
    ],
    related: ["discount-calculator", "vat-calculator", "tip-calculator"],
    isPopular: true,
  },
  {
    slug: "discount-calculator",
    title: "İndirim Hesaplama",
    shortTitle: "İndirim Hesapla",
    description: "İndirimli fiyatı, tasarrufu ve indirim oranını saniyeler içinde hesaplayın.",
    longDescription:
      "İndirim Hesaplama aracı ile indirimli alışveriş hesaplarınızı anında yapın: orijinal fiyat ve indirim yüzdesinden ödenecek tutarı ve tasarrufu bulun, ya da indirimli fiyatın hangi orana denk geldiğini hesaplayın. Sezon indirimlerinde, kampanya dönemlerinde ve toplu alımlarda bütçenizi net görmenizi sağlar. Tüm hesaplama tarayıcınızda yapılır.",
    category: "calculators",
    keywords: ["indirim hesaplama", "iskonto", "indirimli fiyat", "discount calculator"],
    howTo: [
      "Orijinal fiyatı girin.",
      "İndirim yüzdesini girin.",
      "Ödenecek tutar ve tasarruf otomatik görüntülenir.",
      "İsterseniz ters yönde: indirimli fiyattan oranı bulun.",
    ],
    useCases: [
      "Sezon indirimlerinde gerçek tasarrufu görme.",
      "Mağaza ve internet fiyatlarını karşılaştırma.",
      "Toplu alım tekliflerinde pazarlık payını hesaplama.",
    ],
    faq: [
      {
        q: "%50 + %20 üst üste indirim %70 eder mi?",
        a: "Hayır. İndirimler üst üste uygulanır: 100 TL'nin %50'si 50 TL, onun %20'si düşünce 40 TL olur; yani toplam %60 indirim eder.",
      },
    ],
    related: ["percentage-calculator", "vat-calculator", "tip-calculator"],
  },
  {
    slug: "vat-calculator",
    title: "KDV Hesaplama",
    shortTitle: "KDV Hesapla",
    description: "KDV dahil ve hariç tutarları Türkiye oranlarıyla (1, 10, 20) hesaplayın.",
    longDescription:
      "KDV Hesaplama aracı ile Türkiye'de geçerli KDV oranları (1, 10, 20) üzerinden KDV dahil veya hariç tutarları hesaplayın. Fiyatın KDV'siz hali, KDV tutarı ve KDV dahil toplamı aynı anda görüntülenir; oranı serbestçe de değiştirebilirsiniz. Fatura hazırlarken, muhasebe kontrolü yaparken veya alışverişte fiyatın vergi payını öğrenmek için idealdir.",
    category: "calculators",
    keywords: ["kdv hesaplama", "kdv dahil", "kdv hariç", "vat calculator"],
    howTo: [
      "Tutarı girin.",
      "KDV oranını seçin (1, 10, 20 veya özel).",
      "\"KDV dahil\" veya \"KDV hariç\" modunu seçin.",
      "Sonuçlar otomatik hesaplanır.",
    ],
    useCases: [
      "Fatura ve fişlerde KDV tutarını kontrol etme.",
      "Ürün fiyatlandırmasında vergi dahil fiyat belirleme.",
      "Serbest meslek hesaplarında KDV planlaması.",
    ],
    faq: [
      {
        q: "Hangi ürünlerde hangi oran geçerli?",
        a: "Türkiye'de genel oran %20, bazı gıda ve hizmetlerde %10, temel gıda ve bazı ürünlerde %1 uygulanır. Güncel listeyi resmî kaynaklardan kontrol edin.",
      },
      {
        q: "KDV dahil fiyattan KDV'siz tutar nasıl bulunur?",
        a: "Tutar ÷ (1 + oran/100) formülüyle bulunur. Araç bu işlemi sizin için otomatik yapar.",
      },
    ],
    related: ["percentage-calculator", "discount-calculator", "tip-calculator"],
  },
  {
    slug: "age-calculator",
    title: "Yaş Hesaplama",
    shortTitle: "Yaş Hesapla",
    description: "Doğum tarihinizden tam yaşınızı yıl, ay ve gün olarak hesaplayın.",
    longDescription:
      "Yaş Hesaplama aracı ile doğum tarihinizden itibaren tam yaşınızı yıl, ay ve gün olarak hesaplayın. Ayrıca sonraki doğum gününüze kaç gün kaldığını, yaşadığınız toplam gün sayısını ve doğum gününüzün haftanın hangi gününe denk geldiğini görün. Yaş sınırı olan başvurular, burç ve takvim hesapları için idealdir. Hesaplama tarayıcınızda yapılır, tarihiniz kaydedilmez.",
    category: "calculators",
    keywords: ["yaş hesaplama", "kaç yaşındayım", "doğum tarihi", "age calculator"],
    howTo: [
      "Doğum tarihinizi seçin.",
      "Yaşınız yıl, ay ve gün olarak otomatik hesaplanır.",
      "Sonraki doğum gününüze kalan günü görün.",
      "Toplam yaşadığınız gün sayısını öğrenin.",
    ],
    useCases: [
      "Resmî başvurularda tam yaş gereksinimini kontrol etme.",
      "Ehliyet, emeklilik gibi yaş koşullarını hesaplama.",
      "Doğum günü planlaması için kalan günü görme.",
    ],
    faq: [
      {
        q: "Yaş hesabında artık yıllar dikkate alınıyor mu?",
        a: "Evet, hesaplama takvim tabanlıdır ve 29 Şubat dahil artık yıllar doğru işlenir.",
      },
      {
        q: "Girdiğim doğum tarihi kaydediliyor mu?",
        a: "Hayır, hesaplama tamamen tarayıcınızda yapılır; hiçbir veri gönderilmez.",
      },
    ],
    related: ["date-difference-calculator", "percentage-calculator", "timestamp-converter"],
  },
  {
    slug: "date-difference-calculator",
    title: "Tarih Farkı Hesaplama",
    shortTitle: "Tarih Farkı",
    description: "İki tarih arasındaki gün, hafta, ay ve yıl farkını hesaplayın.",
    longDescription:
      "Tarih Farkı Hesaplama aracı ile iki tarih arasındaki süreyi gün, hafta, ay ve yıl olarak hesaplayın. Ayrıca iki tarih arasındaki iş günü sayısını (hafta sonları hariç) ve tarihe gün ekleyip çıkararak yeni tarihi bulun. Proje süreleri, kira dönemleri, teslimat hesapları ve planlamalar için idealdir.",
    category: "calculators",
    keywords: ["tarih farkı", "kaç gün", "iki tarih arası", "date difference"],
    howTo: [
      "Başlangıç ve bitiş tarihlerini seçin.",
      "Fark; gün, hafta, ay ve yıl olarak görüntülenir.",
      "İş günü sayısını öğrenmek için seçeneği açın.",
      "İsterseniz tarihe gün ekleyip çıkarın.",
    ],
    useCases: [
      "Proje bitişine kalan günü hesaplama.",
      "Kira ve abonelik dönemlerini sayma.",
      "Tatil planlamasında iş günü hesabı.",
    ],
    faq: [
      {
        q: "İş günü hesabına resmî tatiller dahil mi?",
        a: "Hayır, araç yalnızca cumartesi ve pazarı hariç tutar. Resmî tatiller ülkeye göre değiştiği için manuel kontrol önerilir.",
      },
      {
        q: "Ay farkı nasıl hesaplanıyor?",
        a: "Takvim ayları üzerinden tam ay sayısı hesaplanır; kalan günler ayrıca gösterilir.",
      },
    ],
    related: ["age-calculator", "timestamp-converter", "unit-converter"],
  },
  {
    slug: "unit-converter",
    title: "Birim Çevirici",
    shortTitle: "Birim Çevir",
    description: "Uzunluk, ağırlık, sıcaklık, alan, hacim, hız ve veri birimlerini çevirin.",
    longDescription:
      "Birim Çevirici ile uzunluk, ağırlık, sıcaklık, alan, hacim, hız ve dijital veri birimlerini birbirine çevirin. Metre-feet, kilogram-pound, Celsius-Fahrenheit, litre-galon, Mbps-MB/s gibi günlük hayatta sık karşılaşılan dönüşümleri anında yapın. Yurt dışından alınan ürünlerde, tariflerde ve teknik işlerde doğru sonuç verir; tüm hesaplamalar tarayıcınızda yapılır.",
    category: "calculators",
    keywords: ["birim çevirici", "metre feet", "kg pound", "unit converter"],
    howTo: [
      "Kategoriyi seçin (uzunluk, ağırlık, sıcaklık...).",
      "Kaynak birimi ve değeri girin.",
      "Hedef birimi seçin.",
      "Sonuç anında görüntülenir.",
    ],
    useCases: [
      "Yurt dışı ürünlerdeki ölçüleri Türk birimlerine çevirme.",
      "Tariflerdeki ölçü dönüşümlerini yapma.",
      "İnternet hızı ve dosya boyutu hesapları.",
    ],
    faq: [
      {
        q: "Hangi kategoriler var?",
        a: "Uzunluk, ağırlık, sıcaklık, alan, hacim, hız ve veri (depolama). Her kategoride en yaygın birimler bulunur.",
      },
      {
        q: "Dönüşümler ne kadar hassas?",
        a: "Dönüşümler uluslararası standart katsayılarla yapılır; sonuçlar makul basamak sayısına yuvarlanır.",
      },
    ],
    related: ["fuel-cost-calculator", "date-difference-calculator", "percentage-calculator"],
    isPopular: true,
  },
  {
    slug: "fuel-cost-calculator",
    title: "Yakıt Maliyeti Hesaplama",
    shortTitle: "Yakıt Maliyeti",
    description: "Yolculuğunuzun yakıt maliyetini mesafe, tüketim ve fiyatla hesaplayın.",
    longDescription:
      "Yakıt Maliyeti Hesaplama aracı ile bir yolculuğun toplam yakıt maliyetini ve tüketilecek yakıt miktarını hesaplayın. Mesafe, aracınızın 100 km'deki tüketimi ve güncel yakıt fiyatını girin; kişi başı maliyeti de bölüşüm için görün. Yolculuk planlarken bütçe çıkarmak ve araçların tüketimini karşılaştırmak için idealdir.",
    category: "calculators",
    keywords: ["yakıt hesaplama", "mazot benzin maliyet", "yol masrafı", "fuel cost"],
    howTo: [
      "Gidilecek mesafeyi (km) girin.",
      "Aracın 100 km'deki ortalama tüketimini girin.",
      "Güncel yakıt fiyatını (TL/L) girin.",
      "Toplam maliyet ve yakıt miktarı otomatik hesaplanır.",
    ],
    useCases: [
      "Şehirler arası yolculuk bütçesi çıkarma.",
      "Araç paylaşımında kişi başı yakıt masrafı hesaplama.",
      "İki aracın yakıt maliyetini karşılaştırma.",
    ],
    faq: [
      {
        q: "Aracımın tüketimini nasıl öğrenirim?",
        a: "Yol bilgisayarındaki ortalama tüketim değerini kullanabilir veya dolu depo yöntemiyle hesaplayabilirsiniz: alınan yakıt ÷ gidilen km × 100.",
      },
      {
        q: "Güncel akaryakıt fiyatlarını nereden bulurum?",
        a: "Fiyatlar istasyona ve ile göre değişir; hesaplamada kendi bölgenizdeki güncel fiyatı girin.",
      },
    ],
    related: ["unit-converter", "percentage-calculator", "date-difference-calculator"],
  },
  {
    slug: "tip-calculator",
    title: "Bahşiş Hesaplama",
    shortTitle: "Bahşiş",
    description: "Hesabın bahşişini ve kişi başı düşen tutarı hesaplayın.",
    longDescription:
      "Bahşiş Hesaplama aracı ile restoran veya hizmet hesabının bahşişini hızla hesaplayın. Hesap tutarını, bahşiş yüzdesini ve kişi sayısını girin; bahşiş tutarı, toplam hesap ve kişi başı düşen pay anında görüntülenir. Yüzde yerine sabit tutar da girebilir, sonucu yukarı yuvarlayabilirsiniz. Grup yemeklerinde hesap bölüşümü için idealdir.",
    category: "calculators",
    keywords: ["bahşiş hesaplama", "tip calculator", "hesap bölüştürme", "kişi başı hesap"],
    howTo: [
      "Hesap tutarını girin.",
      "Bahşiş yüzdesini seçin veya sabit tutar girin.",
      "Kişi sayısını girin.",
      "Bahşiş, toplam ve kişi başı tutarlar görüntülenir.",
    ],
    useCases: [
      "Grup yemeklerinde hesabı adil bölüştürme.",
      "Farklı bahşiş oranlarını hızla karşılaştırma.",
      "Servis ücreti dahil hesaplarda net tutarı bulma.",
    ],
    faq: [
      {
        q: "Standart bahşiş oranı nedir?",
        a: "Türkiye'de yaygın uygulama %5-10 arasındadır; yurt dışında %15-20 yaygındır. Gidilen ülkenin âdetlerine göre seçim yapın.",
      },
      {
        q: "Yuvarlama ne işe yarar?",
        a: "Kişi başı tutarı veya toplamı yukarı yuvarlayarak pratik, bozuk parasız ödeme yapmanızı sağlar.",
      },
    ],
    related: ["percentage-calculator", "discount-calculator", "vat-calculator"],
  },
];
