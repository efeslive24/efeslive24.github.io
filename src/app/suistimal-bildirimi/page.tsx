import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/legal-layout";
import { SITE_NAME, SITE_URL, CONTACT_EMAIL } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Suistimal Bildirimi",
  description: `${SITE_NAME} suistimal bildirim süreci: kötüye kullanım ve zararlı içeriklerin raporlanması.`,
  alternates: { canonical: `${SITE_URL}/suistimal-bildirimi/` },
};

export default function AbuseReportPage() {
  return (
    <LegalLayout
      title="Suistimal Bildirimi"
      updated="22 Eylül 2026"
      sections={[
        {
          heading: "1. Neler Bildirilebilir?",
          body: (
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Zararlı, yasa dışı veya aldatıcı içerik barındıran bağlantılar</li>
              <li>Kimlik avı (phishing) veya dolandırıcılık amaçlı kullanım</li>
              <li>Telif hakkı ihlali (bkz. Telif Hakkı Politikası)</li>
              <li>Hizmeti bozmayı amaçlayan otomatik saldırılar</li>
              <li>Küçüklerin korunmasına aykırı içerikler</li>
            </ul>
          ),
        },
        {
          heading: "2. Bildirim Nasıl Yapılır?",
          body: (
            <p>
              Bildiriminizi{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-600 underline">
                {CONTACT_EMAIL}
              </a>{" "}
              adresine, mümkünse şu bilgilerle birlikte gönderin: olayın açıklaması, ilgili
              URL veya araç adı, tarih/saat ve iletişim bilgileriniz.
            </p>
          ),
        },
        {
          heading: "3. Değerlendirme",
          body: (
            <p>
              Bildirimler öncelik sırasına göre incelenir. Doğrulanan suistimallerde gerekli
              teknik önlemler alınır (erişim engelleme, oran sınırlama vb.). Yanıt süresi,
              bildirimin ciddiyetine ve yoğunluğa göre değişebilir.
            </p>
          ),
        },
        {
          heading: "4. İyi Niyet",
          body: (
            <p>
              Suistimal bildirimi kötü niyetle (rakip engelleme vb.) kullanılamaz. Haksız
              bildirimlerden bildirimi yapan taraf hukuken sorumlu olabilir.
            </p>
          ),
        },
      ]}
    />
  );
}
