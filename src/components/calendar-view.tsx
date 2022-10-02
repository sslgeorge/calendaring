import type { VNode } from 'preact';
import { View } from './styles';
import { useRef } from 'preact/hooks';
import { allowSelect, preventSelect } from 'src/libs/dom';

function CalendarView(): VNode {
  const ref = useRef(null);

  const handleMouseMove = (ev: MouseEvent) => {
    //
  };

  const handleMouseUp = (ev: MouseEvent) => {
    allowSelect();

    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
  };

  const handleMouseDown = (ev: MouseEvent) => {
    preventSelect();
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
  };

  return <View ref={ref} />;
}

export default CalendarView;
