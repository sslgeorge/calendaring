import styled from 'styled-components';
import Calendar from './components/calendar';
import type { VNode } from 'preact';

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 80px auto;
  border: 1px dashed rgba(0, 0, 0, 0.2);
  position: relative;

  &::before {
    content: 'WIDGET PREVIEW';
    position: absolute;
    display: block;
    top: -18px;
    font-size: 11px;
    color: rgba(0, 0, 0, 0.5);
  }
`;

export function Preview(): VNode {
  return (
    <Container>
      <Calendar />
    </Container>
  );
}
