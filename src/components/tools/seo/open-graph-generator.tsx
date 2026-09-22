"use client";

import { useState } from "react";
import { Label, Input, Textarea, Select } from "@/components/ui/field";
import { ResultBox } from "@/components/ui/result-box";
import { buildOpenGraph } from "@/lib/seo-text";

export default function OpenGraphGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("website");
  const [siteName, setSiteName] = useState("");
  const [twitterCard, setTwitterCard] = useState("summary_large_image");

  const result = buildOpenGraph({
    title,
    description,
    url,
    image,
    type,
    siteName,
    locale: "tr_TR",
    twitterCard,
  });

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="og-title">Başlık</Label>
          <Input
            id="og-title"
            value={title}
            placeholder="Paylaşımda görünecek başlık"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="og-desc">Açıklama</Label>
          <Textarea
            id="og-desc"
            rows={2}
            value={description}
            placeholder="Paylaşım önizlemesinde görünecek açıklama"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="og-url">Sayfa URL’si</Label>
          <Input
            id="og-url"
            value={url}
            placeholder="https://site.com/sayfa"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="og-img">Görsel URL’si (1200×630 önerilir)</Label>
          <Input
            id="og-img"
            value={image}
            placeholder="https://site.com/gorsel.jpg"
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="og-type">İçerik türü</Label>
          <Select id="og-type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="website">Web Sitesi</option>
            <option value="article">Makale</option>
            <option value="product">Ürün</option>
            <option value="profile">Profil</option>
            <option value="video.other">Video</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="og-site">Site adı</Label>
          <Input
            id="og-site"
            value={siteName}
            placeholder="Free Online Tools"
            onChange={(e) => setSiteName(e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="og-card">X (Twitter) kart türü</Label>
          <Select
            id="og-card"
            value={twitterCard}
            onChange={(e) => setTwitterCard(e.target.value)}
          >
            <option value="summary_large_image">Büyük görselli kart</option>
            <option value="summary">Küçük kart</option>
          </Select>
        </div>
      </div>

      {title && url && (
        <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
          <div className="bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500">
            Önizleme (sosyal medyada böyle görünür)
          </div>
          <div className="p-4">
            <div className="rounded-lg bg-slate-100">
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt="" className="h-40 w-full object-cover" />
              ) : (
                <div className="flex h-40 w-full items-center justify-center text-xs text-slate-400">
                  Görsel URL’si girilmedi
                </div>
              )}
            </div>
            <p className="mt-2 text-xs uppercase tracking-wide text-slate-400">
              {url.replace(/^https?:\/\//, "")}
            </p>
            <p className="text-sm font-semibold text-slate-800">{title || "Başlık"}</p>
            <p className="text-sm text-slate-600 line-clamp-2">
              {description || "Açıklama"}
            </p>
          </div>
        </div>
      )}

      <div className="mt-5">
        <ResultBox
          value={result}
          placeholder="Oluşan OG ve Twitter etiketleri burada görünecek"
          rows={12}
          copyLabel="HTML'i Kopyala"
        />
      </div>
    </div>
  );
}
