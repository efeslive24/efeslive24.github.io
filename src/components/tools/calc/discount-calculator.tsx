"use client";

import { useState } from "react";
import { Label, Input, Select } from "@/components/ui/field";
import { calcDiscount, calcDiscountRate } from "@/lib/calc";
import { formatNumber } from "@/lib/convert";

type Mode = "normal" | "rate";

export default function DiscountCalculator() {
  const [mode, setMode] = useState<Mode>("normal");
  const [price, setPrice] = useState("250");
  const [discount, setDiscount] = useState("20");
  const [original, setOriginal] = useState("250");
  const [final, setFinal] = useState("200");

  const p = parseFloat(price.replace(",", ".")) || 0;
  const d = parseFloat(discount.replace(",", ".")) || 0;
  const o = parseFloat(original.replace(",", ".")) || 0;
  const f = parseFloat(final.replace(",", ".")) || 0;

  const normal = calcDiscount(p, d);
  const rate = calcDiscountRate(o, f);

  return (
    <div>
      <div>
        <Label htmlFor="dc-mode">Hesaplama türü</Label>
        <Select id="dc-mode" value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
          <option value="normal">İndirimli fiyatı bul</option>
          <option value="rate">İndirim oranını bul</option>
        </Select>
      </div>
      {mode === "normal" ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="dc-price">Orijinal fiyat (₺)</Label>
            <Input id="dc-price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="dc-discount">İndirim (%)</Label>
            <Input id="dc-discount" type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 sm:col-span-2">
            <p className="text-sm text-emerald-800">
              <span className="font-semibold">Ödenecek:</span> {formatNumber(normal.final)} ₺
            </p>
            <p className="mt-1 text-sm text-emerald-800">
              <span className="font-semibold">Tasarruf:</span> {formatNumber(normal.saved)} ₺
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="dc-orig">Orijinal fiyat (₺)</Label>
            <Input id="dc-orig" type="number" value={original} onChange={(e) => setOriginal(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="dc-final">İndirimli fiyat (₺)</Label>
            <Input id="dc-final" type="number" value={final} onChange={(e) => setFinal(e.target.value)} />
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 sm:col-span-2">
            <p className="text-sm text-emerald-800">
              <span className="font-semibold">İndirim oranı:</span>{" "}
              {Number.isNaN(rate) ? "—" : `%${formatNumber(rate)}`}
            </p>
            {!Number.isNaN(rate) && (
              <p className="mt-1 text-sm text-emerald-800">
                <span className="font-semibold">Tasarruf:</span> {formatNumber(o - f)} ₺
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
