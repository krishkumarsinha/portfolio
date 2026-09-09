import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook that uses Intersection Observer to detect when an element
 * scrolls into view, enabling scroll-reveal animations.
 *
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - Visibility threshold (0-1), default 0.1
 * @param {string} options.rootMargin - Root margin, default '0px'
 * @param {boolean} options.triggerOnce - Only trigger once, default true
 * @returns {[React.RefObject, boolean]} - [ref to attach, isVisible state]
 */
export function useScrollReveal({
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
}
