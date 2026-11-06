import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MQ } from '../../motion/gsap.js';
import { useMotion } from '../../motion/MotionProvider.jsx';

/**
 * All hero motion in one place:
 *  1. Entrance — built paused on mount (so first paint already shows the
 *     start state), played once the opening sequence hands over.
 *  2. Cursor parallax — layers with `data-depth` follow the pointer via
 *     gsap.quickTo (no React state, no re-renders). Fine pointers only.
 *  3. Scroll-out — scrubbed: letters spread and lift, posters drift at
 *     different speeds. This is also the touch-device depth effect.
 * gsap.matchMedia reverts everything automatically for reduced motion and
 * on unmount.
 */
export function useHeroMotion(rootRef) {
  const { introDone } = useMotion();
  const entranceRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        // 1. Entrance
        const tl = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } });
        tl.from(q('.hero__letter'), { yPercent: 70, rotate: 6, autoAlpha: 0, duration: 1, stagger: 0.07 })
          .from(q('.hero__motion'), { x: -30, opacity: 0, duration: 0.9 }, 0.35)
          .from(q('.hero__eyebrow, .hero__tagline, .hero__intro, .hero__ctas, .hero__ticket'), {
            y: 24,
            opacity: 0,
            duration: 0.8,
            stagger: 0.08,
          }, 0.45)
          .from(q('.hero__rangoli-wrap'), { scale: 0.55, autoAlpha: 0, duration: 1.6, ease: 'expo.out' }, 0.1)
          .from(q('.hero__poster-card'), {
            y: 90,
            scale: 0.85,
            autoAlpha: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: 'back.out(1.4)',
          }, 0.3);
        entranceRef.current = tl;

        // 3. Scroll-out (all devices)
        const scrub = { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.6 };
        gsap.to(q('.hero__letter'), { x: (i) => (i - 2) * 28, y: -50, ease: 'none', scrollTrigger: scrub });
        q('.hero__poster').forEach((el) => {
          gsap.to(el, { yPercent: Number(el.dataset.drift || 0), ease: 'none', scrollTrigger: { ...scrub } });
        });
        gsap.to(q('.hero__collage'), { y: -40, ease: 'none', scrollTrigger: { ...scrub } });

        return () => {
          entranceRef.current = null;
        };
      });

      // 2. Cursor parallax (fine pointers + motion allowed)
      mm.add(`${MQ.motion} and ${MQ.finePointer}`, () => {
        const layers = q('[data-depth]').map((el) => ({
          depth: Number(el.dataset.depth),
          x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3' }),
          y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3' }),
          ry: el.classList.contains('hero__poster') ? gsap.quickTo(el, 'rotationY', { duration: 1, ease: 'power3' }) : null,
          rx: el.classList.contains('hero__poster') ? gsap.quickTo(el, 'rotationX', { duration: 1, ease: 'power3' }) : null,
        }));

        let frame = 0;
        const onMove = (e) => {
          if (frame) return;
          frame = requestAnimationFrame(() => {
            frame = 0;
            const rect = root.getBoundingClientRect();
            const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 … 1
            const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
            layers.forEach((l) => {
              l.x(nx * 22 * l.depth);
              l.y(ny * 16 * l.depth);
              l.ry?.(nx * 9);
              l.rx?.(-ny * 7);
            });
          });
        };
        const onLeave = () => layers.forEach((l) => [l.x, l.y, l.rx, l.ry].forEach((fn) => fn?.(0)));

        root.addEventListener('pointermove', onMove);
        root.addEventListener('pointerleave', onLeave);
        return () => {
          cancelAnimationFrame(frame);
          root.removeEventListener('pointermove', onMove);
          root.removeEventListener('pointerleave', onLeave);
        };
      });
    },
    { scope: rootRef },
  );

  // Hand-over from the intro: start the entrance once it has finished.
  useEffect(() => {
    if (introDone) entranceRef.current?.play();
  }, [introDone]);

  // Positions change once fonts and posters settle.
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => clearTimeout(id);
  }, []);
}
