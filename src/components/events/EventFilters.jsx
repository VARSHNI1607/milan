/**
 * Category filter as a radio group: exactly one category is active, and
 * screen readers announce "Dance, 2 of 8, selected". Arrow keys move
 * between options (roving tabindex), matching native radio behaviour.
 */
export default function EventFilters({ categories, active, counts, onChange }) {
  function handleKeyDown(event, index) {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (!(event.key in keys) && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    let next = index + (keys[event.key] ?? 0);
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = categories.length - 1;
    next = (next + categories.length) % categories.length;
    onChange(categories[next]);
    event.currentTarget.parentElement.children[next]?.focus();
  }

  return (
    <div className="event-filters">
      <p id="filter-label" className="event-filters__label">
        Category
      </p>
      <div role="radiogroup" aria-labelledby="filter-label" className="event-filters__group">
        {categories.map((category, index) => {
          const selected = category === active;
          return (
            <button
              key={category}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              className={`filter-chip ${selected ? 'is-active' : ''}`}
              onClick={() => onChange(category)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {category}
              <span className="filter-chip__count" aria-label={`${counts[category] ?? 0} events`}>
                {counts[category] ?? 0}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
