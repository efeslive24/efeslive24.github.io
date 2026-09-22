"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDropzone } from "@/components/ui/dropzone";
import { downloadBlob } from "@/components/ui/copy-button";
import { Label, Select } from "@/components/ui/field";
import { fileToDataUrl, loadImage, canvasToBlob, formatBytes } from "../media-utils";
import { IconDownload } from "@/components/icons";

type OutFormat = "jpeg" | "png" | "webp";

const EXT: Record<OutFormat, string> = { jpeg: "jpg", png: "png", webp: "webp" };

export default function ImageConvert() {
  const [file, setFile] = useState<File | null>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [format, setFormat] = useState<OutFormat>("webp");
  const [quality, setQuality] = useState(85);
  const [result, setResult] = useState<{ url: string; blob: Blob; size: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = async (f: File) => {
    setFile(f);
    setResult(null);
    setError(null);
    try {
      setDataUrl(await fileToDataUrl(f));
    } catch {
      setError("Görsel okunamadı.");
    }
  };

  const convert = async (fmt: OutFormat = format, q: number = quality) => {
    if (!dataUrl || !file) return;
    setBusy(true);
    setError(null);
    try {
      const img = await loadImage(dataUrl);
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("canvas");
      if (fmt === "jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      const mime = fmt === "jpeg" ? "image/jpeg" : fmt === "webp" ? "image/webp" : "image/png";
      const blob = await canvasToBlob(canvas, mime, fmt === "png" ? undefined : q / 100);
      setResult({ url: URL.createObjectURL(blob), blob, size: blob.size });
    } catch {
      setError("Dönüştürme başarısız oldu.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      {!file ? (
        <FileDropzone
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          maxSizeMB={30}
          label="Görselinizi buraya sürükleyin veya seçin"
          hint="JPG ↔ PNG ↔ WebP dönüşümü; görsel cihazınızdan çıkmaz"
          onFiles={(files) => load(files[0])}
        />
      ) : (
        <div>
          <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="truncate text-sm font-medium text-slate-700">
              {file.name}
            </span>
            <span className="text-xs text-slate-500">{formatBytes(file.size)}</span>
            <Button variant="ghost" size="sm" onClick={() => { setFile(null); setResult(null); setDataUrl(null); }}>
              Değiştir
            </Button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="cv-f">Hedef format</Label>
              <Select
                id="cv-f"
                value={format}
                onChange={(e) => {
                  const f = e.target.value as OutFormat;
                  setFormat(f);
                  void convert(f);
                }}
              >
                <option value="webp">WebP (web için en küçük)</option>
                <option value="jpeg">JPG (fotoğraf)</option>
                <option value="png">PNG (şeffaflık)</option>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="cv-q">
                {format === "png" ? "PNG kayıpsızdır; kalite ayarı kullanılmaz" : `Kalite: %${quality}`}
              </Label>
              <input
                id="cv-q"
                type="range"
                min={10}
                max={100}
                value={quality}
                disabled={format === "png"}
                onChange={(e) => {
                  const q = parseInt(e.target.value, 10);
                  setQuality(q);
                  void convert(format, q);
                }}
                className="w-full accent-brand-600 disabled:opacity-40"
              />
            </div>
          </div>
          {result && (
            <div className="mt-5 flex flex-wrap items-center gap-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={result.url}
                alt="Dönüştürülmüş önizleme"
                className="max-h-40 max-w-full rounded object-contain"
              />
              <div>
                <p className="text-sm text-emerald-800">
                  {EXT[format].toUpperCase()} • {formatBytes(result.size)}
                </p>
                {busy && <p className="mt-1 text-xs text-slate-500">İşleniyor…</p>}
                <Button
                  className="mt-2"
                  onClick={() =>
                    downloadBlob(
                      result.blob,
                      `${file.name.replace(/\.[^.]+$/, "")}.${EXT[format]}`
                    )
                  }
                >
                  <IconDownload size={16} /> İndir
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
