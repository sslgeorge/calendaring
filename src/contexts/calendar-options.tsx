import { createContext, VNode } from 'preact';
import { Day } from '../types';

type DayPerWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type CalendarContextType = {
  date: Date;
  height?: number;
  aspectRatio?: number;
  daysPerWeek?: DayPerWeek;
  startWeekOn?: Day;
};

export const CalendarOptionsContext = createContext<CalendarContextType>({
  date: new Date(),
  aspectRatio: 1.35,
  daysPerWeek: 7,
  startWeekOn: Day.Sunday,
});

type CalendarProviderProps = {
  children: VNode;
} & CalendarContextType;

export function CalendarOptionsProvider(props: CalendarProviderProps): VNode {
  const {
    children,
    date,
    height,
    startWeekOn = Day.Sunday,
    aspectRatio = 1.35,
    daysPerWeek = 7,
  } = props;

  const value: CalendarContextType = {
    date,
    aspectRatio,
    height,
    daysPerWeek,
    startWeekOn,
  };
  return (
    <CalendarOptionsContext.Provider value={value}>
      {children}
    </CalendarOptionsContext.Provider>
  );
}
