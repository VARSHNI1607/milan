import { useCallback } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

/**
 * The event detail modal is driven by the URL (?event=<id>):
 * - links to an event are shareable and survive refresh,
 * - the browser Back button closes the modal,
 * - an unknown id shows a "not found" state instead of crashing.
 */
export function useEventModal() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const openEventId = params.get('event');

  const openEvent = useCallback(
    (id) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set('event', id);
          return next;
        },
        { state: { modalFromApp: true } },
      );
    },
    [setParams],
  );

  const closeEvent = useCallback(() => {
    // If we pushed the entry ourselves, go back so history stays clean.
    if (location.state?.modalFromApp) {
      navigate(-1);
      return;
    }
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('event');
        return next;
      },
      { replace: true },
    );
  }, [location.state, navigate, setParams]);

  return { openEventId, openEvent, closeEvent };
}
