"use client";

import { useEffect, useState } from "react";
import { Textarea, Label, Checkbox } from "@/components/ui/field";
import { FileDropzone } from "@/components/ui/dropzone";
import { CopyButton } from "@/components/ui/copy-button";
import { hashText, type HashAlgo } from "@/lib/encoding";

const ALGOS: HashAlgo[] = ["MD5", "SHA-1", "SHA-256", "SHA-512"];

interface HashResult {
  algo: HashAlgo;
  value: string;
}

export default function HashGenerator() {
  const [text, setText] = useState("");
  const [results, setResults] = useState<HashResult[]>([]);
  const [fileResults, setFileResults] = useState<HashResult[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [selected, setSelected] = useState<Record<string, boolean>>({
    MD5: true,
    "SHA-1": true,
    "SHA-256": true,
    "SHA-512": false,
  });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const compute = async () => {
      if (!text) {
        setResults([]);
        return;
      }
      const out: HashResult[] = [];
      for (const algo of ALGOS) {
        if (!selected[algo]) continue;
        const value = await hashText(text, algo);
        if (!cancelled) out.push({ algo, value });
      }
      if (!cancelled) setResults(out);
    };
    compute();
    return () => {
      cancelled = true;
    };
  }, [text, selected]);

  const handleFile = async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setBusy(true);
    setFileName(file.name);
    try {
      const buffer = await file.arrayBuffer();
      const out: HashResult[] = [];
      for (const algo of ALGOS) {
        if (!selected[algo]) continue;
        if (algo === "MD5") {
          // MD5 dosya özeti için metin tabanlı yol yerine parçalı hesaplama yapılmaz;
          // tarayıcıda MD5 dosya desteği sınırlı olduğundan yalnızca SHA ailesi dosyalarda sunulur.
          continue;
        }
        const digest = await crypto.subtle.digest(algo.replace("-", "-"), buffer);
        const value = Array.from(new Uint8Array(digest))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
        out.push({ algo, value });
      }
      setFileResults(out);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3">
        {ALGOS.map((algo) => (
          <label key={algo} className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
            <Checkbox
              checked={Boolean(selected[algo])}
              onChange={(e) =>
                setSelected((prev) => ({ ...prev, [algo]: e.target.checked }))
              }
            />
            {algo}
          </label>
        ))}
      </div>

      <Label htmlFor="hash-input">Metin</Label>
      <Textarea
        id="hash-input"
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Hash'i hesaplanacak metni yazın…"
      />
      <div className="mt-4">
        {results.map((r) => (
          <div key={r.algo} className="mb-2 flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-2.5">
            <span className="w-20 shrink-0 text-sm font-semibold text-slate-600">{r.algo}</span>
            <code className="min-w-0 flex-1 break-all font-mono text-[13px] text-slate-800">{r.value}</code>
            <CopyButton getText={() => r.value} variant="ghost" size="sm" />
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-slate-200 pt-6">
        <FileDropzone
          onFiles={handleFile}
          label={busy ? "Hesaplanıyor…" : "Dosya özeti hesaplamak için dosya bırakın"}
          hint="SHA ailesi desteklenir — dosya tarayıcınızdan çıkmaz"
          maxSizeMB={100}
        />
        {fileName && (
          <p className="mt-2 text-xs text-slate-500">
            Dosya: <strong>{fileName}</strong>
          </p>
        )}
        <div className="mt-3">
          {fileResults.map((r) => (
            <div key={r.algo} className="mb-2 flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-2.5">
              <span className="w-20 shrink-0 text-sm font-semibold text-slate-600">{r.algo}</span>
              <code className="min-w-0 flex-1 break-all font-mono text-[13px] text-slate-800">{r.value}</code>
              <CopyButton getText={() => r.value} variant="ghost" size="sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
