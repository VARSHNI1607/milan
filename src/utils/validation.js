/**
 * Registration validation — pure functions so they are easy to unit test
 * and reuse (on blur, on change after first touch, and on submit).
 */

export const FIELD_LIMITS = {
  fullName: { min: 2, max: 60 },
  college: { min: 3, max: 100 },
};

const NAME_PATTERN = /^[\p{L}][\p{L}\p{M}\s.'-]*$/u;
// Pragmatic email check: local@domain.tld, no spaces, tld ≥ 2 chars.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/** Strips spaces, dashes, brackets and an optional +91 / 0 prefix. */
export function normalisePhone(raw) {
  let digits = String(raw ?? '').replace(/[\s\-()]/g, '');
  if (digits.startsWith('+91')) digits = digits.slice(3);
  else if (digits.startsWith('91') && digits.length === 12) digits = digits.slice(2);
  else if (digits.startsWith('0') && digits.length === 11) digits = digits.slice(1);
  return digits;
}

export const validators = {
  fullName(value) {
    const v = String(value ?? '').trim();
    if (!v) return 'Please enter your full name.';
    if (v.length < FIELD_LIMITS.fullName.min) return 'Name must be at least 2 characters.';
    if (v.length > FIELD_LIMITS.fullName.max) return 'Name must be 60 characters or fewer.';
    if (!NAME_PATTERN.test(v)) return 'Use letters, spaces, dots, hyphens or apostrophes only.';
    return '';
  },
  email(value) {
    const v = String(value ?? '').trim();
    if (!v) return 'Please enter your email address.';
    if (v.length > 254) return 'Email address is too long.';
    if (!EMAIL_PATTERN.test(v)) return 'Enter a valid email, like name@college.edu.';
    return '';
  },
  college(value) {
    const v = String(value ?? '').trim();
    if (!v) return 'Please enter your college or institution.';
    if (v.length < FIELD_LIMITS.college.min) return 'Institution name must be at least 3 characters.';
    if (v.length > FIELD_LIMITS.college.max) return 'Institution name must be 100 characters or fewer.';
    return '';
  },
  phone(value) {
    const raw = String(value ?? '').trim();
    if (!raw) return 'Please enter your phone number.';
    if (/[^\d\s\-+()]/.test(raw)) return 'Phone number can only contain digits.';
    const digits = normalisePhone(raw);
    if (!/^\d{10}$/.test(digits)) return 'Enter a 10-digit Indian mobile number.';
    if (!/^[6-9]/.test(digits)) return 'Indian mobile numbers start with 6, 7, 8 or 9.';
    return '';
  },
  eventId(value, { validEventIds = [] } = {}) {
    if (!value) return 'Please choose an event.';
    if (validEventIds.length && !validEventIds.includes(value)) return 'That event is not available.';
    return '';
  },
  consent(value) {
    return value ? '' : 'Please confirm you understand this is a demo registration.';
  },
};

export const FIELD_ORDER = ['fullName', 'email', 'college', 'phone', 'eventId', 'consent'];

/** Validates every field; returns { fieldName: message } for failures only. */
export function validateRegistration(values, context = {}) {
  return FIELD_ORDER.reduce((errors, field) => {
    const message = validators[field](values[field], context);
    if (message) errors[field] = message;
    return errors;
  }, {});
}
