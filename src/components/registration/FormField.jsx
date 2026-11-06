import { forwardRef } from 'react';
import { AlertCircle, Check } from 'lucide-react';

/**
 * Label + control + hint + error, wired together with aria-describedby
 * and aria-invalid. `children` is a render function receiving the
 * accessibility props so it can wrap <input>, <select>, etc.
 */
const FormField = forwardRef(function FormField(
  { id, label, hint, error, valid, required = true, counter, children },
  ref,
) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`field ${error ? 'has-error' : ''} ${valid ? 'is-valid' : ''}`}>
      <div className="field__label-row">
        <label htmlFor={id} className="field__label">
          {label}
          {required && (
            <span className="field__required" aria-hidden="true">
              *
            </span>
          )}
        </label>
        {counter && <span className="field__counter">{counter}</span>}
      </div>
      <div className="field__control">
        {children({ id, ref, 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy, 'aria-required': required || undefined })}
        {valid && !error && <Check className="field__ok" aria-hidden="true" />}
      </div>
      {hint && !error && (
        <p id={hintId} className="field__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="field__error">
          <AlertCircle aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  );
});

export default FormField;
