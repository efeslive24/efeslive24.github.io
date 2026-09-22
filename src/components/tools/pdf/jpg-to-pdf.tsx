"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { FileDropzone } from "@/components/ui/dropzone";
import { Label, Select } from "@/components/ui/field";
import { fileToDataUrl, loadImage, formatBytes } from "../media-utils";
import { IconArrowDown, IconArrowUp, IconPdf, IconTrash } from "@/components/icons";

interface Item {
  file: File;
  dataUrl: string;
  id: number;
}

let itemCounter = 0;
const nextItemId = () => ++itemCounter;

type PageSize = "a4" | "letter" | "image";
type Orientation = "auto" | "portrait" | "landscape";

export default function JpgToPdf() {
  const [items, setItems] = useState<Item[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [orientation, setOrientation] = useState<Orientation>("auto");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const addFiles = async (files: File[]) => {
    setError(null);
    setSuccess(null);
    try {
      const loaded = await Promise.all(
        files.map(async (file) => ({
          file,
          dataUrl: await fileToDataUrl(file),
          id: nextItemId(),
        }))
      );
      setItems((prev) => [...prev, ...loaded]);
    } catch {
      setError("Görseller okunamadı.");
    }
  };

  const move = (index: number, dir: -1 | 1) => {
    setItems((prev) => {
      const target = index + dir;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const build = async () => {
    setBusy(true);
    setError(null);
    setSuccess(null);
    try {
      let doc: jsPDF;
      if (pageSize === "image") {
        const first = await loadImage(items[0].dataUrl);
        doc = new jsPDF({
          orientation: first.width > first.height ? "landscape" : "portrait",
          unit: "px",
          format: [first.width, first.height],
          hotfixes: ["px_scaling"],
          compress: true,
        });
        for (let i = 0; i < items.length; i += 1) {
          const img = await loadImage(items[i].dataUrl);
          if (i > 0) {
            doc.addPage(
              [img.width, img.height],
              img.width > img.height ? "landscape" : "portrait"
            );
          }
          doc.addImage(items[i].dataUrl, "JPEG", 0, 0, img.width, img.height);
        }
      } else {
        const format = pageSize === "a4" ? "a4" : "letter";
        doc = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format,
          compress: true,
        });
        const pageW = doc.internal.pageSize.getWidth();
        const pageH = doc.internal.pageSize.getHeight();
        const margin = 12;
        const availW = pageW - margin * 2;
        const availH = pageH - margin * 2;
        for (let i = 0; i < items.length; i += 1) {
          const img = await loadImage(items[i].dataUrl);
          const ratio = img.width / img.height;
          let w = availW;
          let h = w / ratio;
          if (h > availH) {
            h = availH;
            w = h * ratio;
          }
          let x = (pageW - w) / 2;
          let y = (pageH - h) / 2;
          if (orientation === "landscape" && ratio < 1) {
            const rotated = 1 / ratio;
            let rw = availH;
            let rh = rw / rotated;
            if (rh > availW) {
              rh = availW;
              rw = rh * rotated;
            }
            x = (pageW - rh) / 2;
            y = (pageH - rw) / 2;
            w = rh;
            h = rw;
          }
          if (i > 0) doc.addPage(format, orientation === "landscape" ? "landscape" : "portrait");
          doc.addImage(items[i].dataUrl, "JPEG", x, y, w, h, undefined, "FAST");
        }
      }
      doc.save("goruntuler.pdf");
      setSuccess(`${items.length} görsel tek PDF olarak indirildi.`);
    } catch {
      setError("PDF oluşturulamadı. Görsellerin geçerli formatta olduğundan emin olun.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <FileDropzone
        accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
        multiple
        maxSizeMB={30}
        label="Görsellerinizi buraya sürükleyin veya seçin"
        hint="JPG, PNG ve WebP desteklenir; görseller cihazınızdan çıkmaz"
        onFiles={addFiles}
      />
      {items.length > 0 && (
        <div className="mt-4">
          <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200">
            {items.map((item, i) => (
              <li key={item.id} className="flex items-center gap-3 px-4 py-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
                  {i + 1}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.dataUrl} alt="" className="h-9 w-9 shrink-0 rounded object-cover" />
                <span className="min-w-0 flex-1 truncate text-sm text-slate-700">
                  {item.file.name}
                </span>
                <span className="shrink-0 text-xs text-slate-500">
                  {formatBytes(item.file.size)}
                </span>
                <div className="flex shrink-0 gap-1">
                  <button
                    aria-label="Yukarı taşı"
                    className="rounded p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
                    disabled={i === 0}
                    onClick={() => move(i, -1)}
                  >
                    <IconArrowUp size={15} />
                  </button>
                  <button
                    aria-label="Aşağı taşı"
                    className="rounded p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
                    disabled={i === items.length - 1}
                    onClick={() => move(i, 1)}
                  >
                    <IconArrowDown size={15} />
                  </button>
                  <button
                    aria-label="Kaldır"
                    className="rounded p-1.5 text-red-500 hover:bg-red-50"
                    onClick={() => setItems((prev) => prev.filter((_, x) => x !== i))}
                  >
                    <IconTrash size={15} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="j2p-size">Sayfa boyutu</Label>
              <Select
                id="j2p-size"
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value as PageSize)}
              >
                <option value="a4">A4</option>
                <option value="letter">Letter</option>
                <option value="image">Görüntü boyutu (orijinal)</option>
              </Select>
            </div>
            {pageSize !== "image" && (
              <div>
                <Label htmlFor="j2p-orientation">Yön</Label>
                <Select
                  id="j2p-orientation"
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value as Orientation)}
                >
                  <option value="auto">Otomatik</option>
                  <option value="portrait">Dikey</option>
                  <option value="landscape">Yatay</option>
                </Select>
              </div>
            )}
          </div>
          <div className="mt-4">
            <Button onClick={build} disabled={busy}>
              <IconPdf size={16} /> PDF Oluştur ve İndir
            </Button>
          </div>
        </div>
      )}
      {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
      {success && (
        <p className="mt-3 text-sm text-emerald-700" role="status">{success}</p>
      )}
    </div>
  );
}
