import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GREETINGS, SCRIPT_FONTS } from '../../data/greetings';

const getDesktopSize = (text) => {
  const len = text.length;
  if (len <= 4) return 'text-[7.2rem] xl:text-[8.2rem]';
  if (len <= 7) return 'text-[5.6rem] xl:text-[6.5rem]';
  return 'text-[4.2rem] xl:text-[5rem]';
};

const getMobileSize = (text) => {
  const len = text.length;
  if (len <= 4) return 'text-[3.2rem] sm:text-[4.5rem] md:text-[5.8rem]';
  if (len <= 7) return 'text-[2.6rem] sm:text-[3.6rem] md:text-[4.6rem]';
  return 'text-[2rem] sm:text-[2.8rem] md:text-[3.6rem]';
};

/**
 * Hero component — faithful replica of the UI mockup, now fully responsive,
 * with rotating greeting in the native script and authentic typography of the
 * top 50 most spoken global languages.
 *
 * Mobile (< md):  Vertically stacked — text above, photo card below.
 * Tablet (md):    Side-by-side with reduced type sizes.
 * Desktop (lg+):  Original absolute-positioned layout.
 */
const Hero = () => {
  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const currentGreeting = GREETINGS[greetingIndex];
  const currentFontFamily = SCRIPT_FONTS[currentGreeting.script] || SCRIPT_FONTS.latin;

  return (
    <section
      id="hero"
      className="relative z-10 w-full bg-white overflow-hidden"
      style={{
        minHeight: '540px',
      }}
    >
      {/* ═══ MOBILE / TABLET LAYOUT (< lg) ═══ */}
      <div className="lg:hidden flex flex-col items-center w-full h-screen-safe min-h-[540px]">
        {/* Text content */}
        <div className="flex flex-col items-center justify-center text-center flex-shrink-0 pt-10 sm:pt-14 pb-4">
          <div className="relative h-[3.6rem] sm:h-[4.8rem] md:h-[6.2rem] flex items-center justify-center">
            <AnimatePresence>
              <motion.h1
                key={currentGreeting.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, position: 'absolute' }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                title={`${currentGreeting.language} (${currentGreeting.romanized})`}
                style={{ fontFamily: currentFontFamily }}
                className={`font-normal text-[#3a3a3a] leading-none tracking-tight select-none ${getMobileSize(
                  currentGreeting.text
                )}`}
              >
                {currentGreeting.text}
              </motion.h1>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-montserrat text-[14px] sm:text-[15px] md:text-[17px] text-[#5c5c5c] font-normal mt-2 tracking-normal"
          >
            I am Krish Kumar Sinha,
          </motion.p>
        </div>

        {/* Philosophy quote above card — aligned to right margin of the page */}
        <div className="w-full px-4 sm:px-8 md:px-12 flex justify-end mb-2.5">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-montserrat text-[11.5px] sm:text-[12.5px] md:text-[13px] font-normal text-[#222222] leading-[1.55] text-right flex flex-col items-end max-w-[460px]"
          >
            <span className="block">
              By balancing honest materials, natural light, and quiet proportions, I shape thoughtful
            </span>
            <span className="block mt-0.5">
              architectural spaces where people are invited to slow down and feel deeply present
            </span>
          </motion.div>
        </div>

        {/* Photo card — fills remaining space */}
        <div className="relative flex-1 w-[85%] sm:w-[75%] md:w-[65%] max-w-[480px]">
          {/* Gray shape + photo */}
          <div className="relative w-full h-full min-h-[220px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full rounded-t-[2rem] sm:rounded-t-[2.5rem] bg-[#c5c5c5] z-0"
            />
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex justify-center items-end h-full w-full"
            >
              <img
                src="/images/profile.png"
                alt="Krish Kumar Sinha"
                className="h-full w-auto max-w-none object-contain object-bottom select-none"
                style={{
                  filter:
                    'grayscale(100%) contrast(106%) drop-shadow(-8px 2px 14px rgba(0, 0, 0, 0.35))',
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Institution info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col items-center text-center px-4 py-4 flex-shrink-0"
        >
          <p className="font-montserrat text-[12px] sm:text-[13px] text-[#5c5c5c] font-normal">
            4th Year Architecture Student at
          </p>
          <p className="font-montserrat text-[15px] sm:text-[17px] font-bold text-[#3a3a3a] mt-0.5 tracking-tight">
            National Institute of Technology Patna
          </p>
        </motion.div>
      </div>

      {/* ═══ DESKTOP LAYOUT (lg+) — original design ═══ */}
      <div
        className="hidden lg:block relative w-full max-w-[1440px] mx-auto"
        style={{ height: 'calc(100vh - 43px)', minHeight: '540px' }}
      >
        {/* 1. LEFT COLUMN (50% width) */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[50%] flex flex-col items-center justify-between z-40"
          style={{ paddingBottom: '65px' }}
        >
          <div style={{ height: '38%' }} />
          <div className="flex flex-col items-center text-center">
            <div className="relative h-[7.8rem] xl:h-[8.8rem] flex items-center justify-center">
              <AnimatePresence>
                <motion.h1
                  key={currentGreeting.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14, position: 'absolute' }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  title={`${currentGreeting.language} (${currentGreeting.romanized})`}
                  style={{ fontFamily: currentFontFamily }}
                  className={`font-normal text-[#3a3a3a] leading-none tracking-tight select-none ${getDesktopSize(
                    currentGreeting.text
                  )}`}
                >
                  {currentGreeting.text}
                </motion.h1>
              </AnimatePresence>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-montserrat text-[15px] xl:text-[17px] text-[#5c5c5c] font-normal mt-3 tracking-normal"
            >
              I am Krish Kumar Sinha,
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col items-center text-center px-4 mt-auto"
          >
            <p className="font-montserrat text-[13px] xl:text-[14px] text-[#5c5c5c] font-normal">
              4th Year Architecture Student at
            </p>
            <p className="font-montserrat text-[19px] xl:text-[20px] font-bold text-[#3a3a3a] mt-0.5 tracking-tight">
              National Institute of Technology Patna
            </p>
          </motion.div>
        </div>

        {/* 2. RIGHT COLUMN (Shape, Photo & Quote) — aligned to right margin */}
        <div
          className="absolute top-0 bottom-0 flex flex-col items-end right-4 sm:right-6 lg:right-10 xl:right-14"
          style={{ width: '48%', maxWidth: '640px' }}
        >
          {/* Architectural Philosophy Quote: aligned to right margin with refined font size */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute z-10 font-montserrat text-[13px] lg:text-[13.5px] xl:text-[14.5px] font-normal text-[#222222] leading-[1.6] text-right flex flex-col items-end"
            style={{ top: '8%', right: 0 }}
          >
            <span className="block whitespace-normal xl:whitespace-nowrap">
              By balancing honest materials, natural light, and quiet proportions, I shape thoughtful
            </span>
            <span className="block whitespace-normal xl:whitespace-nowrap mt-0.5">
              architectural spaces where people are invited to slow down and feel deeply present
            </span>
          </motion.div>

          <div className="absolute bottom-0 right-0 w-full" style={{ top: '38%' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full rounded-t-[3rem] bg-[#c5c5c5] z-0"
            />
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex justify-center items-end"
              style={{ height: '135%', width: '100%' }}
            >
              <img
                src="/images/profile.png"
                alt="Krish Kumar Sinha"
                className="h-full w-auto max-w-none object-contain object-bottom select-none"
                style={{
                  filter:
                    'grayscale(100%) contrast(106%) drop-shadow(-8px 2px 14px rgba(0, 0, 0, 0.35))',
                  maxHeight: '100%',
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3. Seamless Stacked Bottom Bars */}
      <div
        className="absolute bottom-0 left-0 right-0 w-full z-20 flex flex-col"
        style={{ transform: 'translateY(35px)' }}
      >
        <div className="w-full bg-[#c5c5c5] h-[20px] sm:h-[25px] lg:h-[30px]" />
        <div className="w-full bg-[#c5c5c5] h-[30px] sm:h-[38px] lg:h-[45px]" />
      </div>
    </section>
  );
};

export default Hero;
