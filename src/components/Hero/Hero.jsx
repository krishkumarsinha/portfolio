import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { GREETINGS, SCRIPT_FONTS, preloadScriptFont } from '../../data/greetings';
import { useScrollStack } from '../ScrollStack/ScrollStack';

/**
 * Fluid typography clamp helper for the greeting ("Hello", etc.)
 */
const getLandingGreetingSize = (text) => {
  const len = text.length;
  if (len <= 4) return 'text-[clamp(3.4rem,9.5vw,11.5rem)]';
  if (len <= 7) return 'text-[clamp(2.6rem,7.5vw,9rem)]';
  return 'text-[clamp(2rem,5.8vw,7rem)]';
};

const getMobileGreetingSize = (text) => {
  const len = text.length;
  if (len <= 5) return 'text-[clamp(3rem,9.5vw,4.4rem)]';
  if (len <= 8) return 'text-[clamp(2.4rem,7.5vw,3.5rem)]';
  return 'text-[clamp(1.8rem,6vw,2.7rem)]';
};

/**
 * 1. LANDING / HELLO PAGE — Pure textured screen with dead-centered rotating greetings.
 * Apple-style scroll-scrubbed exit: scales down, blurs, drifts upward, and fades out as user scrolls.
 */
export const LandingSection = () => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const landingRef = useRef(null);

  // Hook into active ScrollStack progress (fallback to local useScroll for standalone/tests)
  const { scrollYProgress: stackScroll } = useScrollStack();
  const { scrollYProgress: fallbackScroll } = useScroll({
    target: landingRef,
    offset: ['start start', 'end start'],
  });
  const landingScroll = stackScroll || fallbackScroll;

  const landingScale = useTransform(landingScroll, [0, 0.85], [1, 0.88]);
  const landingOpacity = useTransform(landingScroll, [0, 0.75], [1, 0]);
  const landingBlurVal = useTransform(landingScroll, [0, 0.75], [0, 14]);
  const landingBlur = useTransform(landingBlurVal, (v) => (v > 0.1 ? `blur(${v.toFixed(1)}px)` : 'none'));
  const landingY = useTransform(landingScroll, [0, 0.85], [0, -70]);
  const scrollCueOpacity = useTransform(landingScroll, [0, 0.22], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (greetingIndex > 0) {
      const current = GREETINGS[greetingIndex];
      preloadScriptFont(current.script);
    }
  }, [greetingIndex]);

  const currentGreeting = GREETINGS[greetingIndex];
  const currentFontFamily = SCRIPT_FONTS[currentGreeting.script] || SCRIPT_FONTS.latin;

  return (
    <div className="relative w-full h-full flex flex-col justify-between">
      <h1 className="sr-only">Krish Kumar Sinha — Architecture Student &amp; Portfolio, NIT Patna</h1>
      <section
        id="landing"
        ref={landingRef}
        className="relative w-full flex-grow flex flex-col items-center justify-center select-none overflow-hidden @container"
        style={{ minHeight: 'calc(100svh - 43px)' }}
      >
        {/* Dead-Centered Content with Apple Scroll-Scrub Transition */}
        <motion.div
          className="flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-[1200px] mx-auto z-10 my-auto w-full"
          style={{
            scale: landingScale,
            opacity: landingOpacity,
            filter: landingBlur,
            y: landingY,
          }}
        >
          {/* Rotating Greeting in 50 languages with blur cross-fade */}
          <div className="relative h-[5.5rem] sm:h-[7.5rem] md:h-[9.5rem] lg:h-[11.5rem] flex items-center justify-center w-full">
            <AnimatePresence>
              <motion.span
                aria-hidden="true"
                role="presentation"
                key={currentGreeting.id}
                initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -22, filter: 'blur(10px)', position: 'absolute' }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                title={`${currentGreeting.language} (${currentGreeting.romanized})`}
                style={{ fontFamily: currentFontFamily }}
                className={`font-normal text-[#3a3a3a] leading-none tracking-tight select-none ${getLandingGreetingSize(
                  currentGreeting.text
                )}`}
              >
                {currentGreeting.text}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Name Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-montserrat text-[clamp(1.1rem,2.8vw,2.2rem)] text-[#5c5c5c] font-normal mt-phi-xs sm:mt-phi-sm tracking-normal"
          >
            I am Krish Kumar Sinha,
          </motion.p>
        </motion.div>

        {/* Scroll Indicator — dissolves on scroll */}
        <motion.div
          style={{ opacity: scrollCueOpacity }}
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none z-10"
        >
          <span className="font-montserrat text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#888]">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              className="w-4 h-4 text-[#888]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

/**
 * 2. HERO PROFILE PAGE — Desktop layout anchors the arch shape & portrait to the right margin.
 * Objects and photo move up along the scroll and progressively blur in sync for a seamless transition.
 */
export const HeroProfileSection = () => {
  const heroSectionRef = useRef(null);

  // Hook into active ScrollStack progress (fallback to local useScroll for standalone/tests)
  const { scrollYProgress: stackScroll } = useScrollStack();
  const { scrollYProgress: fallbackScroll } = useScroll({
    target: heroSectionRef,
    offset: ['start start', 'end start'],
  });
  const heroScroll = stackScroll || fallbackScroll;

  // Seamless scroll-scrub animations: photo and objects move up and blur smoothly together
  const photoY = useTransform(heroScroll, [0.35, 0.85], [0, -32]);
  const photoSpring = useSpring(photoY, { stiffness: 85, damping: 24 });
  const cardY = useTransform(heroScroll, [0.35, 0.85], [0, -50]);
  const textY = useTransform(heroScroll, [0.35, 0.85], [0, -55]);
  const quoteY = useTransform(heroScroll, [0.35, 0.85], [0, -55]);
  const bgCardScale = useTransform(heroScroll, [0.35, 0.85], [1, 1.03]);

  // Progressive blur along the scroll — synchronized with upward motion
  const blurAmount = useTransform(heroScroll, [0.35, 0.85], [0, 14]);
  const blurFilter = useTransform(blurAmount, (v) => (v > 0.1 ? `blur(${v.toFixed(1)}px)` : 'none'));
  const sectionOpacity = useTransform(heroScroll, [0.72, 0.96], [1, 0]);

  return (
    <motion.section
      id="hero"
      ref={heroSectionRef}
      style={{ opacity: sectionOpacity }}
      className="relative z-10 w-full h-full flex flex-col justify-between overflow-hidden select-none @container"
    >
      {/* ── MOBILE / TABLET (< lg) — Balanced vertical stack ── */}
      <div className="lg:hidden flex flex-col items-center justify-between h-[calc(100svh-43px)] pt-3 sm:pt-6 relative z-10 w-full overflow-hidden">
        {/* Philosophy Quote — 2 lines centered and aligned with mobile arch card */}
        <motion.div
          style={{ y: quoteY, filter: blurFilter }}
          className="w-full max-w-[520px] px-3 text-center my-1"
        >
          <p className="font-montserrat text-[clamp(0.72rem,2.1vw,0.84rem)] font-normal text-[#222222] leading-[1.55]">
            <span className="block">
              By balancing honest materials, natural light, and quiet proportions, I shape thoughtful
            </span>
            <span className="block mt-0.5">
              architectural spaces where people are invited to slow down and feel deeply present
            </span>
          </p>
        </motion.div>

        {/* Arch Card + Portrait Cutout */}
        <motion.div
          style={{ scale: bgCardScale, y: cardY, filter: blurFilter }}
          className="relative w-[82%] sm:w-[68%] md:w-[56%] max-w-[320px] h-[34svh] sm:h-[38svh] max-h-[300px] flex justify-center items-end my-auto"
        >
          <div className="absolute inset-0 bg-[#c5c5c5] rounded-t-[2.5rem] sm:rounded-t-[3rem]" />
          <motion.div
            className="absolute inset-x-0 bottom-0 z-10 pointer-events-none flex justify-center items-end"
            style={{ height: '124%', y: photoSpring }}
          >
            <picture className="h-full flex items-end justify-center">
              <source
                type="image/webp"
                srcSet="/images/profile.webp 1x, /images/profile_hd.webp 2x"
              />
              <img
                src="/images/profile.png"
                alt="Krish Kumar Sinha, B.Arch student at NIT Patna, in a formal grayscale portrait"
                width="600"
                height="971"
                loading="eager"
                fetchpriority="high"
                className="h-full w-auto max-w-none object-contain object-bottom select-none block"
                style={{
                  filter: 'grayscale(100%) contrast(108%) brightness(101%) drop-shadow(-6px 4px 16px rgba(0, 0, 0, 0.25))',
                  maxHeight: '100%',
                  imageRendering: '-webkit-optimize-contrast',
                }}
              />
            </picture>
          </motion.div>
        </motion.div>

        {/* Institution Info */}
        <motion.div
          style={{ y: textY, filter: blurFilter }}
          className="text-center px-4 mb-2 z-10 shrink-0"
        >
          <p className="font-montserrat text-[clamp(0.72rem,2.2vw,0.85rem)] text-[#5c5c5c] font-normal">
            4th Year Architecture Student at
          </p>
          <p className="font-montserrat text-[clamp(0.95rem,3.2vw,1.25rem)] font-bold text-[#3a3a3a] mt-0.5 tracking-tight">
            National Institute of Technology Patna
          </p>
        </motion.div>

        {/* Seamless Bottom Bars on Mobile — full width to borders */}
        <motion.div
          style={{ y: cardY, filter: blurFilter }}
          className="w-full flex flex-col z-20 shrink-0"
        >
          <div className="w-full flex flex-col">
            <div className="w-full bg-[#8e8e8e] h-[20px] sm:h-[25px]" />
            <div className="w-full bg-[#8e8e8e] h-[28px] sm:h-[36px]" />
          </div>
        </motion.div>
      </div>

      {/* ── DESKTOP (lg+) — Arch Shape & Photo Anchored to Right Margin ── */}
      <div
        className="hidden lg:block relative w-full"
        style={{ height: 'calc(100vh - 43px)', minHeight: '540px' }}
      >
        {/* Left Column: Institution Info (anchored near bottom bar in left half) */}
        <div
          className="absolute left-0 bottom-0 w-[50%] flex flex-col items-center justify-end text-center z-30 pb-[54px] xl:pb-[62px]"
        >
          <motion.div
            style={{ y: textY, filter: blurFilter }}
            className="flex flex-col items-center px-8"
          >
            <p className="font-montserrat text-[clamp(0.85rem,1.1vw,1rem)] text-[#5c5c5c] font-normal">
              4th Year Architecture Student at
            </p>
            <p className="font-montserrat text-[clamp(1.3rem,1.7vw,1.65rem)] font-bold text-[#3a3a3a] mt-1.5 tracking-tight">
              National Institute of Technology Patna
            </p>
          </motion.div>
        </div>

        {/* Desktop Arch Shape & Photo Unit — Photo touches right border, Shape right edge touches photo center */}
        <div className="absolute right-0 bottom-0 flex items-end pointer-events-none z-20 overflow-visible">
          {/* Architectural Philosophy Quote: strictly 2 lines, aligned with the shape */}
          <motion.div
            style={{ y: quoteY, filter: blurFilter }}
            className="absolute right-1/4 bottom-[calc(100%+32px)] xl:bottom-[calc(100%+44px)] z-20 pointer-events-auto text-right flex flex-col items-end w-[340px] lg:w-[400px] xl:w-[450px] 2xl:w-[480px]"
          >
            <p className="font-montserrat text-[clamp(0.78rem,0.95vw,0.88rem)] font-normal text-[#222222] leading-[1.65]">
              <span className="block whitespace-nowrap">
                By balancing honest materials, natural light, and quiet proportions, I shape thoughtful
              </span>
              <span className="block whitespace-nowrap mt-0.5">
                architectural spaces where people are invited to slow down and feel deeply present
              </span>
            </p>
          </motion.div>

          {/* Grey Arch Shape Backdrop — right edge aligned at 50% (exact horizontal center of photo) */}
          <motion.div
            style={{ scale: bgCardScale, y: cardY, filter: blurFilter, transformOrigin: 'bottom right' }}
            className="absolute right-1/2 bottom-0 z-0 w-[340px] lg:w-[400px] xl:w-[450px] 2xl:w-[480px] h-[83.33%] bg-[#c5c5c5] rounded-t-[3.5rem] lg:rounded-t-[4rem] xl:rounded-t-[4.5rem]"
          />

          {/* Profile Photo cutout — right edge touches the right border */}
          <motion.div
            style={{ y: photoSpring }}
            className="relative z-10 flex items-end justify-end pointer-events-none h-full"
          >
            <picture className="h-full flex items-end">
              <source
                type="image/webp"
                srcSet="/images/profile.webp 1x, /images/profile_hd.webp 2x"
              />
              <img
                src="/images/profile.png"
                alt="Krish Kumar Sinha, B.Arch student at NIT Patna, in a formal grayscale portrait"
                width="600"
                height="971"
                loading="eager"
                fetchpriority="high"
                className="h-[62svh] lg:h-[66svh] xl:h-[70svh] max-h-[580px] xl:max-h-[620px] min-h-[380px] w-auto max-w-none object-contain object-bottom select-none block"
                style={{
                  filter:
                    'grayscale(100%) contrast(108%) brightness(101%) drop-shadow(-6px 4px 16px rgba(0, 0, 0, 0.25))',
                  imageRendering: '-webkit-optimize-contrast',
                }}
              />
            </picture>
          </motion.div>
        </div>
      </div>

      {/* ── Seamless Stacked Bottom Bars (Full Viewport Width to Both Borders) ── */}
      <motion.div
        style={{ y: cardY, filter: blurFilter }}
        className="hidden lg:flex absolute bottom-0 left-0 right-0 w-full h-10 z-20 flex-col pointer-events-none"
      >
        <div className="w-full flex flex-col">
          <div className="w-full bg-[#8e8e8e] h-[20px] sm:h-[25px] lg:h-[30px]" />
          <div className="w-full bg-[#8e8e8e] h-[30px] sm:h-[38px] lg:h-[45px]" />
        </div>
      </motion.div>
    </motion.section>
  );
};

/**
 * Combined default export for backwards compatibility with tests and standalone usage
 */
const Hero = () => {
  return (
    <div className="relative w-full">
      <LandingSection />
      <HeroProfileSection />
    </div>
  );
};

export default Hero;
