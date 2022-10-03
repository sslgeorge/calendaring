import { VNode } from 'preact';
import { Table, Tbody, Tr } from './styles';
import { useImperativeHandle, useRef } from 'preact/hooks';
import { forwardRef } from 'react';
import TableCell from './table-cell';
import { CellHighlightType } from '../types';

type Props = {
  grid: Date[][];
  onMouseDown?: (e: MouseEvent) => void;
  onClick?: (e: MouseEvent) => void;
  highlightGrid?: CellHighlightType[][];
};

function TableView(props: Props, ref): VNode {
  const { grid, onMouseDown, highlightGrid } = props;
  const tbodyRef = useRef<HTMLTableSectionElement>();
  const tableRef = useRef<HTMLTableElement>();
  const cellRef = useRef<HTMLTableCellElement[][]>([]);

  useImperativeHandle(ref, () => ({
    tbodyRef: tbodyRef.current,
    tableRef: tableRef.current,
    cellRef: cellRef.current,
  }));

  const createCellRef = (row: number, column: number, ref: HTMLTableCellElement) => {
    if (!cellRef.current[row]) {
      cellRef.current[row] = [];
    }
    cellRef.current[row][column] = ref;
  };

  const renderRow = (row: Date[], cellRow) => {
    return (
      <Tr key={cellRow}>
        {row.map((cell, cellColumn) => {
          return (
            <TableCell
              key={cellColumn}
              ref={(ref) => createCellRef(cellRow, cellColumn, ref)}
              row={cellRow}
              column={cellColumn}
              highlight={highlightGrid?.[cellRow]?.[cellColumn]?.highlight}
            />
          );
        })}
      </Tr>
    );
  };

  return (
    <Table ref={tableRef}>
      <Tbody onMouseDown={onMouseDown} ref={tbodyRef}>
        {grid.map(renderRow)}
      </Tbody>
    </Table>
  );
}

export default forwardRef(TableView);
