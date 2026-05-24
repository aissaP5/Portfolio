import React from 'react';
import { motion } from 'framer-motion';

// Import logos from assets
import reactLogo from '../assets/react.svg';
import tsLogo from '../assets/ts.png';
import jsLogo from '../assets/js.png';
import tailwindLogo from '../assets/tailwind.png';
import nodeLogo from '../assets/node.png';
import vueLogo from '../assets/vue.png';
import mongoLogo from '../assets/mongo.png';
import viteLogo from '../assets/vite.svg';

interface Skill {
  name: string;
  image: string;
  color: string;
}

export const Skills: React.FC = () => {
  const skills: Skill[] = [
    { name: 'React', image: reactLogo, color: '#61DAFB' },
    { name: 'TypeScript', image: tsLogo, color: '#3178C6' },
    { name: 'JavaScript', image: jsLogo, color: '#F7DF1E' },
    { name: 'Tailwind', image: tailwindLogo, color: '#06B6D4' },
    { name: 'Vue.js', image: vueLogo, color: '#41B883' },
    { name: 'Node.js', image: nodeLogo, color: '#339933' },
    { name: 'MongoDB', image: mongoLogo, color: '#47A248' },
    { name: 'Vite', image: viteLogo, color: '#9135ff' }
  ];

  return (
    <section id="skills" className="relative w-full py-24 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">
            The Toolkit
          </h2>
          <div className="w-12 h-1 bg-neon-cyan rounded-full mb-8" />
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="flex flex-col items-center gap-4 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div 
                className="w-20 h-20 md:w-24 md:h-24 rounded-3xl glass border border-white/5 flex items-center justify-center p-5 transition-all duration-500 group-hover:border-white/20 group-hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)] group-hover:-translate-y-2"
              >
                <img 
                  src={skill.image} 
                  alt={skill.name} 
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 group-hover:text-gray-300 transition-colors">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
