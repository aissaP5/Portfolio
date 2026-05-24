import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, ArrowUpRight } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);

    // Simulate elite contact submission loader (Design Spell)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormState({ name: '', email: '', message: '' });

      // Reset success state after 4 seconds
      setTimeout(() => setIsSent(false), 4000);
    }, 1800);
  };

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.28-1.55 3.28-1.23 3.28-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg> },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z"/></svg> },
    { label: 'Twitter', href: 'https://twitter.com', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.24 2.25h3.31l-7.23 8.26 8.51 11.24h-6.66l-5.22-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.72 6.24 5.44-6.24zm-1.16 17.52h1.84L7.08 4.13H5.1l11.98 15.64z"/></svg> },
    { label: 'Dribbble', href: 'https://dribbble.com', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm7.94 5.48a10.2 10.2 0 0 1 2.32 6.39c-.34-.07-3.74-.76-7.17-.33-.07-.17-.14-.33-.22-.5-.2-.46-.43-.93-.67-1.38 3.79-1.55 5.51-3.77 5.74-4.18zM12 1.75c2.77 0 5.3 1.08 7.18 2.83-.19.37-1.74 2.44-5.38 3.82A51.4 51.4 0 0 0 9.45 2.1c.83-.22 1.68-.35 2.55-.35zM7.53 2.82a49.8 49.8 0 0 1 4.33 6.34C7.72 10.39 4 10.37 3.55 10.37c.04-.01.04-.01 0 0A10.27 10.27 0 0 1 7.53 2.82zM1.75 12v-.32c.44.01 4.82.06 9.26-1.38.26.5.5 1.02.74 1.53-.11.03-.23.07-.34.1-4.62 1.49-7.08 5.56-7.32 5.97A10.21 10.21 0 0 1 1.75 12zm3.87 8.14c.16-.28 1.97-3.89 6.97-5.68.03-.01.06-.02.09-.02a45 45 0 0 1 1.87 6.59A10.24 10.24 0 0 1 5.62 20.14zM12 22.25c-.96 0-1.88-.13-2.76-.38a42.7 42.7 0 0 0-1.75-6.34c5.49-2.23 7.43.55 7.87 1.3A10.27 10.27 0 0 1 12 22.25zm3.87-1.76c-.19-1.11-1-4.38-2.3-7.07 3.23-.52 6.05.33 6.4.44a10.24 10.24 0 0 1-4.1 6.63z"/></svg> },
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="relative w-full pt-32 pb-16 overflow-hidden z-10">
      {/* Background glow ambient spotlights */}
      <div className="absolute bottom-0 left-[50%] -translate-x-1/2 w-[80vw] h-[40vw] max-w-[900px] rounded-full bg-gradient-to-tr from-neon-purple/5 to-neon-cyan/5 filter blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          {/* Left Column: Context Callouts */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <div className="text-xs uppercase font-bold tracking-widest text-gray-500 mb-4">
              Get in Touch
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
              Let’s Architect <br /> Your Next Initiative.
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-medium mb-10">
              Have an idea for a custom SaaS, a high-performance dashboard, or an interactive web experience? Connect with me today to discuss details.
            </p>

            {/* Social Anchor Grids */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl glass border border-dark-border flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300 shadow-inner group"
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Elegant Contact Form */}
          <div className="lg:col-span-7 w-full">
            <motion.div
              className="glass p-8 sm:p-10 rounded-3xl border border-dark-border shadow-[0_15px_40px_-20px_rgba(0,0,0,0.7)] relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Form container */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full name input */}
                <div className="flex flex-col text-left group">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 transition-colors duration-300 group-focus-within:text-neon-cyan">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter your name"
                    disabled={isSubmitting || isSent}
                    className="w-full px-5 py-4 rounded-xl bg-dark-bg/40 border border-dark-border focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan text-white placeholder-gray-600 text-sm font-medium tracking-wide outline-none transition-all duration-300 disabled:opacity-50"
                  />
                </div>

                {/* Email address input */}
                <div className="flex flex-col text-left group">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 transition-colors duration-300 group-focus-within:text-neon-cyan">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="name@company.com"
                    disabled={isSubmitting || isSent}
                    className="w-full px-5 py-4 rounded-xl bg-dark-bg/40 border border-dark-border focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan text-white placeholder-gray-600 text-sm font-medium tracking-wide outline-none transition-all duration-300 disabled:opacity-50"
                  />
                </div>

                {/* Project details message */}
                <div className="flex flex-col text-left group">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 transition-colors duration-300 group-focus-within:text-neon-cyan">
                    Tell Me About the Project
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Please include timelines, key requirements, or platform briefs."
                    disabled={isSubmitting || isSent}
                    className="w-full px-5 py-4 rounded-xl bg-dark-bg/40 border border-dark-border focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan text-white placeholder-gray-600 text-sm font-medium tracking-wide outline-none transition-all duration-300 resize-none disabled:opacity-50"
                  />
                </div>

                {/* Interactive Dynamic Action Submit Button (Design Spell) */}
                <button
                  type="submit"
                  disabled={isSubmitting || isSent}
                  className="w-full relative h-[52px] inline-flex items-center justify-center rounded-xl font-bold uppercase tracking-wider text-sm outline-none transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  <AnimatePresence mode="wait">
                    {isSent ? (
                      <motion.div
                        key="sent"
                        className="absolute inset-0 bg-emerald-500 text-white flex items-center justify-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>Message Sent Successfully</span>
                      </motion.div>
                    ) : isSubmitting ? (
                      <motion.div
                        key="loader"
                        className="absolute inset-0 bg-neon-cyan text-dark-bg flex items-center justify-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {/* Shimmer loading spinner */}
                        <div className="w-5 h-5 rounded-full border-2 border-dark-bg/30 border-t-dark-bg animate-spin" />
                        <span>Transmitting Data...</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default"
                        className="absolute inset-0 bg-white text-dark-bg hover:bg-neon-cyan hover:text-dark-bg flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_20px_rgba(6,182,212,0.45)]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Global Premium Footer */}
        <footer className="w-full border-t border-white/5 pt-12 mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left copyright and brand details */}
          <div className="flex flex-col items-start text-left gap-1">
            <span className="font-sans font-bold text-base tracking-widest text-white">
              VALENTIN<span className="text-neon-cyan">.</span>
            </span>
            <span className="text-xs text-gray-500 font-medium">
              © {new Date().getFullYear()} Valentin. All rights reserved.
            </span>
          </div>

          {/* Let's build footer CTA */}
          <div className="text-center sm:text-right">
            <span className="text-sm font-semibold text-gray-400 block mb-1">
              Ready to execute?
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan font-bold tracking-tight text-lg">
              Let's build something remarkable.
            </span>
          </div>

          {/* Back to top dynamic button */}
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full glass border border-dark-border text-xs font-semibold text-gray-400 hover:text-white transition-colors duration-300 group"
          >
            <span>Back to top</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </footer>
      </div>
    </section>
  );
};
