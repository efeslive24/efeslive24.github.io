"use client";

import { useRef, useState, type DragEvent } from "react";
import { IconUpload } from "../icons";

interface FileDropzoneProps {
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  onFiles: (files: File[]) => void;
  label?: string;
  hint?: string;
}

export function FileDropzone({
  accept,
  multiple = false,
  maxSizeMB = 50,
  onFiles,
  label = "Dosyalarınızı buraya sürükleyin veya seçin",
  hint,
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = (files: FileList | File[]): File[] => {
    const list = Array.from(files);
    const tooBig = list.find((f) => f.size > maxSizeMB * 1024 * 1024);
    if (tooBig) {
      setError(`"${tooBig.name}" dosyası ${maxSizeMB} MB sınırını aşıyor.`);
      return [];
    }
    setError(null);
    return list;
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = validate(e.dataTransfer.files);
    if (files.length) onFiles(multiple ? files : files.slice(0, 1));
  };

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label={label}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
          dragging
            ? "border-brand-500 bg-brand-50"
            : "border-slate-300 bg-slate-50 hover:border-brand-400 hover:bg-brand-50/50"
        }`}
      >
        <span className="rounded-full bg-brand-100 p-3 text-brand-600">
          <IconUpload size={22} />
        </span>
        <p className="text-sm font-medium text-slate-700">{label}</p>
        {hint && <p className="text-xs text-slate-500">{hint}</p>}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => {
            const files = validate(e.target.files ?? []);
            if (files.length) onFiles(multiple ? files : files.slice(0, 1));
            e.target.value = "";
          }}
        />
      </div>
      {error && (
        <p className="mt-2 flex items-center gap-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
