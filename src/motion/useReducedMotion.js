import { useSyncExternalStore } from 'react';
import { MQ } from './gsap.js';

function subscribe(callback) {
  const mq = window.matchMedia(MQ.reduce);
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

/** Live `prefers-reduced-motion` value; re-renders only when it changes. */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MQ.reduce).matches,
    () => false,
  );
}
