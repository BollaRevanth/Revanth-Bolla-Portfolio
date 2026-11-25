import { motion } from 'framer-motion';
import { ArrowUpRight, Database, Github, Lock, MailCheck, Search, ShieldCheck, Truck } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';

function MoneyManagerPreview() {
  return (
    <div className="relative w-full h-full min-h-[250px] sm:min-h-[290px] rounded-2xl border border-white/10 bg-[#121216] p-4 sm:p-5 flex flex-col justify-between overflow-hidden">
      {/* Subtle gold radial tint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#D4AF37]/10 blur-2xl"
      />

      {/* Browser / Studio Frame Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        </div>
        <span className="font-mono text-[10px] text-zinc-400 tracking-wider">
          mmoneymanager.netlify.app
        </span>
      </div>

      {/* Architectural Feature Modules */}
      <div className="my-4 grid grid-cols-2 gap-2.5">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-semibold mb-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Stateless JWT</span>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Spring Security token filter &amp; role protection
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-semibold mb-1.5">
            <Database className="w-4 h-4" />
            <span>N+1 Query Fix</span>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            PostgreSQL indexes, DTOs &amp; @EntityGraph
          </p>
        </div>

        <div className="col-span-2 rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/[0.06] p-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-zinc-100">
              Apache POI Excel Reports &amp; Cloudinary
            </p>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Automated .xlsx exports + scheduled email notifications
            </p>
          </div>
          <MailCheck className="w-5 h-5 text-[#D4AF37] shrink-0" />
        </div>
      </div>

      {/* Pipeline Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 font-mono text-[10px] text-zinc-400">
        <span>SPRING BOOT · POSTGRESQL</span>
        <span className="text-[#D4AF37]">DOCKERIZED · JUNIT 5</span>
      </div>
    </div>
  );
}

function FoodelPreview() {
  return (
    <div className="relative w-full h-full min-h-[250px] sm:min-h-[290px] rounded-2xl border border-white/10 bg-[#121216] p-4 sm:p-5 flex flex-col justify-between overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-amber-500/10 blur-2xl"
      />

      {/* Browser / Studio Frame Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        </div>
        <span className="font-mono text-[10px] text-zinc-400 tracking-wider truncate max-w-[190px] sm:max-w-none">
          food-delivery-frontend-h8j6.onrender.com
        </span>
      </div>

      {/* Architectural Feature Modules */}
      <div className="my-4 grid grid-cols-2 gap-2.5">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-semibold mb-1.5">
            <Lock className="w-4 h-4" />
            <span>Google OAuth2</span>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Seamless authentication &amp; role-based access
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-semibold mb-1.5">
            <Search className="w-4 h-4" />
            <span>Live Catalog</span>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Instant search, filtering &amp; promo pricing rules
          </p>
        </div>

        <div className="col-span-2 rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/[0.06] p-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-zinc-100">
              Real-Time Order Tracking &amp; Admin Panel
            </p>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Catalog management, order lifecycle &amp; status updates
            </p>
          </div>
          <Truck className="w-5 h-5 text-[#D4AF37] shrink-0" />
        </div>
      </div>

      {/* Pipeline Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 font-mono text-[10px] text-zinc-400">
        <span>MONGODB · EXPRESS · REACT · NODE</span>
        <span className="text-[#D4AF37]">REST APIS</span>
      </div>
    </div>
  );
}

export default function Projects({ isDark }) {
  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <p
              className={`font-mono text-xs uppercase tracking-[0.22em] mb-3 ${
                isDark ? 'text-[#D4AF37]' : 'text-zinc-500'
              }`}
            >
              Selected Engineering Work
            </p>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
                isDark ? 'text-offwhite' : 'text-charcoal'
              }`}
            >
              Featured Projects
            </h2>
          </div>
          <p
            className={`text-sm sm:text-base max-w-md ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            Deployed full-stack systems engineered for performance, clean
            architecture, and real-world usability.
          </p>
        </motion.div>

        {/* Dark Editorial Showcase Cards */}
        <div className="flex flex-col gap-8 sm:gap-10">
          {PROJECTS.map((project, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className={`rounded-3xl border p-5 sm:p-8 lg:p-10 transition-colors duration-300 bg-[#0E0E11] text-offwhite ${
                  isDark
                    ? 'border-white/10 hover:border-[#D4AF37]/40 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85)]'
                    : 'border-charcoal/15 hover:border-charcoal/40 shadow-[0_24px_60px_-24px_rgba(24,24,27,0.28)]'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center">
                  {/* Visual Preview Frame */}
                  <div
                    className={`lg:col-span-5 ${
                      isReversed ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    {project.id === 'money-manager' ? (
                      <MoneyManagerPreview />
                    ) : (
                      <FoodelPreview />
                    )}
                  </div>

                  {/* Engineering Details */}
                  <div
                    className={`lg:col-span-7 flex flex-col items-start ${
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <span className="inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] mb-3">
                      {project.tag}
                    </span>

                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                      {project.title}
                      <span className="block sm:inline font-normal text-zinc-400 sm:ml-2 text-lg sm:text-2xl">
                        — {project.subtitle}
                      </span>
                    </h3>

                    <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Pills */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tech.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 rounded-full text-xs font-medium border border-white/12 bg-white/[0.05] text-zinc-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-7 flex flex-wrap items-center gap-3.5">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[#D4AF37] text-[#0E0E10] hover:bg-[#E4C456] transition-colors"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>

                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-white/20 text-zinc-100 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>GitHub Repo</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

