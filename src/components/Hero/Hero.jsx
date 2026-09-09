import React from 'react';
import { motion } from 'framer-motion';

/**
 * Hero component — exact replica of the UI mockup.
 *
 * z-index: set to relative z-10 so subsequent sections (like Timeline's heading)
 * can layer cleanly on top of the 1st page bars.
 */
const Hero = () => {
  return (
    <section
      id="hero"
      className="relative z-10 w-full bg-white overflow-hidden"
      style={{
        height: 'calc(100vh - 43px)',
        minHeight: '540px',
      }}
    >
      <div className="relative w-full h-full max-w-[1440px] mx-auto">
        {/* ════════════════ 1. LEFT COLUMN (50% width) ════════════════ */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[50%] flex flex-col items-center justify-between z-40"
          style={{ paddingBottom: '65px' }}
        >
          {/* Top spacer to align Hello with card top (38%) */}
          <div style={{ height: '38%' }} />

          {/* "Hello" + Name */}
          <div className="flex flex-col items-center text-center">
            <motion.h1
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="font-montserrat font-normal text-[5.5rem] sm:text-[6.5rem] md:text-[7.5rem] lg:text-[8.5rem] text-[#3a3a3a] leading-none tracking-[-0.03em] select-none"
            >
              Hello
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-montserrat text-[15px] sm:text-[17px] text-[#5c5c5c] font-normal mt-3 tracking-normal"
            >
              I am Krish Kumar Sinha,
            </motion.p>
          </div>

          {/* Bottom institution text */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col items-center text-center px-4 mt-auto"
          >
            <p className="font-montserrat text-[13px] sm:text-[14px] text-[#5c5c5c] font-normal">
              4th Year Architecture Student at
            </p>
            <p className="font-montserrat text-[17px] sm:text-[19px] md:text-[20px] font-bold text-[#3a3a3a] mt-0.5 tracking-tight">
              National Institute of Technology Patna
            </p>
          </motion.div>
        </div>

        {/* ════════════════ 2. RIGHT COLUMN (Shape, Photo & Quote) ════════════════ */}
        <div
          className="absolute top-0 bottom-0 flex flex-col items-end"
          style={{
            right: '2%',
            width: '48%',
            maxWidth: '620px',
          }}
        >
          {/* Architectural Philosophy Quote: strictly 2 lines, shifted to the right */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute z-10 font-montserrat text-[12px] sm:text-[12.5px] md:text-[13.5px] font-normal text-[#222222] leading-[1.6] text-right flex flex-col items-end"
            style={{
              top: '9%',
              right: 0,
            }}
          >
            <span className="block whitespace-normal sm:whitespace-nowrap">
              By balancing honest materials, natural light, and quiet proportions, I shape thoughtful
            </span>
            <span className="block whitespace-normal sm:whitespace-nowrap mt-0.5">
              architectural spaces where people are invited to slow down and feel deeply present
            </span>
          </motion.div>

          {/* Shape & Photo Unit: Photo is centrally aligned with the shape */}
          <div
            className="absolute bottom-0 right-0 w-full"
            style={{
              top: '38%',
            }}
          >
            {/* The Rounded Gray Shape (#c5c5c5) behind photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full rounded-t-[2.5rem] sm:rounded-t-[3rem] bg-[#c5c5c5] z-0"
            />

            {/* Krish Cutout Photo: centrally aligned with the shape */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex justify-center items-end"
              style={{
                height: '135%',
                width: '100%',
              }}
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

      {/* ════════════════ 3. Seamless Stacked Bottom Bars ════════════════ */}
      <div
        className="absolute bottom-0 left-0 right-0 w-full z-20 flex flex-col"
        style={{ transform: 'translateY(35px)' }}
      >
        {/* Upper Bar (#c5c5c5) */}
        <div className="w-full bg-[#c5c5c5] h-[30px]" />
        {/* Lower Bar (matching #c5c5c5, seamless with zero gap) */}
        <div className="w-full bg-[#c5c5c5] h-[45px]" />
      </div>
    </section>
  );
};

export default Hero;
