import { describe, it, expect } from 'vitest';
import { submitRegistration } from './registrationApi.js';

function memoryStorage() {
  const store = {};
  return { getItem: (k) => store[k] ?? null, setItem: (k, v) => { store[k] = v; } };
}

const values = {
  fullName: 'Kavya Nair',
  email: 'kavya@college.edu',
  college: 'Some College',
  phone: '9876543210',
  eventId: 'skyward',
  consent: true,
};
const opts = (storage) => ({ storage, latency: 0, validEventIds: ['skyward'] });

describe('mock registration API', () => {
  it('stores a valid registration and returns a demo reference', async () => {
    const storage = memoryStorage();
    const record = await submitRegistration(values, opts(storage));
    expect(record.reference).toMatch(/^DEMO-/);
  });

  it('rejects duplicate email + event with 409', async () => {
    const storage = memoryStorage();
    await submitRegistration(values, opts(storage));
    await expect(submitRegistration(values, opts(storage))).rejects.toMatchObject({ status: 409 });
  });

  it('re-validates on the server side with 422', async () => {
    await expect(submitRegistration({ ...values, email: 'bad' }, opts(memoryStorage()))).rejects.toMatchObject({ status: 422 });
  });

  it('simulates server failure for @fail.test emails', async () => {
    await expect(submitRegistration({ ...values, email: 'x@fail.test' }, opts(memoryStorage()))).rejects.toMatchObject({ status: 500 });
  });
});
