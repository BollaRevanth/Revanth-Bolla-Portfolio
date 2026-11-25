import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

const REST_LENGTH = 58;
const ANCHOR_X = 72; // Centered horizontally inside 144px SVG stage

export default function PullCordToggle({ isDark, onToggle }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const dragOriginRef = useRef({ x: 0, y: 0 });
  const hasTriggeredRef = useRef(false);
  const hasMovedRef = useRef(false);
  const isActiveRef = useRef(false);

  // Target displacement from resting tip (0, 0)
  // Start with a sideways displacement on mount so it swings naturally on load!
  const rawX = useMotionValue(28);
  const rawY = useMotionValue(-6);

  // Underdamped pendulum + elastic bounce springs
  const springX = useSpring(rawX, {
    stiffness: 135,
    damping: 7.2,
    mass: 1.05,
  });
  const springY = useSpring(rawY, {
    stiffness: 230,
    damping: 9.2,
    mass: 0.85,
  });

  // Gentle organic idle breeze sway when untouched
  const breezeX = useMotionValue(0);

  useEffect(() => {
    isActiveRef.current = isDragging || isHovered;
  }, [isDragging, isHovered]);

  // Initial page-load pendulum swing (runs once on mount)
  useEffect(() => {
    const settleTimer = window.setTimeout(() => {
      rawX.set(0);
      rawY.set(0);
    }, 80);

    let rafId = null;
    const start = performance.now();

    const tickBreeze = (now) => {
      const t = (now - start) / 1000;
      if (!isActiveRef.current) {
        breezeX.set(Math.sin(t * 1.45) * 2.5 + Math.sin(t * 0.7) * 1.1);
      } else {
        breezeX.set(0);
      }
      rafId = window.requestAnimationFrame(tickBreeze);
    };
    rafId = window.requestAnimationFrame(tickBreeze);

    return () => {
      window.clearTimeout(settleTimer);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [rawX, rawY, breezeX]);

  // Combined live tip coordinates relative to anchor
  const tipOffsetX = useTransform([springX, breezeX], ([sx, bx]) => sx + bx);
  const tipOffsetY = useTransform(springY, (sy) => REST_LENGTH + sy);

  // Absolute SVG coordinates for Quadratic Bezier rope
  const tipX = useTransform(tipOffsetX, (x) => ANCHOR_X + x);
  const tipY = useTransform(tipOffsetY, (y) => Math.max(26, y));

  // Control point lags horizontally to create a genuine flexible rope bend!
  const ctrlX = useTransform(tipOffsetX, (x) => ANCHOR_X + x * 0.34);
  const ctrlY = useTransform(tipY, (y) => y * 0.56);

  const ropePath = useMotionTemplate`M ${ANCHOR_X} 2 Q ${ctrlX} ${ctrlY} ${tipX} ${tipY}`;

  // Handle rotates naturally with the rope's lower tangent angle
  const knobRotate = useTransform(
    [tipX, ctrlX, tipY, ctrlY],
    ([tx, cx, ty, cy]) => {
      const dx = tx - cx;
      const dy = Math.max(12, ty - cy);
      return (-Math.atan2(dx, dy) * 180) / Math.PI;
    }
  );

  // Knob position relative to its resting offset
  const knobLeft = tipX;
  const knobTop = tipY;

  const triggerToggleWithBounce = () => {
    onToggle();
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    hasTriggeredRef.current = false;
    hasMovedRef.current = false;
    dragOriginRef.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragOriginRef.current.x;
    const dy = e.clientY - dragOriginRef.current.y;

    if (Math.hypot(dx, dy) > 5) {
      hasMovedRef.current = true;
    }

    // Soft elastic resistance bounds (supports pulling down AND sideways!)
    const clampedX = Math.max(-82, Math.min(46, dx * 0.78));
    // Slight natural arc upward if pulled purely sideways, or stretches down when pulled
    const clampedY = Math.max(-16, Math.min(84, dy * 0.82));

    rawX.set(clampedX);
    rawY.set(clampedY);

    // Toggle when pulled down OR pulled sideways enough
    const pullForce = Math.hypot(clampedX * 0.85, Math.max(0, clampedY));
    if (
      !hasTriggeredRef.current &&
      (clampedY >= 30 || Math.abs(clampedX) >= 38 || pullForce >= 36)
    ) {
      hasTriggeredRef.current = true;
      triggerToggleWithBounce();
    }
  };

  const handlePointerUpOrCancel = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture?.(e.pointerId);

    if (!hasMovedRef.current) {
      // Quick click: give a lively downward + slight sideways flick bounce
      rawX.set(-9);
      rawY.set(32);
      triggerToggleWithBounce();
      window.setTimeout(() => {
        rawX.set(0);
        rawY.set(0);
      }, 110);
    } else {
      // Natural spring + pendulum bounce-back from wherever it was dragged!
      rawX.set(0);
      rawY.set(0);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      rawX.set(-10);
      rawY.set(30);
      triggerToggleWithBounce();
      window.setTimeout(() => {
        rawX.set(0);
        rawY.set(0);
      }, 110);
    }
  };

  return (
    <div
      className="fixed top-0 right-0 sm:right-2 md:right-4 z-50 pointer-events-none select-none"
      style={{ width: `${ANCHOR_X * 2}px`, height: '210px' }}
    >
      {/* Curved Real Braided Rope SVG */}
      <svg
        width={ANCHOR_X * 2}
        height="210"
        viewBox={`0 0 ${ANCHOR_X * 2} 210`}
        className="overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="ropeShadow" x="-40%" y="-20%" width="180%" height="160%">
            <feDropShadow
              dx="1"
              dy="3"
              stdDeviation="2"
              floodColor="#000000"
              floodOpacity={isDark ? '0.6' : '0.22'}
            />
          </filter>
        </defs>

        {/* Ceiling Bracket & Brass Eyelet */}
        <path
          d={`M ${ANCHOR_X - 11} 0 L ${ANCHOR_X + 11} 0 L ${ANCHOR_X + 8} 6 Q ${ANCHOR_X} 9 ${ANCHOR_X - 8} 6 Z`}
          fill={isDark ? '#27272E' : '#27272A'}
          stroke={isDark ? '#D4AF37' : '#52525B'}
          strokeWidth="1"
        />
        <circle
          cx={ANCHOR_X}
          cy="5"
          r="2.4"
          fill={isDark ? '#D4AF37' : '#A17C1A'}
        />

        {/* Rope Soft Outer Body */}
        <motion.path
          d={ropePath}
          fill="none"
          stroke={isDark ? '#8C6D1F' : '#5C4B3B'}
          strokeWidth="5.2"
          strokeLinecap="round"
          filter="url(#ropeShadow)"
        />

        {/* Woven Twisted Strand Layer 1 */}
        <motion.path
          d={ropePath}
          fill="none"
          stroke={isDark ? '#D4AF37' : '#A8896C'}
          strokeWidth="3.6"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />

        {/* Twisted Highlight Fiber Layer 2 */}
        <motion.path
          d={ropePath}
          fill="none"
          stroke={isDark ? '#F6DF92' : '#D6C2AC'}
          strokeWidth="1.4"
          strokeDasharray="2.5 5.5"
          strokeDashoffset="2"
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>

      {/* Interactive Rope Knot + Weighted Tassel Handle */}
      <motion.button
        type="button"
        aria-label={
          isDark
            ? 'Pull or drag rope to switch to Light Mode'
            : 'Pull or drag rope to switch to Dark Mode'
        }
        title={isDark ? 'Pull / Drag · Light Mode' : 'Pull / Drag · Dark Mode'}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUpOrCancel}
        onPointerCancel={handlePointerUpOrCancel}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          left: knobLeft,
          top: knobTop,
          x: '-50%',
          y: '-3px',
          rotate: knobRotate,
          transformOrigin: '50% 4px',
        }}
        className="pointer-events-auto absolute flex flex-col items-center cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-full px-2 pb-2 touch-none group"
      >
        {/* Wrapped Rope Knot Collar */}
        <span
          className={`w-4 h-3 rounded-sm border shadow-sm transition-colors duration-300 ${
            isDark
              ? 'bg-gradient-to-b from-[#E3C15A] to-[#8C6D1F] border-[#F7E39C]/60'
              : 'bg-gradient-to-b from-[#B9997A] to-[#6E5641] border-[#3E3125]/50'
          }`}
        />

        {/* Turned Brass / Weighted Acorn Knob */}
        <span
          className={`relative w-5 h-6 -mt-0.5 rounded-b-full rounded-t-sm border flex items-center justify-center transition-all duration-300 ${
            isDark
              ? 'bg-gradient-to-b from-[#F0D16B] via-[#D4AF37] to-[#8F6E17] border-[#FCE79C]/75 shadow-[0_0_20px_rgba(212,175,55,0.5)]'
              : 'bg-gradient-to-b from-[#44403C] via-[#27272A] to-[#18181B] border-charcoal/60 shadow-md'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isDark ? 'bg-[#0E0E10]' : 'bg-[#D4AF37]'
            }`}
          />
        </span>

        {/* Rope Tassel Tail Strands */}
        <span className="flex items-start justify-center gap-[2px] -mt-0.5 pointer-events-none">
          <span
            className={`w-[2px] h-2.5 rounded-b-full ${
              isDark ? 'bg-[#D4AF37]/80' : 'bg-[#8B7158]'
            }`}
          />
          <span
            className={`w-[2.5px] h-3.5 rounded-b-full ${
              isDark ? 'bg-[#F0D16B]' : 'bg-[#6E5641]'
            }`}
          />
          <span
            className={`w-[2px] h-2.5 rounded-b-full ${
              isDark ? 'bg-[#D4AF37]/80' : 'bg-[#8B7158]'
            }`}
          />
        </span>

        {/* Subtle Hover Hint Pill */}
        <motion.span
          initial={false}
          animate={{
            opacity: isHovered || isDragging ? 1 : 0,
            x: isHovered || isDragging ? 0 : 6,
          }}
          transition={{ duration: 0.18 }}
          className={`pointer-events-none hidden sm:flex items-center gap-1.5 absolute right-full mr-2 top-2 whitespace-nowrap px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border shadow-sm ${
            isDark
              ? 'bg-[#17171B]/95 text-[#D4AF37] border-[#D4AF37]/30'
              : 'bg-charcoal text-cream border-charcoal/20'
          }`}
        >
          <span>{isDark ? 'Pull · Light' : 'Pull · Dark'}</span>
        </motion.span>
      </motion.button>
    </div>
  );
}
