import React from 'react';
import { motion } from 'framer-motion';
import { SKILL_LOGOS, DEFAULT_ICON } from '../common/skillLogos';

export const getSkillLevel = (rating, isLanguage = false) => {
  if (isLanguage) {
    switch (rating) {
      case 5:
        return 'Native';
      case 4:
        return 'Fluent';
      case 3:
        return 'Professional';
      case 2:
        return 'Conversational';
      default:
        return 'Basic';
    }
  }
  switch (rating) {
    case 5:
      return 'Expert';
    case 4:
      return 'Advanced';
    case 3:
      return 'Proficient';
    case 2:
      return 'Intermediate';
    default:
      return 'Foundational';
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
  },
};

const RATING_STEPS = [0, 1, 2, 3, 4];

/**
 * SkillMatrix — Renders an architectural matrix of tools/skills with
 * custom vector logos, 5-dot rating matrix, numeric score, and proficiency level tag.
 */
const SkillMatrix = React.memo(function SkillMatrix({ skills = [], isLanguage = false, compact = false }) {
  if (!skills || skills.length === 0) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full flex flex-col gap-2 sm:gap-2.5"
    >
      {/* Matrix Header */}
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-montserrat uppercase tracking-[0.14em] text-[#8e8e8e] border-b border-black/[0.08] pb-1 px-1">
        <span>Tool / Skill</span>
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="hidden sm:inline">Rating Matrix</span>
          <span className="sm:hidden">Rating</span>
          <span className="w-16 sm:w-20 text-right">Level</span>
        </div>
      </div>

      {/* Matrix Rows */}
      {skills.map((skill) => {
        const icon = SKILL_LOGOS[skill.name?.toUpperCase()] || DEFAULT_ICON;
        const level = getSkillLevel(skill.rating, isLanguage);

        return (
          <motion.div
            key={skill.name}
            variants={itemVariants}
            whileHover={{ x: 2 }}
            className={`group flex items-center justify-between gap-3 px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-lg transition-colors ${
              compact
                ? 'bg-black/[0.02] hover:bg-black/[0.04]'
                : 'hover:bg-black/[0.03] border border-transparent hover:border-black/[0.05]'
            }`}
            data-testid="skill-matrix-row"
          >
            {/* Left: Minimal Logo Badge + Name */}
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-[6px] bg-[#e8e8e6] group-hover:bg-[#1d1d1f] text-[#3a3a3a] group-hover:text-white flex items-center justify-center transition-all duration-200 shrink-0 shadow-xs"
                aria-hidden="true"
              >
                {icon}
              </div>
              <span className="font-montserrat font-semibold text-[12px] sm:text-[13.5px] text-[#1d1d1f] uppercase tracking-wider truncate">
                {skill.name}
              </span>
            </div>

            {/* Right: 5-Dot Matrix + Score + Level Tag */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              {/* 5-Dot Matrix */}
              <div className="flex items-center gap-1 sm:gap-1.5" aria-label={`Rating: ${skill.rating} out of 5`}>
                {RATING_STEPS.map((i) => {
                  const isFilled = i < skill.rating;
                  return (
                    <div
                      key={i}
                      data-testid={isFilled ? 'skill-dot-filled' : 'skill-dot-unfilled'}
                      className={`w-[7px] h-[7px] sm:w-[8.5px] sm:h-[8.5px] rounded-full transition-colors ${
                        isFilled ? 'bg-[#1d1d1f]' : 'bg-[#d5d5d2]'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Numeric Score */}
              <span className="font-montserrat font-semibold text-[11px] sm:text-xs text-[#5c5c5c] w-6 text-center tabular-nums">
                {skill.rating}/5
              </span>

              {/* Architectural Level Badge */}
              <span className="w-16 sm:w-20 text-right px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-montserrat font-medium bg-black/[0.04] text-[#3a3a3a] border border-black/[0.06] tracking-wide whitespace-nowrap">
                {level}
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
});

export default SkillMatrix;
