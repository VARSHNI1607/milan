import { gsap, useGSAP, MQ } from './gsap.js';

/**
 * Slides a repeating pattern sideways as it crosses the viewport, so the
 * festival borders feel like they're travelling with the scroll. The SVG
 * is drawn `distance` px wider than its clipping wrapper, and only its
 * transform changes (compositor-only).
 */
export function useDrift(ref, distance, { direction = -1 } = {}) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const svg = ref.current?.querySelector('svg');
        if (!svg) return;
        gsap.fromTo(
          svg,
          { x: direction < 0 ? 0 : -distance },
          {
            x: direction < 0 ? -distance : 0,
            ease: 'none',
            scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 0.5 },
          },
        );
      });
    },
    { scope: ref },
  );
}
