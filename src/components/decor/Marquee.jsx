import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MQ } from '../../motion/gsap.js';
import '../../styles/components/marquee.css';

/**
 * Infinite ticker. The list is rendered twice and moved by -50% so the
 * loop is seamless; the duplicate is hidden from assistive tech.
 *
 * Motion: a GSAP loop whose speed reacts to scroll velocity (scroll fast →
 * the band races and leans), pauses on hover and while off-screen, and
 * doesn't run at all under reduced motion.
 */
export default function Marquee({ items, tone = 'indigo', speed = 40 }) {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const track = root.querySelector('.marquee__track');
      const lean = root.querySelector('.marquee__lean');
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const loop = gsap.to(track, { xPercent: -50, duration: speed, ease: 'none', repeat: -1 });
        const skewTo = gsap.quickTo(lean, 'skewX', { duration: 0.5, ease: 'power3' });
        let hovered = false;
        let settle;

        const st = ScrollTrigger.create({
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => (self.isActive && !hovered ? loop.play() : loop.pause()),
          onUpdate: (self) => {
            const v = self.getVelocity();
            const boost = 1 + Math.min(Math.abs(v) / 300, 5);
            gsap.to(loop, { timeScale: boost, duration: 0.2, overwrite: true });
            skewTo(gsap.utils.clamp(-8, 8, -v / 250));
            clearTimeout(settle);
            settle = setTimeout(() => {
              gsap.to(loop, { timeScale: 1, duration: 0.8, overwrite: true });
              skewTo(0);
            }, 120);
          },
        });

        const onEnter = () => {
          hovered = true;
          loop.pause();
        };
        const onLeave = () => {
          hovered = false;
          if (st.isActive) loop.play();
        };
        root.addEventListener('pointerenter', onEnter);
        root.addEventListener('pointerleave', onLeave);
        return () => {
          clearTimeout(settle);
          root.removeEventListener('pointerenter', onEnter);
          root.removeEventListener('pointerleave', onLeave);
        };
      });
    },
    { scope: rootRef, dependencies: [speed] },
  );

  const content = (hidden) => (
    <ul className="marquee__group" role="list" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="marquee__item">
          <span>{item}</span>
          <svg viewBox="-10 -10 20 20" width="18" height="18" aria-hidden="true" focusable="false">
            <path d="M0-9 3-3 9 0 3 3 0 9-3 3-9 0-3-3Z" fill="currentColor" />
          </svg>
        </li>
      ))}
    </ul>
  );

  return (
    <div ref={rootRef} className={`marquee marquee--${tone}`}>
      <div className="marquee__lean">
        <div className="marquee__track">
          {content(false)}
          {content(true)}
        </div>
      </div>
    </div>
  );
}
