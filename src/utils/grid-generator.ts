import {
  add,
  endOfMonth,
  format,
  getDay,
  getDaysInMonth,
  startOfMonth,
  startOfWeek,
  sub,
} from 'date-fns';
import { Day } from '../types';

const MONTH_COLUMNS = 7;
const MONTH_ROWS = 6;
const MONTH_DIMENSION = MONTH_COLUMNS * MONTH_ROWS;

function monthPadStart(date: Date, startWeekOn: Day) {
  const monthStart = startOfMonth(date);
  const day = getDay(monthStart);

  if (day === 0) {
    return date;
  }

  return sub(monthStart, {
    days: day - startWeekOn,
  });
}

function monthPadEnd(date: Date, startWeekOn: Day) {
  const firstDay = startOfMonth(date);
  const lastDay = endOfMonth(date);
  const daysPadStart = getDay(firstDay) - startWeekOn;
  const daysPadEnd = MONTH_DIMENSION - (getDaysInMonth(date) + daysPadStart);

  return add(lastDay, {
    days: daysPadEnd,
  });
}

function getWeekDays(date: Date): Date[] {
  const weekDays: Date[] = [];
  const firstDay = startOfWeek(date, {
    weekStartsOn: 1,
  });

  for (let i = 0; i < 7; i++) {
    weekDays.push(
      add(firstDay, {
        days: i,
      })
    );
  }

  return weekDays;
}

function dayName(date: Date) {
  return format(date, 'E');
}

function generateMonthCalendarArray(date: Date, startWeekOn: Day) {
  const days = [];
  const firstDayOfMonth = monthPadStart(date, startWeekOn);
  const lastDayOfMonth = monthPadEnd(date, startWeekOn);

  let day = firstDayOfMonth;
  while (day <= lastDayOfMonth) {
    days.push(day);
    day = add(day, {
      days: 1,
    });
  }

  return days;
}

type CallbackType<T> = (date: Date) => T;

function generateMonthCalendarGrid<T = Date>(
  day: Date,
  rows = 6,
  columns = 7,
  startWeekOn: Day,
  cb?: CallbackType<T>
) {
  const grid: T[][] = [];
  const days = generateMonthCalendarArray(day, startWeekOn);

  for (let row = 0; row < rows; row++) {
    const cells: Date[] & T[] = [];
    for (let column = 0; column < columns; column++) {
      const index = row * columns + column;

      if (cb) {
        cells.push(cb(days[index]));
      } else {
        cells.push(days[index]);
      }
    }

    grid[row] = cells;
  }

  return grid;
}

type GridGeneratorType<T> = {
  date: Date;
  cb?: CallbackType<T>;
  startWeekOn: Day;
};

export function gridGenerator<T = Date>(params: GridGeneratorType<T>) {
  const { date, cb, startWeekOn } = params;
  const monthCalendarGrid = generateMonthCalendarGrid(
    date,
    MONTH_ROWS,
    MONTH_COLUMNS,
    startWeekOn,
    cb
  );

  return {
    monthCalendarGrid,
    weekDays: getWeekDays(date),
    dayName: dayName(date),
  };
}
