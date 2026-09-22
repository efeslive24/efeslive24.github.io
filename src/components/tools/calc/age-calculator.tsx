"use client";

import { useState } from "react";
import { Label, Input } from "@/components/ui/field";
import { calcAge } from "@/lib/calc";
import { formatNumber } from "@/lib/convert";

export default function AgeCalculator() {
  const [birth, setBirth] = useState("1990-01-01");
  const [today] = useState(() => new Date());

  const date = new Date(`${birth}T00:00:00`);
  const valid = !Number.isNaN(date.getTime()) && date.getTime() <= today.getTime();
  const age = valid ? calcAge(date) : null;

  return (
    <div>
      <div className="max-w-xs">
        <Label htmlFor="age-birth">Doğum tarihiniz</Label>
        <Input
          id="age-birth"
          type="date"
          value={birth}
          max={today.toISOString().split("T")[0]}
          onChange={(e) => setBirth(e.target.value)}
        />
      </div>
      {!valid && (
        <p className="mt-3 text-sm text-amber-600">
          Lütfen bugünden önce geçerli bir tarih seçin.
        </p>
      )}
      {age && (
        <div className="mt-5">
          <div className="rounded-xl border border-brand-200 bg-brand-50 p-5 text-center">
            <p className="text-xs font-medium uppercase tracking-wide text-brand-600">Yaşınız</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">
              {age.years} yıl {age.months} ay {age.days} gün
            </p>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
              <p className="text-xs text-slate-500">Toplam gün</p>
              <p className="mt-1 text-xl font-bold text-slate-900">
                {formatNumber(age.totalDays)}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
              <p className="text-xs text-slate-500">Sonraki doğum gününüz</p>
              <p className="mt-1 text-xl font-bold text-slate-900">
                {age.nextBirthday.toLocaleDateString("tr-TR")}
              </p>
              <p className="text-xs text-slate-500">
                {age.nextBirthdayInDays} gün sonra • {age.nextBirthdayWeekday}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
              <p className="text-xs text-slate-500">Doğduğunuz gün</p>
              <p className="mt-1 text-xl font-bold text-slate-900">{age.birthWeekday}</p>
              <p className="text-xs text-slate-500">{age.nextAge}. yaşınızı alacaksınız</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
