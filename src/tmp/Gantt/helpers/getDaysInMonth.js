/**
 * @return {Date[]} List with date objects for each day of the month
 * @param month
 * @param year
 */
export function getDaysInMonth(month, year) {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    const dayUnixTime = date.getTime() / 1000;
    days.push(dayUnixTime);
    date.setDate(date.getDate() + 1);
  }
  return days;
}
