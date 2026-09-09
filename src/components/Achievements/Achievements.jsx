import React from 'react';
import { motion } from 'framer-motion';

/**
 * Achievements section — exact replica of original UI (Slide 4).
 *
 * Layout:
 * - Top: 3D RENDERING & OTHERS categories
 * - Full-width gray banner with "Achievements" in large, light weight, white
 * - Content area below
 */
export default function Achievements() {
  return (
    <section id="achievements" className="w-full bg-white">
      {/* ════════════════ GRAY BANNER (#b8b8b8) ════════════════ */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#b8b8b8] py-5 px-6 sm:px-12 lg:px-16"
      >
        <h2 className="font-montserrat font-extralight text-[4.5rem] sm:text-[5.5rem] lg:text-[6.5rem] text-white leading-[0.95]">
          Achievements
        </h2>
      </motion.div>

      {/* Placeholder content area */}
      <div className="bg-white py-20 px-10 min-h-[250px] flex items-center justify-center">
        <p className="font-montserrat text-[#aaa] text-lg italic">
          Coming soon...
        </p>
      </div>
    </section>
  );
}
