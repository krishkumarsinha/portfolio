import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { GREETINGS, SCRIPT_FONTS } from '../../data/greetings';

/**
 * Apple-style fluid typography clamp helper
 * Automatically adapts seamlessly across all devices (320px mobile -> 4K desktop)
 */
const getLandingGreetingSize = (text) => {
  const len = text.length;
  if (len <= 4) return 'text-[clamp(3.4rem,9.5vw,11.5rem)]';
  if (len <= 7) return 'text-[clamp(2.6rem,7.5vw,9rem)]';
  return 'text-[clamp(2rem,5.8vw,7rem)]';
};

/**
 * Hero component with Apple-inspired animations & responsive design:
 * 1. LANDING PAGE: Pure textured background with scroll-scrubbed exit
 *    (smooth scale down, blur out, and opacity fade as user scrolls).
 * 2. HERO PROFILE PAGE: Profile photo cutout, grey arch card with scroll parallax,
 *    fluid responsive typography, and full-bleed bottom bars.
 */
const Hero = () => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const landingRef = useRef(null);
  const heroSectionRef = useRef(null);

  // Apple Scroll-Scrub on Landing Page
  const { scrollYProgress: landingScroll } = useScroll({
    target: landingRef,
    offset: ['start start', 'end start'],
  });

  const landingScale = useTransform(landingScroll, [0, 0.85], [1, 0.88]);
  const landingOpacity = useTransform(landingScroll, [0, 0.75], [1, 0]);
  const landingBlurVal = useTransform(landingScroll, [0, 0.75], [0, 14]);
  const landingBlur = useTransform(landingBlurVal, (v) => `blur(${v}px)`);
  const landingY = useTransform(landingScroll, [0, 0.85], [0, -70]);
  const scrollCueOpacity = useTransform(landingScroll, [0, 0.22], [1, 0]);

  // Parallax on Hero photo
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroSectionRef,
    offset: ['start start', 'end start'],
  });

  const photoY = useTransform(heroScroll, [0, 1], [0, -50]);
  const photoYSpring = useSpring(photoY, { stiffness: 80, damping: 22 });
  const bgCardScale = useTransform(heroScroll, [0, 1], [1, 1.05]);

  useEffect(() => {
    const timer = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const currentGreeting = GREETINGS[greetingIndex];
  const currentFontFamily = SCRIPT_FONTS[currentGreeting.script] || SCRIPT_FONTS.latin;

  return (
    <div className="relative w-full">
      {/* ══════════════════════════════════════════════════════════════════
          1. LANDING PAGE — Apple Cinematic Scroll-Scrubbed Opening
          Responsive on all devices (iPhone SE to 4K Ultrawide)
          ══════════════════════════════════════════════════════════════════ */}
      <section
        id="landing"
        ref={landingRef}
        className="relative w-full flex flex-col items-center justify-center select-none overflow-hidden"
        style={{ height: 'calc(100svh - 43px)', minHeight: '480px' }}
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
          {/* Rotating Greeting in 50 languages with Apple blur cross-fade */}
          <div className="relative h-[5.5rem] sm:h-[7.5rem] md:h-[9.5rem] lg:h-[11.5rem] flex items-center justify-center w-full">
            <AnimatePresence>
              <motion.h1
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
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Name Subtitle with Apple Fluid Typography */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-montserrat text-[clamp(1.1rem,2.8vw,2.2rem)] text-[#5c5c5c] font-normal mt-3 sm:mt-5 tracking-normal"
          >
            I am Krish Kumar Sinha,
          </motion.p>
        </motion.div>

        {/* Apple-style Scroll Indicator — dissolves on scroll */}
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

      {/* ══════════════════════════════════════════════════════════════════
          2. HERO PROFILE PAGE — Profile Photo, Grey Shape, Philosophy Quote & NIT Patna
          ══════════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        ref={heroSectionRef}
        className="relative z-10 w-full bg-transparent overflow-hidden"
      >
        {/* ── MOBILE / TABLET (< lg) ── */}
        <div className="lg:hidden flex flex-col items-center justify-between min-h-[calc(100svh-43px)] pt-10 sm:pt-14 pb-0 relative z-10">
          {/* Architectural Philosophy Quote with Fluid Type */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[500px] px-4 sm:px-6 text-center mb-4 sm:mb-6"
          >
            <p className="font-montserrat text-[clamp(0.8rem,2.5vw,0.92rem)] font-normal text-[#222222] leading-[1.65]">
              By balancing honest materials, natural light, and quiet proportions, I shape thoughtful architectural spaces where people are invited to slow down and feel deeply present
            </p>
          </motion.div>

          {/* Photo Card Container with preserved aspect ratio & Apple reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[84%] sm:w-[70%] md:w-[56%] max-w-[380px] h-[52svh] sm:h-[58svh] max-h-[500px] flex justify-center items-end my-auto"
          >
            {/* Grey shape */}
            <motion.div
              style={{ scale: bgCardScale }}
              className="absolute inset-x-0 bottom-0 top-0 bg-[#8e8e8e] rounded-t-[2.5rem] sm:rounded-t-[3rem]"
            />

            {/* Profile photo */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.95, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex justify-center items-end"
              style={{ height: '130%', width: '100%', y: photoYSpring }}
            >
              <img
                src="/images/profile.png"
                srcSet="/images/profile.png 1x, /images/profile_hd.png 2x"
                alt="Krish Kumar Sinha"
                className="h-full w-auto max-w-none object-contain object-bottom select-none"
                style={{
                  filter:
                    'grayscale(100%) contrast(110%) brightness(101%) drop-shadow(-8px 4px 18px rgba(0,0,0,0.28))',
                  imageRendering: '-webkit-optimize-contrast',
                }}
              />
            </motion.div>
          </motion.div>

          {/* Institution Info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center px-4 mt-auto mb-1.5 z-20"
          >
            <p className="font-montserrat text-[clamp(0.75rem,2.2vw,0.88rem)] text-[#5c5c5c] font-normal">
              4th Year Architecture Student at
            </p>
            <p className="font-montserrat text-[clamp(0.95rem,3.2vw,1.25rem)] font-bold text-[#3a3a3a] mt-0.5 tracking-tight">
              National Institute of Technology Patna
            </p>
          </motion.div>

          {/* Seamless Bottom Bars on Mobile — full width to borders */}
          <div
            className="w-full flex flex-col z-20 shrink-0"
            style={{ transform: 'translateY(16px)' }}
          >
            <div className="w-full bg-[#8e8e8e] h-[20px] sm:h-[25px]" />
            <div className="w-full bg-[#8e8e8e] h-[28px] sm:h-[36px]" />
          </div>
        </div>

        {/* ── DESKTOP (lg+) — Side-by-Side Hero Layout with Apple Depth ── */}
        <div
          className="hidden lg:block relative w-full max-w-[1440px] mx-auto"
          style={{ height: 'calc(100vh - 43px)', minHeight: '540px' }}
        >
          {/* Left Column: Institution Info (anchored near bottom bar, shifted a bit to the left) */}
          <div
            className="absolute left-0 bottom-0 w-[50%] flex flex-col items-center justify-end text-center z-40 pb-[54px] xl:pb-[62px] -translate-x-10 xl:-translate-x-16"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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

          {/* Right Column: Quote + Card + Photo */}
          <div
            className="absolute top-0 bottom-0 flex flex-col items-end right-4 sm:right-6 lg:right-10 xl:right-14"
            style={{ width: '48%', maxWidth: '640px' }}
          >
            {/* Architectural Philosophy Quote with Apple blur reveal */}
            <motion.div
              initial={{ opacity: 0, x: 25, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="absolute z-10 font-montserrat text-[clamp(0.75rem,1vw,0.92rem)] font-normal text-[#222222] leading-[1.65] text-right flex flex-col items-end"
              style={{ top: '8%', right: 0 }}
            >
              <span className="block whitespace-normal xl:whitespace-nowrap">
                By balancing honest materials, natural light, and quiet proportions, I shape thoughtful
              </span>
              <span className="block whitespace-normal xl:whitespace-nowrap mt-0.5">
                architectural spaces where people are invited to slow down and feel deeply present
              </span>
            </motion.div>

            {/* Desktop Grey Card & Photo Container */}
            <div className="absolute bottom-0 right-0 w-full" style={{ top: '38%' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                style={{ scale: bgCardScale }}
                className="absolute inset-0 w-full h-full rounded-t-[3rem] bg-[#8e8e8e] z-0"
              />
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex justify-center items-end"
                style={{ height: '130%', width: '100%', y: photoYSpring }}
              >
                <img
                  src="/images/profile.png"
                  srcSet="/images/profile.png 1x, /images/profile_hd.png 2x"
                  alt="Krish Kumar Sinha"
                  className="h-full w-auto max-w-none object-contain object-bottom select-none"
                  style={{
                    filter:
                      'grayscale(100%) contrast(110%) brightness(101%) drop-shadow(-8px 4px 18px rgba(0, 0, 0, 0.30))',
                    maxHeight: '100%',
                    imageRendering: '-webkit-optimize-contrast',
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Seamless Stacked Bottom Bars (Full Viewport Width to Both Borders) ── */}
        <div
          className="hidden lg:flex absolute bottom-0 left-0 right-0 w-full z-20 flex-col pointer-events-none"
          style={{ transform: 'translateY(35px)' }}
        >
          <div className="w-full bg-[#8e8e8e] h-[20px] sm:h-[25px] lg:h-[30px]" />
          <div className="w-full bg-[#8e8e8e] h-[30px] sm:h-[38px] lg:h-[45px]" />
        </div>
      </section>
    </div>
  );
};

export default Hero;
