import { useEffect, useMemo, useRef, useState } from 'react';
import {
  animate,
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { GraduationCap, MapPin, X } from 'lucide-react';
import { ABILITY_CARD_STACK } from '../data/portfolioData';

const EMBERS = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  left: `${((i * 37 + 11) % 94) + 3}%`,
  size: (i % 3) + 2,
  duration: 4.5 + (i % 5) * 1.1,
  delay: (i % 7) * 0.45,
  drift: ((i % 2 === 0 ? 1 : -1) * ((i % 4) * 12 + 8)),
}));

function CompassClockworkBack() {
  return (
    <div className="relative w-full h-full rounded-[1.35rem] bg-[#0B0B0D] overflow-hidden flex flex-col items-center justify-center p-5 select-none">
      {/* Matte subtle radial vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,rgba(11,11,13,0.96)_72%)]"
      />

      {/* Double-line Glowing Golden Border */}
      <div className="absolute inset-3 rounded-[1rem] border border-[#D4AF37]/65 shadow-[inset_0_0_20px_rgba(212,175,55,0.12)] pointer-events-none" />
      <div className="absolute inset-[18px] rounded-[0.8rem] border border-[#D4AF37]/30 pointer-events-none" />

      {/* Corner Geometric Ornaments */}
      {[
        'top-3 left-3',
        'top-3 right-3 rotate-90',
        'bottom-3 right-3 rotate-180',
        'bottom-3 left-3 -rotate-90',
      ].map((pos, idx) => (
        <svg
          key={idx}
          viewBox="0 0 28 28"
          className={`absolute ${pos} w-6 h-6 text-[#D4AF37]/80 pointer-events-none`}
          fill="none"
        >
          <path
            d="M2 22V6C2 3.79086 3.79086 2 6 2H22"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="8" cy="8" r="1.75" fill="currentColor" />
        </svg>
      ))}

      {/* Top Label */}
      <span className="relative z-10 font-mono text-[9px] tracking-[0.35em] text-[#D4AF37]/75 uppercase mb-4">
        COLLECTIBLE EDITION
      </span>

      {/* Intricate Glowing Golden Geometric Compass / Clockwork Emblem */}
      <div className="relative z-10 w-52 h-52 sm:w-56 sm:h-56 flex items-center justify-center">
        <div
          aria-hidden="true"
          className="absolute inset-6 rounded-full bg-[#D4AF37]/15 blur-2xl"
        />
        <svg
          viewBox="0 0 240 240"
          className="w-full h-full drop-shadow-[0_0_14px_rgba(212,175,55,0.45)]"
          fill="none"
        >
          <defs>
            <linearGradient id="goldEmblem" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FCE79C" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#9A7516" />
            </linearGradient>
          </defs>

          {/* Outer Precision Ring & Degree Ticks */}
          <circle
            cx="120"
            cy="120"
            r="104"
            stroke="url(#goldEmblem)"
            strokeWidth="1.2"
            strokeOpacity="0.65"
          />
          <circle
            cx="120"
            cy="120"
            r="96"
            stroke="url(#goldEmblem)"
            strokeWidth="0.75"
            strokeDasharray="3 5"
            strokeOpacity="0.6"
          />
          {Array.from({ length: 24 }, (_, i) => {
            const angle = (i * 15 * Math.PI) / 180;
            const r1 = i % 2 === 0 ? 88 : 91;
            const r2 = 96;
            return (
              <line
                key={i}
                x1={120 + r1 * Math.cos(angle)}
                y1={120 + r1 * Math.sin(angle)}
                x2={120 + r2 * Math.cos(angle)}
                y2={120 + r2 * Math.sin(angle)}
                stroke="url(#goldEmblem)"
                strokeWidth={i % 6 === 0 ? '1.8' : '0.9'}
                strokeOpacity="0.8"
              />
            );
          })}

          {/* Clockwork Gear Teeth Ring */}
          <circle
            cx="120"
            cy="120"
            r="72"
            stroke="url(#goldEmblem)"
            strokeWidth="1.4"
            strokeOpacity="0.8"
          />
          <circle
            cx="120"
            cy="120"
            r="64"
            stroke="url(#goldEmblem)"
            strokeWidth="5"
            strokeDasharray="4 6"
            strokeOpacity="0.5"
          />

          {/* Sacred Geometry Rotated Squares */}
          <rect
            x="66"
            y="66"
            width="108"
            height="108"
            stroke="url(#goldEmblem)"
            strokeWidth="0.9"
            strokeOpacity="0.45"
          />
          <rect
            x="66"
            y="66"
            width="108"
            height="108"
            transform="rotate(45 120 120)"
            stroke="url(#goldEmblem)"
            strokeWidth="0.9"
            strokeOpacity="0.45"
          />

          {/* 8-Point Compass Rose */}
          <polygon
            points="120,24 131,109 120,120 109,109"
            fill="url(#goldEmblem)"
            fillOpacity="0.85"
          />
          <polygon
            points="120,216 131,131 120,120 109,131"
            fill="url(#goldEmblem)"
            fillOpacity="0.65"
          />
          <polygon
            points="24,120 109,109 120,120 109,131"
            fill="url(#goldEmblem)"
            fillOpacity="0.65"
          />
          <polygon
            points="216,120 131,109 120,120 131,131"
            fill="url(#goldEmblem)"
            fillOpacity="0.85"
          />

          {/* Secondary Diagonal Compass Points */}
          <polygon
            points="54,54 114,106 120,120 106,114"
            fill="url(#goldEmblem)"
            fillOpacity="0.4"
          />
          <polygon
            points="186,54 134,114 120,120 126,106"
            fill="url(#goldEmblem)"
            fillOpacity="0.4"
          />
          <polygon
            points="186,186 126,134 120,120 134,126"
            fill="url(#goldEmblem)"
            fillOpacity="0.4"
          />
          <polygon
            points="54,186 106,126 120,120 114,134"
            fill="url(#goldEmblem)"
            fillOpacity="0.4"
          />

          {/* Center Core Mechanism */}
          <circle
            cx="120"
            cy="120"
            r="22"
            fill="#0B0B0D"
            stroke="url(#goldEmblem)"
            strokeWidth="1.6"
          />
          <circle
            cx="120"
            cy="120"
            r="14"
            stroke="url(#goldEmblem)"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <circle cx="120" cy="120" r="5" fill="url(#goldEmblem)" />
        </svg>
      </div>

      {/* Bottom Monogram */}
      <div className="relative z-10 mt-4 flex flex-col items-center gap-1">
        <span className="font-serif italic text-lg tracking-wide text-[#E7C65E]">
          Revanth Bolla
        </span>
        <span className="font-mono text-[9px] tracking-[0.3em] text-[#D4AF37]/60 uppercase">
          SYS · ARCH · 2026
        </span>
      </div>
    </div>
  );
}

