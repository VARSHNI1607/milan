import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { X, CalendarDays, MapPin, Users, Clock, Layers, ArrowUpRight, SearchX } from 'lucide-react';
import EventArt from './EventArt.jsx';
import { getCategoryStyle } from '../../data/categoryStyles.js';
import Button from '../ui/Button.jsx';
import { useFocusTrap } from '../../hooks/useFocusTrap.js';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock.js';
import '../../styles/components/event-modal.css';

/**
 * Event detail dialog.
 * - Rendered in a portal so it sits above everything.
 * - Focus moves to the close button, is trapped inside, and returns to
 *   the triggering "View details" button on close.
 * - Escape, the close button and a backdrop click all close it.
 * - If the id in the URL doesn't match an event, it shows a not-found
 *   state instead of failing.
 */
export default function EventModal({ eventId, event, onClose }) {
  const open = Boolean(eventId);
  const closeRef = useRef(null);
  const dialogRef = useFocusTrap(open, { onEscape: onClose, initialFocusRef: closeRef });
  useBodyScrollLock(open);

  if (!open) return null;

  const titleId = 'event-modal-title';

  return createPortal(
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={dialogRef} className="modal__dialog" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <button ref={closeRef} type="button" className="modal__close" onClick={onClose} aria-label="Close event details">
          <X aria-hidden="true" />
        </button>

        {event ? (
          <div className="modal__layout">
            <div className="modal__art" style={{ background: getCategoryStyle(event.category).bg }}>
              <EventArt category={event.category} image={event.image} variant="tall" label={event.category} />
            </div>
            <div className="modal__content">
              <p className="modal__kicker">
                {event.category} <span className="modal__sample">Sample event</span>
              </p>
              <h2 id={titleId} className="modal__title">
                {event.title}
              </h2>
              <p className="modal__tagline serif-accent">{event.tagline}</p>

              <dl className="modal__facts">
                <div>
                  <dt><CalendarDays aria-hidden="true" /> When</dt>
                  <dd>Day {event.day} · {event.time}</dd>
                </div>
                <div>
                  <dt><MapPin aria-hidden="true" /> Venue</dt>
                  <dd>{event.venue}</dd>
                </div>
                <div>
                  <dt><Layers aria-hidden="true" /> Format</dt>
                  <dd>{event.format}</dd>
                </div>
                <div>
                  <dt><Users aria-hidden="true" /> Team size</dt>
                  <dd>{event.teamSize}</dd>
                </div>
                <div>
                  <dt><Clock aria-hidden="true" /> Duration</dt>
                  <dd>{event.duration}</dd>
                </div>
              </dl>

              <div className="modal__desc">
                {event.details.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <h3 className="modal__subhead">Rules at a glance</h3>
              <ul className="modal__rules">
                {event.rules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>

              <p className="modal__note">
                This is an illustrative sample. Dates are shown as festival days because official schedules are
                published by the Directorate of Student Affairs.
              </p>

              <div className="modal__actions">
                <Button to={`/register?event=${event.id}`} icon={ArrowUpRight}>
                  Register for {event.title}
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Back to events
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="modal__missing">
            <SearchX className="modal__missing-icon" aria-hidden="true" />
            <h2 id={titleId} className="modal__title">
              Event not found
            </h2>
            <p>
              We couldn’t find an event called “<strong>{eventId}</strong>”. It may have been renamed or removed.
            </p>
            <div className="modal__actions">
              <Button onClick={onClose}>Browse all events</Button>
              <Link to="/" className="modal__home-link">
                Go home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
