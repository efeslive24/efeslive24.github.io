"use client";

import { TOOL_COMPONENTS } from "./map";

export function ToolRunner({ slug }: { slug: string }) {
  const Component = TOOL_COMPONENTS[slug];
  if (!Component) return null;
  return (
    <section aria-label="Araç" className="my-6">
      <Component />
    </section>
  );
}
