"use client";

import { useState } from "react";
import { Label, Input, Select } from "@/components/ui/field";
import { UNIT_CATEGORIES, convertUnit, formatNumber } from "@/lib/convert";

export default function UnitConverter() {
  const [categoryId, setCategoryId] = useState("length");
  const [value, setValue] = useState("1");
  const [fromId, setFromId] = useState("m");
  const [toId, setToId] = useState("km");

  const category = UNIT_CATEGORIES.find((c) => c.id === categoryId)!;
  const v = parseFloat(value.replace(",", "."));
  const result = convertUnit(categoryId, v, fromId, toId);

  const switchCategory = (id: string) => {
    setCategoryId(id);
    const cat = UNIT_CATEGORIES.find((c) => c.id === id)!;
    setFromId(cat.units[0].id);
    setToId(cat.units[1].id);
  };

  const swap = () => {
    setFromId(toId);
    setToId(fromId);
  };

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="uc-cat">Kategori</Label>
          <Select id="uc-cat" value={categoryId} onChange={(e) => switchCategory(e.target.value)}>
            {UNIT_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="uc-val">Değer</Label>
          <Input id="uc-val" type="number" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <div className="flex items-end">
          <button
            type="button"
            onClick={swap}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
          >
            ⇅ Birimleri değiştir
          </button>
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="uc-from">Kaynak birim</Label>
          <Select id="uc-from" value={fromId} onChange={(e) => setFromId(e.target.value)}>
            {category.units.map((u) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="uc-to">Hedef birim</Label>
          <Select id="uc-to" value={toId} onChange={(e) => setToId(e.target.value)}>
            {category.units.map((u) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </Select>
        </div>
      </div>
      <div className="mt-5 rounded-xl border border-brand-200 bg-brand-50 p-5 text-center">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-600">Sonuç</p>
        <p className="mt-1 break-words text-3xl font-bold text-slate-900">
          {Number.isFinite(v) && result !== null ? formatNumber(result) : "—"}
        </p>
        {Number.isFinite(v) && result !== null && (
          <p className="mt-1 font-mono text-xs text-slate-500">
            {formatNumber(v)}{" "}
            {category.units.find((u) => u.id === fromId)?.name} ={" "}
            {formatNumber(result)} {category.units.find((u) => u.id === toId)?.name}
          </p>
        )}
      </div>
    </div>
  );
}
