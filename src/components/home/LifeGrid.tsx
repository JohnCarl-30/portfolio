"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CELL = 18;
const HEIGHT = 176;
const STEP_MS = 110;
const SEED_DENSITY = 0.18;
const FADE = 0.14;

/**
 * Conway's Life played on the same 18px lattice the page background uses,
 * so the site's texture appears to come alive inside the panel. Dead cells
 * keep a decaying trail, which turns the simulation into something that
 * reads as motion rather than flicker.
 *
 * Drag across it to seed cells. No network, no assets.
 */
export default function LifeGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [generation, setGeneration] = useState(0);
  const [running, setRunning] = useState(true);
  const seedRef = useRef<(() => void) | null>(null);

  const reseed = useCallback(() => seedRef.current?.(), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cols = 0;
    let rows = 0;
    let cells = new Uint8Array(0);
    let next = new Uint8Array(0);
    let heat = new Float32Array(0);
    let dpr = 1;
    let frame = 0;
    let last = 0;
    let visible = true;
    let paused = false;
    let signal = "#1d7d74";
    let generations = 0;

    const readColor = () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue("--signal")
        .trim();
      if (value) signal = value;
    };

    const seed = () => {
      for (let i = 0; i < cells.length; i += 1) {
        cells[i] = Math.random() < SEED_DENSITY ? 1 : 0;
        heat[i] = cells[i];
      }
      generations = 0;
      setGeneration(0);
    };
    seedRef.current = seed;

    const allocate = () => {
      const width = wrap.clientWidth;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cols = Math.max(1, Math.floor(width / CELL));
      rows = Math.max(1, Math.floor(HEIGHT / CELL));

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(HEIGHT * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${HEIGHT}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cells = new Uint8Array(cols * rows);
      next = new Uint8Array(cols * rows);
      heat = new Float32Array(cols * rows);
      seed();
    };

    const neighbours = (col: number, row: number) => {
      let count = 0;
      for (let dx = -1; dx <= 1; dx += 1) {
        for (let dy = -1; dy <= 1; dy += 1) {
          if (dx === 0 && dy === 0) continue;
          // Toroidal edges keep gliders from dying at the border.
          const nc = (col + dx + cols) % cols;
          const nr = (row + dy + rows) % rows;
          count += cells[nr * cols + nc];
        }
      }
      return count;
    };

    const step = () => {
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const index = row * cols + col;
          const alive = cells[index] === 1;
          const n = neighbours(col, row);
          next[index] = alive ? (n === 2 || n === 3 ? 1 : 0) : n === 3 ? 1 : 0;
        }
      }
      cells.set(next);
      generations += 1;
      if (generations % 4 === 0) setGeneration(generations);
    };

    const render = () => {
      const width = wrap.clientWidth;
      ctx.clearRect(0, 0, width, HEIGHT);
      ctx.fillStyle = signal;

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const index = row * cols + col;
          const alive = cells[index] === 1;
          heat[index] = alive
            ? 1
            : Math.max(0, heat[index] - FADE);

          const value = heat[index];
          if (value <= 0.02) continue;

          ctx.globalAlpha = 0.16 + value * 0.72;
          ctx.beginPath();
          ctx.arc(
            col * CELL + CELL / 2,
            row * CELL + CELL / 2,
            0.9 + value * 1.5,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
    };

    const tick = (time: number) => {
      frame = window.requestAnimationFrame(tick);
      if (!visible || paused) return;
      if (time - last < STEP_MS) return;
      last = time;
      step();
      render();
    };

    const paint = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const col = Math.floor((event.clientX - rect.left) / CELL);
      const row = Math.floor((event.clientY - rect.top) / CELL);

      for (let dx = -1; dx <= 1; dx += 1) {
        for (let dy = -1; dy <= 1; dy += 1) {
          const nc = col + dx;
          const nr = row + dy;
          if (nc < 0 || nc >= cols || nr < 0 || nr >= rows) continue;
          if (Math.random() > 0.55) continue;
          cells[nr * cols + nc] = 1;
        }
      }
      render();
    };

    readColor();
    allocate();
    render();

    if (calm) {
      paused = true;
    } else {
      frame = window.requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    observer.observe(wrap);

    const resizeObserver = new ResizeObserver(() => {
      allocate();
      render();
    });
    resizeObserver.observe(wrap);

    const themeObserver = new MutationObserver(() => {
      readColor();
      render();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "data-theme-selection"],
    });

    const handleDown = (event: PointerEvent) => {
      canvas.setPointerCapture(event.pointerId);
      paint(event);
    };
    const handleMove = (event: PointerEvent) => {
      if (event.buttons === 0) return;
      paint(event);
    };

    canvas.addEventListener("pointerdown", handleDown);
    canvas.addEventListener("pointermove", handleMove);

    const handleToggle = (event: Event) => {
      paused = !(event as CustomEvent<boolean>).detail;
    };
    wrap.addEventListener("life:running", handleToggle);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener("pointerdown", handleDown);
      canvas.removeEventListener("pointermove", handleMove);
      wrap.removeEventListener("life:running", handleToggle);
      seedRef.current = null;
    };
  }, []);

  useEffect(() => {
    wrapRef.current?.dispatchEvent(
      new CustomEvent("life:running", { detail: running }),
    );
  }, [running]);

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--panel)]">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--line)] px-3.5 py-2">
        <p className="meta">game of life · drag to seed</p>

        <div className="flex items-center gap-3">
          <span className="meta tnum">gen {generation}</span>
          <button
            type="button"
            onClick={() => setRunning((value) => !value)}
            className="focus-ring meta rounded px-1.5 py-0.5 transition-colors hover:bg-[var(--hover)] hover:text-[var(--ink)]"
          >
            {running ? "pause" : "play"}
          </button>
          <button
            type="button"
            onClick={reseed}
            className="focus-ring meta rounded px-1.5 py-0.5 transition-colors hover:bg-[var(--hover)] hover:text-[var(--ink)]"
          >
            reseed
          </button>
        </div>
      </div>

      <div ref={wrapRef} className="relative">
        <canvas
          ref={canvasRef}
          className="block w-full cursor-crosshair touch-none"
          aria-label="Conway's Game of Life, interactive"
          role="img"
        />
      </div>
    </div>
  );
}
