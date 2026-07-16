/**
 * Calculates the ISO 8601 week number and year for a given date.
 * All math is done in UTC so it is stable across server timezones.
 */
export function getWeekNumber(date: Date): { week: number; year: number } {
  const d = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );
  return { week, year: d.getUTCFullYear() };
}

/**
 * Returns the UTC-midnight Date of the Monday that starts the given ISO week/year.
 * ISO week 1 is the week that contains the first Thursday of the year (i.e. Jan 4th).
 */
export function getMondayOfIsoWeek(year: number, week: number): Date {
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const jan4Day = jan4.getUTCDay() || 7; // 1=Mon ... 7=Sun
  const mondayOfWeek1 = new Date(jan4);
  mondayOfWeek1.setUTCDate(jan4.getUTCDate() - (jan4Day - 1));

  const monday = new Date(mondayOfWeek1);
  monday.setUTCDate(mondayOfWeek1.getUTCDate() + (week - 1) * 7);
  return monday;
}

/**
 * Calculates the start and end Date bounds for the ISO week of a given date.
 * ISO week starts on Monday at 00:00:00 and ends on Sunday at 23:59:59.999 (UTC).
 * Uses UTC consistently with `getWeekNumber` so the reported week/year and the
 * date window always agree, regardless of the server timezone.
 */
export function getWeekRange(date: Date): { start: Date; end: Date } {
  // Normalize to UTC midnight of the supplied calendar date
  const base = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
  const dayNum = base.getUTCDay() || 7; // 1=Mon ... 7=Sun
  const start = new Date(base);
  start.setUTCDate(base.getUTCDate() - (dayNum - 1)); // Monday 00:00 UTC

  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 7); // following Monday (exclusive boundary)

  return { start, end };
}
