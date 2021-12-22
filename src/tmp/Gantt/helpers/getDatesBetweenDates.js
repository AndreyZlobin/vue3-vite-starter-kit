export function getDatesBetweenDates(startDate, endDate) {
  let dates = [];
  const theDate = new Date(startDate);
  while (theDate < endDate) {
    dates.push({
      start: new Date(theDate).getTime() / 1000,
      end: new Date(theDate).getTime() / 1000,
    });
    theDate.setDate(theDate.getDate() + 1);
  }
  return dates;
}
