import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useHorizontalTrack } from '../../hooks/useHorizontalTrack';
import { instituteExperience, competitions, achievementQuote, hobbies } from '../../data/achievements';

const HOBBY_ICONS = {
  photography: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  ),
  videography: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  postProduction: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  ),
  music: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  poetry: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L3 12.5V21h8.5z" />
      <line x1="16" y1="8" x2="2" y2="22" />
      <line x1="17.5" y1="15" x2="9" y2="15" />
    </svg>
  ),
};

/**
 * Achievements component — Apple-style Scroll-Driven Horizontal Transit.
 * Pinned in the viewport (sticky) while vertical scroll progress scrubs horizontally
 * through Institute Experience, Competitions, and Architecture Quote.
 * Hobbies and Pursuits are stationed at the bottom above the footer tab with full-bleed divider.
 */
export default function Achievements({ height = '220vh' }) {
  const {
    sectionRef,
    trackRef,
    smoothProgress,
    x,
    trackOpacity,
    trackScale,
    trackBlur,
  } = useHorizontalTrack();

  const [scrollHint, setScrollHint] = useState('Scroll down to explore achievements ↓');

  useEffect(() => {
    return smoothProgress.on('change', (latest) => {
      if (latest > 0.86) {
        setScrollHint('Continue scrolling for Showcase Portals ↓');
      } else {
        setScrollHint('Scroll down to explore achievements ↓');
      }
    });
  }, [smoothProgress]);

  // Milestone columns: Institute Experience, Competitions, and Architecture Quote
  const achievementColumns = [
    {
      id: 'inst-1',
      type: 'institute',
      position: 'top',
      category: 'INSTITUTE EXPERIENCE',
      year: instituteExperience[0].year, // 2024
      entries: instituteExperience[0].entries,
    },
    {
      id: 'inst-2',
      type: 'institute',
      position: 'bottom',
      category: 'INSTITUTE EXPERIENCE',
      year: instituteExperience[1].year, // 2025
      entries: instituteExperience[1].entries,
    },
    {
      id: 'inst-3',
      type: 'institute',
      position: 'top',
      category: 'INSTITUTE EXPERIENCE',
      year: instituteExperience[2].year, // 2026
      entries: instituteExperience[2].entries,
    },
    {
      id: 'comp-1',
      type: 'competition',
      position: 'bottom',
      category: 'COMPETITIONS',
      year: competitions[0].year, // 2023
      entries: competitions[0].entries,
    },
    {
      id: 'comp-2',
      type: 'competition',
      position: 'top',
      category: 'COMPETITIONS',
      year: competitions[1].year, // 2024
      entries: competitions[1].entries,
    },
    {
      id: 'comp-3',
      type: 'competition',
      position: 'bottom',
      category: 'COMPETITIONS',
      year: competitions[2].year, // 2025
      entries: competitions[2].entries,
    },
    {
      id: 'quote-col',
      type: 'quote',
      position: 'top',
      quote: achievementQuote,
    },
  ];

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative w-full select-none z-20"
      style={{ height }}
    >
      {/* ── STICKY VIEWPORT CONTAINER (Pins to screen during vertical scroll scrub) ── */}
      <div className="sticky top-[43px] w-full h-[calc(100vh-43px)] flex flex-col justify-between overflow-hidden" style={{ background: 'transparent' }}>
        <motion.div
          style={{ opacity: trackOpacity, scale: trackScale, filter: trackBlur }}
          className="w-full h-full flex flex-col justify-between overflow-hidden"
        >
          {/* ════════════════ TOP HEADER BAR (#8e8e8e) ════════════════ */}
          <div className="relative w-full bg-[#8e8e8e] h-[50px] sm:h-[60px] lg:h-[74px] flex items-end z-20 shrink-0">
            <div className="relative w-full h-full flex items-end z-50 pl-0 sm:pl-2 lg:pl-4">
              <div
                className="inline-block relative z-50"
                style={{
                  marginLeft: '-4px',
                  transform: 'translateY(24.8%)',
                }}
              >
                <motion.h2
                  initial={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="font-montserrat font-normal text-paper-match text-[#ededeb] text-[clamp(2.1rem,6vw,5.8rem)] leading-none tracking-tight select-none"
                >
                  Achievements
                </motion.h2>
              </div>
            </div>
          </div>

          {/* ════════════════ SCROLL-DRIVEN HORIZONTAL TREE TRACK ════════════════ */}
          <div className="relative w-full flex-grow flex flex-col justify-center overflow-hidden py-1">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex gap-6 sm:gap-8 px-8 sm:px-14 lg:px-20 relative py-2 w-max items-center"
            >
            {/* ── Continuous Horizontal Trunk Axis Line ── */}
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-[2.5px] bg-[#5c5c5c]/30 rounded-full z-0 pointer-events-none">
              <motion.div
                className="h-full bg-[#5c5c5c] rounded-full"
                style={{ scaleX: smoothProgress, transformOrigin: 'left' }}
              />
            </div>

            {/* ── Alternating Milestone Columns ── */}
            {achievementColumns.map((col, idx) => {
              const isTop = col.position === 'top';

              return (
                <div
                  key={col.id}
                  className="shrink-0 w-[270px] sm:w-[290px] lg:w-[310px] flex flex-col select-none relative z-10"
                >
                  {/* 1. UPPER ZONE: Card if isTop, otherwise empty spacer */}
                  <div className="h-[175px] sm:h-[190px] flex flex-col justify-end w-full">
                    {isTop ? (
                      <motion.div
                        initial={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
                        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.1 + idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full"
                      >
                        {col.type === 'quote' ? (
                          <div className="p-4 sm:p-5 rounded-2xl bg-black/[0.035] border border-black/[0.06] backdrop-blur-sm shadow-sm flex flex-col justify-center">
                            <span className="font-montserrat font-bold text-[9.5px] uppercase tracking-wider text-[#737373] bg-black/[0.04] px-2 py-0.5 rounded-full inline-block mb-2 self-start">
                              Philosophy
                            </span>
                            <p className="font-montserrat italic text-[12px] sm:text-[13px] text-[#404040] leading-relaxed">
                              {col.quote.text}
                            </p>
                            <p className="font-montserrat font-semibold text-[11px] sm:text-[12px] text-[#737373] text-right mt-2 tracking-wide">
                              {col.quote.author}
                            </p>
                          </div>
                        ) : col.type === 'institute' ? (
                          <div className="p-4 rounded-2xl bg-black/[0.03] hover:bg-black/[0.045] transition-colors border border-black/[0.06] backdrop-blur-[2px] shadow-sm flex flex-col">
                            <span className="font-montserrat font-bold text-[9.5px] uppercase tracking-wider text-[#737373] bg-black/[0.04] px-2 py-0.5 rounded-full inline-block mb-1.5 self-start">
                              {col.category}
                            </span>
                            <h3 className="font-montserrat font-bold text-[14.5px] sm:text-[16px] text-[#404040] leading-none mb-2">
                              {col.year}
                            </h3>
                            <div className="space-y-1.5">
                              {col.entries.map((entry, eIdx) => (
                                <div key={eIdx} className="flex items-start gap-1.5">
                                  <span className="w-[6px] h-[6px] rounded-full bg-[#b8b8b8] mt-1.5 shrink-0" />
                                  <div>
                                    <h4 className="font-montserrat font-medium text-[12px] sm:text-[12.5px] text-[#404040] leading-tight">
                                      {entry.title}
                                    </h4>
                                    <p className="font-montserrat text-[10.5px] sm:text-[11px] text-[#737373] mt-0.5 leading-tight">
                                      {entry.role}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 rounded-2xl bg-black/[0.03] hover:bg-black/[0.045] transition-colors border border-black/[0.06] backdrop-blur-[2px] shadow-sm flex flex-col">
                            <span className="font-montserrat font-bold text-[9.5px] uppercase tracking-wider text-[#737373] bg-black/[0.04] px-2 py-0.5 rounded-full inline-block mb-1.5 self-start">
                              {col.category}
                            </span>
                            <h3 className="font-montserrat font-bold text-[14.5px] sm:text-[16px] text-[#404040] leading-none mb-2">
                              {col.year}
                            </h3>
                            <div className="space-y-1.5">
                              {col.entries.map((entry, eIdx) => (
                                <div key={eIdx} className="flex items-start gap-1.5">
                                  <span className="w-[6px] h-[6px] rounded-full bg-[#b8b8b8] mt-1.5 shrink-0" />
                                  <div className="w-full">
                                    <div className="flex items-baseline justify-between gap-1.5">
                                      <h4 className="font-montserrat font-medium text-[12px] sm:text-[12.5px] text-[#404040] leading-tight">
                                        {entry.title}
                                      </h4>
                                      {entry.award && (
                                        <span className="font-montserrat font-semibold italic text-[10.5px] text-[#5c5c5c] shrink-0">
                                          {entry.award}
                                        </span>
                                      )}
                                    </div>
                                    <p className="font-montserrat text-[10.5px] sm:text-[11px] text-[#737373] mt-0.5 leading-tight">
                                      {entry.organization}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      <div className="w-full h-full" />
                    )}
                  </div>

                  {/* 2. MIDDLE ZONE: Node Dot & Vertical Connector Stem (Fixed 54px Height) */}
                  <div className="h-[54px] relative flex flex-col items-center justify-center shrink-0">
                    {/* Upper stem to card if isTop */}
                    {isTop ? (
                      <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: 0.15 + idx * 0.04 }}
                        className="w-[2px] h-[19px] bg-[#5c5c5c]"
                        style={{ transformOrigin: 'bottom' }}
                      />
                    ) : (
                      <div className="w-[2px] h-[19px] opacity-0" />
                    )}

                    {/* Central Node Dot on Trunk */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 450, damping: 20, delay: 0.18 + idx * 0.04 }}
                      className="w-[16px] h-[16px] rounded-full bg-[#5c5c5c] ring-4 ring-white shadow-sm relative z-10 shrink-0"
                    />

                    {/* Lower stem to card if !isTop */}
                    {!isTop ? (
                      <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: 0.15 + idx * 0.04 }}
                        className="w-[2px] h-[19px] bg-[#5c5c5c]"
                        style={{ transformOrigin: 'top' }}
                      />
                    ) : (
                      <div className="w-[2px] h-[19px] opacity-0" />
                    )}
                  </div>

                  {/* 3. LOWER ZONE: Card if !isTop, otherwise empty spacer */}
                  <div className="h-[175px] sm:h-[190px] flex flex-col justify-start w-full">
                    {!isTop ? (
                      <motion.div
                        initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.1 + idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full"
                      >
                        {col.type === 'institute' ? (
                          <div className="p-4 rounded-2xl bg-black/[0.03] hover:bg-black/[0.045] transition-colors border border-black/[0.06] backdrop-blur-[2px] shadow-sm flex flex-col">
                            <span className="font-montserrat font-bold text-[9.5px] uppercase tracking-wider text-[#737373] bg-black/[0.04] px-2 py-0.5 rounded-full inline-block mb-1.5 self-start">
                              {col.category}
                            </span>
                            <h3 className="font-montserrat font-bold text-[14.5px] sm:text-[16px] text-[#404040] leading-none mb-2">
                              {col.year}
                            </h3>
                            <div className="space-y-1.5">
                              {col.entries.map((entry, eIdx) => (
                                <div key={eIdx} className="flex items-start gap-1.5">
                                  <span className="w-[6px] h-[6px] rounded-full bg-[#b8b8b8] mt-1.5 shrink-0" />
                                  <div>
                                    <h4 className="font-montserrat font-medium text-[12px] sm:text-[12.5px] text-[#404040] leading-tight">
                                      {entry.title}
                                    </h4>
                                    <p className="font-montserrat text-[10.5px] sm:text-[11px] text-[#737373] mt-0.5 leading-tight">
                                      {entry.role}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 rounded-2xl bg-black/[0.03] hover:bg-black/[0.045] transition-colors border border-black/[0.06] backdrop-blur-[2px] shadow-sm flex flex-col">
                            <span className="font-montserrat font-bold text-[9.5px] uppercase tracking-wider text-[#737373] bg-black/[0.04] px-2 py-0.5 rounded-full inline-block mb-1.5 self-start">
                              {col.category}
                            </span>
                            <h3 className="font-montserrat font-bold text-[14.5px] sm:text-[16px] text-[#404040] leading-none mb-2">
                              {col.year}
                            </h3>
                            <div className="space-y-1.5">
                              {col.entries.map((entry, eIdx) => (
                                <div key={eIdx} className="flex items-start gap-1.5">
                                  <span className="w-[6px] h-[6px] rounded-full bg-[#b8b8b8] mt-1.5 shrink-0" />
                                  <div className="w-full">
                                    <div className="flex items-baseline justify-between gap-1.5">
                                      <h4 className="font-montserrat font-medium text-[12px] sm:text-[12.5px] text-[#404040] leading-tight">
                                        {entry.title}
                                      </h4>
                                      {entry.award && (
                                        <span className="font-montserrat font-semibold italic text-[10.5px] text-[#5c5c5c] shrink-0">
                                          {entry.award}
                                        </span>
                                      )}
                                    </div>
                                    <p className="font-montserrat text-[10.5px] sm:text-[11px] text-[#737373] mt-0.5 leading-tight">
                                      {entry.organization}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      <div className="w-full h-full" />
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* ────────────── FULL-BLEED DIVIDER LINE (ORIGINAL POSITION) ────────────── */}
        <div className="w-screen relative left-1/2 -translate-x-1/2 border-t border-[#5c5c5c]/30 shrink-0 z-20" />

        {/* ────────────── HOBBIES: 6 ICONS WITH EQUAL MARGIN (ORIGINAL POSITION) ────────────── */}
        <div className="w-full max-w-[960px] lg:max-w-[1040px] xl:max-w-[1100px] mx-auto pt-2 sm:pt-3 md:pt-4 pb-2 px-4 shrink-0 z-20">
          <div className="grid grid-cols-6 gap-2 sm:gap-4 md:gap-6 lg:gap-8 w-full justify-items-center">
            {hobbies.map((hobby, idx) => (
              <motion.div
                key={hobby.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 + idx * 0.05 }}
                className="w-full flex flex-col items-center justify-start text-center group cursor-default"
                data-testid="hobby-item"
              >
                <div className="w-8 h-8 min-[380px]:w-9 min-[380px]:h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-[#f4f4f4] group-hover:bg-[#eaeaea] text-[#5c5c5c] group-hover:text-[#3a3a3a] flex items-center justify-center transition-colors shadow-sm shrink-0">
                  {HOBBY_ICONS[hobby.icon]}
                </div>
                <span className="font-montserrat text-[6.5px] min-[360px]:text-[7px] min-[400px]:text-[8px] sm:text-[9.5px] md:text-[11px] font-semibold text-[#5c5c5c] tracking-tight sm:tracking-wider uppercase text-center mt-1 select-none leading-tight break-words max-w-full">
                  {hobby.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Apple-Style Scroll Progress Bar & Cue at Bottom ── */}
        <div className="w-full flex flex-col items-center pb-1.5 z-20 shrink-0 select-none">
          <div className="w-[140px] sm:w-[180px] h-[2px] bg-[#5c5c5c]/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#5c5c5c] rounded-full"
              style={{ scaleX: smoothProgress, transformOrigin: 'left' }}
            />
          </div>
          <div className="flex items-center gap-2 mt-1 text-[#8e8e8e] text-[11px] font-montserrat tracking-wide">
            <span className="inline-block animate-pulse">↓</span>
            <span>{scrollHint}</span>
            <span className="inline-block animate-pulse">↓</span>
          </div>
        </div>

        {/* ════════════════ BOTTOM TAB (EQUAL TO HERO PAGE TAB) ════════════════ */}
        <div
          className="w-full bg-[#8e8e8e] h-[15px] sm:h-[28px] lg:h-[40px] shrink-0 z-20"
          data-testid="achievements-bottom-tab"
        />
      </motion.div>
    </div>
  </section>
  );
}
