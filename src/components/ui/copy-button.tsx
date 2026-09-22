"use client";

import { useCallback, useRef, useState } from "react";
import { Button } from "./button";
import { IconCheck, IconCopy } from "../icons";

interface CopyButtonProps {
  getText: () => string;
  label?: string;
  disabled?: boolean;
  variant?: "secondary" | "ghost" | "primary";
  size?: "sm" | "md";
  className?: string;
}

export function CopyButton({
  getText,
  label = "Kopyala",
  disabled = false,
  variant = "secondary",
  size = "sm",
  className = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(async () => {
    const text = getText();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard API kullanılamıyorsa (izin/HTTPS sorunu) gizli textarea ile dene
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }, [getText]);

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCopy}
      disabled={disabled || copied}
      className={className}
      aria-live="polite"
    >
      {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
      {copied ? "Kopyalandı!" : label}
    </Button>
  );
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

export function downloadText(text: string, filename: string, mime = "text/plain") {
  downloadBlob(new Blob([text], { type: `${mime};charset=utf-8` }), filename);
}
