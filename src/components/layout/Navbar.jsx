import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Logo from './Logo.jsx';
import Toran from '../decor/Toran.jsx';
import Button from '../ui/Button.jsx';
import { useScrollDirection } from '../../hooks/useScrollDirection.js';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock.js';
import { useFocusTrap } from '../../hooks/useFocusTrap.js';
import { festival } from '../../data/festival.js';
import '../../styles/components/navbar.css';

const LINKS = [
  { label: 'Home', to: '/', section: 'top' },
  { label: 'About', to: '/#about', section: 'about' },
  { label: 'Events', to: '/events' },
];

/** On the home page, reports whether the About section is in view. */
function useHomeSection(enabled) {
  const [section, setSection] = useState('top');
  useEffect(() => {
    if (!enabled) return undefined;
    const about = document.getElementById('about');
    if (!about || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setSection(entry.isIntersecting ? 'about' : 'top'),
      { rootMargin: '-45% 0px -45% 0px' },
    );
    observer.observe(about);
    return () => observer.disconnect();
  }, [enabled]);
  return enabled ? section : null;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { scrolled, hidden } = useScrollDirection();
  const homeSection = useHomeSection(pathname === '/');
  const toggleRef = useRef(null);

  useBodyScrollLock(open);
  const panelRef = useFocusTrap(open, { onEscape: () => setOpen(false) });

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Close if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  function isActive(link) {
    if (link.section) return pathname === '/' && homeSection === link.section;
    return pathname.startsWith(link.to);
  }

  const close = () => setOpen(false);

  return (
    <header
      className={`navbar ${scrolled ? 'is-scrolled' : ''} ${hidden && !open ? 'is-hidden' : ''}`}
      data-open={open || undefined}
    >
      <div className="navbar__inner container">
        <Logo onClick={close} />

        <nav className="navbar__desktop" aria-label="Primary">
          <ul role="list" className="navbar__links">
            {LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className={`navbar__link ${isActive(link) ? 'is-active' : ''}`}
                  aria-current={isActive(link) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button to="/register" size="sm" icon={ArrowUpRight}>
            Register
          </Button>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="navbar__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span>{open ? 'Close' : 'Menu'}</span>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        className="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
      >
        <Toran tone="dark" className="mobile-menu__toran" />
        <nav aria-label="Mobile">
          <ol role="list" className="mobile-menu__list">
            {[...LINKS, { label: 'Register', to: '/register' }].map((link, i) => (
              <li key={link.label} style={{ '--i': i }}>
                <NavLink
                  to={link.to}
                  onClick={close}
                  className={() => `mobile-menu__link ${isActive(link) ? 'is-active' : ''}`}
                  aria-current={isActive(link) ? 'page' : undefined}
                >
                  <span className="mobile-menu__num">0{i + 1}</span>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ol>
        </nav>
        <p className="mobile-menu__note">
          {festival.latestEdition.label} · {festival.latestEdition.theme}
        </p>
        <button type="button" className="mobile-menu__close" onClick={close}>
          Close menu <X aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
