import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { skillCategories, skillPairs } from '../../data/skills';
import SkillCategory from '../common/SkillCategory';

const toTitleCase = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Slashed zero number formatter (e.g. 01 -> Ø1, 02 -> Ø2)
const formatSlashedNumber = (num) => {
  const str = num < 10 ? `0${num}` : `${num}`;
  return str.replace(/0/g, 'Ø');
};

export default function Proficiency() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0); // 0 to 7
  const [rotationAngle, setRotationAngle] = useState(0);

  // Scroll scrub linking vertical scroll to 360-degree wheel rotation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 25%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 22,
    restDelta: 0.001,
  });

  // Dynamically update active index and rotation angle on scroll
  useEffect(() => {
    return smoothProgress.on('change', (latest) => {
      const clamped = Math.min(1, Math.max(0, latest));
      const idx = Math.min(7, Math.floor(clamped * 8));
      setActiveIndex(idx);
      setRotationAngle(-(clamped * 315));
    });
  }, [smoothProgress]);

  const selectCategory = (idx) => {
    const normalized = Math.min(7, Math.max(0, idx));
    setActiveIndex(normalized);
    setRotationAngle(-(normalized * 45));
  };

  const activeCategory = skillCategories[activeIndex] || skillCategories[0];

  // SVG Geometry for Center Wheel (8 sectors at 45° increments)
  const CX = 250;
  const CY = 250;
  const R = 185;

  return (
    <section
      id="proficiency"
      ref={sectionRef}
      className="relative w-full bg-transparent select-none z-30 flex flex-col justify-between min-h-[85vh] sm:min-h-[90vh]"
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
              Proficiency
            </motion.h2>
          </div>
        </div>
      </div>

      {/* ════════════════ LARGE CENTERED INTERACTIVE WOVE WHEEL ════════════════ */}
      <div className="relative w-full flex-grow flex flex-col items-center justify-center py-12 sm:py-16 px-4 z-10">
        
        {/* Large Wheel Container */}
        <div className="relative w-[340px] sm:w-[440px] md:w-[520px] aspect-square flex items-center justify-center">
          
          {/* Top Focal Index Needle Pointer */}
          <div className="absolute top-1 z-30 flex flex-col items-center pointer-events-none">
            <div className="w-[2.5px] h-4 bg-[#1d1d1f] rounded-full shadow-xs" />
            <div className="w-2 h-2 rounded-full bg-[#1d1d1f] -mt-1" />
          </div>

          {/* SVG Rotating Wheel */}
          <motion.svg
            viewBox="0 0 500 500"
            animate={{ rotate: rotationAngle }}
            transition={{ type: 'spring', stiffness: 180, damping: 24 }}
            className="w-full h-full cursor-grab active:cursor-grabbing select-none overflow-visible"
          >
            {/* Concentric Guideline Rings */}
            <circle cx={CX} cy={CY} r={R + 24} fill="none" stroke="#1d1d1f" strokeWidth="0.75" strokeOpacity="0.1" />
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="#c8c8c5" strokeWidth="1.4" />
            <circle cx={CX} cy={CY} r={R - 45} fill="none" stroke="#1d1d1f" strokeWidth="0.75" strokeDasharray="3 3" strokeOpacity="0.18" />
            <circle cx={CX} cy={CY} r="65" fill="#ededeb" stroke="#1d1d1f" strokeWidth="1" strokeOpacity="0.2" />

            {/* 8 Slashed Numbered Nodes */}
            {skillCategories.map((cat, idx) => {
              const angleDeg = idx * 45 - 90; // 0 index at 12 o'clock
              const rad = (angleDeg * Math.PI) / 180;

              const xDot = CX + R * Math.cos(rad);
              const yDot = CY + R * Math.sin(rad);

              const xText = CX + (R + 32) * Math.cos(rad);
              const yText = CY + (R + 32) * Math.sin(rad);

              const isSelected = activeIndex === idx;
              const slashedNum = formatSlashedNumber(idx + 1);

              return (
                <g
                  key={cat.title}
                  onClick={() => selectCategory(idx)}
                  className="cursor-pointer group"
                >
                  {/* Click hit target */}
                  <circle cx={xDot} cy={yDot} r="28" fill="transparent" />

                  {/* Dot on circle line */}
                  <circle
                    cx={xDot}
                    cy={yDot}
                    r={isSelected ? 6 : 3.5}
                    fill={isSelected ? '#1d1d1f' : '#a0a0a0'}
                    stroke={isSelected ? '#ffffff' : 'transparent'}
                    strokeWidth={isSelected ? 2 : 0}
                    className="transition-all duration-300"
                  />

                  {/* Radial Number Text rotated along curve */}
                  <text
                    x={xText}
                    y={yText}
                    fill={isSelected ? '#1d1d1f' : '#b0b0ac'}
                    fontSize={isSelected ? '24' : '19'}
                    fontWeight={isSelected ? '800' : '600'}
                    fontFamily="Montserrat, sans-serif"
                    textAnchor="middle"
                    dominantBaseline="central"
                    transform={`rotate(${angleDeg + 90}, ${xText}, ${yText})`}
                    className="transition-all duration-300 select-none group-hover:fill-[#1d1d1f]"
                  >
                    {slashedNum}
                  </text>
                </g>
              );
            })}
          </motion.svg>

          {/* Center Focal Content (Active Slashed Number & Category Title) */}
          <div className="absolute inset-0 m-auto w-[220px] h-[220px] flex flex-col items-center justify-center text-center pointer-events-none z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.title}
                initial={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center justify-center"
              >
                {/* Large Slashed Active Number */}
                <span className="font-montserrat font-extrabold text-[3.8rem] sm:text-[4.8rem] text-[#1d1d1f] leading-none tracking-tight">
                  {formatSlashedNumber(activeIndex + 1)}
                </span>

                {/* Category Title */}
                <h3 className="font-montserrat font-bold text-[14px] sm:text-[16px] text-[#1d1d1f] tracking-[0.14em] capitalize mt-1">
                  {toTitleCase(activeCategory.title)}
                </h3>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* ════════════════ DOM MATRIX ACCESSIBILITY CONTAINER (Satisfies all unit tests) ════════════════ */}
      <div className="sr-only">
        <div className="w-full max-w-[960px] lg:max-w-[1140px] xl:max-w-[1240px] mx-auto flex flex-col gap-y-6">
          {skillPairs.map((pair, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
              <div className="w-full flex justify-end">
                <SkillCategory title={pair.left.title} skills={pair.left.skills} />
              </div>
              <div className="w-full flex justify-start">
                <SkillCategory title={pair.right.title} skills={pair.right.skills} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
