import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import photosData from '../data/photos.json';

const CATEGORIES = ['All', 'Light & Shadow', 'Monoliths', 'Urban', 'River & Mist'];

export default function PhotosPage({ onBack }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePhoto, setActivePhoto] = useState(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activePhoto) {
        setActivePhoto(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto]);

  const filteredPhotos =
    selectedCategory === 'All'
      ? photosData
      : photosData.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.hash = '#';
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between select-none">
      <div>
        {/* ════════════════ TOP HEADER BAR (#c5c5c5) ════════════════ */}
        <div className="relative w-full bg-[#c5c5c5] h-[75px] sm:h-[95px] md:h-[110px] lg:h-[125px] flex items-end z-20">
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
                className="font-montserrat font-normal text-white text-[2.2rem] min-[360px]:text-[2.5rem] sm:text-[3.5rem] md:text-[4.6rem] lg:text-[5.8rem] leading-none tracking-tight select-none"
              >
                Photos
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
          {/* ════════════════ HERO: MINIMAL CREATIVE COLLAGE ════════════════ */}
          <section id="photos-hero-collage" className="mb-14 sm:mb-20">
            {/* Editorial Heading & Metadata Bar */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-7 sm:mb-9 gap-4 border-b border-[#5c5c5c]/20 pb-5 sm:pb-6">
              <div className="max-w-2xl">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#888] block mb-1.5">
                  [ VISUAL ARCHIVE // 2024 ]
                </span>
                <h2 className="font-montserrat text-[22px] sm:text-[28px] md:text-[32px] font-bold text-[#2b2b2b] tracking-tight leading-tight">
                  Light, Shadow & Constructed Forms
                </h2>
                <p className="font-montserrat text-[13px] sm:text-[14.5px] text-[#666] leading-relaxed mt-2">
                  A photographic inquiry into spatial lightwells, raw transit geometries, urban silhouettes, and human contemplation.
                </p>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-[#777] uppercase tracking-wider shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#5c5c5c] animate-pulse" />
                <span>Interactive Collage // Tap to View</span>
              </div>
            </div>

            {/* Asymmetrical Editorial Collage Grid */}
            <div
              className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4.5 w-full"
              data-testid="hero-collage"
            >
              {/* FRAME 01: Hero Vertical Lightwell Shaft (Left Column: 5 cols on lg) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => setActivePhoto(photosData[0])}
                className="group relative col-span-1 lg:col-span-5 h-[380px] sm:h-[460px] lg:h-[520px] rounded-2xl overflow-hidden cursor-pointer border border-[#e2e2e2] hover:border-[#3a3a3a] transition-all duration-300 shadow-sm hover:shadow-2xl"
                data-testid="hero-collage-item"
              >
                {/* Background Image */}
                <img
                  src={photosData[0].src}
                  alt={photosData[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                  loading="lazy"
                />

                {/* Framing Crosshairs */}
                <span className="absolute top-3 left-3 text-[10px] font-mono text-white/50 select-none drop-shadow-sm">+</span>
                <span className="absolute top-3 right-3 text-[10px] font-mono text-white/50 select-none drop-shadow-sm">+</span>
                <span className="absolute bottom-3 left-3 text-[10px] font-mono text-white/50 select-none drop-shadow-sm">+</span>
                <span className="absolute bottom-3 right-3 text-[10px] font-mono text-white/50 select-none drop-shadow-sm">+</span>

                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white font-mono text-[11px] z-10">
                  <span className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md text-white font-semibold text-[10.5px] border border-white/10">
                    [01]
                  </span>
                  <span className="bg-black/30 backdrop-blur-md text-[10.5px] px-2 py-0.5 rounded tracking-widest uppercase">
                    {photosData[0].category}
                  </span>
                </div>

                {/* Vignette Overlay & Captions */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5 sm:p-6 z-10">
                  <span className="font-mono text-[10px] text-white/70 uppercase tracking-widest block mb-1">
                    {photosData[0].focalLength} • {photosData[0].aperture} • {photosData[0].location}
                  </span>
                  <h3 className="font-montserrat font-bold text-white text-[16px] sm:text-[18px] leading-tight">
                    {photosData[0].title}
                  </h3>
                  <p className="font-montserrat text-white/80 text-[12px] sm:text-[13px] mt-1 line-clamp-2">
                    {photosData[0].caption}
                  </p>
                </div>
              </motion.div>

              {/* RIGHT COLUMN (7 cols on lg): Top Banner + Bottom 3-Card Grid */}
              <div className="col-span-1 lg:col-span-7 flex flex-col gap-3.5 sm:gap-4.5 justify-between">
                {/* FRAME 02: RJPB Platform Golden Hour (Top Wide Horizon) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 }}
                  onClick={() => setActivePhoto(photosData[1])}
                  className="group relative h-[210px] sm:h-[240px] lg:h-[248px] rounded-2xl overflow-hidden cursor-pointer border border-[#e2e2e2] hover:border-[#3a3a3a] transition-all duration-300 shadow-sm hover:shadow-2xl"
                  data-testid="hero-collage-item"
                >
                  <img
                    src={photosData[1].src}
                    alt={photosData[1].title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
                    loading="lazy"
                  />

                  {/* Top Badge */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between text-white font-mono text-[11px] z-10">
                    <span className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md text-white font-semibold text-[10.5px] border border-white/10">
                      [02]
                    </span>
                    <span className="bg-black/30 backdrop-blur-md text-[10.5px] px-2 py-0.5 rounded tracking-widest uppercase">
                      {photosData[1].category}
                    </span>
                  </div>

                  {/* Bottom Captions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent flex flex-col justify-end p-4 sm:p-5 z-10">
                    <span className="font-mono text-[10px] text-white/70 uppercase tracking-widest block mb-0.5">
                      {photosData[1].focalLength} • {photosData[1].aperture} • {photosData[1].location}
                    </span>
                    <h3 className="font-montserrat font-bold text-white text-[15px] sm:text-[17px] leading-snug">
                      {photosData[1].title}
                    </h3>
                  </div>
                </motion.div>

                {/* BOTTOM ROW: 3 Distinct Studies (Sky Tower, Train Berth, Urban Caravan) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4.5 h-auto lg:h-[255px]">
                  {/* FRAME 03: Radial Mast */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.16 }}
                    onClick={() => setActivePhoto(photosData[2])}
                    className="group relative h-[180px] sm:h-[220px] lg:h-full rounded-2xl overflow-hidden cursor-pointer border border-[#e2e2e2] hover:border-[#3a3a3a] transition-all duration-300 shadow-sm hover:shadow-xl"
                    data-testid="hero-collage-item"
                  >
                    <img
                      src={photosData[2].src}
                      alt={photosData[2].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded text-white font-mono font-semibold text-[9.5px] border border-white/10">
                        [03]
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-3.5 z-10">
                      <h4 className="font-montserrat font-bold text-white text-[12.5px] sm:text-[13.5px] leading-tight line-clamp-1">
                        {photosData[2].title}
                      </h4>
                      <span className="font-mono text-[9px] text-white/60 uppercase tracking-widest mt-0.5">
                        {photosData[2].category}
                      </span>
                    </div>
                  </motion.div>

                  {/* FRAME 04: Train Window Seat */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.22 }}
                    onClick={() => setActivePhoto(photosData[3])}
                    className="group relative h-[180px] sm:h-[220px] lg:h-full rounded-2xl overflow-hidden cursor-pointer border border-[#e2e2e2] hover:border-[#3a3a3a] transition-all duration-300 shadow-sm hover:shadow-xl"
                    data-testid="hero-collage-item"
                  >
                    <img
                      src={photosData[3].src}
                      alt={photosData[3].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded text-white font-mono font-semibold text-[9.5px] border border-white/10">
                        [04]
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-3.5 z-10">
                      <h4 className="font-montserrat font-bold text-white text-[12.5px] sm:text-[13.5px] leading-tight line-clamp-1">
                        {photosData[3].title}
                      </h4>
                      <span className="font-mono text-[9px] text-white/60 uppercase tracking-widest mt-0.5">
                        {photosData[3].category}
                      </span>
                    </div>
                  </motion.div>

                  {/* FRAME 05: Urban Caravan */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.28 }}
                    onClick={() => setActivePhoto(photosData[4])}
                    className="group relative h-[180px] sm:h-[220px] lg:h-full rounded-2xl overflow-hidden cursor-pointer border border-[#e2e2e2] hover:border-[#3a3a3a] transition-all duration-300 shadow-sm hover:shadow-xl"
                    data-testid="hero-collage-item"
                  >
                    <img
                      src={photosData[4].src}
                      alt={photosData[4].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded text-white font-mono font-semibold text-[9.5px] border border-white/10">
                        [05]
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-3.5 z-10">
                      <h4 className="font-montserrat font-bold text-white text-[12.5px] sm:text-[13.5px] leading-tight line-clamp-1">
                        {photosData[4].title}
                      </h4>
                      <span className="font-mono text-[9px] text-white/60 uppercase tracking-widest mt-0.5">
                        {photosData[4].category}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════ ARCHIVE GALLERY WITH FILTERS ════════════════ */}
          <section id="photos-archive-gallery">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 gap-2">
              <h3 className="font-montserrat text-[19px] sm:text-[22px] font-bold text-[#3a3a3a] tracking-tight">
                Curated Photographic Series
              </h3>
              <span className="font-montserrat text-[12.5px] text-[#777]">
                Showing {filteredPhotos.length} {filteredPhotos.length === 1 ? 'study' : 'studies'}
              </span>
            </div>

            {/* Category Filters */}
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

            {/* Photos Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              <AnimatePresence>
                {filteredPhotos.map((photo, idx) => (
                  <motion.article
                    key={photo.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15, delay: 0 } }}
                    transition={{ duration: 0.25, delay: Math.min(idx * 0.03, 0.15) }}
                    onClick={() => setActivePhoto(photo)}
                    className="group cursor-pointer flex flex-col bg-[#fafafa] hover:bg-[#f4f4f4] border border-[#e5e5e5] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    data-testid="photo-card"
                  >
                    {/* Photo Image Frame */}
                    <div className="relative h-72 sm:h-80 w-full bg-[#222] overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                      {/* Camera Specs Badge */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white/90 font-mono drop-shadow">
                        <span>{photo.focalLength}</span>
                        <span>{photo.aperture}</span>
                        <span>ISO {photo.iso}</span>
                      </div>
                    </div>

                    {/* Caption info */}
                    <div className="p-5 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-montserrat text-[11px] font-bold uppercase tracking-wider text-[#777] bg-[#eee] px-2 py-0.5 rounded">
                            {photo.category}
                          </span>
                          <span className="font-montserrat text-[12px] text-[#888]">
                            {photo.year}
                          </span>
                        </div>
                        <h4 className="font-montserrat font-bold text-[16px] sm:text-[17px] text-[#3a3a3a] group-hover:text-black leading-snug mb-1.5 transition-colors">
                          {photo.title}
                        </h4>
                        <p className="font-montserrat text-[12.5px] sm:text-[13px] text-[#666] leading-relaxed line-clamp-2">
                          {photo.caption}
                        </p>
                      </div>

                      <span className="font-montserrat text-[11.5px] text-[#888] mt-3 font-medium">
                        {photo.location}
                      </span>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          </section>
        </main>
      </div>

      {/* ════════════════ FULL-SCREEN LIGHTBOX ════════════════ */}
      <AnimatePresence>
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/90 backdrop-blur-md"
            onClick={() => setActivePhoto(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#161616] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                aria-label="Close photo preview"
                className="absolute top-4 right-4 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-colors"
              >
                ✕
              </button>

              {/* High-Res Viewport Frame */}
              <div className="relative flex-1 min-h-[300px] max-h-[62vh] sm:max-h-[68vh] w-full bg-black flex items-center justify-center p-2 sm:p-4 overflow-hidden">
                <img
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  className="max-h-full max-w-full object-contain rounded-lg select-none"
                />
              </div>

              {/* Details Tray */}
              <div className="p-5 sm:p-6 bg-[#1f1f1f] border-t border-white/10 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div>
                    <h3 id="lightbox-title" className="text-lg sm:text-xl font-montserrat font-bold text-white tracking-wide">
                      {activePhoto.title}
                    </h3>
                    <span className="text-white/60 font-montserrat text-xs sm:text-sm">
                      {activePhoto.location} • {activePhoto.year}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-white/80">
                    <span className="bg-white/10 px-2 py-0.5 rounded">{activePhoto.category}</span>
                    <span className="bg-white/10 px-2 py-0.5 rounded">{activePhoto.focalLength}</span>
                    <span className="bg-white/10 px-2 py-0.5 rounded">{activePhoto.aperture}</span>
                    <span className="bg-white/10 px-2 py-0.5 rounded">ISO {activePhoto.iso}</span>
                  </div>
                </div>

                <p className="font-montserrat text-xs sm:text-sm text-white/80 leading-relaxed max-w-3xl mt-2">
                  {activePhoto.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ════════════════ BOTTOM TAB ════════════════ */}
      <div className="w-full bg-[#c5c5c5] h-[15px] sm:h-[28px] lg:h-[40px] shrink-0 z-20" />
    </div>
  );
}
