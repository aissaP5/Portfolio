import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Layers, Sparkles, FileText } from 'lucide-react';

export const Hero: React.FC = () => {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 18,
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-32"
    >
      {/* Background Slow Radial Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[70vw] h-[40vw] max-w-[800px] rounded-full bg-gradient-to-tr from-neon-purple/8 to-neon-cyan/8 filter blur-[120px] animate-pulse-slow z-0" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center"
        >
          {/* Subtle Technical Accent Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-dark-border text-xs font-semibold uppercase tracking-wider text-neon-cyan mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Available for Select Projects</span>
          </motion.div>

          {/* wide, clamped 2-line H1 */}
          <motion.h1
            variants={itemVariants}
            className="max-w-5xl w-full text-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-white select-none mb-8"
          >
            Building Modern <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
              Web Experiences
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-base sm:text-lg md:text-xl text-gray-400 font-medium leading-relaxed mb-12"
          >
            Crafting high-performance SaaS platforms, responsive web applications,
            and intuitive modern digital products with flawless design engineering.
          </motion.p>

          {/* Two Clean High-Contrast CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4.5 w-full max-w-md sm:max-w-none"
          >
            {/* View Projects CTA */}
            <button
              onClick={() => handleScroll('projects')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-wider text-dark-bg bg-white hover:bg-neon-cyan hover:text-dark-bg rounded-xl transition-all duration-300 shadow-[0_5px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_8px_30px_rgba(6,182,212,0.45)] hover:-translate-y-0.5"
            >
              <Layers className="w-4 h-4" />
              <span>View Projects</span>
            </button>

            {/* Contact Me CTA */}
            <button
              onClick={() => handleScroll('contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white glass hover:bg-white/5 rounded-xl border border-dark-border transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>Contact Me</span>
            </button>

            {/* Resume Download (Secondary) */}
            <a
              href="/resume.pdf"
              target="_blank"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-all duration-300 group"
            >
              <FileText className="w-3.5 h-3.5 text-gray-600 group-hover:text-neon-cyan transition-colors" />
              <span>Resume</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Bottom Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: 'reverse' as const }}
      >
        <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">
          Scroll to explore
        </span>
        <ArrowDown className="w-4 h-4 text-gray-500" />
      </motion.div>
    </section>
  );
};
