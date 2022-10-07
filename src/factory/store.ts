import { contextFactory } from 'src/factory/context';
import { useContext } from 'preact/hooks';

export function createStoreFactory<T>(options: T) {
  const context = contextFactory({});
  const { Provider, Consumer, Context } = context;
  const useStoreContext = () => useContext(Context);

  return {
    Provider,
    Consumer,
    Context,
    useStoreContext,
  };
}
