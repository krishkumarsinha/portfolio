import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import designsData from '../data/designs.json';

const CATEGORIES = ['All', 'Branding', 'Editorial', 'Posters', 'Digital'];

export default function DesignPage({ onBack }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeDesign, setActiveDesign] = useState(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeDesign) {
        setActiveDesign(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDesign]);

  const filteredDesigns =
    selectedCategory === 'All'
      ? designsData
      : designsData.filter((d) => d.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.hash = '#';
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col justify-between select-none">
      <div>
        {/* ════════════════ TOP HEADER BAR (#8e8e8e) ════════════════ */}
        <div className="relative w-full bg-[#8e8e8e] h-[75px] sm:h-[95px] md:h-[110px] lg:h-[125px] flex items-end z-20">
          <div className="relative w-full h-full flex items-end justify-between z-50 pl-0 sm:pl-2 lg:pl-4 pr-4 sm:pr-8">
            <div
              className="inline-block relative z-50"
              style={{
                marginLeft: '-4px',
                transform: 'translateY(18%)',
              }}
            >
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="font-montserrat font-normal text-paper-match text-[#ededeb] text-[clamp(1.9rem,5.8vw,5.8rem)] leading-none tracking-tight select-none"
              >
                Design
              </motion.h1>
            </div>

            {/* Back Button */}
            <button
              type="button"
              onClick={handleBack}
              className="mb-3 sm:mb-4 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/90 hover:bg-white text-[#3a3a3a] font-montserrat text-[12px] sm:text-[13px] font-semibold tracking-wide shadow-sm hover:shadow transition-all flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Overview</span>
            </button>
          </div>
        </div>

        {/* ════════════════ MAIN CONTENT ════════════════ */}
        <main className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 pt-8 sm:pt-12 pb-16">
          {/* Section Introduction */}
          <div className="max-w-3xl mb-8 sm:mb-12">
            <h2 className="font-montserrat text-[20px] sm:text-[24px] font-bold text-[#3a3a3a] mb-2 tracking-tight">
              Graphic & Editorial Design
            </h2>
            <p className="font-montserrat text-[13.5px] sm:text-[15px] text-[#666] leading-relaxed">
              Identity systems, architectural editorial publications, typography experiments, and spatial signage.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`font-montserrat text-[11px] sm:text-[13px] uppercase tracking-wider px-4 sm:px-5 py-2 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-[#5c5c5c] text-white shadow-sm font-semibold'
                      : 'bg-[#f0f0f0] text-[#5c5c5c] hover:bg-[#e4e4e4] font-medium'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Designs Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence>
              {filteredDesigns.map((design, idx) => (
                <motion.article
                  key={design.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  onClick={() => setActiveDesign(design)}
                  className="group cursor-pointer flex flex-col bg-[#fafafa] hover:bg-[#f4f4f4] border border-[#e5e5e5] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  data-testid="design-card"
                >
                  {/* Card Visual Header */}
                  <div className="relative h-48 w-full bg-[#f0f0f0] flex flex-col items-center justify-center p-6 border-b border-[#e5e5e5] overflow-hidden">
                    {/* Typography Pattern Motif */}
                    <div className="absolute -right-4 -bottom-4 text-[7rem] font-bold text-[#e2e2e2] select-none leading-none pointer-events-none font-mono">
                      {design.category.charAt(0)}
                    </div>
                    <span className="font-montserrat text-[10.5px] uppercase tracking-widest text-[#777] font-semibold mb-1">
                      {design.category}
                    </span>
                    <span className="font-montserrat text-[13px] text-[#444] font-medium text-center">
                      {design.client}
                    </span>
                    <span className="font-montserrat text-[12px] text-[#888] mt-1">
                      {design.year}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="font-montserrat font-bold text-[17px] text-[#3a3a3a] group-hover:text-black leading-snug mb-2 transition-colors">
                        {design.title}
                      </h3>
                      <p className="font-montserrat text-[13px] text-[#666] leading-relaxed line-clamp-3 mb-4">
                        {design.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#e8e8e8]">
                      <div className="flex flex-wrap gap-1.5">
                        {design.tools.map((tool) => (
                          <span
                            key={tool}
                            className="font-montserrat text-[11px] font-medium bg-[#e8e8e8] text-[#555] px-2 py-0.5 rounded"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>

      {/* ════════════════ DESIGN DETAILS MODAL ════════════════ */}
      <AnimatePresence>
        {activeDesign && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/60 backdrop-blur-sm"
            onClick={() => setActiveDesign(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="design-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-[#e0e0e0]"
            >
              <button
                type="button"
                onClick={() => setActiveDesign(null)}
                aria-label="Close design modal"
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#555] transition-colors"
              >
                ✕
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="font-montserrat text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-[#5c5c5c] bg-[#f0f0f0] px-2.5 py-1 rounded-full">
                  {activeDesign.category}
                </span>
                <span className="font-montserrat text-[12px] text-[#888]">
                  {activeDesign.year} • {activeDesign.client}
                </span>
              </div>

              <h2
                id="design-modal-title"
                className="font-montserrat font-bold text-[20px] sm:text-[24px] text-[#222] mb-4 pr-10"
              >
                {activeDesign.title}
              </h2>

              <div className="mb-6">
                <h4 className="font-montserrat font-semibold text-[13px] uppercase tracking-wider text-[#777] mb-1.5">
                  Project Brief & Overview
                </h4>
                <p className="font-montserrat text-[14px] sm:text-[15px] text-[#444] leading-relaxed">
                  {activeDesign.description}
                </p>
              </div>

              {activeDesign.process && (
                <div className="mb-6">
                  <h4 className="font-montserrat font-semibold text-[13px] uppercase tracking-wider text-[#777] mb-1.5">
                    Creative Process & Rationale
                  </h4>
                  <p className="font-montserrat text-[14px] sm:text-[15px] text-[#444] leading-relaxed">
                    {activeDesign.process}
                  </p>
                </div>
              )}

              <div>
                <h4 className="font-montserrat font-semibold text-[13px] uppercase tracking-wider text-[#777] mb-2">
                  Software & Production Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeDesign.tools.map((tool) => (
                    <span
                      key={tool}
                      className="font-montserrat text-[12px] font-medium bg-[#f0f0f0] text-[#333] px-3 py-1 rounded-md"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ════════════════ BOTTOM TAB ════════════════ */}
      <div className="w-full bg-[#8e8e8e] h-[15px] sm:h-[28px] lg:h-[40px] shrink-0 z-20" />
    </div>
  );
}
