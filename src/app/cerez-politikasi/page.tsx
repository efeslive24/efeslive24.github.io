import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/legal-layout";
import { SITE_NAME, SITE_URL } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: `${SITE_NAME} çerez politikası: hangi çerezlerin kullanıldığı ve tercihlerinizi nasıl yönetebileceğiniz.`,
  alternates: { canonical: `${SITE_URL}/cerez-politikasi/` },
};

export default function CookiePolicyPage() {
  return (
    <LegalLayout
      title="Çerez Politikası"
      updated="22 Eylül 2026"
      sections={[
        {
          heading: "1. Çerez Nedir?",
          body: (
            <p>
              Çerezler, web sitelerinin tarayıcınıza kaydettiği küçük metin dosyalarıdır.
              Oturum yönetimi, tercih hatırlama ve istatistik amaçlarıyla kullanılırlar.
            </p>
          ),
        },
        {
          heading: "2. Kullandığımız Çerezler",
          body: (
            <>
              <p>
                Sitemiz temel işlevselliği için <strong>zorunlu çerez dahi kullanmaz</strong>;
                tüm araçlar sunucu oturumu olmadan çalışır. Aşağıdaki çerezler yalnızca ilgili
                hizmetler etkinleştirildiğinde devreye girer:
              </p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>
                  <strong>Analitik çerezleri:</strong> Gizlilik dostu bir analiz hizmeti
                  kullanılırsa, toplu kullanım istatistikleri için anonimleştirilmiş veriler
                  işlenebilir.
                </li>
                <li>
                  <strong>Reklam çerezleri:</strong> Reklam ağı (ör. Google AdSense)
                  etkinleştirildiğinde, ilgili sağlayıcı kişiselleştirilmiş reklam için çerez
                  kullanabilir. Google&apos;ın çerez kullanımı hakkında bilgi için
                  Google&apos;ın resmi politikalarına bakınız.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "3. Çerezleri Yönetme",
          body: (
            <p>
              Tarayıcınızın ayarlarından çerezleri silebilir veya engelleyebilirsiniz.
              Kişiselleştirilmiş reklamları devre dışı bırakmak için Google&apos;ın{" "}
              <em>Reklam Ayarları</em> sayfasını kullanabilirsiniz. Çerezleri engellemeniz
              sitenin temel işlevlerini etkilemez.
            </p>
          ),
        },
        {
          heading: "4. Politika Güncellemeleri",
          body: (
            <p>
              Bu politika değiştiğinde güncel sürümü bu sayfada yayımlanır.
            </p>
          ),
        },
      ]}
    />
  );
}
