import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Architecture', href: '#architecture' },
  { label: 'Photos', href: '#photos' },
  { label: 'Design', href: '#design' },
];

/**
 * Navbar — exact replica of original UI, now responsive.
 * Height: 43px. Background: #bfbfbf.
 * Desktop: horizontal links.
 * Mobile (< md): hamburger icon that toggles a slide-down drawer with backdrop dismiss.
 */
const Navbar = ({ activePage = 'overview' }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on resize to desktop or on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-[#bfbfbf] select-none">
        {/* Subtle scroll progress line at the very top edge */}
        <div
          className="absolute top-0 left-0 h-[2px] bg-[#5c5c5c] transition-all duration-75 z-50"
          style={{ width: `${Math.min(Math.max(scrollProgress * 100, 0), 100)}%` }}
        />

        {/* ── Top bar ── */}
        <div className="flex items-center justify-between h-[43px] px-4 sm:px-6">
          <div className="flex items-center gap-[45px] sm:gap-[52px]">
            {/* Brand / Logo */}
            <a
              href="#"
              className="font-montserrat font-bold text-white text-[18px] sm:text-[20px] tracking-tight leading-none focus:outline-none focus:ring-1 focus:ring-white/60 rounded px-0.5"
            >
              Portfolio
            </a>

            {/* Desktop links (hidden below md) */}
            <div className="hidden md:flex items-center gap-[40px] sm:gap-[48px]">
              {NAV_LINKS.map((link) => {
                const pageKey = link.href.replace('#', '');
                const isActive = activePage === pageKey;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`font-montserrat text-white text-[15px] transition-all relative py-1 focus:outline-none focus:ring-1 focus:ring-white/60 rounded px-1 ${
                      isActive ? 'font-semibold' : 'font-normal hover:opacity-85'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1 right-1 h-[2px] bg-white rounded-full" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Hamburger button (visible below md) */}
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden flex flex-col justify-center items-center w-[44px] h-[44px] -mr-2 gap-[5px] focus:outline-none focus:ring-1 focus:ring-white/60 rounded"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-[22px] h-[2px] bg-white rounded-full origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-[22px] h-[2px] bg-white rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-[22px] h-[2px] bg-white rounded-full origin-center"
            />
          </button>
        </div>

        {/* ── Mobile drawer (below md) ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden bg-[#b0b0b0] border-t border-white/10"
            >
              <div className="flex flex-col py-2">
                {NAV_LINKS.map((link) => {
                  const pageKey = link.href.replace('#', '');
                  const isActive = activePage === pageKey;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`font-montserrat text-white text-[15px] px-6 py-3 min-h-[44px] flex items-center justify-between transition-colors ${
                        isActive ? 'bg-[#9f9f9f] font-semibold' : 'font-normal hover:bg-[#a5a5a5] active:bg-[#999999]'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="text-xs tracking-wider uppercase opacity-80 font-mono">Current</span>
                      )}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Backdrop overlay for mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 top-[43px] bg-black/25 backdrop-blur-[2px] z-40 md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
