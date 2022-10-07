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
  showHighlights?: boolean;
};

function TableView(props: Props, ref): VNode {
  const { grid, onMouseDown, highlightGrid, showHighlights } = props;
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

  const renderWeek = (week: Date[], weekIndex) => {
    return (
      <Tr key={weekIndex}>
        {week.map((date, cellColumn) => {
          return (
            <TableCell
              key={cellColumn}
              ref={(ref) => createCellRef(weekIndex, cellColumn, ref)}
              row={weekIndex}
              column={cellColumn}
              showHighlights={showHighlights}
              highlight={highlightGrid?.[weekIndex]?.[cellColumn]?.highlight}
              date={date}
            />
          );
        })}
      </Tr>
    );
  };

  return (
    <Table ref={tableRef}>
      <Tbody onMouseDown={onMouseDown} ref={tbodyRef}>
        {grid.map(renderWeek)}
      </Tbody>
    </Table>
  );
}

export default forwardRef(TableView);
