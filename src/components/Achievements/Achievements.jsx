import React from 'react';
import { motion } from 'framer-motion';
import { instituteExperience, competitions, achievementQuote, hobbies } from '../../data/achievements';

const HOBBY_ICONS = {
  photography: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 min-[400px]:w-5 min-[400px]:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  ),
  videography: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 min-[400px]:w-5 min-[400px]:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  postProduction: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 min-[400px]:w-5 min-[400px]:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  ),
  graphicDesign: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 min-[400px]:w-5 min-[400px]:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  ),
  music: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 min-[400px]:w-5 min-[400px]:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  poetry: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 min-[400px]:w-5 min-[400px]:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L3 12.5V21h8.5z" />
      <line x1="16" y1="8" x2="2" y2="22" />
      <line x1="17.5" y1="15" x2="9" y2="15" />
    </svg>
  ),
};

/**
 * Achievements component — arranged identically to Timeline page,
 * rendering the user's Institute Experience and Competitions data
 * with centrally aligned 2 groups, equal margins from centerline,
 * continuous vertical lines, dark node dots, and responsive layout.
 */
export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative w-full bg-white select-none overflow-hidden z-20 flex flex-col justify-between min-h-[calc(100svh-43px)] sm:min-h-[calc(100vh-43px)] lg:min-h-[calc(100vh-43px)]"
    >
      {/* ════════════════ TOP HEADER BAR (#c5c5c5) ════════════════ */}
      <div className="relative w-full bg-[#c5c5c5] h-[75px] sm:h-[95px] md:h-[110px] lg:h-[125px] flex items-end z-20">
        <div className="relative w-full h-full flex items-end z-50 pl-0 sm:pl-2 lg:pl-4">
          <div
            className="inline-block relative z-50"
            style={{
              marginLeft: '-4px',
              transform: 'translateY(18%)',
            }}
          >
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-montserrat font-normal text-white text-[2.2rem] min-[360px]:text-[2.5rem] sm:text-[3.5rem] md:text-[4.6rem] lg:text-[5.8rem] leading-none tracking-tight select-none"
            >
              Achievements
            </motion.h2>
          </div>
        </div>
      </div>

      {/* ════════════════ MAIN ACHIEVEMENTS CONTENT ════════════════ */}
      <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-8 sm:pb-10 lg:pb-14 flex-grow flex flex-col justify-center">
        {/* Centrally aligned 2-group grid with equal spacing from centerline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 sm:gap-y-16 lg:gap-y-0 max-w-[960px] lg:max-w-[1040px] mx-auto">
          {/* ────────────── LEFT GROUP: INSTITUTE EXPERIENCE ────────────── */}
          <div className="w-full flex flex-col items-center lg:items-end lg:pr-10 xl:pr-14">
            <div className="w-full max-w-[340px] sm:max-w-[350px] flex flex-col">
              {/* Category Underlined Header */}
              <div className="border-b border-[#5c5c5c]/30 pb-2 mb-8">
                <h3 className="font-montserrat font-bold text-[14px] sm:text-[16px] md:text-[17px] text-[#5c5c5c] tracking-wider uppercase">
                  INSTITUTE EXPERIENCE
                </h3>
              </div>

              <div className="relative pl-9 sm:pl-12">
                {/* Continuous Vertical Timeline Line */}
                <div
                  className="absolute left-[6px] sm:left-[10px] -top-2 w-[2px] sm:w-[3px] bg-[#5c5c5c]"
                  style={{ bottom: '20px' }}
                />

                <div className="space-y-8 sm:space-y-10">
                  {instituteExperience.map((item, pIdx) => (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: pIdx * 0.15 }}
                      className="relative"
                    >
                      {/* Dark Node Dot */}
                      <div className="absolute -left-[35px] sm:-left-[44px] top-[2px] w-[12px] h-[12px] sm:w-[15px] sm:h-[15px] rounded-full bg-[#5c5c5c] ring-[3px] sm:ring-4 ring-white" />

                      {/* Year Header */}
                      <h3 className="font-montserrat font-bold text-[15px] sm:text-[17px] md:text-[18px] text-[#5c5c5c] leading-none mb-3 sm:mb-4">
                        {item.year}
                      </h3>

                      {/* Entries */}
                      <div className="space-y-4 sm:space-y-5 pl-3 sm:pl-6">
                        {item.entries.map((entry, eIdx) => (
                          <div key={eIdx} className="flex items-start gap-2.5 sm:gap-3">
                            {/* Sub-bullet Dot */}
                            <span className="w-[9px] h-[9px] sm:w-[11px] sm:h-[11px] rounded-full bg-[#b8b8b8] mt-1 shrink-0" />
                            <div>
                              <h4 className="font-montserrat font-medium text-[13.5px] sm:text-[15px] md:text-[16px] text-[#5c5c5c] leading-snug">
                                {entry.title}
                              </h4>
                              <p className="font-montserrat text-[12px] sm:text-[13.5px] md:text-[14px] text-[#999999] mt-0.5 leading-snug">
                                {entry.role}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Architecture Quote (Bottom Left) — similar to Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-10 sm:mt-12 pt-4 pl-3 sm:pl-6 max-w-[320px]"
              >
                <p className="font-montserrat italic text-[14px] sm:text-[15px] md:text-[16px] text-[#5c5c5c] leading-snug">
                  {achievementQuote.text}
                </p>
                <p className="font-montserrat font-semibold text-[13px] sm:text-[14px] md:text-[15px] text-[#5c5c5c] text-right mt-1">
                  {achievementQuote.author}
                </p>
              </motion.div>
            </div>
          </div>

          {/* ────────────── RIGHT GROUP: COMPETITIONS ────────────── */}
          <div className="w-full flex flex-col items-center lg:items-start lg:pl-10 xl:pl-14">
            <div className="w-full max-w-[340px] sm:max-w-[350px] flex flex-col">
              {/* Category Underlined Header */}
              <div className="border-b border-[#5c5c5c]/30 pb-2 mb-8">
                <h3 className="font-montserrat font-bold text-[14px] sm:text-[16px] md:text-[17px] text-[#5c5c5c] tracking-wider uppercase">
                  COMPETITIONS
                </h3>
              </div>

              <div className="relative pl-9 sm:pl-12">
                {/* Continuous Vertical Timeline Line */}
                <div
                  className="absolute left-[6px] sm:left-[10px] -top-2 w-[2px] sm:w-[3px] bg-[#5c5c5c]"
                  style={{ bottom: '24px' }}
                />

                <div className="space-y-6 sm:space-y-8 lg:space-y-9">
                  {competitions.map((item, idx) => (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.12 }}
                      className="relative"
                    >
                      {/* Dark Node Dot */}
                      <div className="absolute -left-[35px] sm:-left-[44px] top-[2px] w-[12px] h-[12px] sm:w-[15px] sm:h-[15px] rounded-full bg-[#5c5c5c] ring-[3px] sm:ring-4 ring-white" />

                      {/* Year Header */}
                      <h3 className="font-montserrat font-bold text-[15px] sm:text-[17px] md:text-[18px] text-[#5c5c5c] leading-none mb-3 sm:mb-4">
                        {item.year}
                      </h3>

                      {/* Entries */}
                      <div className="space-y-3 sm:space-y-4 pl-3 sm:pl-6">
                        {item.entries.map((entry, eIdx) => (
                          <div key={eIdx} className="flex items-start gap-2.5 sm:gap-3">
                            {/* Sub-bullet Dot */}
                            <span className="w-[9px] h-[9px] sm:w-[11px] sm:h-[11px] rounded-full bg-[#b8b8b8] mt-1 shrink-0" />
                            <div className="w-full">
                              <div className="flex items-baseline justify-between gap-2">
                                <h4 className="font-montserrat font-medium text-[13.5px] sm:text-[15px] md:text-[16px] text-[#5c5c5c] leading-snug">
                                  {entry.title}
                                </h4>
                                {entry.award && (
                                  <span className="font-montserrat font-semibold italic text-[12px] sm:text-[13px] text-[#5c5c5c] shrink-0">
                                    {entry.award}
                                  </span>
                                )}
                              </div>
                              <p className="font-montserrat text-[12px] sm:text-[13.5px] md:text-[14px] text-[#999999] mt-0.5 leading-snug">
                                {entry.organization}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ────────────── FULL-BLEED DIVIDER LINE (EXTENDS TILL THE VERY END) ────────────── */}
        <div className="w-screen relative left-1/2 -translate-x-1/2 border-t border-[#5c5c5c]/30 mt-16 sm:mt-20 md:mt-24 lg:mt-28 xl:mt-32" />

        {/* ────────────── HOBBIES: 6 ICONS WITH EQUAL MARGIN BETWEEN EACH HOBBY ────────────── */}
        <div className="w-full max-w-[960px] lg:max-w-[1040px] xl:max-w-[1100px] mx-auto pt-7 sm:pt-8 md:pt-10 pb-2 sm:pb-4">
          <div className="grid grid-cols-6 gap-2 sm:gap-4 md:gap-6 lg:gap-8 w-full justify-items-center">
            {hobbies.map((hobby, idx) => (
              <motion.div
                key={hobby.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + idx * 0.07 }}
                className="w-full flex flex-col items-center justify-start text-center group cursor-default"
                data-testid="hobby-item"
              >
                <div className="w-9 h-9 min-[380px]:w-10 min-[380px]:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-15 lg:h-15 rounded-full bg-[#f4f4f4] group-hover:bg-[#eaeaea] text-[#5c5c5c] group-hover:text-[#3a3a3a] flex items-center justify-center transition-colors shadow-sm shrink-0">
                  {HOBBY_ICONS[hobby.icon]}
                </div>
                <span className="font-montserrat text-[7px] min-[360px]:text-[7.5px] min-[400px]:text-[8.5px] sm:text-[10px] md:text-[11px] lg:text-[12px] font-semibold text-[#5c5c5c] tracking-tight sm:tracking-wider uppercase text-center mt-1.5 sm:mt-2 select-none leading-tight break-words max-w-full">
                  {hobby.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════ BOTTOM TAB (EQUAL TO HERO PAGE TAB) ════════════════ */}
      <div
        className="w-full bg-[#c5c5c5] h-[15px] sm:h-[28px] lg:h-[40px] shrink-0 z-20"
        data-testid="achievements-bottom-tab"
      />
    </section>
  );
}
