import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ROLES } from '../data/portfolioData';

const SPIRAL_RINGS = Array.from({ length: 10 }, (_, idx) => idx);

export default function FlipNotebook({ isDark }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => window.clearInterval(interval);
  }, []);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % ROLES.length);
  };

  const pageLabel = `${String(index + 1).padStart(2, '0')} / ${String(
    ROLES.length
  ).padStart(2, '0')}`;

  return (
    <div className="relative pt-3.5 max-w-md w-full select-none">
      {/* Top Metallic Spiral Binding */}
      <div
        className="absolute top-0 left-4 right-4 z-20 flex items-center justify-between pointer-events-none"
        aria-hidden="true"
      >
        {SPIRAL_RINGS.map((ring) => (
          <div key={ring} className="flex flex-col items-center">
            <span
              className={`w-2.5 h-5 rounded-full border-2 transition-colors duration-300 ${
                isDark
                  ? 'border-[#D4AF37]/80 bg-[#0E0E10] shadow-[0_1px_4px_rgba(212,175,55,0.25)]'
                  : 'border-zinc-500 bg-cream shadow-sm'
              }`}
            />
            <span
              className={`w-2 h-2 -mt-1.5 rounded-full transition-colors duration-300 ${
                isDark ? 'bg-[#09090B]' : 'bg-charcoal/20'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Stacked Paper Edge Depth */}
      <div
        className={`relative rounded-xl border transition-colors duration-300 ${
          isDark
            ? 'bg-[#141418] border-[#D4AF37]/25 shadow-[0_18px_40px_-15px_rgba(0,0,0,0.75)]'
            : 'bg-[#EAE2D3] border-charcoal/15 shadow-[0_18px_36px_-18px_rgba(24,24,27,0.25)]'
        }`}
      >
        {/* Interactive Flipping Sheet */}
        <button
          type="button"
          onClick={handleNext}
          title="Click to flip role card"
          className={`relative w-full text-left rounded-xl p-5 pt-7 sm:p-6 sm:pt-8 border transition-colors duration-300 perspective-1200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
            isDark
              ? 'bg-[#18181D] border-[#D4AF37]/30 hover:border-[#D4AF37]/60'
              : 'bg-[#FFFDF9] border-charcoal/15 hover:border-charcoal/35'
          }`}
        >
          {/* Subtle Notebook Horizontal Ruled Lines */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-5 top-8 bottom-8 opacity-35"
            style={{
              backgroundImage: isDark
                ? 'repeating-linear-gradient(to bottom, transparent, transparent 27px, rgba(212,175,55,0.14) 28px)'
                : 'repeating-linear-gradient(to bottom, transparent, transparent 27px, rgba(24,24,27,0.08) 28px)',
            }}
          />

          <div className="relative min-h-[3.75rem] sm:min-h-[4.25rem] flex items-center pr-12">
            <AnimatePresence mode="wait">
              <motion.span
                key={ROLES[index]}
                initial={{ rotateX: -75, opacity: 0, y: -6 }}
                animate={{ rotateX: 0, opacity: 1, y: 0 }}
                exit={{ rotateX: 75, opacity: 0, y: 6 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'top center' }}
                className={`block text-xl sm:text-2xl md:text-[1.7rem] font-bold tracking-tight leading-snug ${
                  isDark ? 'text-[#F4F4F5]' : 'text-charcoal'
                }`}
              >
                {ROLES[index]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Page Counter */}
          <span
            className={`absolute bottom-3 right-4 font-mono text-[11px] font-medium tracking-wider ${
              isDark ? 'text-[#D4AF37]' : 'text-zinc-500'
            }`}
          >
            {pageLabel}
          </span>
        </button>
      </div>
    </div>
  );
}

