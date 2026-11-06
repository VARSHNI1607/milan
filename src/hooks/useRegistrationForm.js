import { useCallback, useMemo, useRef, useState } from 'react';
import { FIELD_ORDER, validateRegistration, validators } from '../utils/validation.js';
import { submitRegistration, RegistrationError } from '../services/registrationApi.js';

const EMPTY = { fullName: '', email: '', college: '', phone: '', eventId: '', consent: false };

/**
 * Form state machine: idle → submitting → success | error.
 * Errors show after a field is touched (blur) or after a submit attempt,
 * then update live as the user fixes them.
 */
export function useRegistrationForm({ initialEventId = '', validEventIds = [] } = {}) {
  const [values, setValues] = useState({ ...EMPTY, eventId: initialEventId });
  const [touched, setTouched] = useState({});
  const [serverFieldErrors, setServerFieldErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [formError, setFormError] = useState('');
  const [result, setResult] = useState(null);
  const [submitCount, setSubmitCount] = useState(0);
  const inFlight = useRef(false);

  const context = useMemo(() => ({ validEventIds }), [validEventIds]);
  const clientErrors = useMemo(() => validateRegistration(values, context), [values, context]);
  const errors = useMemo(() => ({ ...clientErrors, ...serverFieldErrors }), [clientErrors, serverFieldErrors]);

  const visibleErrors = useMemo(() => {
    const shown = {};
    FIELD_ORDER.forEach((field) => {
      if ((touched[field] || submitCount > 0) && errors[field]) shown[field] = errors[field];
    });
    return shown;
  }, [errors, touched, submitCount]);

  const setField = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setServerFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
    setFormError('');
  }, []);

  const touchField = useCallback((name) => setTouched((prev) => (prev[name] ? prev : { ...prev, [name]: true })), []);

  const submit = useCallback(async () => {
    if (inFlight.current) return { ok: false, reason: 'busy' }; // duplicate-click guard
    setSubmitCount((n) => n + 1);
    const currentErrors = validateRegistration(values, context);
    const firstInvalid = FIELD_ORDER.find((f) => currentErrors[f]);
    if (firstInvalid) {
      setStatus('idle');
      return { ok: false, firstInvalid };
    }

    inFlight.current = true;
    setStatus('submitting');
    setFormError('');
    try {
      const record = await submitRegistration(values, { validEventIds });
      setResult(record);
      setStatus('success');
      return { ok: true };
    } catch (error) {
      const known = error instanceof RegistrationError;
      setServerFieldErrors(known ? error.fieldErrors : {});
      setFormError(known ? error.message : 'Something went wrong. Please try again.');
      setStatus('error');
      const first = known ? FIELD_ORDER.find((f) => error.fieldErrors[f]) : undefined;
      return { ok: false, firstInvalid: first };
    } finally {
      inFlight.current = false;
    }
  }, [values, context, validEventIds]);

  const reset = useCallback((eventId = '') => {
    setValues({ ...EMPTY, eventId });
    setTouched({});
    setServerFieldErrors({});
    setSubmitCount(0);
    setStatus('idle');
    setFormError('');
    setResult(null);
  }, []);

  return {
    values,
    errors: visibleErrors,
    hasErrors: Object.keys(errors).length > 0,
    status,
    formError,
    result,
    submitCount,
    setField,
    touchField,
    submit,
    reset,
    validateField: (name) => validators[name](values[name], context),
  };
}
