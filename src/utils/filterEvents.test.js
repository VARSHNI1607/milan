import { describe, it, expect } from 'vitest';
import { filterEvents, countByCategory, normalise } from './filterEvents.js';
import { events, getEventById, CATEGORIES } from '../data/events.js';

describe('event data', () => {
  it('has at least six events with unique ids and valid categories', () => {
    expect(events.length).toBeGreaterThanOrEqual(6);
    const ids = new Set(events.map((e) => e.id));
    expect(ids.size).toBe(events.length);
    events.forEach((e) => expect(CATEGORIES).toContain(e.category));
  });

  it('every event has the same shape', () => {
    const keys = ['id', 'title', 'category', 'tagline', 'description', 'details', 'day', 'time', 'venue', 'format', 'teamSize', 'duration', 'rules', 'keywords'];
    events.forEach((e) => keys.forEach((k) => expect(e).toHaveProperty(k)));
  });

  it('getEventById returns undefined for unknown ids', () => {
    expect(getEventById('does-not-exist')).toBeUndefined();
    expect(getEventById('')).toBeUndefined();
    expect(getEventById('rangmanch').title).toBe('Rangmanch');
  });
});

describe('filterEvents', () => {
  it('returns everything with no query and category All', () => {
    expect(filterEvents(events)).toHaveLength(events.length);
  });

  it('filters by category', () => {
    const result = filterEvents(events, { category: 'Dance' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach((e) => expect(e.category).toBe('Dance'));
  });

  it('searches title, description and keywords case-insensitively', () => {
    expect(filterEvents(events, { query: 'JUGALBANDI' }).map((e) => e.id)).toContain('jugalbandi-jam');
    expect(filterEvents(events, { query: 'esports' }).map((e) => e.id)).toEqual(['respawn-arena']);
  });

  it('combines search and category', () => {
    const tamilDrama = filterEvents(events, { query: 'tamil', category: 'Drama' });
    expect(tamilDrama.map((e) => e.id)).toEqual(['rangmanch']);
    const tamilLiterary = filterEvents(events, { query: 'tamil', category: 'Literary' });
    expect(tamilLiterary.map((e) => e.id)).toEqual(['vaad-vivaad']);
  });

  it('uses AND semantics for multi-word queries', () => {
    expect(filterEvents(events, { query: 'tamil debate' }).map((e) => e.id)).toEqual(['vaad-vivaad']);
  });

  it('returns empty array for no matches and for bad input', () => {
    expect(filterEvents(events, { query: 'zzzz-no-match' })).toEqual([]);
    expect(filterEvents(null, { query: 'x' })).toEqual([]);
    expect(filterEvents([], {})).toEqual([]);
  });

  it('normalises apostrophes and whitespace', () => {
    expect(normalise("  Ramp   Raga’s ")).toBe('ramp ragas');
  });

  it('counts per category', () => {
    const counts = countByCategory(events);
    expect(counts.All).toBe(events.length);
    expect(counts.Technical).toBe(2);
  });
});
