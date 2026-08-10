"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

export default function ReadingProgress() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary"
      style={{ scaleX: shouldReduceMotion ? scrollYProgress : smooth }}
    />
  );
}
