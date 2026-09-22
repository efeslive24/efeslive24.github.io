"use client";

import { useState } from "react";
import { Label, Textarea, Checkbox } from "@/components/ui/field";
import { ResultBox } from "@/components/ui/result-box";
import { urlEncode } from "@/lib/encoding";

export default function UrlEncoder() {
  const [input, setInput] = useState("");
  const [doubleEncode, setDoubleEncode] = useState(false);
  const [encodeAll, setEncodeAll] = useState(true);

  let output = "";
  try {
    output = encodeAll ? urlEncode(input) : encodeURI(input);
    if (doubleEncode) output = encodeURIComponent(output);
  } catch {
    output = "";
  }

  return (
    <div>
      <div>
        <Label htmlFor="ue-in">Kodlanacak metin veya URL</Label>
        <Textarea
          id="ue-in"
          rows={5}
          value={input}
          placeholder="Merhaba dünya & hoş geldiniz! ?name=test"
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-5">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
          <Checkbox checked={encodeAll} onChange={(e) => setEncodeAll(e.target.checked)} />
          Tüm özel karakterleri kodla
        </label>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
          <Checkbox checked={doubleEncode} onChange={(e) => setDoubleEncode(e.target.checked)} />
          Çift kodla
        </label>
      </div>
      <div className="mt-5">
        <ResultBox
          value={output}
          placeholder="Kodlanmış metin burada görünecek"
          rows={6}
          copyLabel="Kopyala"
        />
      </div>
    </div>
  );
}
