import { motion } from 'framer-motion';
import {
  Code2,
  Cpu,
  Database,
  Layout,
  Server,
  Wrench,
} from 'lucide-react';
import { SKILL_GROUPS } from '../data/portfolioData';

const CATEGORY_ICONS = {
  Languages: Code2,
  Backend: Server,
  Frontend: Layout,
  Databases: Database,
  'Tools & Testing': Wrench,
  'Core CS': Cpu,
};

export default function Skills({ isDark }) {
  return (
    <section
      id="skills"
      className={`py-20 sm:py-28 border-t ${
        isDark ? 'border-white/10' : 'border-charcoal/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
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
            Technical Stack
          </p>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
              isDark ? 'text-offwhite' : 'text-charcoal'
            }`}
          >
            Core Technical Skills
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SKILL_GROUPS.map((group, idx) => {
            const Icon = CATEGORY_ICONS[group.category] || Code2;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`rounded-2xl border p-6 transition-colors duration-300 ${
                  isDark
                    ? 'bg-[#141418] border-white/10 hover:border-[#D4AF37]/40'
                    : 'bg-[#FAF6EE] border-charcoal/12 hover:border-charcoal/35'
                }`}
              >
                <div className="flex items-center justify-between mb-5">
                  <h3
                    className={`text-base font-bold tracking-tight ${
                      isDark ? 'text-offwhite' : 'text-charcoal'
                    }`}
                  >
                    {group.category}
                  </h3>
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                      isDark
                        ? 'bg-[#D4AF37]/10 border-[#D4AF37]/25 text-[#D4AF37]'
                        : 'bg-charcoal/5 border-charcoal/10 text-charcoal'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1.5 rounded-lg text-xs sm:text-[13px] font-medium border transition-colors ${
                        isDark
                          ? 'bg-white/[0.04] border-white/10 text-zinc-200 hover:border-[#D4AF37]/45'
                          : 'bg-white/75 border-charcoal/12 text-charcoal hover:border-charcoal/35'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

