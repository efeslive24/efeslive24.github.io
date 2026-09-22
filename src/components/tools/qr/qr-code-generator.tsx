"use client";

import { QrTool } from "./qr-tool";
import { buildUrlQr } from "@/lib/qr-content";

export default function QrCodeGenerator() {
  return (
    <QrTool
      downloadBaseName="qr-code"
      fields={[
        {
          name: "url",
          label: "URL veya Metin",
          placeholder: "https://ornek.com",
          required: true,
        },
      ]}
      buildContent={(v) => buildUrlQr(v.url ?? "")}
    />
  );
}
