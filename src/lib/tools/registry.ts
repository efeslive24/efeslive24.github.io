import type { ToolDef } from "./types";
import { QR_TOOLS } from "./defs/qr";
import { PDF_TOOLS } from "./defs/pdf";
import { IMAGE_TOOLS } from "./defs/image";
import { TEXT_TOOLS } from "./defs/text";
import { DEV_TOOLS } from "./defs/dev";
import { SEO_TOOLS } from "./defs/seo";
import { WEBMASTER_TOOLS } from "./defs/webmaster";
import { CALC_TOOLS } from "./defs/calc";
import { SOCIAL_TOOLS } from "./defs/social";

export const ALL_TOOLS: ToolDef[] = [
  ...QR_TOOLS,
  ...PDF_TOOLS,
  ...IMAGE_TOOLS,
  ...TEXT_TOOLS,
  ...DEV_TOOLS,
  ...SEO_TOOLS,
  ...WEBMASTER_TOOLS,
  ...CALC_TOOLS,
  ...SOCIAL_TOOLS,
];

const TOOL_MAP: Record<string, ToolDef> = Object.fromEntries(
  ALL_TOOLS.map((t) => [t.slug, t])
);

export function getTool(slug: string): ToolDef | undefined {
  return TOOL_MAP[slug];
}

export function getToolsByCategory(category: string): ToolDef[] {
  return ALL_TOOLS.filter((t) => t.category === category);
}

export function getRelatedTools(tool: ToolDef): ToolDef[] {
  return tool.related
    .map((slug) => TOOL_MAP[slug])
    .filter((t): t is ToolDef => Boolean(t))
    .slice(0, 6);
}

export function getPopularTools(limit = 8): ToolDef[] {
  return ALL_TOOLS.filter((t) => t.isPopular).slice(0, limit);
}

export function getNewTools(limit = 6): ToolDef[] {
  return ALL_TOOLS.filter((t) => t.isNew).slice(0, limit);
}

export function searchTools(query: string): ToolDef[] {
  const q = query.trim().toLocaleLowerCase("tr");
  if (!q) return [];
  const terms = q.split(/\s+/);
  return ALL_TOOLS.filter((t) => {
    const haystack = [
      t.title,
      t.shortTitle,
      t.description,
      ...t.keywords,
    ]
      .join(" ")
      .toLocaleLowerCase("tr");
    return terms.every((term) => haystack.includes(term));
  }).slice(0, 12);
}
