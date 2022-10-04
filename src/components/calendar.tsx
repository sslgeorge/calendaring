import type { VNode } from 'preact';
import { CalendarContainer } from './styles';
import { useCallback, useState } from 'preact/compat';
import CalendarView from './calendar-view';
import { Day } from '../types';
import { StoreContextProvider } from '../store-context';
import { useEffect, useRef } from 'preact/hooks';

type Props = {
  date: string | Date;
  aspectRatio?: number;
};

function Calendar(props: Props): VNode {
  const { date, aspectRatio = 1.35 } = props;
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

  console.log(paddingBottom, 'paddingBottompaddingBottom');
  return (
    <StoreContextProvider date={new Date(date)} height={height} startWeekOn={Day.Sunday}>
      <CalendarContainer
        ref={ref}
        $height={height}
        $paddingBottom={`${paddingBottom}%`}
        minHeight={paddingBottom}>
        <CalendarView />
      </CalendarContainer>
    </StoreContextProvider>
  );
}

export default Calendar;
