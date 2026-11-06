import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { events } from '../../data/events.js';
import { useEventModal } from '../../hooks/useEventModal.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import EventCard from '../events/EventCard.jsx';
import EventModal from '../events/EventModal.jsx';
import Button from '../ui/Button.jsx';
import { getEventById } from '../../data/events.js';
import '../../styles/components/featured.css';

// One event from each of six different categories, for variety.
const FEATURED_IDS = ['nritya-rising', 'amplify-band-battle', 'rangmanch', 'ramp-raga', 'kolam-and-chalk', 'vaad-vivaad'];

export default function FeaturedEvents() {
  const railRef = useRef(null);
  const sectionRef = useScrollReveal();
  const { openEventId, openEvent, closeEvent } = useEventModal();
  const featured = FEATURED_IDS.map((id) => getEventById(id)).filter(Boolean);

  function scrollRail(direction) {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector('li');
    const step = card ? card.getBoundingClientRect().width + 24 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: direction * step, behavior: 'smooth' });
  }

  return (
    <section className="featured section" aria-labelledby="featured-title" ref={sectionRef}>
      <div className="container">
        <header className="featured__head">
          <div className="reveal">
            <p className="eyebrow">03 — On the programme</p>
            <h2 id="featured-title" className="section-title">
              A taste of <span className="serif-accent">the line-up.</span>
            </h2>
            <p className="featured__note">Illustrative sample events — not official listings.</p>
          </div>
          <div className="featured__controls reveal">
            <button type="button" className="featured__arrow" onClick={() => scrollRail(-1)} aria-label="Scroll events left">
              <ArrowLeft aria-hidden="true" />
            </button>
            <button type="button" className="featured__arrow" onClick={() => scrollRail(1)} aria-label="Scroll events right">
              <ArrowRight aria-hidden="true" />
            </button>
            <Button to="/events" variant="secondary" icon={ArrowRight}>
              All {events.length} events
            </Button>
          </div>
        </header>
      </div>

      <ul role="list" className="featured__rail" ref={railRef} aria-label="Sample events">
        {featured.map((event) => (
          <li key={event.id}>
            <EventCard event={event} onOpen={openEvent} />
          </li>
        ))}
      </ul>

      <EventModal eventId={openEventId} event={getEventById(openEventId)} onClose={closeEvent} />
    </section>
  );
}
