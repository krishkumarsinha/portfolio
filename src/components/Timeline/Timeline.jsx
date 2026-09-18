import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { education, experience, quote } from '../../data/timeline';

/**
 * Timeline component — Apple-style Scroll-Driven Horizontal Transit.
 * The section pins in the viewport (sticky) while the user scrolls down vertically.
 * As vertical scroll progresses, the Linear Tree timeline smoothly scrubs horizontally
 * from Education (first 2 groups) through Experience, and transitions into the next section.
 */
const Timeline = () => {
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

  // Apple scroll-scrub: maps vertical scroll through 300vh to horizontal translation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 25, restDelta: 0.001 });
  const x = useTransform(smoothProgress, [0, 1], [0, -scrollDistance]);

  // Apple section dissolve transition into Proficiency
  const trackOpacity = useTransform(smoothProgress, [0, 0.04, 0.88, 1], [0.85, 1, 1, 0.45]);
  const trackScale = useTransform(smoothProgress, [0, 0.04, 0.88, 1], [0.985, 1, 1, 0.96]);
  const trackBlurVal = useTransform(smoothProgress, [0.88, 1], [0, 4]);
  const trackBlur = useTransform(trackBlurVal, (v) => `blur(${v}px)`);

  const [scrollHint, setScrollHint] = useState('Scroll down to navigate timeline ↓');

  useEffect(() => {
    return smoothProgress.on('change', (latest) => {
      if (latest > 0.86) {
        setScrollHint('Continue scrolling for Proficiency ↓');
      } else {
        setScrollHint('Scroll down to navigate timeline ↓');
      }
    });
  }, [smoothProgress]);

  // Milestone columns: First 2 groups are Education, subsequent groups are Experience, closing with Quote
  const timelineColumns = [
    {
      id: 'edu-1',
      type: 'education',
      position: 'top',
      period: education[0].period, // 2012-2023
      entries: education[0].entries,
    },
    {
      id: 'edu-2',
      type: 'education',
      position: 'bottom',
      period: education[1].period, // 2023-2028
      entries: education[1].entries,
    },
    {
      id: 'exp-1',
      type: 'experience',
      position: 'top',
      year: experience[0].year, // 2023
      title: experience[0].title,
      organization: experience[0].organization,
    },
    {
      id: 'exp-2',
      type: 'experience',
      position: 'bottom',
      year: experience[1].year, // 2024
      title: experience[1].title,
      organization: experience[1].organization,
    },
    {
      id: 'exp-3',
      type: 'experience',
      position: 'top',
      year: experience[2].year, // 2025
      title: experience[2].title,
      organization: experience[2].organization,
    },
    {
      id: 'exp-4',
      type: 'experience',
      position: 'bottom',
      year: experience[3].year, // 2026
      title: experience[3].title,
      organization: experience[3].organization,
    },
    {
      id: 'quote-col',
      type: 'quote',
      position: 'top',
      quote: quote,
    },
  ];

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative w-full bg-transparent select-none z-40"
      style={{ height: '280vh' }}
    >
      {/* ── STICKY VIEWPORT CONTAINER (Pins to screen during vertical scroll scrub) ── */}
      <div className="sticky top-0 w-full h-[100vh] flex flex-col justify-between overflow-hidden">
        
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
                Timeline
              </motion.h2>
            </div>
          </div>
        </div>

        {/* ════════════════ SCROLL-DRIVEN HORIZONTAL TREE TRACK ════════════════ */}
        <div className="relative w-full flex-grow flex flex-col justify-center overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x, opacity: trackOpacity, scale: trackScale, filter: trackBlur }}
            className="flex gap-6 sm:gap-8 px-8 sm:px-14 lg:px-20 relative py-4 w-max items-center"
          >
            {/* ── Continuous Horizontal Trunk Axis Line ── */}
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-[2.5px] bg-[#5c5c5c]/30 rounded-full z-0 pointer-events-none">
              <motion.div
                className="h-full bg-[#5c5c5c] rounded-full"
                style={{ scaleX: smoothProgress, transformOrigin: 'left' }}
              />
            </div>

            {/* ── Alternating Milestone Columns (First 2 Education, others Experience) ── */}
            {timelineColumns.map((col, idx) => {
              const isTop = col.position === 'top';

              return (
                <div
                  key={col.id}
                  className="shrink-0 w-[270px] sm:w-[290px] lg:w-[310px] flex flex-col select-none relative z-10"
                >
                  {/* 1. UPPER ZONE: Card if isTop, otherwise empty spacer */}
                  <div className="h-[190px] sm:h-[200px] flex flex-col justify-end w-full">
                    {isTop ? (
                      <motion.div
                        initial={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
                        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.1 + idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full"
                      >
                        {col.type === 'quote' ? (
                          <div className="p-4 sm:p-5 rounded-2xl bg-black/[0.035] border border-black/[0.06] backdrop-blur-sm shadow-sm flex flex-col justify-center">
                            <p className="font-montserrat italic text-[12.5px] sm:text-[13.5px] text-[#404040] leading-relaxed">
                              {col.quote.text}
                            </p>
                            <p className="font-montserrat font-semibold text-[11.5px] sm:text-[12.5px] text-[#737373] text-right mt-2 tracking-wide">
                              {col.quote.author}
                            </p>
                          </div>
                        ) : (
                          <div className="p-4 rounded-2xl bg-black/[0.03] hover:bg-black/[0.045] transition-colors border border-black/[0.06] backdrop-blur-[2px] shadow-sm flex flex-col">
                            {/* Category Tag */}
                            <span className="font-montserrat font-bold text-[9.5px] uppercase tracking-wider text-[#737373] bg-black/[0.04] px-2 py-0.5 rounded-full inline-block mb-1.5 self-start">
                              {col.type === 'education' ? 'Education' : 'Experience'}
                            </span>

                            {/* Year / Period */}
                            {col.type === 'education' ? (
                              <h3 className="font-montserrat font-bold text-[14.5px] sm:text-[16px] text-[#404040] leading-none mb-2">
                                {col.period}
                              </h3>
                            ) : (
                              <h3
                                data-testid="experience-year"
                                className="font-montserrat font-bold text-[14.5px] sm:text-[16px] text-[#404040] leading-none mb-2"
                              >
                                {col.year}
                              </h3>
                            )}

                            {/* Entries */}
                            {col.type === 'education' ? (
                              <div className="space-y-1.5">
                                {col.entries.map((entry, eIdx) => (
                                  <div key={eIdx} className="flex items-start gap-1.5">
                                    <span className="w-[6px] h-[6px] rounded-full bg-[#b8b8b8] mt-1.5 shrink-0" />
                                    <div>
                                      <h4 className="font-montserrat font-medium text-[12.5px] text-[#404040] leading-tight">
                                        {entry.title}
                                      </h4>
                                      <p className="font-montserrat text-[11px] text-[#737373] mt-0.5 leading-tight">
                                        {entry.institution}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div>
                                <h4 className="font-montserrat font-medium text-[12.5px] text-[#404040] leading-tight">
                                  {col.title}
                                </h4>
                                <p className="font-montserrat text-[11px] text-[#737373] mt-0.5 leading-tight">
                                  {col.organization}
                                </p>
                              </div>
                            )}
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
                        transition={{ duration: 0.35, delay: 0.15 + idx * 0.05 }}
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
                      transition={{ type: 'spring', stiffness: 450, damping: 20, delay: 0.18 + idx * 0.05 }}
                      className="w-[16px] h-[16px] rounded-full bg-[#5c5c5c] ring-4 ring-white shadow-sm relative z-10 shrink-0"
                    />

                    {/* Lower stem to card if !isTop */}
                    {!isTop ? (
                      <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: 0.15 + idx * 0.05 }}
                        className="w-[2px] h-[19px] bg-[#5c5c5c]"
                        style={{ transformOrigin: 'top' }}
                      />
                    ) : (
                      <div className="w-[2px] h-[19px] opacity-0" />
                    )}
                  </div>

                  {/* 3. LOWER ZONE: Card if !isTop, otherwise empty spacer */}
                  <div className="h-[190px] sm:h-[200px] flex flex-col justify-start w-full">
                    {!isTop ? (
                      <motion.div
                        initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.1 + idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full"
                      >
                        <div className="p-4 rounded-2xl bg-black/[0.03] hover:bg-black/[0.045] transition-colors border border-black/[0.06] backdrop-blur-[2px] shadow-sm flex flex-col">
                          {/* Category Tag */}
                          <span className="font-montserrat font-bold text-[9.5px] uppercase tracking-wider text-[#737373] bg-black/[0.04] px-2 py-0.5 rounded-full inline-block mb-1.5 self-start">
                            {col.type === 'education' ? 'Education' : 'Experience'}
                          </span>

                          {/* Year / Period */}
                          {col.type === 'education' ? (
                            <h3 className="font-montserrat font-bold text-[14.5px] sm:text-[16px] text-[#404040] leading-none mb-2">
                              {col.period}
                            </h3>
                          ) : (
                            <h3
                              data-testid="experience-year"
                              className="font-montserrat font-bold text-[14.5px] sm:text-[16px] text-[#404040] leading-none mb-2"
                            >
                              {col.year}
                            </h3>
                          )}

                          {/* Entries */}
                          {col.type === 'education' ? (
                            <div className="space-y-1.5">
                              {col.entries.map((entry, eIdx) => (
                                <div key={eIdx} className="flex items-start gap-1.5">
                                  <span className="w-[6px] h-[6px] rounded-full bg-[#b8b8b8] mt-1.5 shrink-0" />
                                  <div>
                                    <h4 className="font-montserrat font-medium text-[12.5px] text-[#404040] leading-tight">
                                      {entry.title}
                                    </h4>
                                    <p className="font-montserrat text-[11px] text-[#737373] mt-0.5 leading-tight">
                                      {entry.institution}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div>
                              <h4 className="font-montserrat font-medium text-[12.5px] text-[#404040] leading-tight">
                                {col.title}
                              </h4>
                              <p className="font-montserrat text-[11px] text-[#737373] mt-0.5 leading-tight">
                                {col.organization}
                              </p>
                            </div>
                          )}
                        </div>
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

        {/* ── Apple-Style Scroll Progress Bar & Cue at Bottom ── */}
        <div className="w-full flex flex-col items-center pb-6 z-20 shrink-0 select-none">
          <div className="w-[140px] sm:w-[180px] h-[2px] bg-[#5c5c5c]/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#5c5c5c] rounded-full"
              style={{ scaleX: smoothProgress, transformOrigin: 'left' }}
            />
          </div>
          <div className="flex items-center gap-2 mt-2 text-[#8e8e8e] text-[11.5px] font-montserrat tracking-wide">
            <span className="inline-block animate-pulse">↓</span>
            <span>{scrollHint}</span>
            <span className="inline-block animate-pulse">↓</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Timeline;
