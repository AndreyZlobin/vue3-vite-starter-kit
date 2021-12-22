export const MONTH_DAY: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const MONTH_DAY_LEAP: number[] = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const WEEK_DAYS: string[] = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресень',
];
export const CALENDAR_TASK_TYPES: Array<{ name: string; color: string }> = [
  {
    name: 'Плановое выполнение КС',
    color: '#81ABEE',
  },
  {
    name: 'Просрочка КС',
    color: '#F196A5',
  },
  {
    name: 'Факт КС',
    color: '#8DC95E',
  },
  {
    name: 'Плановое выполнение задачи',
    color: '#EFE8FC',
  },
  {
    name: 'Просрочка задачи',
    color: '#FBE9EC',
  },
  {
    name: 'Факт задачи',
    color: '#E3F3D8',
  },
];
export const WEEK_DAYS_SHORT: string[] = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
export const QUARTER_MONTH = {
  1: [
    {
      month: 0,
      title: 'Январь',
    },
    {
      month: 1,
      title: 'Февраль',
    },
    {
      month: 2,
      title: 'Март',
    },
  ],
  2: [
    {
      month: 3,
      title: 'Апрель',
    },
    {
      month: 4,
      title: 'Май',
    },
    {
      month: 5,
      title: 'Июнь',
    },
  ],
  3: [
    {
      month: 6,
      title: 'Июль',
    },
    {
      month: 7,
      title: 'Август',
    },
    {
      month: 8,
      title: 'Сентябрь',
    },
  ],
  4: [
    {
      month: 9,
      title: 'Октябрь',
    },
    {
      month: 10,
      title: 'Ноябрь',
    },
    {
      month: 11,
      title: 'Декабрь',
    },
  ],
};
