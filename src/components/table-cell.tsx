import { BgDisplay, CellFrame, CellHighlight, DayDisplay, EventsDisplay, Td } from './styles';
import { forwardRef } from 'react';

type Props = {
  row: number;
  column: number;
  highlight?: boolean;
};

function TableCell(props: Props, ref) {
  const { row, column, highlight } = props;
  return (
    <Td ref={ref}>
      <CellFrame>
        <DayDisplay>
          A{' '}
          <sub>
            {row},{column}
          </sub>
        </DayDisplay>
        <EventsDisplay></EventsDisplay>
        <BgDisplay>
          <CellHighlight show={highlight} />
        </BgDisplay>
      </CellFrame>
    </Td>
  );
}

export default forwardRef(TableCell);
