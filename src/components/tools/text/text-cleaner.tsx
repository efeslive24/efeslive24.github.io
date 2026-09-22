"use client";

import { useState } from "react";
import { Textarea, Label, Checkbox } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ResultBox } from "@/components/ui/result-box";
import { cleanText, DEFAULT_CLEAN_OPTIONS, type CleanOptions } from "@/lib/text";

const OPTION_LABELS: { key: keyof CleanOptions; label: string }[] = [
  { key: "collapseSpaces", label: "Fazla boşlukları tek boşluğa indir" },
  { key: "trimLines", label: "Satır başı/sonundaki boşlukları sil" },
  { key: "removeEmptyLines", label: "Fazla boş satırları kaldır" },
  { key: "removeTabs", label: "Sekmeleri boşluğa çevir" },
  { key: "stripHtml", label: "HTML etiketlerini kaldır" },
];

export default function TextCleaner() {
  const [text, setText] = useState("");
  const [options, setOptions] = useState<CleanOptions>(DEFAULT_CLEAN_OPTIONS);
  const [result, setResult] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const run = () => {
    const cleaned = cleanText(text, options);
    setResult(cleaned);
    const removedChars = text.length - cleaned.length;
    setInfo(
      removedChars > 0
        ? `${removedChars.toLocaleString("tr-TR")} gereksiz karakter temizlendi.`
        : "Metin zaten temiz, değişiklik gerekmedi."
    );
  };

  return (
    <div>
      <Label htmlFor="cleaner-input">Kirli Metin</Label>
      <Textarea
        id="cleaner-input"
        rows={7}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Temizlenecek metni yapıştırın…"
      />
      <fieldset className="mt-4">
        <legend className="mb-2 text-sm font-medium text-slate-700">Temizleme Seçenekleri</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {OPTION_LABELS.map(({ key, label }) => (
            <label key={key} className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
              <Checkbox
                checked={Boolean(options[key])}
                onChange={(e) => setOptions((prev) => ({ ...prev, [key]: e.target.checked }))}
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mt-4 flex items-center gap-3">
        <Button onClick={run} disabled={!text}>
          Metni Temizle
        </Button>
      </div>
      <div className="mt-4">
        <ResultBox
          value={result ?? ""}
          success={info}
          placeholder="Temizlenmiş metin burada görünecek"
          downloadName="temizlenmis-metin.txt"
        />
      </div>
    </div>
  );
}
