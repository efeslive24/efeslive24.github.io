"use client";

import { useEffect } from "react";
import { AD_CONFIG } from "@/lib/constants/ads";

// AdSense betiği yalnızca yayıncı kimliği (NEXT_PUBLIC_ADSENSE_CLIENT)
// tanımlandığında yüklenir; aksi halde sayfaya hiçbir şey eklenmez.
export function AdsLoader() {
  useEffect(() => {
    if (!AD_CONFIG.enabled) return;
    if (
      document.querySelector(
        'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
      )
    ) {
      return;
    }
    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CONFIG.client}`;
    document.head.appendChild(script);
  }, []);

  return null;
}
