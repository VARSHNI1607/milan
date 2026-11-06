import { ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import Rangoli from '../components/decor/Rangoli.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import '../styles/components/not-found.css';

export default function NotFound() {
  useDocumentTitle('Page not found');
  return (
    <section className="not-found container">
      <Rangoli className="not-found__art" size={240} />
      <p className="eyebrow">Error 404</p>
      <h1 className="not-found__title">
        Wrong turn at <span className="serif-accent">the pandal.</span>
      </h1>
      <p className="lead">The page you’re looking for doesn’t exist. The festival is this way.</p>
      <div className="not-found__actions">
        <Button to="/" icon={ArrowRight}>Back home</Button>
        <Button to="/events" variant="secondary">Browse events</Button>
      </div>
    </section>
  );
}
