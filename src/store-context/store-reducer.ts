import { Highlight, StoreType } from '../types';

export type Action =
  | { type: 'SET_HEIGHT'; payload: number }
  | { type: 'HIGHLIGHT_CELL'; payload: Highlight }
  | { type: 'UNHIGHLIGHT_CELL' }
  | { type: 'CHANGE_DATE' };

export function storeReducer(state: StoreType, action: Action) {
  if (action.type === 'UNHIGHLIGHT_CELL') {
    return {
      ...state,
      highlight: null,
    };
  }

  if (action.type === 'HIGHLIGHT_CELL') {
    return {
      ...state,
      highlight: action.payload,
    };
  }

  if (action.type === 'SET_HEIGHT') {
    return {
      ...state,
      height: action.payload,
    }
  }

  // console.group('Action');
  // console.log('Action: ', action);
  // console.log('State:', state);
  // console.groupEnd();
  return state;
}
