import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Timeline from './components/Timeline/Timeline';
import Proficiency from './components/Proficiency/Proficiency';
import Achievements from './components/Achievements/Achievements';
import ArchitecturePage from './pages/ArchitecturePage';
import PhotosPage from './pages/PhotosPage';
import DesignPage from './pages/DesignPage';

function getPageFromHash() {
  if (typeof window === 'undefined') return 'overview';
  const hash = window.location.hash.toLowerCase();
  if (hash === '#architecture' || hash === '#/architecture') return 'architecture';
  if (hash === '#photos' || hash === '#/photos') return 'photos';
  if (hash === '#design' || hash === '#/design') return 'design';
  return 'overview';
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 24,
    scale: 0.988,
    filter: 'blur(8px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.48,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.988,
    filter: 'blur(6px)',
    transition: {
      duration: 0.32,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
    };
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Smooth scroll reset to top & Apple shimmer trigger on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 480);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (hash) => {
    window.location.hash = hash;
  };

  return (
    <div className="min-h-screen paper-bg relative flex flex-col justify-between">
      {/* ── Fixed Paper Texture Ambient Grain Overlay ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-15 mix-blend-multiply bg-repeat"
        style={{
          backgroundImage: "url('/textures/paper-texture.png')",
          backgroundSize: '288px 512px',
        }}
        aria-hidden="true"
      />

      <Navbar activePage={currentPage} />

      {/* ── Apple Page Transition Top Shimmer ── */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0.95 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[43px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ededeb] to-transparent z-50 pointer-events-none origin-left"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentPage === 'architecture' && (
          <motion.div
            key="architecture-page"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex-grow"
          >
            <ArchitecturePage onBack={() => navigateTo('#')} />
          </motion.div>
        )}

        {currentPage === 'photos' && (
          <motion.div
            key="photos-page"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex-grow"
          >
            <PhotosPage onBack={() => navigateTo('#')} />
          </motion.div>
        )}

        {currentPage === 'design' && (
          <motion.div
            key="design-page"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex-grow"
          >
            <DesignPage onBack={() => navigateTo('#')} />
          </motion.div>
        )}

        {currentPage === 'overview' && (
          <motion.div
            key="overview-page"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex-grow flex flex-col"
          >
            <Hero />
            <Timeline />
            <Proficiency />
            <Achievements />

            {/* ════════════════ DEDICATED PAGES SHOWCASE DIRECTORY ════════════════ */}
            <section
              id="showcase-portals"
              className="relative w-full bg-transparent select-none z-20 py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12 lg:px-16"
            >
              <div className="max-w-[1240px] mx-auto">
                <motion.div
                  className="text-center max-w-2xl mx-auto mb-10 sm:mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="font-montserrat font-bold text-[20px] sm:text-[24px] md:text-[28px] text-[#3a3a3a] mb-2 tracking-tight">
                    Explore Portfolios
                  </h3>
                  <p className="font-montserrat text-[13.5px] sm:text-[15px] text-[#666]">
                    Dedicated collections spanning architectural proposals, photographic studies, and editorial design.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  {/* Architecture Portal Card */}
                  <motion.a
                    href="#architecture"
                    className="group relative overflow-hidden flex flex-col justify-between bg-gradient-to-b from-[#ffffff] to-[#f8f8f8] hover:to-[#f0f0f0] border border-black/[0.08] hover:border-black/[0.18] rounded-2xl p-6 sm:p-7"
                    whileHover={{ scale: 1.03, rotateY: -2, rotateX: 1, boxShadow: '0 24px 48px rgba(0,0,0,0.12)', y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                    style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
                  >
                    {/* Apple specular light reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10">
                      <span className="font-montserrat text-[10.5px] font-bold uppercase tracking-widest text-[#666] bg-black/[0.05] border border-black/[0.04] px-2.5 py-1 rounded-full">
                        6 Projects
                      </span>
                      <h4 className="font-montserrat font-bold text-[18px] sm:text-[20px] text-[#3a3a3a] group-hover:text-black mt-4 mb-2 transition-colors">
                        Architecture
                      </h4>
                      <p className="font-montserrat text-[13px] text-[#666] leading-relaxed mb-6">
                        Biophilic tech hubs, terraced vernacular residences, monsoon infrastructure, and adaptive reuse.
                      </p>
                    </div>
                    <span className="relative z-10 font-montserrat text-[13px] font-semibold text-[#3a3a3a] group-hover:text-black flex items-center gap-1.5 transition-colors">
                      <span>View Projects</span>
                      <motion.span animate={{ x: 0 }} whileHover={{ x: 4 }} className="inline-block">→</motion.span>
                    </span>
                  </motion.a>

                  {/* Photos Portal Card */}
                  <motion.a
                    href="#photos"
                    className="group relative overflow-hidden flex flex-col justify-between bg-gradient-to-b from-[#ffffff] to-[#f8f8f8] hover:to-[#f0f0f0] border border-black/[0.08] hover:border-black/[0.18] rounded-2xl p-6 sm:p-7"
                    whileHover={{ scale: 1.03, rotateY: 0, rotateX: 1, boxShadow: '0 24px 48px rgba(0,0,0,0.12)', y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                    style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
                  >
                    {/* Apple specular light reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10">
                      <span className="font-montserrat text-[10.5px] font-bold uppercase tracking-widest text-[#666] bg-black/[0.05] border border-black/[0.04] px-2.5 py-1 rounded-full">
                        8 Studies
                      </span>
                      <h4 className="font-montserrat font-bold text-[18px] sm:text-[20px] text-[#3a3a3a] group-hover:text-black mt-4 mb-2 transition-colors">
                        Photos
                      </h4>
                      <p className="font-montserrat text-[13px] text-[#666] leading-relaxed mb-6">
                        Architectural form studies, chiaroscuro concrete, urban monoliths, and material textures.
                      </p>
                    </div>
                    <span className="relative z-10 font-montserrat text-[13px] font-semibold text-[#3a3a3a] group-hover:text-black flex items-center gap-1.5 transition-colors">
                      <span>View Gallery</span>
                      <motion.span animate={{ x: 0 }} whileHover={{ x: 4 }} className="inline-block">→</motion.span>
                    </span>
                  </motion.a>

                  {/* Design Portal Card */}
                  <motion.a
                    href="#design"
                    className="group relative overflow-hidden flex flex-col justify-between bg-gradient-to-b from-[#ffffff] to-[#f8f8f8] hover:to-[#f0f0f0] border border-black/[0.08] hover:border-black/[0.18] rounded-2xl p-6 sm:p-7"
                    whileHover={{ scale: 1.03, rotateY: 2, rotateX: 1, boxShadow: '0 24px 48px rgba(0,0,0,0.12)', y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                    style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
                  >
                    {/* Apple specular light reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10">
                      <span className="font-montserrat text-[10.5px] font-bold uppercase tracking-widest text-[#666] bg-black/[0.05] border border-black/[0.04] px-2.5 py-1 rounded-full">
                        6 Works
                      </span>
                      <h4 className="font-montserrat font-bold text-[18px] sm:text-[20px] text-[#3a3a3a] group-hover:text-black mt-4 mb-2 transition-colors">
                        Design
                      </h4>
                      <p className="font-montserrat text-[13px] text-[#666] leading-relaxed mb-6">
                        Editorial publication spreads, NASA competition compendiums, fest identities, and screen prints.
                      </p>
                    </div>
                    <span className="relative z-10 font-montserrat text-[13px] font-semibold text-[#3a3a3a] group-hover:text-black flex items-center gap-1.5 transition-colors">
                      <span>View Design</span>
                      <motion.span animate={{ x: 0 }} whileHover={{ x: 4 }} className="inline-block">→</motion.span>
                    </span>
                  </motion.a>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#3a3a3a] hover:bg-[#222222] text-white shadow-lg flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#5c5c5c]"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
