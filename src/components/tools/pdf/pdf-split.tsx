"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { FileDropzone } from "@/components/ui/dropzone";
import { downloadBlob } from "@/components/ui/copy-button";
import { Label, Input, Select } from "@/components/ui/field";
import { parsePageRanges, describeRanges, sleep, formatBytes, bytesToBlob } from "../media-utils";
import { IconBolt, IconDownload } from "@/components/icons";

type Mode = "every" | "ranges";

export default function PdfSplit() {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<Mode>("every");
  const [ranges, setRanges] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const split = async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    setSuccess(null);
    try {
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const total = doc.getPageCount();
      const parts: number[][] =
        mode === "every"
          ? Array.from({ length: total }, (_, i) => [i])
          : (() => {
              const pages = parsePageRanges(ranges, total);
              if (!pages) throw new Error("aralik");
              return pages.map((p) => [p - 1]);
            })();

      const base = file.name.replace(/\.pdf$/i, "") || "bolum";
      for (let i = 0; i < parts.length; i += 1) {
        const out = await PDFDocument.create();
        const copied = await out.copyPages(doc, parts[i]);
        copied.forEach((p) => out.addPage(p));
        const bytes = await out.save();
        downloadBlob(
          bytesToBlob(bytes, "application/pdf"),
          `${base}-bolum-${i + 1}.pdf`
        );
        if (parts.length > 1) await sleep(450);
      }
      setSuccess(
        mode === "every"
          ? `${total} sayfa, ${parts.length} ayrı PDF olarak indirildi.`
          : `Seçilen ${parts.length} sayfa ${parts.length} ayrı PDF olarak indirildi.`
      );
    } catch (e) {
      setError(
        e instanceof Error && e.message === "aralik"
          ? "Sayfa aralığı geçersiz. Örnek: 1-3, 5"
          : "Bölme başarısız oldu. Dosyanın geçerli bir PDF olduğundan emin olun."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      {!file ? (
        <FileDropzone
          accept="application/pdf,.pdf"
          maxSizeMB={100}
          label="PDF dosyanızı buraya sürükleyin veya seçin"
          hint="Dosya cihazınızdan çıkmaz; bölme tarayıcıda yapılır"
          onFiles={(files) => setFile(files[0])}
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
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="split-mode">Bölme modu</Label>
              <Select
                id="split-mode"
                value={mode}
                onChange={(e) => setMode(e.target.value as Mode)}
              >
                <option value="every">Her sayfa ayrı dosya</option>
                <option value="ranges">Özel sayfa aralıkları</option>
              </Select>
            </div>
            {mode === "ranges" && (
              <div>
                <Label htmlFor="split-ranges">Sayfa aralıkları (örn. 1-3, 5)</Label>
                <Input
                  id="split-ranges"
                  value={ranges}
                  placeholder="1-3, 5"
                  onChange={(e) => setRanges(e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button onClick={split} disabled={busy || (mode === "ranges" && !ranges.trim())}>
              <IconBolt size={16} /> Böl ve İndir
            </Button>
            {mode === "ranges" && ranges.trim() && (
              <span className="text-xs text-slate-500">
                Sayfalar: {describeRanges(parsePageRanges(ranges, 999999) ?? [])}
              </span>
            )}
          </div>
        </div>
      )}
      {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
      {success && (
        <p className="mt-3 flex items-center gap-1.5 text-sm text-emerald-700" role="status">
          <IconDownload size={15} /> {success}
        </p>
      )}
    </div>
  );
}
