import { Box, GridRefs } from '../types';
import { useMemo } from 'preact/hooks';
import { useCallback } from 'preact/compat';
import { useStoreContext } from '../store-context';

function buildBox(boxRect: DOMRect, originRect: DOMRect, el: HTMLElement) {
  return {
    left: boxRect.left - originRect.left,
    top: boxRect.top - originRect.top,
    element: el,
  };
}

function generateColumnsPosition(grid: HTMLTableCellElement[][], origin: HTMLTableElement) {
  if (!grid || !origin) return [];
  const originRect = origin.getBoundingClientRect();

  return grid[0].map((el) => {
    const boxRect = el.getBoundingClientRect();
    return buildBox(boxRect, originRect, el);
  });
}

function generateRowsPosition(grid: HTMLTableCellElement[][], origin: HTMLTableElement) {
  if (!grid || !origin) return [];

  const originRect = origin.getBoundingClientRect();
  return grid.map((rows) => {
    const el = rows[0];
    const boxRect = el.getBoundingClientRect();
    return buildBox(boxRect, originRect, el);
  });
}

function computeGridPoint(
  tableRef: GridRefs['tableRef'],
  pageX: number,
  pageY: number
): [number, number] {
  const { left, top } = tableRef.getBoundingClientRect();
  const x = pageX - left;
  const y = pageY - top;

  return [x, y];
}

export function useCellAxis(ref?: GridRefs) {
  const { cellRef, tableRef } = ref ?? {};
  const { height } = useStoreContext();
  const columnsPosition = useMemo(() => {
    if (height === 0) {
      return [];
    }

    return generateColumnsPosition(cellRef, tableRef);
  }, [cellRef, tableRef, height]);


  const rowsPosition = useMemo(() => {
    if (height === 0) {
      return [];
    }

    return generateRowsPosition(cellRef, tableRef);
  }, [cellRef, tableRef, height]);

  const getCellAxis = (pageX: number, pageY: number) => {
    const [x, y] = computeGridPoint(tableRef, pageX, pageY);
    const col = columnsPosition.findIndex(
      (col) => x >= col.left && x <= col.left + col.element.offsetWidth
    );

    const row = rowsPosition.findIndex(
      (row) => y >= row.top && y <= row.top + row.element.offsetHeight
    );
    return {
      col,
      row,
    };
  };

  const getCellBox = useCallback(
    (pageX: number, pageY: number): Box | null => {
      const { col, row } = getCellAxis(pageX, pageY);
      if (col === -1 || row === -1) return null;
      const el = cellRef[row][col];

      return {
        col,
        row,
        element: el,
        rect: el.getBoundingClientRect(),
      };
    },
    [cellRef, getCellAxis]
  );

  if (!ref || !ref.tableRef) {
    return {};
  }

  return {
    getCellAxis,
    getCellBox,
  };
}
