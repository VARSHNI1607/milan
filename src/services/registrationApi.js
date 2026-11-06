/**
 * MOCK REGISTRATION API
 *
 * There is no backend for this assignment, so this module stands in for one.
 * It simulates network latency, server-side validation, duplicate detection
 * and failures. Registrations are kept in this browser's localStorage only —
 * nothing is sent to SRMIST.
 *
 * Demo hooks:
 *  - Any email ending in "@fail.test" simulates a server error (HTTP 500).
 *  - Registering the same email for the same event twice returns 409.
 */
import { validateRegistration, normalisePhone } from '../utils/validation.js';

const STORAGE_KEY = 'milan-demo-registrations';
const LATENCY_MS = 1200;

export class RegistrationError extends Error {
  constructor(message, { status, fieldErrors } = {}) {
    super(message);
    this.name = 'RegistrationError';
    this.status = status;
    this.fieldErrors = fieldErrors ?? {};
  }
}

function safeRead(storage) {
  try {
    const parsed = JSON.parse(storage?.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function safeWrite(storage, records) {
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    /* Storage unavailable (private mode) — the demo still completes. */
  }
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function makeReference() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let ref = '';
  for (let i = 0; i < 6; i += 1) ref += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `DEMO-${ref}`;
}

export async function submitRegistration(
  values,
  {
    validEventIds = [],
    latency = LATENCY_MS,
    storage = typeof window !== 'undefined' ? window.localStorage : undefined,
  } = {},
) {
  await wait(latency);

  // The "server" re-validates — never trust the client alone.
  const fieldErrors = validateRegistration(values, { validEventIds });
  if (Object.keys(fieldErrors).length) {
    throw new RegistrationError('Some details need fixing.', { status: 422, fieldErrors });
  }

  const email = values.email.trim().toLowerCase();
  if (email.endsWith('@fail.test')) {
    throw new RegistrationError('The demo server could not be reached. Please try again.', { status: 500 });
  }

  const records = safeRead(storage);
  const duplicate = records.some((r) => r.email === email && r.eventId === values.eventId);
  if (duplicate) {
    throw new RegistrationError('This email is already registered for that event in this demo.', {
      status: 409,
      fieldErrors: { email: 'Already registered for this event (demo).' },
    });
  }

  const record = {
    reference: makeReference(),
    fullName: values.fullName.trim(),
    email,
    college: values.college.trim(),
    phone: normalisePhone(values.phone),
    eventId: values.eventId,
    createdAt: new Date().toISOString(),
  };
  safeWrite(storage, [...records, record]);
  return record;
}
