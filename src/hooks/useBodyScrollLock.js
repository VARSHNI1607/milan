import { useEffect } from 'react';
import { stopScroll, startScroll } from '../motion/lenis.js';

/** Locks page scroll while `locked` is true, without layout shift. Also pauses Lenis. */
export function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const { body, documentElement } = document;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    stopScroll();
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
      startScroll();
    };
  }, [locked]);
}
