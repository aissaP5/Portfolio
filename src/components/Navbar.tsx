import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  id: string;
}

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [, setScrolled] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { label: 'Bio', id: 'about' },
    { label: 'Stack', id: 'skills' },
    { label: 'Works', id: 'projects' },
    { label: 'Expertise', id: 'services' },
    { label: 'Social', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollPos = window.scrollY + 200;
      
      const hero = document.getElementById('hero');
      if (hero && scrollPos < hero.offsetTop + hero.offsetHeight) {
        setActiveSection('hero');
        return;
      }

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 py-6 transition-all duration-300`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-black text-dark-bg transition-transform duration-500 group-hover:rotate-12">
              V
            </div>
            <span className="font-bold text-sm tracking-[0.2em] text-white">
              VALENTIN
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1 glass-nav px-2 py-1 rounded-2xl border border-white/5 shadow-2xl">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative px-5 py-2 rounded-xl text-[10px] uppercase font-bold tracking-widest transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activePill"
                    className="absolute inset-0 bg-white/5 rounded-xl border border-white/10 z-[-1]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl glass border border-white/5 text-white"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-dark-bg flex flex-col justify-center px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="text-5xl font-black tracking-tighter text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
