import { Day } from '@src/types';
import { sub } from 'date-fns';
import { DEFAULT_VISIBLE_WEEKS, WEEK_DAYS } from '@src/commons/date';
import { range } from '@src/utils/arrays';

export function generateMonthDateMatrix(date: Date, startWeekOn: Day = Day.Sunday) {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfMatrix = sub(firstDayOfMonth, {
    days: firstDayOfMonth.getDay() - startWeekOn,
  });

  return range(0, DEFAULT_VISIBLE_WEEKS).map((weekIndex) => {
    return range(0, WEEK_DAYS).map((dayIndex) => {
      const date = new Date(firstDayOfMatrix);
      date.setDate(date.getDate() + weekIndex * WEEK_DAYS + dayIndex);
      return date;
    });
  });
}
