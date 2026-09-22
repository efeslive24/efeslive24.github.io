"use client";

import { QrTool } from "./qr-tool";

export default function TextQrGenerator() {
  return (
    <QrTool
      downloadBaseName="text-qr"
      fields={[
        {
          name: "text",
          label: "Metin",
          placeholder: "QR'a dönüştürülecek metni yazın…",
          type: "textarea",
          required: true,
        },
      ]}
      buildContent={(v) => (v.text ?? "").trim()}
    />
  );
}
