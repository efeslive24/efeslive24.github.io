"use client";

import { useState } from "react";
import { Textarea, Label, Checkbox } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ResultBox } from "@/components/ui/result-box";
import { encodeBase64 } from "@/lib/encoding";

export default function Base64Encoder() {
  const [input, setInput] = useState("");
  const [urlSafe, setUrlSafe] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const run = () => {
    const encoded = encodeBase64(input);
    setResult(
      urlSafe ? encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : encoded
    );
  };

  return (
    <div>
      <Label htmlFor="b64e-input">Metin</Label>
      <Textarea
        id="b64e-input"
        rows={5}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Kodlanacak metni yazın… (Türkçe karakterler ve emojiler desteklenir)"
      />
      <div className="mt-4 flex flex-wrap items-center gap-5">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
          <Checkbox checked={urlSafe} onChange={(e) => setUrlSafe(e.target.checked)} />
          URL-güvenli çıktı (+, / ve = işaretleri olmadan)
        </label>
      </div>
      <div className="mt-4">
        <Button onClick={run} disabled={!input}>
          Kodla
        </Button>
      </div>
      <div className="mt-4">
        <ResultBox
          value={result ?? ""}
          placeholder="Base64 çıktısı burada görünecek"
          downloadName="base64.txt"
        />
      </div>
    </div>
  );
}
