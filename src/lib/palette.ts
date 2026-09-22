export interface Rgb {
  r: number;
  g: number;
  b: number;
}

interface Box {
  pixels: Rgb[];
  splittable: boolean;
}

function channelRange(pixels: Rgb[], channel: "r" | "g" | "b"): number {
  let min = 255;
  let max = 0;
  for (const p of pixels) {
    if (p[channel] < min) min = p[channel];
    if (p[channel] > max) max = p[channel];
  }
  return max - min;
}

function average(pixels: Rgb[]): Rgb {
  if (!pixels.length) return { r: 0, g: 0, b: 0 };
  let r = 0;
  let g = 0;
  let b = 0;
  for (const p of pixels) {
    r += p.r;
    g += p.g;
    b += p.b;
  }
  const n = pixels.length;
  return { r: Math.round(r / n), g: Math.round(g / n), b: Math.round(b / n) };
}

export function medianCutPalette(
  rgba: Uint8ClampedArray | Rgb[],
  colorCount: number
): Rgb[] {
  const pixels: Rgb[] =
    rgba instanceof Uint8ClampedArray
      ? Array.from({ length: Math.floor(rgba.length / 4) }, (_, i) => ({
          r: rgba[i * 4],
          g: rgba[i * 4 + 1],
          b: rgba[i * 4 + 2],
        }))
      : rgba;

  const target = Math.max(1, Math.min(colorCount, 32));
  if (!pixels.length) return [];
  if (pixels.length === 1) return [pixels[0]];

  const boxes: Box[] = [{ pixels: [...pixels], splittable: true }];

  while (boxes.length < target) {
    let bestIndex = -1;
    let bestRange = -1;
    let bestChannel: "r" | "g" | "b" = "r";
    boxes.forEach((box, i) => {
      if (!box.splittable) return;
      (["r", "g", "b"] as const).forEach((ch) => {
        const range = channelRange(box.pixels, ch);
        if (range > bestRange) {
          bestRange = range;
          bestIndex = i;
          bestChannel = ch;
        }
      });
    });
    if (bestIndex === -1 || bestRange === 0) break;

    const box = boxes[bestIndex];
    const sorted = [...box.pixels].sort((a, b) => a[bestChannel] - b[bestChannel]);
    const mid = Math.floor(sorted.length / 2);
    const left = sorted.slice(0, mid);
    const right = sorted.slice(mid);
    if (!left.length || !right.length) {
      box.splittable = false;
      continue;
    }
    boxes.splice(bestIndex, 1, { pixels: left, splittable: true }, { pixels: right, splittable: true });
  }

  const palette = boxes.map((b) => average(b.pixels));
  palette.sort((a, b) => {
    const lum = (p: Rgb) => 0.299 * p.r + 0.587 * p.g + 0.114 * p.b;
    return lum(b) - lum(a);
  });
  return palette;
}

export function rgbToHex({ r, g, b }: Rgb): string {
  const to = (v: number) => v.toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`.toUpperCase();
}
