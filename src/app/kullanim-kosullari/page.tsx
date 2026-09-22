import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/legal-layout";
import { SITE_NAME, SITE_URL } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Kullanım Koşulları",
  description: `${SITE_NAME} kullanım koşulları: hizmetin kapsamı, kullanıcı yükümlülükleri ve sorumluluk sınırları.`,
  alternates: { canonical: `${SITE_URL}/kullanim-kosullari/` },
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Kullanım Koşulları"
      updated="22 Eylül 2026"
      sections={[
        {
          heading: "1. Hizmetin Kapsamı",
          body: (
            <p>
              {SITE_NAME}, çeşitli çevrimiçi araçları ücretsiz olarak sunar. Araçlar
              &ldquo;olduğu gibi&rdquo; (as-is) sağlanır; kesintisiz veya hatasız çalışacağına
              dair garanti verilmez.
            </p>
          ),
        },
        {
          heading: "2. Kabul Edilebilir Kullanım",
          body: (
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Araçları yalnızca yasal amaçlarla kullanabilirsiniz.</li>
              <li>Hizmeti kötüye kullanmak, aşırı yüklemek veya diğer kullanıcılara zarar
                vermeye çalışmak yasaktır.</li>
              <li>Telif hakkı ihlali içeren, yasa dışı veya üçüncü kişilerin haklarını
                ihlal eden içerikler işlemek yasaktır.</li>
              <li>Otomatik araçlarla (bot) hizmete erişim, makul kullanım sınırlarını
                aşmamak kaydıyla değerlendirilir; kötüye kullanım tespitinde erişim
                engellenebilir.</li>
            </ul>
          ),
        },
        {
          heading: "3. Fikri Mülkiyet",
          body: (
            <p>
              Sitenin tasarımı, logosu ve özgün içerikleri {SITE_NAME}&apos;e aittir. Araçlarla
              ürettiğiniz çıktıların (QR kod, dönüştürülmüş dosya vb.) tüm hakları size
              aittir.
            </p>
          ),
        },
        {
          heading: "4. Sorumluluğun Sınırlandırılması",
          body: (
            <p>
              Araçların kullanımından doğan sonuçlardan (yanlış hesaplama, veri kaybı vb.)
              yürürlükteki hukukun izin verdiği en geniş ölçüde sorumlu değiliz. Kritik
              işlemler için sonuçları bağımsız olarak doğrulamanız önerilir. Araçlar
              profesyonel hukuk, finans veya tıp danışmanlığı yerine geçmez.
            </p>
          ),
        },
        {
          heading: "5. Değişiklikler",
          body: (
            <p>
              Koşullar zaman içinde güncellenebilir. Güncel sürüm her zaman bu sayfada
              yayımlanır.
            </p>
          ),
        },
        {
          heading: "6. Uygulanacak Hukuk",
          body: (
            <p>
              Bu koşullar Türkiye Cumhuriyeti kanunlarına tabidir. Uyuşmazlıklarda Türk
              mahkemeleri yetkilidir.
            </p>
          ),
        },
      ]}
    />
  );
}
