import { useMemo } from 'react';

/**
 * Procedural rangoli / kolam mandala. Rings of petals, lozenges and dots
 * generated from a few numbers — no external artwork. Purely decorative.
 */
function ring(count, radius, render) {
  return Array.from({ length: count }, (_, i) => render((360 / count) * i, radius, i));
}

export default function Rangoli({ className = '', palette = 'warm', size = 600 }) {
  const colors =
    palette === 'night'
      ? { a: '#F5A623', b: '#E2391B', c: '#E5197A', d: '#F6EEDF', line: '#F6EEDF' }
      : { a: '#E2391B', b: '#F5A623', c: '#1B1446', d: '#E5197A', line: '#1B1446' };

  const shapes = useMemo(
    () => (
      <>
        <circle r="292" fill="none" stroke={colors.line} strokeWidth="1.5" strokeDasharray="2 10" />
        {ring(48, 270, (deg, r) => (
          <circle key={`dot-${deg}`} cx="0" cy={-r} r="5" fill={colors.b} transform={`rotate(${deg})`} />
        ))}
        {ring(24, 230, (deg, r, i) => (
          <path
            key={`petal-${deg}`}
            d={`M0 ${-r - 34} C 22 ${-r - 6} 22 ${-r + 26} 0 ${-r + 40} C -22 ${-r + 26} -22 ${-r - 6} 0 ${-r - 34}Z`}
            fill={i % 2 ? colors.a : colors.c}
            transform={`rotate(${deg})`}
          />
        ))}
        <circle r="178" fill="none" stroke={colors.line} strokeWidth="2" />
        {ring(16, 150, (deg, r) => (
          <path
            key={`loz-${deg}`}
            d={`M0 ${-r - 26} L14 ${-r} L0 ${-r + 26} L-14 ${-r}Z`}
            fill={colors.b}
            transform={`rotate(${deg})`}
          />
        ))}
        {ring(16, 150, (deg, r) => (
          <circle key={`ld-${deg}`} cx="0" cy={-r} r="4" fill={colors.c} transform={`rotate(${deg + 11.25})`} />
        ))}
        <circle r="112" fill={colors.c} />
        {ring(12, 84, (deg, r) => (
          <path
            key={`inner-${deg}`}
            d={`M0 ${-r - 22} C 16 ${-r} 12 ${-r + 20} 0 ${-r + 30} C -12 ${-r + 20} -16 ${-r} 0 ${-r - 22}Z`}
            fill={colors.d}
            transform={`rotate(${deg})`}
          />
        ))}
        <circle r="38" fill={colors.b} />
        <circle r="16" fill={colors.a} />
      </>
    ),
    [colors.a, colors.b, colors.c, colors.d, colors.line],
  );

  return (
    <svg
      className={className}
      viewBox="-300 -300 600 600"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      {shapes}
    </svg>
  );
}
