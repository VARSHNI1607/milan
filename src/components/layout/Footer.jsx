import { Link } from 'react-router-dom';
import { AtSign, Phone, ExternalLink } from 'lucide-react';
import { KolamMark } from './Logo.jsx';
import BorderBand from '../decor/BorderBand.jsx';
import { festival, socialLinks, contact, sources } from '../../data/festival.js';
import '../../styles/components/footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" data-shell>
      <BorderBand tone="vermilion" />
      <div className="footer__inner container">
        <div className="footer__brand">
          <KolamMark className="footer__mark" />
          <p className="footer__wordmark" aria-hidden="true">
            MILAN
          </p>
          <p className="footer__org">
            The national-level cultural festival of {festival.institution}, {festival.campus}. Organised by the{' '}
            <a href={contact.dsaPage} target="_blank" rel="noreferrer">
              {festival.organiser}
            </a>
            .
          </p>
        </div>

        <nav className="footer__col" aria-label="Footer">
          <h2 className="footer__heading">Explore</h2>
          <ul role="list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/#about">About MILAN</Link></li>
            <li><Link to="/#domains">Domains</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </nav>

        <div className="footer__col">
          <h2 className="footer__heading">Official channels</h2>
          <ul role="list">
            {socialLinks.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer" aria-label={`${s.label} (opens in new tab)`}>
                  <AtSign aria-hidden="true" /> {s.handle} · Instagram
                </a>
              </li>
            ))}
            {contact.phones.map((p) => (
              <li key={p}>
                <a href={`tel:${p.replace(/-/g, '')}`}>
                  <Phone aria-hidden="true" /> {p}
                </a>
              </li>
            ))}
          </ul>
          <p className="footer__small">Phone numbers are the {contact.label}, as listed on srmist.edu.in.</p>
        </div>

        <div className="footer__col">
          <h2 className="footer__heading">Sources</h2>
          <ul role="list">
            {sources.map((s) => (
              <li key={s.id}>
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.label} <ExternalLink aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>© {year} Directorate of Student Affairs, SRMIST. MILAN is a festival of SRM Institute of Science and Technology.</p>
        <p>
          Demonstration website built for the DSA Tech Team recruitment task — not the official MILAN site. Sample events
          and registrations are illustrative only.
        </p>
      </div>
    </footer>
  );
}
