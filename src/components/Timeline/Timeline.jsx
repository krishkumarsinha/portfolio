import React from 'react';
import { motion } from 'framer-motion';
import { education, experience, quote } from '../../data/timeline';

/**
 * Timeline component — exact replica of the original UI design (Slide 2),
 * now fully responsive across all breakpoints.
 */
const Timeline = () => {
  return (
    <section
      id="timeline"
      className="relative w-full bg-white select-none z-40 flex flex-col justify-between min-h-[calc(100svh-43px-15px)] sm:min-h-[calc(100vh-43px-28px)] lg:min-h-[calc(100vh-43px-40px)]"
    >
      {/* ════════════════ TOP HEADER BAR (#c5c5c5) ════════════════ */}
      <div className="relative w-full bg-[#c5c5c5] h-[50px] sm:h-[60px] lg:h-[74px] flex items-end z-20">
        <div className="relative w-full h-full flex items-end z-50 pl-0 sm:pl-2 lg:pl-4">
          <div
            className="inline-block relative z-50"
            style={{
              marginLeft: '-4px',
              transform: 'translateY(24.8%)',
            }}
          >
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-montserrat font-normal text-white text-[2.5rem] sm:text-[3.5rem] md:text-[4.6rem] lg:text-[5.8rem] leading-none tracking-tight select-none"
            >
              Timeline
            </motion.h2>
          </div>
        </div>
      </div>

      {/* ════════════════ MAIN TIMELINE CONTENT ════════════════ */}
      <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 pt-12 sm:pt-16 md:pt-20 lg:pt-28 pb-12 sm:pb-16 lg:pb-24 flex-grow flex flex-col justify-center">
        {/* Centrally aligned 2-group grid with equal spacing from centerline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 sm:gap-y-16 lg:gap-y-0 max-w-[960px] lg:max-w-[1040px] mx-auto">
          {/* ────────────── LEFT GROUP: EDUCATION ────────────── */}
          <div className="w-full flex flex-col items-center lg:items-end lg:pr-10 xl:pr-14">
            <div className="w-full max-w-[340px] sm:max-w-[350px] flex flex-col">
              <div className="relative pl-9 sm:pl-12">
                {/* Continuous Vertical Timeline Line — shifted left */}
                <div
                  className="absolute left-[6px] sm:left-[10px] -top-6 w-[2px] sm:w-[3px] bg-[#5c5c5c]"
                  style={{ bottom: '20px' }}
                />

                <div className="space-y-10 sm:space-y-12">
                  {education.map((period, pIdx) => (
                    <motion.div
                      key={period.period}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: pIdx * 0.15 }}
                      className="relative"
                    >
                      {/* Dark Node Dot — centered on line with generous margin to text */}
                      <div className="absolute -left-[35px] sm:-left-[44px] top-[2px] w-[12px] h-[12px] sm:w-[15px] sm:h-[15px] rounded-full bg-[#5c5c5c] ring-[3px] sm:ring-4 ring-white" />

                      {/* Period Header */}
                      <h3 className="font-montserrat font-bold text-[15px] sm:text-[17px] md:text-[18px] text-[#5c5c5c] leading-none mb-4 sm:mb-5">
                        {period.period}
                      </h3>

                      {/* Entries */}
                      <div className="space-y-4 sm:space-y-5 pl-3 sm:pl-6">
                        {period.entries.map((entry, eIdx) => (
                          <div key={eIdx} className="flex items-start gap-2.5 sm:gap-3">
                            {/* Sub-bullet Dot */}
                            <span className="w-[9px] h-[9px] sm:w-[11px] sm:h-[11px] rounded-full bg-[#b8b8b8] mt-1 shrink-0" />
                            <div>
                              <h4 className="font-montserrat font-medium text-[13.5px] sm:text-[15px] md:text-[16px] text-[#5c5c5c] leading-snug">
                                {entry.title}
                              </h4>
                              <p className="font-montserrat text-[12px] sm:text-[13.5px] md:text-[14px] text-[#999999] mt-0.5 leading-snug">
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

              {/* Tolkien Quote (Bottom Left) — equal spacing */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-10 sm:mt-12 pt-4 pl-3 sm:pl-6 max-w-[320px]"
              >
                <p className="font-montserrat italic text-[14px] sm:text-[15px] md:text-[16px] text-[#5c5c5c] leading-snug">
                  {quote.text}
                </p>
                <p className="font-montserrat font-semibold text-[13px] sm:text-[14px] md:text-[15px] text-[#5c5c5c] text-right mt-1">
                  {quote.author}
                </p>
              </motion.div>
            </div>
          </div>

          {/* ────────────── RIGHT GROUP: EXPERIENCE ────────────── */}
          <div className="w-full flex flex-col items-center lg:items-start lg:pl-10 xl:pl-14">
            <div className="w-full max-w-[340px] sm:max-w-[350px] flex flex-col">
              <div className="relative pl-9 sm:pl-12">
                {/* Continuous Vertical Timeline Line — shifted left */}
                <div
                  className="absolute left-[6px] sm:left-[10px] -top-6 w-[2px] sm:w-[3px] bg-[#5c5c5c]"
                  style={{ bottom: '24px' }}
                />

                <div className="space-y-6 sm:space-y-8 lg:space-y-9">
                  {experience.map((item, idx) => (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.12 }}
                      className="relative"
                    >
                      {/* Dark Node Dot — centered on line with generous margin to text */}
                      <div className="absolute -left-[35px] sm:-left-[44px] top-[2px] w-[12px] h-[12px] sm:w-[15px] sm:h-[15px] rounded-full bg-[#5c5c5c] ring-[3px] sm:ring-4 ring-white" />

                      {/* Year Header */}
                      <h3
                        data-testid="experience-year"
                        className="font-montserrat font-bold text-[15px] sm:text-[17px] md:text-[18px] text-[#5c5c5c] leading-none mb-1.5 sm:mb-2"
                      >
                        {item.year}
                      </h3>

                      {/* Role & Company */}
                      <div className="pl-3 sm:pl-6">
                        <h4 className="font-montserrat font-medium text-[13.5px] sm:text-[15px] md:text-[16px] text-[#5c5c5c] leading-snug">
                          {item.title}
                        </h4>
                        <p className="font-montserrat text-[12px] sm:text-[13.5px] md:text-[14px] text-[#999999] mt-0.5 leading-snug">
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
      </div>
    </section>
  );
};

export default Timeline;
