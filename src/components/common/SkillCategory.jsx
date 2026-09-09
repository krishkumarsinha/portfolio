import React from 'react';
import SkillDots from './SkillDots';

/**
 * SkillCategory — renders a category title and list of skills with dot ratings.
 *
 * Matches the original UI:
 * - Category title: bold, uppercase, ~16px, dark, wide tracking
 * - Each skill row spaced ~28px apart
 */
const SkillCategory = ({ title, skills }) => {
  return (
    <div className="mb-2">
      {/* Category heading */}
      <h3 className="font-montserrat font-bold text-[18px] sm:text-[20px] text-[#3a3a3a] uppercase tracking-[0.08em] mb-6">
        {title}
      </h3>

      {/* Skills list */}
      <div className="flex flex-col gap-[14px] sm:gap-[16px] max-w-[440px]">
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
