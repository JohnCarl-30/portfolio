"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { FaReact } from "react-icons/fa";

import FloatingCircle, { getContainerVariants } from "./floating_cirlce";
import ParticlesBackground from "./particles-background";

const socialLinks = [
  {
    href: "https://github.com/santosjohncarl",
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

const Hero = () => {
  const [windowOffset, setWindowOffset] = useState({
    innerWidth: 0,
    innerHeight: 0,
  });
  const [mouseMove, setMouseMove] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const syncWindow = () => {
      setWindowOffset({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      });
    };

    syncWindow();
    window.addEventListener("resize", syncWindow);

    return () => {
      window.removeEventListener("resize", syncWindow);
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    x.set(event.clientX);
    y.set(event.clientY);
  };

  const ySpring = useSpring(y, { stiffness: 100, damping: 12 });
  const xSpring = useSpring(x, { stiffness: 100, damping: 12 });
  const rotateY = useTransform(
    xSpring,
    [0, windowOffset.innerWidth || 1],
    [-8, 8],
  );
  const rotateX = useTransform(
    ySpring,
    [0, windowOffset.innerHeight || 1],
    [8, -8],
  );

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[calc(100svh-6rem)] items-center overflow-hidden pt-8 pb-16"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setMouseMove(true)}
      onMouseLeave={() => setMouseMove(false)}
    >
      <ParticlesBackground />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_30%),radial-gradient(circle_at_78%_18%,rgba(14,165,233,0.12),transparent_22%),linear-gradient(180deg,rgba(248,250,252,0.28),rgba(248,250,252,0.82)_58%,rgba(248,250,252,0.98))] dark:bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.18),transparent_30%),radial-gradient(circle_at_78%_18%,rgba(245,158,11,0.08),transparent_22%),linear-gradient(180deg,rgba(15,23,42,0.3),rgba(2,6,23,0.7)_58%,rgba(2,6,23,0.96))]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />

      <div className="page-shell relative z-10 grid items-center gap-16 lg:grid-cols-[1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="max-w-xl space-y-10">
            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500"
              >
                Aspiring AI Engineer
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                className="text-[clamp(3.5rem,8vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-slate-950 dark:text-white"
              >
                John
                <br />
                <span className="font-serif text-primary italic">Carl</span>{" "}
                Santos
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                className="max-w-md text-base leading-relaxed text-slate-500 dark:text-slate-400"
              >
                Building intelligent systems and full-stack products. Focused on
                AI, backend architecture, and shipping real solutions.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
              >
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/about"
                className="text-sm font-medium text-slate-500 underline-offset-4 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
              >
                More about me
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
              className="flex items-center gap-4 pt-2"
            >
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
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all hover:border-slate-400 hover:text-slate-950 dark:border-white/10 dark:text-slate-500 dark:hover:border-white/30 dark:hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
          className="relative hidden justify-center lg:flex"
        >
          <div className="relative w-full max-w-[420px]">
            <div className="pointer-events-none absolute -left-6 top-8 h-32 w-32 rounded-full bg-blue-300/25 blur-3xl dark:bg-blue-500/12" />
            <div className="pointer-events-none absolute -right-4 bottom-8 h-28 w-28 rounded-full bg-sky-200/30 blur-3xl dark:bg-sky-400/10" />

            <motion.div
              className="relative overflow-hidden rounded-2xl border border-slate-200/60 dark:border-white/10"
              style={{
                rotateX: mouseMove ? rotateX : 0,
                rotateY: mouseMove ? rotateY : 0,
                transformPerspective: 1200,
              }}
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src="/personal.jpg"
                  alt="John Carl Santos"
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>
            </motion.div>

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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
