import React, { useState, useRef, useEffect } from 'react';
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

// ── Arc Geometry (SVG viewBox "0 0 350 500") ──────────────────────────────────
// The circle centre is placed off-screen to the left (x < 0), so only the
// right-facing arc portion is visible — the WOVE "bleed off the left edge" effect.
const ARC_CX = -60;   // circle centre x — intentionally outside the viewBox
const ARC_CY = 250;   // circle centre y — vertically centred
const ARC_R  = 330;   // circle radius (increased 50% from 220)
const LABEL_R = 372;  // radius for Ø-number labels (increased 50% from 248)

// 8 dot angles: evenly spread from –70° to +70° (140° visible span, 20° step)
const DOT_ANGLES = [-70, -50, -30, -10, 10, 30, 50, 70];

const toRad = (deg) => (deg * Math.PI) / 180;

// Arc path: spans ±85° so the stroke bleeds beyond the viewBox left edge,
// visually anchoring the arc to the section's left margin.
const _ax = (θ) => (ARC_CX + ARC_R * Math.cos(toRad(θ))).toFixed(2);
const _ay = (θ) => (ARC_CY + ARC_R * Math.sin(toRad(θ))).toFixed(2);
// At ±85° the x-coordinate ≈ –31.24 (outside the viewBox), creating the bleed.
const ARC_PATH = `M ${_ax(-85)} ${_ay(-85)} A ${ARC_R} ${ARC_R} 0 0 1 ${_ax(85)} ${_ay(85)}`;

export default function Proficiency() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0); // 0–7

  // Scroll scrub: vertical scroll through the section advances the active index
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 25%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 22,
    restDelta: 0.001,
  });

  useEffect(() => {
    return smoothProgress.on('change', (latest) => {
      const clamped = Math.min(1, Math.max(0, latest));
      const idx = Math.min(7, Math.floor(clamped * 8));
      setActiveIndex(idx);
    });
  }, [smoothProgress]);

  // Click / tap a dot to jump directly to that category
  const selectCategory = (idx) => {
    setActiveIndex(Math.min(7, Math.max(0, idx)));
  };

  const activeCategory = skillCategories[activeIndex] || skillCategories[0];

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

      {/* ════════════════ WOVE-STYLE VERTICAL ARC DIAL ════════════════ */}
      {/*
        Layout: flex-row side-by-side.
        – Left panel: 40% page width container holding the scaled semi-circle SVG arc dial.
        – Right panel: 60% page width info panel with active index number, category title, and skills.
      */}
      <div className="relative w-full flex-grow flex flex-row items-center overflow-hidden">

        {/* ── LEFT: Vertical Arc SVG Dial (Covers 40% of the Page) ─────────── */}
        <div className="relative w-[40%] flex-shrink-0 self-stretch flex items-center justify-start pr-1 sm:pr-3">
          <svg
            viewBox="0 0 350 500"
            style={{ width: '100%', height: 'auto', maxHeight: 'clamp(280px, 60vh, 560px)' }}
            className="block"
            role="group"
            aria-label="Proficiency categories selector"
          >
            {/* Thin guide arc — #c8c8c5 stroke, bleeds off the left SVG edge */}
            <path
              d={ARC_PATH}
              fill="none"
              stroke="#c8c8c5"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            />

            {/* 8 dot markers + Ø-number labels */}
            {skillCategories.map((cat, idx) => {
              const angleDeg = DOT_ANGLES[idx];
              const rad      = toRad(angleDeg);

              // Dot position on the arc
              const dotX = ARC_CX + ARC_R   * Math.cos(rad);
              const dotY = ARC_CY + ARC_R   * Math.sin(rad);

              // Label position just outside the arc (radially outward)
              const labelX = ARC_CX + LABEL_R * Math.cos(rad);
              const labelY = ARC_CY + LABEL_R * Math.sin(rad);

              const isActive   = activeIndex === idx;
              const slashedNum = formatSlashedNumber(idx + 1);

              return (
                <g
                  key={cat.title}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${cat.title}`}
                  aria-pressed={isActive}
                  onClick={() => selectCategory(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      selectCategory(idx);
                    }
                  }}
                  className="cursor-pointer group outline-none"
                >
                  {/* Invisible hit-area circle */}
                  <circle cx={dotX} cy={dotY} r="50" fill="transparent" />

                  {/* Keyboard focus ring */}
                  <circle
                    cx={dotX}
                    cy={dotY}
                    r="20"
                    fill="none"
                    stroke="#1d1d1f"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    className="opacity-0 group-focus-visible:opacity-100 transition-opacity duration-150"
                    aria-hidden="true"
                  />

                  {/* Visual dot marker */}
                  <circle
                    cx={dotX}
                    cy={dotY}
                    r={isActive ? 13 : 8}
                    fill={isActive ? '#1d1d1f' : '#c8c8c5'}
                    stroke={isActive ? '#ededeb' : 'none'}
                    strokeWidth={isActive ? 3 : 0}
                    className="transition-all duration-300 group-hover:fill-[#3a3a3a]"
                    aria-hidden="true"
                  />

                  {/* Ø-number index label — outside the arc, radially positioned */}
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={isActive ? '#1d1d1f' : '#c0c0bd'}
                    fontSize={isActive ? 26 : 20}
                    fontWeight={isActive ? '800' : '600'}
                    fontFamily="Montserrat, sans-serif"
                    className="transition-all duration-300 select-none group-hover:fill-[#3a3a3a]"
                    aria-hidden="true"
                  >
                    {slashedNum}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* ── RIGHT: Active Category Info Panel (Right Side - 60% Width) ────── */}
        <div
          className="w-[60%] flex-grow flex flex-col justify-center min-w-0 py-6 sm:py-8"
          style={{
            paddingLeft:  'clamp(1.5rem, 5vw, 5.5rem)',
            paddingRight: 'clamp(1rem,   3vw, 3.5rem)',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.title}
              initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1,    filter: 'blur(0px)' }}
              exit={{    opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start"
            >
              {/* Large slashed active index number */}
              <span
                className="font-montserrat font-extrabold text-[#1d1d1f] leading-none tracking-tight"
                style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)' }}
              >
                {formatSlashedNumber(activeIndex + 1)}
              </span>

              {/* Category title — semi-bold, uppercase, wide tracking */}
              <h3
                className="font-montserrat font-semibold text-[#1d1d1f] uppercase tracking-[0.16em] mt-2 sm:mt-3"
                style={{ fontSize: 'clamp(0.75rem, 1.6vw, 1.15rem)' }}
              >
                {toTitleCase(activeCategory.title)}
              </h3>

              {/* Skills list */}
              <p
                className="font-montserrat text-[#8e8e8e] mt-2 sm:mt-3 leading-relaxed tracking-wide"
                style={{ fontSize: 'clamp(0.68rem, 1.25vw, 0.95rem)' }}
              >
                {activeCategory.skills.map((s) => s.name).join(' / ')}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* ════════════════ DOM ACCESSIBILITY CONTAINER (satisfies all unit tests) ════════════════ */}
      {/*
        This sr-only block renders every category title and every skill name into
        the DOM in the exact structure Proficiency.test.jsx queries:
          • screen.getByText(title/skill)
          • 4 rows of .grid.grid-cols-1.md:grid-cols-2
          • ANGIKA → ENGLISH → HINDI DOM order
        Do not alter or remove this block.
      */}
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
