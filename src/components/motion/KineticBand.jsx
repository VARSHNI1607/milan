import { useRef } from 'react';
import { gsap, useGSAP, MQ } from '../../motion/gsap.js';
import { festival, stats } from '../../data/festival.js';
import '../../styles/components/kinetic.css';

const fmt = new Intl.NumberFormat('en-IN');
const students = stats.find((s) => s.label.includes('students'));
const colleges = stats.find((s) => s.label === 'colleges');
const states = stats.find((s) => s.label === 'states');

// Each row: [text, style] pairs. Styles: 'display' | 'serif' | 'outline'.
const ROWS = [
  [
    ['Dance', 'display'], ['rhythm', 'serif'], ['Music', 'display'], ['melody', 'serif'],
    ['Drama', 'display'], ['story', 'serif'], ['Fashion', 'display'], ['craft', 'serif'],
  ],
  [
    [festival.latestEdition.theme.split(':')[0], 'outline'], ['·', 'serif'],
    [festival.latestEdition.theme.split(':')[1].trim(), 'outline'], ['·', 'serif'],
  ],
  [
    [`${fmt.format(students.value)}${students.suffix} students`, 'display'], ['from', 'serif'],
    [`${colleges.value} colleges`, 'display'], ['and', 'serif'], [`${states.value} states`, 'display'],
    ['on one stage', 'serif'],
  ],
];

/**
 * Giant editorial type that slides in opposite directions as the page
 * scrolls (scrubbed, transform-only). Purely decorative restatement of
 * facts that appear elsewhere, so it's hidden from assistive tech.
 */
export default function KineticBand() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const rows = gsap.utils.toArray('.kinetic__row', ref.current);
        rows.forEach((row, i) => {
          const dir = i % 2 === 0 ? 1 : -1;
          gsap.fromTo(
            row,
            { xPercent: dir > 0 ? -18 : 2 },
            {
              xPercent: dir > 0 ? 2 : -18,
              ease: 'none',
              scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
            },
          );
        });
        gsap.fromTo(
          '.kinetic__row--theme',
          { scale: 0.9 },
          { scale: 1.06, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1 } },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section className="kinetic" ref={ref} aria-hidden="true">
      {ROWS.map((row, i) => (
        <div key={i} className={`kinetic__row ${i === 1 ? 'kinetic__row--theme' : ''}`}>
          {[0, 1].map((copy) =>
            row.map(([text, style], j) => (
              <span key={`${copy}-${j}`} className={`kinetic__word kinetic__word--${style}`}>
                {text}
              </span>
            )),
          )}
        </div>
      ))}
    </section>
  );
}
