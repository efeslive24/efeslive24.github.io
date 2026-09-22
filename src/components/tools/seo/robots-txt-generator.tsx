"use client";

import { useState } from "react";
import { Label, Input, Textarea, Checkbox } from "@/components/ui/field";
import { ResultBox } from "@/components/ui/result-box";
import { buildRobotsTxt } from "@/lib/seo-text";

const AGENTS = ["*", "Googlebot", "Bingbot", "Yandex", "GPTBot", "CCBot"];

export default function RobotsTxtGenerator() {
  const [agents, setAgents] = useState<string[]>(["*"]);
  const [disallow, setDisallow] = useState("/admin/\n/hesap/");
  const [allow, setAllow] = useState("");
  const [sitemap, setSitemap] = useState("https://site.com/sitemap.xml");
  const [crawlDelay, setCrawlDelay] = useState("");

  const toggleAgent = (a: string) => {
    setAgents((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  };

  const split = (s: string) => s.split("\n").map((l) => l.trim()).filter(Boolean);

  const result = buildRobotsTxt({
    groups:
      agents.length > 0
        ? agents.map((agent) => ({
            agent,
            disallow: split(disallow),
            allow: split(allow),
          }))
        : [{ agent: "*", disallow: split(disallow), allow: split(allow) }],
    sitemap: sitemap.trim() || undefined,
    crawlDelay: parseInt(crawlDelay, 10) || undefined,
  });

  return (
    <div>
      <div className="grid gap-4">
        <div>
          <Label>Kurallar hangi botlar için geçerli olsun?</Label>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {AGENTS.map((a) => (
              <label key={a} className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
                <Checkbox checked={agents.includes(a)} onChange={() => toggleAgent(a)} />
                {a === "*" ? "Tüm botlar (*)" : a}
              </label>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="rb-disallow">Engellenecek yollar (satır başına bir)</Label>
            <Textarea
              id="rb-disallow"
              rows={4}
              value={disallow}
              onChange={(e) => setDisallow(e.target.value)}
              placeholder="/admin/"
            />
          </div>
          <div>
            <Label htmlFor="rb-allow">İzin verilecek yollar (isteğe bağlı)</Label>
            <Textarea
              id="rb-allow"
              rows={4}
              value={allow}
              onChange={(e) => setAllow(e.target.value)}
              placeholder="/admin/giris/"
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="rb-sitemap">Sitemap URL’si</Label>
            <Input
              id="rb-sitemap"
              value={sitemap}
              onChange={(e) => setSitemap(e.target.value)}
              placeholder="https://site.com/sitemap.xml"
            />
          </div>
          <div>
            <Label htmlFor="rb-delay">Tarama gecikmesi (saniye, isteğe bağlı)</Label>
            <Input
              id="rb-delay"
              type="number"
              min={1}
              value={crawlDelay}
              onChange={(e) => setCrawlDelay(e.target.value)}
              placeholder="10"
            />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <ResultBox
          value={result}
          placeholder="Oluşan robots.txt içeriği burada görünecek"
          rows={12}
          downloadName="robots.txt"
          copyLabel="Kopyala"
        />
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Dosyayı sitenizin kök dizinine (https://site.com/robots.txt) yükleyin. Yanlış bir
        Disallow kuralı sayfalarınızın arama sonuçlarından çıkmasına neden olabilir.
      </p>
    </div>
  );
}
