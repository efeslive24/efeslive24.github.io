"use client";

import { Button } from "./button";
import { CopyButton, downloadText } from "./copy-button";
import { IconAlert, IconCheck, IconDownload } from "../icons";

interface ResultBoxProps {
  value: string;
  error?: string | null;
  success?: string | null;
  placeholder?: string;
  downloadName?: string;
  mime?: string;
  mono?: boolean;
  rows?: number;
  copyLabel?: string;
}

export function ResultBox({
  value,
  error = null,
  success = null,
  placeholder = "Sonuç burada görünecek",
  downloadName,
  mime,
  mono = true,
  rows = 6,
  copyLabel = "Kopyala",
}: ResultBoxProps) {
  return (
    <div>
      {error && (
        <div
          className="mb-3 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          <IconAlert size={18} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div
          className="mb-3 flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
          role="status"
        >
          <IconCheck size={18} className="mt-0.5 shrink-0" />
          <span>{success}</span>
        </div>
      )}
      <div className="relative">
        <textarea
          readOnly
          value={value}
          rows={rows}
          placeholder={placeholder}
          aria-label="Sonuç"
          className={`w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none ${
            mono ? "font-mono" : ""
          }`}
        />
        {value && (
          <div className="absolute bottom-3 right-3">
            <CopyButton
              getText={() => value}
              label={copyLabel}
              variant="primary"
              size="sm"
            />
          </div>
        )}
      </div>
      {downloadName && value && (
        <div className="mt-2 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => downloadText(value, downloadName, mime)}
          >
            <IconDownload size={16} />
            İndir
          </Button>
        </div>
      )}
    </div>
  );
}
