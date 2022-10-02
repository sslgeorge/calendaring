import { GridRefs } from '../types';

function buildBox(boxRect: DOMRect, originRect: DOMRect, el: HTMLElement) {
  return {
    left: boxRect.left - originRect.left,
    top: boxRect.top - originRect.top,
    element: el,
  };
}

function generateColumnsPosition(
  grid: HTMLTableCellElement[][],
  origin: HTMLTableElement,
) {
  const originRect = origin.getBoundingClientRect();

  return grid[0].map((el, index) => {
    const boxRect = el.getBoundingClientRect();
    return buildBox(boxRect, originRect, el);
  });
}

function generateRowsPosition(
  grid: HTMLTableCellElement[][],
  origin: HTMLTableElement,
) {
  const originRect = origin.getBoundingClientRect();
  return grid.map((rows) => {
    const el = rows[0];
    const boxRect = el.getBoundingClientRect();
    return buildBox(boxRect, originRect, el);
  });
}

export function usePositions(ref?: GridRefs) {
  if (!ref || !ref.tableRef) {
    return {};
  }

  const { cellRef, tableRef } = ref;

  const columnsPosition = generateColumnsPosition(cellRef, tableRef);
  const rowsPosition = generateRowsPosition(cellRef, tableRef);

  const getCellAxis = (pageX: number, pageY: number) => {
    const col = columnsPosition.findIndex(
      (col) => pageX >= col.left && pageX <= col.left + col.element.offsetWidth,
    );

    const row = rowsPosition.findIndex(
      (row) => pageY >= row.top && pageY <= row.top + row.element.offsetHeight,
    );
    return { col, row };
  };

  return {
    columns: columnsPosition,
    rows: rowsPosition,
    getCellAxis,
  };
}
