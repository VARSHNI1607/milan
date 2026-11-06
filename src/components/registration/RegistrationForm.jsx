import { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, AlertTriangle, CalendarDays, MapPin } from 'lucide-react';
import { events, CATEGORIES, getEventById } from '../../data/events.js';
import { FIELD_LIMITS } from '../../utils/validation.js';
import { useRegistrationForm } from '../../hooks/useRegistrationForm.js';
import FormField from './FormField.jsx';
import Button from '../ui/Button.jsx';
import EventArt from '../events/EventArt.jsx';
import '../../styles/components/registration.css';

const FIELD_LABELS = {
  fullName: 'Full name',
  email: 'Email address',
  college: 'College / institution',
  phone: 'Phone number',
  eventId: 'Event',
  consent: 'Demo confirmation',
};

const VALID_IDS = events.map((e) => e.id);
const GROUPED = CATEGORIES.filter((c) => c !== 'All')
  .map((category) => ({ category, items: events.filter((e) => e.category === category) }))
  .filter((group) => group.items.length);

export default function RegistrationForm({ initialEventId = '' }) {
  const startingEvent = VALID_IDS.includes(initialEventId) ? initialEventId : '';
  const form = useRegistrationForm({ initialEventId: startingEvent, validEventIds: VALID_IDS });
  const { values, errors, status, formError, result, submitCount, setField, touchField, submit, reset } = form;

  const fieldRefs = useRef({});
  const summaryRef = useRef(null);
  const successRef = useRef(null);
  const register = (name) => (el) => {
    fieldRefs.current[name] = el;
  };

  const selectedEvent = useMemo(() => getEventById(values.eventId), [values.eventId]);
  const submitting = status === 'submitting';
  const errorEntries = Object.entries(errors);

  async function handleSubmit(e) {
    e.preventDefault();
    const outcome = await submit();
    if (outcome.ok) {
      requestAnimationFrame(() => successRef.current?.focus());
    } else if (outcome.firstInvalid) {
      fieldRefs.current[outcome.firstInvalid]?.focus();
    } else if (outcome.reason !== 'busy') {
      summaryRef.current?.focus();
    }
  }

  const bind = (name) => ({
    name,
    value: values[name],
    onChange: (e) => setField(name, e.target.value),
    onBlur: () => touchField(name),
  });

  const isValid = (name) => (form.submitCount > 0 || values[name]) && !form.validateField(name);

  if (status === 'success' && result) {
    const event = getEventById(result.eventId);
    return (
      <div className="reg-success" ref={successRef} tabIndex={-1} role="status" aria-live="polite">
        <CheckCircle2 className="reg-success__icon" aria-hidden="true" />
        <p className="eyebrow">Demo registration complete</p>
        <h2 className="reg-success__title">
          You’re on the list, <span className="serif-accent">{result.fullName.split(' ')[0]}.</span>
        </h2>
        <p className="reg-success__text">
          Your demo registration for <strong>{event?.title}</strong> has been saved in this browser only.
          <strong> Nothing has been sent to SRMIST</strong> — official MILAN registrations open through the Directorate
          of Student Affairs.
        </p>
        <dl className="reg-success__ticket">
          <div>
            <dt>Reference</dt>
            <dd>{result.reference}</dd>
          </div>
          <div>
            <dt>Event</dt>
            <dd>{event?.title}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{result.email}</dd>
          </div>
          <div>
            <dt>Institution</dt>
            <dd>{result.college}</dd>
          </div>
        </dl>
        <div className="reg-success__actions">
          <Button onClick={() => reset('')}>Register for another event</Button>
          <Button to="/events" variant="secondary" icon={ArrowRight}>
            Explore events
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form className="reg-form" onSubmit={handleSubmit} noValidate aria-describedby="reg-form-note">
      <p id="reg-form-note" className="reg-form__note">
        Fields marked <span aria-hidden="true">*</span>
        <span className="visually-hidden">as required</span> are required.
      </p>

      {(formError || (submitCount > 0 && errorEntries.length > 0)) && (
        <div className="reg-form__summary" role="alert" tabIndex={-1} ref={summaryRef}>
          <AlertTriangle aria-hidden="true" />
          <div>
            <p className="reg-form__summary-title">
              {formError || `Please fix ${errorEntries.length} ${errorEntries.length === 1 ? 'field' : 'fields'} to continue.`}
            </p>
            {errorEntries.length > 0 && (
              <ul>
                {errorEntries.map(([field, message]) => (
                  <li key={field}>
                    <a
                      href={`#reg-${field}`}
                      onClick={(e) => {
                        e.preventDefault();
                        fieldRefs.current[field]?.focus();
                      }}
                    >
                      {FIELD_LABELS[field]}: {message}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <fieldset className="reg-form__fieldset" disabled={submitting}>
        <legend className="visually-hidden">Your details</legend>
        <div className="reg-form__grid">
          <FormField
            id="reg-fullName"
            label="Full name"
            error={errors.fullName}
            valid={isValid('fullName')}
            counter={`${values.fullName.length}/${FIELD_LIMITS.fullName.max}`}
            ref={register('fullName')}
          >
            {(a11y) => (
              <input {...a11y} {...bind('fullName')} type="text" autoComplete="name" maxLength={FIELD_LIMITS.fullName.max} />
            )}
          </FormField>

          <FormField
            id="reg-email"
            label="Email address"
            hint="We’ll show this on your demo confirmation."
            error={errors.email}
            valid={isValid('email')}
            ref={register('email')}
          >
            {(a11y) => (
              <input {...a11y} {...bind('email')} type="email" autoComplete="email" inputMode="email" maxLength={254} />
            )}
          </FormField>

          <FormField
            id="reg-college"
            label="College / institution"
            error={errors.college}
            valid={isValid('college')}
            counter={`${values.college.length}/${FIELD_LIMITS.college.max}`}
            ref={register('college')}
          >
            {(a11y) => (
              <input {...a11y} {...bind('college')} type="text" autoComplete="organization" maxLength={FIELD_LIMITS.college.max} />
            )}
          </FormField>

          <FormField
            id="reg-phone"
            label="Phone number"
            hint="10-digit Indian mobile. +91 is optional."
            error={errors.phone}
            valid={isValid('phone')}
            ref={register('phone')}
          >
            {(a11y) => (
              <input
                {...a11y}
                {...bind('phone')}
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="98765 43210"
                maxLength={16}
              />
            )}
          </FormField>

          <div className="reg-form__wide">
            <FormField id="reg-eventId" label="Event" error={errors.eventId} valid={isValid('eventId')} ref={register('eventId')}>
              {(a11y) => (
                <select {...a11y} {...bind('eventId')}>
                  <option value="">Choose an event…</option>
                  {GROUPED.map((group) => (
                    <optgroup key={group.category} label={group.category}>
                      {group.items.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.title}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              )}
            </FormField>

            {selectedEvent && (
              <div className="reg-form__preview" aria-live="polite">
                <div className="reg-form__preview-art">
                  <EventArt category={selectedEvent.category} variant="square" />
                </div>
                <div>
                  <p className="reg-form__preview-title">{selectedEvent.title}</p>
                  <p className="reg-form__preview-meta">
                    <CalendarDays aria-hidden="true" /> Day {selectedEvent.day} · {selectedEvent.time}
                  </p>
                  <p className="reg-form__preview-meta">
                    <MapPin aria-hidden="true" /> {selectedEvent.venue} · {selectedEvent.teamSize}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className={`reg-form__wide consent ${errors.consent ? 'has-error' : ''}`}>
            <input
              id="reg-consent"
              ref={register('consent')}
              type="checkbox"
              checked={values.consent}
              onChange={(e) => setField('consent', e.target.checked)}
              onBlur={() => touchField('consent')}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? 'reg-consent-error' : undefined}
            />
            <label htmlFor="reg-consent">
              I understand this is a <strong>demonstration</strong> — my details stay in this browser and are not sent to
              SRMIST.
            </label>
            {errors.consent && (
              <p id="reg-consent-error" className="field__error">
                {errors.consent}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      <div className="reg-form__submit">
        <Button type="submit" size="lg" loading={submitting} disabled={submitting} icon={ArrowRight}>
          {submitting ? 'Submitting…' : 'Submit registration'}
        </Button>
        <p className="reg-form__status" role="status" aria-live="polite">
          {submitting ? 'Submitting your demo registration…' : ''}
        </p>
      </div>

      <p className="reg-form__tip">
        Testing? Use an email ending in <code>@fail.test</code> to see the server-error state, or register the same
        email for the same event twice to see duplicate detection. Browse the <Link to="/events">events</Link> first if
        you’re undecided.
      </p>
    </form>
  );
}
