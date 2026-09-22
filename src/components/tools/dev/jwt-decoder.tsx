"use client";

import { useMemo, useState } from "react";
import { Textarea, Label } from "@/components/ui/field";
import { decodeJwt } from "@/lib/encoding";
import { IconAlert, IconCheck, IconInfo } from "@/components/icons";

function prettyPrint(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

function isJwtPayloadClaim(key: string): string | null {
  const claims: Record<string, string> = {
    iss: "Yayınlayıcı (issuer)",
    sub: "Konu (subject)",
    aud: "Hedef kitle (audience)",
    exp: "Sona erme zamanı (expiration)",
    nbf: "Geçerli olma zamanı (not before)",
    iat: "Düzenlenme zamanı (issued at)",
    jti: "Benzersiz kimlik (JWT ID)",
  };
  return claims[key] ?? null;
}

export default function JwtDecoder() {
  const [token, setToken] = useState("");
  const result = useMemo(() => (token.trim() ? decodeJwt(token) : null), [token]);

  return (
    <div>
      <Label htmlFor="jwt-input">JWT Token</Label>
      <Textarea
        id="jwt-input"
        rows={4}
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9…"
        spellCheck={false}
      />
      <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
        <IconInfo size={14} />
        Token tarayıcınızdan dışarı gönderilmez; tüm işlem yereldir. Bu araç imza doğrulamaz.
      </p>

      {result && !result.ok && (
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          <IconAlert size={18} className="mt-0.5 shrink-0" />
          <span>{result.error}</span>
        </div>
      )}

      {result?.ok && result.data && (
        <div className="mt-4 space-y-4">
          <div
            className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm ${
              result.data.expired
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
            role="status"
          >
            {result.data.expired ? <IconAlert size={18} /> : <IconCheck size={18} />}
            {result.data.expired
              ? `Token süresi dolmuş (sona erme: ${formatExp(result.data.expiresAt)})`
              : result.data.expiresAt
                ? `Token geçerli görünüyor (sona erme: ${formatExp(result.data.expiresAt)})`
                : "Token süre bilgisi (exp) içermiyor"}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <section className="rounded-xl border border-slate-200 bg-white p-4">
              <h2 className="text-sm font-bold text-slate-800">Header</h2>
              <pre className="mt-2 overflow-auto rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-700">
                {prettyPrint(result.data.header)}
              </pre>
            </section>
            <section className="rounded-xl border border-slate-200 bg-white p-4">
              <h2 className="text-sm font-bold text-slate-800">Payload (İddialar)</h2>
              <pre className="mt-2 max-h-80 overflow-auto rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-700">
                {prettyPrint(result.data.payload)}
              </pre>
            </section>
          </div>

          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-bold text-slate-800">İddia Açıklamaları</h2>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-3 py-2">İddia</th>
                    <th className="px-3 py-2">Değer</th>
                    <th className="px-3 py-2">Açıklama</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {Object.entries(result.data.payload)
                    .filter(([key]) => isJwtPayloadClaim(key))
                    .map(([key, value]) => (
                      <tr key={key}>
                        <td className="px-3 py-2 font-mono text-brand-700">{key}</td>
                        <td className="break-all px-3 py-2 font-mono text-slate-700">
                          {formatClaimValue(key, value)}
                        </td>
                        <td className="px-3 py-2 text-slate-500">{isJwtPayloadClaim(key)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 break-all rounded-lg bg-slate-50 px-3 py-2 font-mono text-[11px] text-slate-500">
              İmza: {result.data.signature}
            </p>
          </section>
        </div>
      )}
    </div>
  );
}

function formatExp(iso?: string): string {
  if (!iso) return "bilinmiyor";
  return new Date(iso).toLocaleString("tr-TR");
}

function formatClaimValue(key: string, value: unknown): string {
  if (key === "exp" || key === "nbf" || key === "iat") {
    const num = typeof value === "number" ? value : Number(value);
    if (Number.isFinite(num)) {
      return `${new Date(num * 1000).toLocaleString("tr-TR")} (${value})`;
    }
  }
  return String(value);
}
