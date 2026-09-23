import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Architecture', href: '#architecture' },
  { label: 'Photos', href: '#photos' },
  { label: 'Design', href: '#design' },
];

/**
 * Navbar — Apple-inspired sticky nav with scroll-aware backdrop blur,
 * height shrink on scroll, and smooth transitions.
 * Height: 43px default → 38px scrolled. Background: #8e8e8e.
 * Desktop: horizontal links.
 * Mobile (< md): hamburger icon that toggles a slide-down drawer with backdrop dismiss.
 */
const Navbar = ({ activePage = 'overview' }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      const isScrolled = latest > 20;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    });
  }, [scrollY]);

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
      <motion.nav
        className="sticky top-0 z-50 w-full select-none"
        animate={{
          backgroundColor: scrolled ? 'rgba(110,110,110,0.82)' : '#8e8e8e',
          boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.12)' : 'none',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none', WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none' }}
      >
        {/* Subtle scroll progress line at the very top edge */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-[#ededeb]/60 z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        {/* ── Top bar ── */}
        <div
          className="flex items-center justify-between px-4 sm:px-6 h-[43px]"
        >
          <div className="flex items-center gap-[45px] sm:gap-[52px]">
            {/* Brand / Logo */}
            <a
              href="#"
              className="font-montserrat font-bold text-paper-match text-[#ededeb] text-[18px] sm:text-[20px] tracking-tight leading-none focus:outline-none focus:ring-1 focus:ring-[#ededeb]/60 rounded px-0.5"
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
                    className={`font-montserrat text-paper-match text-[#ededeb] text-[15px] transition-all relative py-1 focus:outline-none focus:ring-1 focus:ring-[#ededeb]/60 rounded px-1 ${
                      isActive ? 'font-semibold' : 'font-normal hover:opacity-85'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1 right-1 h-[2px] bg-[#ededeb] rounded-full" />
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
            className="md:hidden flex flex-col justify-center items-center w-[44px] h-[44px] -mr-2 gap-[5px] focus:outline-none focus:ring-1 focus:ring-[#ededeb]/60 rounded"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-[22px] h-[2px] bg-[#ededeb] rounded-full origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-[22px] h-[2px] bg-[#ededeb] rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-[22px] h-[2px] bg-[#ededeb] rounded-full origin-center"
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
              className="md:hidden overflow-hidden bg-[#8e8e8e]/95 backdrop-blur-2xl border-t border-white/15 shadow-xl"
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
                      className={`font-montserrat text-[#ededeb] text-[15px] px-6 py-3 min-h-[44px] flex items-center justify-between transition-colors ${
                        isActive ? 'bg-black/10 font-semibold' : 'font-normal hover:bg-white/10 active:bg-black/15'
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
      </motion.nav>

      {/* Backdrop overlay for mobile drawer — aligns to dynamic navbar height */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMenuOpen(false)}
            style={{ top: '43px' }}
            className="fixed inset-x-0 bottom-0 bg-black/25 backdrop-blur-[4px] z-40 md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
