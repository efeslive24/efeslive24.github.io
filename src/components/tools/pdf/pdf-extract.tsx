"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { FileDropzone } from "@/components/ui/dropzone";
import { downloadBlob } from "@/components/ui/copy-button";
import { Label, Input } from "@/components/ui/field";
import { parsePageRanges, describeRanges, formatBytes, bytesToBlob } from "../media-utils";
import { IconDownload } from "@/components/icons";

export default function PdfExtract() {
  const [file, setFile] = useState<File | null>(null);
  const [ranges, setRanges] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const extract = async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    setSuccess(null);
    try {
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const pages = parsePageRanges(ranges, doc.getPageCount());
      if (!pages) {
        setError("Sayfa aralığı geçersiz. Örnek: 2-5, 9");
        return;
      }
      const out = await PDFDocument.create();
      const copied = await out.copyPages(
        doc,
        pages.map((p) => p - 1)
      );
      copied.forEach((p) => out.addPage(p));
      const bytes = await out.save();
      const base = file.name.replace(/\.pdf$/i, "") || "cikarilan";
      downloadBlob(
        bytesToBlob(bytes, "application/pdf"),
        `${base}-sayfalar-${describeRanges(pages)}.pdf`
      );
      setSuccess(`${pages.length} sayfa çıkarıldı ve yeni PDF olarak indirildi.`);
    } catch {
      setError("İşlem başarısız oldu. Dosyanın geçerli bir PDF olduğundan emin olun.");
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
          hint="Sayfalar tarayıcınızda çıkarılır; dosya sunucuya gitmez"
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
          <div className="mt-4">
            <Label htmlFor="extract-ranges">Çıkarılacak sayfalar (örn. 2-5, 9)</Label>
            <Input
              id="extract-ranges"
              value={ranges}
              placeholder="2-5, 9"
              onChange={(e) => setRanges(e.target.value)}
            />
            {ranges.trim() && (
              <p className="mt-1.5 text-xs text-slate-500">
                Seçilen: {describeRanges(parsePageRanges(ranges, 999999) ?? [])}
              </p>
            )}
          </div>
          <div className="mt-4">
            <Button onClick={extract} disabled={busy || !ranges.trim()}>
              <IconDownload size={16} /> Sayfaları Çıkar
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
