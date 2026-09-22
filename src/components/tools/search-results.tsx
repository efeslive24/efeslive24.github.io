"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { searchTools } from "@/lib/tools/registry";
import { ToolCard } from "./tool-card";
import { IconSearch } from "../icons";

function Results() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const results = useMemo(() => searchTools(q), [q]);

  if (!q) return null;

  return (
    <section aria-label="Arama sonuçları" className="mt-10">
      <h2 className="text-lg font-bold text-slate-900">
        &ldquo;{q}&rdquo; için sonuçlar
      </h2>
      {results.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-6 py-12 text-center">
          <IconSearch size={28} className="text-slate-400" />
          <p className="text-sm text-slate-600">
            &ldquo;{q}&rdquo; ile eşleşen araç bulunamadı. Farklı bir terim deneyin
            veya kategorilere göz atın.
          </p>
        </div>
      )}
    </section>
  );
}

export function SearchResults() {
  return (
    <Suspense fallback={null}>
      <Results />
    </Suspense>
  );
}
