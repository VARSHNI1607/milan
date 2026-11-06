/**
 * The MILAN sunburst: eight kolam petals around a centre dot. Petals carry
 * a class so intro/transition timelines can animate them individually.
 */
export default function Sunburst({ className = '', centre = 'currentColor' }) {
  return (
    <svg className={className} viewBox="-32 -32 64 64" aria-hidden="true" focusable="false">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
        <g key={deg} transform={`rotate(${deg})`}>
          <path
            className="sunburst__petal"
            d="M0-28 7-10 0-2-7-10Z"
            fill={i % 2 ? 'var(--c-marigold)' : 'var(--c-vermilion)'}
          />
        </g>
      ))}
      <circle className="sunburst__centre" r="6" fill={centre} />
    </svg>
  );
}
