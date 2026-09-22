"use client";

import { useState } from "react";
import { diffLines, diffWords } from "diff";
import { Textarea, Label } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

interface Change {
  added?: boolean;
  removed?: boolean;
  value: string;
}

export default function TextDiff() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [changes, setChanges] = useState<Change[] | null>(null);
  const [mode, setMode] = useState<"lines" | "words">("lines");

  const run = () => {
    setChanges(mode === "lines" ? diffLines(original, modified) : diffWords(original, modified));
  };

  const stats = changes?.reduce(
    (acc, part) => {
      if (part.added) acc.added++;
      if (part.removed) acc.removed++;
      return acc;
    },
    { added: 0, removed: 0 }
  );

  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <Label htmlFor="diff-original">Orijinal Metin</Label>
          <Textarea
            id="diff-original"
            rows={8}
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="İlk sürümü buraya yapıştırın…"
          />
        </div>
        <div>
          <Label htmlFor="diff-modified">Yeni Sürüm</Label>
          <Textarea
            id="diff-modified"
            rows={8}
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            placeholder="Değiştirilmiş sürümü buraya yapıştırın…"
          />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button onClick={run} disabled={!original || !modified}>
          Karşılaştır
        </Button>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="radio"
            name="diff-mode"
            checked={mode === "lines"}
            onChange={() => setMode("lines")}
            className="h-4 w-4 text-brand-600"
          />
          Satır bazlı
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="radio"
            name="diff-mode"
            checked={mode === "words"}
            onChange={() => setMode("words")}
            className="h-4 w-4 text-brand-600"
          />
          Kelime bazlı
        </label>
        {stats && (
          <div className="ml-auto flex gap-2 text-xs font-medium">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">
              +{stats.added} eklenen
            </span>
            <span className="rounded-full bg-red-100 px-3 py-1 text-red-700">
              -{stats.removed} silinen
            </span>
          </div>
        )}
      </div>

      {changes && (
        <div className="mt-4 max-h-96 overflow-auto rounded-xl border border-slate-200 bg-white p-4 font-mono text-[13px] leading-relaxed">
          {changes.map((part, i) => (
            <span
              key={i}
              className={
                part.added
                  ? "rounded bg-emerald-100 text-emerald-900"
                  : part.removed
                    ? "rounded bg-red-100 text-red-900 line-through"
                    : "text-slate-700"
              }
            >
              {part.value}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
