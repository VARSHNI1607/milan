import { memo } from 'react';
import { CalendarDays, MapPin, ArrowRight } from 'lucide-react';
import EventArt from './EventArt.jsx';
import '../../styles/components/event-card.css';

/**
 * One event in the explorer. The whole card is NOT a link — only the
 * "View details" button is interactive, so there is a single, clearly
 * labelled tab stop per card.
 */
function EventCard({ event, onOpen, featured = false, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;
  const headingId = `event-${event.id}-title`;

  return (
    <article className={`event-card ${featured ? 'event-card--featured' : ''}`} aria-labelledby={headingId}>
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
          onClick={() => onOpen(event.id)}
          aria-haspopup="dialog"
          aria-describedby={headingId}
        >
          View details <ArrowRight aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export default memo(EventCard);
