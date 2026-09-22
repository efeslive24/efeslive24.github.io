"use client";

import { useState } from "react";
import { Label, Input } from "@/components/ui/field";
import { calcFuel } from "@/lib/calc";
import { formatNumber } from "@/lib/convert";

export default function FuelCostCalculator() {
  const [distance, setDistance] = useState("500");
  const [consumption, setConsumption] = useState("7");
  const [price, setPrice] = useState("45");
  const [people, setPeople] = useState("1");

  const d = parseFloat(distance.replace(",", ".")) || 0;
  const c = parseFloat(consumption.replace(",", ".")) || 0;
  const p = parseFloat(price.replace(",", ".")) || 0;
  const n = Math.max(1, parseInt(people, 10) || 1);

  const r = calcFuel(d, c, p, n);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="fc-dist">Mesafe (km)</Label>
          <Input id="fc-dist" type="number" value={distance} onChange={(e) => setDistance(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="fc-cons">Tüketim (L/100 km)</Label>
          <Input
            id="fc-cons"
            type="number"
            step="0.1"
            value={consumption}
            onChange={(e) => setConsumption(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="fc-price">Yakıt fiyatı (₺/L)</Label>
          <Input
            id="fc-price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="fc-people">Kişi sayısı</Label>
          <Input id="fc-people" type="number" min={1} value={people} onChange={(e) => setPeople(e.target.value)} />
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-brand-200 bg-brand-50 p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-600">Toplam Maliyet</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{formatNumber(r.cost)} ₺</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
          <p className="text-xs text-slate-500">Yakıt Miktarı</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{formatNumber(r.liters)} L</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
          <p className="text-xs text-slate-500">Kişi Başı / Km Başına</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {formatNumber(r.perPerson)} ₺
          </p>
          <p className="text-xs text-slate-500">km başına {formatNumber(r.perKm)} ₺</p>
        </div>
      </div>
    </div>
  );
}
