import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/legal-layout";
import { SITE_NAME, SITE_URL, CONTACT_EMAIL } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: `${SITE_NAME} gizlilik politikası: verilerinizin nasıl işlendiği, nelerin toplanmadığı ve haklarınız hakkında bilgi.`,
  alternates: { canonical: `${SITE_URL}/gizlilik-politikasi/` },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Gizlilik Politikası"
      updated="22 Eylül 2026"
      sections={[
        {
          heading: "1. Genel Bakış",
          body: (
            <>
              <p>
                {SITE_NAME} olarak gizliliğinize önem veriyoruz. Bu politika, sitemizi
                kullanırken kişisel verilerinizin nasıl işlendiğini açıklar.
              </p>
              <p>
                Sitemizin temel tasarım ilkesi <strong>veri minimizasyonudur</strong>:
                araçlarımızın büyük çoğunluğu tamamen tarayıcınızda çalışır. Yüklediğiniz
                dosyalar, yapıştırdığınız metinler ve oluşturduğunuz içerikler
                <strong> cihazınızdan ayrılmaz ve sunucularımıza gönderilmez</strong>.
              </p>
            </>
          ),
        },
        {
          heading: "2. Topladığımız Bilgiler",
          body: (
            <>
              <p>Aşağıdaki durumlarda sınırlı veri işlenebilir:</p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>
                  <strong>Sunucu günlükleri:</strong> Barındırma sağlayıcımız, web
                  sunucularının standart çalışması gereği IP adresi, tarayıcı türü, işletim
                  sistemi ve erişim zamanı gibi teknik günlük kayıtları tutabilir.
                </li>
                <li>
                  <strong>İletişim bilgileri:</strong> Bize e-posta gönderdiğinizde, yalnızca
                  talebinizi yanıtlamak için gerekli bilgileri işleriz.
                </li>
                <li>
                  <strong>İstatistikler:</strong> Varsa, gizlilik dostu bir analiz aracıyla
                  sayfa görüntüleme gibi toplu (anonim) istatistikler toplanabilir. Bu veriler
                  sizi kişisel olarak tanımlamaz.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "3. Toplamadığımız Bilgiler",
          body: (
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Araçlara girdiğiniz metinler, dosyalar ve içerikler</li>
              <li>QR kodlarınıza gömdüğünüz Wi-Fi şifreleri, iletişim bilgileri</li>
              <li>Dönüştürdüğünüz veya sıkıştırdığınız görseller ve PDF’ler</li>
              <li>Hesap, parola veya ödeme bilgileri (üyelik sistemi yoktur)</li>
            </ul>
          ),
        },
        {
          heading: "4. Çerezler",
          body: (
            <p>
              Sitemiz temel işlevselliği için çerez kullanmaz. Yalnızca reklam veya analiz
              hizmetleri etkinleştirildiğinde ilgili üçüncü taraf çerezleri kullanılabilir.
              Ayrıntılar için <a href="/cerez-politikasi/" className="text-brand-600 underline">Çerez Politikası</a> sayfamıza bakınız.
            </p>
          ),
        },
        {
          heading: "5. Verilerin Paylaşımı",
          body: (
            <p>
              Kişisel verilerinizi satmayız. Veriler yalnızca (a) hizmetin sağlanması için
              zorunlu olan altyapı sağlayıcılarıyla, (b) yasal yükümlülükler gerektirdiğinde
              yetkili mercilerle paylaşılabilir.
            </p>
          ),
        },
        {
          heading: "6. Veri Güvenliği",
          body: (
            <p>
              Site trafiği HTTPS ile şifrelenir. Araçların tarayıcıda çalışması, hassas
              içeriklerin aktarım sırasında ele geçirilme riskini büyük ölçüde ortadan
              kaldırır.
            </p>
          ),
        },
        {
          heading: "7. Haklarınız (KVKK ve GDPR)",
          body: (
            <p>
              6698 sayılı KVKK kapsamında; verilerinizin işlenip işlenmediğini öğrenme,
              düzeltilmesini veya silinmesini isteme, işlemeye itiraz etme ve zararın
              giderilmesini talep etme haklarına sahipsiniz. Talepleriniz için{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-600 underline">
                {CONTACT_EMAIL}
              </a>{" "}
              adresine yazabilirsiniz.
            </p>
          ),
        },
        {
          heading: "8. Politika Değişiklikleri",
          body: (
            <p>
              Bu politika zaman zaman güncellenebilir. Değişiklikler bu sayfada yayımlanır ve
              güncelleme tarihi yukarıda belirtilir.
            </p>
          ),
        },
        {
          heading: "9. İletişim",
          body: (
            <p>
              Gizlilikle ilgili sorularınız için:{" "}
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
