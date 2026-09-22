"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { IconSearch } from "../icons";

export function SearchBox({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [q, setQ] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/?q=${encodeURIComponent(term)}` : "/");
  };

  return (
    <form onSubmit={submit} role="search" className="relative w-full">
      <IconSearch
        size={18}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
      />
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Araç ara… (örn. kelime sayacı)"
        aria-label="Araç ara"
        className={`w-full rounded-full border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 ${
          compact ? "py-2" : ""
        }`}
      />
    </form>
  );
}
