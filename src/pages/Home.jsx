import Hero from '../components/home/Hero.jsx';
import About from '../components/home/About.jsx';
import Domains from '../components/home/Domains.jsx';
import FeaturedEvents from '../components/home/FeaturedEvents.jsx';
import RegisterCta from '../components/home/RegisterCta.jsx';
import BorderBand from '../components/decor/BorderBand.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

export default function Home() {
  useDocumentTitle('');
  return (
    <>
      <Hero />
      <About />
      <BorderBand tone="marigold" />
      <Domains />
      <FeaturedEvents />
      <RegisterCta />
    </>
  );
}
