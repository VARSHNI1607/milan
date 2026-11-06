import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { domains, sources } from '../../data/festival.js';
import { categoryTints } from '../../data/categoryStyles.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import { gsap, useGSAP, MQ } from '../../motion/gsap.js';
import EventArt from '../events/EventArt.jsx';
import SplitReveal from '../motion/SplitReveal.jsx';
import '../../styles/components/domains.css';

const wiki = sources.find((s) => s.id === 'wikipedia');
const visualOf = (d) => d.visual ?? d.category;

/**
 * Interactive domain index.
 * - Fine pointer: hovering a row tints the section, dims the other rows and
 *   shows that domain's poster in a frame that trails the cursor.
 * - Keyboard: focusing a row does the same, with the frame parked beside it.
 * - Touch / no hover: every row shows its poster inline — nothing is
 *   hover-only.
 * All of it is driven imperatively (GSAP + data attributes), so hovering
 * never re-renders React.
 */
export default function Domains() {
  const ref = useScrollReveal();
  const listRef = useRef(null);
  const floatRef = useRef(null);

  useGSAP(
    () => {
      const section = ref.current;
      const list = listRef.current;
      const float = floatRef.current;
      const mm = gsap.matchMedia();

      mm.add(`${MQ.motion} and ${MQ.finePointer}`, () => {
        const xTo = gsap.quickTo(float, 'x', { duration: 0.55, ease: 'power3' });
        const yTo = gsap.quickTo(float, 'y', { duration: 0.55, ease: 'power3' });
        const rTo = gsap.quickTo(float, 'rotation', { duration: 0.8, ease: 'power3' });
        let lastX = 0;
        let active = null;

        const activate = (row) => {
          if (row === active) return;
          active = row;
          const id = row?.dataset.domain;
          list.dataset.active = id ?? '';
          float.querySelectorAll('.domains__float-item').forEach((el) => {
            el.classList.toggle('is-active', el.dataset.domain === id);
          });
          gsap.to(float, { autoAlpha: row ? 1 : 0, scale: row ? 1 : 0.8, duration: 0.35, overwrite: 'auto' });
          gsap.to(section, {
            backgroundColor: row ? categoryTints[row.dataset.visual] ?? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0)',
            duration: 0.5,
            overwrite: 'auto',
          });
        };

        const onMove = (e) => {
          const row = e.target.closest('[data-domain]');
          activate(row);
          const box = section.getBoundingClientRect();
          xTo(e.clientX - box.left);
          yTo(e.clientY - box.top);
          rTo(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.8));
          lastX = e.clientX;
        };
        const onLeave = () => activate(null);
        const onFocus = (e) => {
          const row = e.target.closest('[data-domain]');
          if (!row) return;
          activate(row);
          const box = section.getBoundingClientRect();
          const r = row.getBoundingClientRect();
          xTo(r.right - box.left - 200);
          yTo(r.top - box.top + r.height / 2);
          rTo(-4);
        };

        list.addEventListener('pointermove', onMove);
        list.addEventListener('pointerleave', onLeave);
        list.addEventListener('focusin', onFocus);
        list.addEventListener('focusout', onLeave);
        return () => {
          list.removeEventListener('pointermove', onMove);
          list.removeEventListener('pointerleave', onLeave);
          list.removeEventListener('focusin', onFocus);
          list.removeEventListener('focusout', onLeave);
          delete list.dataset.active;
        };
      });

      // Rows sweep in one after another as the list enters.
      mm.add(MQ.motion, () => {
        gsap.from(list.querySelectorAll('.domains__row'), {
          xPercent: -6,
          opacity: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: list, start: 'top 80%', once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section id="domains" className="domains section" aria-labelledby="domains-title" ref={ref}>
      <div className="container">
        <header className="domains__head">
          <div>
            <p className="eyebrow reveal">02 — Festival highlights</p>
            <SplitReveal as="h2" id="domains-title" className="section-title">
              Nine worlds, <span className="serif-accent">one festival.</span>
            </SplitReveal>
          </div>
          <p className="lead reveal" style={{ '--reveal-delay': '100ms' }}>
            MILAN’26 listed 40+ events across dance, music, gaming, fashion, dramatics and more. The formats below are
            drawn from documented past editions{' '}
            <a href={wiki.url} target="_blank" rel="noreferrer">
              (Wikipedia)
            </a>
            ; each year’s exact line-up is set by the organisers.
          </p>
        </header>

        <ol role="list" className="domains__list" ref={listRef}>
          {domains.map((domain, i) => {
            const content = (
              <>
                <span className="domains__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="domains__name">{domain.name}</span>
                <span className="domains__note">{domain.note}</span>
                <span className="domains__thumb" aria-hidden="true">
                  <EventArt category={visualOf(domain)} image={domain.image} variant="square" />
                </span>
                {domain.category && <ArrowRight className="domains__arrow" aria-hidden="true" />}
              </>
            );
            const data = { 'data-domain': domain.id, 'data-visual': visualOf(domain) };
            return (
              <li key={domain.id} className="domains__item">
                {domain.category ? (
                  <Link
                    to={`/events?cat=${encodeURIComponent(domain.category)}`}
                    className="domains__row"
                    aria-label={`${domain.name}: ${domain.note} See sample ${domain.category} events.`}
                    {...data}
                  >
                    {content}
                  </Link>
                ) : (
                  <div className="domains__row" {...data}>
                    {content}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Cursor-trailing poster frame (fine pointers only; decorative). */}
      <div className="domains__float" ref={floatRef} aria-hidden="true">
        {domains.map((domain) => (
          <div key={domain.id} className="domains__float-item" data-domain={domain.id}>
            <EventArt category={visualOf(domain)} image={domain.image} variant="tall" label={domain.name} />
          </div>
        ))}
      </div>
    </section>
  );
}
