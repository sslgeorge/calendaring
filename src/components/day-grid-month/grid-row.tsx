import React from 'react';
import { Tr } from '@src/components/styles';
import { GridCell } from '@src/components/day-grid-month/grid-cell';

type Props = {
  week: Date[];
};

export function GridRow(props: Props) {
  const { week } = props;

  return (
    <Tr>
      {week.map((date, dateIndex) => (
        <GridCell key={dateIndex} date={date} />
      ))}
    </Tr>
  );
}
