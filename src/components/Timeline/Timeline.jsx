import React from 'react';
import { motion } from 'framer-motion';
import { education, experience, quote } from '../../data/timeline';

/**
 * Timeline component — exact replica of the original UI design (Slide 2).
 *
 * Visual Features:
 * - Top Bar: Solid #c5c5c5 band across the full width (height: 74px)
 * - "Timeline" heading:
 *   - Sized at 60%
 *   - No drop shadow
 *   - Flush to left margin
 *   - Bottom part of the letters aligned flush to the bottom edge of the bar (translateY(14%))
 *   - On top of all bars (z-50)
 * - Left Column: Education
 * - Right Column: Experience
 * - Tolkien quote at bottom-left
 */
const Timeline = () => {
  return (
    <section id="timeline" className="relative w-full bg-white select-none z-40">
      {/* ════════════════ TOP HEADER BAR (#c5c5c5) ════════════════ */}
      <div className="relative w-full bg-[#c5c5c5] h-[74px] flex items-end z-20">
        {/* "Timeline" heading: bottom part of letters touches the bottom edge of the bar */}
        <div className="relative w-full h-full flex items-end z-50 pl-0 sm:pl-2 lg:pl-4">
          <div
            className="inline-block relative z-50"
            style={{
              marginLeft: '-4px', // Flush to the absolute left margin
              transform: 'translateY(24.8%)', // Aligns letter bottoms to touch the bottom edge of the bar
            }}
          >
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-montserrat font-normal text-white text-[3.8rem] sm:text-[4.6rem] md:text-[5.2rem] lg:text-[5.8rem] leading-none tracking-tight select-none"
            >
              Timeline
            </motion.h2>
          </div>
        </div>
      </div>

      {/* ════════════════ MAIN TIMELINE CONTENT ════════════════ */}
      <div className="relative w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 pt-20 sm:pt-24 lg:pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-14 lg:gap-x-12">
          {/* ────────────── LEFT COLUMN: EDUCATION (cols 1..6) ────────────── */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="relative pl-7 sm:pl-9">
              {/* Continuous Vertical Timeline Line — centrally aligned with dark node dots */}
              <div
                className="absolute left-[20px] sm:left-[26px] -top-6 w-[3px] bg-[#5c5c5c]"
                style={{ bottom: '20px' }}
              />

              <div className="space-y-12">
                {education.map((period, pIdx) => (
                  <motion.div
                    key={period.period}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: pIdx * 0.15 }}
                    className="relative"
                  >
                    {/* Dark Node Dot on the Line */}
                    <div className="absolute -left-[14px] sm:-left-[16px] top-1 w-[15px] h-[15px] rounded-full bg-[#5c5c5c] ring-4 ring-white" />

                    {/* Period Header */}
                    <h3 className="font-montserrat font-bold text-[17px] sm:text-[18px] text-[#5c5c5c] leading-none mb-5">
                      {period.period}
                    </h3>

                    {/* Entries */}
                    <div className="space-y-5 pl-4 sm:pl-6">
                      {period.entries.map((entry, eIdx) => (
                        <div key={eIdx} className="flex items-start gap-3">
                          {/* Sub-bullet Dot */}
                          <span className="w-[11px] h-[11px] rounded-full bg-[#b8b8b8] mt-1 shrink-0" />

                          <div>
                            <h4 className="font-montserrat font-medium text-[15px] sm:text-[16px] text-[#5c5c5c] leading-snug">
                              {entry.title}
                            </h4>
                            <p className="font-montserrat text-[13.5px] sm:text-[14px] text-[#999999] mt-0.5 leading-snug">
                              {entry.institution}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tolkien Quote (Bottom Left) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-14 pt-4 pl-4 sm:pl-6 max-w-[360px]"
            >
              <p className="font-montserrat italic text-[15px] sm:text-[16px] text-[#5c5c5c] leading-snug">
                {quote.text}
              </p>
              <p className="font-montserrat font-semibold text-[14px] sm:text-[15px] text-[#5c5c5c] text-right mt-1">
                {quote.author}
              </p>
            </motion.div>
          </div>

          {/* ────────────── RIGHT COLUMN: EXPERIENCE (cols 7..12) ────────────── */}
          <div className="lg:col-span-6 lg:pl-4">
            <div className="relative pl-7 sm:pl-9">
              {/* Continuous Vertical Timeline Line — centrally aligned with dark node dots */}
              <div
                className="absolute left-[20px] sm:left-[26px] -top-6 w-[3px] bg-[#5c5c5c]"
                style={{ bottom: '24px' }}
              />

              <div className="space-y-8 sm:space-y-9">
                {experience.map((item, idx) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.12 }}
                    className="relative"
                  >
                    {/* Dark Node Dot on the Line */}
                    <div className="absolute -left-[14px] sm:-left-[16px] top-1 w-[15px] h-[15px] rounded-full bg-[#5c5c5c] ring-4 ring-white" />

                    {/* Year Header */}
                    <h3
                      data-testid="experience-year"
                      className="font-montserrat font-bold text-[17px] sm:text-[18px] text-[#5c5c5c] leading-none mb-2"
                    >
                      {item.year}
                    </h3>

                    {/* Role & Company */}
                    <div className="pl-4 sm:pl-6">
                      <h4 className="font-montserrat font-medium text-[15px] sm:text-[16px] text-[#5c5c5c] leading-snug">
                        {item.title}
                      </h4>
                      <p className="font-montserrat text-[13.5px] sm:text-[14px] text-[#999999] mt-0.5 leading-snug">
                        {item.organization}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
