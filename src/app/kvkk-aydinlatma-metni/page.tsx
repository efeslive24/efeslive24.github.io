import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/legal-layout";
import { SITE_NAME, SITE_URL, CONTACT_EMAIL } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description: `${SITE_NAME} KVKK aydınlatma metni: 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri işleme faaliyetleri.`,
  alternates: { canonical: `${SITE_URL}/kvkk-aydinlatma-metni/` },
};

export default function KvkkPage() {
  return (
    <LegalLayout
      title="KVKK Aydınlatma Metni"
      updated="22 Eylül 2026"
      sections={[
        {
          heading: "1. Veri Sorumlusu",
          body: (
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;) uyarınca,
              kişisel verileriniz veri sorumlusu sıfatıyla {SITE_NAME} tarafından aşağıda
              açıklanan kapsamda işlenebilir.
            </p>
          ),
        },
        {
          heading: "2. İşlenen Kişisel Veriler",
          body: (
            <p>
              Sitemizde üyelik sistemi bulunmamaktadır ve araç kullanımı sırasında girdiğiniz
              içerikler tarafımızca toplanmaz. Yalnızca şu veriler işlenebilir:
            </p>
          ),
        },
        {
          heading: "3. İşleme Amaçları",
          body: (
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Hizmetin güvenli ve kesintisiz sunulması (KVKK m. 5/2-f: meşru menfaat)</li>
              <li>Bize ilettiğiniz taleplerin yanıtlanması (KVKK m. 5/2-ç, f)</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi (KVKK m. 5/2-ç)</li>
            </ul>
          ),
        },
        {
          heading: "4. Aktarım",
          body: (
            <p>
              Kişisel verileriniz yurt dışına aktarılmaz. Hizmet altyapısı nedeniyle yurt
              dışı kaynaklı bir barındırma sağlayıcısı kullanılması halinde, KVKK m. 9
              kapsamında gerekli güvenceler sağlanır.
            </p>
          ),
        },
        {
          heading: "5. Haklarınız (KVKK m. 11)",
          body: (
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme</li>
              <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
              <li>Silinmesini veya yok edilmesini isteme</li>
              <li>Otomatik sistemlerle analiz sonucu aleyhinize bir sonuç çıkmasına itiraz etme</li>
              <li>Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
            </ul>
          ),
        },
        {
          heading: "6. Başvuru",
          body: (
            <p>
              Taleplerinizi{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-600 underline">
                {CONTACT_EMAIL}
              </a>{" "}
              adresine iletebilirsiniz. Başvurular en geç 30 gün içinde ücretsiz olarak
              sonuçlandırılır (işlemin ayrıca maliyet gerektirmesi hâlinde KVKK m. 13 uyarınca
              ücret alınabilir).
            </p>
          ),
        },
      ]}
    />
  );
}
