import { useMemo, useRef } from 'react';
import { events as allEvents, CATEGORIES, getEventById } from '../data/events.js';
import { useEventFilters } from '../hooks/useEventFilters.js';
import { useEventModal } from '../hooks/useEventModal.js';
import { useScrollDirection } from '../hooks/useScrollDirection.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { countByCategory } from '../utils/filterEvents.js';
import EventSearch from '../components/events/EventSearch.jsx';
import EventFilters from '../components/events/EventFilters.jsx';
import EventCard from '../components/events/EventCard.jsx';
import EmptyState from '../components/events/EmptyState.jsx';
import EventModal from '../components/events/EventModal.jsx';
import SampleNotice from '../components/events/SampleNotice.jsx';
import Rangoli from '../components/decor/Rangoli.jsx';
import Button from '../components/ui/Button.jsx';
import { RotateCcw } from 'lucide-react';
import '../styles/components/events-page.css';

export default function Events({ events = allEvents }) {
  useDocumentTitle('Events');
  const { query, setQuery, category, setCategory, reset, results, isFiltered, isPending } = useEventFilters(events);
  const { openEventId, openEvent, closeEvent } = useEventModal();
  const { hidden: navHidden } = useScrollDirection();
  const searchRef = useRef(null);

  const counts = useMemo(() => countByCategory(events), [events]);
  const selectedEvent = getEventById(openEventId, events);

  function handleReset() {
    reset();
    searchRef.current?.focus();
  }

  const showFeatured = !isFiltered && results.length >= 4;

  return (
    <>
      <header className="events-hero">
        <Rangoli className="events-hero__rangoli" />
        <div className="container">
          <p className="eyebrow">Events explorer</p>
          <h1 className="events-hero__title">
            Find your <span className="serif-accent">stage.</span>
          </h1>
          <p className="lead events-hero__lead">
            Search by name or keyword, filter by domain, and open any event for the full brief.
          </p>
          <SampleNotice />
        </div>
      </header>

      <div className="explorer__toolbar" style={{ top: navHidden ? 0 : 'var(--nav-h)' }}>
        <div className="container explorer__toolbar-inner">
          <EventSearch ref={searchRef} value={query} onChange={setQuery} />
          <EventFilters categories={CATEGORIES} active={category} counts={counts} onChange={setCategory} />
        </div>
      </div>

      <section className="container explorer__results" aria-labelledby="results-heading">
        <div className="explorer__status">
          <h2 id="results-heading" className="explorer__count" aria-live="polite" aria-atomic="true">
            <strong>{results.length}</strong> {results.length === 1 ? 'event' : 'events'}
            {category !== 'All' && ` in ${category}`}
            {query.trim() && ` matching “${query.trim()}”`}
          </h2>
          {isFiltered && (
            <Button variant="ghost" size="sm" onClick={handleReset} icon={RotateCcw} iconPosition="start">
              Reset filters
            </Button>
          )}
        </div>

        {events.length === 0 ? (
          <EmptyState variant="no-data" />
        ) : results.length === 0 ? (
          <EmptyState query={query.trim()} category={category} onReset={handleReset} />
        ) : (
          <div className={`event-grid ${isPending ? 'is-pending' : ''}`}>
            {results.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                onOpen={openEvent}
                featured={showFeatured && index === 0}
              />
            ))}
          </div>
        )}
      </section>

      <EventModal eventId={openEventId} event={selectedEvent} onClose={closeEvent} />
    </>
  );
}
