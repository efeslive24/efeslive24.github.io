import { AD_CONFIG } from "@/lib/constants/ads";

// AdSense yayıncı kimliği yalnızca derleme sırasında NEXT_PUBLIC_ADSENSE_CLIENT
// ortam değişkeniyle tanımlandığında reklam yüklenir. Kimlik olmadan bu bileşen
// hiçbir şey göstermez — kullanıcı deneyimi ve Google politikaları açısından güvenli.
export function AdSlot({ format = "auto" }: { format?: "auto" | "horizontal" }) {
  if (!AD_CONFIG.enabled) return null;

  const style =
    format === "horizontal"
      ? { display: "block", minHeight: "90px" }
      : { display: "block", minHeight: "100px" };

  return (
    <div
      className="my-4 flex items-center justify-center rounded-lg bg-slate-50"
      style={style}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={AD_CONFIG.client}
        data-ad-slot={AD_CONFIG.slots[format] ?? ""}
        data-ad-format={format === "auto" ? "auto" : "horizontal"}
        data-full-width-responsive="true"
      />
    </div>
  );
}
