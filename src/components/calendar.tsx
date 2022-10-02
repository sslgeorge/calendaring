import type { VNode } from 'preact';
import { CalendarContainer } from './styles';
import { useCallback, useEffect, useRef, useState } from 'preact/compat';

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
  let paddingBottom = '';

  if (availableWidth !== null) {
    height = availableWidth / aspectRatio;
  } else {
    paddingBottom = `${(1 / aspectRatio) * 100}%`;
  }

  if (availableWidth !== null) {
    height = availableWidth / aspectRatio;
  } else {
    paddingBottom = `${(1 / aspectRatio) * 100}%`;
  }

  return (
    <CalendarContainer
      ref={ref}
      $height={height}
      $paddingBottom={paddingBottom}
    />
  );
}

export default Calendar;
