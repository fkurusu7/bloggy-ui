import { useEffect, useRef } from 'react';

export function useOutsideClick(handler: () => void, listenCapturing: boolean = true) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(ev: MouseEvent) {
      if (ref.current && !ref.current.contains(ev.target as Node)) {
        handler();
      }
    }

    document.addEventListener('click', handleClick, listenCapturing);

    return () => {
      document.removeEventListener('click', handleClick, listenCapturing);
    };
  }, [handler, listenCapturing]);

  return ref;
}
