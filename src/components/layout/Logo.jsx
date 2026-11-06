import { Link } from 'react-router-dom';
import '../../styles/components/logo.css';

/** MILAN wordmark: an eight-petal kolam mark + condensed display type. */
export function KolamMark({ className = '' }) {
  return (
    <svg className={className} viewBox="-32 -32 64 64" aria-hidden="true" focusable="false">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
        <path
          key={deg}
          d="M0-28 7-10 0-2-7-10Z"
          fill={i % 2 ? 'var(--c-marigold)' : 'var(--c-vermilion)'}
          transform={`rotate(${deg})`}
        />
      ))}
      <circle r="6" fill="currentColor" />
    </svg>
  );
}

export default function Logo({ onClick }) {
  return (
    <Link to="/" className="logo" aria-label="MILAN home" onClick={onClick}>
      <KolamMark className="logo__mark" />
      <span className="logo__word">MILAN</span>
      <span className="logo__sub" aria-hidden="true">
        SRMIST
      </span>
    </Link>
  );
}
