export function calcPercentage(value: number, percent: number): number {
  return (value * percent) / 100;
}

export function calcPercentChange(from: number, to: number): number {
  if (from === 0) return to === 0 ? 0 : NaN;
  return ((to - from) / Math.abs(from)) * 100;
}

export function calcRatio(part: number, total: number): number {
  if (total === 0) return NaN;
  return (part / total) * 100;
}

export function calcDiscount(price: number, discountPct: number) {
  const saved = (price * discountPct) / 100;
  return { final: price - saved, saved };
}

export function calcDiscountRate(original: number, final: number): number {
  if (original === 0) return NaN;
  return ((original - final) / original) * 100;
}

export function calcVat(amount: number, rate: number, includesVat: boolean) {
  if (includesVat) {
    const net = amount / (1 + rate / 100);
    return { net, vat: amount - net, gross: amount };
  }
  const vat = (amount * rate) / 100;
  return { net: amount, vat, gross: amount + vat };
}

const DAY_MS = 86400000;

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function calcAge(birth: Date, today: Date = new Date()) {
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();
  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += daysInMonth(prevMonth.getFullYear(), prevMonth.getMonth());
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  const totalDays = Math.floor((today.getTime() - birth.getTime()) / DAY_MS);

  const nextBirthday = new Date(
    today.getFullYear(),
    birth.getMonth(),
    birth.getDate()
  );
  if (nextBirthday.getTime() < today.getTime()) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }
  const nextBirthdayInDays = Math.round(
    (nextBirthday.getTime() - today.getTime()) / DAY_MS
  );

  const weekdaysTr = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ];

  return {
    years,
    months,
    days,
    totalDays,
    nextBirthday,
    nextBirthdayInDays,
    nextAge: years + 1,
    nextBirthdayWeekday: weekdaysTr[nextBirthday.getDay()],
    birthWeekday: weekdaysTr[birth.getDay()],
  };
}

export function dateDiff(from: Date, to: Date) {
  const start = from.getTime() <= to.getTime() ? from : to;
  const end = from.getTime() <= to.getTime() ? to : from;

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += daysInMonth(prevMonth.getFullYear(), prevMonth.getMonth());
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.round((end.getTime() - start.getTime()) / DAY_MS);
  const weeks = Math.floor(totalDays / 7);
  const remDays = totalDays % 7;

  let weekdays = 0;
  const cursor = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  while (cursor.getTime() <= end.getTime()) {
    const dow = cursor.getDay();
    if (dow !== 0 && dow !== 6) weekdays += 1;
    cursor.setDate(cursor.getDate() + 1);
  }

  return { totalDays, weeks, remDays, months, years, days, weekdays };
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date.getTime());
  d.setDate(d.getDate() + days);
  return d;
}

export function calcFuel(
  distanceKm: number,
  consumptionL100: number,
  pricePerL: number,
  people: number = 1
) {
  const liters = (distanceKm * consumptionL100) / 100;
  const cost = liters * pricePerL;
  return {
    liters,
    cost,
    perPerson: people > 0 ? cost / people : NaN,
    perKm: distanceKm > 0 ? cost / distanceKm : NaN,
  };
}

export function calcTip(
  bill: number,
  tipPct: number,
  people: number = 1,
  roundUp: boolean = false
) {
  let tip = (bill * tipPct) / 100;
  let total = bill + tip;
  let perPerson = people > 0 ? total / people : NaN;
  if (roundUp) {
    perPerson = Math.ceil(perPerson);
    total = perPerson * Math.max(people, 1);
    tip = total - bill;
  }
  return {
    tip,
    total,
    perPerson: people > 0 ? total / people : NaN,
    people: Math.max(people, 1),
  };
}
