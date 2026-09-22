"use client";

import { useState } from "react";
import { Textarea, Label } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ResultBox } from "@/components/ui/result-box";
import { convertCase, type CaseType } from "@/lib/text";

const OPTIONS: { value: CaseType; label: string; example: string }[] = [
  { value: "upper", label: "BÜYÜK HARF", example: "MERHABA DÜNYA" },
  { value: "lower", label: "küçük harf", example: "merhaba dünya" },
  { value: "title", label: "Başlık Düzeni (Title Case)", example: "Merhaba Dünya" },
  { value: "sentence", label: "Cümle Düzeni", example: "Merhaba dünya. Nasılsın?" },
  { value: "camel", label: "camelCase", example: "merhabaDunya" },
  { value: "pascal", label: "PascalCase", example: "MerhabaDunya" },
  { value: "snake", label: "snake_case", example: "merhaba_dunya" },
  { value: "kebab", label: "kebab-case", example: "merhaba-dunya" },
];

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [active, setActive] = useState<CaseType | null>(null);
  const output = active ? convertCase(text, active) : "";

  return (
    <div>
      <Label htmlFor="case-input">Metniniz</Label>
      <Textarea
        id="case-input"
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Dönüştürülecek metni yapıştırın…"
      />
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {OPTIONS.map((opt) => (
          <Button
            key={opt.value}
            variant={active === opt.value ? "primary" : "secondary"}
            size="sm"
            onClick={() => setActive(opt.value)}
            disabled={!text}
            title={`Örnek: ${opt.example}`}
          >
            {opt.label}
          </Button>
        ))}
      </div>
      <div className="mt-4">
        <ResultBox value={output} placeholder="Dönüşüm sonucu burada görünecek" />
      </div>
    </div>
  );
}
