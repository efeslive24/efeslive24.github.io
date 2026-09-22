"use client";

import { useState } from "react";
import { Textarea, Label, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ResultBox } from "@/components/ui/result-box";
import { jsonToCsv } from "@/lib/encoding";

export default function JsonToCsv() {
  const [input, setInput] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = () => {
    const r = jsonToCsv(input, delimiter);
    setError(r.ok ? null : r.error ?? null);
    setResult(r.ok ? (r.output ?? "") : null);
  };

  return (
    <div>
      <Label htmlFor="j2c-input">JSON Dizisi</Label>
      <Textarea
        id="j2c-input"
        rows={8}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={'[{"ad": "Ali", "yas": 30}, {"ad": "Ayşe", "yas": 25}]'}
        spellCheck={false}
      />
      <div className="mt-4 flex flex-wrap items-end gap-3">
        <div className="w-48">
          <Label htmlFor="j2c-delim">Ayraç</Label>
          <Select
            id="j2c-delim"
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
          >
            <option value=",">Virgül (,)</option>
            <option value=";">Noktalı virgül (;)</option>
            <option value="\t">Tab</option>
          </Select>
        </div>
        <Button onClick={run} disabled={!input}>
          Dönüştür
        </Button>
      </div>
      <div className="mt-4">
        <ResultBox
          value={result ?? ""}
          error={error}
          placeholder="CSV çıktısı burada görünecek"
          downloadName="veriler.csv"
          mime="text/csv"
          rows={10}
        />
      </div>
    </div>
  );
}
