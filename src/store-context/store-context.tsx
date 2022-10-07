import { createContext, VNode } from 'preact';
import { Action, storeReducer } from './store-reducer';
import { useEffect, useReducer } from 'preact/hooks';
import { Day, StoreType } from '../types';

export const StoreContext = createContext<StoreType>(null);
export const StoreDispatchContext = createContext<(action: Action) => void>(null);

type Props = {
  children: VNode;
} & Pick<
  StoreType,
  'date' | 'height' | 'startWeekOn' | 'aspectRatio' | 'daysPerWeek' | 'showHighlights'
>;

export function StoreContextProvider(props: Props): VNode {
  const {
    children,
    date,
    height,
    startWeekOn = Day.Sunday,
    aspectRatio = 1.35,
    daysPerWeek = 7,
    showHighlights,
  } = props;

  const [state, dispatch] = useReducer<StoreType, Action>(storeReducer, {
    date,
    height,
    startWeekOn,
    aspectRatio,
    daysPerWeek,
    highlight: null,
    showHighlights,
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: new Date('2022-10-01'),
        end: new Date('2022-10-02'),
      },
      {
        id: '2',
        title: 'Event 2',
        start: new Date('2022-10-02'),
        end: new Date('2022-10-03'),
      },
      {
        id: '3',
        title: 'Event 3',
        start: new Date('2022-10-03'),
        end: new Date('2022-10-04'),
      },
      {
        id: '4',
        title: 'Event 4',
        start: new Date('2022-10-04'),
        end: new Date('2022-10-05'),
      },
      {
        id: '5',
        title: 'Event 5',
        start: new Date('2022-10-15'),
        end: new Date('2022-10-29'),
      },
    ],
  });

  useEffect(() => {
    dispatch({ type: 'SET_HEIGHT', payload: height });
  }, [height]);

  return (
    <StoreContext.Provider value={state}>
      <StoreDispatchContext.Provider value={dispatch}>{children}</StoreDispatchContext.Provider>
    </StoreContext.Provider>
  );
}
