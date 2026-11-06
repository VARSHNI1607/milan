/**
 * Single place where GSAP plugins are registered. Every component imports
 * gsap/ScrollTrigger from here so registration happens exactly once.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);
gsap.defaults({ ease: 'power3.out', duration: 0.8 });
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, useGSAP };

/*
 * House rule: animate `opacity` (not `autoAlpha`) on anything that contains
 * links, buttons or text a screen reader should reach. autoAlpha toggles
 * `visibility: hidden`, which removes elements from the tab order while
 * they wait to be revealed.
 */

/** Matches the CSS breakpoints and capability queries used across the motion layer. */
export const MQ = {
  reduce: '(prefers-reduced-motion: reduce)',
  motion: '(prefers-reduced-motion: no-preference)',
  finePointer: '(hover: hover) and (pointer: fine)',
  desktop: '(min-width: 1024px)',
};

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia(MQ.reduce).matches;
}

export function hasFinePointer() {
  return typeof window !== 'undefined' && window.matchMedia(MQ.finePointer).matches;
}
