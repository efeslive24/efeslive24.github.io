"use client";

import { useState } from "react";
import { Label, Select, Input } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ResultBox } from "@/components/ui/result-box";
import { loremIpsum } from "@/lib/text";

export default function LoremIpsumGenerator() {
  const [unit, setUnit] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState("3");
  const [result, setResult] = useState<string | null>(null);

  const run = () => {
    const n = Math.min(Math.max(parseInt(count, 10) || 1, 1), 100);
    setResult(loremIpsum(unit, n));
  };

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
        <div>
          <Label htmlFor="lorem-unit">Birim</Label>
          <Select
            id="lorem-unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value as typeof unit)}
          >
            <option value="paragraphs">Paragraf</option>
            <option value="sentences">Cümle</option>
            <option value="words">Kelime</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="lorem-count">Adet</Label>
          <Input
            id="lorem-count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </div>
        <div className="self-end">
          <Button onClick={run}>Üret</Button>
        </div>
      </div>
      <div className="mt-4">
        <ResultBox
          value={result ?? ""}
          placeholder="Üretilen dolgu metni burada görünecek"
          downloadName="lorem-ipsum.txt"
          mono={false}
          rows={10}
        />
      </div>
    </div>
  );
}
