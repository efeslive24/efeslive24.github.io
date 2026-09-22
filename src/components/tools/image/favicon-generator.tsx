"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDropzone } from "@/components/ui/dropzone";
import { downloadBlob } from "@/components/ui/copy-button";
import { Label, Select } from "@/components/ui/field";
import { CopyButton } from "@/components/ui/copy-button";
import { fileToDataUrl, loadImage, canvasToBlob, sleep, formatBytes, bytesToBlob } from "../media-utils";
import { buildIco } from "@/lib/ico";
import { IconDownload } from "@/components/icons";

const SIZES = [16, 32, 48, 64, 128, 180, 192, 512];
const ICO_SIZES = [16, 32, 48, 64];

type Bg = "transparent" | "white";

export default function FaviconGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [bg, setBg] = useState<Bg>("transparent");
  const [radius, setRadius] = useState("0");
  const [generated, setGenerated] = useState<{ size: number; url: string; blob: Blob }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = async (f: File) => {
    setFile(f);
    setGenerated([]);
    setError(null);
    try {
      setDataUrl(await fileToDataUrl(f));
    } catch {
      setError("Görsel okunamadı.");
    }
  };

  const drawIcon = (img: HTMLImageElement, size: number): HTMLCanvasElement => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("canvas");
    if (bg === "white") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);
    }
    const r = (parseInt(radius, 10) / 100) * size;
    ctx.beginPath();
    if (r > 0) {
      ctx.moveTo(r, 0);
      ctx.arcTo(size, 0, size, size, r);
      ctx.arcTo(size, size, 0, size, r);
      ctx.arcTo(0, size, 0, 0, r);
      ctx.arcTo(0, 0, size, 0, r);
      ctx.closePath();
      ctx.clip();
    }
    const s = Math.min(size / img.naturalWidth, size / img.naturalHeight);
    const w = img.naturalWidth * s;
    const h = img.naturalHeight * s;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
    return canvas;
  };

  const generate = async () => {
    if (!dataUrl) return;
    setBusy(true);
    setError(null);
    try {
      const img = await loadImage(dataUrl);
      const list = [];
      for (const size of SIZES) {
        const canvas = drawIcon(img, size);
        const blob = await canvasToBlob(canvas, "image/png");
        list.push({ size, url: URL.createObjectURL(blob), blob });
      }
      setGenerated(list);
    } catch {
      setError("Favicon üretilemedi.");
    } finally {
      setBusy(false);
    }
  };

  const downloadAll = async () => {
    const base = "favicon";
    for (const g of generated) {
      downloadBlob(g.blob, `${base}-${g.size}x${g.size}.png`);
      await sleep(350);
    }
  };

  const downloadIco = async () => {
    if (!dataUrl) return;
    try {
      const img = await loadImage(dataUrl);
      const pngs = [];
      for (const size of ICO_SIZES) {
        const canvas = drawIcon(img, size);
        const blob = await canvasToBlob(canvas, "image/png");
        pngs.push({ width: size, height: size, data: new Uint8Array(await blob.arrayBuffer()) });
      }
      const ico = buildIco(pngs);
      downloadBlob(bytesToBlob(ico, "image/x-icon"), "favicon.ico");
    } catch {
      setError("ICO dosyası oluşturulamadı.");
    }
  };

  const htmlSnippet = generated.length
    ? `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png">
<link rel="apple-touch-icon" sizes="180x180" href="/favicon-180x180.png">`
    : "";

  const manifestSnippet = generated.length
    ? `"icons": [
  { "src": "/favicon-192x192.png", "sizes": "192x192", "type": "image/png" },
  { "src": "/favicon-512x512.png", "sizes": "512x512", "type": "image/png" }
]`
    : "";

  return (
    <div>
      {!file ? (
        <FileDropzone
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          maxSizeMB={20}
          label="Logo veya görselinizi buraya sürükleyin"
          hint="Kare görsel en iyi sonucu verir; görsel cihazınızdan çıkmaz"
          onFiles={(files) => load(files[0])}
        />
      ) : (
        <div>
          <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="truncate text-sm font-medium text-slate-700">
              {file.name}
            </span>
            <span className="text-xs text-slate-500">{formatBytes(file.size)}</span>
            <Button variant="ghost" size="sm" onClick={() => { setFile(null); setGenerated([]); setDataUrl(null); }}>
              Değiştir
            </Button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="fv-bg">Arka plan</Label>
              <Select id="fv-bg" value={bg} onChange={(e) => setBg(e.target.value as Bg)}>
                <option value="transparent">Şeffaf (PNG)</option>
                <option value="white">Beyaz</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="fv-r">Köşe yuvarlatma: %{radius}</Label>
              <input
                id="fv-r"
                type="range"
                min={0}
                max={50}
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="w-full accent-brand-600"
              />
            </div>
            <div className="self-end">
              <Button onClick={generate} disabled={busy}>
                Favicon Seti Üret
              </Button>
            </div>
          </div>
          {generated.length > 0 && (
            <div className="mt-5">
              <div className="flex flex-wrap gap-4">
                {generated.map((g) => (
                  <div key={g.size} className="flex flex-col items-center gap-1.5">
                    <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={g.url}
                        alt={`${g.size}×${g.size}`}
                        className="max-h-full max-w-full"
                        style={{ imageRendering: "auto" }}
                      />
                    </div>
                    <span className="text-xs text-slate-500">{g.size}px</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button onClick={downloadAll}>
                  <IconDownload size={16} /> Tüm PNG’leri İndir
                </Button>
                <Button variant="secondary" onClick={downloadIco}>
                  <IconDownload size={16} /> favicon.ico İndir
                </Button>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-1.5 text-sm font-medium text-slate-700">
                    HTML &lt;head&gt; kodu
                  </p>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <pre className="overflow-x-auto font-mono text-xs text-slate-700">
                      {htmlSnippet}
                    </pre>
                    <div className="mt-2">
                      <CopyButton getText={() => htmlSnippet} label="Kodu Kopyala" />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="mb-1.5 text-sm font-medium text-slate-700">
                    Manifest (PWA) parçası
                  </p>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <pre className="overflow-x-auto font-mono text-xs text-slate-700">
                      {manifestSnippet}
                    </pre>
                    <div className="mt-2">
                      <CopyButton getText={() => manifestSnippet} label="Kodu Kopyala" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
    </div>
  );
}
