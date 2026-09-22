export const AD_CONFIG = {
  // Yayına alırken gerçek değerler derleme ortam değişkenleriyle verilmeli:
  // NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXX
  enabled: Boolean(process.env.NEXT_PUBLIC_ADSENSE_CLIENT),
  client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "",
  slots: {
    auto: process.env.NEXT_PUBLIC_ADSENSE_SLOT_AUTO ?? "",
    horizontal: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HORIZONTAL ?? "",
  } as Record<string, string>,
};
