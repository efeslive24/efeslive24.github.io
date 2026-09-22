"use client";

import { useState } from "react";
import { Label, Textarea, Select } from "@/components/ui/field";
import { ResultBox } from "@/components/ui/result-box";
import { buildSitemapXml } from "@/lib/seo-text";
import { isValidUrl } from "@/lib/utm";

export default function SitemapGenerator() {
  const [urls, setUrls] = useState("");
  const [changefreq, setChangefreq] = useState("weekly");
  const [priority, setPriority] = useState("0.7");

  const parsed = urls
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => (isValidUrl(l) ? l : `https://${l}`));

  const valid = parsed.filter((u) => isValidUrl(u));
  const invalidCount = parsed.length - valid.length;

  const result = buildSitemapXml(
    valid.map((loc) => ({
      loc,
      changefreq,
      priority,
    }))
  );

  return (
    <div>
      <div>
        <Label htmlFor="sm-urls">Site URL’leriniz (her satıra bir tane)</Label>
        <Textarea
          id="sm-urls"
          rows={10}
          value={urls}
          placeholder={"https://site.com/\nhttps://site.com/hakkimizda\nhttps://site.com/iletisim"}
          onChange={(e) => setUrls(e.target.value)}
        />
        <p className="mt-1.5 text-xs text-slate-500">
          {valid.length} geçerli URL
          {invalidCount > 0 && (
            <span className="text-amber-600"> • {invalidCount} URL atlandı</span>
          )}
        </p>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="sm-freq">Değişiklik sıklığı</Label>
          <Select id="sm-freq" value={changefreq} onChange={(e) => setChangefreq(e.target.value)}>
            <option value="always">Her zaman</option>
            <option value="hourly">Saatlik</option>
            <option value="daily">Günlük</option>
            <option value="weekly">Haftalık</option>
            <option value="monthly">Aylık</option>
            <option value="yearly">Yıllık</option>
            <option value="never">Hiç</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="sm-prio">Öncelik</Label>
          <Select id="sm-prio" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="1.0">1.0 (en yüksek)</option>
            <option value="0.8">0.8</option>
            <option value="0.7">0.7</option>
            <option value="0.5">0.5</option>
            <option value="0.3">0.3</option>
          </Select>
        </div>
      </div>
      <div className="mt-5">
        <ResultBox
          value={result}
          placeholder="XML sitemap burada oluşacak"
          rows={12}
          downloadName="sitemap.xml"
          mime="application/xml"
          copyLabel="XML'i Kopyala"
        />
      </div>
    </div>
  );
}
