import { Box, GridRefs } from '../types';
import { useCellAxis } from './use-cell-axis';
import { EventEmitter } from 'events';
import { useMemo, useRef } from 'preact/hooks';
import { useCallback } from 'preact/compat';

const emitter = new EventEmitter();

export function useTable(ref?: GridRefs) {
  const movingBox = useRef<Box>(null);
  const { getCellBox } = useCellAxis(ref);

  const handlePointerDown = useCallback(
    (ev: MouseEvent) => {
      const box = getCellBox(ev.pageX, ev.pageY);
      console.log(box);
      // const axis = computeCellAxis(ev.pageX, ev.pageY);
      // console.log(axis, 'pointpoint');
    },
    [getCellBox]
  );

  const handlePointerMove = useCallback((ev: MouseEvent) => {
    // const axis = computeCellAxis(ev.pageX, ev.pageY);
    // console.log(axis, 'pointpoint');
  }, []);

  const handlePointerUp = useCallback((ev: MouseEvent) => {
    // const axis = computeCellAxis(ev.pageX, ev.pageY);
    // console.log(axis, 'pointpoint');
  }, []);

  useMemo(() => {
    emitter.removeAllListeners();
    emitter.addListener('pointerdown', handlePointerDown);
    emitter.addListener('pointermove', handlePointerMove);
    emitter.addListener('pointerup', handlePointerUp);
  }, [handlePointerDown, handlePointerMove, handlePointerUp]);

  if (!ref || !ref.tableRef) {
    return {};
  }

  return {
    emitter,
  } as const;
}
