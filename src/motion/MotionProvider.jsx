import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { initLenis, destroyLenis } from './lenis.js';
import { ScrollTrigger } from './gsap.js';
import { useReducedMotion } from './useReducedMotion.js';

/**
 * App-wide motion state:
 *  - starts/stops Lenis with the reduced-motion preference,
 *  - tracks whether the opening sequence has finished (`introDone`) so the
 *    hero can begin its entrance only once the intro is out of the way,
 *  - refreshes ScrollTrigger once web fonts settle (text height changes
 *    would otherwise put trigger positions out of date).
 */
const MotionContext = createContext({ introDone: true, finishIntro: () => {}, reduced: false });

export function MotionProvider({ children, initialIntroDone = true }) {
  const reduced = useReducedMotion();
  const [introDone, setIntroDone] = useState(initialIntroDone);
  const finishIntro = useCallback(() => setIntroDone(true), []);

  useEffect(() => {
    if (reduced) {
      destroyLenis();
      return undefined;
    }
    initLenis();
    return () => destroyLenis();
  }, [reduced]);

  useEffect(() => {
    let cancelled = false;
    document.fonts?.ready.then(() => !cancelled && ScrollTrigger.refresh());
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => ({ introDone, finishIntro, reduced }), [introDone, finishIntro, reduced]);
  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotion() {
  return useContext(MotionContext);
}
