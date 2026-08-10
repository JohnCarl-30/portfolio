"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { FaReact } from "react-icons/fa";

import FloatingCircle, { getContainerVariants } from "./floating_cirlce";
import ParticlesBackground from "./particles-background";
import personalImg from "../../public/personal.jpg";

const socialLinks = [
  {
    href: "https://github.com/JohnCarl-30",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://linkedin.com/in/santosjohncarl",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "mailto:johncarlsantos30@gmail.com",
    label: "Email",
    icon: Mail,
  },
];

const proofPoints = [
  {
    value: "5+",
    label: "shipped builds",
  },
  {
    value: "AI",
    label: "product focus",
  },
  {
    value: "Full-stack",
    label: "web + backend",
  },
];

const AnimatedStatValue = ({ value }: { value: string }) => {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const match = value.match(/^(\d+)(.*)$/);
  const [display, setDisplay] = useState(match ? "0" : value);

  useEffect(() => {
    const parsed = value.match(/^(\d+)(.*)$/);
    if (!parsed || !isInView) return;

    const target = parseInt(parsed[1], 10);

    if (shouldReduceMotion) {
      setDisplay(String(target));
      return;
    }

    const controls = animate(0, target, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(String(Math.round(latest))),
    });

    return () => controls.stop();
  }, [isInView, shouldReduceMotion, value]);

  return (
    <p
      ref={ref}
      className="text-lg font-semibold tracking-[-0.03em] text-slate-950 dark:text-white"
    >
      {match ? `${display}${match[2]}` : value}
    </p>
  );
};

const headlineEase = [0.23, 1, 0.32, 1] as const;

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const photoRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || !photoRef.current) return;

      const rect = photoRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = event.clientX - centerX;
      const mouseY = event.clientY - centerY;

      const rotateY = (mouseX / (rect.width / 2)) * 8;
      const rotateX = -(mouseY / (rect.height / 2)) * 8;

      setRotation({ x: rotateX, y: rotateY });
    },
    [shouldReduceMotion],
  );

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  }, []);

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[calc(100svh-6rem)] items-center overflow-hidden pt-8 pb-16"
    >
      <ParticlesBackground />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_30%),radial-gradient(circle_at_78%_18%,rgba(14,165,233,0.12),transparent_22%),linear-gradient(180deg,rgba(248,250,252,0.28),rgba(248,250,252,0.82)_58%,rgba(248,250,252,0.98))] dark:bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.18),transparent_30%),radial-gradient(circle_at_78%_18%,rgba(245,158,11,0.08),transparent_22%),linear-gradient(180deg,rgba(15,23,42,0.3),rgba(2,6,23,0.7)_58%,rgba(2,6,23,0.96))]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />

      <div className="page-shell relative z-10 grid items-center gap-16 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <div className="max-w-xl space-y-10">
            <div className="space-y-6">
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: headlineEase }}
                className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500"
              >
                Aspiring AI Engineer
              </motion.p>

              <h1 className="text-[clamp(3.5rem,8vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-slate-950 dark:text-white">
                <span className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
                  <motion.span
                    initial={shouldReduceMotion ? false : { y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: headlineEase,
                      delay: 0.1,
                    }}
                    className="block"
                  >
                    John
                  </motion.span>
                </span>
                <span className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
                  <motion.span
                    initial={shouldReduceMotion ? false : { y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: headlineEase,
                      delay: 0.24,
                    }}
                    className="block"
                  >
                    <span className="font-serif text-primary italic">Carl</span>{" "}
                    Santos
                  </motion.span>
                </span>
              </h1>

              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: headlineEase, delay: 0.45 }}
                className="max-w-md text-base leading-relaxed text-slate-500 dark:text-slate-400"
              >
                I build AI-powered web apps, backend systems, and automation
                tools with Next.js, Python, cloud infrastructure, and LLM
                workflows.
              </motion.p>
            </div>

            <div className="grid max-w-lg grid-cols-3 overflow-hidden rounded-2xl border border-slate-200/70 bg-white/55 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
              {proofPoints.map((point) => (
                <div
                  key={point.label}
                  className="border-r border-slate-200/70 px-4 py-3 last:border-r-0 dark:border-white/10"
                >
                  <AnimatedStatValue value={point.value} />
                  <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                    {point.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition-[color,transform] duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] dark:bg-white dark:text-slate-950"
              >
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/about"
                className="text-sm font-medium text-slate-500 underline-offset-4 transition-colors duration-150 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-slate-400 dark:hover:text-white"
              >
                More about me
              </Link>
            </div>

            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={item.label}
                    title={item.label}
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-[color,border-color,transform] duration-150 hover:border-slate-400 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] dark:border-white/10 dark:text-slate-500 dark:hover:border-white/30 dark:hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative hidden justify-center lg:flex">
          <div className="relative w-full max-w-[420px]">
            <div className="pointer-events-none absolute -left-6 top-8 h-32 w-32 rounded-full bg-blue-300/25 blur-3xl dark:bg-blue-500/12" />
            <div className="pointer-events-none absolute -right-4 bottom-8 h-28 w-28 rounded-full bg-sky-200/30 blur-3xl dark:bg-sky-400/10" />

            <div
              ref={photoRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative overflow-hidden rounded-2xl border border-slate-200/60 dark:border-white/10"
              style={{
                perspective: 1200,
              }}
            >
              <div
                className="relative aspect-[4/5] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{
                  transform: isHovering && !shouldReduceMotion
                    ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
                    : "rotateX(0deg) rotateY(0deg)",
                }}
              >
                <Image
                  src={personalImg}
                  alt="John Carl Santos"
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 420px, 1px"
                  className="object-cover object-center"
                />
              </div>
            </div>

            {!shouldReduceMotion && (
              <motion.div
                variants={getContainerVariants(0.2, 0.8)}
                initial="hidden"
                animate="visible"
                className="hidden xl:block"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 1.2,
                    duration: 0.6,
                    type: "spring",
                    bounce: 0.35,
                  }}
                >
                  <FloatingCircle
                    style={{ left: "-2.5rem", top: "2.5rem" }}
                    orbitSize="13rem"
                    toastMessage={<span>React</span>}
                  >
                    <FaReact className="text-blue-400" size="2rem" />
                  </FloatingCircle>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 1.45,
                    duration: 0.6,
                    type: "spring",
                    bounce: 0.35,
                  }}
                >
                  <FloatingCircle
                    style={{ right: "-1.25rem", bottom: "4rem" }}
                    orbitSize="11rem"
                    nucleusClass="bg-yellow-500/20"
                    toastMessage={<span>Python</span>}
                  >
                    <div
                      className="h-12 w-12"
                      style={{
                        backgroundImage: "url('/img/python-logo.svg')",
                        backgroundPosition: "center",
                        backgroundSize: "contain",
                      }}
                    />
                  </FloatingCircle>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
