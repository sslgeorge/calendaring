import styled from 'styled-components';

interface CalendarProps {
  $height?: number;
  $paddingBottom?: number;
}

export const CalendarContainer = styled.div<CalendarProps>`
  height: ${({ $height }) => $height}px;
  padding-bottom: ${({ $paddingBottom }) => $paddingBottom};
`;

export const View = styled.div`
  height: 100%;
  width: 100%;
`;
