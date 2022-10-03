import { createContext, VNode } from 'preact';
import { Day } from '../types';
import { useState } from 'preact/hooks';

type DayPerWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type CalendarContextType = {
  date: Date;
  height?: number;
  aspectRatio?: number;
  daysPerWeek?: DayPerWeek;
  startWeekOn?: Day;
  highlight: [];
  setHighlight: (highlight: []) => void;
};

export const CalendarOptionsContext = createContext<CalendarContextType>({
  date: new Date(),
  aspectRatio: 1.35,
  daysPerWeek: 7,
  startWeekOn: Day.Sunday,
  highlight: [],
  setHighlight: () => 0,
});

type CalendarProviderProps = {
  children: VNode;
} & Pick<CalendarContextType, 'date' | 'height' | 'startWeekOn' | 'aspectRatio' | 'daysPerWeek'>;

export function CalendarOptionsProvider(props: CalendarProviderProps): VNode {
  const {
    children,
    date,
    height,
    startWeekOn = Day.Sunday,
    aspectRatio = 1.35,
    daysPerWeek = 7,
  } = props;

  const [highlight, setHighlight] = useState<[]>([]);

  const value: CalendarContextType = {
    date,
    aspectRatio,
    height,
    daysPerWeek,
    startWeekOn,
    highlight,
    setHighlight,
  };
  return (
    <CalendarOptionsContext.Provider value={value}>{children}</CalendarOptionsContext.Provider>
  );
}
