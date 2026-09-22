"use client";

import { useState } from "react";
import { Textarea, Label, Checkbox } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ResultBox } from "@/components/ui/result-box";
import { decodeBase64 } from "@/lib/encoding";

export default function Base64Decoder() {
  const [input, setInput] = useState("");
  const [strict, setStrict] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = () => {
    setError(null);
    try {
      let cleaned = input.replace(/\s/g, "");
      if (!strict) {
        cleaned = cleaned.replace(/[^A-Za-z0-9+/=_-]/g, "");
        cleaned = cleaned.replace(/-/g, "+").replace(/_/g, "/");
      }
      setResult(decodeBase64(cleaned));
    } catch {
      setError(
        "Çözme başarısız: girdi geçerli Base64 değil. Geçersiz karakterleri yok saymayı devre dışı bırakıp deneyin."
      );
      setResult(null);
    }
  };

  return (
    <div>
      <Label htmlFor="b64d-input">Base64 Metni</Label>
      <Textarea
        id="b64d-input"
        rows={5}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="QmFzZTY0IMO2cm5law=="
        spellCheck={false}
      />
      <div className="mt-4 flex flex-wrap items-center gap-5">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
          <Checkbox checked={strict} onChange={(e) => setStrict(e.target.checked)} />
          Katı mod (geçersiz karakterleri yok sayma)
        </label>
      </div>
      <div className="mt-4">
        <Button onClick={run} disabled={!input}>
          Çöz
        </Button>
      </div>
      <div className="mt-4">
        <ResultBox
          value={result ?? ""}
          error={error}
          placeholder="Çözülmüş metin burada görünecek"
          downloadName="cozulmus-metin.txt"
        />
      </div>
    </div>
  );
}
