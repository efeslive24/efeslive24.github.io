"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDropzone } from "@/components/ui/dropzone";
import { CopyButton, downloadText } from "@/components/ui/copy-button";
import { Label, Select } from "@/components/ui/field";
import { fileToDataUrl, loadImage } from "../media-utils";
import { medianCutPalette, rgbToHex, type Rgb } from "@/lib/palette";
import { IconDownload, IconSparkles } from "@/components/icons";

interface Swatch {
  hex: string;
  share: number;
}

export default function ColorPalette() {
  const [file, setFile] = useState<File | null>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [count, setCount] = useState("6");
  const [swatches, setSwatches] = useState<Swatch[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async (f: File) => {
    setFile(f);
    setSwatches(null);
    setError(null);
    try {
      setDataUrl(await fileToDataUrl(f));
    } catch {
      setError("Görsel okunamadı.");
    }
  };

  const extract = async (n: number) => {
    if (!dataUrl) return;
    setBusy(true);
    setError(null);
    try {
      const img = await loadImage(dataUrl);
      const maxSide = 96;
      const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) throw new Error("canvas");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const palette = medianCutPalette(data, n);

      const counts = new Array(palette.length).fill(0);
      for (let i = 0; i < data.length; i += 4) {
        const px: Rgb = { r: data[i], g: data[i + 1], b: data[i + 2] };
        let best = 0;
        let bestDist = Infinity;
        palette.forEach((c, ci) => {
          const dr = c.r - px.r;
          const dg = c.g - px.g;
          const db = c.b - px.b;
          const dist = dr * dr + dg * dg + db * db;
          if (dist < bestDist) {
            bestDist = dist;
            best = ci;
          }
        });
        counts[best] += 1;
      }
      const totalPx = Math.max(1, data.length / 4);
      setSwatches(
        palette.map((c, i) => ({
          hex: rgbToHex(c),
          share: Math.round((counts[i] / totalPx) * 1000) / 10,
        }))
      );
    } catch {
      setError("Palet çıkarılamadı. Görselin geçerli bir formatta olduğundan emin olun.");
    } finally {
      setBusy(false);
    }
  };

  const paletteText = swatches ? swatches.map((s) => s.hex).join(", ") : "";

  return (
    <div>
      {!file ? (
        <FileDropzone
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          maxSizeMB={30}
          label="Görselinizi buraya sürükleyin veya seçin"
          hint="Renk analizi tarayıcınızda yapılır; görsel sunucuya gitmez"
          onFiles={(files) => load(files[0])}
        />
      ) : (
        <div>
          <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="truncate text-sm font-medium text-slate-700">
              {file.name}
            </span>
            <Button variant="ghost" size="sm" onClick={() => { setFile(null); setSwatches(null); setDataUrl(null); }}>
              Değiştir
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap items-end gap-4">
            <div className="w-48">
              <Label htmlFor="pal-count">Renk sayısı</Label>
              <Select
                id="pal-count"
                value={count}
                onChange={(e) => {
                  setCount(e.target.value);
                  void extract(parseInt(e.target.value, 10));
                }}
              >
                {[4, 5, 6, 7, 8, 10].map((n) => (
                  <option key={n} value={n}>{n} renk</option>
                ))}
              </Select>
            </div>
            <Button onClick={() => extract(parseInt(count, 10))} disabled={busy}>
              <IconSparkles size={16} /> Paleti Çıkar
            </Button>
            {busy && <span className="text-sm text-slate-500">Analiz ediliyor…</span>}
          </div>
          {swatches && (
            <div className="mt-5">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {swatches.map((s) => (
                  <div
                    key={s.hex}
                    className="overflow-hidden rounded-xl border border-slate-200"
                  >
                    <div
                      className="h-20 w-full"
                      style={{ backgroundColor: s.hex }}
                      aria-label={s.hex}
                    />
                    <div className="flex items-center justify-between px-2.5 py-2">
                      <div>
                        <p className="font-mono text-xs font-semibold text-slate-800">{s.hex}</p>
                        <p className="text-[11px] text-slate-500">%{s.share}</p>
                      </div>
                      <CopyButton getText={() => s.hex} label="" variant="ghost" size="sm" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <CopyButton getText={() => paletteText} label="Tüm Renkleri Kopyala" variant="secondary" />
                <Button variant="ghost" size="sm" onClick={() => downloadText(paletteText, "renk-paleti.txt")}>
                  <IconDownload size={15} /> Metin Olarak İndir
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
    </div>
  );
}
