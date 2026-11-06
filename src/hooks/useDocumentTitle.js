import { useEffect } from 'react';

const BASE = 'MILAN · Culture in Motion — SRMIST';

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — MILAN, SRMIST` : BASE;
  }, [title]);
}
