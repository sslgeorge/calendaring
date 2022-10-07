import React from 'react';
import { Td } from '@src/components/styles';

type Props = {
  date: Date;
};

export function GridCell(props: Props) {
  const { date } = props;
  return <Td>{date.getDate()}</Td>;
}
