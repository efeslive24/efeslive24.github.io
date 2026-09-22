"use client";

import { QrTool } from "./qr-tool";
import { buildVCardQr } from "@/lib/qr-content";

export default function VcardQrGenerator() {
  return (
    <QrTool
      downloadBaseName="vcard-qr"
      fields={[
        { name: "firstName", label: "Ad", required: true, half: true },
        { name: "lastName", label: "Soyad", half: true },
        { name: "phone", label: "Telefon", placeholder: "+90 ...", half: true },
        { name: "email", label: "E-posta", placeholder: "ornek@mail.com", half: true },
        { name: "org", label: "Şirket / Kurum", half: true },
        { name: "title", label: "Unvan", half: true },
        { name: "url", label: "Web Sitesi", placeholder: "https://ornek.com" },
      ]}
      buildContent={(v) =>
        buildVCardQr({
          firstName: v.firstName ?? "",
          lastName: v.lastName,
          phone: v.phone,
          email: v.email,
          org: v.org,
          title: v.title,
          url: v.url,
        })
      }
    />
  );
}
