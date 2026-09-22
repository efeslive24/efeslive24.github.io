"use client";

import { useState } from "react";
import { Label, Input, Checkbox } from "@/components/ui/field";
import { calcTip } from "@/lib/calc";
import { formatNumber } from "@/lib/convert";

export default function TipCalculator() {
  const [bill, setBill] = useState("300");
  const [tipPct, setTipPct] = useState("10");
  const [people, setPeople] = useState("2");
  const [roundUp, setRoundUp] = useState(false);

  const b = parseFloat(bill.replace(",", ".")) || 0;
  const t = parseFloat(tipPct.replace(",", ".")) || 0;
  const n = Math.max(1, parseInt(people, 10) || 1);

  const r = calcTip(b, t, n, roundUp);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="tip-bill">Hesap tutarı (₺)</Label>
          <Input id="tip-bill" type="number" value={bill} onChange={(e) => setBill(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="tip-pct">Bahşiş (%)</Label>
          <Input id="tip-pct" type="number" value={tipPct} onChange={(e) => setTipPct(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="tip-people">Kişi sayısı</Label>
          <Input id="tip-people" type="number" min={1} value={people} onChange={(e) => setPeople(e.target.value)} />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {[5, 10, 15, 20].map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setTipPct(String(p))}
            className={`rounded-full border px-3 py-1 text-xs ${
              String(p) === tipPct
                ? "border-brand-500 bg-brand-50 text-brand-700"
                : "border-slate-300 text-slate-600 hover:border-brand-400"
            }`}
          >
            %{p}
          </button>
        ))}
        <label className="ml-2 flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
          <Checkbox checked={roundUp} onChange={(e) => setRoundUp(e.target.checked)} />
          Kişi başını yukarı yuvarla
        </label>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-brand-200 bg-brand-50 p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-600">Bahşiş</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{formatNumber(r.tip)} ₺</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
          <p className="text-xs text-slate-500">Toplam Hesap</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{formatNumber(r.total)} ₺</p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">Kişi Başı</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {formatNumber(r.perPerson)} ₺
          </p>
        </div>
      </div>
    </div>
  );
}
