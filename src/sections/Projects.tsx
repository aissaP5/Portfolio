import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, Plus } from 'lucide-react';
import { ProjectModal } from '../components/ProjectModal';

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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: 'Agentic Manage',
      category: 'AI Learning Platform',
      description: 'A full-stack AI learning system simulating specialized agent roles (Analyst, Teacher, Quizzer) to provide an interactive educational experience with Gemini API integration.',
      tags: ['React', 'TypeScript', 'Node.js', 'TailwindCSS'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80', // Placeholder image
      liveUrl: 'https://github.com/aissaP5/agentic-manage',
      gitUrl: 'https://github.com/aissaP5/agentic-manage'
    },
    {
      title: 'SIG (AI Studio)',
      category: 'AI Application Framework',
      description: 'An AI Studio application framework that enables users to run and deploy custom AI models locally, integrating a TypeScript frontend with a Python backend.',
      tags: ['TypeScript', 'Node.js', 'React'],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80', // Placeholder image
      liveUrl: 'https://github.com/aissaP5/SIG',
      gitUrl: 'https://github.com/aissaP5/SIG'
    },
    {
      title: 'Blood Donation',
      category: 'Healthcare App',
      description: 'A web-based application designed to streamline the blood donation process, connecting donors with those in need through a clean and accessible interface.',
      tags: ['JavaScript', 'React', 'Node.js'],
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80', // Placeholder image
      liveUrl: 'https://github.com/aissaP5/Blood-Donation',
      gitUrl: 'https://github.com/aissaP5/Blood-Donation'
    },
    {
      title: 'Drawing Game',
      category: 'Interactive Web',
      description: 'An interactive drawing game featuring real-time synchronization and smooth brush mechanics for a collaborative creative experience.',
      tags: ['JavaScript', 'TailwindCSS'],
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80', // Placeholder image
      liveUrl: 'https://github.com/aissaP5/Drawing-Game',
      gitUrl: 'https://github.com/aissaP5/Drawing-Game'
    }
  ];

  return (
    <section id="projects" className="relative w-full py-24 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">
            Real-World Works
          </h2>
          <div className="w-12 h-1 bg-neon-purple rounded-full mb-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              onClick={() => setSelectedProject(project)}
              className="glass rounded-[2rem] overflow-hidden border border-white/5 group cursor-pointer hover:border-white/20 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent" />
                
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1 rounded-full glass border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white">
                    {project.category}
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                   <div className="w-12 h-12 rounded-full bg-white text-dark-bg flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                      <Plus className="w-5 h-5" />
                   </div>
                </div>
              </div>

              <div className="p-8 text-left">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                  <div className="flex gap-3 text-gray-500">
                    {project.tags.map((tag) => (
                      <div key={tag} title={tag} className="hover:text-white transition-colors flex items-center justify-center">
                        <TechIcon name={tag} />
                      </div>
                    ))}
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};
