"use client";

import { useState } from "react";
import { Label, Textarea, Checkbox } from "@/components/ui/field";
import { ResultBox } from "@/components/ui/result-box";

export default function UrlDecoder() {
  const [input, setInput] = useState("");
  const [decodeAll, setDecodeAll] = useState(true);

  let output = "";
  let error: string | null = null;
  try {
    output = decodeAll ? decodeURIComponent(input) : decodeURI(input);
  } catch {
    output = "";
    error =
      "Girdi geçerli bir URL kodlaması değil. Girdiyi kontrol edin veya \"tümünü çöz\" seçeneğini kapatın.";
  }

  return (
    <div>
      <div>
        <Label htmlFor="ud-in">Kodlanmış metin veya URL</Label>
        <Textarea
          id="ud-in"
          rows={5}
          value={input}
          placeholder="Merhaba%20d%C3%BCnya%20%26%20ho%C5%9F%20geldiniz!"
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
          <Checkbox checked={decodeAll} onChange={(e) => setDecodeAll(e.target.checked)} />
          Tümünü çöz (%xx dahil)
        </label>
      </div>
      <div className="mt-5">
        <ResultBox
          value={output}
          error={error}
          placeholder="Çözülmüş metin burada görünecek"
          rows={6}
          copyLabel="Kopyala"
        />
      </div>
    </div>
  );
}
