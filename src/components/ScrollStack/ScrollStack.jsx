import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ScrollStack — Decoupled Scroll-Stack Architecture.
 *
 * Layer 1: Background texture lives continuously on <body> (no seams).
 * Layer 2: Content sections pin via native position:sticky and cross-fade via Framer Motion.
 *
 * Exports:
 * - default ScrollStack: Outer container for stacked sections.
 * - StackLayer: Z-index & overlap wrapper for self-pinning sections (Timeline, Achievements).
 * - ScrollStackSection: Sticky pinning + fade wrapper for static/non-scroll-driven sections.
 * - ScrollStackContext & useScrollStack: Hook for children to subscribe directly to the active scroll progress.
 */

export const ScrollStackContext = React.createContext({ scrollYProgress: null });
export const useScrollStack = () => React.useContext(ScrollStackContext);

/**
 * StackLayer — Manages z-order and upward overlap for sections that
 * drive their own internal sticky pinning and scrubbed animations
 * (e.g. Timeline & Achievements, each requiring ~280vh of scroll room).
 */
export function StackLayer({
  children,
  index = 0,
  total = 5,
  overlap,
  className = '',
}) {
  const zIndex = (total - index) * 10;
  const marginTop = overlap
    ? overlap.startsWith('-')
      ? overlap
      : `-${overlap}`
    : undefined;

  return (
    <div
      className={`relative w-full ${className}`}
      style={{ zIndex, marginTop }}
      data-stack-index={index}
    >
      {children}
    </div>
  );
}

/**
 * ScrollStackSection — Pinned viewport section with scrubbed Framer Motion dissolve.
 * Pinned at top of viewport for `height`, then fades out during its final 25-30%
 * of scroll room to reveal the next section resting beneath it.
 */
export function ScrollStackSection({
  children,
  index = 0,
  total = 5,
  height = '140dvh',
  selfFade = false,
  overlap,
  className = '',
}) {
  const containerRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mq.matches);
      const handler = (e) => setPrefersReducedMotion(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Fade out during final 25-30% of scroll room.
  const fadeStart = selfFade ? 0.78 : 0.68;
  const fadeEnd = 0.96;

  const opacity = useTransform(scrollYProgress, [0, fadeStart, fadeEnd], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [fadeStart, fadeEnd], [1, 0.97]);

  // Blur: 0px at rest → 10px at full exit (content hazes as it departs)
  const blurPx = useTransform(scrollYProgress, [fadeStart, fadeEnd], [0, 10]);
  const filterBlur = useTransform(blurPx, (v) => `blur(${v}px)`);

  // Y: drift content upward on exit (0 → −50px), giving the stacking-up feel
  const yExit = useTransform(scrollYProgress, [fadeStart, fadeEnd], [0, -50]);

  const zIndex = (total - index) * 10;
  const marginTop = overlap
    ? overlap.startsWith('-')
      ? overlap
      : `-${overlap}`
    : undefined;

  if (prefersReducedMotion) {
    return (
      <div
        className={`relative w-full ${className}`}
        style={{ zIndex, marginTop }}
        data-stack-index={index}
      >
        <div className="w-full min-h-[100dvh]">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ height, zIndex, marginTop }}
      data-stack-index={index}
    >
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden" style={{ background: 'transparent' }}>
        <ScrollStackContext.Provider value={{ scrollYProgress }}>
          <motion.div
            style={selfFade ? undefined : { opacity, scale, filter: filterBlur, y: yExit }}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        </ScrollStackContext.Provider>
      </div>
    </div>
  );
}

/**
 * ScrollStack — Root wrapper component for the stacked layers.
 */
export default function ScrollStack({ children, className = '' }) {
  return (
    <div className={`relative w-full ${className}`}>
      {children}
    </div>
  );
}
