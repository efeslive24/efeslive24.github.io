"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDropzone } from "@/components/ui/dropzone";
import { downloadBlob } from "@/components/ui/copy-button";
import { Label, Select } from "@/components/ui/field";
import { fileToDataUrl, loadImage, canvasToBlob, formatBytes } from "../media-utils";
import { IconDownload } from "@/components/icons";

type OutFormat = "auto" | "jpeg" | "webp" | "png";

const MIME: Record<OutFormat, string> = {
  auto: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  png: "image/png",
};

interface Result {
  url: string;
  blob: Blob;
  size: number;
  ext: string;
}

export default function ImageCompress() {
  const [file, setFile] = useState<File | null>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(70);
  const [format, setFormat] = useState<OutFormat>("auto");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = async (f: File) => {
    setFile(f);
    setResult(null);
    setError(null);
    try {
      const url = await fileToDataUrl(f);
      setDataUrl(url);
      await process(url, f, quality, format);
    } catch {
      setError("Görsel okunamadı.");
    }
  };

  const process = async (
    url: string,
    f: File,
    q: number,
    fmt: OutFormat
  ) => {
    if (!url || !f) return;
    setBusy(true);
    setError(null);
    try {
      const img = await loadImage(url);
      const isPng = f.type === "image/png";
      const out: OutFormat = fmt === "auto" ? (isPng ? "png" : "jpeg") : fmt;
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("canvas");
      if (out === "jpeg" && isPng) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      const mime = MIME[out];
      const blob = await canvasToBlob(canvas, mime, out === "png" ? undefined : q / 100);
      const blobUrl = URL.createObjectURL(blob);
      setResult({
        url: blobUrl,
        blob,
        size: blob.size,
        ext: out === "jpeg" ? "jpg" : out === "webp" ? "webp" : "png",
      });
    } catch {
      setError("Sıkıştırma başarısız oldu. Görselin geçerli bir formatta olduğundan emin olun.");
    } finally {
      setBusy(false);
    }
  };

  const savings =
    result && file
      ? Math.max(0, Math.round((1 - result.size / file.size) * 100))
      : null;

  return (
    <div>
      {!file ? (
        <FileDropzone
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          maxSizeMB={30}
          label="Görselinizi buraya sürükleyin veya seçin"
          hint="JPG, PNG ve WebP desteklenir; görsel cihazınızdan çıkmaz"
          onFiles={(files) => load(files[0])}
        />
      ) : (
        <div>
          <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="truncate text-sm font-medium text-slate-700">
              {file.name}
            </span>
            <span className="text-xs text-slate-500">{formatBytes(file.size)}</span>
            <Button variant="ghost" size="sm" onClick={() => { setFile(null); setDataUrl(null); setResult(null); }}>
              Değiştir
            </Button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="cmp-q">Kalite: %{quality}</Label>
              <input
                id="cmp-q"
                type="range"
                min={10}
                max={95}
                value={quality}
                onChange={(e) => {
                  const q = parseInt(e.target.value, 10);
                  setQuality(q);
                  if (dataUrl && file) void process(dataUrl, file, q, format);
                }}
                className="w-full accent-brand-600"
              />
            </div>
            <div>
              <Label htmlFor="cmp-f">Çıktı formatı</Label>
              <Select
                id="cmp-f"
                value={format}
                onChange={(e) => {
                  const f = e.target.value as OutFormat;
                  setFormat(f);
                  if (dataUrl && file) void process(dataUrl, file, quality, f);
                }}
              >
                <option value="auto">Orijinal formatı koru</option>
                <option value="jpeg">JPG</option>
                <option value="webp">WebP</option>
                <option value="png">PNG</option>
              </Select>
            </div>
          </div>
          {result && (
            <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto]">
              <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={result.url}
                  alt="Sıkıştırılmış önizleme"
                  className="max-h-64 max-w-full rounded object-contain"
                />
              </div>
              <div className="flex flex-col justify-center gap-2 sm:w-56">
                <p className="text-sm text-slate-700">
                  <span className="font-medium">{formatBytes(file.size)}</span> →{" "}
                  <span className="font-medium text-emerald-700">{formatBytes(result.size)}</span>
                </p>
                {savings !== null && (
                  <p className="text-sm text-emerald-700">%{savings} boyut tasarrufu</p>
                )}
                {busy && <p className="text-xs text-slate-500">İşleniyor…</p>}
                <Button
                  onClick={() =>
                    downloadBlob(
                      result.blob,
                      `${file.name.replace(/\.[^.]+$/, "")}-sikistirilmis.${result.ext}`
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
