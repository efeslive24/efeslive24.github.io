"use client";

import { useState } from "react";
import { Label, Input } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { IconRefresh } from "@/components/icons";

function formatDate(d: Date, utc: boolean): string {
  const opts: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  return d.toLocaleString("tr-TR", { ...opts, timeZone: utc ? "UTC" : undefined });
}

function toLocalInputValue(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function TimestampConverter() {
  const [ts, setTs] = useState("");
  const [unit, setUnit] = useState<"auto" | "s" | "ms">("auto");

  const parsed = (() => {
    const raw = ts.trim();
    if (!raw) return null;
    const num = Number(raw);
    if (!Number.isFinite(num)) return { error: "Geçersiz sayı." } as const;
    let ms = num;
    if (unit === "s" || (unit === "auto" && Math.abs(num) < 1e12)) ms = num * 1000;
    const d = new Date(ms);
    if (isNaN(d.getTime())) return { error: "Geçersiz zaman damgası." } as const;
    return {
      ms,
      utc: new Date(ms).toISOString(),
      local: formatDate(d, false),
      relative: relativeTime(ms),
    };
  })();

  const dateTimeValue =
    parsed && !("error" in parsed) && parsed
      ? toLocalInputValue(new Date(parsed.ms))
      : "";

  const now = () => {
    const ms = Date.now();
    setTs(unit === "s" ? String(Math.floor(ms / 1000)) : String(ms));
  };

  const onDateTimeChange = (value: string) => {
    const ms = new Date(value).getTime();
    if (!Number.isNaN(ms)) {
      setTs(unit === "s" ? String(Math.floor(ms / 1000)) : String(ms));
    }
  };

  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <Label htmlFor="ts-input">Zaman Damgası</Label>
          <Input
            id="ts-input"
            type="number"
            value={ts}
            onChange={(e) => setTs(e.target.value)}
            placeholder="örn. 1700000000"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {(["auto", "s", "ms"] as const).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUnit(u)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  unit === u
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-slate-300 text-slate-500 hover:border-slate-400"
                }`}
              >
                {u === "auto" ? "Otomatik algıla" : u === "s" ? "Saniye" : "Milisaniye"}
              </button>
            ))}
          </div>
          <div className="mt-3">
            <Button variant="secondary" size="sm" onClick={now}>
              <IconRefresh size={15} /> Şimdiki Zamanı Getir
            </Button>
          </div>
        </div>
        <div>
          <Label htmlFor="dt-input">Tarih ve Saat (yerel)</Label>
          <Input
            id="dt-input"
            type="datetime-local"
            value={dateTimeValue}
            onChange={(e) => onDateTimeChange(e.target.value)}
          />
          <p className="mt-2 text-xs text-slate-500">
            Tarih seçtiğinizde zaman damgası otomatik güncellenir; tersi de geçerlidir.
          </p>
        </div>
      </div>

      {parsed && "error" in parsed ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {parsed.error}
        </p>
      ) : (
        parsed && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium text-slate-500">UTC (ISO 8601)</p>
              <p className="mt-1 font-mono text-sm text-slate-800">{parsed.utc}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium text-slate-500">Yerel Saatiniz</p>
              <p className="mt-1 text-sm text-slate-800">{parsed.local}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium text-slate-500">Milisaniye</p>
              <p className="mt-1 font-mono text-sm text-slate-800">{parsed.ms}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium text-slate-500">Göreli Zaman</p>
              <p className="mt-1 text-sm text-slate-800">{parsed.relative}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
}

function relativeTime(ms: number): string {
  const diff = ms - Date.now();
  const abs = Math.abs(diff);
  const future = diff > 0;
  const units: [number, string][] = [
    [365 * 24 * 3600 * 1000, "yıl"],
    [30 * 24 * 3600 * 1000, "ay"],
    [7 * 24 * 3600 * 1000, "hafta"],
    [24 * 3600 * 1000, "gün"],
    [3600 * 1000, "saat"],
    [60 * 1000, "dakika"],
    [1000, "saniye"],
  ];
  for (const [msInUnit, label] of units) {
    if (abs >= msInUnit) {
      const value = Math.round(abs / msInUnit);
      return future ? `${value} ${label} sonra` : `${value} ${label} önce`;
    }
  }
  return "şimdi";
}
