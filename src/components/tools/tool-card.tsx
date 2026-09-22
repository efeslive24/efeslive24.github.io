import Link from "next/link";
import type { ToolDef } from "@/lib/tools/types";
import { CATEGORY_ICONS, IconChevronRight } from "../icons";
import { getCategory } from "@/lib/tools/categories";

export function ToolCard({ tool, showCategory = true }: { tool: ToolDef; showCategory?: boolean }) {
  const cat = getCategory(tool.category);
  const Icon = cat ? CATEGORY_ICONS[cat.icon] : null;

  return (
    <Link
      href={`/tools/${tool.slug}/`}
      className="group flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-slate-800 group-hover:text-brand-700">
          {tool.title}
        </h3>
        {Icon && (
          <span className="rounded-lg bg-slate-100 p-2 text-slate-500 transition group-hover:bg-brand-50 group-hover:text-brand-600">
            <Icon size={16} />
          </span>
        )}
      </div>
      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate-500">
        {tool.description}
      </p>
      <div className="mt-3 flex items-center justify-between">
        {showCategory && cat ? (
          <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            {cat.name}
          </span>
        ) : (
          <span />
        )}
        <span className="flex items-center gap-0.5 text-xs font-medium text-brand-600 opacity-0 transition group-hover:opacity-100">
          Kullan <IconChevronRight size={13} />
        </span>
      </div>
    </Link>
  );
}
