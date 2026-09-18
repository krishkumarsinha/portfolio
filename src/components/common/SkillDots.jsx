import React from 'react';
import { motion } from 'framer-motion';

/**
 * Tailored Minimal Vector SVGs for every architectural software and skill
 */
const SKILL_LOGOS = {
  'AUTO CAD': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <path d="M4 20L12 4l8 16" />
      <path d="M7 14.5h10" />
      <line x1="12" y1="4" x2="12" y2="20" strokeDasharray="1.5 1.5" strokeWidth="1.2" />
    </svg>
  ),
  'RAYON': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <path d="M3 20c3-5 7-9 13-10 3 0 5 2 5 5 0 5-5 5-10 5H3z" />
      <circle cx="8" cy="15.5" r="1.5" fill="currentColor" />
    </svg>
  ),
  'SKETCHUP': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  'REVIT': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h5a3 3 0 0 1 0 6H8V7z" />
      <path d="M12 13l4 6" />
      <line x1="8" y1="13" x2="8" y2="19" />
    </svg>
  ),
  'ARCHICAD': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <polygon points="12 2 2 22 22 22" />
      <line x1="12" y1="2" x2="12" y2="22" strokeDasharray="2 2" />
      <line x1="7" y1="14" x2="17" y2="14" />
    </svg>
  ),
  'PHOTOGRAMMETRY': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="3.5" />
      <line x1="12" y1="9.5" x2="12" y2="16.5" strokeDasharray="1.5 1.5" />
    </svg>
  ),
  'PHYSICAL MODELLING': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <polygon points="14 2 22 10 10 22 2 22 2 14 14 2" />
      <line x1="10" y1="6" x2="18" y2="14" />
    </svg>
  ),
  'LAZER CUTTING': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <path d="M12 2v7" />
      <path d="M9 9h6l-1 4h-4z" />
      <line x1="12" y1="13" x2="12" y2="19" strokeDasharray="2 2" />
      <line x1="4" y1="21" x2="20" y2="21" />
      <circle cx="12" cy="20.5" r="0.75" fill="currentColor" />
    </svg>
  ),
  'PHOTOSHOP': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <rect x="3" y="3" width="18" height="18" rx="3.5" />
      <path d="M8 8h3.5a2.5 2.5 0 0 1 0 5H8v4" />
      <path d="M14.5 14.5c.5.5 1.2.8 1.8.8.8 0 1.2-.4 1.2-.9 0-1.1-2.5-.8-2.5-2.2 0-.8.7-1.4 1.8-1.4.7 0 1.3.3 1.7.7" />
    </svg>
  ),
  'ILLUSTRATOR': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <rect x="3" y="3" width="18" height="18" rx="3.5" />
      <path d="M7 16l3-8 3 8" />
      <line x1="8" y1="13.5" x2="12" y2="13.5" />
      <line x1="16" y1="11" x2="16" y2="16" />
      <circle cx="16" cy="8.5" r=".7" fill="currentColor" />
    </svg>
  ),
  'INDESIGN': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <rect x="3" y="3" width="18" height="18" rx="3.5" />
      <line x1="8" y1="8" x2="8" y2="16" />
      <path d="M12 16V8h2.5a3.5 3.5 0 0 1 0 7H12" />
    </svg>
  ),
  'LIGHTROOM': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <rect x="3" y="3" width="18" height="18" rx="3.5" />
      <path d="M8 8v8h4" />
      <path d="M14 11v5" />
      <path d="M14 12.5c.5-.5 1-.7 1.8-.7" />
    </svg>
  ),
  'D5 RENDER': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <rect x="3" y="3" width="18" height="18" rx="3.5" />
      <path d="M7.5 8h3a3.5 3.5 0 0 1 0 7h-3V8z" />
      <path d="M16.5 8h-2.5v3.5h1.5a1.5 1.5 0 0 1 0 3H14" />
    </svg>
  ),
  'LUMION': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9 12 2" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  ),
  'ENSCAPE': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
      <path d="M12 12L3 7" />
      <path d="M12 12v10" />
      <path d="M12 12l9-5" />
      <circle cx="12" cy="12" r="1.75" fill="currentColor" />
    </svg>
  ),
  'TWINMOTION': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <path d="M4 12a8 8 0 0 1 16 0" />
      <path d="M20 12a8 8 0 0 1-16 0" strokeDasharray="3 3" />
      <polygon points="11 7 15 12 11 17 11 7" />
    </svg>
  ),
  'AI PROMPT RENDERING': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <path d="M12 3v3m0 12v3M3 12h3m12 0h3" />
      <path d="M18.36 5.64l-2.12 2.12m-8.48 8.48l-2.12 2.12m0-12.72l2.12 2.12m8.48 8.48l2.12 2.12" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  'FIGMA': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
      <path d="M12 9h3.5a3.5 3.5 0 1 1 0 7H12V9z" />
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
    </svg>
  ),
  'CANVA': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <circle cx="12" cy="12" r="9" />
      <path d="M15 8.5a5 5 0 1 0 0 7" />
    </svg>
  ),
  'AI WEB DEVLOPMENT': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <polyline points="7 8 3 12 7 16" />
      <polyline points="17 8 21 12 17 16" />
      <line x1="13" y1="6" x2="11" y2="18" />
      <circle cx="12" cy="7" r="1" fill="currentColor" />
    </svg>
  ),
  'ANGIKA': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="1.75" />
    </svg>
  ),
  'ENGLISH': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <circle cx="12" cy="12" r="9" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 3a14.5 14.5 0 0 0 0 18" />
      <path d="M12 3a14.5 14.5 0 0 1 0 18" />
    </svg>
  ),
  'HINDI': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <line x1="4" y1="4" x2="20" y2="4" />
      <line x1="16" y1="4" x2="16" y2="20" />
      <path d="M6 8a3 3 0 0 1 5 0c0 2-2 3-4 3 2 0 4 1 4 4a3 3 0 0 1-5 1" />
      <line x1="11" y1="12" x2="16" y2="12" />
    </svg>
  ),
  'COMMUNICATION': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  'TEAM LEADERSHIP': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  'PROBLEM SOLVING': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.3A7 7 0 0 0 12 2z" />
    </svg>
  ),
};

