import Link from "next/link";
import { CATEGORIES } from "@/lib/tools/categories";
import { SITE_NAME } from "@/lib/constants/site";
import { IconBolt } from "../icons";
import { SearchBox } from "./search-box";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label={SITE_NAME}>
          <span className="rounded-lg bg-brand-600 p-1.5 text-white">
            <IconBolt size={20} />
          </span>
          <span className="text-base font-bold tracking-tight text-slate-900">
            FREE<span className="text-brand-600"> ONLINE </span>TOOLS
          </span>
        </Link>
        <div className="hidden flex-1 justify-center md:flex">
          <div className="w-full max-w-md">
            <SearchBox />
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2 md:hidden">
          <MobileNav />
        </div>
      </div>
      <nav
        aria-label="Kategoriler"
        className="hidden border-t border-slate-100 bg-white lg:block"
      >
        <div className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}/`}
              className="whitespace-nowrap rounded-md px-3 py-2 text-[13px] font-medium text-slate-600 hover:bg-brand-50 hover:text-brand-700"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
