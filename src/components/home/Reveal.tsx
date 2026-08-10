"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealTag = "div" | "section" | "li" | "article" | "header" | "span";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger offset in seconds. */
  delay?: number;
  as?: RevealTag;
  /** Draws a hairline across instead of rising into place. */
  variant?: "rise" | "rule";
  style?: CSSProperties;
} & Record<string, unknown>;

/**
 * Scroll-in reveal.
 *
 * The animation lives in CSS (see globals.css) and is gated on `html.js`, so
 * the markup ships visible: if JavaScript never runs, or the observer never
 * fires, the reader still gets the content. This component only adds the
 * `is-in` class when the element reaches the viewport.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
  variant = "rise",
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Nothing to observe if the bootstrap never ran; content is already shown.
    if (!document.documentElement.classList.contains("js")) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -48px 0px", threshold: 0.01 },
    );

    observer.observe(node);

    // Safety net: if the observer has not fired by the time the page settles,
    // show everything rather than leave the reader with blank rows.
    const failsafe = window.setTimeout(() => {
      node.classList.add("is-in");
    }, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  const Tag = as as "div";

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={`${variant === "rule" ? "rule-draw" : "reveal"} ${className}`.trim()}
      style={
        delay
          ? ({ ...style, "--reveal-delay": `${Math.round(delay * 1000)}ms` } as CSSProperties)
          : style
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}
