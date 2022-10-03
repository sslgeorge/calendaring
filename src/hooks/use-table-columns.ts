import { GridRefs } from '../types';

export function useTableColumns(ref?: GridRefs) {
  if (!ref || !ref.cellRef) {
    return {};
  }
  const { cellRef } = ref;

  return {};
}
