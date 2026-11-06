import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap, prefersReducedMotion } from '../../motion/gsap.js';
import Sunburst from './Sunburst.jsx';
import '../../styles/components/page-transition.css';

const ROUTE_LABELS = { '/': 'Home', '/events': 'Events', '/register': 'Register' };

/**
 * Branded route transition. The new page is rendered immediately — this
 * overlay only *reveals* it: panels in indigo and vermilion wipe upward
 * past a spinning sunburst (~0.75s), with pointer-events off throughout so
 * the page is usable straight away. Only pathname changes trigger it
 * (not filters, the event modal or same-page hash links).
 */
export default function PageTransition() {
  const { pathname } = useLocation();
  const rootRef = useRef(null);
  const first = useRef(true);
  const prev = useRef(pathname);

  // Layout effect: the overlay is in place before the new page paints.
  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return undefined;
    }
    if (prev.current === pathname) return undefined;
    prev.current = pathname;
    if (prefersReducedMotion()) return undefined;

    const root = rootRef.current;
    const q = gsap.utils.selector(root);
    root.querySelector('.page-transition__label').textContent = ROUTE_LABELS[pathname] ?? '';
    const tl = gsap.timeline({ defaults: { ease: 'power4.inOut' }, onComplete: () => gsap.set(root, { display: 'none' }) });
    tl.set(root, { display: 'block' })
      .set(q('.page-transition__panel'), { yPercent: 0 })
      .set(q('.page-transition__centre'), { autoAlpha: 1, y: 0 })
      .fromTo(q('.page-transition__centre svg'), { rotate: -90, scale: 0.6 }, { rotate: 90, scale: 1, duration: 0.45, ease: 'power3.out' }, 0)
      .to(q('.page-transition__centre'), { autoAlpha: 0, y: -30, duration: 0.25, ease: 'power2.in' }, 0.3)
      .to(q('.page-transition__panel--indigo'), { yPercent: -100, duration: 0.55 }, 0.3)
      .to(q('.page-transition__panel--vermilion'), { yPercent: -100, duration: 0.55 }, 0.38);
    return () => tl.kill();
  }, [pathname]);

  return (
    <div className="page-transition" ref={rootRef} aria-hidden="true">
      <div className="page-transition__panel page-transition__panel--vermilion" />
      <div className="page-transition__panel page-transition__panel--indigo">
        <div className="page-transition__centre">
          <Sunburst centre="var(--c-parchment)" />
          <span className="page-transition__label" />
        </div>
      </div>
    </div>
  );
}
