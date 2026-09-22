"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDropzone } from "@/components/ui/dropzone";
import { downloadBlob } from "@/components/ui/copy-button";
import { Label, Input } from "@/components/ui/field";
import { fileToDataUrl, loadImage, canvasToBlob, formatBytes } from "../media-utils";
import { IconDownload, IconRotate } from "@/components/icons";

export default function ImageRotateTool() {
  const [file, setFile] = useState<File | null>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [angle, setAngle] = useState("0");
  const [error, setError] = useState<string | null>(null);

  const load = async (f: File) => {
    setFile(f);
    setPreview(null);
    setBlob(null);
    setError(null);
    try {
      const url = await fileToDataUrl(f);
      setDataUrl(url);
      setPreview(url);
      setAngle("0");
    } catch {
      setError("Görsel okunamadı.");
    }
  };

  const rotate = async (deg: number) => {
    if (!dataUrl || !file) return;
    const next = ((deg % 360) + 360) % 360;
    setAngle(String(next));
    if (next === 0) {
      setPreview(dataUrl);
      setBlob(null);
      return;
    }
    try {
      const img = await loadImage(dataUrl);
      const rad = (next * Math.PI) / 180;
      const cos = Math.abs(Math.cos(rad));
      const sin = Math.abs(Math.sin(rad));
      const nw = Math.round(img.naturalWidth * cos + img.naturalHeight * sin);
      const nh = Math.round(img.naturalWidth * sin + img.naturalHeight * cos);
      const canvas = document.createElement("canvas");
      canvas.width = nw;
      canvas.height = nh;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("canvas");
      if (file.type !== "image/png") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, nw, nh);
      }
      ctx.translate(nw / 2, nh / 2);
      ctx.rotate(rad);
      ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
      const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
      const b = await canvasToBlob(canvas, mime, 0.92);
      setBlob(b);
      setPreview(URL.createObjectURL(b));
    } catch {
      setError("Döndürme başarısız oldu.");
    }
  };

  return (
    <div>
      {!file ? (
        <FileDropzone
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          maxSizeMB={30}
          label="Görselinizi buraya sürükleyin veya seçin"
          hint="Döndürme tarayıcınızda yapılır; görsel sunucuya gitmez"
          onFiles={(files) => load(files[0])}
        />
      ) : (
        <div>
          <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="truncate text-sm font-medium text-slate-700">
              {file.name}
            </span>
            <span className="text-xs text-slate-500">{formatBytes(file.size)}</span>
            <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
              Değiştir
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap items-end gap-2">
            <Button variant="secondary" onClick={() => void rotate(parseInt(angle, 10) - 90)}>
              <IconRotate size={15} /> Sola 90°
            </Button>
            <Button variant="secondary" onClick={() => void rotate(parseInt(angle, 10) + 90)}>
              Sağa 90°
            </Button>
            <Button variant="secondary" onClick={() => void rotate(parseInt(angle, 10) + 180)}>
              180°
            </Button>
            <div className="w-32">
              <Label htmlFor="rot-angle">Açı (°)</Label>
              <Input
                id="rot-angle"
                type="number"
                value={angle}
                onChange={(e) => void rotate(parseInt(e.target.value || "0", 10))}
              />
            </div>
          </div>
          {preview && (
            <div className="mt-4 flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Önizleme" className="max-h-80 max-w-full rounded object-contain" />
            </div>
          )}
          {blob && (
            <div className="mt-4">
              <Button
                onClick={() =>
                  downloadBlob(blob, `${file.name.replace(/\.[^.]+$/, "")}-${angle}derece.${file.name.split(".").pop()}`)
                }
              >
                <IconDownload size={16} /> Döndürülmüş Görseli İndir
              </Button>
            </div>
          )}
        </div>
      )}
      {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
    </div>
  );
}
