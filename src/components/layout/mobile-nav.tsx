"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/tools/categories";
import { CATEGORY_ICONS, IconMenu, IconX } from "../icons";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
      >
        {open ? <IconX size={22} /> : <IconMenu size={22} />}
      </button>
      {open && (
        <div className="absolute inset-x-0 top-full z-40 border-b border-slate-200 bg-white shadow-lg">
          <nav aria-label="Kategoriler" className="mx-auto max-w-6xl px-4 py-4">
            <ul className="grid grid-cols-2 gap-1">
              {CATEGORIES.map((cat) => {
                const Icon = CATEGORY_ICONS[cat.icon];
                return (
                  <li key={cat.slug}>
                    <Link
                      href={`/categories/${cat.slug}/`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700"
                    >
                      <Icon size={18} className="text-brand-600" />
                      {cat.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
