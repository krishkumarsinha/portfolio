import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import projectsData from '../../data/projects.json';

const CATEGORIES = ['All', 'Residential', 'Commercial', 'Interior', 'Conceptual'];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProject, setActiveProject] = useState(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeProject) {
        setActiveProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject]);

  const filteredProjects =
    selectedCategory === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section
      id="architecture"
      className="relative w-full bg-transparent select-none z-20 flex flex-col justify-between min-h-[calc(100svh-43px)] sm:min-h-[calc(100vh-43px)]"
    >
      {/* ════════════════ TOP HEADER BAR (#8e8e8e) ════════════════ */}
      <div className="relative w-full bg-[#8e8e8e] h-[75px] sm:h-[95px] md:h-[110px] lg:h-[125px] flex items-end z-20">
        <div className="relative w-full h-full flex items-end z-50 pl-0 sm:pl-2 lg:pl-4">
          <div
            className="inline-block relative z-50"
            style={{
              marginLeft: '-4px',
              transform: 'translateY(18%)',
            }}
          >
            <motion.h2
              initial={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-montserrat font-normal text-paper-match text-[#ededeb] text-[clamp(1.9rem,5.8vw,5.8rem)] leading-none tracking-tight select-none"
            >
              Architecture
            </motion.h2>
          </div>
        </div>
      </div>

      {/* ════════════════ MAIN CONTENT ════════════════ */}
      <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 pt-8 sm:pt-10 md:pt-12 pb-12 sm:pb-16 flex-grow flex flex-col">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`font-montserrat text-[11px] sm:text-[13px] md:text-[14px] uppercase tracking-wider px-3.5 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full transition-all duration-200 ${
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

        {/* Responsive Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-[1240px] mx-auto w-full"
        >
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ scale: 1.03, y: -6, boxShadow: '0 24px 48px rgba(0,0,0,0.10)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveProject(project)}
                className="group cursor-pointer flex flex-col bg-[#fafafa] border border-[#e5e5e5] rounded-xl overflow-hidden"
                style={{ transition: 'box-shadow 0.3s' }}
                data-testid="project-card"
              >
                {/* Visual Header / Drafting pattern */}
                <div className="relative h-44 sm:h-48 w-full bg-[#ebebeb] flex items-center justify-center overflow-hidden border-b border-[#e5e5e5]">
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#5c5c5c_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="relative z-10 flex flex-col items-center text-center p-4">
                    <span className="font-montserrat text-[10.5px] uppercase tracking-widest text-[#777] font-semibold">
                      {project.category}
                    </span>
                    <span className="font-montserrat text-[13px] sm:text-[14px] text-[#444] font-medium mt-1">
                      {project.year} • {project.location}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-montserrat font-bold text-[16px] sm:text-[17px] text-[#3a3a3a] group-hover:text-black leading-snug mb-2 transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-montserrat text-[12.5px] sm:text-[13.5px] text-[#666666] leading-relaxed line-clamp-3 mb-4">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tools Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#e8e8e8]">
                      {project.tools.slice(0, 4).map((tool) => (
                        <span
                          key={tool}
                          className="font-montserrat text-[10px] sm:text-[11px] font-medium bg-[#e8e8e8] text-[#555] px-2 py-0.5 rounded"
                        >
                          {tool}
                        </span>
                      ))}
                      {project.tools.length > 4 && (
                        <span className="font-montserrat text-[10px] sm:text-[11px] font-medium bg-[#e8e8e8] text-[#777] px-1.5 py-0.5 rounded">
                          +{project.tools.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ════════════════ PROJECT DETAILS MODAL ════════════════ */}
      <AnimatePresence>
        {activeProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/60 backdrop-blur-sm"
            onClick={() => setActiveProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-[#e0e0e0]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Close project modal"
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#555] transition-colors"
              >
                ✕
              </button>

              {/* Modal Category & Metadata */}
              <div className="flex items-center gap-2 mb-2">
                <span className="font-montserrat text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-[#5c5c5c] bg-[#f0f0f0] px-2.5 py-1 rounded-full">
                  {activeProject.category}
                </span>
                <span className="font-montserrat text-[12px] text-[#888]">
                  {activeProject.year} • {activeProject.location}
                </span>
              </div>

              {/* Title */}
              <h2
                id="modal-project-title"
                className="font-montserrat font-bold text-[20px] sm:text-[24px] text-[#222] mb-4 pr-10"
              >
                {activeProject.title}
              </h2>

              {/* Description */}
              <div className="mb-6">
                <h4 className="font-montserrat font-semibold text-[13px] uppercase tracking-wider text-[#777] mb-1.5">
                  Concept & Overview
                </h4>
                <p className="font-montserrat text-[14px] sm:text-[15px] text-[#444] leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {/* Design Process */}
              {activeProject.process && (
                <div className="mb-6">
                  <h4 className="font-montserrat font-semibold text-[13px] uppercase tracking-wider text-[#777] mb-1.5">
                    Design & Technical Process
                  </h4>
                  <p className="font-montserrat text-[14px] sm:text-[15px] text-[#444] leading-relaxed">
                    {activeProject.process}
                  </p>
                </div>
              )}

              {/* Software & Tools */}
              <div>
                <h4 className="font-montserrat font-semibold text-[13px] uppercase tracking-wider text-[#777] mb-2">
                  Tools & Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tools.map((tool) => (
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
    </section>
  );
}
