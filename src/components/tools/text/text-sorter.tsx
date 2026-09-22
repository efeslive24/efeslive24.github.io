"use client";

import { useState } from "react";
import { Textarea, Label, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ResultBox } from "@/components/ui/result-box";
import { sortLines, type SortMode } from "@/lib/text";

const MODES: { value: SortMode; label: string }[] = [
  { value: "alpha", label: "Alfabetik (A → Z)" },
  { value: "alpha-desc", label: "Alfabetik (Z → A)" },
  { value: "numeric", label: "Sayısal (Küçük → Büyük)" },
  { value: "numeric-desc", label: "Sayısal (Büyük → Küçük)" },
  { value: "length", label: "Uzunluğa Göre (Kısa → Uzun)" },
  { value: "length-desc", label: "Uzunluğa Göre (Uzun → Kısa)" },
];

export default function TextSorter() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<SortMode>("alpha");
  const [result, setResult] = useState<string | null>(null);

  const run = () => {
    setResult(sortLines(text, mode).join("\n"));
  };

  return (
    <div>
      <Label htmlFor="sorter-input">Sıralanacak Satırlar</Label>
      <Textarea
        id="sorter-input"
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={"zeynep\nali\nmehmet\nayşe"}
      />
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
        <div>
          <Label htmlFor="sorter-mode">Sıralama Ölçütü</Label>
          <Select
            id="sorter-mode"
            value={mode}
            onChange={(e) => setMode(e.target.value as SortMode)}
          >
            {MODES.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </Select>
        </div>
        <div className="self-end">
          <Button onClick={run} disabled={!text}>
            Sırala
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <ResultBox
          value={result ?? ""}
          placeholder="Sıralanmış satırlar burada görünecek"
          downloadName="siralanmis-liste.txt"
        />
      </div>
    </div>
  );
}
