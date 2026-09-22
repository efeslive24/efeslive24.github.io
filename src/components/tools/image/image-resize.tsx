"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDropzone } from "@/components/ui/dropzone";
import { Label, Input, Select, Checkbox } from "@/components/ui/field";
import { fileToDataUrl, loadImage, canvasToBlob, formatBytes } from "../media-utils";
import { IconDownload } from "@/components/icons";

type OutFormat = "auto" | "jpeg" | "webp" | "png";

const PRESETS: { label: string; w: number; h: number }[] = [
  { label: "Kare 1080", w: 1080, h: 1080 },
  { label: "Full HD", w: 1920, h: 1080 },
  { label: "HD", w: 1280, h: 720 },
  { label: "Küçük (800)", w: 800, h: 800 },
];

interface Result {
  url: string;
  blob: Blob;
  w: number;
  h: number;
  size: number;
  ext: string;
}

export default function ImageResize() {
  const [file, setFile] = useState<File | null>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [orig, setOrig] = useState<{ w: number; h: number } | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lock, setLock] = useState(true);
  const [percent, setPercent] = useState("100");
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
      const img = await loadImage(url);
      setDataUrl(url);
      setOrig({ w: img.naturalWidth, h: img.naturalHeight });
      setWidth(String(img.naturalWidth));
      setHeight(String(img.naturalHeight));
    } catch {
      setError("Görsel okunamadı.");
    }
  };

  const setW = (v: string) => {
    setWidth(v);
    if (lock && orig && v && percent === "100") {
      const w = parseInt(v, 10);
      if (w > 0) setHeight(String(Math.round((w / orig.w) * orig.h)));
    }
  };

  const setH = (v: string) => {
    setHeight(v);
    if (lock && orig && v && percent === "100") {
      const h = parseInt(v, 10);
      if (h > 0) setWidth(String(Math.round((h / orig.h) * orig.w)));
    }
  };

  const setP = (v: string) => {
    setPercent(v);
    if (orig) {
      const p = parseInt(v, 10);
      if (p > 0) {
        setWidth(String(Math.round((orig.w * p) / 100)));
        setHeight(String(Math.round((orig.h * p) / 100)));
      }
    }
  };

  const applyPreset = (w: number, h: number) => {
    setPercent("");
    setWidth(String(w));
    setHeight(String(h));
  };

  const run = async () => {
    if (!dataUrl || !file || !orig) return;
    setBusy(true);
    setError(null);
    try {
      const w = Math.max(1, Math.min(10000, Math.round(parseInt(width, 10) || orig.w)));
      const h = Math.max(1, Math.min(10000, Math.round(parseInt(height, 10) || orig.h)));
      const img = await loadImage(dataUrl);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("canvas");
      const out: OutFormat =
        format === "auto" ? (file.type === "image/png" ? "png" : "jpeg") : format;
      if (out === "jpeg" && file.type === "image/png") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, w, h);
      }
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, w, h);
      const mime = out === "jpeg" ? "image/jpeg" : out === "webp" ? "image/webp" : "image/png";
      const blob = await canvasToBlob(canvas, mime, out === "png" ? undefined : 0.9);
      setResult({
        url: URL.createObjectURL(blob),
        blob,
        w,
        h,
        size: blob.size,
        ext: out === "jpeg" ? "jpg" : out,
      });
    } catch {
      setError("Boyutlandırma başarısız oldu.");
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
          hint="Görsel cihazınızdan çıkmaz; işlem tarayıcıda yapılır"
          onFiles={(files) => load(files[0])}
        />
      ) : (
        <div>
          <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="truncate text-sm font-medium text-slate-700">
              {file.name}
            </span>
            <span className="text-xs text-slate-500">
              {orig ? `${orig.w}×${orig.h} • ` : ""}
              {formatBytes(file.size)}
            </span>
            <Button variant="ghost" size="sm" onClick={() => { setFile(null); setResult(null); setOrig(null); }}>
              Değiştir
            </Button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="rs-w">Genişlik (px)</Label>
              <Input
                id="rs-w"
                type="number"
                min={1}
                value={width}
                onChange={(e) => setW(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="rs-h">Yükseklik (px)</Label>
              <Input
                id="rs-h"
                type="number"
                min={1}
                value={height}
                onChange={(e) => setH(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="rs-p">Yüzde (%)</Label>
              <Input
                id="rs-p"
                type="number"
                min={1}
                max={500}
                value={percent}
                onChange={(e) => setP(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
              <Checkbox
                checked={lock}
                onChange={(e) => setLock(e.target.checked)}
              />
              En-boy oranını koru
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => applyPreset(p.w, p.h)}
                  className="rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-600 hover:border-brand-400 hover:text-brand-700"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto]">
            <div>
              <Label htmlFor="rs-f">Çıktı formatı</Label>
              <Select
                id="rs-f"
                value={format}
                onChange={(e) => setFormat(e.target.value as OutFormat)}
              >
                <option value="auto">Orijinal formatı koru</option>
                <option value="jpeg">JPG</option>
                <option value="webp">WebP</option>
                <option value="png">PNG</option>
              </Select>
            </div>
            <div className="self-end">
              <Button onClick={run} disabled={busy}>
                <IconDownload size={16} /> Boyutlandır ve İndir
              </Button>
            </div>
          </div>
          {result && (
            <div className="mt-5 flex flex-wrap items-center gap-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={result.url}
                alt="Boyutlandırılmış önizleme"
                className="max-h-40 max-w-full rounded object-contain"
              />
              <p className="text-sm text-emerald-800">
                {result.w}×{result.h} px • {formatBytes(result.size)}
              </p>
            </div>
          )}
        </div>
      )}
      {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
    </div>
  );
}
