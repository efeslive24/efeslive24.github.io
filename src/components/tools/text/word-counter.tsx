"use client";

import { useState } from "react";
import { Textarea, Label } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { countStats } from "@/lib/text";
import { IconTrash } from "@/components/icons";

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
      <p className="text-2xl font-bold text-brand-600">{value.toLocaleString("tr-TR")}</p>
      <p className="mt-1 text-xs font-medium text-slate-500">{label}</p>
    </div>
  );
}

export default function WordCounter() {
  const [text, setText] = useState("");
  const stats = countStats(text);

  return (
    <div>
      <Label htmlFor="word-counter-input">Metniniz</Label>
      <Textarea
        id="word-counter-input"
        rows={9}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Metninizi buraya yapıştırın veya yazın…"
      />
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Kelime" value={stats.words} />
        <StatCard label="Karakter" value={stats.chars} />
        <StatCard label="Boşluksuz Karakter" value={stats.charsNoSpaces} />
        <StatCard label="Cümle" value={stats.sentences} />
        <StatCard label="Paragraf" value={stats.paragraphs} />
        <StatCard label="Satır" value={stats.lines} />
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Tahmini okuma süresi: <strong>{stats.readingTimeMin} dakika</strong> (dakikada 200 kelime)
      </p>
      <div className="mt-3 flex justify-end">
        <Button variant="ghost" size="sm" onClick={() => setText("")} disabled={!text}>
          <IconTrash size={15} /> Temizle
        </Button>
      </div>
    </div>
  );
}
