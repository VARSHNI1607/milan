import { forwardRef } from 'react';
import { Search, X } from 'lucide-react';

const EventSearch = forwardRef(function EventSearch({ value, onChange }, ref) {
  return (
    <div className="event-search" role="search">
      <label htmlFor="event-search-input" className="event-search__label">
        Search events
      </label>
      <div className="event-search__field">
        <Search className="event-search__icon" aria-hidden="true" />
        <input
          ref={ref}
          id="event-search-input"
          type="search"
          inputMode="search"
          autoComplete="off"
          spellCheck="false"
          placeholder="Try “tamil”, “battle”, “short film”…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape' && value) {
              e.preventDefault();
              onChange('');
            }
          }}
          maxLength={80}
        />
        {value && (
          <button type="button" className="event-search__clear" onClick={() => onChange('')} aria-label="Clear search">
            <X aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
});

export default EventSearch;
