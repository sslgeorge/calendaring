import type { VNode } from 'preact';
import { CalendarContainer } from './styles';
import { useCallback, useState } from 'preact/compat';
import { Day } from '../types';
import { StoreContextProvider } from '../store-context';
import { useEffect, useRef } from 'preact/hooks';
import { DayGridMonth } from '@src/components/day-grid-month/day-grid-month';

type Props = {
  date: string | Date;
  aspectRatio?: number;
  showHighlights?: boolean;
};

function Calendar(props: Props): VNode {
  const { date, aspectRatio = 1.35, showHighlights = true } = props;
  const [availableWidth, setAvailableWidth] = useState<number>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleWindowResize = useCallback(() => {
    if (!ref || !ref.current) {
      return;
    }

    setAvailableWidth(ref.current.offsetWidth);
  }, []);

  useEffect(handleWindowResize, [handleWindowResize]);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  let height = 0;
  let paddingBottom = 0;

  if (availableWidth !== null) {
    height = availableWidth / aspectRatio;
  } else {
    paddingBottom = (1 / aspectRatio) * 100;
  }

  return (
    <StoreContextProvider
      date={new Date(date)}
      height={height}
      startWeekOn={Day.Sunday}
      showHighlights={showHighlights}>
      <CalendarContainer
        ref={ref}
        $height={height}
        $paddingBottom={`${paddingBottom}%`}
        minHeight={paddingBottom}>
        <DayGridMonth />
        {/*{height > 0 && <CalendarView />}*/}
      </CalendarContainer>
    </StoreContextProvider>
  );
}

export default Calendar;
