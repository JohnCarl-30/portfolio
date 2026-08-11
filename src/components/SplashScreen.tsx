"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;

/**
 * Full-screen intro shown on every hard load: the monogram fades in over the
 * page, holds for a beat, then the whole overlay dissolves and unmounts.
 * Server-rendered visible so it covers the page from the very first paint;
 * `html:not(.js)` CSS hides it entirely for no-JS visitors.
 */
export default function SplashScreen() {
  const shouldReduceMotion = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(
      () => setShow(false),
      shouldReduceMotion ? 250 : 1400,
    );
    return () => window.clearTimeout(timeout);
  }, [shouldReduceMotion]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          aria-hidden="true"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease }}
          className="splash-screen fixed inset-0 z-[200] flex items-center justify-center bg-[var(--paper)]"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, var(--hover) 0%, transparent 55%)",
            }}
          />
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="relative select-none font-[family-name:var(--font-script)] text-[4.5rem] leading-none text-[var(--ink)]"
          >
            jc
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
