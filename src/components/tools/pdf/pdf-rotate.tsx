"use client";

import { useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { FileDropzone } from "@/components/ui/dropzone";
import { downloadBlob } from "@/components/ui/copy-button";
import { Label, Input, Select } from "@/components/ui/field";
import { parsePageRanges, describeRanges, formatBytes, bytesToBlob } from "../media-utils";
import { IconRotate } from "@/components/icons";

export default function PdfRotate() {
  const [file, setFile] = useState<File | null>(null);
  const [scope, setScope] = useState<"all" | "pages">("all");
  const [pages, setPages] = useState("");
  const [angle, setAngle] = useState("90");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const rotate = async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    setSuccess(null);
    try {
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const target =
        scope === "all"
          ? doc.getPageIndices()
          : (() => {
              const sel = parsePageRanges(pages, doc.getPageCount());
              if (!sel) throw new Error("aralik");
              return sel.map((p) => p - 1);
            })();
      const a = parseInt(angle, 10);
      target.forEach((i) => {
        const page = doc.getPage(i);
        page.setRotation(degrees((page.getRotation().angle + a) % 360));
      });
      const bytes = await doc.save();
      const base = file.name.replace(/\.pdf$/i, "") || "dondurulmus";
      downloadBlob(
        bytesToBlob(bytes, "application/pdf"),
        `${base}-${a}derece.pdf`
      );
      setSuccess(
        scope === "all"
          ? `${doc.getPageCount()} sayfa ${a}° döndürüldü.`
          : `${target.length} sayfa ${a}° döndürüldü.`
      );
    } catch (e) {
      setError(
        e instanceof Error && e.message === "aralik"
          ? "Sayfa aralığı geçersiz. Örnek: 2, 4-6"
          : "Döndürme başarısız oldu. Dosyanın geçerli bir PDF olduğundan emin olun."
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
          hint="Döndürme tarayıcınızda yapılır; dosya sunucuya gitmez"
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
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="rot-scope">Sayfalar</Label>
              <Select
                id="rot-scope"
                value={scope}
                onChange={(e) => setScope(e.target.value as "all" | "pages")}
              >
                <option value="all">Tüm sayfalar</option>
                <option value="pages">Belirli sayfalar</option>
              </Select>
            </div>
            {scope === "pages" && (
              <div>
                <Label htmlFor="rot-pages">Sayfa numaraları (örn. 2, 4-6)</Label>
                <Input
                  id="rot-pages"
                  value={pages}
                  placeholder="2, 4-6"
                  onChange={(e) => setPages(e.target.value)}
                />
              </div>
            )}
            <div>
              <Label htmlFor="rot-angle">Döndürme açısı</Label>
              <Select id="rot-angle" value={angle} onChange={(e) => setAngle(e.target.value)}>
                <option value="90">90° (saat yönü)</option>
                <option value="180">180°</option>
                <option value="270">270° (saat yönünün tersi)</option>
              </Select>
            </div>
          </div>
          {scope === "pages" && pages.trim() && (
            <p className="mt-2 text-xs text-slate-500">
              Seçilen: {describeRanges(parsePageRanges(pages, 999999) ?? [])}
            </p>
          )}
          <div className="mt-4">
            <Button
              onClick={rotate}
              disabled={busy || (scope === "pages" && !pages.trim())}
            >
              <IconRotate size={16} /> Döndür ve İndir
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
