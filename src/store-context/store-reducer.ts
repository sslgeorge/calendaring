import { StoreType } from '../types';

export type Action = { type: string };

export function storeReducer(state: StoreType, action: Action) {
  return state;
}
