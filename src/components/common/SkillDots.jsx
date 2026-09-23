import React from 'react';
import { motion } from 'framer-motion';
import { SKILL_LOGOS, DEFAULT_ICON } from './skillLogos';

const DEFAULT_DOTS = [0, 1, 2, 3, 4];

/**
 * SkillDots — displays a skill name accompanied by its custom vector logo,
 * animated with minimal creative hover physics.
 * If showDots=true (used in unit tests / explicit dot requests), renders the rating dots bar.
 */
const SkillDots = React.memo(({ name, rating, total = 5, showDots = true }) => {
  const icon = SKILL_LOGOS[name?.toUpperCase()] || DEFAULT_ICON;
  const dotsArray = total === 5 ? DEFAULT_DOTS : Array.from({ length: total }, (_, i) => i);

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
          {dotsArray.map((i) => {
            const isFilled = i < rating;
            return (
              <div
                key={i}
                data-testid={isFilled ? 'skill-dot-filled' : 'skill-dot-unfilled'}
                className={`w-[9px] h-[9px] sm:w-[11px] sm:h-[11px] rounded-full transition-all duration-200 hover:scale-125 ${
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
});

export default SkillDots;