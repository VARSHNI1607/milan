import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import ScrollManager from './ScrollManager.jsx';
import IntroSequence from '../motion/IntroSequence.jsx';
import CursorFollower from '../motion/CursorFollower.jsx';
import PageTransition from '../motion/PageTransition.jsx';

export default function Layout({ playIntro = false }) {
  return (
    <>
      <a href="#main" className="skip-link" data-shell>
        Skip to content
      </a>
      <ScrollManager />
      <Navbar />
      <main id="main" tabIndex={-1} style={{ outline: 'none' }} data-shell>
        <Outlet />
      </main>
      <Footer />
      {playIntro && <IntroSequence />}
      <PageTransition />
      <CursorFollower />
    </>
  );
}
