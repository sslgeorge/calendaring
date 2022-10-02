import { GridRefs } from '../types'

export function useTableRows(ref?: GridRefs) {
  if (!ref || !ref.cellRef) {
    return {}
  }
  const { cellRef } = ref

  return {}
}
