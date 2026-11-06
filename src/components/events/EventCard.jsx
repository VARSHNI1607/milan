import { memo, useRef } from 'react';
import { CalendarDays, MapPin, ArrowRight } from 'lucide-react';
import EventArt from './EventArt.jsx';
import { useTilt } from '../../motion/useTilt.js';
import { setFlipOrigin } from '../../motion/flip.js';
import '../../styles/components/event-card.css';

/**
 * One event in the explorer. Only the "View details" button is
 * interactive, so there is a single, clearly labelled tab stop per card.
 * Hover and keyboard focus share the same treatment (tilt is pointer-only).
 */
function EventCard({ event, onOpen, featured = false, headingLevel = 3, index = 0 }) {
  const Heading = `h${headingLevel}`;
  const headingId = `event-${event.id}-title`;
  const innerRef = useRef(null);
  useTilt(innerRef, { max: featured ? 3 : 5 });

  const open = () => {
    // Remember where the poster is so the modal can grow out of it.
    setFlipOrigin(innerRef.current?.querySelector('.event-card__art'));
    onOpen(event.id);
  };

  return (
    <article
      className={`event-card ${featured ? 'event-card--featured' : ''}`}
      aria-labelledby={headingId}
      style={{ '--i': Math.min(index, 8) }}
    >
      <div className="event-card__inner" ref={innerRef} data-cursor="View">
        <svg className="event-card__trace" aria-hidden="true" focusable="false">
          <rect x="0" y="0" width="100%" height="100%" pathLength="1" />
        </svg>
        <div className="event-card__art">
          <EventArt
            category={event.category}
            image={event.image}
            imageAlt=""
            variant={featured ? 'wide' : 'card'}
            label={event.category}
          />
          <span className="event-card__sample">Sample</span>
        </div>
        <div className="event-card__body">
          <Heading id={headingId} className="event-card__title">
            {event.title}
          </Heading>
          <p className="event-card__tagline">{event.tagline}</p>
          <p className="event-card__desc">{event.description}</p>
          <ul role="list" className="event-card__meta">
            <li>
              <CalendarDays aria-hidden="true" />
              <span>
                Day {event.day} · {event.time}
              </span>
            </li>
            <li>
              <MapPin aria-hidden="true" />
              <span>{event.venue}</span>
            </li>
          </ul>
          <button
            type="button"
            className="event-card__cta"
            onClick={open}
            aria-haspopup="dialog"
            aria-describedby={headingId}
          >
            View details <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default memo(EventCard);
