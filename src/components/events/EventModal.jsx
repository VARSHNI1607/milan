import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../motion/gsap.js';
import { takeFlipOrigin } from '../../motion/flip.js';
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

  // Card → modal shared-element transition:
  //  1. a copy of the clicked card's poster flies to where the modal's
  //     poster sits (transform only),
  //  2. meanwhile the dialog is unclipped outward from the card's rectangle,
  //  3. the real poster takes over and the text settles in.
  useGSAP(
    () => {
      if (!open) return;
      const dialog = dialogRef.current;
      const origin = takeFlipOrigin();
      if (!dialog || !origin || prefersReducedMotion()) return;
      const target = dialog.querySelector('.modal__art .event-art');
      const to = dialog.getBoundingClientRect();
      const from = origin.rect;
      const clamp = (n) => Math.max(0, n);
      const inset = `inset(${clamp(from.top - to.top)}px ${clamp(to.right - from.right)}px ${clamp(
        to.bottom - from.bottom,
      )}px ${clamp(from.left - to.left)}px)`;
      dialog.classList.add('is-flip');

      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        onComplete: () => gsap.set(dialog, { clearProps: 'clipPath' }),
      });
      tl.fromTo(dialog, { clipPath: inset }, { clipPath: 'inset(0px 0px 0px 0px)', duration: 0.7 });

      let ghost = null;
      if (target) {
        const end = target.getBoundingClientRect();
        ghost = origin.element.cloneNode(true);
        ghost.classList.add('flip-ghost');
        ghost.setAttribute('aria-hidden', 'true');
        Object.assign(ghost.style, {
          position: 'fixed',
          left: `${from.left}px`,
          top: `${from.top}px`,
          width: `${from.width}px`,
          height: `${from.height}px`,
          margin: 0,
          zIndex: 'calc(var(--z-modal) + 1)',
          transformOrigin: '0 0',
          pointerEvents: 'none',
          overflow: 'hidden',
        });
        document.body.appendChild(ghost);
        const scale = end.width / from.width;
        gsap.set(target, { autoAlpha: 0 });
        tl.to(ghost, { x: end.left - from.left, y: end.top - from.top, scale, duration: 0.7 }, 0)
          .to(target, { autoAlpha: 1, duration: 0.25, ease: 'none' }, 0.6)
          .to(ghost, { autoAlpha: 0, duration: 0.25, ease: 'none', onComplete: () => ghost.remove() }, 0.65);
      }
      tl.from(dialog.querySelectorAll('.modal__content > *'), { y: 18, opacity: 0, stagger: 0.035, duration: 0.5, ease: 'power3.out' }, 0.3);

      return () => ghost?.remove();
    },
    { dependencies: [open, eventId] },
  );

  if (!open) return null;

  const titleId = 'event-modal-title';

  return createPortal(
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={dialogRef} className="modal__dialog" data-lenis-prevent role="dialog" aria-modal="true" aria-labelledby={titleId}>
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
