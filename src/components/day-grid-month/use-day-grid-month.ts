import { useStoreContext } from '@src/store-context';
import { generateMonthDateMatrix } from '@src/commons/date-matrix';
import { useMemo } from 'preact/hooks';

export function useDayGridMonth() {
  const { date, startWeekOn } = useStoreContext();
  const dateMatrix = useMemo(() => generateMonthDateMatrix(date, startWeekOn), [date, startWeekOn]);

  return {
    dateMatrix,
  };
}
