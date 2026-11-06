import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES } from '../data/events.js';
import { filterEvents } from '../utils/filterEvents.js';
import { useDebouncedValue } from './useDebouncedValue.js';

/**
 * Search + category state for the events explorer.
 *
 * - Category lives in the URL (?cat=Dance) so filtered views are shareable
 *   and survive refresh / back navigation.
 * - The search box is local state (instant typing) and is mirrored to ?q=
 *   after debounce; filtering itself uses the debounced value so we don't
 *   re-filter on every keystroke.
 */
export function useEventFilters(allEvents) {
  const [params, setParams] = useSearchParams();
  const urlCategory = params.get('cat');
  const category = CATEGORIES.includes(urlCategory) ? urlCategory : 'All';
  const [query, setQueryState] = useState(() => params.get('q') ?? '');
  const debouncedQuery = useDebouncedValue(query, 180);

  const updateParam = useCallback(
    (key, value) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (value) next.set(key, value);
          else next.delete(key);
          return next;
        },
        { replace: true },
      );
    },
    [setParams],
  );

  const setQuery = useCallback(
    (value) => {
      setQueryState(value);
      updateParam('q', value.trim());
    },
    [updateParam],
  );

  const setCategory = useCallback(
    (value) => updateParam('cat', value === 'All' ? '' : value),
    [updateParam],
  );

  const reset = useCallback(() => {
    setQueryState('');
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('q');
        next.delete('cat');
        return next;
      },
      { replace: true },
    );
  }, [setParams]);

  const results = useMemo(
    () => filterEvents(allEvents, { query: debouncedQuery, category }),
    [allEvents, debouncedQuery, category],
  );

  const isFiltered = Boolean(query.trim()) || category !== 'All';
  const isPending = query !== debouncedQuery;

  return { query, setQuery, category, setCategory, reset, results, isFiltered, isPending };
}
