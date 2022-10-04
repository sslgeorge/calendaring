import { createContext, VNode } from 'preact';
import { Action, storeReducer } from './store-reducer';
import { useEffect, useReducer } from 'preact/hooks';
import { Day, StoreType } from '../types';

export const StoreContext = createContext<StoreType>(null);
export const StoreDispatchContext = createContext<(action: Action) => void>(null);

type Props = {
  children: VNode;
} & Pick<StoreType, 'date' | 'height' | 'startWeekOn' | 'aspectRatio' | 'daysPerWeek'>;

export function StoreContextProvider(props: Props): VNode {
  const {
    children,
    date,
    height,
    startWeekOn = Day.Sunday,
    aspectRatio = 1.35,
    daysPerWeek = 7,
  } = props;

  const [state, dispatch] = useReducer<StoreType, Action>(storeReducer, {
    date,
    height,
    startWeekOn,
    aspectRatio,
    daysPerWeek,
    highlight: null,
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
