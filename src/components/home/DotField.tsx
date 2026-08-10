"use client";

import { useEffect, useRef } from "react";

/**
 * A canvas that lights up the dots nearest the cursor.
 *
 * The page background already paints a static 18px dot lattice in CSS
 * (`body` in globals.css). This layer is phase-locked to that same lattice
 * and redraws only the dots inside a radius of the pointer, at a higher
 * alpha and a slightly larger radius, so the grid appears to glow under the
 * cursor rather than being a second, competing grid.
 *
 * Renders nothing for coarse pointers or reduced-motion users.
 */
const GRID = 18;
const RADIUS = 132;
const EASE = 0.16;

export default function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || calm.matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;

    // Target follows the real pointer; current eases toward it.
    const target = { x: -9999, y: -9999 };
    const current = { x: -9999, y: -9999 };
    let active = false;
    // The loop parks whenever the halo is static, and wakes on pointer input,
    // so an idle page costs nothing instead of redrawing at 60fps forever.
    let running = false;
    let fade = 0;
    let litColor = "rgba(17,20,24,0.42)";

    const readColor = () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue("--dot-lit")
        .trim();
      if (value) litColor = value;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (fade > 0.001) {
        // Only walk the lattice cells that can fall inside the halo.
        const minCol = Math.max(0, Math.floor((current.x - RADIUS) / GRID));
        const maxCol = Math.min(
          Math.ceil(width / GRID),
          Math.ceil((current.x + RADIUS) / GRID),
        );
        const minRow = Math.max(0, Math.floor((current.y - RADIUS) / GRID));
        const maxRow = Math.min(
          Math.ceil(height / GRID),
          Math.ceil((current.y + RADIUS) / GRID),
        );

        ctx.fillStyle = litColor;

        for (let col = minCol; col <= maxCol; col += 1) {
          // CSS `background-size: 18px` centers each dot in its tile.
          const x = col * GRID + GRID / 2;
          for (let row = minRow; row <= maxRow; row += 1) {
            const y = row * GRID + GRID / 2;
            const dx = x - current.x;
            const dy = y - current.y;
            const distance = Math.hypot(dx, dy);
            if (distance > RADIUS) continue;

            // Smoothstep falloff, squared for a tighter core.
            const t = 1 - distance / RADIUS;
            const strength = t * t * (3 - 2 * t);

            ctx.globalAlpha = strength * fade;
            ctx.beginPath();
            ctx.arc(x, y, 0.8 + strength * 0.95, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.globalAlpha = 1;
      }
    };

    const tick = () => {
      const dx = target.x - current.x;
      const dy = target.y - current.y;
      current.x += dx * EASE;
      current.y += dy * EASE;
      fade = active
        ? Math.min(1, fade + 0.14)
        : Math.max(0, fade - 0.09);

      draw();

      const settled = Math.abs(dx) < 0.4 && Math.abs(dy) < 0.4;

      if (!active && fade <= 0.001) {
        // Fully faded out: clear once and stop.
        ctx.clearRect(0, 0, width, height);
        running = false;
        return;
      }

      if (active && settled && fade >= 1) {
        // Static halo under a stationary cursor; the canvas keeps the last
        // frame, so we can stop drawing until the pointer moves again.
        running = false;
        return;
      }

      frame = window.requestAnimationFrame(tick);
    };

    const wake = () => {
      if (running) return;
      running = true;
      frame = window.requestAnimationFrame(tick);
    };

    const handleMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!active) {
        // Jump on first move so the halo does not fly in from the corner.
        current.x = target.x;
        current.y = target.y;
        active = true;
      }
      wake();
    };

    const handleLeave = () => {
      active = false;
      wake();
    };

    readColor();
    resize();

    const themeObserver = new MutationObserver(() => {
      readColor();
      wake();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "data-theme-selection"],
    });

    const handleResize = () => {
      resize();
      wake();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerleave", handleLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      themeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
