import { cpSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

const copies = [
  [
    join(root, "node_modules/pdfjs-dist/build/pdf.worker.min.mjs"),
    join(root, "public/pdfjs/pdf.worker.min.mjs"),
  ],
];

for (const [src, dest] of copies) {
  if (!existsSync(src)) {
    console.warn(`Atlandı (bulunamadı): ${src}`);
    continue;
  }
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(src, dest);
  console.log(`Kopyalandı: ${dest}`);
}
