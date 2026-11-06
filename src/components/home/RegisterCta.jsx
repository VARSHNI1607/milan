import { ArrowUpRight } from 'lucide-react';
import Button from '../ui/Button.jsx';
import Toran from '../decor/Toran.jsx';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import '../../styles/components/register-cta.css';

export default function RegisterCta() {
  const ref = useScrollReveal();
  return (
    <section className="register-cta" aria-labelledby="register-cta-title" ref={ref}>
      <Toran tone="dark" />
      <div className="container register-cta__inner">
        <p className="eyebrow reveal">04 — Get started</p>
        <h2 id="register-cta-title" className="register-cta__title reveal">
          Your city. Your college. <span className="serif-accent">Your stage.</span>
        </h2>
        <p className="register-cta__text reveal">
          Pick an event, register in under a minute, and get a confirmation reference — a demonstration of how
          signing up for MILAN could feel.
        </p>
        <div className="register-cta__actions reveal">
          <Button to="/register" size="lg" variant="marigold" className="btn--on-dark" icon={ArrowUpRight}>
            Start registration
          </Button>
          <Button to="/events" size="lg" variant="secondary" className="btn--on-dark">
            Browse events first
          </Button>
        </div>
      </div>
    </section>
  );
}
