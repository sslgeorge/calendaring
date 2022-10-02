import { GridRefs } from '../types';
import { usePositions } from './use-positions';
import { EventEmitter } from 'events';

const emitter = new EventEmitter();

export function useTable(ref?: GridRefs) {
  const positions = usePositions(ref);

  if (!ref || !ref.tableRef) {
    return {};
  }

  const { tableRef } = ref;

  const computeGridPoint = (pageX: number, pageY: number): [number, number] => {
    const { left, top } = tableRef.getBoundingClientRect();
    const x = pageX - left;
    const y = pageY - top;
    return [x, y];
  };

  const computeCellAxis = (pageX: number, pageY: number) => {
    const [x, y] = computeGridPoint(pageX, pageY);
    const { row, col } = positions.getCellAxis(x, y);
    return { row, col };
  };

  const handlePointerDown = (ev: MouseEvent) => {
    const axis = computeCellAxis(ev.pageX, ev.pageY);
    console.log(axis, 'pointpoint');
  };

  emitter.addListener('pointerdown', handlePointerDown);
  emitter.addListener('pointerup', () => {});
  emitter.addListener('pointermove', () => {});

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
