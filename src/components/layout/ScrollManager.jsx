import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTarget } from '../../motion/lenis.js';
import { ScrollTrigger } from '../../motion/gsap.js';

/**
 * Route-level scroll + focus handling for a single-page app:
 * - new page → scroll to top and move focus to <main> (screen readers
 *   announce the new page instead of staying on the old link),
 * - "#hash" links → smooth-scroll to the section (works across routes),
 * - search-param changes (filters, modal) → leave scroll alone.
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const previousPath = useRef(pathname);

  useEffect(() => {
    const pathChanged = previousPath.current !== pathname;
    previousPath.current = pathname;

    if (hash) {
      // Wait a frame so the target section is rendered after navigation.
      const id = decodeURIComponent(hash.slice(1));
      const raf = requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (target) {
          if (pathChanged) ScrollTrigger.refresh();
          scrollToTarget(target, { immediate: pathChanged });
          target.focus?.({ preventScroll: true });
        }
      });
      return () => cancelAnimationFrame(raf);
    }

    if (pathChanged) {
      scrollToTarget(0, { immediate: true });
      document.getElementById('main')?.focus({ preventScroll: true });
    }
    return undefined;
  }, [pathname, hash, key]);

  return null;
}
