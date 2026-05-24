import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, CreditCard, PenTool, Radio, Zap } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const Services: React.FC = () => {
  const services: Service[] = [
    {
      title: 'Web Apps',
      description: 'High-performance, scalable web architectures.',
      icon: <Monitor className="w-6 h-6" />
    },
    {
      title: 'SaaS Design',
      description: 'Strategic product design and development.',
      icon: <CreditCard className="w-6 h-6" />
    },
    {
      title: 'UI Engineering',
      description: 'Pixel-perfect, accessible user interfaces.',
      icon: <PenTool className="w-6 h-6" />
    },
    {
      title: 'API Systems',
      description: 'Robust and secure backend infrastructure.',
      icon: <Radio className="w-6 h-6" />
    },
    {
      title: 'Performance',
      description: 'Optimization for sub-second load times.',
      icon: <Zap className="w-6 h-6" />
    }
  ];

  return (
    <section id="services" className="relative w-full py-24 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">
            Capabilities
          </h2>
          <div className="w-12 h-1 bg-neon-blue rounded-full mb-8" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="glass p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center group hover:border-white/20 transition-all duration-500"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-neon-cyan mb-6 group-hover:bg-neon-cyan group-hover:text-dark-bg transition-all duration-500">
                {service.icon}
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-3">
                {service.title}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed font-medium">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
