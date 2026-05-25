import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-dark-bg flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Logo Animation */}
          <motion.div
            className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-neon-purple to-neon-cyan flex items-center justify-center font-black text-4xl text-white shadow-[0_0_50px_rgba(168,85,247,0.4)] mb-12"
            initial={{ scale: 0.8, rotate: -15, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            A
          </motion.div>

          {/* Progress Container */}
          <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-purple to-neon-cyan"
              style={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            />
          </div>
          
          {/* Loading Text */}
          <motion.div 
            className="mt-6 flex flex-col items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gray-500">
              Initializing Engine
            </span>
            <span className="font-mono text-xs font-bold text-neon-cyan">
              {Math.round(progress)}%
            </span>
          </motion.div>

          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-neon-purple/10 rounded-full filter blur-[150px] animate-pulse-slow" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
