import '../../styles/components/marquee.css';

/**
 * Infinite ticker. The list is rendered twice and translated by -50%,
 * so the loop is seamless. The duplicate is hidden from assistive tech,
 * and motion stops under prefers-reduced-motion.
 */
export default function Marquee({ items, tone = 'indigo', speed = 40 }) {
  const content = (hidden) => (
    <ul className="marquee__group" role="list" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="marquee__item">
          <span>{item}</span>
          <svg viewBox="-10 -10 20 20" width="18" height="18" aria-hidden="true" focusable="false">
            <path d="M0-9 3-3 9 0 3 3 0 9-3 3-9 0-3-3Z" fill="currentColor" />
          </svg>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`marquee marquee--${tone}`} style={{ '--marquee-speed': `${speed}s` }}>
      <div className="marquee__track">
        {content(false)}
        {content(true)}
      </div>
    </div>
  );
}
