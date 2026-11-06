import { prefersReducedMotion } from './gsap.js';

const KEY = 'milan-intro-seen';

/**
 * The opening sequence plays once per browser session, only when the
 * visitor lands on the home page, and never under reduced motion.
 * Deep links (/events?event=…) go straight to content.
 */
export function shouldPlayIntro() {
  if (typeof window === 'undefined' || prefersReducedMotion()) return false;
  if (window.location.pathname !== '/') return false;
  try {
    return window.sessionStorage.getItem(KEY) !== '1';
  } catch {
    return false;
  }
}

export function markIntroSeen() {
  try {
    window.sessionStorage.setItem(KEY, '1');
  } catch {
    /* storage unavailable — intro may replay next load, which is harmless */
  }
}
