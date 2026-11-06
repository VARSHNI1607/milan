import { useEffect, useRef, useState } from 'react';
import { gsap, MQ } from '../../motion/gsap.js';
import '../../styles/components/cursor.css';

/**
 * A small marigold kolam ring that trails the pointer, grows over anything
 * interactive and shows a word over elements with `data-cursor="…"`.
 * The native cursor stays visible — this is a companion, not a replacement.
 * Mounted only for fine pointers with motion allowed.
 */
export default function CursorFollower() {
  const [enabled, setEnabled] = useState(false);
  const ref = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia(`${MQ.motion} and ${MQ.finePointer}`);
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const el = ref.current;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3' });
    let shown = false;

    const onMove = (e) => {
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        el.classList.add('is-visible');
        shown = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const onOver = (e) => {
      const labelled = e.target.closest('[data-cursor]');
      const interactive = e.target.closest('a, button, input, select, label, [role="radio"]');
      el.classList.toggle('is-hover', Boolean(interactive || labelled));
      el.classList.toggle('has-label', Boolean(labelled && !interactive));
      labelRef.current.textContent = labelled && !interactive ? labelled.dataset.cursor : '';
    };
    const onLeave = () => {
      el.classList.remove('is-visible');
      shown = false;
    };
    const onDown = () => el.classList.add('is-down');
    const onUp = () => el.classList.remove('is-down');

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      gsap.killTweensOf(el);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <span className="cursor__ring" />
      <span className="cursor__label" ref={labelRef} />
    </div>
  );
}
