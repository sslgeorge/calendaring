import { Box, GridRefs } from '../types';
import { useCellAxis } from './use-cell-axis';
import { EventEmitter } from 'events';
import { useMemo, useRef } from 'preact/hooks';

const emitter = new EventEmitter();

export function useTable(ref?: GridRefs) {
  const movingBox = useRef<Box>(null);
  const { getCellBox } = useCellAxis(ref);

  const handlePointerDown = (ev: MouseEvent) => {
    movingBox.current = getCellBox(ev.pageX, ev.pageY);
    
    // const axis = computeCellAxis(ev.pageX, ev.pageY);
    // console.log(axis, 'pointpoint');
  };

  const handlePointerMove = (ev: MouseEvent) => {
    // const axis = computeCellAxis(ev.pageX, ev.pageY);
    // console.log(axis, 'pointpoint');
  };

  const handlePointerUp = (ev: MouseEvent) => {
    // const axis = computeCellAxis(ev.pageX, ev.pageY);
    // console.log(axis, 'pointpoint');
  };

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
