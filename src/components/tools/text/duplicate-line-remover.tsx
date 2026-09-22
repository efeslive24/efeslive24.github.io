"use client";

import { useState } from "react";
import { Textarea, Label, Checkbox } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ResultBox } from "@/components/ui/result-box";
import { removeDuplicateLines } from "@/lib/text";

export default function DuplicateLineRemover() {
  const [text, setText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(true);
  const [result, setResult] = useState<string | null>(null);
  const [removed, setRemoved] = useState<number | null>(null);

  const run = () => {
    const { unique, removedCount } = removeDuplicateLines(text, {
      caseSensitive,
      ignoreWhitespace,
    });
    setResult(unique.join("\n"));
    setRemoved(removedCount);
  };

  return (
    <div>
      <Label htmlFor="dup-input">Listeniz (her satır bir kayıt)</Label>
      <Textarea
        id="dup-input"
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={"elma\narmut\nelma\nüzüm"}
      />
      <div className="mt-4 flex flex-wrap gap-5">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
          <Checkbox
            checked={ignoreWhitespace}
            onChange={(e) => setIgnoreWhitespace(e.target.checked)}
          />
          Baştaki/sondaki boşlukları yok say
        </label>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
          <Checkbox
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
          />
          Büyük/küçük harf duyarlı (Ali ≠ ali)
        </label>
      </div>
      <div className="mt-4">
        <Button onClick={run} disabled={!text}>
          Yinelenenleri Kaldır
        </Button>
      </div>
      <div className="mt-4">
        <ResultBox
          value={result ?? ""}
          success={
            removed !== null
              ? `${removed.toLocaleString("tr-TR")} yinelenen satır kaldırıldı.`
              : null
          }
          placeholder="Benzersiz satırlar burada görünecek"
          downloadName="benzersiz-liste.txt"
        />
      </div>
    </div>
  );
}
