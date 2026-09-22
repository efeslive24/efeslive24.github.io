"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDropzone } from "@/components/ui/dropzone";
import { downloadBlob } from "@/components/ui/copy-button";
import { Label, Select } from "@/components/ui/field";
import { fileToDataUrl, loadImage, canvasToBlob, formatBytes } from "../media-utils";
import { IconDownload } from "@/components/icons";

const ASPECTS: { id: string; label: string; ratio: number | null }[] = [
  { id: "free", label: "Serbest", ratio: null },
  { id: "1:1", label: "Kare (1:1)", ratio: 1 },
  { id: "4:3", label: "4:3", ratio: 4 / 3 },
  { id: "16:9", label: "16:9", ratio: 16 / 9 },
  { id: "3:2", label: "3:2", ratio: 3 / 2 },
];

interface Sel {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface DragState {
  mode: "move" | "select";
  startX: number;
  startY: number;
  orig: Sel;
}

const MAX_W = 720;

export default function ImageCrop() {
  const [file, setFile] = useState<File | null>(null);
  const [aspect, setAspect] = useState("free");
  const [sel, setSel] = useState<Sel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  const [natW, setNatW] = useState(0);

  const ratio = ASPECTS.find((a) => a.id === aspect)?.ratio ?? null;

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    if (sel) {
      ctx.fillStyle = "rgba(15, 23, 42, 0.55)";
      ctx.fillRect(0, 0, canvas.width, sel.y);
      ctx.fillRect(0, sel.y + sel.h, canvas.width, canvas.height - sel.y - sel.h);
      ctx.fillRect(0, sel.y, sel.x, sel.h);
      ctx.fillRect(sel.x + sel.w, sel.y, canvas.width - sel.x - sel.w, sel.h);
      ctx.strokeStyle = "#4f46e5";
      ctx.lineWidth = 2;
      ctx.strokeRect(sel.x, sel.y, sel.w, sel.h);
    }
  }, [sel]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  const load = async (f: File) => {
    setFile(f);
    setSel(null);
    setError(null);
    try {
      const url = await fileToDataUrl(f);
      const img = await loadImage(url);
      imgRef.current = img;
      setNatW(img.naturalWidth);
      const scale = Math.min(1, MAX_W / img.naturalWidth);
      const w = Math.round(img.naturalWidth * scale);
      const h = Math.round(img.naturalHeight * scale);
      setDims({ w, h });
      if (canvasRef.current) {
        canvasRef.current.width = w;
        canvasRef.current.height = h;
      }
      setSel({ x: 0, y: 0, w, h });
    } catch {
      setError("Görsel okunamadı.");
    }
  };

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.min(
        Math.max(((e.clientX - rect.left) * canvas.width) / rect.width, 0),
        canvas.width
      ),
      y: Math.min(
        Math.max(((e.clientY - rect.top) * canvas.height) / rect.height, 0),
        canvas.height
      ),
    };
  };

  const clampSel = (s: Sel, w: number, h: number): Sel => {
    const x = Math.min(Math.max(s.x, 0), Math.max(0, w - s.w));
    const y = Math.min(Math.max(s.y, 0), Math.max(0, h - s.h));
    return { ...s, x, y };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!sel || !dims) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const pos = getPos(e);
    const inside =
      pos.x >= sel.x && pos.x <= sel.x + sel.w && pos.y >= sel.y && pos.y <= sel.y + sel.h;
    dragRef.current = {
      mode: inside ? "move" : "select",
      startX: pos.x,
      startY: pos.y,
      orig: sel,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const drag = dragRef.current;
    if (!drag || !dims) return;
    const pos = getPos(e);
    if (drag.mode === "move") {
      const next = clampSel(
        {
          ...drag.orig,
          x: drag.orig.x + (pos.x - drag.startX),
          y: drag.orig.y + (pos.y - drag.startY),
        },
        dims.w,
        dims.h
      );
      setSel(next);
    } else {
      let w = Math.abs(pos.x - drag.startX);
      let h = Math.abs(pos.y - drag.startY);
      if (ratio) {
        h = Math.max(h, w / ratio);
        w = h * ratio;
      }
      w = Math.min(w, dims.w);
      h = Math.min(h, dims.h);
      const x = pos.x < drag.startX ? Math.max(drag.startX - w, 0) : drag.startX;
      const y = pos.y < drag.startY ? Math.max(drag.startY - h, 0) : drag.startY;
      setSel(
        clampSel({ x, y, w: Math.max(w, 12), h: Math.max(h, 12) }, dims.w, dims.h)
      );
    }
  };

  const onPointerUp = () => {
    dragRef.current = null;
  };

  const applyCrop = async () => {
    if (!sel || !imgRef.current || !file) return;
    try {
      const img = imgRef.current;
      const scale = img.naturalWidth / dims!.w;
      const sx = Math.round(sel.x * scale);
      const sy = Math.round(sel.y * scale);
      const sw = Math.round(sel.w * scale);
      const sh = Math.round(sel.h * scale);
      const canvas = document.createElement("canvas");
      canvas.width = sw;
      canvas.height = sh;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("canvas");
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
      const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
      const blob = await canvasToBlob(canvas, mime, 0.92);
      downloadBlob(
        blob,
        `${file.name.replace(/\.[^.]+$/, "")}-kirpilmis.${file.name.split(".").pop()}`
      );
    } catch {
      setError("Kırpma başarısız oldu.");
    }
  };

  const cropLabel = () => {
    if (!sel || !dims || !natW) return "";
    const scale = natW / dims.w;
    return `${Math.round(sel.w * scale)}×${Math.round(sel.h * scale)} px`;
  };

  return (
    <div>
      {!file ? (
        <FileDropzone
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          maxSizeMB={30}
          label="Görselinizi buraya sürükleyin veya seçin"
          hint="Kırpma alanını fareyle çizin; taşımak için içine tıklayıp sürükleyin"
          onFiles={(files) => load(files[0])}
        />
      ) : (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="truncate text-sm font-medium text-slate-700">
              {file.name}
            </span>
            <span className="text-xs text-slate-500">{formatBytes(file.size)}</span>
            <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
              Değiştir
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap items-end gap-4">
            <div className="w-44">
              <Label htmlFor="crop-aspect">Kırpma oranı</Label>
              <Select id="crop-aspect" value={aspect} onChange={(e) => setAspect(e.target.value)}>
                {ASPECTS.map((a) => (
                  <option key={a.id} value={a.id}>{a.label}</option>
                ))}
              </Select>
            </div>
            {sel && (
              <p className="pb-2 text-sm text-slate-600">
                Seçim: {cropLabel()}
              </p>
            )}
            <div className="pb-1">
              <Button onClick={applyCrop}>
                <IconDownload size={16} /> Kırp ve İndir
              </Button>
            </div>
          </div>
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <canvas
              ref={canvasRef}
              className="w-full touch-none select-none"
              style={{ cursor: "crosshair" }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              aria-label="Kırpma alanı"
            />
          </div>
        </div>
      )}
      {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
    </div>
  );
}
