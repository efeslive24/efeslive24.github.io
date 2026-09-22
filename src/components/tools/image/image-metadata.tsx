"use client";

import { useState } from "react";
import * as exifr from "exifr";
import { Button } from "@/components/ui/button";
import { FileDropzone } from "@/components/ui/dropzone";
import { downloadText } from "@/components/ui/copy-button";
import { fileToDataUrl, loadImage, formatBytes } from "../media-utils";
import { IconDownload } from "@/components/icons";

const LABELS: Record<string, string> = {
  Make: "Kamera Markası",
  Model: "Kamera Modeli",
  LensModel: "Lens",
  FNumber: "Diyafram (f/)",
  ExposureTime: "Enstantane",
  ISO: "ISO",
  FocalLength: "Odak Uzunluğu",
  FocalLengthIn35mmFormat: "35mm Karşılığı",
  DateTimeOriginal: "Çekim Tarihi",
  CreateDate: "Oluşturulma",
  ModifyDate: "Değiştirilme",
  Software: "Yazılım",
  Orientation: "Yön",
  WhiteBalance: "Beyaz Dengesi",
  Flash: "Flaş",
  ExposureProgram: "Pozlama Modu",
  MeteringMode: "Ölçüm Modu",
  GPSLatitude: "GPS Enlem",
  GPSLongitude: "GPS Boylam",
  ImageWidth: "Genişlik",
  ImageHeight: "Yükseklik",
  XResolution: "X Çözünürlük",
  YResolution: "Y Çözünürlük",
  Compression: "Sıkıştırma",
  ColorSpace: "Renk Uzayı",
  Artist: "Fotoğrafçı",
  Copyright: "Telif",
};

const PREFERRED = [
  "Make", "Model", "LensModel", "FNumber", "ExposureTime", "ISO", "FocalLength",
  "DateTimeOriginal", "GPSLatitude", "GPSLongitude", "Software", "Artist", "Copyright",
];

function formatValue(key: string, value: unknown): string {
  if (value == null) return "—";
  if (value instanceof Date) return value.toLocaleString("tr-TR");
  if (typeof value === "number") {
    if (key === "ExposureTime" && value < 1) return `1/${Math.round(1 / value)} sn`;
    if (key === "FocalLength") return `${value} mm`;
    if (key === "ISO") return `${value}`;
    return String(Math.round(value * 100) / 100);
  }
  if (Array.isArray(value)) return value.join(", ");
  return String(value);
}

interface MetaRow {
  label: string;
  value: string;
}

export default function ImageMetadata() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<string | null>(null);
  const [rows, setRows] = useState<MetaRow[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async (f: File) => {
    setFile(f);
    setRows(null);
    setPreview(null);
    setError(null);
    setBusy(true);
    try {
      const url = await fileToDataUrl(f);
      setPreview(url);
      const img = await loadImage(url);
      setDimensions(`${img.naturalWidth}×${img.naturalHeight} px`);
      const exif = await exifr.parse(f, { gps: true });
      const out: MetaRow[] = [];
      if (exif) {
        PREFERRED.forEach((key) => {
          if (key in exif) out.push({ label: LABELS[key] ?? key, value: formatValue(key, exif[key]) });
        });
        Object.keys(exif).forEach((key) => {
          if (!PREFERRED.includes(key)) {
            out.push({ label: LABELS[key] ?? key, value: formatValue(key, exif[key]) });
          }
        });
      }
      setRows(out);
    } catch {
      setError("Görsel okunamadı.");
    } finally {
      setBusy(false);
    }
  };

  const text = rows
    ? [
        `Dosya: ${file?.name}`,
        `Boyut: ${file ? formatBytes(file.size) : ""}`,
        `Tür: ${file?.type || "bilinmiyor"}`,
        dimensions ? `Çözünürlük: ${dimensions}` : "",
        "",
        ...rows.map((r) => `${r.label}: ${r.value}`),
      ].join("\n")
    : "";

  return (
    <div>
      {!file ? (
        <FileDropzone
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp,.tiff"
          maxSizeMB={30}
          label="Fotoğrafınızı buraya sürükleyin veya seçin"
          hint="EXIF bilgileri tarayıcınızda okunur; fotoğraf sunucuya gitmez"
          onFiles={(files) => load(files[0])}
        />
      ) : (
        <div>
          <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="truncate text-sm font-medium text-slate-700">
              {file.name}
            </span>
            <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
              Değiştir
            </Button>
          </div>
          {busy && <p className="mt-3 text-sm text-slate-500">Okunuyor…</p>}
          {!busy && rows && (
            <div className="mt-4 grid gap-4 sm:grid-cols-[auto_1fr]">
              {preview && (
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt="Önizleme"
                    className="max-h-52 max-w-[220px] rounded-xl border border-slate-200 object-contain"
                  />
                  <p className="mt-2 text-xs text-slate-500">{dimensions}</p>
                </div>
              )}
              <div>
                <dl className="divide-y divide-slate-100 rounded-xl border border-slate-200">
                  <div className="flex justify-between gap-3 px-4 py-2 text-sm">
                    <dt className="text-slate-500">Dosya</dt>
                    <dd className="text-slate-800">{file.name}</dd>
                  </div>
                  <div className="flex justify-between gap-3 px-4 py-2 text-sm">
                    <dt className="text-slate-500">Boyut</dt>
                    <dd className="text-slate-800">{formatBytes(file.size)}</dd>
                  </div>
                  {rows.length === 0 && (
                    <div className="px-4 py-3 text-sm text-slate-500">
                      Bu görselde EXIF metadata bulunamadı. Sosyal medyadan indirilen görsellerde
                      EXIF bilgisi genellikle silinmiş olur.
                    </div>
                  )}
                  {rows.map((r) => (
                    <div key={r.label} className="flex justify-between gap-3 px-4 py-2 text-sm">
                      <dt className="text-slate-500">{r.label}</dt>
                      <dd className="text-right font-medium text-slate-800">{r.value}</dd>
                    </div>
                  ))}
                </dl>
                {rows.length > 0 && (
                  <div className="mt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => downloadText(text, "metadata.txt")}
                    >
                      <IconDownload size={15} /> Bilgileri Metin Olarak İndir
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
    </div>
  );
}
