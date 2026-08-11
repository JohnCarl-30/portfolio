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
      shouldReduceMotion ? 250 : 1700,
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
          <svg
            viewBox="0 0 160 110"
            className="relative h-28 w-auto select-none"
            aria-hidden="true"
          >
            <text
              x="80"
              y="76"
              textAnchor="middle"
              className="splash-mark"
              style={{
                fontFamily: "var(--font-script), cursive",
                fontSize: "82px",
                fontWeight: 600,
              }}
            >
              jc
            </text>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
