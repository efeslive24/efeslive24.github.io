"use client";

import { QrTool } from "./qr-tool";
import { buildSmsQr } from "@/lib/qr-content";

export default function SmsQrGenerator() {
  return (
    <QrTool
      downloadBaseName="sms-qr"
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
          placeholder: "KATIL",
          half: true,
        },
      ]}
      buildContent={(v) => buildSmsQr({ phone: v.phone ?? "", message: v.message })}
    />
  );
}
