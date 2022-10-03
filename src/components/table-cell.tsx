import { BgDisplay, CellFrame, CellHighlight, DayDisplay, EventsDisplay, Td } from './styles';
import { forwardRef } from 'react';

type Props = {
  row: number;
  column: number;
};

function TableCell(props: Props, ref) {
  const { row, column } = props;
  return (
    <Td ref={ref}>
      <CellFrame>
        <DayDisplay>
          A{' '}
          <sub>
            {row},{column}
          </sub>
        </DayDisplay>
        <EventsDisplay>dddd</EventsDisplay>
        <BgDisplay>
          <CellHighlight />
        </BgDisplay>
      </CellFrame>
    </Td>
  );
}

export default forwardRef(TableCell);
