export interface Unit {
  id: string;
  name: string;
  factor?: number;
  toBase?: (v: number) => number;
  fromBase?: (v: number) => number;
}

export interface UnitCategory {
  id: string;
  name: string;
  units: Unit[];
}

export const UNIT_CATEGORIES: UnitCategory[] = [
  {
    id: "length",
    name: "Uzunluk",
    units: [
      { id: "mm", name: "Milimetre (mm)", factor: 0.001 },
      { id: "cm", name: "Santimetre (cm)", factor: 0.01 },
      { id: "m", name: "Metre (m)", factor: 1 },
      { id: "km", name: "Kilometre (km)", factor: 1000 },
      { id: "in", name: "İnç (in)", factor: 0.0254 },
      { id: "ft", name: "Fit (ft)", factor: 0.3048 },
      { id: "yd", name: "Yarda (yd)", factor: 0.9144 },
      { id: "mi", name: "Mil (mi)", factor: 1609.344 },
    ],
  },
  {
    id: "weight",
    name: "Ağırlık",
    units: [
      { id: "mg", name: "Miligram (mg)", factor: 1e-6 },
      { id: "g", name: "Gram (g)", factor: 0.001 },
      { id: "kg", name: "Kilogram (kg)", factor: 1 },
      { id: "ton", name: "Ton (t)", factor: 1000 },
      { id: "oz", name: "Ons (oz)", factor: 0.028349523125 },
      { id: "lb", name: "Pound (lb)", factor: 0.45359237 },
    ],
  },
  {
    id: "temperature",
    name: "Sıcaklık",
    units: [
      { id: "c", name: "Celsius (°C)", toBase: (v) => v, fromBase: (v) => v },
      { id: "f", name: "Fahrenheit (°F)", toBase: (v) => ((v - 32) * 5) / 9, fromBase: (v) => (v * 9) / 5 + 32 },
      { id: "k", name: "Kelvin (K)", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    ],
  },
  {
    id: "area",
    name: "Alan",
    units: [
      { id: "m2", name: "Metrekare (m²)", factor: 1 },
      { id: "cm2", name: "Santimetrekare (cm²)", factor: 1e-4 },
      { id: "km2", name: "Kilometrekare (km²)", factor: 1e6 },
      { id: "ha", name: "Hektar (ha)", factor: 1e4 },
      { id: "ft2", name: "Fitkare (ft²)", factor: 0.09290304 },
      { id: "acre", name: "Acre", factor: 4046.8564224 },
    ],
  },
  {
    id: "volume",
    name: "Hacim",
    units: [
      { id: "ml", name: "Mililitre (ml)", factor: 0.001 },
      { id: "l", name: "Litre (L)", factor: 1 },
      { id: "m3", name: "Metreküp (m³)", factor: 1000 },
      { id: "cup", name: "Su Bardağı (cup)", factor: 0.2365882365 },
      { id: "tbsp", name: "Yemek Kaşığı (tbsp)", factor: 0.01478676478125 },
      { id: "tsp", name: "Çay Kaşığı (tsp)", factor: 0.00492892159375 },
      { id: "gal", name: "Galon (gal, ABD)", factor: 3.785411784 },
      { id: "floz", name: "Sıvı Onsu (fl oz, ABD)", factor: 0.0295735295625 },
    ],
  },
  {
    id: "speed",
    name: "Hız",
    units: [
      { id: "kmh", name: "Kilometre/saat (km/s)", factor: 1 },
      { id: "ms", name: "Metre/saniye (m/s)", factor: 3.6 },
      { id: "mph", name: "Mil/saat (mph)", factor: 1.609344 },
      { id: "knot", name: "Knot", factor: 1.852 },
    ],
  },
  {
    id: "data",
    name: "Veri (Depolama)",
    units: [
      { id: "b", name: "Bayt (B)", factor: 1 },
      { id: "kb", name: "Kilobayt (KB)", factor: 1024 },
      { id: "mb", name: "Megabayt (MB)", factor: 1024 ** 2 },
      { id: "gb", name: "Gigabayt (GB)", factor: 1024 ** 3 },
      { id: "tb", name: "Terabayt (TB)", factor: 1024 ** 4 },
    ],
  },
];

export function getCategory(id: string): UnitCategory | undefined {
  return UNIT_CATEGORIES.find((c) => c.id === id);
}

export function convertUnit(
  categoryId: string,
  value: number,
  fromId: string,
  toId: string
): number | null {
  const category = getCategory(categoryId);
  if (!category) return null;
  const from = category.units.find((u) => u.id === fromId);
  const to = category.units.find((u) => u.id === toId);
  if (!from || !to) return null;
  if (!Number.isFinite(value)) return null;

  const base = from.toBase ? from.toBase(value) : value * (from.factor ?? 1);
  const result = to.fromBase ? to.fromBase(base) : base / (to.factor ?? 1);
  return Number(result.toPrecision(12));
}

export function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs !== 0 && (abs >= 1e9 || abs < 1e-6)) return n.toExponential(6);
  return n.toLocaleString("tr-TR", { maximumFractionDigits: 8 });
}
