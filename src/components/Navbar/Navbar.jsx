import React from 'react';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Architecture', href: '#architecture' },
  { label: 'Photos', href: '#photos' },
  { label: 'Design', href: '#design' },
];

/**
 * Navbar — exact replica of original UI.
 * Height: 43px. Background: #bfbfbf.
 * Left-aligned items: "Portfolio" in bold Montserrat (not italic),
 * followed by "Architecture", "Photos", "Design".
 */
const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -45, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 w-full bg-[#bfbfbf] h-[43px] flex items-center px-4 sm:px-6 select-none"
    >
      <div className="flex items-center gap-[45px] sm:gap-[52px]">
        {/* Brand / Logo */}
        <a
          href="#"
          className="font-montserrat font-bold text-white text-[20px] tracking-tight leading-none"
        >
          Portfolio
        </a>

        {/* Links */}
        <div className="flex items-center gap-[40px] sm:gap-[48px]">
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
    </motion.nav>
  );
};

export default Navbar;
