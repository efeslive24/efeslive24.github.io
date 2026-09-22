"use client";

import { useState } from "react";
import { Textarea, Label, Checkbox } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ResultBox } from "@/components/ui/result-box";
import { FileDropzone } from "@/components/ui/dropzone";
import { csvToJson } from "@/lib/encoding";

export default function CsvToJson() {
  const [input, setInput] = useState("");
  const [hasHeader, setHasHeader] = useState(true);
  const [parseNumbers, setParseNumbers] = useState(true);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const run = (text: string) => {
    const r = csvToJson(text, { hasHeader, parseNumbers });
    setError(r.ok ? null : r.error ?? null);
    setResult(r.ok ? (r.output ?? "") : null);
    setInfo(r.ok ? `${r.rowCount?.toLocaleString("tr-TR")} satır dönüştürüldü.` : null);
  };

  const handleFile = (files: File[]) => {
    const file = files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setInput(String(reader.result ?? ""));
      run(String(reader.result ?? ""));
    };
    reader.readAsText(file, "utf-8");
  };

  return (
    <div>
      <FileDropzone
        accept=".csv,text/csv,text/plain"
        onFiles={handleFile}
        label="CSV dosyası yükleyin"
        hint="veya aşağıya yapıştırın — dosya tarayıcınızdan çıkmaz"
        maxSizeMB={20}
      />
      <div className="mt-4">
        <Label htmlFor="c2j-input">CSV Girdisi</Label>
        <Textarea
          id="c2j-input"
          rows={8}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={"ad,yas\nAli,30\nAyşe,25"}
          spellCheck={false}
        />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-5">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
          <Checkbox checked={hasHeader} onChange={(e) => setHasHeader(e.target.checked)} />
          İlk satır başlık (header) olarak kullanılsın
        </label>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
          <Checkbox checked={parseNumbers} onChange={(e) => setParseNumbers(e.target.checked)} />
          Sayıları otomatik dönüştür
        </label>
      </div>
      <div className="mt-4">
        <Button onClick={() => run(input)} disabled={!input}>
          Dönüştür
        </Button>
      </div>
      <div className="mt-4">
        <ResultBox
          value={result ?? ""}
          error={error}
          success={info}
          placeholder="JSON çıktısı burada görünecek"
          downloadName="veriler.json"
          mime="application/json"
          rows={10}
        />
      </div>
    </div>
  );
}
