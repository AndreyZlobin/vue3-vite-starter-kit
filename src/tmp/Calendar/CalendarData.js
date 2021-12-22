import { getMonth, getYear } from './RirCalendar/plugins/utils';

export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const randomCount = () => {
  const count = Math.round(Math.random() * 100000);
  if (count > 0) return count;
};

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export function BigDataCalendar(date) {
  const month = getMonth(date);
  const year = getYear(date);
  const list = [];
  for (let i = 0; i < randomCount(); i++) {
    const start = randomDate(new Date(year, 0, 1), new Date(year, 11, 29));
    const finish =
      Math.random() < 0.5 ? randomDate(start, new Date(year, month, 29)) : null;
    list.push({
      id: uuid(),
      title: `TASK-${randomCount()}`,
      start,
      finish,
    });
  }
  return list;
}

export function DataLineCalendar() {
  const list = [];
  const colors = ['rocky', 'matrix', 'indiana', 'fargo', 'snatch'];
  for (let i = 1; i < 6; i++) {
    const start = randomDate(new Date(2021, 5, 1), new Date(2021, 5, 30));
    const finish = randomDate(start, new Date(2021, 5, 30));
    list.push({
      id: uuid(),
      title: `TASK-${i}`,
      level: 1,
      start,
      finish,
      color: colors[i - 1],
    });
  }
  return list;
}
