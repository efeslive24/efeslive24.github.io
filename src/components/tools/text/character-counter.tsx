"use client";

import { useState } from "react";
import { Textarea, Label, Input } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { countStats } from "@/lib/text";
import { IconTrash } from "@/components/icons";

export default function CharacterCounter() {
  const [text, setText] = useState("");
  const [limit, setLimit] = useState("");
  const stats = countStats(text);
  const limitNum = parseInt(limit, 10);
  const over = limitNum > 0 ? stats.chars - limitNum : 0;

  return (
    <div>
      <Label htmlFor="char-counter-input">Metniniz</Label>
      <Textarea
        id="char-counter-input"
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Metninizi buraya yapıştırın…"
      />
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-brand-600">{stats.chars.toLocaleString("tr-TR")}</p>
          <p className="mt-1 text-xs font-medium text-slate-500">Boşluklu Karakter</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-brand-600">{stats.charsNoSpaces.toLocaleString("tr-TR")}</p>
          <p className="mt-1 text-xs font-medium text-slate-500">Boşluksuz Karakter</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-brand-600">{stats.words.toLocaleString("tr-TR")}</p>
          <p className="mt-1 text-xs font-medium text-slate-500">Kelime</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-brand-600">{stats.lines.toLocaleString("tr-TR")}</p>
          <p className="mt-1 text-xs font-medium text-slate-500">Satır</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-end gap-4">
        <div className="w-40">
          <Label htmlFor="char-limit">Karakter Sınırı (isteğe bağlı)</Label>
          <Input
            id="char-limit"
            type="number"
            min={1}
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            placeholder="örn. 280"
          />
        </div>
        {limitNum > 0 && (
          <div className="flex-1">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-500">
                {stats.chars.toLocaleString("tr-TR")} / {limitNum.toLocaleString("tr-TR")}
              </span>
              <span className={over > 0 ? "text-red-600" : "text-emerald-600"}>
                {over > 0 ? `${over.toLocaleString("tr-TR")} karakter aşıldı` : `${Math.abs(over).toLocaleString("tr-TR")} karakter kaldı`}
              </span>
            </div>
            <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className={`h-full rounded-full transition-all ${
                  over > 0 ? "bg-red-500" : "bg-emerald-500"
                }`}
                style={{ width: `${Math.min(100, (stats.chars / limitNum) * 100)}%` }}
              />
            </div>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={() => setText("")} disabled={!text}>
          <IconTrash size={15} /> Temizle
        </Button>
      </div>
    </div>
  );
}
