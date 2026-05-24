import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "What is your primary technology stack?",
      answer: "I specialize in the 'Modern Web Stack' centering on React, TypeScript, and TailwindCSS for the frontend, with Node.js/Express or Python/FastAPI for the backend. I also have deep expertise in Three.js for interactive 3D experiences and Docker for containerization."
    },
    {
      question: "Are you available for freelance projects?",
      answer: "Yes, I am currently accepting select freelance projects and consulting opportunities. I prefer initiatives that challenge technical boundaries or require high-performance architectures."
    },
    {
      question: "How do you handle project management and communication?",
      answer: "I believe in absolute transparency. I typically use tools like Linear or Trello for task tracking and Slack or Discord for daily communication. We'll have weekly syncs and you'll have access to a live staging environment to monitor progress in real-time."
    },
    {
      question: "Can you help with UI/UX design as well?",
      answer: "Absolutely. I follow a 'Design Engineering' philosophy where design is not just about aesthetics but also about implementation quality. I use Figma for high-fidelity prototyping and then map those designs 1:1 to clean, optimized code."
    }
  ];

  return (
    <section id="faq" className="relative w-full py-32 md:py-48 overflow-hidden z-10">
      {/* Background glow shadow */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 w-[50vw] h-[50vw] rounded-full bg-neon-cyan/5 filter blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-dark-border text-[10px] font-bold uppercase tracking-widest text-neon-purple mb-6">
            <HelpCircle className="w-3 h-3" />
            <span>Information</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            Common Inquiries.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-medium max-w-xl">
            Quick answers to the most frequently asked questions about my workflow, tech stack, and availability.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`rounded-3xl border transition-all duration-500 overflow-hidden ${
                openIndex === index 
                  ? 'glass border-white/20 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]' 
                  : 'bg-dark-bg/20 border-white/5 hover:border-white/10'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 sm:p-8 text-left outline-none group"
              >
                <span className={`text-base sm:text-lg font-bold tracking-tight transition-colors duration-300 ${
                  openIndex === index ? 'text-neon-cyan' : 'text-white'
                }`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                  openIndex === index ? 'bg-neon-cyan text-dark-bg rotate-180' : 'bg-white/5 text-white'
                }`}>
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-6 pb-8 sm:px-8 sm:pb-10 text-gray-400 text-sm sm:text-base leading-relaxed font-medium">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
