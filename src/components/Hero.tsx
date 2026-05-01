"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { HiOutlineDocumentDownload as ResumeIcon } from "react-icons/hi";
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
      className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden pt-8 pb-16 sm:pt-10 lg:pt-12"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setMouseMove(true)}
      onMouseLeave={() => setMouseMove(false)}
    >
      <ParticlesBackground />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_30%),radial-gradient(circle_at_78%_18%,rgba(14,165,233,0.12),transparent_22%),linear-gradient(180deg,rgba(248,250,252,0.28),rgba(248,250,252,0.82)_58%,rgba(248,250,252,0.98))] dark:bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.18),transparent_30%),radial-gradient(circle_at_78%_18%,rgba(245,158,11,0.08),transparent_22%),linear-gradient(180deg,rgba(15,23,42,0.3),rgba(2,6,23,0.7)_58%,rgba(2,6,23,0.96))]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />

      <div className="page-shell relative z-10 grid items-center gap-14 lg:grid-cols-[0.96fr_1.04fr]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="md:pl-6"
        >
          <div className="max-w-xl space-y-8">
            <h1 className="text-[clamp(4rem,9vw,7rem)] font-semibold leading-[0.88] tracking-[-0.08em] text-slate-950 dark:text-white">
              John
              <span className="font-serif text-primary italic"> Carl </span>
              Santos
            </h1>

            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400 dark:text-slate-500">
              Aspiring AI Engineer
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/JohnCarl_Resume.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
              >
                <ResumeIcon size="1.15rem" />
                Resume
              </Link>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-6 py-3 text-sm font-medium text-slate-700 transition-all hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-primary/40 dark:hover:text-primary"
              >
                Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex items-center gap-3">
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
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-500 transition-all hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-primary/40 dark:hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[470px]">
            <div className="pointer-events-none absolute -left-8 top-10 hidden h-40 w-40 rounded-full bg-blue-300/30 blur-3xl dark:bg-blue-500/15 md:block" />
            <div className="pointer-events-none absolute -right-4 bottom-10 hidden h-36 w-36 rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-400/10 md:block" />

            <motion.div
              className="glass-panel relative overflow-hidden rounded-[2rem]"
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
                  toastMessage={
                    <span>
                      React
                    </span>
                  }
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
