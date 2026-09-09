import React from 'react';

/**
 * SkillDots — renders a skill name with bullet prefix and filled/unfilled dot indicators.
 *
 * Matches the original UI:
 * - Small gray bullet (6px) before the skill name
 * - Skill name in uppercase, regular weight, gray
 * - 5 dots on the right: filled (#4a4a4a) or unfilled (#d1d1d1)
 * - Dots are 10px diameter with 6px gap
 */
const SkillDots = ({ name, rating, total = 5 }) => {
  return (
    <div className="flex items-center justify-between" data-testid="skill-dots-row">
      {/* Bullet + Skill name */}
      <div className="flex items-center gap-3">
        <div className="w-[8px] h-[8px] rounded-full bg-[#b8b8b8] flex-shrink-0" />
        <span className="font-montserrat text-[13.5px] sm:text-[14.5px] font-medium text-[#5c5c5c] uppercase tracking-wider">
          {name}
        </span>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-[7px]">
        {Array.from({ length: total }, (_, i) => {
          const isFilled = i < rating;
          return (
            <div
              key={i}
              data-testid={`skill-dot ${isFilled ? 'skill-dot-filled' : 'skill-dot-unfilled'}`}
              className={`w-[11px] h-[11px] rounded-full ${
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
