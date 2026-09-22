"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { FileDropzone } from "@/components/ui/dropzone";
import { downloadBlob } from "@/components/ui/copy-button";
import { Label, Input } from "@/components/ui/field";
import { formatBytes, bytesToBlob } from "../media-utils";
import { IconDownload } from "@/components/icons";

interface Meta {
  title: string;
  author: string;
  subject: string;
  keywords: string;
  producer: string;
  creator: string;
  creationDate: string;
  modificationDate: string;
}

export default function PdfMetadata() {
  const [file, setFile] = useState<File | null>(null);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [doc, setDoc] = useState<PDFDocument | null>(null);

  const load = async (f: File) => {
    setFile(f);
    setBusy(true);
    setError(null);
    setSuccess(null);
    try {
      const d = await PDFDocument.load(await f.arrayBuffer());
      setDoc(d);
      setPageCount(d.getPageCount());
      setMeta({
        title: d.getTitle() ?? "",
        author: d.getAuthor() ?? "",
        subject: d.getSubject() ?? "",
        keywords: d.getKeywords() ?? "",
        producer: d.getProducer() ?? "",
        creator: d.getCreator() ?? "",
        creationDate: d.getCreationDate()?.toLocaleString("tr-TR") ?? "",
        modificationDate: d.getModificationDate()?.toLocaleString("tr-TR") ?? "",
      });
    } catch {
      setError("Dosya okunamadı. Geçerli bir PDF olduğundan emin olun.");
    } finally {
      setBusy(false);
    }
  };

  const save = async () => {
    if (!doc || !meta) return;
    setBusy(true);
    setError(null);
    try {
      doc.setTitle(meta.title.trim());
      doc.setAuthor(meta.author.trim());
      doc.setSubject(meta.subject.trim());
      doc.setKeywords(meta.keywords.split(",").map((k) => k.trim()).filter(Boolean));
      const bytes = await doc.save();
      const base = file!.name.replace(/\.pdf$/i, "") || "guncellenmis";
      downloadBlob(
        bytesToBlob(bytes, "application/pdf"),
        `${base}-metadata.pdf`
      );
      setSuccess("Metadata kaydedildi ve güncellenmiş PDF indirildi.");
    } catch {
      setError("Kaydetme başarısız oldu.");
    } finally {
      setBusy(false);
    }
  };

  const set = (key: keyof Meta) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setMeta((prev) => (prev ? { ...prev, [key]: e.target.value } : prev));

  const rows: { label: string; key: keyof Meta }[] = [
    { label: "Başlık", key: "title" },
    { label: "Yazar", key: "author" },
    { label: "Konu", key: "subject" },
    { label: "Anahtar Kelimeler (virgülle ayırın)", key: "keywords" },
  ];

  return (
    <div>
      {!file ? (
        <FileDropzone
          accept="application/pdf,.pdf"
          maxSizeMB={100}
          label="PDF dosyanızı buraya sürükleyin veya seçin"
          hint="Metadata bilgileri tarayıcınızda okunur; dosya sunucuya gitmez"
          onFiles={(files) => load(files[0])}
        />
      ) : (
        <div>
          <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="truncate text-sm font-medium text-slate-700">
              {file.name}
            </span>
            <span className="text-xs text-slate-500">
              {formatBytes(file.size)} • {pageCount} sayfa
            </span>
            <Button variant="ghost" size="sm" onClick={() => { setFile(null); setMeta(null); setDoc(null); }}>
              Değiştir
            </Button>
          </div>

          {meta && (
            <div className="mt-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {rows.map((r) => (
                  <div key={r.key}>
                    <Label htmlFor={`meta-${r.key}`}>{r.label}</Label>
                    <Input id={`meta-${r.key}`} value={meta[r.key]} onChange={set(r.key)} />
                  </div>
                ))}
              </div>
              <dl className="mt-5 grid gap-x-8 gap-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm sm:grid-cols-2">
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-500">Üretici:</dt>
                  <dd className="text-right text-slate-800">{meta.producer || "—"}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-500">Oluşturan Uygulama:</dt>
                  <dd className="text-right text-slate-800">{meta.creator || "—"}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-500">Oluşturulma:</dt>
                  <dd className="text-right text-slate-800">{meta.creationDate || "—"}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-500">Değiştirilme:</dt>
                  <dd className="text-right text-slate-800">{meta.modificationDate || "—"}</dd>
                </div>
              </dl>
              <div className="mt-4">
                <Button onClick={save} disabled={busy}>
                  <IconDownload size={16} /> Metadata’yı Kaydet ve İndir
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
      {success && (
        <p className="mt-3 text-sm text-emerald-700" role="status">{success}</p>
      )}
    </div>
  );
}
