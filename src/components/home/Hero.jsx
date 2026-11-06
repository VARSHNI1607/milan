import { ArrowRight, ArrowUpRight, CalendarDays, MapPin } from 'lucide-react';
import Button from '../ui/Button.jsx';
import Toran from '../decor/Toran.jsx';
import Rangoli from '../decor/Rangoli.jsx';
import EventArt from '../events/EventArt.jsx';
import Marquee from '../decor/Marquee.jsx';
import { festival } from '../../data/festival.js';
import '../../styles/components/hero.css';

const WORD = 'MILAN';
const TICKER = ['Dance', 'Music', 'Dramatics', 'Fashion', 'Literary', 'Fine Arts', 'Gaming', 'Aeromodelling', 'Funzone'];

export default function Hero() {
  const { latestEdition, nextEdition } = festival;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <Toran className="hero__toran" />

      <div className="hero__grid container">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow">SRMIST · Directorate of Student Affairs · Since {festival.firstEdition}</p>

          <h1 id="hero-title" className="hero__title">
            <span className="hero__word" aria-hidden="true">
              {WORD.split('').map((letter, i) => (
                <span key={i} className="hero__letter" data-letter={letter} style={{ '--i': i }}>
                  {letter}
                </span>
              ))}
            </span>
            <span className="visually-hidden">MILAN</span>
            <span className="hero__motion serif-accent">culture in motion</span>
          </h1>

          <p className="hero__tagline">
            Many states. <span>One stage.</span>
          </p>
          <p className="hero__intro">
            <em>Milan</em> is Sanskrit for coming together. Since {festival.firstEdition}, SRMIST’s national-level
            cultural festival has gathered students from across India and beyond for dance, music, theatre,
            fashion, art and more — run by students, under the Directorate of Student Affairs.
          </p>

          <div className="hero__ctas">
            <Button to="/events" size="lg" icon={ArrowRight}>
              Explore events
            </Button>
            <Button to="/register" size="lg" variant="secondary" icon={ArrowUpRight}>
              Register
            </Button>
          </div>
        </div>

        <div className="hero__collage" aria-hidden="true">
          <Rangoli className="hero__rangoli" />
          <div className="hero__poster hero__poster--a">
            <EventArt category="Dance" variant="tall" label="Dance" />
          </div>
          <div className="hero__poster hero__poster--b">
            <EventArt category="Music" variant="square" label="Music" />
          </div>
          <div className="hero__poster hero__poster--c">
            <EventArt category="Fashion" variant="square" label="Fashion" />
          </div>
        </div>

        <aside className="hero__ticket" aria-label="Edition information">
          <div className="hero__ticket-main">
            <p className="hero__ticket-kicker">Last edition</p>
            <p className="hero__ticket-title">
              {latestEdition.label} <span>· {latestEdition.edition}</span>
            </p>
            <p className="hero__ticket-theme serif-accent">“{latestEdition.theme}”</p>
            <ul role="list" className="hero__ticket-meta">
              <li>
                <CalendarDays aria-hidden="true" /> <time dateTime={latestEdition.startDate}>{latestEdition.displayDates}</time>
              </li>
              <li>
                <MapPin aria-hidden="true" /> {festival.campus}
              </li>
            </ul>
          </div>
          <div className="hero__ticket-stub">
            <p className="hero__ticket-kicker">Up next</p>
            <p className="hero__ticket-next">{nextEdition.label}</p>
            <p className="hero__ticket-status">{nextEdition.status}</p>
          </div>
        </aside>
      </div>

      <Marquee items={TICKER} />
    </section>
  );
}
