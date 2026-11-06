import { describe, it, expect } from 'vitest';
import { validators, validateRegistration, normalisePhone } from './validation.js';

const valid = {
  fullName: 'Ananya Iyer',
  email: 'ananya@college.edu',
  college: 'SRM Institute of Science and Technology',
  phone: '+91 98765 43210',
  eventId: 'rangmanch',
  consent: true,
};

describe('validateRegistration', () => {
  it('accepts a fully valid form', () => {
    expect(validateRegistration(valid, { validEventIds: ['rangmanch'] })).toEqual({});
  });

  it('flags every required field when empty', () => {
    const errors = validateRegistration({}, {});
    expect(Object.keys(errors)).toEqual(['fullName', 'email', 'college', 'phone', 'eventId', 'consent']);
  });
});

describe('field validators', () => {
  it('validates name length and characters', () => {
    expect(validators.fullName('A')).toMatch(/at least 2/);
    expect(validators.fullName('x'.repeat(61))).toMatch(/60/);
    expect(validators.fullName('R2D2')).toMatch(/letters/);
    expect(validators.fullName("Ravi O'Neil-Kumar")).toBe('');
    expect(validators.fullName('தமிழ் செல்வி')).toBe('');
  });

  it('validates email format', () => {
    expect(validators.email('not-an-email')).toMatch(/valid email/);
    expect(validators.email('a@b')).toMatch(/valid email/);
    expect(validators.email('a b@c.com')).toMatch(/valid email/);
    expect(validators.email('student@srmist.edu.in')).toBe('');
  });

  it('validates Indian mobile numbers', () => {
    expect(validators.phone('12345')).toMatch(/10-digit/);
    expect(validators.phone('5123456789')).toMatch(/start with/);
    expect(validators.phone('98765abc10')).toMatch(/digits/);
    expect(validators.phone('9876543210')).toBe('');
    expect(validators.phone('+91-98765-43210')).toBe('');
    expect(validators.phone('09876543210')).toBe('');
  });

  it('normalises phone prefixes', () => {
    expect(normalisePhone('+91 98765 43210')).toBe('9876543210');
    expect(normalisePhone('919876543210')).toBe('9876543210');
  });

  it('rejects unknown events', () => {
    expect(validators.eventId('')).toMatch(/choose/);
    expect(validators.eventId('ghost', { validEventIds: ['rangmanch'] })).toMatch(/not available/);
  });
});
