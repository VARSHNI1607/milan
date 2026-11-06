import { useEffect, useState } from 'react';

/**
 * Tracks whether the page has scrolled past `offset`, and whether the user
 * is scrolling down (used to tuck the navbar away while reading).
 */
export function useScrollDirection(offset = 24) {
  const [state, setState] = useState({ scrolled: false, hidden: false });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    function update() {
      const y = window.scrollY;
      const scrolled = y > offset;
      const goingDown = y > lastY + 4;
      const goingUp = y < lastY - 4;
      setState((prev) => {
        const hidden = y > 320 ? (goingDown ? true : goingUp ? false : prev.hidden) : false;
        return prev.scrolled === scrolled && prev.hidden === hidden ? prev : { scrolled, hidden };
      });
      lastY = y;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);

  return state;
}
