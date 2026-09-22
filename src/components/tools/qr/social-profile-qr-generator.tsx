"use client";

import { QrTool } from "./qr-tool";
import { buildSocialQr } from "@/lib/qr-content";

const PLATFORMS = [
  { value: "instagram", label: "Instagram" },
  { value: "x", label: "X (Twitter)" },
  { value: "tiktok", label: "TikTok" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "youtube", label: "YouTube" },
  { value: "facebook", label: "Facebook" },
];

export default function SocialProfileQrGenerator() {
  return (
    <QrTool
      downloadBaseName="social-qr"
      fields={[
        {
          name: "platform",
          label: "Platform",
          type: "select",
          options: PLATFORMS,
          required: true,
          half: true,
        },
        {
          name: "handle",
          label: "Kullanıcı Adı veya Profil Bağlantısı",
          placeholder: "@kullaniciadi",
          required: true,
          half: true,
        },
      ]}
      buildContent={(v) => buildSocialQr(v.platform ?? "instagram", v.handle ?? "")}
    />
  );
}