export default function AbilityCardModal({ isOpen, onClose }) {
  const cardWrapperRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);
  const dragBaseYRef = useRef(0);

  // 3D rotation motion values
  const rawDragY = useMotionValue(0);
  const rawTiltX = useMotionValue(0);
  const rawTiltY = useMotionValue(0);

  const springDragY = useSpring(rawDragY, { stiffness: 180, damping: 24 });
  const tiltX = useSpring(rawTiltX, { stiffness: 220, damping: 24 });
  const tiltY = useSpring(rawTiltY, { stiffness: 220, damping: 24 });

  const rotateY = useTransform([springDragY, tiltY], ([d, t]) => d + t);

  // Diagonal molten-gold burn-in progress from bottom-right (0) to top-left (130)
  const burnProgress = useMotionValue(0);

  const revealMask = useMotionTemplate`linear-gradient(315deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) calc(${burnProgress}% - 12%), rgba(0,0,0,0.45) calc(${burnProgress}% - 4%), rgba(0,0,0,0) calc(${burnProgress}% + 2%))`;

  const moltenWaveBg = useMotionTemplate`linear-gradient(315deg, transparent calc(${burnProgress}% - 14%), rgba(212,175,55,0.45) calc(${burnProgress}% - 7%), rgba(255,235,155,0.95) calc(${burnProgress}% - 2%), rgba(255,165,30,0.75) calc(${burnProgress}% + 2%), transparent calc(${burnProgress}% + 9%))`;

  useEffect(() => {
    if (!isOpen) return;

    // Reset physics and ignite molten-gold reveal from bottom-right to top-left
    rawDragY.set(0);
    rawTiltX.set(0);
    rawTiltY.set(0);
    burnProgress.set(0);

    const controls = animate(burnProgress, 128, {
      duration: 1.35,
      ease: [0.22, 1, 0.36, 1],
    });

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      controls.stop();
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, burnProgress, rawDragY, rawTiltX, rawTiltY]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    dragBaseYRef.current = rawDragY.get();
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (isDragging) {
      const dx = e.clientX - dragStartXRef.current;
      rawDragY.set(dragBaseYRef.current + dx * 0.65);
      rawTiltX.set(0);
      rawTiltY.set(0);
      return;
    }

    if (e.pointerType === 'touch') return;
    const rect = cardWrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    rawTiltY.set(normX * 18);
    rawTiltX.set(-normY * 16);
  };

  const handlePointerUpOrCancel = (e) => {
    if (isDragging) {
      setIsDragging(false);
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    }
  };

  const handlePointerLeave = () => {
    if (!isDragging) {
      rawTiltX.set(0);
      rawTiltY.set(0);
    }
  };

  const sheenOpacity = useMemo(() => 0.16, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Revanth Bolla 3D Collectible Ability Card"
          className="fixed inset-0 z-50 bg-[#060608]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden"
        >
          {/* Floating Golden Ember Particles */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            {EMBERS.map((ember) => (
              <motion.span
                key={ember.id}
                style={{
                  left: ember.left,
                  width: ember.size,
                  height: ember.size,
                }}
                initial={{ y: '105vh', opacity: 0, x: 0 }}
                animate={{
                  y: ['105vh', '-10vh'],
                  opacity: [0, 0.85, 0.55, 0],
                  x: [0, ember.drift, 0],
                }}
                transition={{
                  duration: ember.duration,
                  delay: ember.delay,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute bottom-0 rounded-full bg-[#F5CF6B] shadow-[0_0_10px_rgba(212,175,55,0.85)]"
              />
            ))}
          </div>

          {/* Top-Right Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/35 bg-[#121216]/90 text-zinc-200 hover:text-[#D4AF37] hover:border-[#D4AF37] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Close</span>
          </button>

          {/* 3D Interactive Card Stage */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative z-20 flex flex-col items-center justify-center w-full max-w-[350px] sm:max-w-[370px]"
          >
            <div
              ref={cardWrapperRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUpOrCancel}
              onPointerCancel={handlePointerUpOrCancel}
              onPointerLeave={handlePointerLeave}
              className="perspective-1200 w-full aspect-[5/7.4] cursor-grab active:cursor-grabbing select-none touch-none"
            >
              <motion.div
                style={{
                  rotateX: tiltX,
                  rotateY,
                }}
                className="relative w-full h-full preserve-3d"
              >
                {/* FRONT OF CARD */}
                <div className="absolute inset-0 backface-hidden rounded-[1.35rem] bg-[#0B0B0D] border border-[#D4AF37]/40 shadow-[0_25px_70px_-15px_rgba(212,175,55,0.28)] overflow-hidden">
                  {/* Dark blank obsidian canvas underneath reveal */}
                  <div className="absolute inset-0 bg-[#08080A]" />

                  {/* Revealed Collectible Card Face */}
                  <motion.div
                    style={{
                      WebkitMaskImage: revealMask,
                      maskImage: revealMask,
                    }}
                    className="relative w-full h-full p-4 sm:p-5 flex flex-col justify-between bg-gradient-to-b from-[#151419] via-[#0E0E12] to-[#0A0A0D]"
                  >
                    {/* Ornate Gold Frame Borders */}
                    <div className="pointer-events-none absolute inset-2.5 rounded-[1rem] border border-[#D4AF37]/55" />
                    <div className="pointer-events-none absolute inset-[14px] rounded-[0.8rem] border border-[#D4AF37]/20" />

                    {/* Subtle Diagonal Foil Sheen */}
                    <div
                      aria-hidden="true"
                      style={{ opacity: sheenOpacity }}
                      className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,transparent_25%,rgba(255,236,168,0.6)_45%,transparent_65%)]"
                    />

                    {/* Card Header Meta */}
                    <div className="relative z-10 flex items-center justify-between px-1.5 pt-1">
                      <span className="font-mono text-[9px] tracking-[0.22em] text-[#D4AF37] uppercase">
                        ENGINEER · NO. 01
                      </span>
                      <span className="px-2 py-0.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 font-mono text-[9px] text-[#F2D377] tracking-wider uppercase">
                        OPEN TO WORK
                      </span>
                    </div>

                    {/* Portrait Thumbnail Window */}
                    <div className="relative z-10 mx-auto mt-2 w-[72%] aspect-[4/4.2] rounded-t-[4.5rem] rounded-b-xl border border-[#D4AF37]/60 bg-[radial-gradient(circle_at_50%_35%,rgba(212,175,55,0.22),rgba(14,14,17,0.95))] overflow-hidden shadow-[inset_0_0_25px_rgba(212,175,55,0.18)]">
                      <img
                        src="/profile.png"
                        alt="Revanth Bolla"
                        draggable={false}
                        className="w-full h-full object-contain object-bottom pt-2"
                      />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#0D0D10] to-transparent" />
                    </div>

                    {/* Identity Block */}
                    <div className="relative z-10 text-center mt-2">
                      <h2 className="text-xl sm:text-[1.35rem] font-extrabold tracking-[0.08em] text-[#F7F3E8] uppercase">
                        REVANTH BOLLA
                      </h2>
                      <p className="text-xs font-medium text-[#D4AF37] tracking-wide mt-0.5">
                        Full-Stack Software Engineer
                      </p>
                    </div>

                    {/* Core Stack Tags */}
                    <div className="relative z-10 grid grid-cols-2 gap-1.5 mt-2.5 px-1">
                      {ABILITY_CARD_STACK.map((tag) => (
                        <span
                          key={tag}
                          className="text-center py-1.5 px-2 rounded-md border border-[#D4AF37]/30 bg-[#D4AF37]/[0.07] text-[10px] sm:text-[11px] font-medium text-zinc-200 truncate"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Card Footer: Education & Location */}
                    <div className="relative z-10 mt-2.5 pt-2.5 px-1.5 border-t border-[#D4AF37]/25 flex items-center justify-between gap-2 text-[10px] text-zinc-300">
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <GraduationCap className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span>B.Tech CSE · 7.54 CGPA</span>
                      </span>
                      <span className="inline-flex items-center gap-1 text-zinc-400">
                        <MapPin className="w-3 h-3 text-[#D4AF37] shrink-0" />
                        <span>Hyderabad, India</span>
                      </span>
                    </div>
                  </motion.div>

                  {/* Molten-Gold Diagonal Wave Overlay (Bottom-Right to Top-Left) */}
                  <motion.div
                    aria-hidden="true"
                    style={{ background: moltenWaveBg }}
                    className="pointer-events-none absolute inset-0 z-20 mix-blend-screen"
                  />
                </div>

                {/* BACK OF CARD */}
                <div
                  style={{ transform: 'rotateY(180deg)' }}
                  className="absolute inset-0 backface-hidden rounded-[1.35rem] border border-[#D4AF37]/50 shadow-[0_25px_70px_-15px_rgba(212,175,55,0.28)] overflow-hidden"
                >
                  <motion.div
                    style={{
                      WebkitMaskImage: revealMask,
                      maskImage: revealMask,
                    }}
                    className="w-full h-full"
                  >
                    <CompassClockworkBack />
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Subtle Bottom Interaction Hint */}
            <p className="mt-5 font-mono text-[11px] tracking-[0.25em] text-[#D4AF37]/80 uppercase text-center">
              HOVER TO TILT · DRAG TO ROTATE
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

