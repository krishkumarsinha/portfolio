import React from 'react';
import { motion } from 'framer-motion';
import { skillPairs } from '../../data/skills';
import SkillCategory from '../common/SkillCategory';

/**
 * Proficiency component — exact replica of Slide 3,
 * with all 8 groups aligned in 4 balanced rows across 2 columns,
 * symmetrically centered to match Timeline and Achievements.
 */
export default function Proficiency() {
  return (
    <section
      id="proficiency"
      className="relative w-full bg-white select-none overflow-hidden z-30 flex flex-col justify-between min-h-[calc(100svh-43px-15px)] sm:min-h-[calc(100vh-43px-28px)] lg:min-h-[calc(100vh-43px-40px)]"
    >
      {/* ════════════════ TOP HEADER BAR (#c5c5c5) ════════════════ */}
      <div className="relative w-full bg-[#c5c5c5] h-[75px] sm:h-[95px] md:h-[110px] lg:h-[125px] flex items-end z-20">
        <div className="relative w-full h-full flex items-end z-50 pl-0 sm:pl-2 lg:pl-4">
          <div
            className="inline-block relative z-50"
            style={{
              marginLeft: '-4px',
              transform: 'translateY(18%)',
            }}
          >
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-montserrat font-normal text-white text-[2.5rem] sm:text-[3.5rem] md:text-[4.6rem] lg:text-[5.8rem] leading-none tracking-tight select-none"
            >
              Proficiency
            </motion.h2>
          </div>
        </div>
      </div>

      {/* ════════════════ ALL 8 GROUPS ROW-BY-ROW ALIGNED GRID ════════════════ */}
      <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 pt-3 sm:pt-4 md:pt-6 lg:pt-6 pb-4 sm:pb-6 lg:pb-8 flex-grow flex flex-col justify-center z-10">
        <div className="w-full max-w-[960px] lg:max-w-[1140px] xl:max-w-[1240px] mx-auto flex flex-col gap-y-3.5 sm:gap-y-4 md:gap-y-5 lg:gap-y-6">
          {/* 4 Row-by-Row Aligned Pairs */}
          {skillPairs.map((pair, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-y-3.5 md:gap-y-0"
            >
              {/* Left Column Group — Equal Margin to Centerline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full flex justify-center md:justify-end md:pr-12 lg:pr-20 xl:pr-28"
              >
                <div className="w-full max-w-[320px] sm:max-w-[340px]">
                  <SkillCategory
                    title={pair.left.title}
                    skills={pair.left.skills}
                  />
                </div>
              </motion.div>

              {/* Right Column Group — Equal Margin from Centerline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="w-full flex justify-center md:justify-start md:pl-12 lg:pl-20 xl:pl-28"
              >
                <div className="w-full max-w-[320px] sm:max-w-[340px]">
                  <SkillCategory
                    title={pair.right.title}
                    skills={pair.right.skills}
                  />
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
