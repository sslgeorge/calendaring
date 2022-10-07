import { BgDisplay, CellFrame, CellHighlight, DayDisplay, EventsDisplay, Td } from './styles';
import { forwardRef } from 'react';
import { format } from 'date-fns';

type Props = {
  row: number;
  column: number;
  highlight?: boolean;
  showHighlights?: boolean;
  date: Date;
};

function TableCell(props: Props, ref) {
  const { highlight, showHighlights, date } = props;
  return (
    <Td ref={ref}>
      <CellFrame>
        <DayDisplay>{format(date, 'd')}</DayDisplay>
        <EventsDisplay />
        <BgDisplay>
          <CellHighlight show={showHighlights && highlight} />
        </BgDisplay>
      </CellFrame>
    </Td>
  );
}

export default forwardRef(TableCell);
