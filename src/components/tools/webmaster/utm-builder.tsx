"use client";

import { useState } from "react";
import { Label, Input, Checkbox } from "@/components/ui/field";
import { ResultBox } from "@/components/ui/result-box";
import { buildUtmUrl } from "@/lib/utm";
import { IconLink } from "@/components/icons";

export default function UtmBuilder() {
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  const [useTerm, setUseTerm] = useState(false);
  const [useContent, setUseContent] = useState(false);

  const result = buildUtmUrl({
    url,
    source,
    medium,
    campaign,
    term: useTerm ? term : undefined,
    content: useContent ? content : undefined,
  });

  const preview = (() => {
    if (!result) return null;
    try {
      const u = new URL(result);
      return [...u.searchParams.entries()]
        .filter(([k]) => k.startsWith("utm_"))
        .map(([k, v]) => ({ k, v }));
    } catch {
      return null;
    }
  })();

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="utm-url">Hedef URL</Label>
          <Input
            id="utm-url"
            value={url}
            placeholder="https://site.com/kampanya"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="utm-src">Kaynak (utm_source) *</Label>
          <Input
            id="utm-src"
            value={source}
            placeholder="instagram"
            onChange={(e) => setSource(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="utm-med">Ortam (utm_medium) *</Label>
          <Input
            id="utm-med"
            value={medium}
            placeholder="social"
            onChange={(e) => setMedium(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="utm-cmp">Kampanya (utm_campaign) *</Label>
          <Input
            id="utm-cmp"
            value={campaign}
            placeholder="bahar2026"
            onChange={(e) => setCampaign(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-end gap-3 pb-1">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
            <Checkbox checked={useTerm} onChange={(e) => setUseTerm(e.target.checked)} />
            Terim ekle (utm_term)
          </label>
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
            <Checkbox checked={useContent} onChange={(e) => setUseContent(e.target.checked)} />
            İçerik ekle (utm_content)
          </label>
        </div>
        {useTerm && (
          <div>
            <Label htmlFor="utm-term">Terim</Label>
            <Input id="utm-term" value={term} placeholder="indirim" onChange={(e) => setTerm(e.target.value)} />
          </div>
        )}
        {useContent && (
          <div>
            <Label htmlFor="utm-cont">İçerik</Label>
            <Input id="utm-cont" value={content} placeholder="banner1" onChange={(e) => setContent(e.target.value)} />
          </div>
        )}
      </div>
      {preview && preview.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {preview.map((p) => (
            <span
              key={p.k}
              className="rounded-full bg-brand-50 px-3 py-1 font-mono text-xs text-brand-700"
            >
              {p.k}={p.v}
            </span>
          ))}
        </div>
      )}
      <div className="mt-5">
        <ResultBox
          value={result ?? ""}
          placeholder="UTM'li kampanya linkiniz burada oluşacak"
          rows={3}
          copyLabel="Linki Kopyala"
        />
        {!result && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
            <IconLink size={14} /> Başlamak için URL ve temel parametreleri doldurun.
          </p>
        )}
      </div>
    </div>
  );
}
