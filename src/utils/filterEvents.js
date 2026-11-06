/**
 * Normalise text for forgiving, case- and accent-insensitive matching.
 */
export function normalise(text) {
  return String(text ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’'`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Builds the searchable text for one event (title, copy, keywords, venue). */
export function buildSearchIndex(event) {
  return normalise(
    [
      event.title,
      event.category,
      event.tagline,
      event.description,
      event.venue,
      event.format,
      ...(event.keywords ?? []),
    ].join(' '),
  );
}

/**
 * Filters events by keyword query and category.
 * - Every word in the query must appear somewhere in the event (AND search),
 *   so "tamil debate" narrows instead of widening results.
 * - category "All" (or empty) disables the category filter.
 * Search and category always combine.
 */
export function filterEvents(events, { query = '', category = 'All' } = {}) {
  if (!Array.isArray(events)) return [];
  const terms = normalise(query).split(' ').filter(Boolean);
  const useCategory = category && category !== 'All';

  return events.filter((event) => {
    if (useCategory && event.category !== category) return false;
    if (terms.length === 0) return true;
    const haystack = buildSearchIndex(event);
    return terms.every((term) => haystack.includes(term));
  });
}

/** Count of events per category, for filter chip badges. */
export function countByCategory(events) {
  return events.reduce(
    (counts, event) => {
      counts[event.category] = (counts[event.category] ?? 0) + 1;
      counts.All += 1;
      return counts;
    },
    { All: 0 },
  );
}
