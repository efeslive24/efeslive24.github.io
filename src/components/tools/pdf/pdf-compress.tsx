"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import * as pdfjs from "pdfjs-dist";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { FileDropzone } from "@/components/ui/dropzone";
import { downloadBlob } from "@/components/ui/copy-button";
import { Label, Select } from "@/components/ui/field";
import { formatBytes, bytesToBlob } from "../media-utils";
import { IconBolt } from "@/components/icons";

// Çalışan dosyası build sırasında scripts/copy-assets.mjs ile public/pdfjs'e kopyalanır.
pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";

type Mode = "light" | "strong";

export default function PdfCompress() {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<Mode>("light");
  const [quality, setQuality] = useState("0.6");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<{ before: number; after: number } | null>(null);

  const run = async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    setReport(null);
    try {
      const before = file.size;
      let bytes: Uint8Array;
      if (mode === "light") {
        const doc = await PDFDocument.load(await file.arrayBuffer());
        bytes = await doc.save({ useObjectStreams: true });
      } else {
        const q = Math.min(Math.max(parseFloat(quality) || 0.6, 0.1), 0.95);
        const data = new Uint8Array(await file.arrayBuffer());
        const src = await pdfjs.getDocument({ data }).promise;
        const out = new jsPDF({
          orientation: "p",
          unit: "pt",
          format: "a4",
          compress: true,
        });
        let first = true;
        for (let i = 1; i <= src.numPages; i += 1) {
          setProgress(`${i}/${src.numPages}. sayfa işleniyor…`);
          const page = await src.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement("canvas");
          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);
          const ctx = canvas.getContext("2d");
          if (!ctx) throw new Error("canvas");
          await page.render({ canvas, canvasContext: ctx, viewport }).promise;
          const img = canvas.toDataURL("image/jpeg", q);
          const w = out.internal.pageSize.getWidth();
          const h = out.internal.pageSize.getHeight();
          if (!first) out.addPage("a4", "p");
          first = false;
          out.addImage(img, "JPEG", 0, 0, w, h, undefined, "FAST");
        }
        const arr = out.output("arraybuffer");
        bytes = new Uint8Array(arr);
      }
      setProgress("");
      setReport({ before, after: bytes.byteLength });
      const base = file.name.replace(/\.pdf$/i, "") || "sikistirilmis";
      downloadBlob(
        bytesToBlob(bytes, "application/pdf"),
        `${base}-sikistirilmis.pdf`
      );
    } catch (e) {
      setProgress("");
      setError(
        e instanceof Error && e.message === "canvas"
          ? "Tarayıcınız canvas çizimini desteklemiyor."
          : "Sıkıştırma başarısız oldu. Dosyanın geçerli bir PDF olduğundan emin olun."
      );
    } finally {
      setBusy(false);
    }
  };

  const savings =
    report && report.before > 0
      ? Math.max(0, Math.round((1 - report.after / report.before) * 100))
      : null;

  return (
    <div>
      {!file ? (
        <FileDropzone
          accept="application/pdf,.pdf"
          maxSizeMB={100}
          label="PDF dosyanızı buraya sürükleyin veya seçin"
          hint="Sıkıştırma tarayıcınızda yapılır; dosya sunucuya gitmez"
          onFiles={(f) => setFile(f[0])}
        />
      ) : (
        <div>
          <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="truncate text-sm font-medium text-slate-700">
              {file.name}
            </span>
            <span className="text-xs text-slate-500">{formatBytes(file.size)}</span>
            <Button variant="ghost" size="sm" onClick={() => { setFile(null); setReport(null); }}>
              Değiştir
            </Button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="cmp-mode">Sıkıştırma modu</Label>
              <Select id="cmp-mode" value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
                <option value="light">Hafif Optimizasyon (metin korunur)</option>
                <option value="strong">Güçlü Sıkıştırma (sayfalar görüntüye dönüşür)</option>
              </Select>
              <p className="mt-1.5 text-xs text-slate-500">
                {mode === "light"
                  ? "Kalite korunur; kazanç dosyanın yapısına göre sınırlıdır."
                  : "Taranmış belgelerde çok daha küçük boyut; metin aranamaz hale gelir."}
              </p>
            </div>
            {mode === "strong" && (
              <div>
                <Label htmlFor="cmp-quality">Görüntü kalitesi</Label>
                <Select id="cmp-quality" value={quality} onChange={(e) => setQuality(e.target.value)}>
                  <option value="0.4">Ekonomik (en küçük)</option>
                  <option value="0.6">Dengeli (önerilen)</option>
                  <option value="0.8">Yüksek</option>
                </Select>
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button onClick={run} disabled={busy}>
              <IconBolt size={16} /> Sıkıştır ve İndir
            </Button>
            {busy && <span className="text-sm text-slate-600">{progress}</span>}
          </div>
          {report && (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm">
              <p className="font-medium text-emerald-800">
                {formatBytes(report.before)} → {formatBytes(report.after)}
                {savings !== null && ` (%${savings} küçüldü)`}
              </p>
              {savings === 0 && (
                <p className="mt-1 text-emerald-700">
                  Bu dosya zaten optimize edilmiş; boyut değişmedi. En iyi kazanç taranmış belgelerde alınır.
                </p>
              )}
            </div>
          )}
        </div>
      )}
      {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
    </div>
  );
}
