import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(true);

  // Mouse coords motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics config for smooth, lagging orbital effect
  const springConfig = { damping: 40, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device supports fine hover (pointer: fine)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsMobile(!mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(!e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Hover state triggers
    const addHoverListeners = () => {
      const clickables = document.querySelectorAll(
        'a, button, input, textarea, [role="button"], .clickable-card'
      );
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true));
        el.addEventListener('mouseleave', () => setHovered(false));
      });
    };

    // Run listeners setup on mount and periodic updates (e.g. dynamic elements)
    addHoverListeners();
    const interval = setInterval(addHoverListeners, 1500);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      mediaQuery.removeEventListener('change', handleMediaChange);
      clearInterval(interval);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Outer Lagging Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-9999 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          border: hovered
            ? '1.5px solid rgba(6, 182, 212, 0.8)'
            : '1.5px solid rgba(168, 85, 247, 0.6)',
          background: hovered
            ? 'rgba(6, 182, 212, 0.15)'
            : 'rgba(168, 85, 247, 0.03)',
          boxShadow: hovered
            ? '0 0 15px rgba(6, 182, 212, 0.4)'
            : '0 0 8px rgba(168, 85, 247, 0.1)',
          width: hovered ? 56 : 32,
          height: hovered ? 56 : 32,
        }}
        animate={{
          scale: hovered ? 1.2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />

      {/* Inner Pinpoint Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-9999 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};
