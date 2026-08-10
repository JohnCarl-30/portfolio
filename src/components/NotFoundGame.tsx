"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

import { Kbd } from "@/components/ui/kbd";

const WIDTH = 600;
const HEIGHT = 200;
const GROUND_Y = 170;
const PLAYER_X = 50;
const PLAYER_SIZE = 24;
const GRAVITY = 1500;
const JUMP_VELOCITY = -560;
const BEST_SCORE_KEY = "nf-runner-best";

type Phase = "idle" | "running" | "over";

type Obstacle = { x: number; w: number; h: number };

type GameState = {
  playerY: number;
  velocityY: number;
  obstacles: Obstacle[];
  speed: number;
  score: number;
  spawnTimer: number;
};

const createGameState = (): GameState => ({
  playerY: GROUND_Y - PLAYER_SIZE,
  velocityY: 0,
  obstacles: [],
  speed: 240,
  score: 0,
  spawnTimer: 1,
});

const readThemeColors = () => {
  const styles = getComputedStyle(document.documentElement);
  return {
    player: styles.getPropertyValue("--primary").trim() || "#3b82f6",
    obstacle:
      styles.getPropertyValue("--muted-foreground").trim() || "#64748b",
    ground: styles.getPropertyValue("--border").trim() || "#cbd5e1",
  };
};

export default function NotFoundGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const gameRef = useRef<GameState>(createGameState());
  const colorsRef = useRef({ player: "", obstacle: "", ground: "" });
  const [phase, setPhase] = useState<Phase>("idle");
  const [finalScore, setFinalScore] = useState(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    setBest(Number(window.localStorage.getItem(BEST_SCORE_KEY)) || 0);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const colors = colorsRef.current;
    const game = gameRef.current;

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    ctx.strokeStyle = colors.ground;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y + 1);
    ctx.lineTo(WIDTH, GROUND_Y + 1);
    ctx.stroke();

    ctx.fillStyle = colors.player;
    ctx.beginPath();
    ctx.roundRect(PLAYER_X, game.playerY, PLAYER_SIZE, PLAYER_SIZE, 5);
    ctx.fill();

    ctx.fillStyle = colors.obstacle;
    for (const obstacle of game.obstacles) {
      ctx.beginPath();
      ctx.roundRect(
        obstacle.x,
        GROUND_Y - obstacle.h,
        obstacle.w,
        obstacle.h,
        3,
      );
      ctx.fill();
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = WIDTH * dpr;
    canvas.height = HEIGHT * dpr;
    canvas.getContext("2d")?.scale(dpr, dpr);

    colorsRef.current = readThemeColors();
    draw();
  }, [draw]);

  const endGame = useCallback(() => {
    const score = Math.floor(gameRef.current.score);
    setFinalScore(score);
    setBest((currentBest) => {
      const nextBest = Math.max(currentBest, score);
      window.localStorage.setItem(BEST_SCORE_KEY, String(nextBest));
      return nextBest;
    });
    setPhase("over");
  }, []);

  useEffect(() => {
    if (phase !== "running") return;

    let raf = 0;
    let last = performance.now();

    const update = (dt: number) => {
      const game = gameRef.current;

      game.velocityY += GRAVITY * dt;
      game.playerY += game.velocityY * dt;
      if (game.playerY >= GROUND_Y - PLAYER_SIZE) {
        game.playerY = GROUND_Y - PLAYER_SIZE;
        game.velocityY = 0;
      }

      game.speed = Math.min(520, game.speed + 8 * dt);
      game.score += dt * 10;

      game.spawnTimer -= dt;
      if (game.spawnTimer <= 0) {
        game.obstacles.push({
          x: WIDTH + 20,
          w: 12 + Math.random() * 10,
          h: 24 + Math.random() * 18,
        });
        game.spawnTimer =
          (0.9 + Math.random() * 0.7) * (300 / (game.speed + 60));
      }

      for (const obstacle of game.obstacles) {
        obstacle.x -= game.speed * dt;
      }
      game.obstacles = game.obstacles.filter(
        (obstacle) => obstacle.x + obstacle.w > -10,
      );

      const pad = 3;
      for (const obstacle of game.obstacles) {
        const hitX =
          PLAYER_X + pad < obstacle.x + obstacle.w &&
          PLAYER_X + PLAYER_SIZE - pad > obstacle.x;
        const hitY =
          game.playerY + PLAYER_SIZE - pad > GROUND_Y - obstacle.h;
        if (hitX && hitY) {
          endGame();
          return;
        }
      }

      if (scoreRef.current) {
        scoreRef.current.textContent = String(Math.floor(game.score));
      }
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      update(dt);
      draw();
      if (gameRef.current) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    const onVisibility = () => {
      if (document.hidden) setPhase("idle");
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [phase, draw, endGame]);

  const jump = useCallback(() => {
    const game = gameRef.current;
    if (game.playerY >= GROUND_Y - PLAYER_SIZE - 1) {
      game.velocityY = JUMP_VELOCITY;
    }
  }, []);

  const startGame = useCallback(() => {
    gameRef.current = createGameState();
    colorsRef.current = readThemeColors();
    if (scoreRef.current) scoreRef.current.textContent = "0";
    setPhase("running");
  }, []);

  const handleAction = useCallback(() => {
    if (phase === "running") {
      jump();
    } else {
      startGame();
    }
  }, [jump, phase, startGame]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== " " && event.key !== "ArrowUp" && event.key !== "Enter")
        return;
      if (phase === "running") {
        event.preventDefault();
        jump();
        return;
      }
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        startGame();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [jump, phase, startGame]);

  return (
    <div className="w-full max-w-xl">
      <div className="flex items-center justify-between pb-3 font-mono text-xs text-slate-500 dark:text-slate-400">
        <span>
          score{" "}
          <span ref={scoreRef} className="text-slate-950 dark:text-white">
            {phase === "over" ? finalScore : 0}
          </span>
        </span>
        <span>
          best <span className="text-slate-950 dark:text-white">{best}</span>
        </span>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/60 dark:border-white/10 dark:bg-white/5">
        <canvas
          ref={canvasRef}
          onPointerDown={handleAction}
          className="block w-full cursor-pointer touch-none"
          style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
          aria-label="Runner mini game. Press space or tap to jump."
        />

        {phase !== "running" && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/55 backdrop-blur-[2px] dark:bg-slate-950/55">
            <p className="text-sm font-semibold text-slate-950 dark:text-white">
              {phase === "idle" ? "Lost? Play while you're here." : "Game over"}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {phase === "idle"
                ? "Press Space or tap to start"
                : `You scored ${finalScore}. Tap or press Space to retry.`}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 text-xs text-slate-500 dark:text-slate-400">
        <div className="hidden items-center gap-2 sm:flex">
          <Kbd>Space</Kbd>
          <span>jump</span>
          <span className="text-slate-300 dark:text-slate-600">·</span>
          <span>or tap the canvas</span>
        </div>
        <button
          type="button"
          onClick={startGame}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 px-3 py-1.5 font-medium text-slate-600 transition-[color,border-color,transform] duration-150 hover:border-slate-400 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98] dark:border-white/10 dark:text-slate-300 dark:hover:border-white/30 dark:hover:text-white"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Restart
        </button>
      </div>
    </div>
  );
}
