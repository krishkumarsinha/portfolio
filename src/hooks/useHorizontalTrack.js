import { useRef, useState, useEffect } from 'react';
import { useScroll, useSpring, useTransform } from 'framer-motion';

export function useHorizontalTrack({ damping = 25, stiffness = 90 } = {}) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  // Measure track width dynamically to calculate exact horizontal scroll distance on all screen sizes
  useEffect(() => {
    const updateDistance = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const maxScroll = Math.max(0, trackWidth - viewportWidth + 80);
        setScrollDistance(maxScroll);
      }
    };

    updateDistance();
    window.addEventListener('resize', updateDistance);
    return () => window.removeEventListener('resize', updateDistance);
  }, []);

  // Apple scroll-scrub: maps vertical scroll through section height to horizontal translation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness, damping, restDelta: 0.001 });
  const x = useTransform(smoothProgress, [0, 1], [0, -scrollDistance]);

  // Crisp 100% opacity throughout section, dissolving cleanly at the very end
  const trackOpacity = useTransform(smoothProgress, [0, 0.9, 1], [1, 1, 0]);
  const trackScale = useTransform(smoothProgress, [0, 0.9, 1], [1, 1, 0.96]);
  const trackBlurVal = useTransform(smoothProgress, [0.9, 1], [0, 4]);
  const trackBlur = useTransform(trackBlurVal, (v) => `blur(${v}px)`);

  return {
    sectionRef,
    trackRef,
    smoothProgress,
    x,
    trackOpacity,
    trackScale,
    trackBlur,
  };
}
