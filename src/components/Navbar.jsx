import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

function formatIST(date) {
  const datePart = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);

  const timePart = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);

  return { datePart, timePart };
}

export default function Navbar({ isDark }) {
  const [now, setNow] = useState(() => new Date());
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const { datePart, timePart } = formatIST(now);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-300 ${
        isDark
          ? 'bg-obsidian/85 border-white/10 text-offwhite'
          : 'bg-cream/85 border-charcoal/10 text-charcoal'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pr-14 sm:pr-16 md:pr-20 h-16 flex items-center justify-between gap-4">
        {/* Desktop Left-Aligned Links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-tight transition-colors duration-200 ${
                isDark
                  ? 'text-zinc-300 hover:text-[#D4AF37]'
                  : 'text-zinc-700 hover:text-charcoal'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className={`p-2 -ml-2 rounded-lg border transition-colors ${
              isDark
                ? 'border-white/15 hover:border-[#D4AF37]/50 text-offwhite'
                : 'border-charcoal/15 hover:border-charcoal/40 text-charcoal'
            }`}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="text-xs font-mono uppercase tracking-widest opacity-70">
            RB.
          </span>
        </div>

        {/* Live IST Clock & Date Readout */}
        <div
          className={`flex items-center gap-2 font-mono text-[11px] sm:text-xs tracking-wide ${
            isDark ? 'text-zinc-300' : 'text-zinc-700'
          }`}
          aria-label="Current local time in India Standard Time"
        >
          <span
            className={`hidden sm:inline-block w-1.5 h-1.5 rounded-full ${
              isDark ? 'bg-[#D4AF37]' : 'bg-emerald-600'
            }`}
          />
          <span className="hidden sm:inline opacity-75">{datePart}</span>
          <span className="hidden sm:inline opacity-40">·</span>
          <span className="tabular-nums font-medium">{timePart}</span>
          <span
            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
              isDark
                ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30'
                : 'bg-charcoal/5 text-charcoal border border-charcoal/15'
            }`}
          >
            IST
          </span>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={`md:hidden overflow-hidden border-t ${
              isDark
                ? 'bg-[#121216] border-white/10'
                : 'bg-[#EFE8DA] border-charcoal/10'
            }`}
          >
            <nav
              className="px-5 py-4 flex flex-col gap-1"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`py-2.5 px-3 rounded-lg text-base font-medium transition-colors ${
                    isDark
                      ? 'text-zinc-200 hover:bg-white/5 hover:text-[#D4AF37]'
                      : 'text-charcoal hover:bg-charcoal/5'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div
                className={`mt-2 pt-3 border-t flex items-center justify-between text-xs font-mono ${
                  isDark
                    ? 'border-white/10 text-zinc-400'
                    : 'border-charcoal/10 text-zinc-600'
                }`}
              >
                <span>{datePart}</span>
                <span>{timePart} IST</span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

