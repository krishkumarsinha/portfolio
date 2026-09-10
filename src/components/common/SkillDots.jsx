import React from 'react';

/**
 * SkillDots — renders a skill name with bullet prefix and filled/unfilled dot indicators.
 *
 * Responsive:
 * - Dots and bullet scale down slightly on mobile
 * - Skill name uses min-w-0 + truncate as a safety net for very narrow screens
 * - Dots are 9px on mobile, 11px on sm+
 */
const SkillDots = ({ name, rating, total = 5 }) => {
  return (
    <div className="flex items-center justify-between gap-3" data-testid="skill-dots-row">
      {/* Bullet + Skill name */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="w-[6px] h-[6px] sm:w-[8px] sm:h-[8px] rounded-full bg-[#b8b8b8] flex-shrink-0" />
        <span className="font-montserrat text-[12px] sm:text-[13.5px] md:text-[14.5px] font-medium text-[#5c5c5c] uppercase tracking-wider truncate">
          {name}
        </span>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-[5px] sm:gap-[7px] flex-shrink-0">
        {Array.from({ length: total }, (_, i) => {
          const isFilled = i < rating;
          return (
            <div
              key={i}
              data-testid={`skill-dot ${isFilled ? 'skill-dot-filled' : 'skill-dot-unfilled'}`}
              className={`w-[9px] h-[9px] sm:w-[11px] sm:h-[11px] rounded-full ${
                isFilled ? 'bg-[#5c5c5c]' : 'bg-[#c5c5c5]'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SkillDots;
