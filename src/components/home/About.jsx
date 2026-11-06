import { festival, stats, timeline, lineup2026, sources } from '../../data/festival.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import StatCounter from './StatCounter.jsx';
import Rangoli from '../decor/Rangoli.jsx';
import '../../styles/components/about.css';

const sourceById = Object.fromEntries(sources.map((s) => [s.id, s]));

export default function About() {
  const ref = useScrollReveal();
  const years = new Date().getFullYear() - festival.firstEdition;

  return (
    <section id="about" className="about section" aria-labelledby="about-title" tabIndex={-1} ref={ref}>
      <div className="container about__intro">
        <div className="about__head reveal">
          <p className="eyebrow">01 — About MILAN</p>
          <h2 id="about-title" className="section-title">
            Eighteen editions of <span className="serif-accent">coming together.</span>
          </h2>
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

      <div className="about__stats">
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

      <div className="container about__legacy">
        <h3 className="about__legacy-title reveal">
          The legacy, <span className="serif-accent">in four moments</span>
        </h3>
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
