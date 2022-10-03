import { useContext } from 'preact/hooks';
import { StoreContext, StoreDispatchContext } from './store-context';

export const useStoreContext = () => {
  const store = useContext(StoreContext);

  if (store === undefined) {
    throw new Error('useStoreContext must be used within a StoreContextProvider');
  }

  return store;
};

export const useStoreDispatch = () => {
  const dispatch = useContext(StoreDispatchContext);

  if (dispatch === undefined) {
    throw new Error('useStoreDispatch must be used within a StoreContextProvider');
  }

  return dispatch;
};
