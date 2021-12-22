import { MONTHS, WEEK_DAYS } from "~/utils";

export * from "./date.constants";
export type DateType = string | Date | number;
export type DateMaskFormat = "YYYY-MM-DD" | "YYYY-DD-MM";
export type FormatType = "unix" | "format" | "date";
type MapOfDateFormatResult = { [key: string]: string };

export const mapOfDateFormat = (
  year: number | string,
  month: number | string,
  day: number | string,
): MapOfDateFormatResult => ({
  "YYYY-MM-DD": `${year}-${pad(Number(month))}-${pad(Number(day))}`,
  "YYYY-DD-MM": `${year}-${pad(Number(day))}-${Number(pad(Number(month)))}`,
});

export const mapOfDate = (
  date: DateType,
  format: DateMaskFormat,
): { date: Date; format: string; unix: number } => {
  const { year, month, day } = getDateField(date);
  const value = new Date(`${year}-${month}-${day} 00:00:00`);
  return {
    unix: getTime(value),
    format: mapOfDateFormat(year, month, day)[format],
    date: value,
  };
};

export function getDateField(date: DateType): { day: number; year: number; month: number } {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();
  return { day, month, year };
}

export function getStringDate(date: Date): string {
  const { day, month, year } = getDateField(date);
  return `${year}-${month}-${day} 00:00:00`;
}

export function isLeapYear(year: number): boolean {
  return new Date(year, 1, 29).getMonth() === 1;
}

export function getDate(date: DateType): number {
  return new Date(date).getDate();
}

export function getMonth(date: DateType): number {
  return new Date(date).getMonth();
}

export function getTime(date: DateType): number {
  return new Date(date).getTime();
}

export function getYear(date: DateType): number {
  return new Date(date).getFullYear();
}

export function getMonthNameByIndex(index: number): string {
  console.log(MONTHS[index]);
  return MONTHS[index];
}

export function addDays(date: number, days: number): number {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.getTime();
}

export function addYears(date: DateType, count: number): Date {
  const d = new Date(date);
  return new Date(d.setFullYear(d.getFullYear() + count));
}

export function addMonth(date: DateType, count: number): Date {
  const d = new Date(date);
  return new Date(d.setMonth(d.getMonth() + count));
}

export function subtractDays(date: number, days: number): number {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result.getTime();
}

export function subtractYears(date: DateType, count: number): Date {
  const d = new Date(date);
  return new Date(d.setFullYear(d.getFullYear() - count));
}

export function subtractMonth(date: DateType, count: number): Date {
  const d = new Date(date);
  return new Date(d.setMonth(d.getMonth() - count));
}

export function getDatesBetweenToDates(startDate: number, stopDate: number): Date[] {
  const dateArray = [];
  let currentDate = startDate;
  while (currentDate < stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  return dateArray;
}

export function paddingFirstDayInMonth(year: number, month: number): number {
  let day = new Date(year, month, 1).getDay();
  if (day === 0) {
    // день недели 0 (воскресенье) в европейской нумерации будет 7
    day = 7;
  }
  return day - 1;
}

export function isValidDate(date: DateType): boolean {
  const d = new Date(date);
  if (Object.prototype.toString.call(d) === "[object Date]") {
    if (isNaN(d.getTime())) {
      console.log("date is not valid");
    } else {
      console.log("date is valid");
    }
  } else {
    console.log("not a date");
  }
  return Boolean(Date.parse(`${date}`) > 0);
}

export function isNow(d: number, date: Date): boolean {
  const day = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  return day === d && month === getMonth(date) && year === getYear(date);
}

export function getDaysInMonth(month: number, year: number): Date[] {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export function pad(n: number): string | number {
  return n < 10 ? `0${n}` : n;
}

export function getDateWithFormat(value: Date, format: DateMaskFormat = "YYYY-MM-DD"): string {
  const date = value;
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  return mapOfDateFormat(year, month, day)[format];
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

export function getWeekArray(d: Date | number | string): Array<{ title: string; date: string }> {
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

export function timeConverter(UNIX_timestamp: number): string {
  const a = new Date(UNIX_timestamp * 1000);
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const time = `${year}-${month}-${date}`;
  return time;
}

export function findMinMax<T extends { end: number; start: number }>(arr: T[]): number[] {
  const minMax = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    minMax.push(arr[i].end);
    minMax.push(arr[i].start);
  }
  return [Math.min(...minMax), Math.max(...minMax)];
}
