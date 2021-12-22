export default function addDays(date: number, days: number): number {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.getTime();
}
