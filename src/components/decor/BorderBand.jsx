import { useId, useRef } from 'react';
import { useDrift } from '../../motion/useDrift.js';

/**
 * A saree-border style band used as a section divider: a row of temple-
 * spire triangles between two rules, with dots. Repeating pattern, any width.
 */
const TONES = {
  vermilion: { bg: '#E2391B', fg: '#F5A623', dot: '#F6EEDF' },
  indigo: { bg: '#1B1446', fg: '#F5A623', dot: '#E2391B' },
  marigold: { bg: '#F5A623', fg: '#1B1446', dot: '#E2391B' },
};

export default function BorderBand({ tone = 'vermilion', className = '', direction = -1 }) {
  const ref = useRef(null);
  useDrift(ref, 28 * 8, { direction });
  const { bg, fg, dot } = TONES[tone] ?? TONES.vermilion;
  const id = `p${useId().replace(/:/g, '')}`;
  return (
    <div ref={ref} className={`border-band ${className}`} aria-hidden="true">
      <svg width="100%" height="34" focusable="false" style={{ width: 'calc(100% + 224px)' }}>
        <defs>
          <pattern id={id} width="28" height="34" patternUnits="userSpaceOnUse">
            <rect width="28" height="34" fill={bg} />
            <rect y="3" width="28" height="2" fill={fg} />
            <rect y="29" width="28" height="2" fill={fg} />
            <path d="M2 27 L14 9 L26 27Z" fill={fg} />
            <path d="M9 27 L14 19 L19 27Z" fill={bg} />
            <circle cx="0" cy="20" r="2.2" fill={dot} />
            <circle cx="28" cy="20" r="2.2" fill={dot} />
          </pattern>
        </defs>
        <rect width="100%" height="34" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}
