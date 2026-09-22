"use client";

import { useRef, useState } from "react";
import { Label, Textarea, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { generateHashtags } from "@/lib/social";
import { IconCheck, IconCopy } from "@/components/icons";

const COUNTS = [5, 10, 15, 20, 30];

export default function HashtagGenerator() {
  const [input, setInput] = useState("");
  const [count, setCount] = useState("10");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tags = generateHashtags(input, parseInt(count, 10) || 10);

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
  };

  const copyOne = async (tag: string, i: number) => {
    await copyText(`#${tag}`);
    setCopiedIndex(i);
    setCopiedAll(false);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = async () => {
    await copyText(tags.map((t) => `#${t}`).join(" "));
    setCopiedAll(true);
    setCopiedIndex(null);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <div>
          <Label htmlFor="hg-in">Gönderi metni veya anahtar kelimeler</Label>
          <Textarea
            id="hg-in"
            rows={4}
            value={input}
            placeholder="Örnek: İstanbul'da yeni açılan kafede harika bir kahve deneyimi"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="sm:w-36">
          <Label htmlFor="hg-count">Adet</Label>
          <Select id="hg-count" value={count} onChange={(e) => setCount(e.target.value)}>
            {COUNTS.map((c) => (
              <option key={c} value={c}>
                {c} etiket
              </option>
            ))}
          </Select>
        </div>
      </div>
      {tags.length > 0 && (
        <div className="mt-5">
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag, i) => (
              <button
                key={tag}
                onClick={() => copyOne(tag, i)}
                className="flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-sm font-medium text-brand-700 transition hover:bg-brand-100"
                title="Kopyalamak için tıklayın"
              >
                {copiedIndex === i ? <IconCheck size={14} /> : null}
                #{tag}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <Button onClick={copyAll} variant="secondary" size="md">
              {copiedAll ? <IconCheck size={16} /> : <IconCopy size={16} />}
              {copiedAll ? "Tümü kopyalandı!" : "Tümünü Kopyala"}
            </Button>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            İpucu: Platforma uygun sayıda etiket seçin; Instagram&apos;da 5-10 alakalı
            etiket genellikle yeterlidir.
          </p>
        </div>
      )}
      {!input.trim() && (
        <p className="mt-4 text-sm text-slate-500">
          Hashtag önerileri için yukarıya bir metin veya anahtar kelime yazın.
        </p>
      )}
    </div>
  );
}
