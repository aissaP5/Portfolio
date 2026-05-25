import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code2, Cpu, Globe, Rocket } from 'lucide-react';

interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl: string;
  gitUrl: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-dark-bg/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          className="relative w-full max-w-5xl max-h-[90vh] bg-dark-bg border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:text-neon-cyan transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Image Side */}
          <div className="lg:w-1/2 relative h-64 lg:h-auto bg-slate-900 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg lg:bg-gradient-to-r lg:from-transparent lg:to-dark-bg/20" />
            
            {/* Technical Overlay */}
            <div className="absolute bottom-8 left-8 flex flex-col gap-2">
              <span className="px-3 py-1 rounded-full glass border border-white/10 text-[10px] font-bold uppercase tracking-widest text-neon-cyan">
                {project.category}
              </span>
            </div>
          </div>

          {/* Right: Content Side */}
          <div className="lg:w-1/2 p-8 sm:p-12 overflow-y-auto custom-scrollbar">
            <div className="mb-10 text-left">
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
                {project.title}
              </h3>
              <p className="text-gray-400 text-base leading-relaxed font-medium mb-8">
                {project.description} Extended architecture breakdown: This project utilizes a highly modular system design to ensure maximum scalability and sub-millisecond response times.
              </p>

              {/* Project Stats/Features */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="p-4 rounded-2xl glass border border-white/5 flex flex-col gap-2">
                  <Rocket className="w-4 h-4 text-neon-purple" />
                  <span className="text-[10px] uppercase font-bold text-gray-500">Performance</span>
                  <span className="text-sm font-bold text-white tracking-tight">99/100 Score</span>
                </div>
                <div className="p-4 rounded-2xl glass border border-white/5 flex flex-col gap-2">
                  <Cpu className="w-4 h-4 text-neon-cyan" />
                  <span className="text-[10px] uppercase font-bold text-gray-500">Infrastructure</span>
                  <span className="text-sm font-bold text-white tracking-tight">Cloud-Native</span>
                </div>
              </div>

              {/* Tech Stack Header */}
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-4 h-4 text-neon-blue" />
                <span className="text-xs uppercase font-bold tracking-widest text-gray-500">Core Technologies</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-10">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-xl text-xs font-bold tracking-wide bg-white/5 border border-white/5 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/5">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-wider text-dark-bg bg-white hover:bg-neon-cyan transition-all rounded-2xl shadow-xl"
                >
                  <Globe className="w-4 h-4" />
                  Live Preview
                </a>
                <a
                  href={project.gitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white glass border border-white/10 hover:bg-white/5 transition-all rounded-2xl"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.28-1.55 3.28-1.23 3.28-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  View Source
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
