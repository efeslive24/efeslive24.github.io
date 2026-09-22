// Sunucu gerektiren araçların (URL kısaltıcı, yönlendirme kontrolü) çalışması için
// dağıtım sırasında tanımlanması gereken Cloudflare Worker uç noktası.
// Değer boşsa bu araçlar "kurulum bekleniyor" durumunu gösterir; hiçbir şey uydurulmaz.
export const WORKER_URL =
  process.env.NEXT_PUBLIC_WORKER_URL?.replace(/\/+$/, "") ?? "";
