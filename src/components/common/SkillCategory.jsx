import React from 'react';
import SkillDots from './SkillDots';

/**
 * SkillCategory — renders a category title and list of skills with dot ratings.
 *
 * Matches the original UI:
 * - Category title: bold, uppercase, ~16px, dark, wide tracking
 * - Each skill row spaced ~28px apart
 * - No max-width constraint so rows fill available space on all screens
 */
const SkillCategory = ({ title, skills }) => {
  return (
    <div className="w-full">
      {/* Category heading */}
      <h3 className="font-montserrat font-bold text-[15px] sm:text-[17px] md:text-[18px] text-[#3a3a3a] uppercase tracking-[0.08em] mb-2 sm:mb-2.5 md:mb-3">
        {title}
      </h3>

      {/* Skills list */}
      <div className="flex flex-col gap-[7px] sm:gap-[9px] md:gap-[10px]">
        {skills.map((skill) => (
          <div key={skill.name} data-testid="skill-item">
            <SkillDots name={skill.name} rating={skill.rating} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCategory;
