import { useId, useRef } from 'react';
import { useDrift } from '../../motion/useDrift.js';

/**
 * A toran — the festive string of mango leaves and marigolds hung over
 * doorways. Drawn as one repeating SVG pattern so it stretches to any width.
 */
export default function Toran({ className = '', tone = 'light' }) {
  const id = `p${useId().replace(/:/g, '')}`;
  const ref = useRef(null);
  useDrift(ref, 64 * 3, { direction: 1 });
  const leaf = tone === 'dark' ? '#F5A623' : '#E2391B';
  const flower = tone === 'dark' ? '#E2391B' : '#F5A623';
  const string = tone === 'dark' ? '#F6EEDF' : '#1B1446';

  return (
    <div ref={ref} className={`toran ${className}`} aria-hidden="true">
    <svg width="100%" height="56" focusable="false" style={{ width: 'calc(100% + 192px)' }}>
      <defs>
        <pattern id={id} width="64" height="56" patternUnits="userSpaceOnUse">
          <path d="M0 6 Q16 14 32 6 T64 6" fill="none" stroke={string} strokeWidth="1.5" />
          <path d="M16 10 C26 22 24 38 16 50 C8 38 6 22 16 10Z" fill={leaf} />
          <path d="M16 14 L16 46" stroke={string} strokeOpacity=".35" strokeWidth="1" />
          <circle cx="48" cy="16" r="7" fill={flower} />
          <circle cx="48" cy="16" r="2.5" fill={leaf} />
          <circle cx="48" cy="28" r="4" fill={flower} />
        </pattern>
      </defs>
      <rect width="100%" height="56" fill={`url(#${id})`} />
    </svg>
    </div>
  );
}
