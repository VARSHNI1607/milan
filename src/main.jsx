import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { MotionProvider } from './motion/MotionProvider.jsx';
import { shouldPlayIntro } from './motion/intro.js';
// Self-hosted fonts (no third-party requests; only used weights/subsets ship)
import '@fontsource-variable/bricolage-grotesque/opsz.css';
import '@fontsource/hanken-grotesk/400.css';
import '@fontsource/hanken-grotesk/500.css';
import '@fontsource/hanken-grotesk/600.css';
import '@fontsource/hanken-grotesk/700.css';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource/tiro-devanagari-hindi/devanagari-400.css';
import './styles/global.css';

// Decided once, before first render, so the hero knows whether to wait.
const playIntro = shouldPlayIntro();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MotionProvider initialIntroDone={!playIntro}>
        <App playIntro={playIntro} />
      </MotionProvider>
    </BrowserRouter>
  </StrictMode>,
);
