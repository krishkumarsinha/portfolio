import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
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

const formatSlashedNumber = (num) => {
  const str = num < 10 ? `0${num}` : `${num}`;
  return str.replace(/0/g, 'Ø');
};

// ── Semi-Circle Geometry ──────────────────────────────────────────────────
// The circle centre sits at x = 0 (left margin). Only the right half is
// visible because the SVG viewBox starts at x = 0, clipping everything
// to the left of the margin automatically.
//
// viewBox: "0 0 540 950"   centre: (0, 475)
// This gives the semi-circle enough room for all 8 items + labels from
// top to bottom within the viewBox.
const ARC_CX = 0;
const ARC_CY = 475;
const ARC_R  = 420;    // radius for dot markers (large semicircle)
const LABEL_R = 470;   // radius for Ø-number labels (outside the arc)

// Initial angles: 8 items on the right semicircle, top-to-bottom.
// Item 1 at –70° (top-right) → Item 8 at +70° (bottom-right), 20° apart.
const DOT_ANGLES = [-70, -50, -30, -10, 10, 30, 50, 70];

const toRad = (deg) => (deg * Math.PI) / 180;

// ── Dial Item (counter-rotates label text to stay upright) ────────────────
function DialItem({ cat, idx, activeIndex, selectCategory, currentRot }) {
  const angleDeg = DOT_ANGLES[idx];
  const rad = toRad(angleDeg);

  const dotX   = ARC_CX + ARC_R  * Math.cos(rad);
  const dotY   = ARC_CY + ARC_R  * Math.sin(rad);
  const labelX = ARC_CX + LABEL_R * Math.cos(rad);
  const labelY = ARC_CY + LABEL_R * Math.sin(rad);

  const isActive   = activeIndex === idx;
  const slashedNum = formatSlashedNumber(idx + 1);

  return (
    <g
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
      className="cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-[#3a3a3a] focus-visible:outline-none"
    >
      {/* Invisible touch hit-area */}
      <circle cx={dotX} cy={dotY} r="40" fill="transparent" />

      {/* Pulsing halo around the active dot */}
      {isActive && (
        <circle
          cx={dotX}
          cy={dotY}
          r="16"
          fill="none"
          stroke="#1d1d1f"
          strokeWidth="1.5"
          opacity="0.25"
          className="animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Visual dot */}
      <circle
        cx={dotX}
        cy={dotY}
        r={isActive ? 12 : 6}
        fill={isActive ? '#1d1d1f' : '#8e8e8e'}
        stroke={isActive ? '#ededeb' : 'none'}
        strokeWidth={isActive ? 2.5 : 0}
        className="transition-all duration-300 ease-out group-hover:fill-[#3a3a3a]"
        aria-hidden="true"
      />

      {/* Upright counter-rotating Ø-number */}
      <g transform={`rotate(${-currentRot} ${labelX} ${labelY})`}>
        <motion.text
          x={labelX}
          y={labelY}
          textAnchor="middle"
          dominantBaseline="central"
          animate={{
            fill: isActive ? '#1d1d1f' : '#b8b8b5',
            fontSize: isActive ? 24 : 17,
            fontWeight: isActive ? 800 : 600,
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          fontFamily="Montserrat, sans-serif"
          className="select-none group-hover:fill-[#3a3a3a]"
          aria-hidden="true"
        >
          {slashedNum}
        </motion.text>
      </g>
    </g>
  );
}

// ── Main Component ────────────────────────────────────────────────────────
export default function Proficiency() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll-scrub: advance index 0–7 as section scrolls through viewport
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

  // ── Smooth wheel rotation ──
  // Rotates the wheel so the active item glides to the 0° position
  // (the rightmost point of the circle, closest to the info panel).
  const rotation = useSpring(0, { stiffness: 90, damping: 18, restDelta: 0.001 });
  const [currentRot, setCurrentRot] = useState(0);

  useEffect(() => {
    rotation.set(-DOT_ANGLES[activeIndex]);
  }, [activeIndex, rotation]);

  useEffect(() => {
    return rotation.on('change', (v) => setCurrentRot(v));
  }, [rotation]);

  const selectCategory = (idx) => {
    setActiveIndex(Math.min(7, Math.max(0, idx)));
  };

  const handleDialKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      selectCategory(activeIndex + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      selectCategory(activeIndex - 1);
    }
  };

  const activeCategory = skillCategories[activeIndex] || skillCategories[0];

  return (
    <section
      id="proficiency"
      ref={sectionRef}
      className="relative w-full bg-[#ededeb] paper-bg select-none z-30 flex flex-col justify-between min-h-[85vh] sm:min-h-[90vh] py-phi-lg"
    >
      {/* ════════════════ TOP HEADER BAR ════════════════ */}
      <div className="relative w-full bg-[#8e8e8e] h-[50px] sm:h-[60px] lg:h-[74px] flex items-end z-20 shrink-0">
        <div className="relative w-full h-full flex items-end z-50 pl-0 sm:pl-2 lg:pl-4">
          <div
            className="inline-block relative z-50"
            style={{ marginLeft: '-4px', transform: 'translateY(24.8%)' }}
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

      {/* ════════════════ MOBILE / TABLET GRID (< 1024px) ════════════════ */}
      <div className="@container w-full flex-grow lg:hidden px-4 sm:px-8 mt-12 mb-8">
        <div 
          className="grid gap-phi-md @sm:grid-cols-2 @2xl:grid-cols-3"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))' }}
        >
          {skillCategories.map((cat, idx) => (
            <div
              key={cat.title}
              className="flex flex-col p-phi-sm border border-black/[0.08] rounded-2xl bg-white/75 backdrop-blur-sm shadow-sm hover:border-black/20 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-montserrat font-extrabold text-[#1d1d1f] text-3xl leading-none">
                  {formatSlashedNumber(idx + 1)}
                </span>
                <span
                  aria-hidden="true"
                  className="aspect-square w-9 h-9 rounded-lg bg-[#ededeb] border border-black/[0.05] flex items-center justify-center font-montserrat text-xs font-bold text-[#3a3a3a]"
                >
                  Ø{idx + 1}
                </span>
              </div>
              <h3 className="font-montserrat font-semibold text-[#1d1d1f] uppercase tracking-[0.16em] text-sm mb-2">
                {toTitleCase(cat.title)}
              </h3>
              <p className="font-montserrat text-[#5c5c5c] text-sm leading-relaxed tracking-wide">
                {cat.skills.map((s) => s.name).join(' / ')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════ SEMI-CIRCLE DIAL + INFO PANEL (Desktop >= 1024px) ════════════════ */}
      <div className="relative w-full flex-grow hidden lg:flex flex-row items-center overflow-hidden">

        {/* ── LEFT 40%: Semi-circle dial ──────────────────────────────── */}
        <div className="relative w-[40%] flex-shrink-0 self-stretch flex items-center justify-start">
          <svg
            viewBox="0 0 540 950"
            preserveAspectRatio="xMinYMid meet"
            style={{ width: '100%', height: 'auto', maxHeight: '85vh' }}
            className="block focus-visible:ring-2 focus-visible:ring-[#3a3a3a] focus-visible:outline-none"
            role="group"
            aria-label="Proficiency categories selector. Use arrow keys to navigate."
            tabIndex={0}
            onKeyDown={handleDialKeyDown}
          >
            {/* ── Static: faint guide semicircle (doesn't rotate) ── */}
            <path
              d={`M 0 ${ARC_CY - ARC_R} A ${ARC_R} ${ARC_R} 0 0 1 0 ${ARC_CY + ARC_R}`}
              fill="none"
              stroke="#dcdcd9"
              strokeWidth="1"
              aria-hidden="true"
            />

            {/* ── Static: centre-axis tick on the left margin ── */}
            <line
              x1="0" y1={ARC_CY - 8}
              x2="0" y2={ARC_CY + 8}
              stroke="#b0b0ad"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            />

            {/* ── Rotating group: spins around (0, 475) ── */}
            <g transform={`rotate(${currentRot} ${ARC_CX} ${ARC_CY})`}>
              {/* Full circle guide track (left half naturally clipped) */}
              <circle
                cx={ARC_CX}
                cy={ARC_CY}
                r={ARC_R}
                fill="none"
                stroke="#c8c8c5"
                strokeWidth="1.25"
                strokeDasharray="6 6"
                opacity="0.5"
                aria-hidden="true"
              />

              {/* 8 dot + label items */}
              {skillCategories.map((cat, idx) => (
                <DialItem
                  key={cat.title}
                  cat={cat}
                  idx={idx}
                  activeIndex={activeIndex}
                  selectCategory={selectCategory}
                  currentRot={currentRot}
                />
              ))}
            </g>
          </svg>

          {/* Prev / Next buttons */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
            <button
              type="button"
              aria-label="Previous skill category"
              onClick={() => selectCategory(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="w-11 h-11 rounded-full bg-black/5 hover:bg-black/10 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center font-montserrat text-lg text-[#3a3a3a] transition-colors focus-visible:ring-2 focus-visible:ring-[#3a3a3a] focus-visible:outline-none"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next skill category"
              onClick={() => selectCategory(activeIndex + 1)}
              disabled={activeIndex === 7}
              className="w-11 h-11 rounded-full bg-black/5 hover:bg-black/10 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center font-montserrat text-lg text-[#3a3a3a] transition-colors focus-visible:ring-2 focus-visible:ring-[#3a3a3a] focus-visible:outline-none"
            >
              ›
            </button>
          </div>
        </div>

        {/* ── RIGHT 60%: Active category info ─────────────────────────── */}
        <div
          className="w-[60%] flex-grow flex flex-col justify-center min-w-0 py-6 sm:py-8"
          style={{
            paddingLeft: 'clamp(2.5rem, 8vw, 8rem)',
            paddingRight: 'clamp(1.5rem, 4vw, 4rem)',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.title}
              initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
              exit={{    opacity: 0, y: -18, filter: 'blur(10px)' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start"
            >
              {/* Large slashed index number */}
              <motion.span
                className="font-montserrat font-extrabold text-[#1d1d1f] leading-none tracking-tight"
                style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)' }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {formatSlashedNumber(activeIndex + 1)}
              </motion.span>

              {/* Category title */}
              <motion.h3
                className="font-montserrat font-semibold text-[#1d1d1f] uppercase tracking-[0.16em] mt-2 sm:mt-3"
                style={{ fontSize: 'clamp(0.75rem, 1.6vw, 1.15rem)' }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                {toTitleCase(activeCategory.title)}
              </motion.h3>

              {/* Skills list */}
              <motion.p
                className="font-montserrat text-[#8e8e8e] mt-2 sm:mt-3 leading-relaxed tracking-wide"
                style={{ fontSize: 'clamp(0.68rem, 1.25vw, 0.95rem)' }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {activeCategory.skills.map((s) => s.name).join(' / ')}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

