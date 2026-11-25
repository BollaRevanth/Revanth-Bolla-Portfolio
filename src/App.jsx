import { useEffect, useRef, useState } from 'react';
import AbilityCardModal from './components/AbilityCardModal';
import ContactFooter from './components/ContactFooter';
import Hero from './components/Hero';
import Journey from './components/Journey';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import PullCordToggle from './components/PullCordToggle';
import Skills from './components/Skills';

export default function App() {
  // Light Mode is default
  const [theme, setTheme] = useState('light');
  const [abilityOpen, setAbilityOpen] = useState(false);
  const abilityOpenRef = useRef(false);

  const isDark = theme === 'dark';

  useEffect(() => {
    abilityOpenRef.current = abilityOpen;
  }, [abilityOpen]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Smooth desktop inertial wheel + anchor scrolling
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReduced) return;

    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let rafId = null;
    let lastTime = performance.now();
    let isAnimating = false;

    const getMaxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const step = (now) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      const diff = targetY - currentY;
      if (Math.abs(diff) < 0.45) {
        currentY = targetY;
        window.scrollTo(0, Math.round(currentY));
        isAnimating = false;
        rafId = null;
        return;
      }

      const ease = 1 - Math.exp(-11 * dt);
      currentY += diff * ease;
      window.scrollTo(0, currentY);
      rafId = window.requestAnimationFrame(step);
    };

    const startLoop = () => {
      if (!isAnimating) {
        isAnimating = true;
        lastTime = performance.now();
        rafId = window.requestAnimationFrame(step);
      }
    };

    const handleWheel = (e) => {
      if (abilityOpenRef.current) return;
      if (e.ctrlKey || e.metaKey) return;
      if (e.deltaMode === 2) return;

      e.preventDefault();
      if (!isAnimating) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
      const deltaMultiplier = e.deltaMode === 1 ? 32 : 1;
      targetY = Math.max(
        0,
        Math.min(getMaxScroll(), targetY + e.deltaY * deltaMultiplier)
      );
      startLoop();
    };

    const handleNativeScroll = () => {
      if (!isAnimating) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };

    const handleAnchorClick = (e) => {
      const anchor = e.target.closest?.('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      const targetEl = document.querySelector(hash);
      if (!targetEl) return;

      e.preventDefault();
      currentY = window.scrollY;
      const navOffset = 68;
      const rectTop = targetEl.getBoundingClientRect().top + window.scrollY;
      targetY = Math.max(0, Math.min(getMaxScroll(), rectTop - navOffset));
      startLoop();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleNativeScroll, { passive: true });
    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleNativeScroll);
      document.removeEventListener('click', handleAnchorClick);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div
      className={`min-h-screen relative transition-colors duration-500 ${
        isDark ? 'bg-[#0E0E10] text-[#F4F4F5]' : 'bg-[#F5F0E6] text-[#18181B]'
      }`}
    >
      {/* Fixed lightweight architectural dot grid layer */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-500 ${
          isDark ? 'editorial-grid-dark' : 'editorial-grid-light'
        }`}
      />

      {/* Interactive Hanging Pull-Cord Rope Theme Toggle */}
      <PullCordToggle isDark={isDark} onToggle={toggleTheme} />

      {/* Top Navigation Bar */}
      <Navbar isDark={isDark} />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero
          isDark={isDark}
          onOpenAbilityCard={() => setAbilityOpen(true)}
        />
        <Projects isDark={isDark} />
        <Skills isDark={isDark} />
        <Journey isDark={isDark} />
      </main>

      {/* Contact & Footer */}
      <div className="relative z-10">
        <ContactFooter isDark={isDark} />
      </div>

      {/* Interactive 3D Collectible Ability Card Modal */}
      <AbilityCardModal
        isOpen={abilityOpen}
        onClose={() => setAbilityOpen(false)}
      />
    </div>
  );
}
