"use client";

import { QrTool } from "./qr-tool";
import { buildWifiQr } from "@/lib/qr-content";

export default function WifiQrGenerator() {
  return (
    <QrTool
      downloadBaseName="wifi-qr"
      fields={[
        { name: "ssid", label: "Ağ Adı (SSID)", placeholder: "EvWiFi", required: true, half: true },
        {
          name: "encryption",
          label: "Güvenlik Türü",
          type: "select",
          options: [
            { value: "WPA", label: "WPA / WPA2 / WPA3" },
            { value: "WEP", label: "WEP" },
            { value: "nopass", label: "Şifresiz Ağ" },
          ],
          half: true,
        },
        { name: "password", label: "Şifre", placeholder: "Wi-Fi şifreniz", half: true },
        {
          name: "hidden",
          label: "Ağ Türü",
          type: "select",
          options: [
            { value: "false", label: "Görünür Ağ" },
            { value: "true", label: "Gizli Ağ" },
          ],
          half: true,
        },
      ]}
      buildContent={(v) =>
        buildWifiQr({
          ssid: v.ssid ?? "",
          password: v.password,
          encryption: (v.encryption as "WPA" | "WEP" | "nopass") || "WPA",
          hidden: v.hidden === "true",
        })
      }
    />
  );
}
