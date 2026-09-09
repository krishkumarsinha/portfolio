import React from 'react';
import { motion } from 'framer-motion';
import { proficiencyLeftCategories, proficiencyRightCategories } from '../../data/skills';
import SkillCategory from '../common/SkillCategory';

/**
 * Proficiency component — exact replica of the user-provided Slide 3 (Page 3).
 *
 * Features:
 * - Subtle #eaeaea wavy ribbon SVG in the top-left background passing behind "Proficiency"
 * - Upright Montserrat font-normal "Proficiency" heading in #5c5c5c
 * - Left Column: DRAFTING, 3D MODELLING
 * - Right Column: DOCUMENTATION, GRAPHICS (starts higher than DRAFTING)
 * - Exact dot ratings and spacing matching media_1788913189924.png
 */
export default function Proficiency() {
  return (
    <section id="proficiency" className="relative w-full bg-white overflow-hidden py-14 sm:py-18 lg:py-20 z-30">
      {/* ════════════════ BACKGROUND WAVY RIBBON SVG ════════════════ */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <svg
          viewBox="0 0 1024 576"
          preserveAspectRatio="xMinYMin meet"
          fill="none"
          className="w-full max-w-[1024px] h-auto"
        >
          <path
            d="
              M -5, 140
              C 40, 140, 75, 105, 115, 105
              C 160, 105, 185, 150, 245, 150
              C 320, 150, 365, 80, 393, -5
              L 446, -5
              C 415, 90, 370, 185, 250, 195
              C 175, 200, 150, 160, 110, 160
              C 60, 160, 30, 195, -5, 195
              Z
            "
            fill="#eaeaea"
          />
        </svg>
      </div>

      {/* ════════════════ "PROFICIENCY" HEADING (Flush to Left Margin) ════════════════ */}
      <div className="relative w-full z-10 pl-0 sm:pl-2 lg:pl-4 mb-10 sm:mb-14">
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-montserrat font-normal text-[#5c5c5c] text-[3.8rem] sm:text-[4.6rem] md:text-[5.4rem] lg:text-[6rem] leading-none tracking-tight select-none"
          style={{ marginLeft: '-4px' }}
        >
          Proficiency
        </motion.h2>
      </div>

      {/* ════════════════ TWO-COLUMN ALIGNED WORDS GRID ════════════════ */}
      <div className="relative w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-12 sm:gap-x-16 lg:gap-x-24">
          {/* ────────────── COLUMN 1 (DRAFTING, 3D MODELLING) ────────────── */}
          <div className="flex flex-col gap-10 sm:gap-12">
            {proficiencyLeftCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
              >
                <SkillCategory title={category.title} skills={category.skills} />
              </motion.div>
            ))}
          </div>

          {/* ────────────── COLUMN 2 (DOCUMENTATION, GRAPHICS) ────────────── */}
          <div className="flex flex-col gap-10 sm:gap-12">
            {proficiencyRightCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.12 }}
              >
                <SkillCategory title={category.title} skills={category.skills} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
