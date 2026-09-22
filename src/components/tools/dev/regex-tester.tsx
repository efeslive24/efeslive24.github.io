"use client";

import { useMemo, useState } from "react";
import { Textarea, Label, Select } from "@/components/ui/field";
import { IconAlert, IconCheck } from "@/components/icons";

const FLAGS = [
  { value: "g", label: "g — tüm eşleşmeler" },
  { value: "i", label: "i — büyük/küçük harf duyarsız" },
  { value: "m", label: "m — çok satırlı" },
  { value: "s", label: "s — nokta yeni satırı da kapsasın" },
];

const EXAMPLES = [
  { pattern: "^\\d{3}-\\d{4}$", text: "555-1234", label: "Telefon deseni" },
  { pattern: "\\b[\\w.%-]+@[\\w.-]+\\.[A-Za-z]{2,}\\b", text: "İletişim: ali@ornek.com veya ayse@site.net", label: "E-posta bulma" },
  { pattern: "(?<=#)\\w+", text: "Bugün #kodlama ve #tasarım konuştuk", label: "Hashtag yakalama" },
];

export default function RegexTester() {
  const [pattern, setPattern] = useState("\\b[\\w.%-]+@[\\w.-]+\\.[A-Za-z]{2,}\\b");
  const [text, setText] = useState("İletişim: ali@ornek.com veya ayse@site.net");
  const [flags, setFlags] = useState<string[]>(["g"]);

  const result = useMemo(() => {
    if (!pattern) return { error: "Düzenli ifade boş." } as const;
    try {
      const re = new RegExp(pattern, flags.join(""));
      const matches = [...text.matchAll(re)];
      return {
        matches: matches.map((m) => ({
          full: m[0],
          index: m.index ?? 0,
          groups: m.slice(1),
        })),
        count: matches.length,
      } as const;
    } catch (e) {
      return { error: (e as Error).message } as const;
    }
  }, [pattern, text, flags]);

  const toggleFlag = (flag: string) =>
    setFlags((prev) =>
      prev.includes(flag) ? prev.filter((f) => f !== flag) : [...prev, flag]
    );

  const highlighted = useMemo(() => {
    if ("error" in result || result.count === 0) return text;
    let out = "";
    let last = 0;
    for (const m of result.matches) {
      out += escapeHtml(text.slice(last, m.index));
      out += `<mark class="rounded bg-amber-200 px-0.5">${escapeHtml(m.full)}</mark>`;
      last = m.index + m.full.length;
    }
    out += escapeHtml(text.slice(last));
    return out;
  }, [result, text]);

  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div>
          <Label htmlFor="regex-pattern">Düzenli İfade</Label>
          <div className="flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/30">
            <span className="text-sm text-slate-400">/</span>
            <input
              id="regex-pattern"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="w-full border-0 bg-transparent py-2.5 font-mono text-sm focus:outline-none"
              spellCheck={false}
            />
            <span className="text-sm text-slate-400">/{flags.join("")}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {FLAGS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => toggleFlag(f.value)}
                className={`rounded-full border px-2.5 py-1 text-xs font-medium transition ${
                  flags.includes(f.value)
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-slate-300 text-slate-500 hover:border-slate-400"
                }`}
                title={f.label}
              >
                {f.value}
              </button>
            ))}
          </div>
          <div className="mt-3">
            <Label>Hazır Örnekler</Label>
            <Select
              value=""
              onChange={(e) => {
                const ex = EXAMPLES.find((x) => x.label === e.target.value);
                if (ex) {
                  setPattern(ex.pattern);
                  setText(ex.text);
                }
              }}
            >
              <option value="">Örnek seç…</option>
              {EXAMPLES.map((ex) => (
                <option key={ex.label} value={ex.label}>
                  {ex.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="regex-text">Test Metni</Label>
          <Textarea
            id="regex-text"
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
          />
        </div>
      </div>

      {"error" in result ? (
        <div
          className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          <IconAlert size={18} className="mt-0.5 shrink-0" />
          <span>{result.error}</span>
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          <div
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm"
            role="status"
          >
            <IconCheck size={18} className="text-emerald-600" />
            <span className="font-medium text-slate-700">
              {result.count.toLocaleString("tr-TR")} eşleşme bulundu
            </span>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 font-mono text-sm leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: highlighted }} />
          </div>
          {result.matches.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">Yakalanan Gruplar</p>
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-4 py-2">#</th>
                      <th className="px-4 py-2">Eşleşme</th>
                      <th className="px-4 py-2">Konum</th>
                      {result.matches[0].groups.length > 0 && (
                        <th className="px-4 py-2">Gruplar</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {result.matches.slice(0, 100).map((m, i) => (
                      <tr key={i}>
                        <td className="px-4 py-2 text-slate-500">{i + 1}</td>
                        <td className="break-all px-4 py-2 font-mono text-slate-800">{m.full}</td>
                        <td className="px-4 py-2 text-slate-500">{m.index}</td>
                        {result.matches[0].groups.length > 0 && (
                          <td className="break-all px-4 py-2 font-mono text-slate-600">
                            {m.groups.join(" | ")}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
