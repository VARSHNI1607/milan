import { useCountUp } from '../../hooks/useCountUp.js';

const format = new Intl.NumberFormat('en-IN');

export default function StatCounter({ value, suffix, label }) {
  const [ref, current] = useCountUp(value);
  return (
    <div className="stat" ref={ref}>
      <p className="stat__value">
        {/* Screen readers get the final number, not the animation. */}
        <span aria-hidden="true">
          {format.format(current)}
          {suffix}
        </span>
        <span className="visually-hidden">
          {format.format(value)}
          {suffix}
        </span>
      </p>
      <p className="stat__label">{label}</p>
    </div>
  );
}
