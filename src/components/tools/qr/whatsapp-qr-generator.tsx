"use client";

import { QrTool } from "./qr-tool";
import { buildWhatsappQr } from "@/lib/qr-content";

export default function WhatsappQrGenerator() {
  return (
    <QrTool
      downloadBaseName="whatsapp-qr"
      fields={[
        {
          name: "phone",
          label: "Telefon Numarası",
          placeholder: "+90 555 123 45 67",
          required: true,
          half: true,
        },
        {
          name: "message",
          label: "Hazır Mesaj (isteğe bağlı)",
          placeholder: "Merhaba, size ulaşmak istiyorum",
          half: true,
        },
      ]}
      buildContent={(v) =>
        buildWhatsappQr({ phone: v.phone ?? "", message: v.message })
      }
    />
  );
}
