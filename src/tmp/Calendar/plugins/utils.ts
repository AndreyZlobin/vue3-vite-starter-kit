import { WEEK_DAYS } from './enum';

export function isLeapYear(year: number): boolean {
  return new Date(year, 1, 29).getMonth() === 1;
}

export function getDate(date: Date | number | string): number {
  return new Date(date).getDate();
}

export function getMonth(date: Date | number | string): number {
  return new Date(date).getMonth();
}

export function getYear(date: Date | number | string): number {
  return new Date(date).getFullYear();
}

export function paddingFirstDayInMonth(year: number, month: number): number {
  let day = new Date(year, month, 1).getDay();
  if (day === 0) {
    // день недели 0 (воскресенье) в европейской нумерации будет 7
    day = 7;
  }
  return day - 1;
}

export function paddingLastDayInMonth(year: number, month: number, day: number): number {
  let week = new Date(year, month, day).getDay();
  if (week === 0) {
    // день недели 0 (воскресенье) в европейской нумерации будет 7
    week = 7;
  }
  return 7 - week;
}

export function getMonday(d: Date | number | string): Date {
  d = new Date(d);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

export function getWeekArray(
  d: Date | number | string,
): Array<{ title: string; date: string }> {
  const monday = getMonday(d);
  const weekArr = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    weekArr.push({
      title: WEEK_DAYS[i],
      date: new Date(date.setDate(date.getDate() + i)).toUTCString(),
    });
  }
  return weekArr;
}

export function addDays(date: number, days: number): number {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.getTime() / 1000;
}

export function subtractDays(date: number, days: number): number {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result.getTime() / 1000;
}

export function timeConverter(UNIX_timestamp: number): string {
  const a = new Date(UNIX_timestamp * 1000);
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const time = `${year}-${month}-${date}`;
  return time;
}
