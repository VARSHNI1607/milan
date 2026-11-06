import { useRef } from 'react';
import { memories } from '../../data/memories.js';
import { sources } from '../../data/festival.js';
import { gsap, useGSAP, MQ } from '../../motion/gsap.js';
import EventArt from '../events/EventArt.jsx';
import SplitReveal from '../motion/SplitReveal.jsx';
import '../../styles/components/gallery.css';

const sourceById = Object.fromEntries(sources.map((s) => [s.id, s]));
const hasPhotos = memories.some((m) => m.photo);

/**
 * Editorial horizontal gallery.
 * - Desktop (≥1024px, motion allowed): the section pins and vertical
 *   scrolling drives the track sideways; giant year numerals move at a
 *   different speed to the frames for depth.
 * - Everywhere else: a native, swipeable scroll-snap row that can also be
 *   scrolled with the keyboard (it's a focusable region).
 */
export default function MemoriesGallery() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MQ.motion} and ${MQ.desktop}`, () => {
        const section = sectionRef.current;
        const track = trackRef.current;
        const distance = () => track.scrollWidth - document.documentElement.clientWidth;

        const scroll = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        // Depth: numerals drift against the scroll, posters sway as they cross.
        gsap.utils.toArray('.memory', track).forEach((memory) => {
          const triggerSettings = {
            trigger: memory,
            containerAnimation: scroll,
            start: 'left right',
            end: 'right left',
            scrub: true,
          };
          gsap.fromTo(memory.querySelector('.memory__year'), { xPercent: 30 }, { xPercent: -30, ease: 'none', scrollTrigger: triggerSettings });
          gsap.fromTo(
            memory.querySelector('.memory__frame'),
            { rotate: 3 },
            { rotate: -3, ease: 'none', scrollTrigger: { ...triggerSettings } },
          );
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section className="gallery" ref={sectionRef} aria-labelledby="gallery-title">
      <div className="gallery__viewport" role="region" aria-label="MILAN memories, scrollable" tabIndex={0}>
        <ol role="list" className="gallery__track" ref={trackRef}>
          <li className="gallery__intro">
            <p className="eyebrow">03 — Memories</p>
            <SplitReveal as="h2" id="gallery-title" className="gallery__title">
              Eighteen years <span className="serif-accent">in frames.</span>
            </SplitReveal>
            <p className="gallery__lead">
              Moments from MILAN’s history, drawn from published records.{' '}
              {!hasPhotos &&
                'Each frame is illustrated for now — photographs from past editions will be added only once their reuse is authorised.'}
            </p>
            <p className="gallery__hint" aria-hidden="true">
              Scroll to travel through time →
            </p>
          </li>

          {memories.map((m, i) => (
            <li key={m.id} className={`memory ${i % 2 ? 'memory--low' : ''}`}>
              <span className="memory__year" aria-hidden="true">
                {m.year}
              </span>
              <figure className="memory__figure">
                <div className="memory__frame">
                  <EventArt
                    category={m.art}
                    image={m.photo ?? undefined}
                    imageAlt={m.photoAlt}
                    variant="tall"
                    label={m.photo ? undefined : 'Illustration'}
                  />
                </div>
                <figcaption className="memory__caption">
                  <span className="memory__year-label">{m.year}</span>
                  <strong className="memory__title">{m.title}</strong>
                  <span className="memory__text">{m.caption}</span>
                  <a className="memory__source" href={sourceById[m.source]?.url} target="_blank" rel="noreferrer">
                    Source: {sourceById[m.source]?.label.split(' — ')[0]}
                    {m.credit && ` · Photo: ${m.credit}`}
                  </a>
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
