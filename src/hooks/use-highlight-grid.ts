import { useStoreContext } from '../store-context';
import { CellHighlightType, Day, Highlight } from '../types';
import { gridGenerator } from '../utils/grid-generator';

function gridGeneratorCallback(day: Date, highlight: Highlight): CellHighlightType {
  if (highlight && highlight.allDay) {
    const { start, end } = highlight.range;
    if (day >= start && day <= end) {
      return {
        day,
        highlight: true,
      };
    }
  }

  return { day, highlight: false };
}

export function useHighlightGrid() {
  const { highlight, date } = useStoreContext();

  const { monthCalendarGrid } = gridGenerator({
    date,
    startWeekOn: Day.Sunday,
    cb: (day) => {
      return gridGeneratorCallback(day, highlight);
    },
  });

  return {
    highlightGrid: monthCalendarGrid,
  };
}
