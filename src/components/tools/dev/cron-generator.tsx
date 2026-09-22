"use client";

import { useMemo, useState } from "react";
import { Label, Select, Input } from "@/components/ui/field";
import { CopyButton } from "@/components/ui/copy-button";
import { IconAlert, IconCheck } from "@/components/icons";
import {
  buildCron,
  nextRuns,
  parseCron,
  DEFAULT_CRON,
  type CronFields,
} from "@/lib/cron";

const PRESETS: { label: string; fields: CronFields }[] = [
  { label: "Her dakika", fields: { minute: "*", hour: "*", dayOfMonth: "*", month: "*", dayOfWeek: "*" } },
  { label: "Her saat başı", fields: { minute: "0", hour: "*", dayOfMonth: "*", month: "*", dayOfWeek: "*" } },
  { label: "Her gün 03:00", fields: { minute: "0", hour: "3", dayOfMonth: "*", month: "*", dayOfWeek: "*" } },
  { label: "Hafta içi 09:00", fields: { minute: "0", hour: "9", dayOfMonth: "*", month: "*", dayOfWeek: "1-5" } },
  { label: "Her Pazar 02:30", fields: { minute: "30", hour: "2", dayOfMonth: "*", month: "*", dayOfWeek: "0" } },
  { label: "Ayın 1'i 00:00", fields: { minute: "0", hour: "0", dayOfMonth: "1", month: "*", dayOfWeek: "*" } },
  { label: "15 dakikada bir", fields: { minute: "*/15", hour: "*", dayOfMonth: "*", month: "*", dayOfWeek: "*" } },
];

function options(start: number, end: number, labelFn?: (n: number) => string): { value: string; label: string }[] {
  return Array.from({ length: end - start + 1 }, (_, i) => {
    const n = start + i;
    return { value: String(n), label: labelFn ? labelFn(n) : String(n).padStart(2, "0") };
  });
}

const MINUTE_OPTS = [
  { value: "*", label: "Her dakika" },
  { value: "*/5", label: "5 dakikada bir" },
  { value: "*/15", label: "15 dakikada bir" },
  { value: "*/30", label: "30 dakikada bir" },
  ...options(0, 59),
];

const HOUR_OPTS = [
  { value: "*", label: "Her saat" },
  ...options(0, 23),
];

const DOM_OPTS = [
  { value: "*", label: "Her gün" },
  ...options(1, 31),
];

const MONTH_OPTS = [
  { value: "*", label: "Her ay" },
  ...options(1, 12, (n) =>
    new Date(2024, n - 1, 1).toLocaleString("tr-TR", { month: "long" })
  ),
];

const DOW_OPTS = [
  { value: "*", label: "Her gün" },
  { value: "1-5", label: "Hafta içi (Pzt-Cum)" },
  { value: "0", label: "Pazar" },
  { value: "1", label: "Pazartesi" },
  { value: "2", label: "Salı" },
  { value: "3", label: "Çarşamba" },
  { value: "4", label: "Perşembe" },
  { value: "5", label: "Cuma" },
  { value: "6", label: "Cumartesi" },
];

export default function CronGenerator() {
  const [fields, setFields] = useState<CronFields>(DEFAULT_CRON);
  const [manual, setManual] = useState("");

  const expression = buildCron(fields);
  const manualResult = manual.trim() ? parseCron(manual) : null;
  const activeExpr = manual.trim() ? manual.trim() : expression;

  const runs = useMemo(() => nextRuns(activeExpr, 5), [activeExpr]);

  const setField = (key: keyof CronFields, value: string) =>
    setFields((prev) => ({ ...prev, [key]: value }));

  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <div>
          <Label>Hazır Şablonlar</Label>
          <div className="space-y-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => {
                  setFields(preset.fields);
                  setManual("");
                }}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-sm text-slate-700 shadow-sm transition hover:border-brand-400 hover:bg-brand-50"
              >
                {preset.label}
                <span className="block font-mono text-[11px] text-slate-400">
                  {buildCron(preset.fields)}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            <div>
              <Label htmlFor="cron-minute">Dakika</Label>
              <Select id="cron-minute" value={fields.minute} onChange={(e) => setField("minute", e.target.value)}>
                {MINUTE_OPTS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="cron-hour">Saat</Label>
              <Select id="cron-hour" value={fields.hour} onChange={(e) => setField("hour", e.target.value)}>
                {HOUR_OPTS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="cron-dom">Ayın Günü</Label>
              <Select id="cron-dom" value={fields.dayOfMonth} onChange={(e) => setField("dayOfMonth", e.target.value)}>
                {DOM_OPTS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="cron-month">Ay</Label>
              <Select id="cron-month" value={fields.month} onChange={(e) => setField("month", e.target.value)}>
                {MONTH_OPTS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="cron-dow">Haftanın Günü</Label>
              <Select id="cron-dow" value={fields.dayOfWeek} onChange={(e) => setField("dayOfWeek", e.target.value)}>
                {DOW_OPTS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor="cron-manual">İfade (elle de yazabilirsiniz)</Label>
            <Input
              id="cron-manual"
              value={manual}
              onChange={(e) => setManual(e.target.value)}
              placeholder={expression}
              spellCheck={false}
              className="font-mono"
            />
            {manualResult && !manualResult.ok && (
              <p className="mt-2 flex items-center gap-1.5 text-sm text-red-600" role="alert">
                <IconAlert size={16} /> {manualResult.error}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3">
        <code className="flex-1 break-all font-mono text-base font-semibold text-brand-800">
          {activeExpr}
        </code>
        <CopyButton getText={() => activeExpr} label="İfadeyi Kopyala" variant="primary" size="sm" />
      </div>

      {runs.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-700">
            <IconCheck size={16} className="text-emerald-600" />
            Sonraki çalışma zamanları (yerel saatiniz):
          </p>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {runs.map((d, i) => (
              <li key={i} className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-mono text-sm text-slate-700">
                {d.toLocaleString("tr-TR")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
