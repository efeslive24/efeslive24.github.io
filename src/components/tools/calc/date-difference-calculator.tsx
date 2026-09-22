"use client";

import { useState } from "react";
import { Label, Input } from "@/components/ui/field";
import { dateDiff, addDays } from "@/lib/calc";
import { formatNumber } from "@/lib/convert";

function todayStr(offsetDays = 0): string {
  const d = addDays(new Date(), offsetDays);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function DateDifferenceCalculator() {
  const [from, setFrom] = useState(todayStr());
  const [to, setTo] = useState(todayStr(30));
  const [addFrom, setAddFrom] = useState(todayStr());
  const [addDaysNum, setAddDaysNum] = useState("90");

  const d1 = new Date(`${from}T00:00:00`);
  const d2 = new Date(`${to}T00:00:00`);
  const valid = !Number.isNaN(d1.getTime()) && !Number.isNaN(d2.getTime());
  const diff = valid ? dateDiff(d1, d2) : null;

  const d3 = new Date(`${addFrom}T00:00:00`);
  const addN = parseInt(addDaysNum, 10);
  const addValid = !Number.isNaN(d3.getTime()) && !Number.isNaN(addN);
  const added = addValid ? addDays(d3, addN) : null;

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="dd-from">Başlangıç tarihi</Label>
          <Input id="dd-from" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="dd-to">Bitiş tarihi</Label>
          <Input id="dd-to" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
      </div>
      {diff && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-brand-200 bg-brand-50 p-4 text-center">
            <p className="text-xs text-brand-600">Toplam Gün</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{formatNumber(diff.totalDays)}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
            <p className="text-xs text-slate-500">Hafta</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {formatNumber(diff.weeks)}
              {diff.remDays > 0 && (
                <span className="text-sm font-normal text-slate-500"> +{diff.remDays} gün</span>
              )}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
            <p className="text-xs text-slate-500">Ay / Yıl</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {formatNumber(diff.months)}
              <span className="text-sm font-normal text-slate-500">
                {" "}ay ({formatNumber(diff.years)} yıl {formatNumber(diff.days)} gün)
              </span>
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
            <p className="text-xs text-slate-500">İş Günü</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{formatNumber(diff.weekdays)}</p>
            <p className="text-[11px] text-slate-400">hafta sonları hariç</p>
          </div>
        </div>
      )}

      <div className="mt-8 border-t border-slate-200 pt-6">
        <h2 className="text-sm font-semibold text-slate-800">Tarihe Gün Ekle / Çıkar</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="dd-addfrom">Tarih</Label>
            <Input
              id="dd-addfrom"
              type="date"
              value={addFrom}
              onChange={(e) => setAddFrom(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="dd-addn">Gün sayısı (negatif = çıkar)</Label>
            <Input
              id="dd-addn"
              type="number"
              value={addDaysNum}
              onChange={(e) => setAddDaysNum(e.target.value)}
            />
          </div>
          <div className="flex items-end pb-1">
            {added && (
              <p className="text-sm font-semibold text-slate-800">
                Sonuç: {added.toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
