import { useEffect, useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDownRight, Download, Sparkles } from 'lucide-react';
import FlipNotebook from './FlipNotebook';
import { RESUME_URL } from '../data/portfolioData';

export default function Hero({ isDark, onOpenAbilityCard }) {
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 280, damping: 28 });
  const smoothY = useSpring(mouseY, { stiffness: 280, damping: 28 });

  const spotlightMask = useMotionTemplate`radial-gradient(circle 165px at ${smoothX}px ${smoothY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.88) 45%, rgba(0,0,0,0) 100%)`;

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(hover: none), (pointer: coarse)');
      setIsTouchDevice(mq.matches);
      const listener = (e) => setIsTouchDevice(e.matches);
      mq.addEventListener?.('change', listener);
      return () => mq.removeEventListener?.('change', listener);
    }
  }, []);

  const handlePointerMove = (e) => {
    if (e.pointerType === 'touch') return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    if (!isHovering) setIsHovering(true);
  };

  const handlePointerLeave = () => {
    setIsHovering(false);
  };

  return (
    <section
      id="home"
      className="relative pt-10 sm:pt-14 lg:pt-16 pb-6 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Status Pill */}
            <div
              className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-medium mb-6 transition-colors duration-300 ${
                isDark
                  ? 'bg-white/[0.04] border-white/15 text-zinc-200'
                  : 'bg-charcoal/[0.04] border-charcoal/15 text-charcoal'
              }`}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>Available for Immediate Joining</span>
            </div>

            {/* Editorial Headline */}
            <h1
              className={`text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.08] mb-3 ${
                isDark ? 'text-offwhite' : 'text-charcoal'
              }`}
            >
              Hi, I&apos;m{' '}
              <span
                className={`font-serif italic font-normal ${
                  isDark ? 'text-[#D4AF37]' : 'text-charcoal'
                }`}
              >
                Revanth.
              </span>
            </h1>

            <p
              className={`text-xl sm:text-2xl font-medium tracking-tight mb-4 ${
                isDark ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              I am a
            </p>

            {/* Interactive Spiral-Bound Flip Notebook Card */}
            <FlipNotebook isDark={isDark} />

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
                  isDark
                    ? 'bg-[#D4AF37] text-[#0E0E10] hover:bg-[#E2C04F] shadow-[0_8px_24px_-6px_rgba(212,175,55,0.45)]'
                    : 'bg-charcoal text-cream hover:bg-zinc-800 shadow-sm'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>

              <a
                href="#projects"
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold border transition-all duration-200 active:scale-[0.98] ${
                  isDark
                    ? 'border-white/20 text-offwhite hover:border-[#D4AF37] hover:text-[#D4AF37]'
                    : 'border-charcoal/25 text-charcoal hover:border-charcoal hover:bg-charcoal/5'
                }`}
              >
                <span>See my work</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Waist-Up Studio Portrait with Monochrome-to-Color Spotlight */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div
              ref={containerRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              onClick={onOpenAbilityCard}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenAbilityCard();
                }
              }}
              aria-label="Open Revanth Bolla 3D Collectible Ability Card"
              className="group relative w-full max-w-[340px] sm:max-w-[390px] lg:max-w-[430px] aspect-[4/5] flex items-end justify-center cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-3xl"
            >
              {/* Soft Studio Backdrop Halo */}
              <div
                aria-hidden="true"
                className={`absolute inset-x-4 bottom-2 top-8 rounded-[2.25rem] border transition-all duration-500 ${
                  isDark
                    ? 'bg-gradient-to-b from-[#1A1A20]/80 via-[#121216]/70 to-transparent border-[#D4AF37]/20 group-hover:border-[#D4AF37]/45'
                    : 'bg-gradient-to-b from-[#EBE3D3]/85 via-[#F2ECE0]/60 to-transparent border-charcoal/10 group-hover:border-charcoal/25'
                }`}
              />

              {/* Subtle Radial Ambient Glow */}
              <div
                aria-hidden="true"
                className={`absolute top-12 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
                  isDark
                    ? 'bg-[#D4AF37]/15 opacity-70 group-hover:opacity-100'
                    : 'bg-amber-900/10 opacity-40 group-hover:opacity-70'
                }`}
              />

              {/* Base Monochrome Portrait Layer */}
              <div className="relative w-full h-full overflow-hidden rounded-b-[2.25rem]">
                <img
                  src="/profile.png"
                  alt="Revanth Bolla studio portrait"
                  draggable={false}
                  className="w-full h-full object-contain object-bottom grayscale contrast-[1.06] transition-transform duration-500 group-hover:scale-[1.015]"
                />

                {/* Full-Color Layer Revealed by Cursor Spotlight (or gentle full-color on touch devices) */}
                {isTouchDevice ? (
                  <img
                    src="/profile.png"
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-contain object-bottom opacity-85 transition-opacity duration-700"
                  />
                ) : (
                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                    style={{
                      opacity: isHovering ? 1 : 0,
                      WebkitMaskImage: spotlightMask,
                      maskImage: spotlightMask,
                    }}
                  >
                    <img
                      src="/profile.png"
                      alt=""
                      draggable={false}
                      className="w-full h-full object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.015]"
                    />
                  </motion.div>
                )}

                {/* Bottom Fade Into Hero Divider */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t ${
                    isDark
                      ? 'from-[#0E0E10] via-[#0E0E10]/70 to-transparent'
                      : 'from-[#F5F0E6] via-[#F5F0E6]/70 to-transparent'
                  }`}
                />
              </div>

              {/* Floating Pill Badge: My ability card */}
              <motion.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenAbilityCard();
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`absolute bottom-7 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-3 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide border backdrop-blur-md transition-all duration-300 shadow-lg ${
                  isDark
                    ? 'bg-[#141418]/90 text-[#D4AF37] border-[#D4AF37]/45 hover:bg-[#D4AF37] hover:text-[#0E0E10] shadow-[0_10px_28px_rgba(212,175,55,0.25)]'
                    : 'bg-charcoal/90 text-cream border-charcoal/30 hover:bg-charcoal shadow-[0_10px_24px_rgba(24,24,27,0.2)]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>My ability card</span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Hero Strip */}
        <div
          className={`mt-10 sm:mt-14 pt-4 border-t flex flex-wrap items-center justify-between gap-3 text-[11px] sm:text-xs font-mono uppercase tracking-[0.18em] ${
            isDark
              ? 'border-white/10 text-zinc-400'
              : 'border-charcoal/15 text-zinc-600'
          }`}
        >
          <span className="flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isDark ? 'bg-[#D4AF37]' : 'bg-charcoal'
              }`}
            />
            OPEN TO WORK
          </span>
          <span>HYDERABAD / BENGALURU / REMOTE</span>
          <a
            href="#projects"
            className={`transition-colors ${
              isDark ? 'hover:text-[#D4AF37]' : 'hover:text-charcoal'
            }`}
          >
            SCROLL TO EXPLORE ↓
          </a>
        </div>
      </div>
    </section>
  );
}

