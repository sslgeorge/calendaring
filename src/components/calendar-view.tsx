import type { VNode } from 'preact';
import { View } from './styles';
import TableView from './table-view';
import { useRef } from 'preact/hooks';
import { allowSelect, preventSelect } from '../utils/dom';
import { GridRefs } from '../types';
import { useTable } from '../hooks/use-table';
import { useStoreContext } from '../store-context';
import { useHighlightGrid } from '../hooks/use-highlight-grid';

function CalendarView(): VNode {
  const refs = useRef<GridRefs>(null);
  const ref = useRef(null);
  const { emitter, monthCalendarGrid } = useTable(refs.current);
  const { highlightGrid } = useHighlightGrid();
  const { showHighlights } = useStoreContext();

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
        grid={monthCalendarGrid}
        ref={refs}
        onMouseDown={handleMouseDown}
        highlightGrid={highlightGrid}
        showHighlights={showHighlights}
      />
    </View>
  );
}

export default CalendarView;
