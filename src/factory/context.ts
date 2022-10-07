import { createContext, createElement } from 'preact';
import { ComponentWithChildren } from '../commons/components';
import { useContext } from 'preact/hooks';

export function contextFactory<T>(value: T) {
  const context = createContext<T>(null);
  const Provider = ({ children }: ComponentWithChildren) =>
    createElement(context.Provider, {
      value,
      children,
    });

  const Consumer = context.Consumer;

  const useAppContext = () => useContext(context);

  return { Provider, Consumer, Context: context, useAppContext };
}
