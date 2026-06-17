import { motion, useScroll, useSpring } from 'motion/react';

/**
 * A thin scroll-linked progress bar pinned to the top of the viewport.
 * Subtle, Vercel-style — gives a sense of position without being decorative.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] bg-gradient-to-r from-indigo-500 via-purple-400 to-indigo-500"
    />
  );
}
