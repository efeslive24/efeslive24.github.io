"use client";

import { useState } from "react";
import { Label, Input } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { isValidUrl, slugifyCustomAlias } from "@/lib/utm";
import { WORKER_URL } from "@/lib/constants/worker";
import { IconAlert, IconInfo, IconLink } from "@/components/icons";

interface ShortenResponse {
  ok: boolean;
  shortUrl?: string;
  error?: string;
}

export default function UrlShortener() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [busy, setBusy] = useState(false);
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = isValidUrl(url.trim()) && !busy;

  const shorten = async () => {
    if (!canSubmit) return;
    setBusy(true);
    setError(null);
    setShortUrl(null);
    try {
      const body: { url: string; alias?: string } = { url: url.trim() };
      const cleanAlias = slugifyCustomAlias(alias);
      if (cleanAlias) body.alias = cleanAlias;
      const res = await fetch(`${WORKER_URL}/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as ShortenResponse;
      if (data.ok && data.shortUrl) setShortUrl(data.shortUrl);
      else setError(data.error || "Kısa link oluşturulamadı. Lütfen tekrar deneyin.");
    } catch {
      setError("Sunucuya ulaşılamadı. Bağlantınızı kontrol edip tekrar deneyin.");
    } finally {
      setBusy(false);
    }
  };

  if (!WORKER_URL) {
    return (
      <div
        className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-800"
        role="status"
      >
        <IconInfo size={20} className="mt-0.5 shrink-0" />
        <div>
          <p className="font-medium">Kurulum bekleniyor</p>
          <p className="mt-1">
            Bu araç, kısa linklerin yönlendirilmesi için küçük bir sunucu bileşeni
            gerektirir; site sahibi dağıtım ayarını tamamlayana kadar kullanılamaz.
            Bu sırada linklerinizi UTM Oluşturucu ile hazırlayabilirsiniz.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_auto] sm:items-end">
        <div>
          <Label htmlFor="us-url">Uzun bağlantı</Label>
          <Input
            id="us-url"
            value={url}
            placeholder="https://site.com/cok-uzun-bir-sayfa-adresi"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="us-alias">Özel kısa ad (isteğe bağlı)</Label>
          <Input
            id="us-alias"
            value={alias}
            placeholder="kampanya"
            onChange={(e) => setAlias(e.target.value)}
          />
        </div>
        <Button onClick={shorten} disabled={!canSubmit}>
          <IconLink size={16} /> {busy ? "Kısaltılıyor..." : "Kısalt"}
        </Button>
      </div>
      {!isValidUrl(url.trim()) && url.trim() !== "" && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
          <IconAlert size={14} /> Geçerli bir http:// veya https:// adresi girin.
        </p>
      )}
      {error && (
        <div
          className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          <IconAlert size={18} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {shortUrl && (
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
          <p className="text-sm font-medium text-emerald-800">Kısa linkiniz hazır:</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-emerald-900 underline decoration-emerald-400 underline-offset-2 hover:text-emerald-700"
            >
              {shortUrl}
            </a>
            <CopyButton
              getText={() => shortUrl}
              label="Linki Kopyala"
              variant="primary"
              size="sm"
            />
          </div>
        </div>
      )}
    </div>
  );
}