const DEFAULT_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

/**
 * SkillDots â€” displays a skill name accompanied by its custom vector logo,
 * animated with minimal creative hover physics.
 * If showDots=true (used in unit tests / explicit dot requests), renders the rating dots bar.
 */
const SkillDots = ({ name, rating, total = 5, showDots = true }) => {
  const icon = SKILL_LOGOS[name?.toUpperCase()] || DEFAULT_ICON;

  return (
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ type: 'spring', stiffness: 450, damping: 24 }}
      className="group flex items-center justify-between gap-3 py-1 cursor-default"
      data-testid="skill-dots-row"
    >
      {/* Creative Minimal Logo + Skill Name */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        {/* Animated Minimal Logo Badge */}
        <motion.div
          whileHover={{ scale: 1.18, rotate: -5 }}
          transition={{ type: 'spring', stiffness: 380, damping: 18 }}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-[7px] bg-[#e8e8e6] group-hover:bg-[#383838] text-[#555555] group-hover:text-[#ffffff] flex items-center justify-center transition-colors duration-200 shadow-sm shrink-0"
        >
          {icon}
        </motion.div>

        {/* Skill Name */}
        <span className="font-montserrat text-[12px] sm:text-[13px] md:text-[14px] font-semibold text-[#505050] group-hover:text-[#181818] uppercase tracking-wider transition-colors duration-200 truncate">
          {name}
        </span>
      </div>

      {/* When showDots is true, render the rating dots bar (preserves unit tests) */}
      {showDots && (
        <div className="flex items-center gap-[5px] sm:gap-[7px] flex-shrink-0">
          {Array.from({ length: total }, (_, i) => {
            const isFilled = i < rating;
            return (
              <motion.div
                key={i}
                initial={{ scale: 0.2, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  stiffness: 340,
                  damping: 18,
                  delay: 0.05 + i * 0.07,
                }}
                whileHover={{ scale: 1.35 }}
                data-testid={`skill-dot ${isFilled ? 'skill-dot-filled' : 'skill-dot-unfilled'}`}
                className={`w-[9px] h-[9px] sm:w-[11px] sm:h-[11px] rounded-full transition-colors ${
                  isFilled ? 'bg-[#5c5c5c]' : 'bg-[#c5c5c5]'
                }`}
              />
            );
          })}
        </div>
      )}

      {/* When showDots is false, render creative minimal architectural hover hairline accent */}
      {!showDots && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileHover={{ opacity: 1, scaleX: 1 }}
          className="hidden sm:block w-5 h-[1.5px] bg-[#8e8e8e]/50 rounded-full origin-right transition-opacity duration-300 ml-auto"
        />
      )}
    </motion.div>
  );
};

export default SkillDots;