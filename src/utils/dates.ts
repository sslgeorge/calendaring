export function getDateRange(date0: Date, date1: Date) {
  const start = date0 < date1 ? date0 : date1;
  const end = date0 < date1 ? date1 : date0;
  return { start, end };
}
