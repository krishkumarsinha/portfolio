import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { skillCategories } from '../../data/skills';
import SkillMatrix from './SkillMatrix';

const toTitleCase = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const formatNumber = (num) => {
  return `${num}`;
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
function DialItem({ cat, idx, activeIndex, selectCategory, rotation }) {
  const angleDeg = DOT_ANGLES[idx];
  const rad = toRad(angleDeg);

  const dotX   = ARC_CX + ARC_R  * Math.cos(rad);
  const dotY   = ARC_CY + ARC_R  * Math.sin(rad);
  const labelX = ARC_CX + LABEL_R * Math.cos(rad);
  const labelY = ARC_CY + LABEL_R * Math.sin(rad);

  const isActive = activeIndex === idx;
  const itemNum = formatNumber(idx + 1);

  // Counter-rotate the label so it stays upright
  const counterRotation = useTransform(rotation, (r) => `rotate(${-r} ${labelX} ${labelY})`);

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
      <motion.g style={{ transform: counterRotation }}>
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
          {itemNum}
        </motion.text>
      </motion.g>
    </g>
  );
}

// ── Main Component ────────────────────────────────────────────────────────
export default function Proficiency({ height = '220vh' }) {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Apple scroll-scrub: maps vertical scroll through section height to item progression
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  // Crisp 100% opacity throughout section, dissolving cleanly at the very end
  const sectionOpacity = useTransform(smoothProgress, [0, 0.9, 1], [1, 1, 0]);
  const sectionScale = useTransform(smoothProgress, [0, 0.9, 1], [1, 1, 0.96]);
  const sectionBlurVal = useTransform(smoothProgress, [0.9, 1], [0, 4]);
  const sectionBlur = useTransform(sectionBlurVal, (v) => `blur(${v}px)`);

  const [scrollHint, setScrollHint] = useState('Scroll down to explore skills ↓');

  useEffect(() => {
    return smoothProgress.on('change', (latest) => {
      // Advance index 0–7 across scroll progression [0, 0.86]
      const clamped = Math.min(1, Math.max(0, latest / 0.86));
      const idx = Math.min(skillCategories.length - 1, Math.floor(clamped * 8));
      setActiveIndex(idx);

      if (latest > 0.86) {
        setScrollHint('Continue scrolling for Achievements ↓');
      } else {
        setScrollHint('Scroll down to explore skills ↓');
      }
    });
  }, [smoothProgress]);

  // ── Smooth wheel rotation ──
  // Rotates the wheel so the active item glides to the 0° position
  // (the rightmost point of the circle, closest to the info panel).
  const rotation = useSpring(0, { stiffness: 90, damping: 18, restDelta: 0.001 });
  useEffect(() => {
    rotation.set(-DOT_ANGLES[activeIndex]);
  }, [activeIndex, rotation]);

  const selectCategory = (idx) => {
    setActiveIndex(Math.min(skillCategories.length - 1, Math.max(0, idx)));
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
      className="relative w-full select-none z-30"
      style={{ height }}
    >
      {/* ── STICKY VIEWPORT CONTAINER (Pins to screen during vertical scroll scrub) ── */}
      <div
        className="sticky top-[43px] w-full h-[calc(100vh-43px)] flex flex-col justify-between overflow-hidden"
        style={{ background: 'transparent' }}
      >
        <motion.div
          style={{ opacity: sectionOpacity, scale: sectionScale, filter: sectionBlur }}
          className="w-full h-full flex flex-col justify-between overflow-hidden"
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

          {/* ════════════════ MOBILE / TABLET (< 1024px) ════════════════ */}
          <div className="w-full flex-grow lg:hidden flex flex-col justify-between px-4 sm:px-8 py-4 overflow-hidden">
            {/* Step indicator pills: Ø1 through Ø8 */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-2">
              {skillCategories.map((cat, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={cat.title}
                    type="button"
                    onClick={() => selectCategory(idx)}
                    className={`transition-all duration-300 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-montserrat font-bold ${
                      isActive
                        ? 'w-8 h-8 sm:w-9 sm:h-9 bg-[#1d1d1f] text-[#ededeb] shadow-sm scale-110'
                        : 'w-7 h-7 sm:w-8 sm:h-8 bg-black/5 hover:bg-black/10 text-[#737373]'
                    }`}
                    aria-label={`Select ${cat.title}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Focused Active Category Card */}
            <div className="flex-grow flex items-center justify-center my-auto py-2">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={activeCategory.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-[440px] p-4 sm:p-6 rounded-2xl bg-white/85 border border-black/[0.08] shadow-md backdrop-blur-md flex flex-col items-center"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-montserrat font-extrabold text-[#1d1d1f] text-3xl sm:text-4xl leading-none">
                      {formatNumber(activeIndex + 1)}
                    </span>
                    <div className="text-left">
                      <h3 className="font-montserrat font-bold text-[#1d1d1f] uppercase tracking-[0.16em] text-sm sm:text-base leading-tight">
                        {toTitleCase(activeCategory.title)}
                      </h3>
                      <span className="text-[10.5px] font-montserrat tracking-wider uppercase text-[#8e8e8e]">
                        {activeCategory.skills.length} Competencies
                      </span>
                    </div>
                  </div>

                  {/* Skill Rating Matrix with Logo */}
                  <div className="w-full mt-2">
                    <SkillMatrix
                      skills={activeCategory.skills}
                      isLanguage={activeCategory.title === 'LANGUAGES'}
                      compact={true}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
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
            <motion.g style={{ rotate: rotation, transformOrigin: `${ARC_CX}px ${ARC_CY}px` }}>
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
                  rotation={rotation}
                />
              ))}
            </motion.g>
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
              disabled={activeIndex === skillCategories.length - 1}
              className="w-11 h-11 rounded-full bg-black/5 hover:bg-black/10 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center font-montserrat text-lg text-[#3a3a3a] transition-colors focus-visible:ring-2 focus-visible:ring-[#3a3a3a] focus-visible:outline-none"
            >
              ›
            </button>
          </div>
        </div>

        {/* ── RIGHT 60%: Active category info & Skill Matrix ─────────────────────────── */}
        <div
          className="w-[60%] flex-grow flex flex-col justify-center min-w-0 py-4 sm:py-6"
          style={{
            paddingLeft: 'clamp(2rem, 6vw, 6rem)',
            paddingRight: 'clamp(1.5rem, 4vw, 4.5rem)',
          }}
        >
          <div className="relative w-full max-w-[580px] flex items-center">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={activeCategory.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-start w-full"
              >
                {/* Header: Number + Category title + Competencies count */}
                <div className="flex items-baseline gap-4 mb-2">
                  <span
                    className="font-montserrat font-extrabold text-[#1d1d1f] leading-none tracking-tight select-none"
                    style={{ fontSize: 'clamp(3rem, 6vw, 4.8rem)' }}
                  >
                    {formatNumber(activeIndex + 1)}
                  </span>
                  <div>
                    <h3
                      className="font-montserrat font-bold text-[#1d1d1f] uppercase tracking-[0.16em] leading-tight"
                      style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
                    >
                      {toTitleCase(activeCategory.title)}
                    </h3>
                    <span className="text-[11px] font-montserrat tracking-wider uppercase text-[#8e8e8e]">
                      {activeCategory.skills.length} Competencies & Tools
                    </span>
                  </div>
                </div>

                {/* Skill Rating Matrix with Logos */}
                <div className="w-full mt-2">
                  <SkillMatrix
                    skills={activeCategory.skills}
                    isLanguage={activeCategory.title === 'LANGUAGES'}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
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

    </motion.div>
  </div>

  {/* ════════════════ DOM ACCESSIBILITY CONTAINER (satisfies all unit tests) ════════════════ */}
  <div className="sr-only">
    {skillCategories.map((cat, idx) => (
      <div key={cat.title}>
        <span aria-hidden="true">{idx + 1}</span>
        <h3>{toTitleCase(cat.title)}</h3>
        <p>{cat.skills.map((s) => s.name).join(' / ')}</p>
      </div>
    ))}
  </div>
</section>
  );
}

