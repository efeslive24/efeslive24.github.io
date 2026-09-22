import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/legal-layout";
import { SITE_NAME, SITE_URL, CONTACT_EMAIL } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Reklam Politikası",
  description: `${SITE_NAME} reklam politikası: reklam yerleşimi ilkeleri ve reklam hizmetlerinin kullanımı.`,
  alternates: { canonical: `${SITE_URL}/reklam-politikasi/` },
};

export default function AdvertisingPolicyPage() {
  return (
    <LegalLayout
      title="Reklam Politikası"
      updated="22 Eylül 2026"
      sections={[
        {
          heading: "1. Reklam Kullanımı",
          body: (
            <p>
              Sitemizin ücretsiz kalabilmesi için sınırlı ve ölçülü reklam alanları
              kullanılabilir. Reklamlar, araçların çalışmasını veya içeriğin okunmasını
              engellemeyecek şekilde yerleştirilir.
            </p>
          ),
        },
        {
          heading: "2. Yerleşim İlkeleri",
          body: (
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Reklamlar içeriği gizlemez, üzerine bindirilmez.</li>
              <li>Yanlış tıklamaya neden olacak aldatıcı yerleşimler kullanılmaz.</li>
              <li>Araç sonuçları ile reklam arasında net görsel ayrım bulunur.</li>
              <li>Otomatik ses/video oynatan veya izinsiz indirme başlatan reklam formatları kullanılmaz.</li>
            </ul>
          ),
        },
        {
          heading: "3. Üçüncü Taraf Sağlayıcılar",
          body: (
            <p>
              Reklam hizmetleri (ör. Google AdSense) etkinleştirildiğinde, sağlayıcılar
              ilgi alanına dayalı reklam göstermek için çerez kullanabilir. Bu çerezler
              hakkında ayrıntılı bilgi için Çerez Politikası&apos;na ve ilgili sağlayıcının
              politikalarına bakınız.
            </p>
          ),
        },
        {
          heading: "4. Yapay Trafik Yasağı",
          body: (
            <p>
              Reklam gelirini artırmak amacıyla bot trafik, sahte tıklama veya gösterim
              oluşturmak, tıklama teşviki sunmak ve benzeri yöntemler kesinlikle yasaktır ve
              reklam sağlayıcılarının politikalarına aykırıdır.
            </p>
          ),
        },
        {
          heading: "5. Sorularınız",
          body: (
            <p>
              Reklam politikası hakkında sorularınız için:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-600 underline">
                {CONTACT_EMAIL}
              </a>
            </p>
          ),
        },
      ]}
    />
  );
}
