import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: 'Sarah Jenkins',
      role: 'CTO, CloudScale',
      quote: 'Valentin rebuilt our core portal. The result was a 40% improvement in load times and stunning UI.'
    },
    {
      name: 'Marcus Thorne',
      role: 'Founder, ApexSaaS',
      quote: 'Turned complex wireframes into a silky-smooth, highly-responsive SaaS platform.'
    },
    {
      name: 'Elena Rostova',
      role: 'Product Lead, VeloLabs',
      quote: 'The speed, SEO, and visual polish of our landing pages exceeded all targets.'
    }
  ];

  return (
    <section id="testimonials" className="relative w-full py-24 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              className="glass p-8 rounded-[2rem] border border-white/5 flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-gray-300 text-sm leading-relaxed font-medium mb-8 italic">
                “{t.quote}”
              </p>
              <div className="flex flex-col text-left">
                <span className="text-sm font-black text-white">{t.name}</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-neon-cyan">{t.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
