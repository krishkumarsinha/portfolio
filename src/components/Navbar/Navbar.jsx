import React, { useState } from 'react';
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
 * Mobile (< md): hamburger icon that toggles a slide-down drawer.
 */
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#bfbfbf] select-none">
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between h-[43px] px-4 sm:px-6">
        <div className="flex items-center gap-[45px] sm:gap-[52px]">
          {/* Brand / Logo */}
          <a
            href="#"
            className="font-montserrat font-bold text-white text-[18px] sm:text-[20px] tracking-tight leading-none"
          >
            Portfolio
          </a>

          {/* Desktop links (hidden below md) */}
          <div className="hidden md:flex items-center gap-[40px] sm:gap-[48px]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-montserrat text-white text-[15px] font-normal hover:opacity-85 transition-opacity"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Hamburger button (visible below md) */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center w-[44px] h-[44px] -mr-2 gap-[5px]"
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
            className="md:hidden overflow-hidden bg-[#b0b0b0]"
          >
            <div className="flex flex-col py-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-montserrat text-white text-[15px] font-normal px-6 py-3 min-h-[44px] flex items-center hover:bg-[#a5a5a5] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
