import { Box, DateRange, GridRefs } from '../types';
import { useCellAxis } from './use-cell-axis';
import { EventEmitter } from 'events';
import { useMemo, useRef } from 'preact/hooks';
import { useStoreContext, useStoreDispatch } from '../store-context';
import { useCallback } from 'preact/compat';
import { gridGenerator } from '../utils/grid-generator';
import { endOfDay, startOfDay } from 'date-fns';
import { boxIsEqual } from '../utils/box';

const emitter = new EventEmitter();

function makeDateRange(date: Date): DateRange {
  return {
    start: startOfDay(date),
    end: endOfDay(date),
  };
}

function getDateRange(range0: DateRange, range1: DateRange): DateRange {
  const days = [range0.start, range0.end, range1.start, range1.end].sort(
    (a, b) => a.getTime() - b.getTime()
  );

  return {
    start: days[0],
    end: days[days.length - 1],
  };
}

export function useTable(ref?: GridRefs) {
  const { date, startWeekOn, height } = useStoreContext();
  const movingBox = useRef<Box>(null);
  const initialBox = useRef<Box>(null);
  const finalBox = useRef<Box>(null);
  const dispatch = useStoreDispatch();
  const { getCellBox } = useCellAxis(ref);
  const { monthCalendarGrid } = gridGenerator({
    date,
    startWeekOn,
  });

  const handleCellHighlight = useCallback(
    (box: Box) => {
      if (!box) return;

      const initialDay = monthCalendarGrid[initialBox.current.row][initialBox.current.col];
      const currentDay = monthCalendarGrid[box.row][box.col];

      const initialRange = makeDateRange(initialDay);
      const currentRange = makeDateRange(currentDay);
      const range = getDateRange(initialRange, currentRange);
      const highlight = {
        allDay: true,
        range,
      };
      dispatch({ type: 'HIGHLIGHT_CELL', payload: highlight });
    },
    [dispatch, monthCalendarGrid]
  );

  const handlePointerDown = useCallback(
    (ev: MouseEvent) => {
      const box = getCellBox(ev.pageX, ev.pageY);
      if (!box) return;
      const day = monthCalendarGrid[box.row][box.col];
      const range = makeDateRange(day);

      initialBox.current = box;
      movingBox.current = box;

      dispatch({
        type: 'HIGHLIGHT_CELL',
        payload: {
          allDay: true,
          range,
        },
      });
    },
    [dispatch, getCellBox, monthCalendarGrid]
  );

  const handlePointerMove = useCallback(
    (ev: MouseEvent) => {
      const box = getCellBox(ev.pageX, ev.pageY);

      const isSameBox = boxIsEqual(box, movingBox.current);
      if (isSameBox) {
        return;
      }

      movingBox.current = box;
      handleCellHighlight(box);
    },
    [getCellBox, handleCellHighlight]
  );

  const handlePointerUp = useCallback(
    (ev: MouseEvent) => {
      finalBox.current = getCellBox(ev.pageX, ev.pageY);

      dispatch({ type: 'UNHIGHLIGHT_CELL' });
    },
    [dispatch, getCellBox]
  );

  useMemo(() => {
    emitter.removeAllListeners();
    emitter.addListener('pointerdown', handlePointerDown);
    emitter.addListener('pointermove', handlePointerMove);
    emitter.addListener('pointerup', handlePointerUp);
  }, [handlePointerDown, handlePointerMove, handlePointerUp]);

  return {
    monthCalendarGrid,
    emitter,
  } as const;
}
