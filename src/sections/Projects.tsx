import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, GitFork } from 'lucide-react';

// Import logos
import reactLogo from '../assets/react.svg';
import tsLogo from '../assets/ts.png';
import tailwindLogo from '../assets/tailwind.png';
import nodeLogo from '../assets/node.png';
import mongoLogo from '../assets/mongo.png';
import jsLogo from '../assets/js.png';

interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl: string;
  gitUrl: string;
}

const TechIcon: React.FC<{ name: string }> = ({ name }) => {
  const iconMap: Record<string, string> = {
    'React': reactLogo,
    'TypeScript': tsLogo,
    'Node.js': nodeLogo,
    'TailwindCSS': tailwindLogo,
    'MongoDB': mongoLogo,
    'JavaScript': jsLogo
  };

  const src = iconMap[name];
  if (!src) return <span className="text-[10px] font-bold">{name}</span>;

  return <img src={src} alt={name} className="w-4 h-4 object-contain" />;
};

export const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: 'Agentic Manage',
      category: 'AI Learning Platform',
      description: 'A full-stack AI learning system simulating specialized agent roles (Analyst, Teacher, Quizzer) to provide an interactive educational experience with Gemini API integration.',
      tags: ['React', 'TypeScript', 'Node.js', 'TailwindCSS'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      liveUrl: 'https://github.com/aissaP5/agentic-manage',
      gitUrl: 'https://github.com/aissaP5/agentic-manage'
    },
    {
      title: 'SIG (AI Studio)',
      category: 'AI Application Framework',
      description: 'An AI Studio application framework that enables users to run and deploy custom AI models locally, integrating a TypeScript frontend with a Python backend.',
      tags: ['TypeScript', 'Node.js', 'React'],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      liveUrl: 'https://github.com/aissaP5/SIG',
      gitUrl: 'https://github.com/aissaP5/SIG'
    },
    {
      title: 'Blood Donation',
      category: 'Healthcare App',
      description: 'A web-based application designed to streamline the blood donation process, connecting donors with those in need through a clean and accessible interface.',
      tags: ['JavaScript', 'React', 'Node.js'],
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80',
      liveUrl: 'https://github.com/aissaP5/Blood-Donation',
      gitUrl: 'https://github.com/aissaP5/Blood-Donation'
    },
    {
      title: 'Drawing Game',
      category: 'Interactive Web',
      description: 'An interactive drawing game featuring real-time synchronization and smooth brush mechanics for a collaborative creative experience.',
      tags: ['JavaScript', 'TailwindCSS'],
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      liveUrl: 'https://github.com/aissaP5/Drawing-Game',
      gitUrl: 'https://github.com/aissaP5/Drawing-Game'
    }
  ];

  const [activeProject, setActiveProject] = useState<Project>(projects[0]);

  return (
    <section id="projects" className="relative w-full py-24 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">
            Real-World Works
          </h2>
          <div className="w-12 h-1 bg-neon-purple rounded-full mb-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Project Selector List */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {projects.map((project) => {
              const isActive = activeProject.title === project.title;
              return (
                <button
                  key={project.title}
                  onClick={() => setActiveProject(project)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                    isActive
                      ? 'glass border-white/20 shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)]'
                      : 'border-white/5 hover:border-white/10 hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute inset-0 bg-gradient-to-r from-neon-purple/5 to-neon-cyan/5 -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                    {project.category}
                  </span>
                  <h3 className={`text-xl font-bold transition-colors duration-300 ${
                    isActive ? 'text-neon-cyan' : 'text-white group-hover:text-neon-cyan'
                  }`}>
                    {project.title}
                  </h3>
                  <div className="flex gap-2 mt-4 opacity-60">
                    {project.tags.map((tag) => (
                      <TechIcon key={tag} name={tag} />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Display Panel */}
          <div className="lg:col-span-7 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-3xl border border-white/10 overflow-hidden flex flex-col h-full shadow-2xl"
              >
                {/* Image Showcase */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full glass border border-white/10 text-[10px] font-bold uppercase tracking-widest text-neon-cyan">
                      {activeProject.category}
                    </span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-8 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
                      {activeProject.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {activeProject.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {activeProject.tags.map((tag) => (
                        <div key={tag} className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-300">
                          <TechIcon name={tag} />
                          <span>{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/5">
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-dark-bg bg-white hover:bg-neon-cyan hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 rounded-xl"
                    >
                      <Globe className="w-4 h-4" />
                      Live Demo
                    </a>
                    <a
                      href={activeProject.gitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white glass border border-white/10 hover:bg-white/5 transition-all duration-300 rounded-xl"
                    >
                      <GitFork className="w-4 h-4" />
                      Source Code
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
