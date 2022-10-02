import { GridRefs } from '../types';
import { usePositions } from './use-positions';
import { EventEmitter } from 'events';
import { useMemo } from 'preact/hooks';
import { useCallback } from 'preact/compat';

const emitter = new EventEmitter();

export function useTable(ref?: GridRefs) {
  const positions = usePositions(ref);
  const { tableRef } = ref ?? {};

  const computeGridPoint = useCallback(
    (pageX: number, pageY: number): [number, number] => {
      if (!tableRef) return [0, 0];

      const { left, top } = tableRef.getBoundingClientRect();
      const x = pageX - left;
      const y = pageY - top;

      return [x, y];
    },
    [tableRef],
  );

  const computeCellAxis = useCallback(
    (pageX: number, pageY: number) => {
      const [x, y] = computeGridPoint(pageX, pageY);
      const { row, col } = positions.getCellAxis(x, y);
      return { row, col };
    },
    [computeGridPoint, positions],
  );

  const handlePointerDown = useCallback(
    (ev: MouseEvent) => {
      const axis = computeCellAxis(ev.pageX, ev.pageY);
      console.log(axis, 'pointpoint');
    },
    [computeCellAxis],
  );
  useMemo(() => {
    emitter.removeAllListeners();
    emitter.addListener('pointerdown', handlePointerDown);
    emitter.addListener('pointerup', () => {});
    emitter.addListener('pointermove', () => {});
  }, [handlePointerDown]);

  if (!ref || !ref.tableRef) {
    return {};
  }

  return {
    // width: offsetWidth,
    // left: offsetLeft,
    // top: offsetTop,
    // cells,
    // rows,
    // columns,
    positions,
    emitter,
  } as const;
}
