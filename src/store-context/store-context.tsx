import { createContext, VNode } from 'preact';
import { Action, storeReducer } from './store-reducer';
import { useReducer } from 'preact/hooks';
import { StoreType } from '../types';

export const StoreContext = createContext<StoreType>(null);
export const StoreDispatchContext = createContext(null);

type Props = {
  children: VNode;
} & Pick<StoreType, 'date' | 'height' | 'startWeekOn' | 'aspectRatio' | 'daysPerWeek'>;

export function StoreContextProvider(props: Props): VNode {
  const { children, date, height, startWeekOn, aspectRatio, daysPerWeek } = props;
  const [state, dispatch] = useReducer<StoreType, Action>(storeReducer, {
    date,
    height,
    startWeekOn,
    aspectRatio,
    daysPerWeek,
    highlight: [],
  });
  return (
    <StoreContext.Provider value={state}>
      <StoreDispatchContext.Provider value={dispatch}>{children}</StoreDispatchContext.Provider>
    </StoreContext.Provider>
  );
}
