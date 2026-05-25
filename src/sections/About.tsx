import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Code2 } from 'lucide-react';
import aboutImg from '../assets/image.png';

export const About: React.FC = () => {
  const statCards = [
    { value: '5+', label: 'Years', icon: <Cpu className="w-5 h-5 text-neon-cyan" /> },
    { value: '30+', label: 'Projects', icon: <Code2 className="w-5 h-5 text-neon-purple" /> },
    { value: '99%', label: 'Quality', icon: <ShieldCheck className="w-5 h-5 text-neon-blue" /> },
  ];

  return (
    <section id="about" className="relative w-full py-24 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-8 tracking-tight">
              Design Engineered. <br />
              <span className="text-gray-500 text-3xl sm:text-4xl">Architecture First.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed font-medium mb-12 max-w-xl">
              I build scalable software solutions with a focus on React, Vue, and Node.js. My approach combines rigorous engineering standards with cinematic user interfaces.
            </p>
            
            <div className="flex gap-4">
              {statCards.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-2xl font-black text-white">{stat.value}</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <motion.div
              className="glass p-2 rounded-[2rem] border border-white/5 overflow-hidden aspect-square max-w-[400px] mx-auto flex items-center justify-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img src={aboutImg} alt="About Me" className="w-full h-full object-cover rounded-[1.75rem] opacity-90 hover:opacity-100 transition-opacity duration-500" />
            </motion.div>

            <motion.div
              className="glass p-8 sm:p-10 rounded-[2rem] border border-white/5 relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/5 filter blur-3xl rounded-full" />
              <div className="text-[10px] uppercase font-black tracking-[0.3em] text-neon-cyan mb-6">
                Mission
              </div>
              <p className="text-lg sm:text-xl text-white font-bold leading-tight tracking-tight italic">
                “To turn complex ideas into powerful digital products through clean design and elite performance.”
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
