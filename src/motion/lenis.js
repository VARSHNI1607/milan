/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger and
 * Lenis always agree on the scroll position (one rAF loop, not two).
 *
 * - Desktop wheel only: touch scrolling stays native (syncTouch: false).
 * - Not started under prefers-reduced-motion.
 * - `stopScroll()/startScroll()` let the modal and mobile menu freeze it.
 * - `scrollToTarget()` is the one scrolling helper the app uses, so hash
 *   links work with or without Lenis.
 */
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap.js';

let lenis = null;
let tick = null;
let lockCount = 0;

export function initLenis() {
  if (lenis || typeof window === 'undefined' || prefersReducedMotion()) return lenis;
  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false,
    autoRaf: false,
  });
  lenis.on('scroll', ScrollTrigger.update);
  tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  if (lockCount > 0) lenis.stop();
  return lenis;
}

export function destroyLenis() {
  if (!lenis) return;
  gsap.ticker.remove(tick);
  lenis.destroy();
  lenis = null;
  tick = null;
}

export function getLenis() {
  return lenis;
}

/** Reference-counted, so a modal opened from the mobile menu can't unlock early. */
export function stopScroll() {
  lockCount += 1;
  lenis?.stop();
}

export function startScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) lenis?.start();
}

export function scrollToTarget(target, { immediate = false, offset } = {}) {
  const navOffset =
    offset ?? -(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68) - 16;
  if (lenis) {
    lenis.scrollTo(target, { immediate, offset: typeof target === 'number' ? 0 : navOffset, force: true });
    return;
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' });
  } else {
    target.scrollIntoView({ behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  }
}
