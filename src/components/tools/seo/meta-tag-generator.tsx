"use client";

import { useState } from "react";
import { Label, Input, Textarea, Checkbox } from "@/components/ui/field";
import { ResultBox } from "@/components/ui/result-box";
import { buildMetaTags } from "@/lib/seo-text";

const ROBOT_OPTIONS = ["index", "follow", "noindex", "nofollow", "noarchive", "nosnippet"];

function CharHint({ value, min, max }: { value: string; min: number; max: number }) {
  const len = value.length;
  const ok = len >= min && len <= max;
  return (
    <span className={`text-xs ${ok ? "text-emerald-600" : "text-amber-600"}`}>
      {len} karakter {ok ? "✓" : `(önerilen ${min}-${max})`}
    </span>
  );
}

export default function MetaTagGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [robots, setRobots] = useState<string[]>(["index", "follow"]);

  const toggleRobot = (r: string) => {
    setRobots((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );
  };

  const result = buildMetaTags({
    title,
    description,
    keywords,
    robots,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  });

  return (
    <div>
      <div className="grid gap-4">
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="mt-title">Başlık (Title)</Label>
            <CharHint value={title} min={30} max={60} />
          </div>
          <Input
            id="mt-title"
            value={title}
            placeholder="Ücretsiz Online Araçlar — Hızlı ve Güvenli"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="mt-desc">Açıklama (Meta Description)</Label>
            <CharHint value={description} min={70} max={160} />
          </div>
          <Textarea
            id="mt-desc"
            rows={3}
            value={description}
            placeholder="Sayfanızı arama sonuçlarında öne çıkaracak kısa bir açıklama yazın…"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="mt-kw">Anahtar kelimeler (isteğe bağlı, virgülle ayırın)</Label>
          <Input
            id="mt-kw"
            value={keywords}
            placeholder="online araç, ücretsiz, dönüştürücü"
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
        <div>
          <Label>Robots yönergeleri</Label>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {ROBOT_OPTIONS.map((r) => (
              <label key={r} className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
                <Checkbox checked={robots.includes(r)} onChange={() => toggleRobot(r)} />
                {r}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5">
        <ResultBox
          value={result}
          placeholder="Oluşan meta etiketleri burada görünecek"
          rows={10}
          copyLabel="HTML'i Kopyala"
        />
      </div>
    </div>
  );
}
