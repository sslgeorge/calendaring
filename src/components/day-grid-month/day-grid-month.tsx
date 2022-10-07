import { Table, Tbody } from '@src/components/styles';
import { useDayGridMonth } from '@src/components/day-grid-month/use-day-grid-month';
import { GridRow } from '@src/components/day-grid-month/grid-row';

export function DayGridMonth() {
  const { dateMatrix } = useDayGridMonth();

  return (
    <Table>
      <Tbody>
        {dateMatrix.map((week, weekIndex) => (
          <GridRow key={weekIndex} week={week} />
        ))}
      </Tbody>
    </Table>
  );
}
