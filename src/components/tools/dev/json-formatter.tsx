"use client";

import { useState } from "react";
import { Textarea, Label, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ResultBox } from "@/components/ui/result-box";
import { formatJson, minifyJson, sortJsonKeys, jsonStats } from "@/lib/encoding";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState("2");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = (mode: "format" | "minify" | "sort") => {
    const r =
      mode === "format"
        ? formatJson(input, Number(indent))
        : mode === "minify"
          ? minifyJson(input)
          : sortJsonKeys(input, Number(indent));
    setError(r.ok ? null : r.error ?? null);
    setResult(r.ok ? r.output : null);
  };

  const stats = result ? jsonStats(result) : null;

  return (
    <div>
      <Label htmlFor="json-input">JSON Girdisi</Label>
      <Textarea
        id="json-input"
        rows={8}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='{"ornek": "veri", "liste": [1, 2, 3]}'
        spellCheck={false}
      />
      <div className="mt-4 flex flex-wrap items-end gap-3">
        <Button onClick={() => run("format")} disabled={!input}>
          Biçimlendir
        </Button>
        <Button variant="secondary" onClick={() => run("minify")} disabled={!input}>
          Küçült (Minify)
        </Button>
        <Button variant="secondary" onClick={() => run("sort")} disabled={!input}>
          Anahtarları Sırala
        </Button>
        <div className="w-36">
          <Label htmlFor="json-indent">Girinti</Label>
          <Select
            id="json-indent"
            value={indent}
            onChange={(e) => setIndent(e.target.value)}
          >
            <option value="2">2 boşluk</option>
            <option value="4">4 boşluk</option>
            <option value="1">Tab</option>
          </Select>
        </div>
        {stats && (
          <p className="text-xs text-slate-500">
            {stats.keys.toLocaleString("tr-TR")} anahtar • derinlik {stats.depth} •{" "}
            {(stats.sizeBytes / 1024).toFixed(1)} KB
          </p>
        )}
      </div>
      <div className="mt-4">
        <ResultBox
          value={result ?? ""}
          error={error}
          placeholder="Biçimlendirilmiş JSON burada görünecek"
          downloadName="formatted.json"
          mime="application/json"
          rows={12}
        />
      </div>
    </div>
  );
}
