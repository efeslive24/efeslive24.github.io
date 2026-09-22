"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { FileDropzone } from "@/components/ui/dropzone";
import { downloadBlob } from "@/components/ui/copy-button";
import { formatBytes, bytesToBlob } from "../media-utils";
import { IconArrowDown, IconArrowUp, IconMerge, IconTrash } from "@/components/icons";

interface Item {
  file: File;
  id: number;
}

let itemCounter = 0;
const nextItemId = () => ++itemCounter;

export default function PdfMerge() {
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const move = (index: number, dir: -1 | 1) => {
    setItems((prev) => {
      const target = index + dir;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const remove = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const merge = async () => {
    setBusy(true);
    setError(null);
    setSuccess(null);
    try {
      const out = await PDFDocument.create();
      for (const item of items) {
        const src = await PDFDocument.load(await item.file.arrayBuffer());
        const pages = await out.copyPages(src, src.getPageIndices());
        pages.forEach((p) => out.addPage(p));
      }
      const bytes = await out.save();
      downloadBlob(
        bytesToBlob(bytes, "application/pdf"),
        "birlestirilmis.pdf"
      );
      setSuccess(
        `${items.length} dosya ve ${out.getPageCount()} sayfa tek PDF'te birleştirildi. İndirme başladı.`
      );
    } catch {
      setError("Birleştirme başarısız oldu. Dosyaların geçerli ve şifresiz PDF olduğundan emin olun.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <FileDropzone
        accept="application/pdf,.pdf"
        multiple
        maxSizeMB={100}
        label="PDF dosyalarınızı buraya sürükleyin veya seçin"
        hint="Birden fazla dosya seçebilirsiniz; dosyalar cihazınızdan çıkmaz"
        onFiles={(files) =>
          setItems((prev) => [
            ...prev,
            ...files.map((file) => ({ file, id: nextItemId() })),
          ])
        }
      />
      {items.length > 0 && (
        <div className="mt-4">
          <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200">
            {items.map((item, i) => (
              <li key={item.id} className="flex items-center gap-3 px-4 py-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
                  {i + 1}
                </span>
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
                    onClick={() => remove(i)}
                  >
                    <IconTrash size={15} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button onClick={merge} disabled={busy || items.length < 2}>
              <IconMerge size={16} /> PDF’leri Birleştir
            </Button>
            <span className="text-xs text-slate-500">
              {items.length} dosya • sıralama önemlidir
            </span>
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
