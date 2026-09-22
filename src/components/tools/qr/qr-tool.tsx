"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/field";
import { downloadText } from "@/components/ui/copy-button";
import { IconDownload, IconRefresh } from "@/components/icons";

export interface QrField {
  name: string;
  label: string;
  type?: "text" | "select" | "textarea";
  options?: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  half?: boolean;
}

interface QrToolProps {
  fields: QrField[];
  buildContent: (values: Record<string, string>) => string;
  downloadBaseName: string;
}

const SIZES = [
  { value: "256", label: "256 px" },
  { value: "512", label: "512 px" },
  { value: "1024", label: "1024 px" },
];

const EC_LEVELS = [
  { value: "L", label: "Düşük (%7)" },
  { value: "M", label: "Orta (%15)" },
  { value: "Q", label: "Yüksek (%25)" },
  { value: "H", label: "Çok Yüksek (%30)" },
];

export function QrTool({ fields, buildContent, downloadBaseName }: QrToolProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [size, setSize] = useState("512");
  const [dark, setDark] = useState("#0f172a");
  const [light, setLight] = useState("#ffffff");
  const [ec, setEc] = useState("M");
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const content = buildContent(values);

  const clearResult = () => {
    setDataUrl(null);
    setSvg(null);
    setError(null);
  };

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (!content) return;
    timer.current = setTimeout(() => {
      const width = Number(size);
      QRCode.toDataURL(content, {
        width,
        margin: 2,
        errorCorrectionLevel: ec as "L" | "M" | "Q" | "H",
        color: { dark, light },
      })
        .then((url) => {
          setDataUrl(url);
          setError(null);
        })
        .catch((e) => setError(`QR kod üretilemedi: ${(e as Error).message}`));
      QRCode.toString(content, {
        type: "svg",
        width,
        errorCorrectionLevel: ec as "L" | "M" | "Q" | "H",
        color: { dark, light },
      })
        .then(setSvg)
        .catch(() => setSvg(null));
    }, 300);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [content, size, dark, light, ec]);

  const set = (name: string, value: string) => {
    const next = { ...values, [name]: value };
    setValues(next);
    if (!buildContent(next)) clearResult();
  };

  const requiredOk = fields
    .filter((f) => f.required)
    .every((f) => (values[f.name] ?? "").trim() !== "");

  const downloadPng = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${downloadBaseName}.png`;
    a.click();
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((field) => {
            const common = {
              id: `qr-${field.name}`,
              value: values[field.name] ?? "",
              onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                set(field.name, e.target.value),
              placeholder: field.placeholder,
              required: field.required,
            };
            return (
              <div key={field.name} className={field.half ? "" : "sm:col-span-2"}>
                <Label htmlFor={`qr-${field.name}`}>{field.label}</Label>
                {field.type === "select" ? (
                  <Select {...common}>{field.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                  </Select>
                ) : field.type === "textarea" ? (
                  <textarea rows={3} className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30" {...common} />
                ) : (
                  <Input {...common} />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col items-center gap-3 rounded-xl bg-slate-50 p-5">
          <div className="flex h-[220px] w-[220px] items-center justify-center rounded-lg bg-white p-3 shadow-inner">
            {dataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={dataUrl} alt="Oluşturulan QR kod" className="h-full w-full" />
            ) : (
              <p className="px-4 text-center text-xs text-slate-400">
                {requiredOk ? "QR kod oluşturuluyor…" : "QR kodunuz burada görünecek"}
              </p>
            )}
          </div>
          {error && (
            <p className="text-xs text-red-600" role="alert">
              {error}
            </p>
          )}
          <div className="grid w-full grid-cols-2 gap-2">
            <Button onClick={downloadPng} disabled={!dataUrl} size="sm">
              <IconDownload size={15} /> PNG
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={!svg}
              onClick={() => svg && downloadText(svg, `${downloadBaseName}.svg`, "image/svg+xml")}
            >
              <IconDownload size={15} /> SVG
            </Button>
          </div>
          <div className="grid w-full grid-cols-2 gap-2">
            <div>
              <Label htmlFor="qr-size">Boyut</Label>
              <Select id="qr-size" value={size} onChange={(e) => setSize(e.target.value)}>
                {SIZES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="qr-ec">Hata Düzeltme</Label>
              <Select id="qr-ec" value={ec} onChange={(e) => setEc(e.target.value)}>
                {EC_LEVELS.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-2">
            <div>
              <Label htmlFor="qr-dark">Kod Rengi</Label>
              <input
                id="qr-dark"
                type="color"
                value={dark}
                onChange={(e) => setDark(e.target.value)}
                className="h-9 w-full cursor-pointer rounded-lg border border-slate-300"
              />
            </div>
            <div>
              <Label htmlFor="qr-light">Arka Plan</Label>
              <input
                id="qr-light"
                type="color"
                value={light}
                onChange={(e) => setLight(e.target.value)}
                className="h-9 w-full cursor-pointer rounded-lg border border-slate-300"
              />
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setValues({});
              clearResult();
            }}
            className="w-full"
          >
            <IconRefresh size={15} /> Formu Temizle
          </Button>
        </div>
      </div>
    </div>
  );
}
