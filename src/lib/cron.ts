export interface CronFields {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

export const DEFAULT_CRON: CronFields = {
  minute: "0",
  hour: "12",
  dayOfMonth: "*",
  month: "*",
  dayOfWeek: "*",
};

const FIELD_RANGES: Record<keyof CronFields, [number, number]> = {
  minute: [0, 59],
  hour: [0, 23],
  dayOfMonth: [1, 31],
  month: [1, 12],
  dayOfWeek: [0, 6],
};

export function buildCron(fields: CronFields): string {
  return [
    fields.minute || "*",
    fields.hour || "*",
    fields.dayOfMonth || "*",
    fields.month || "*",
    fields.dayOfWeek || "*",
  ].join(" ");
}

function expandField(expr: string, min: number, max: number): Set<number> {
  const values = new Set<number>();
  for (const part of expr.split(",")) {
    const p = part.trim();
    if (p === "*" || p === "") {
      for (let i = min; i <= max; i++) values.add(i);
      continue;
    }
    const stepMatch = p.match(/^(.+?)\/(\d+)$/);
    const step = stepMatch ? Number(stepMatch[2]) : 1;
    const base = stepMatch ? stepMatch[1] : p;
    if (base === "*") {
      for (let i = min; i <= max; i += step) values.add(i);
      continue;
    }
    const rangeMatch = base.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
      const start = Number(rangeMatch[1]);
      const end = Number(rangeMatch[2]);
      for (let i = start; i <= end; i += step) values.add(i);
      continue;
    }
    const n = Number(base);
    if (Number.isFinite(n) && n >= min && n <= max) values.add(n);
  }
  return values;
}

export interface ParseResult {
  ok: boolean;
  fields?: CronFields;
  error?: string;
}

export function parseCron(expr: string): ParseResult {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) {
    return { ok: false, error: "Cron ifadesi 5 alandan oluşmalıdır: dakika saat gün ay hafta-günü." };
  }
  const fields: CronFields = {
    minute: parts[0],
    hour: parts[1],
    dayOfMonth: parts[2],
    month: parts[3],
    dayOfWeek: parts[4],
  };
  for (const key of Object.keys(fields) as (keyof CronFields)[]) {
    const [min, max] = FIELD_RANGES[key];
    const values = expandField(fields[key], min, max);
    if (values.size === 0) {
      return { ok: false, error: `"${fields[key]}" geçersiz bir ${key} değeri.` };
    }
  }
  return { ok: true, fields };
}

export function nextRuns(expr: string, count = 5, from: Date = new Date()): Date[] {
  const parsed = parseCron(expr);
  if (!parsed.ok || !parsed.fields) return [];

  const f = parsed.fields;
  const minutes = [...expandField(f.minute, 0, 59)].sort((a, b) => a - b);
  const hours = [...expandField(f.hour, 0, 23)].sort((a, b) => a - b);
  const daysOfMonth = [...expandField(f.dayOfMonth, 1, 31)].sort((a, b) => a - b);
  const months = [...expandField(f.month, 1, 12)].sort((a, b) => a - b);
  const daysOfWeek = [...expandField(f.dayOfWeek, 0, 6)].sort((a, b) => a - b);

  // Ayın günü veya haftanın günü alanlarından en az biri kısıtlıysa "veya" mantığı uygulanır
  const domRestricted = !(f.dayOfMonth === "*" || f.dayOfMonth === "");
  const dowRestricted = !(f.dayOfWeek === "*" || f.dayOfWeek === "");

  const results: Date[] = [];
  const start = new Date(from);
  start.setSeconds(0, 0);
  start.setMinutes(start.getMinutes() + 1);

  const candidate = new Date(start);
  let guard = 0;
  while (results.length < count && guard < 366 * 24 * 60) {
    guard++;
    const minute = candidate.getMinutes();
    const hour = candidate.getHours();
    const day = candidate.getDate();
    const month = candidate.getMonth() + 1;
    const year = candidate.getFullYear();
    const dow = candidate.getDay();

    if (minutes.includes(minute) && hours.includes(hour) && months.includes(month)) {
      const domMatch = daysOfMonth.includes(day);
      const dowMatch = daysOfWeek.includes(dow);
      const dayMatch = domRestricted && dowRestricted ? domMatch || dowMatch : domRestricted ? domMatch : dowRestricted ? dowMatch : true;
      if (dayMatch) {
        results.push(new Date(candidate));
      }
    }
    candidate.setMinutes(candidate.getMinutes() + 1);
    if (candidate.getFullYear() - year > 5) break;
  }
  return results;
}
