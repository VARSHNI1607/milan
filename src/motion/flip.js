/**
 * Hand-off for the card → modal "expand" transition. The card records its
 * poster element and where it was on screen; the modal reads it once on
 * open. Kept outside React state so it never causes a render.
 */
let origin = null;

export function setFlipOrigin(element) {
  origin = element ? { element, rect: element.getBoundingClientRect(), at: performance.now() } : null;
}

/** Returns the origin only if it was set in the last second (i.e. by a click). */
export function takeFlipOrigin() {
  const o = origin;
  origin = null;
  return o && performance.now() - o.at < 1000 ? o : null;
}
