export interface IcoPng {
  width: number;
  height: number;
  data: Uint8Array;
}

export function buildIco(pngs: IcoPng[]): Uint8Array {
  const count = pngs.length;
  const headerSize = 6;
  const entrySize = 16;
  const offset = headerSize + count * entrySize;
  const totalSize = offset + pngs.reduce((sum, p) => sum + p.data.length, 0);

  const buf = new Uint8Array(totalSize);
  const view = new DataView(buf.buffer);

  view.setUint16(0, 0, true); // reserved
  view.setUint16(2, 1, true); // type: icon
  view.setUint16(4, count, true);

  let cursor = offset;
  pngs.forEach((png, i) => {
    const entry = headerSize + i * entrySize;
    view.setUint8(entry, png.width >= 256 ? 0 : png.width);
    view.setUint8(entry + 1, png.height >= 256 ? 0 : png.height);
    view.setUint8(entry + 2, 0); // palette colors
    view.setUint8(entry + 3, 0); // reserved
    view.setUint16(entry + 4, 1, true); // planes
    view.setUint16(entry + 6, 32, true); // bits per pixel
    view.setUint32(entry + 8, png.data.length, true);
    view.setUint32(entry + 12, cursor, true);
    buf.set(png.data, cursor);
    cursor += png.data.length;
  });

  return buf;
}

export function parseIco(header: Uint8Array): number {
  // Returns image count from an ICO header; -1 if not a valid ICO.
  if (header.length < 6) return -1;
  const view = new DataView(header.buffer, header.byteOffset, header.byteLength);
  if (view.getUint16(0, true) !== 0) return -1;
  if (view.getUint16(2, true) !== 1) return -1;
  return view.getUint16(4, true);
}
