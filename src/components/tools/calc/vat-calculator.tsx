"use client";

import { useState } from "react";
import { Label, Input, Select } from "@/components/ui/field";
import { calcVat } from "@/lib/calc";
import { formatNumber } from "@/lib/convert";

export default function VatCalculator() {
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState("20");
  const [customRate, setCustomRate] = useState("");
  const [includesVat, setIncludesVat] = useState<"no" | "yes">("no");

  const a = parseFloat(amount.replace(",", ".")) || 0;
  const r = rate === "custom" ? parseFloat(customRate.replace(",", ".")) || 0 : parseFloat(rate);
  const v = calcVat(a, r, includesVat === "yes");

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="vat-amount">Tutar (₺)</Label>
          <Input
            id="vat-amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="vat-rate">KDV oranı (%)</Label>
          <Select id="vat-rate" value={rate} onChange={(e) => setRate(e.target.value)}>
            <option value="20">%20 (genel)</option>
            <option value="10">%10</option>
            <option value="1">%1</option>
            <option value="custom">Özel oran</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="vat-mode">Tutar türü</Label>
          <Select
            id="vat-mode"
            value={includesVat}
            onChange={(e) => setIncludesVat(e.target.value as "no" | "yes")}
          >
            <option value="no">KDV hariç</option>
            <option value="yes">KDV dahil</option>
          </Select>
        </div>
      </div>
      {rate === "custom" && (
        <div className="mt-4">
          <Label htmlFor="vat-custom">Özel KDV oranı (%)</Label>
          <Input
            id="vat-custom"
            type="number"
            value={customRate}
            onChange={(e) => setCustomRate(e.target.value)}
          />
        </div>
      )}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            KDV’siz Tutar
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {formatNumber(v.net)} ₺
          </p>
        </div>
        <div className="rounded-xl border border-brand-200 bg-brand-50 p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-600">KDV Tutarı</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {formatNumber(v.vat)} ₺
          </p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            {includesVat === "yes" ? "Brüt (Dahil)" : "KDV Dahil Toplam"}
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {formatNumber(v.gross)} ₺
          </p>
        </div>
      </div>
    </div>
  );
}
