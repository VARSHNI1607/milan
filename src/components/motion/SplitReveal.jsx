import { Children, cloneElement, isValidElement, useRef } from 'react';
import { gsap, useGSAP, MQ } from '../../motion/gsap.js';

/** Plain text of arbitrary children — what assistive tech should read. */
function textOf(node) {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (isValidElement(node)) return textOf(node.props.children);
  return '';
}

/** Wraps every word (keeping nested elements like <span class="serif-accent">) in a mask. */
function splitWords(node, keyPrefix = 'w') {
  return Children.map(node, (child, ci) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return String(child)
        .split(/(\s+)/)
        .map((part, i) =>
          /^\s+$/.test(part) || part === '' ? (
            part
          ) : (
            <span className="split__mask" key={`${keyPrefix}-${ci}-${i}`}>
              <span className="split__word">{part}</span>
            </span>
          ),
        );
    }
    if (isValidElement(child)) {
      return cloneElement(child, { key: `${keyPrefix}-${ci}` }, splitWords(child.props.children, `${keyPrefix}-${ci}`));
    }
    return child;
  });
}

/**
 * Heading that rises word-by-word out of a mask as it scrolls into view.
 * Screen readers get the sentence once (visually-hidden copy); the split
 * words are aria-hidden. Under reduced motion the text simply appears.
 */
export default function SplitReveal({ as: Tag = 'h2', children, className = '', start = 'top 85%', ...rest }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(ref.current.querySelectorAll('.split__word'), {
          yPercent: 110,
          rotate: 3,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.06,
          scrollTrigger: { trigger: ref.current, start, once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={`split ${className}`} {...rest}>
      <span className="visually-hidden">{textOf(children)}</span>
      <span aria-hidden="true">{splitWords(children)}</span>
    </Tag>
  );
}
