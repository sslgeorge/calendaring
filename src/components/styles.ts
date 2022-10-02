import styled from 'styled-components';

interface CalendarProps {
  $height?: number;
  $paddingBottom?: number;
}

export const CalendarContainer = styled.div<CalendarProps>`
  height: ${({ $height }) => $height}px;
  padding-bottom: ${({ $paddingBottom }) => $paddingBottom};
`;
