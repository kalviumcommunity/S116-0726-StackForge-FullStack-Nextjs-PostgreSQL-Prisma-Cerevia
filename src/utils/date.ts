/**
 * Calculates the ISO 8601 week number and year for a given date.
 */
export function getWeekNumber(date: Date): { week: number; year: number } {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
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
 * Calculates the start and end Date bounds for the ISO week of a given date.
 * ISO week starts on Monday at 00:00:00 and ends on Sunday at 23:59:59.999.
 */
export function getWeekRange(date: Date): { start: Date; end: Date } {
  const start = new Date(date);
  const day = start.getDay();
  // Adjust to Monday of the current week
  const diff = start.getDate() - day + (day === 0 ? -6 : 1);
  start.setDate(diff);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 7); // Start of the next Monday (exclusive boundary)

  return { start, end };
}
