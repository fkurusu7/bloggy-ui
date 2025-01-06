import { useEffect, useRef } from 'react';

export function useOutsideClick(handler: any, listenCapturing: boolean = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(ev: any) {
      if (ref.current && !ref.current.contains(ev.target)) {
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
