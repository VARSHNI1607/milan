import Hero from '../components/home/Hero.jsx';
import About from '../components/home/About.jsx';
import Domains from '../components/home/Domains.jsx';
import FeaturedEvents from '../components/home/FeaturedEvents.jsx';
import RegisterCta from '../components/home/RegisterCta.jsx';
import MemoriesGallery from '../components/home/MemoriesGallery.jsx';
import KineticBand from '../components/motion/KineticBand.jsx';
import BorderBand from '../components/decor/BorderBand.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

export default function Home() {
  useDocumentTitle('');
  return (
    <>
      <Hero />
      <About />
      <KineticBand />
      <BorderBand tone="marigold" />
      <Domains />
      <MemoriesGallery />
      <FeaturedEvents />
      <RegisterCta />
    </>
  );
}
