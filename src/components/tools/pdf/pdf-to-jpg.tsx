"use client";

import { useState } from "react";
import * as pdfjs from "pdfjs-dist";
import { Button } from "@/components/ui/button";
import { FileDropzone } from "@/components/ui/dropzone";
import { downloadBlob } from "@/components/ui/copy-button";
import { Label, Input, Select } from "@/components/ui/field";
import { parsePageRanges, formatBytes, dataUrlToBlob } from "../media-utils";
import { IconBolt, IconDownload } from "@/components/icons";

// Çalışan dosyası build sırasında scripts/copy-assets.mjs ile public/pdfjs'e kopyalanır.
pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";

interface Result {
  url: string;
  page: number;
}

export default function PdfToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<string>("all");
  const [scale, setScale] = useState("1.5");
  const [quality, setQuality] = useState("0.85");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Result[]>([]);

  const convert = async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    setResults([]);
    try {
      const data = new Uint8Array(await file.arrayBuffer());
      const doc = await pdfjs.getDocument({ data }).promise;
      const total = doc.numPages;
      const target =
        pages.trim().toLowerCase() === "all"
          ? Array.from({ length: total }, (_, i) => i + 1)
          : parsePageRanges(pages, total);
      if (!target) {
        setError("Sayfa aralığı geçersiz. Örnek: 1-3, 5 veya \"tümü\"");
        return;
      }
      const s = Math.min(Math.max(parseFloat(scale) || 1.5, 0.5), 4);
      const q = Math.min(Math.max(parseFloat(quality) || 0.85, 0.1), 1);
      const out: Result[] = [];
      for (let i = 0; i < target.length; i += 1) {
        setProgress(`${i + 1}/${target.length}. sayfa işleniyor…`);
        const page = await doc.getPage(target[i]);
        const viewport = page.getViewport({ scale: s });
        const canvas = document.createElement("canvas");
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("canvas");
        await page.render({ canvas, canvasContext: ctx, viewport }).promise;
        out.push({ url: canvas.toDataURL("image/jpeg", q), page: target[i] });
      }
      setResults(out);
      setProgress("");
    } catch (e) {
      setError(
        e instanceof Error && e.message === "canvas"
          ? "Tarayıcınız canvas çizimini desteklemiyor."
          : "Dönüştürme başarısız oldu. Dosyanın geçerli bir PDF olduğundan emin olun."
      );
      setProgress("");
    } finally {
      setBusy(false);
    }
  };

  const downloadAll = async () => {
    const base = (file?.name.replace(/\.pdf$/i, "") || "sayfa");
    for (const r of results) {
      downloadBlob(dataUrlToBlob(r.url), `${base}-sayfa-${r.page}.jpg`);
      await new Promise((x) => setTimeout(x, 400));
    }
  };

  return (
    <div>
      {!file ? (
        <FileDropzone
          accept="application/pdf,.pdf"
          maxSizeMB={100}
          label="PDF dosyanızı buraya sürükleyin veya seçin"
          hint="Sayfalar tarayıcınızda JPG'ye dönüştürülür; dosya sunucuya gitmez"
          onFiles={(f) => setFile(f[0])}
        />
      ) : (
        <div>
          <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="truncate text-sm font-medium text-slate-700">
              {file.name}
            </span>
            <span className="text-xs text-slate-500">{formatBytes(file.size)}</span>
            <Button variant="ghost" size="sm" onClick={() => { setFile(null); setResults([]); }}>
              Değiştir
            </Button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="p2j-pages">Sayfalar (“tümü” veya 1-3, 5)</Label>
              <Input
                id="p2j-pages"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="p2j-scale">Çözünürlük (ölçek)</Label>
              <Select id="p2j-scale" value={scale} onChange={(e) => setScale(e.target.value)}>
                <option value="1">1x (ekran)</option>
                <option value="1.5">1.5x (önerilen)</option>
                <option value="2">2x (yüksek)</option>
                <option value="3">3x (baskı)</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="p2j-quality">JPG kalitesi</Label>
              <Select id="p2j-quality" value={quality} onChange={(e) => setQuality(e.target.value)}>
                <option value="0.7">İyi (küçük boyut)</option>
                <option value="0.85">Yüksek (önerilen)</option>
                <option value="0.95">En yüksek</option>
              </Select>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button onClick={convert} disabled={busy}>
              <IconBolt size={16} /> Dönüştür
            </Button>
            {busy && <span className="text-sm text-slate-600">{progress}</span>}
          </div>
        </div>
      )}
      {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
      {results.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700">
              {results.length} sayfa hazır
            </h2>
            <Button variant="secondary" size="sm" onClick={downloadAll}>
              <IconDownload size={15} /> Tümünü İndir
            </Button>
          </div>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((r) => (
              <figure key={r.page} className="overflow-hidden rounded-xl border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.url} alt={`Sayfa ${r.page}`} className="w-full bg-slate-100" />
                <figcaption className="flex items-center justify-between px-3 py-2 text-xs text-slate-600">
                  <span>Sayfa {r.page}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      downloadBlob(
                        dataUrlToBlob(r.url),
                        `${file?.name.replace(/\.pdf$/i, "") || "sayfa"}-sayfa-${r.page}.jpg`
                      )
                    }
                  >
                    <IconDownload size={14} /> İndir
                  </Button>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
