import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP } from '../../motion/gsap.js';
import { useMotion } from '../../motion/MotionProvider.jsx';
import { markIntroSeen } from '../../motion/intro.js';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock.js';
import Sunburst from './Sunburst.jsx';
import Rangoli from '../decor/Rangoli.jsx';
import BorderBand from '../decor/BorderBand.jsx';
import '../../styles/components/intro.css';

const WORD = 'MILAN';

/**
 * Opening sequence (~2.2s): sunburst blooms → MILAN rises letter by
 * letter → rangoli expands → the curtain lifts to reveal the home page.
 * Skippable by button, click/tap anywhere, or Escape. Content behind is
 * made inert while it plays so keyboard focus can't wander underneath.
 */
export default function IntroSequence() {
  const { finishIntro } = useMotion();
  const [visible, setVisible] = useState(true);
  const rootRef = useRef(null);
  const tlRef = useRef(null);
  const skipRef = useRef(null);

  useBodyScrollLock(visible);

  // Make the page underneath inert while the intro is on screen.
  useEffect(() => {
    if (!visible) return undefined;
    const shell = document.querySelectorAll('[data-shell]');
    shell.forEach((el) => el.setAttribute('inert', ''));
    return () => shell.forEach((el) => el.removeAttribute('inert'));
  }, [visible]);

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => setVisible(false),
      });
      tlRef.current = tl;

      tl.from(q('.sunburst__petal'), {
        scale: 0,
        rotate: -90,
        transformOrigin: '50% 100%',
        duration: 0.6,
        stagger: 0.05,
        ease: 'back.out(2)',
      })
        .from(q('.sunburst__centre'), { scale: 0, transformOrigin: '50% 50%', duration: 0.4 }, '<0.2')
        .fromTo(
          q('.intro__rangoli'),
          { scale: 0.15, rotate: -45, autoAlpha: 0 },
          { scale: 1, rotate: 30, autoAlpha: 0.32, duration: 1.4, ease: 'power2.out' },
          0.25,
        )
        .from(q('.intro__letter'), { yPercent: 115, duration: 0.65, stagger: 0.06 }, 0.45)
        .from(q('.intro__tag'), { autoAlpha: 0, y: 12, duration: 0.5 }, 0.95)
        .addLabel('exit', 1.55)
        .call(() => {
          markIntroSeen();
          finishIntro(); // hero entrance starts as the curtain lifts
        }, null, 'exit+=0.25')
        .to(q('.intro__stage'), { y: -80, autoAlpha: 0, duration: 0.55, ease: 'power2.in' }, 'exit')
        .to(rootRef.current, { yPercent: -100, duration: 0.75, ease: 'power4.inOut' }, 'exit+=0.1');

      requestAnimationFrame(() => skipRef.current?.focus({ preventScroll: true }));
    },
    { scope: rootRef },
  );

  const skip = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (tl.time() < tl.labels.exit) tl.seek('exit');
    tl.timeScale(1.8);
  };

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && skip();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  if (!visible) return null;

  return (
    <div ref={rootRef} className="intro" onClick={skip} role="dialog" aria-modal="true" aria-label="MILAN opening sequence">
      <Rangoli className="intro__rangoli" palette="night" />
      <div className="intro__stage">
        <Sunburst className="intro__sunburst" centre="var(--c-parchment)" />
        <p className="intro__word" aria-label="MILAN">
          {WORD.split('').map((letter, i) => (
            <span key={i} className="intro__mask" aria-hidden="true">
              <span className="intro__letter">{letter}</span>
            </span>
          ))}
        </p>
        <p className="intro__tag serif-accent">culture in motion</p>
      </div>
      <button
        ref={skipRef}
        type="button"
        className="intro__skip"
        onClick={(e) => {
          e.stopPropagation();
          skip();
        }}
      >
        Skip intro
      </button>
      <BorderBand tone="marigold" className="intro__band" />
    </div>
  );
}
