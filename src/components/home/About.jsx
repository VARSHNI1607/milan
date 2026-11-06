import { useRef } from 'react';
import { gsap, useGSAP, MQ } from '../../motion/gsap.js';
import { festival, stats, timeline, lineup2026, sources } from '../../data/festival.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import StatCounter from './StatCounter.jsx';
import Rangoli from '../decor/Rangoli.jsx';
import '../../styles/components/about.css';
import SplitReveal from '../motion/SplitReveal.jsx';

const sourceById = Object.fromEntries(sources.map((s) => [s.id, s]));

export default function About() {
  const ref = useScrollReveal();
  const legacyRef = useRef(null);
  const statsRef = useRef(null);

  // Decorative lines draw themselves: the timeline rail follows the scroll,
  // stat rules sweep in as the band enters.
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.fromTo(
        legacyRef.current.querySelector('.timeline'),
        { '--rail': 0 },
        {
          '--rail': 1,
          ease: 'none',
          scrollTrigger: { trigger: legacyRef.current, start: 'top 75%', end: 'bottom 70%', scrub: 0.6 },
        },
      );
      gsap.fromTo(legacyRef.current.querySelectorAll('.timeline__item'), { '--pip': 0 }, {
        '--pip': 1,
        duration: 0.5,
        stagger: 0.25,
        ease: 'back.out(3)',
        scrollTrigger: { trigger: legacyRef.current, start: 'top 70%', once: true },
      });
      gsap.fromTo(statsRef.current.querySelectorAll('.stat'), { '--line': 0 }, {
        '--line': 1,
        duration: 1.1,
        stagger: 0.12,
        ease: 'expo.out',
        scrollTrigger: { trigger: statsRef.current, start: 'top 80%', once: true },
      });
    });
  });
  const years = new Date().getFullYear() - festival.firstEdition;

  return (
    <section id="about" className="about section" aria-labelledby="about-title" tabIndex={-1} ref={ref}>
      <div className="container about__intro">
        <div className="about__head">
          <p className="eyebrow reveal">01 — About MILAN</p>
          <SplitReveal as="h2" id="about-title" className="section-title">
            Eighteen editions of <span className="serif-accent">coming together.</span>
          </SplitReveal>
        </div>

        <div className="about__word reveal" aria-hidden="true">
          <span lang="hi" className="about__devanagari">मिलन</span>
          <span className="about__gloss">
            <em>milan</em> · noun · Sanskrit
            <br />a meeting; a coming together
          </span>
        </div>

        <div className="about__body">
          <p className="about__lead reveal">
            MILAN is the national-level cultural festival of {festival.institution}, held every year at the{' '}
            {festival.campus.split(',')[0]} campus and organised by the {festival.organiser}.
          </p>
          <p className="reveal" style={{ '--reveal-delay': '80ms' }}>
            What began in {festival.firstEdition} with around 25 events has grown, over {years} years, into a
            festival of 100+ competitions across dance, music, theatre, fashion, literature, art and sport — with
            participants travelling in from colleges across the country.
          </p>
          <p className="reveal" style={{ '--reveal-delay': '160ms' }}>
            It is conceived and run by students under the guidance of the Directorate of Student Affairs. Literary
            events run in English, Tamil and Telugu, and the festival’s <strong>Butterflies</strong> initiative
            brings government-school children from Kancheepuram district to compete in their own cultural events.
          </p>
        </div>
      </div>

      <div className="about__stats" ref={statsRef}>
        <Rangoli className="about__stats-rangoli" palette="night" />
        <div className="container">
          <p className="about__stats-kicker">
            {festival.latestEdition.label}, by the numbers{' '}
            <a href={sourceById[stats[0].source].url} target="_blank" rel="noreferrer">
              (source: SRMIST)
            </a>
          </p>
          <div className="about__stats-grid">
            {stats.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>
          <p className="about__lineup">
            Inaugurated by <strong>{lineup2026.inaugurated}</strong>, with performances by{' '}
            {lineup2026.performers.map((name, i) => (
              <span key={name}>
                <strong>{name}</strong>
                {i < lineup2026.performers.length - 2 ? ', ' : i === lineup2026.performers.length - 2 ? ' and ' : '.'}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="container about__legacy" ref={legacyRef}>
        <SplitReveal as="h3" className="about__legacy-title">
          The legacy, <span className="serif-accent">in four moments</span>
        </SplitReveal>
        <ol role="list" className="timeline">
          {timeline.map((item, i) => (
            <li key={item.year} className="timeline__item reveal" style={{ '--reveal-delay': `${i * 90}ms` }}>
              <p className="timeline__year">{item.year}</p>
              <h4 className="timeline__title">{item.title}</h4>
              <p className="timeline__text">{item.text}</p>
              <a className="timeline__source" href={sourceById[item.source].url} target="_blank" rel="noreferrer">
                Source: {sourceById[item.source].label.split(' — ')[0]}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
