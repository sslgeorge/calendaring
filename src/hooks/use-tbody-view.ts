import { useEffect, useRef } from 'preact/hooks';

export function useTbodyView() {
  const tbodyRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    const { offsetWidth, offsetHeight, offsetLeft, offsetTop, offsetParent } = tbodyRef.current;
  }, []);

  return {
    ref: tbodyRef,
  };
}
