"use client";

import { useState } from "react";
import { Label, Input, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ResultBox } from "@/components/ui/result-box";
import { buildCanonicalTags, type AlternateRef } from "@/lib/seo-text";
import { IconTrash } from "@/components/icons";

interface Alt extends AlternateRef {
  id: number;
}

let altCounter = 0;

export default function CanonicalGenerator() {
  const [canonical, setCanonical] = useState("");
  const [alts, setAlts] = useState<Alt[]>([]);
  const [href, setHref] = useState("");
  const [hreflang, setHreflang] = useState("");
  const [media, setMedia] = useState("");

  const addAlt = () => {
    if (!href.trim()) return;
    setAlts((prev) => [
      ...prev,
      {
        id: ++altCounter,
        href: href.trim(),
        hreflang: hreflang.trim() || undefined,
        media: media.trim() || undefined,
      },
    ]);
    setHref("");
    setHreflang("");
    setMedia("");
  };

  const result = buildCanonicalTags(canonical.trim(), alts);

  return (
    <div>
      <div className="grid gap-4">
        <div>
          <Label htmlFor="can-url">Tercih edilen (kanonik) URL</Label>
          <Input
            id="can-url"
            value={canonical}
            placeholder="https://site.com/sayfa"
            onChange={(e) => setCanonical(e.target.value)}
          />
          <p className="mt-1.5 text-xs text-slate-500">
            Mutlak URL kullanın (https:// ile). Her sayfada yalnızca bir canonical etiketi olmalıdır.
          </p>
        </div>
        <div>
          <Label>Alternatif sürümler (isteğe bağlı)</Label>
          {alts.length > 0 && (
            <ul className="mb-3 divide-y divide-slate-100 rounded-lg border border-slate-200">
              {alts.map((a) => (
                <li key={a.id} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700">
                  <span className="min-w-0 flex-1 truncate font-mono text-xs">{a.href}</span>
                  {a.hreflang && (
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">{a.hreflang}</span>
                  )}
                  {a.media && (
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">mobil</span>
                  )}
                  <button
                    aria-label="Kaldır"
                    className="rounded p-1 text-red-500 hover:bg-red-50"
                    onClick={() => setAlts((prev) => prev.filter((x) => x.id !== a.id))}
                  >
                    <IconTrash size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="grid gap-3 sm:grid-cols-[2fr_1fr_1fr_auto]">
            <Input
              aria-label="Alternatif URL"
              value={href}
              placeholder="https://site.com/sayfa?mobil=1"
              onChange={(e) => setHref(e.target.value)}
            />
            <Input
              aria-label="Dil kodu"
              value={hreflang}
              placeholder="Dil (örn. en)"
              onChange={(e) => setHreflang(e.target.value)}
            />
            <Select
              aria-label="Alternatif türü"
              value={media}
              onChange={(e) => setMedia(e.target.value)}
            >
              <option value="">—</option>
              <option value="only screen and (max-width: 640px)">Mobil sürüm</option>
            </Select>
            <Button variant="secondary" onClick={addAlt}>
              Ekle
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <ResultBox
          value={result}
          placeholder="Oluşan canonical etiketi burada görünecek"
          rows={6}
          copyLabel="HTML'i Kopyala"
        />
      </div>
    </div>
  );
}
