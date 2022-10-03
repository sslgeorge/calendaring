import type { VNode } from 'preact';
import { View } from './styles';
import TableView from './table-view';
import { useRef } from 'preact/hooks';
import { allowSelect, preventSelect } from '../utils/dom';
import { GridRefs } from '../types';
import { useTable } from '../hooks/use-table';
import { useGridGenerator } from '../hooks/use-grid-generator';

function CalendarView(): VNode {
  const refs = useRef<GridRefs>(null);
  const ref = useRef(null);
  const { emitter } = useTable(refs.current);
  const { grid } = useGridGenerator();

  const handleMouseMove = (ev: MouseEvent) => {
    emitter.emit('pointermove', ev);
  };

  const handleMouseUp = (ev: MouseEvent) => {
    allowSelect();

    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
    emitter.emit('pointerup', ev);
  };

  const handleMouseDown = (ev: MouseEvent) => {
    preventSelect();
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    emitter.emit('pointerdown', ev);
  };

  return (
    <View ref={ref}>
      <TableView
        grid={grid}
        ref={refs}
        onMouseDown={handleMouseDown}
      />
    </View>
  );
}

export default CalendarView;
