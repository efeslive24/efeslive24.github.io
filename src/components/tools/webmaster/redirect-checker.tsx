"use client";

import { useState } from "react";
import { Label, Input } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { isValidUrl } from "@/lib/utm";
import { WORKER_URL } from "@/lib/constants/worker";
import { IconAlert, IconInfo } from "@/components/icons";

interface RedirectStep {
  url: string;
  status: number;
}

interface CheckResponse {
  ok: boolean;
  chain?: RedirectStep[];
  finalUrl?: string;
  finalStatus?: number;
  error?: string;
}

function StatusBadge({ status }: { status: number }) {
  if (status === 0) {
    return (
      <span className="inline-block rounded-full bg-slate-200 px-2.5 py-0.5 font-mono text-xs font-medium text-slate-600">
        ulaşılamadı
      </span>
    );
  }
  const kind =
    status >= 300 && status < 400
      ? "bg-amber-100 text-amber-800"
      : status >= 400
        ? "bg-red-100 text-red-700"
        : "bg-emerald-100 text-emerald-800";
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 font-mono text-xs font-medium ${kind}`}>
      {status}
    </span>
  );
}

export default function RedirectChecker() {
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<CheckResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = isValidUrl(url.trim()) && !busy;

  const check = async () => {
    if (!canSubmit) return;
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(
        `${WORKER_URL}/check?url=${encodeURIComponent(url.trim())}`
      );
      const data = (await res.json()) as CheckResponse;
      if (data.ok) setResult(data);
      else setError(data.error || "Kontrol yapılamadı. Lütfen tekrar deneyin.");
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
            Tarayıcı güvenlik kuralları, bir URL&apos;nin yönlendirme zincirini
            doğrudan incelemeyi engeller; bu araç için site sahibinin küçük bir
            sunucu bileşeni kurması gerekir. Kurulum tamamlanana kadar araç
            kullanılamaz.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Label htmlFor="rc-url">Kontrol edilecek URL</Label>
          <Input
            id="rc-url"
            value={url}
            placeholder="https://site.com/eski-sayfa"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <Button onClick={check} disabled={!canSubmit}>
          {busy ? "Kontrol ediliyor..." : "Kontrol Et"}
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
      {result?.ok && result.chain && (
        <div className="mt-5">
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-2.5 font-medium">Adım</th>
                  <th className="px-4 py-2.5 font-medium">URL</th>
                  <th className="px-4 py-2.5 font-medium">Durum Kodu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {result.chain.map((step, i) => (
                  <tr key={`${step.url}-${i}`}>
                    <td className="px-4 py-2.5 text-slate-500">{i + 1}</td>
                    <td className="break-all px-4 py-2.5 font-mono text-xs text-slate-800">
                      {step.url}
                    </td>
                    <td className="px-4 py-2.5">
                      <StatusBadge status={step.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
            <span className="text-slate-600">Sonuç: </span>
            <span className="font-medium text-slate-900">
              {result.chain.length > 1
                ? `${result.chain.length - 1} yönlendirme adımı sonrası `
                : "Yönlendirme yok; "}
              hedef <span className="font-mono text-xs">{result.finalUrl ?? "?"}</span>
            </span>{" "}
            <StatusBadge status={result.finalStatus ?? 0} />
          </div>
        </div>
      )}
    </div>
  );
}
