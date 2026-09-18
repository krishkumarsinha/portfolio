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
const SkillCategory = ({ title, skills, showDots = false }) => {
  return (
    <div className="w-full">
      {/* Category heading */}
      <h3 className="font-montserrat font-bold text-[14px] sm:text-[15.5px] md:text-[16.5px] text-[#3a3a3a] uppercase tracking-[0.08em] mb-2 sm:mb-2.5 md:mb-3">
        {title}
      </h3>

      {/* Skills list */}
      <div className="flex flex-col gap-[6px] sm:gap-[7.5px] md:gap-[8.5px]">
        {skills.map((skill) => (
          <div key={skill.name} data-testid="skill-item">
            <SkillDots name={skill.name} rating={skill.rating} showDots={showDots} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCategory;
