import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/button.css';

/**
 * One button primitive for links and actions.
 *  - `to`   → React Router <Link>
 *  - `href` → plain <a>
 *  - else   → <button>
 */
const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', to, href, icon: Icon, iconPosition = 'end', loading = false, children, className = '', ...rest },
  ref,
) {
  const classes = `btn btn--${variant} btn--${size} ${loading ? 'is-loading' : ''} ${className}`.trim();
  const inner = (
    <>
      {Icon && iconPosition === 'start' && <Icon className="btn__icon" aria-hidden="true" />}
      <span className="btn__label">{children}</span>
      {Icon && iconPosition === 'end' && <Icon className="btn__icon" aria-hidden="true" />}
      {loading && <span className="btn__spinner" aria-hidden="true" />}
    </>
  );

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...rest}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a ref={ref} href={href} className={classes} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button ref={ref} type="button" className={classes} aria-busy={loading || undefined} {...rest}>
      {inner}
    </button>
  );
});

export default Button;
