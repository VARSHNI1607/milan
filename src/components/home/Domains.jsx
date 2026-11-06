import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { domains, sources } from '../../data/festival.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import EventArt from '../events/EventArt.jsx';
import '../../styles/components/domains.css';

const wiki = sources.find((s) => s.id === 'wikipedia');

export default function Domains() {
  const ref = useScrollReveal();

  return (
    <section id="domains" className="domains section" aria-labelledby="domains-title" ref={ref}>
      <div className="container">
        <header className="domains__head">
          <div className="reveal">
            <p className="eyebrow">02 — Festival highlights</p>
            <h2 id="domains-title" className="section-title">
              Nine worlds, <span className="serif-accent">one festival.</span>
            </h2>
          </div>
          <p className="lead reveal" style={{ '--reveal-delay': '100ms' }}>
            MILAN’26 listed 40+ events across dance, music, gaming, fashion, dramatics and more. The formats below are
            drawn from documented past editions{' '}
            <a href={wiki.url} target="_blank" rel="noreferrer">
              (Wikipedia)
            </a>
            ; each year’s exact line-up is set by the organisers.
          </p>
        </header>

        <ol role="list" className="domains__list">
          {domains.map((domain, i) => {
            const content = (
              <>
                <span className="domains__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="domains__name">{domain.name}</span>
                <span className="domains__note">{domain.note}</span>
                <span className="domains__thumb" aria-hidden="true">
                  {domain.category && <EventArt category={domain.category} variant="square" />}
                </span>
                {domain.category && <ArrowRight className="domains__arrow" aria-hidden="true" />}
              </>
            );
            return (
              <li key={domain.id} className="domains__item reveal" style={{ '--reveal-delay': `${i * 40}ms` }}>
                {domain.category ? (
                  <Link
                    to={`/events?cat=${encodeURIComponent(domain.category)}`}
                    className="domains__row"
                    aria-label={`${domain.name}: ${domain.note} See sample ${domain.category} events.`}
                  >
                    {content}
                  </Link>
                ) : (
                  <div className="domains__row">{content}</div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
