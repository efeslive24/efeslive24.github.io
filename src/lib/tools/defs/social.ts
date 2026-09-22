import type { ToolDef } from "../types";

export const SOCIAL_TOOLS: ToolDef[] = [
  {
    slug: "hashtag-generator",
    title: "Hashtag Oluşturucu",
    shortTitle: "Hashtag Üret",
    description: "Metninizden sosyal medya için etkili hashtag'ler üretin.",
    longDescription:
      "Hashtag Oluşturucu ile yazdığınız metinden veya anahtar kelimelerden sosyal medya gönderileriniz için hashtag'ler üretin. Kelimeler #etiket biçimine dönüştürülür; Türkçe karakterler platform dostu hale getirilir, yaygın dolgu kelimeler filtrelenir ve popülerlik bazlı öneriler eklenir. Instagram, TikTok, X ve LinkedIn gönderilerinizin görünürlüğünü artırmak için idealdir. Her şey tarayıcınızda çalışır.",
    category: "social-media-tools",
    keywords: ["hashtag üret", "etiket oluştur", "instagram etiket", "hashtag generator"],
    howTo: [
      "Gönderinizin konusunu veya anahtar kelimelerinizi yazın.",
      "Kaç hashtag istediğinizi seçin.",
      "Hashtag'ler otomatik üretilir.",
      "Kopyalayıp gönderinize yapıştırın.",
    ],
    useCases: [
      "Instagram gönderileri için etiket seti hazırlama.",
      "TikTok videolarına konu etiketi ekleme.",
      "LinkedIn içeriklerinde ilgili etiketleri kullanma.",
    ],
    faq: [
      {
        q: "Kaç hashtag kullanmalıyım?",
        a: "Platforma göre değişir: Instagram'da 5-10 etkili etiket yeterlidir; çok sayıda etiket spam olarak algılanabilir. Alakalı etiketler her zaman daha iyidir.",
      },
      {
        q: "Türkçe karakterler hashtag'de sorun olur mu?",
        a: "Çoğu platform Türkçe karakterleri destekler; araç yine de yaygın uyumluluk için sadeleştirilmiş sürümleri de üretir.",
      },
    ],
    related: ["emoji-copy", "text-sorter", "case-converter"],
    isNew: true,
  },
  {
    slug: "emoji-copy",
    title: "Emoji Kopyalama Paneli",
    shortTitle: "Emoji Kopyala",
    description: "Yüzlerce emojiyi kategorilere göre bulun, tek tıkla kopyalayın.",
    longDescription:
      "Emoji Kopyalama Paneli ile yüzlerce emojiyi kategoriler halinde tarayın, arayın ve tek tıkla panoya kopyalayın. Gülümsemeler, jestler, kalpler, hayvanlar, yiyecekler ve semboller düzenli gruplarda sunulur. Gönderilerinize, mesajlarınıza ve e-postalarınıza emoji eklemek hiç bu kadar kolay olmamıştı. Her şey tarayıcınızda çalışır; hiçbir veri gönderilmez.",
    category: "social-media-tools",
    keywords: ["emoji kopyala", "emoji paneli", "semboller", "emoji listesi"],
    howTo: [
      "Bir kategori seçin veya arama yapın.",
      "İstediğiniz emojiye tıklayın.",
      "Emoji otomatik kopyalanır.",
      "Mesajınıza veya gönderinize yapıştırın.",
    ],
    useCases: [
      "Sosyal medya gönderilerine emoji ekleme.",
      "Mesajlaşma uygulamalarında hızlı emoji kullanma.",
      "E-posta konu satırlarını renklendirme.",
    ],
    faq: [
      {
        q: "Emojiler her cihazda aynı mı görünür?",
        a: "Her platformun kendi emoji çizimi vardır; anlam aynıdır ama görünüm cihaza göre hafif değişebilir.",
      },
      {
        q: "Emoji kullanımı SEO'yu etkiler mi?",
        a: "Doğrudan değil; ancak arama sonuçlarında dikkat çekebilir. Resmî ve kurumsal içeriklerde ölçülü kullanın.",
      },
    ],
    related: ["hashtag-generator", "case-converter", "text-cleaner"],
  },
];
