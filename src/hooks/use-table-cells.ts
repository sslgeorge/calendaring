import { GridRefs } from '../types';

export function useTableCells(ref?: GridRefs) {
  if (!ref || !ref.cellRef) {
    return {};
  }
  const { cellRef, tableRef } = ref;
  const { offsetWidth, offsetLeft, offsetTop } = tableRef;

  return {
    elements: cellRef,
  };
}
