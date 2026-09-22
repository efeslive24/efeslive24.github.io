"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDropzone } from "@/components/ui/dropzone";
import { downloadBlob } from "@/components/ui/copy-button";
import { fileToDataUrl, loadImage, canvasToBlob, formatBytes } from "../media-utils";
import { IconDownload, IconRefresh } from "@/components/icons";

export default function ImageMirror() {
  const [file, setFile] = useState<File | null>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [flip, setFlip] = useState<{ x: boolean; y: boolean }>({ x: false, y: false });
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
      setFlip({ x: false, y: false });
    } catch {
      setError("Görsel okunamadı.");
    }
  };

  const apply = async (x: boolean, y: boolean) => {
    if (!dataUrl || !file) return;
    setFlip({ x, y });
    try {
      const img = await loadImage(dataUrl);
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("canvas");
      ctx.translate(x ? canvas.width : 0, y ? canvas.height : 0);
      ctx.scale(x ? -1 : 1, y ? -1 : 1);
      ctx.drawImage(img, 0, 0);
      const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
      const b = await canvasToBlob(canvas, mime, 0.92);
      setBlob(b);
      setPreview(URL.createObjectURL(b));
    } catch {
      setError("İşlem başarısız oldu.");
    }
  };

  const reset = () => {
    if (dataUrl) {
      setPreview(dataUrl);
      setBlob(null);
      setFlip({ x: false, y: false });
    }
  };

  return (
    <div>
      {!file ? (
        <FileDropzone
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          maxSizeMB={30}
          label="Görselinizi buraya sürükleyin veya seçin"
          hint="Çevirme tarayıcınızda yapılır; görsel sunucuya gitmez"
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
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => void apply(!flip.x, flip.y)}>
              Yatay Çevir (Sağ-Sol)
            </Button>
            <Button variant="secondary" onClick={() => void apply(flip.x, !flip.y)}>
              Dikey Çevir (Alt-Üst)
            </Button>
            <Button variant="ghost" onClick={reset}>
              <IconRefresh size={15} /> Sıfırla
            </Button>
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
                  downloadBlob(blob, `${file.name.replace(/\.[^.]+$/, "")}-cevrilmis.${file.name.split(".").pop()}`)
                }
              >
                <IconDownload size={16} /> Çevrilmiş Görseli İndir
              </Button>
            </div>
          )}
        </div>
      )}
      {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
    </div>
  );
}
