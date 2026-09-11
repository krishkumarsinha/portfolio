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

function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash);
  const [showBackToTop, setShowBackToTop] = useState(false);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (hash) => {
    window.location.hash = hash;
  };

  return (
    <div className="min-h-screen bg-white relative flex flex-col justify-between">
      <Navbar activePage={currentPage} />

      <AnimatePresence mode="wait">
        {currentPage === 'architecture' && (
          <motion.div
            key="architecture-page"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex-grow"
          >
            <ArchitecturePage onBack={() => navigateTo('#')} />
          </motion.div>
        )}

        {currentPage === 'photos' && (
          <motion.div
            key="photos-page"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex-grow"
          >
            <PhotosPage onBack={() => navigateTo('#')} />
          </motion.div>
        )}

        {currentPage === 'design' && (
          <motion.div
            key="design-page"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex-grow"
          >
            <DesignPage onBack={() => navigateTo('#')} />
          </motion.div>
        )}

        {currentPage === 'overview' && (
          <motion.div
            key="overview-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-grow flex flex-col"
          >
            <Hero />
            <Timeline />
            <Proficiency />
            <Achievements />

            {/* ════════════════ DEDICATED PAGES SHOWCASE DIRECTORY ════════════════ */}
            <section
              id="showcase-portals"
              className="relative w-full bg-white select-none z-20 py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12 lg:px-16"
            >
              <div className="max-w-[1240px] mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
                  <h3 className="font-montserrat font-bold text-[20px] sm:text-[24px] md:text-[28px] text-[#3a3a3a] mb-2 tracking-tight">
                    Explore Portfolios
                  </h3>
                  <p className="font-montserrat text-[13.5px] sm:text-[15px] text-[#666]">
                    Dedicated collections spanning architectural proposals, photographic studies, and editorial design.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  {/* Architecture Portal Card */}
                  <a
                    href="#architecture"
                    className="group flex flex-col justify-between bg-[#fafafa] hover:bg-[#f3f3f3] border border-[#e5e5e5] rounded-xl p-6 sm:p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div>
                      <span className="font-montserrat text-[10.5px] font-bold uppercase tracking-widest text-[#777] bg-[#eee] px-2.5 py-1 rounded-full">
                        6 Projects
                      </span>
                      <h4 className="font-montserrat font-bold text-[18px] sm:text-[20px] text-[#3a3a3a] group-hover:text-black mt-4 mb-2 transition-colors">
                        Architecture
                      </h4>
                      <p className="font-montserrat text-[13px] text-[#666] leading-relaxed mb-6">
                        Biophilic tech hubs, terraced vernacular residences, monsoon infrastructure, and adaptive reuse.
                      </p>
                    </div>
                    <span className="font-montserrat text-[13px] font-semibold text-[#3a3a3a] group-hover:text-black flex items-center gap-1.5 transition-colors">
                      <span>View Projects</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </a>

                  {/* Photos Portal Card */}
                  <a
                    href="#photos"
                    className="group flex flex-col justify-between bg-[#fafafa] hover:bg-[#f3f3f3] border border-[#e5e5e5] rounded-xl p-6 sm:p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div>
                      <span className="font-montserrat text-[10.5px] font-bold uppercase tracking-widest text-[#777] bg-[#eee] px-2.5 py-1 rounded-full">
                        8 Studies
                      </span>
                      <h4 className="font-montserrat font-bold text-[18px] sm:text-[20px] text-[#3a3a3a] group-hover:text-black mt-4 mb-2 transition-colors">
                        Photos
                      </h4>
                      <p className="font-montserrat text-[13px] text-[#666] leading-relaxed mb-6">
                        Architectural form studies, chiaroscuro concrete, urban monoliths, and material textures.
                      </p>
                    </div>
                    <span className="font-montserrat text-[13px] font-semibold text-[#3a3a3a] group-hover:text-black flex items-center gap-1.5 transition-colors">
                      <span>View Gallery</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </a>

                  {/* Design Portal Card */}
                  <a
                    href="#design"
                    className="group flex flex-col justify-between bg-[#fafafa] hover:bg-[#f3f3f3] border border-[#e5e5e5] rounded-xl p-6 sm:p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div>
                      <span className="font-montserrat text-[10.5px] font-bold uppercase tracking-widest text-[#777] bg-[#eee] px-2.5 py-1 rounded-full">
                        6 Works
                      </span>
                      <h4 className="font-montserrat font-bold text-[18px] sm:text-[20px] text-[#3a3a3a] group-hover:text-black mt-4 mb-2 transition-colors">
                        Design
                      </h4>
                      <p className="font-montserrat text-[13px] text-[#666] leading-relaxed mb-6">
                        Editorial publication spreads, NASA competition compendiums, fest identities, and screen prints.
                      </p>
                    </div>
                    <span className="font-montserrat text-[13px] font-semibold text-[#3a3a3a] group-hover:text-black flex items-center gap-1.5 transition-colors">
                      <span>View Design</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </a>
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
