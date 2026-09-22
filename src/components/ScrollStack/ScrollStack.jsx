import React, { useEffect, useRef, useCallback } from 'react';

/**
 * ScrollStack — GSAP ScrollTrigger-powered "stacking pages" animation.
 *
 * Each child section pins at the top of the viewport via position:sticky.
 * As the user scrolls, the next section slides up and stacks over the previous one.
 * The covered section undergoes:
 *   - scale3d() recession (1.0 → 0.92)
 *   - Dark overlay dimming (0 → 0.4 opacity via ::after pseudo)
 *   - Border-radius evolution (0 → 16px)
 *
 * Only transform and opacity are animated (GPU-composited).
 * Respects prefers-reduced-motion: sections flow normally without pinning.
 */

// Lazy-load GSAP + ScrollTrigger to avoid impacting initial bundle
let gsapLoaded = false;
let gsapModule = null;

async function loadGSAP() {
  if (gsapLoaded) return gsapModule;
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ]);
  gsap.registerPlugin(ScrollTrigger);
  gsapModule = { gsap, ScrollTrigger };
  gsapLoaded = true;
  return gsapModule;
}

/**
 * ScrollStackSection — wraps each section with the stack-panel structure.
 * The z-index ascends so each subsequent section layers over the previous.
 */
export function ScrollStackSection({ children, index = 0, className = '' }) {
  return (
    <div
      className={`stack-panel bg-[#ededeb] ${className}`}
      style={{ zIndex: (index + 1) * 10 }}
      data-stack-index={index}
    >
      <div className="stack-panel-inner bg-[#ededeb] paper-bg">
        {children}
      </div>
    </div>
  );
}

/**
 * ScrollStack — wrapper that initializes GSAP ScrollTrigger animations
 * on mount. Each .stack-panel gets a scrubbed timeline that scales down
 * and dims its .stack-panel-inner as the next section scrolls over it.
 */
export default function ScrollStack({ children }) {
  const wrapperRef = useRef(null);
  const triggersRef = useRef([]);

  const prefersReducedMotion = useCallback(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let cleanup = null;

    loadGSAP().then(({ gsap, ScrollTrigger }) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const panels = wrapper.querySelectorAll('.stack-panel');
      const inners = wrapper.querySelectorAll('.stack-panel-inner');

      // Clean up any existing triggers
      triggersRef.current.forEach(t => t.kill());
      triggersRef.current = [];

      panels.forEach((panel, i) => {
        // Skip the last panel (nothing covers it)
        if (i >= panels.length - 1) return;

        const inner = inners[i];
        const overlay = inner.querySelector('::after') || inner; // CSS pseudo handles overlay
        const nextPanel = panels[i + 1];

        // Create a scrubbed timeline for each panel's recession
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: nextPanel,
            start: 'top bottom',
            end: 'top top',
            scrub: 0.6, // slight smoothing for buttery feel
            // No pin here — panels pin themselves via CSS position:sticky
          },
        });

        // Scale down the covered section
        tl.to(inner, {
          scale: 0.92,
          borderRadius: '16px',
          ease: 'none',
          duration: 1,
        }, 0);

        // Dim via the ::after overlay opacity
        // Since we can't directly target ::after with GSAP,
        // we use a CSS custom property approach
        tl.to(inner, {
          '--overlay-opacity': 0.4,
          ease: 'none',
          duration: 1,
        }, 0);

        triggersRef.current.push(tl.scrollTrigger);

        // Multi-card depth: if there's a panel before this one,
        // add secondary recession when panel i+1 covers panel i
        if (i > 0) {
          const prevInner = inners[i - 1];
          const secondaryTl = gsap.timeline({
            scrollTrigger: {
              trigger: nextPanel,
              start: 'top bottom',
              end: 'top top',
              scrub: 0.6,
            },
          });

          secondaryTl.to(prevInner, {
            scale: 0.86,
            '--overlay-opacity': 0.55,
            ease: 'none',
            duration: 1,
          }, 0);

          triggersRef.current.push(secondaryTl.scrollTrigger);
        }
      });

      cleanup = () => {
        triggersRef.current.forEach(t => t.kill());
        triggersRef.current = [];
      };
    });

    return () => {
      if (cleanup) cleanup();
    };
  }, [prefersReducedMotion]);

  // Listen for reduced motion changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => {
      // Kill all triggers when user enables reduced motion
      if (mql.matches) {
        triggersRef.current.forEach(t => t.kill());
        triggersRef.current = [];
        // Reset transforms
        const inners = wrapperRef.current?.querySelectorAll('.stack-panel-inner');
        inners?.forEach(inner => {
          inner.style.transform = '';
          inner.style.borderRadius = '';
          inner.style.setProperty('--overlay-opacity', '0');
        });
      }
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return (
    <div ref={wrapperRef} className="stack-wrapper">
      {children}
    </div>
  );
}
