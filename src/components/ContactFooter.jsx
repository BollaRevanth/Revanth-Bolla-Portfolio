import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  FileText,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react';
import { CONTACT_INFO } from '../data/portfolioData';

export default function ContactFooter({ isDark }) {
  const links = [
    {
      label: 'Email',
      value: CONTACT_INFO.email,
      href: `mailto:${CONTACT_INFO.email}`,
      icon: Mail,
      external: false,
    },
    {
      label: 'GitHub',
      value: 'github.com/BollaRevanth',
      href: CONTACT_INFO.github,
      icon: Github,
      external: true,
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/revanthbolla',
      href: CONTACT_INFO.linkedin,
      icon: Linkedin,
      external: true,
    },
    {
      label: 'Resume',
      value: 'View / Download PDF',
      href: CONTACT_INFO.resume,
      icon: FileText,
      external: true,
    },
  ];

  return (
    <footer
      id="contact"
      className={`pt-20 sm:pt-28 pb-12 border-t ${
        isDark ? 'border-white/10' : 'border-charcoal/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <p
            className={`font-mono text-xs uppercase tracking-[0.22em] mb-4 ${
              isDark ? 'text-[#D4AF37]' : 'text-zinc-500'
            }`}
          >
            Get In Touch
          </p>

          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12] ${
              isDark ? 'text-offwhite' : 'text-charcoal'
            }`}
          >
            Looking for a Full-Stack Engineer? Let&apos;s build together.
          </h2>

          <p
            className={`mt-5 text-base sm:text-lg leading-relaxed max-w-2xl italic ${
              isDark ? 'text-zinc-300' : 'text-zinc-700'
            }`}
          >
            B.Tech CSE 2026 graduate based in Hyderabad, available to join
            immediately for SDE-1, Java Full-Stack, and MERN roles.
          </p>
        </motion.div>

        {/* Direct Contact Cards & Buttons */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className={`group rounded-2xl border p-5 flex items-center justify-between gap-4 transition-all duration-200 ${
                  isDark
                    ? 'bg-[#141418] border-white/10 hover:border-[#D4AF37]/50 text-offwhite'
                    : 'bg-[#FAF6EE] border-charcoal/12 hover:border-charcoal/40 text-charcoal'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-colors ${
                      isDark
                        ? 'bg-[#D4AF37]/10 border-[#D4AF37]/25 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0E0E10]'
                        : 'bg-charcoal/5 border-charcoal/10 text-charcoal group-hover:bg-charcoal group-hover:text-cream'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <span
                      className={`block font-mono text-[10px] uppercase tracking-[0.2em] ${
                        isDark ? 'text-zinc-400' : 'text-zinc-500'
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="block text-sm font-semibold truncate mt-0.5">
                      {item.value}
                    </span>
                  </div>
                </div>
                <ArrowUpRight
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    isDark ? 'text-[#D4AF37]' : 'text-zinc-500 group-hover:text-charcoal'
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* Bottom Copyright Strip */}
        <div
          className={`mt-16 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono ${
            isDark
              ? 'border-white/10 text-zinc-500'
              : 'border-charcoal/12 text-zinc-500'
          }`}
        >
          <span>© 2026 REVANTH BOLLA</span>
          <span>HYDERABAD, INDIA · BUILT WITH REACT &amp; FRAMER MOTION</span>
        </div>
      </div>
    </footer>
  );
}

