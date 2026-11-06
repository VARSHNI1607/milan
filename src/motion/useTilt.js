import { gsap, useGSAP, MQ } from './gsap.js';

/**
 * Subtle 3D tilt toward the cursor. Fine pointers + motion only; resets
 * smoothly on leave. Uses quickTo, so pointermove never touches React.
 */
export function useTilt(ref, { max = 6, lift = 6 } = {}) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(`${MQ.motion} and ${MQ.finePointer}`, () => {
        gsap.set(el, { transformPerspective: 900 });
        const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3' });
        const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3' });
        const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });

        const onMove = (e) => {
          const r = el.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          ry(nx * max * 2);
          rx(-ny * max * 2);
          y(-lift);
        };
        const onLeave = () => {
          rx(0);
          ry(0);
          y(0);
        };
        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerleave', onLeave);
        return () => {
          el.removeEventListener('pointermove', onMove);
          el.removeEventListener('pointerleave', onLeave);
        };
      });
    },
    { scope: ref },
  );
}
