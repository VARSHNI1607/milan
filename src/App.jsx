import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import Events from './pages/Events.jsx';
import Register from './pages/Register.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App({ playIntro = false }) {
  return (
    <Routes>
      <Route element={<Layout playIntro={playIntro} />}>
        <Route index element={<Home />} />
        <Route path="events" element={<Events />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
