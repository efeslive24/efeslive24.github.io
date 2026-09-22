"use client";

import { useState } from "react";
import { Label, Input, Checkbox } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ResultBox } from "@/components/ui/result-box";
import { IconRefresh } from "@/components/icons";

function uuidV4(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function UuidGenerator() {
  const [count, setCount] = useState("5");
  const [uppercase, setUppercase] = useState(false);
  const [noHyphens, setNoHyphens] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const run = () => {
    const n = Math.min(Math.max(parseInt(count, 10) || 1, 1), 1000);
    const list = Array.from({ length: n }, () => {
      let id = uuidV4();
      if (noHyphens) id = id.replace(/-/g, "");
      return uppercase ? id.toUpperCase() : id;
    });
    setResult(list.join("\n"));
  };

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <div>
          <Label htmlFor="uuid-count">Adet (1-1000)</Label>
          <Input
            id="uuid-count"
            type="number"
            min={1}
            max={1000}
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </div>
        <div className="self-end">
          <Button onClick={run}>
            <IconRefresh size={16} /> Üret
          </Button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-5">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
          <Checkbox checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} />
          Büyük harf
        </label>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
          <Checkbox checked={noHyphens} onChange={(e) => setNoHyphens(e.target.checked)} />
          Tire işareti olmadan
        </label>
      </div>
      <div className="mt-4">
        <ResultBox
          value={result ?? ""}
          placeholder="Üretilen UUID'ler burada görünecek"
          downloadName="uuid-listesi.txt"
        />
      </div>
    </div>
  );
}
