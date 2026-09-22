"use client";

import { useState } from "react";
import { Label, Input, Select } from "@/components/ui/field";
import { calcPercentage, calcPercentChange, calcRatio } from "@/lib/calc";
import { formatNumber } from "@/lib/convert";

type Mode = "of" | "change" | "ratio";

export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>("of");
  const [value, setValue] = useState("200");
  const [percent, setPercent] = useState("15");
  const [from, setFrom] = useState("100");
  const [to, setTo] = useState("125");
  const [part, setPart] = useState("25");
  const [total, setTotal] = useState("200");

  const v = parseFloat(value.replace(",", "."));
  const p = parseFloat(percent.replace(",", "."));

  const result =
    mode === "of"
      ? { text: formatNumber(calcPercentage(v, p)), formula: `${formatNumber(v)} × %${p} = ${formatNumber(calcPercentage(v, p))}` }
      : mode === "change"
        ? (() => {
            const c = calcPercentChange(parseFloat(from.replace(",", ".")), parseFloat(to.replace(",", ".")));
            return {
              text: Number.isNaN(c) ? "—" : `%${formatNumber(c)}`,
              formula: Number.isNaN(c)
                ? "Eski değer 0 olamaz."
                : `(${formatNumber(parseFloat(to))} − ${formatNumber(parseFloat(from))}) ÷ ${formatNumber(parseFloat(from))} × 100 = %${formatNumber(c)}`,
            };
          })()
        : (() => {
            const r = calcRatio(parseFloat(part.replace(",", ".")), parseFloat(total.replace(",", ".")));
            return {
              text: Number.isNaN(r) ? "—" : `%${formatNumber(r)}`,
              formula: Number.isNaN(r)
                ? "Toplam değer 0 olamaz."
                : `${formatNumber(parseFloat(part))} ÷ ${formatNumber(parseFloat(total))} × 100 = %${formatNumber(r)}`,
            };
          })();

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="pct-mode">Hesaplama türü</Label>
          <Select id="pct-mode" value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
            <option value="of">Bir sayının yüzdesi</option>
            <option value="change">Yüzde değişim (artış/azalış)</option>
            <option value="ratio">Bir sayı diğerinin yüzde kaçı</option>
          </Select>
        </div>
      </div>
      {mode === "of" && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="pct-v">Sayı</Label>
            <Input id="pct-v" type="number" value={value} onChange={(e) => setValue(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="pct-p">Yüzde</Label>
            <Input id="pct-p" type="number" value={percent} onChange={(e) => setPercent(e.target.value)} />
          </div>
        </div>
      )}
      {mode === "change" && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="pct-from">Eski değer</Label>
            <Input id="pct-from" type="number" value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="pct-to">Yeni değer</Label>
            <Input id="pct-to" type="number" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
        </div>
      )}
      {mode === "ratio" && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="pct-part">Parça</Label>
            <Input id="pct-part" type="number" value={part} onChange={(e) => setPart(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="pct-total">Toplam</Label>
            <Input id="pct-total" type="number" value={total} onChange={(e) => setTotal(e.target.value)} />
          </div>
        </div>
      )}
      <div className="mt-5 rounded-xl border border-brand-200 bg-brand-50 p-5 text-center">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-600">Sonuç</p>
        <p className="mt-1 text-3xl font-bold text-slate-900">{result.text}</p>
        <p className="mt-2 font-mono text-xs text-slate-500">{result.formula}</p>
      </div>
    </div>
  );
}
