import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/legal-layout";
import { SITE_NAME, SITE_URL, CONTACT_EMAIL } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Telif Hakkı Politikası",
  description: `${SITE_NAME} telif hakkı politikası: DMCA ve FSEK kapsamında hak ihlali bildirim süreci.`,
  alternates: { canonical: `${SITE_URL}/telif-hakki-politikasi/` },
};

export default function CopyrightPage() {
  return (
    <LegalLayout
      title="Telif Hakkı Politikası"
      updated="22 Eylül 2026"
      sections={[
        {
          heading: "1. İçerik Sahipliği",
          body: (
            <p>
              Sitemizdeki tüm özgün içerikler, tasarım, logo ve kodlar aksi belirtilmedikçe{" "}
              {SITE_NAME}&apos;e aittir. Açık kaynak bileşenler kendi lisans koşullarına tabidir.
            </p>
          ),
        },
        {
          heading: "2. Kullanıcı İçerikleri",
          body: (
            <p>
              Araçlarımızla işlediğiniz dosya ve metinler yalnızca sizin sorumluluğunuzdadır.
              Başkalarına ait telif hakkıyla korunan eserleri, hak sahibinin izni olmadan
              işlemek veya dağıtmak yasaktır.
            </p>
          ),
        },
        {
          heading: "3. Hak İhlali Bildirimi",
          body: (
            <p>
              Telif hakkınıza konu bir eserin sitemizde izinsiz kullanıldığını düşünüyorsanız,{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-600 underline">
                {CONTACT_EMAIL}
              </a>{" "}
              adresine şu bilgileri içeren bir bildirim gönderin:
            </p>
          ),
        },
        {
          heading: "4. Bildirimde Bulunması Gerekenler",
          body: (
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Hak sahibinin veya yetkili temsilcisinin imzası (elektronik imza kabul edilir)</li>
              <li>İhlal edildiği iddia edilen eserin tanımı ve konumu (URL)</li>
              <li>İletişim bilgileriniz (ad, adres, e-posta)</li>
              <li>Kullanımın hak sahibi tarafından yetkilendirilmediğine dair iyi niyet beyanı</li>
              <li>Bildirimdeki bilgilerin doğru olduğuna dair beyan</li>
            </ul>
          ),
        },
        {
          heading: "5. İşlem Süreci",
          body: (
            <p>
              Geçerli bildirimler incelenir ve uygun görülen durumlarda içerik kaldırılır.
              Haksız veya kötü niyetli bildirimlerden bildirimi yapan taraf sorumludur.
            </p>
          ),
        },
      ]}
    />
  );
}
