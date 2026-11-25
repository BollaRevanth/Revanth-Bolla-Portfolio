import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { JOURNEY_ITEMS } from '../data/portfolioData';

export default function Journey({ isDark }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    let rafId = null;

    const updateActiveMilestone = () => {
      rafId = null;
      const focusLine = window.innerHeight * 0.42;
      let bestIdx = 0;
      let bestDistance = Infinity;

      itemRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height * 0.4;
        const dist = Math.abs(center - focusLine);
        if (dist < bestDistance) {
          bestDistance = dist;
          bestIdx = idx;
        }
      });

      setActiveIndex((prev) => (prev === bestIdx ? prev : bestIdx));
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateActiveMilestone);
      }
    };

    updateActiveMilestone();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="journey"
      className={`py-20 sm:py-28 border-t ${
        isDark ? 'border-white/10' : 'border-charcoal/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16"
        >
          <p
            className={`font-mono text-xs uppercase tracking-[0.22em] mb-3 ${
              isDark ? 'text-[#D4AF37]' : 'text-zinc-500'
            }`}
          >
            Engineering Timeline
          </p>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
              isDark ? 'text-offwhite' : 'text-charcoal'
            }`}
          >
            Let&apos;s Go Back in Time
          </h2>
        </motion.div>

        {/* Sticky Split-Screen Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Sticky Large Year Readout */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div
              className={`rounded-3xl border p-6 sm:p-8 transition-colors duration-300 ${
                isDark
                  ? 'bg-[#141418] border-white/10'
                  : 'bg-[#FAF6EE] border-charcoal/12'
              }`}
            >
              <span
                className={`font-mono text-[11px] uppercase tracking-[0.25em] ${
                  isDark ? 'text-zinc-400' : 'text-zinc-500'
                }`}
              >
                Timeline Marker
              </span>

              <div className="mt-2 h-24 sm:h-28 flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={JOURNEY_ITEMS[activeIndex].yearDisplay + activeIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={`text-6xl sm:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter leading-none tabular-nums ${
                      isDark ? 'text-[#D4AF37]' : 'text-charcoal'
                    }`}
                  >
                    {JOURNEY_ITEMS[activeIndex].yearDisplay}
                  </motion.div>
                </AnimatePresence>
              </div>

              <p
                className={`mt-3 text-sm font-medium ${
                  isDark ? 'text-zinc-300' : 'text-zinc-700'
                }`}
              >
                {JOURNEY_ITEMS[activeIndex].period}
              </p>
              <p
                className={`mt-1 text-xs font-mono ${
                  isDark ? 'text-zinc-500' : 'text-zinc-500'
                }`}
              >
                {JOURNEY_ITEMS[activeIndex].title}
              </p>
            </div>
          </div>

          {/* Right Glowing Vertical Timeline Nodes */}
          <div className="lg:col-span-7 relative pl-7 sm:pl-9">
            {/* Vertical Line */}
            <div
              aria-hidden="true"
              className={`absolute left-2.5 sm:left-3 top-2 bottom-4 w-px ${
                isDark
                  ? 'bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/35 to-white/10'
                  : 'bg-gradient-to-b from-charcoal via-charcoal/30 to-charcoal/10'
              }`}
            />

            <div className="flex flex-col gap-8 sm:gap-10">
              {JOURNEY_ITEMS.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <motion.div
                    key={item.period + item.title}
                    ref={(el) => {
                      itemRefs.current[idx] = el;
                    }}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className="relative"
                  >
                    {/* Glowing Node */}
                    <span
                      aria-hidden="true"
                      className={`absolute -left-7 sm:-left-9 top-6 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? isDark
                            ? 'bg-[#D4AF37] border-[#0E0E10] shadow-[0_0_18px_rgba(212,175,55,0.85)] scale-110'
                            : 'bg-charcoal border-cream shadow-[0_0_14px_rgba(24,24,27,0.35)] scale-110'
                          : isDark
                          ? 'bg-[#18181D] border-[#D4AF37]/50'
                          : 'bg-cream border-charcoal/40'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive
                            ? isDark
                              ? 'bg-[#0E0E10]'
                              : 'bg-cream'
                            : isDark
                            ? 'bg-[#D4AF37]'
                            : 'bg-charcoal'
                        }`}
                      />
                    </span>

                    {/* Card Body */}
                    <div
                      className={`rounded-2xl border p-6 sm:p-7 transition-colors duration-300 ${
                        isActive
                          ? isDark
                            ? 'bg-[#16161B] border-[#D4AF37]/45 shadow-[0_14px_36px_-18px_rgba(212,175,55,0.22)]'
                            : 'bg-[#FFFDF9] border-charcoal/35 shadow-sm'
                          : isDark
                          ? 'bg-[#121216] border-white/10'
                          : 'bg-[#FAF6EE] border-charcoal/12'
                      }`}
                    >
                      <span
                        className={`inline-block font-mono text-xs font-semibold tracking-wider uppercase mb-2 ${
                          isDark ? 'text-[#D4AF37]' : 'text-zinc-600'
                        }`}
                      >
                        {item.period}
                      </span>

                      <h3
                        className={`text-lg sm:text-xl font-bold tracking-tight mb-3 ${
                          isDark ? 'text-offwhite' : 'text-charcoal'
                        }`}
                      >
                        {item.title}
                      </h3>

                      <ul className="space-y-2.5">
                        {item.points.map((pt) => (
                          <li
                            key={pt}
                            className={`text-sm sm:text-[15px] leading-relaxed flex items-start gap-2.5 ${
                              isDark ? 'text-zinc-300' : 'text-zinc-700'
                            }`}
                          >
                            <span
                              className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${
                                isDark ? 'bg-[#D4AF37]/80' : 'bg-charcoal/60'
                              }`}
                            />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
