import { memo, useId } from 'react';
import { getCategoryStyle } from '../../data/categoryStyles.js';
import { getCategoryIcon } from './categoryIcons.js';
import '../../styles/components/event-art.css';

/** Block-print pattern tiles. Each is a 24×24 SVG pattern cell. */
function PatternCell({ kind, ink }) {
  switch (kind) {
    case 'chevron':
      return <path d="M0 16 L6 8 L12 16 L18 8 L24 16" fill="none" stroke={ink} strokeWidth="2.5" />;
    case 'wave':
      return (
        <>
          <rect x="3" y="4" width="2" height="16" fill={ink} />
          <rect x="9" y="8" width="2" height="8" fill={ink} />
          <rect x="15" y="2" width="2" height="20" fill={ink} />
          <rect x="21" y="9" width="2" height="6" fill={ink} />
        </>
      );
    case 'diamond':
      return <path d="M12 2 L22 12 L12 22 L2 12Z" fill="none" stroke={ink} strokeWidth="2" />;
    case 'buti':
      return (
        <g fill={ink}>
          <circle cx="12" cy="7" r="3" />
          <circle cx="12" cy="17" r="3" />
          <circle cx="7" cy="12" r="3" />
          <circle cx="17" cy="12" r="3" />
          <circle cx="0" cy="0" r="1.6" />
          <circle cx="24" cy="24" r="1.6" />
        </g>
      );
    case 'kolam':
      return (
        <>
          <circle cx="6" cy="6" r="1.8" fill={ink} />
          <circle cx="18" cy="18" r="1.8" fill={ink} />
          <path d="M6 6 C 14 -2 26 10 18 18 C 10 26 -2 14 6 6Z" fill="none" stroke={ink} strokeWidth="1.5" />
        </>
      );
    case 'lines':
      return (
        <>
          <rect y="6" width="24" height="1.5" fill={ink} />
          <rect y="16" width="16" height="1.5" fill={ink} />
        </>
      );
    case 'grid':
    default:
      return (
        <>
          <path d="M0 12 H8 V4 H16" fill="none" stroke={ink} strokeWidth="1.5" />
          <circle cx="16" cy="4" r="2" fill={ink} />
          <circle cx="20" cy="18" r="1.5" fill={ink} />
        </>
      );
  }
}

/** Jharokha — an Indian arched window. The frame every poster shares. */
const ARCH = 'M30 200 V92 C30 56 56 38 80 32 C88 18 92 12 100 6 C108 12 112 18 120 32 C144 38 170 56 170 92 V200Z';

/**
 * Poster artwork for an event or category. If the event has a licensed
 * `image`, it is shown inside the same arch with a consistent duotone
 * treatment; otherwise the illustrated poster is drawn.
 */
function EventArt({ category, image, imageAlt = '', variant = 'card', label }) {
  const uid = useId().replace(/:/g, '');
  const style = getCategoryStyle(category);
  const Icon = getCategoryIcon(category);
  const patternId = `pat-${uid}`;

  return (
    <div
      className={`event-art event-art--${variant}`}
      style={{ '--art-bg': style.bg, '--art-ink': style.ink, '--art-frame': style.frame, '--art-text': style.text }}
    >
      <svg className="event-art__pattern" aria-hidden="true" focusable="false">
        <defs>
          <pattern id={patternId} width="24" height="24" patternUnits="userSpaceOnUse">
            <PatternCell kind={style.pattern} ink={style.ink} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      <svg className="event-art__window" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
        <path d={ARCH} fill={style.bg} stroke={style.frame} strokeWidth="5" />
        <path d={ARCH} fill="none" stroke={style.frame} strokeWidth="1.5" transform="translate(100 112) scale(.86) translate(-100 -112)" />
      </svg>

      {image ? (
        <img
          className="event-art__photo"
          src={image}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <Icon className="event-art__icon" aria-hidden="true" strokeWidth={1.5} />
      )}

      {label && <span className="event-art__label">{label}</span>}
    </div>
  );
}

export default memo(EventArt);
