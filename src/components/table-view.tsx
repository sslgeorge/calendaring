import { VNode } from 'preact';
import { Table, Tbody, Td, Tr } from './styles';
import { useImperativeHandle, useRef } from 'preact/hooks';
import { forwardRef } from 'react';

type Props = {
  grid: Date[][];
  onMouseDown?: (e: MouseEvent) => void;
  onClick?: (e: MouseEvent) => void;
};

function TableView(props: Props, ref): VNode {
  const { grid, onMouseDown } = props;
  const tbodyRef = useRef<HTMLTableSectionElement>();
  const tableRef = useRef<HTMLTableElement>();
  const cellRef = useRef<HTMLTableCellElement[][]>([]);

  useImperativeHandle(ref, () => ({
    tbodyRef: tbodyRef.current,
    tableRef: tableRef.current,
    cellRef: cellRef.current,
  }));

  const createCellRef = (
    row: number,
    column: number,
    ref: HTMLTableCellElement,
  ) => {
    if (!cellRef.current[row]) {
      cellRef.current[row] = [];
    }
    cellRef.current[row][column] = ref;
  };

  const renderRow = (row: Date[], cellRow) => {
    return (
      <Tr>
        {row.map((cell, cellColumn) => {
          return (
            <Td
              key={cellColumn}
              ref={(ref) => createCellRef(cellRow, cellColumn, ref)}
            >
              A{' '}
              <sub>
                {cellRow},{cellColumn}
              </sub>
            </Td>
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
