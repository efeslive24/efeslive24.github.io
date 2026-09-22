"use client";

import { useState } from "react";
import { Textarea, Label } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { jsonStats } from "@/lib/encoding";
import { IconAlert, IconCheck } from "@/components/icons";

export default function JsonValidator() {
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);

  let error: string | null = null;
  let stats = null;
  if (input.trim()) {
    try {
      JSON.parse(input);
      stats = jsonStats(input);
    } catch (e) {
      const msg = (e as Error).message;
      // Konum bilgisini daha okunaklı hale getir
      const posMatch = msg.match(/position (\d+)/);
      if (posMatch) {
        const pos = Number(posMatch[1]);
        const line = input.slice(0, pos).split("\n").length;
        const col = pos - (input.lastIndexOf("\n", pos - 1) + 1);
        error = `Hata: ${msg}. Satır ${line}, sütun ${col}.`;
      } else {
        error = `Hata: ${msg}`;
      }
    }
  }

  const valid = Boolean(input.trim()) && !error;

  return (
    <div>
      <Label htmlFor="json-validate-input">JSON Girdisi</Label>
      <Textarea
        id="json-validate-input"
        rows={8}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setChecked(false);
        }}
        placeholder='{"ornek": "veri"}'
        spellCheck={false}
      />
      <div className="mt-4">
        <Button onClick={() => setChecked(true)} disabled={!input}>
          Doğrula
        </Button>
      </div>
      {checked && valid && stats && (
        <div
          className="mt-4 flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
          role="status"
        >
          <IconCheck size={18} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">Geçerli JSON</p>
            <p className="mt-0.5 text-emerald-600">
              {stats.keys.toLocaleString("tr-TR")} anahtar • derinlik {stats.depth} •{" "}
              {(stats.sizeBytes / 1024).toFixed(1)} KB
            </p>
          </div>
        </div>
      )}
      {checked && error && (
        <div
          className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          <IconAlert size={18} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">Geçersiz JSON</p>
            <p className="mt-0.5 break-all">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
