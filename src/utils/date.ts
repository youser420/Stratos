/**
 * Pure date helpers shared across Sphere features (Reflection, Basecamp,
 * analytics). No React, no server, no DB access.
 */

export function toUtcDateOnly(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

export function isSameUtcDay(a: Date, b: Date): boolean {
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  );
}

export function daysBetweenUtc(from: Date, to: Date): number {
  const fromDay = toUtcDateOnly(from).getTime();
  const toDay = toUtcDateOnly(to).getTime();

  return Math.round((toDay - fromDay) / (1000 * 60 * 60 * 24));
}

export function startOfUtcDaysAgo(days: number, from: Date = new Date()): Date {
  const base = toUtcDateOnly(from);
  base.setUTCDate(base.getUTCDate() - days);
  return base;
}
