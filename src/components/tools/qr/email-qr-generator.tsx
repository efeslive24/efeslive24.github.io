"use client";

import { QrTool } from "./qr-tool";
import { buildEmailQr } from "@/lib/qr-content";

export default function EmailQrGenerator() {
  return (
    <QrTool
      downloadBaseName="email-qr"
      fields={[
        {
          name: "email",
          label: "E-posta Adresi",
          placeholder: "ornek@mail.com",
          required: true,
          half: true,
        },
        {
          name: "subject",
          label: "Konu (isteğe bağlı)",
          placeholder: "İş başvurusu",
          half: true,
        },
        {
          name: "body",
          label: "Mesaj (isteğe bağlı)",
          placeholder: "Merhaba, ...",
          type: "textarea",
        },
      ]}
      buildContent={(v) =>
        buildEmailQr({ email: v.email ?? "", subject: v.subject, body: v.body })
      }
    />
  );
}
