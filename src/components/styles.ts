import styled from '@emotion/styled';

type CalendarProps = {
  $height?: number;
  $paddingBottom?: number;
  $minHeight?: number;
};

export const CalendarContainer = styled.div<CalendarProps>`
  height: ${({ $height }) => $height}px;
  padding-bottom: ${({ $paddingBottom }) => $paddingBottom};
  min-height: ${({ $minHeight }) => $minHeight}px;
`;

export const View = styled.div`
  height: 100%;
  width: 100%;
`;

export const Table = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  font-size: 1em;
`;

export const Tbody = styled.tbody`
  width: 100%;
`;

export const Thead = styled.thead`
  width: 100%;
`;

export const Tr = styled.tr``;

export const Th = styled.th`
  font-weight: 500;
  line-height: 1.5rem;
  color: rgba(0, 0, 0, 0.87);
  display: table-cell;
  vertical-align: inherit;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  text-align: left;
  text-align: right;
`;

export const Td = styled.td`
  font-weight: 500;
  line-height: 1.5rem;
  color: rgba(0, 0, 0, 0.87);
  display: table-cell;
  vertical-align: inherit;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  text-align: left;
  text-align: right;
  vertical-align: top;
  padding: 0;
  margin: 0;
`;

export const CellFrame = styled.div`
  position: relative;
  min-height: 100%;
`;

interface CellHighlightProps {
  show: boolean;
}

export const CellHighlight = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(188, 232, 241, 0.3);
  ${({ show }: CellHighlightProps) => !show && 'display: none;'}
`;

export const DayDisplay = styled.div``;

export const EventsDisplay = styled.div``;

export const BgDisplay = styled.div``;
