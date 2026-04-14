"use client";
import Image from "next/image";
import { useMotionValue, useTransform, motion, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import ParticlesBackground from "./particles-background";
import Link from "next/link";
import { HiOutlineDocumentDownload as ResumeIcon } from "react-icons/hi";
import FloatingCircle, { getContainerVariants } from "./floating_cirlce";
import { FaReact } from "react-icons/fa";

// Typewriter hook
function useTypewriter(text: string, speed = 40, delay = 0) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    setDone(false);
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayed, done };
}

const Hero = () => {
  const [windowOffset, setWindowOffset] = useState({
    innerWidth: 0,
    innerHeight: 0,
  });
  const [mouseMove, setMouseMove] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    setWindowOffset({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    });
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    x.set(event.clientX);
    y.set(event.clientY);
  };

  const ySpring = useSpring(y, { stiffness: 100, damping: 10 });
  const xSpring = useSpring(x, { stiffness: 100, damping: 10 });
  const rotateY = useTransform(
    xSpring,
    [0, windowOffset.innerWidth],
    [-10, 10],
  );
  const rotateX = useTransform(
    ySpring,
    [0, windowOffset.innerHeight],
    [10, -10],
  );

  const { displayed: nameText, done: nameDone } = useTypewriter(
    "John Carl Santos",
    60,
    300,
  );
  const { displayed: taglineText } = useTypewriter(
    "I'm trying to turn coding into a hobby.",
    40,
    nameDone ? 0 : 99999,
  );

  return (
    <section
      className="relative min-h-screen w-full flex items-center overflow-x-hidden pt-40 pb-16"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setMouseMove(true)}
      onMouseLeave={() => setMouseMove(false)}
    >
      <ParticlesBackground />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
        <div className="px-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tighter leading-tight text-gray-900 dark:text-white md:text-6xl lg:text-7xl">
            My name is{" "}
            <span className="text-blue-500">
              {nameText}
              {!nameDone && <span className="animate-pulse">|</span>}
            </span>
          </h1>
          <p className="mb-10 min-h-[2rem] text-xl text-gray-500 dark:text-gray-400 md:text-2xl">
            {taglineText}
            {nameDone &&
              taglineText.length <
                "I'm trying to turn coding into a hobby.".length && (
                <span className="animate-pulse">|</span>
              )}
          </p>
        </div>

        {/* Main Vertical Stack */}
        <div className="flex flex-col items-start gap-12 md:pl-6">
          {/* MEDIA SECTION */}
          <motion.div
            className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full"
            style={{
              rotateX: mouseMove ? rotateX : 0,
              rotateY: mouseMove ? rotateY : 0,
              perspective: 1000,
            }}
          >
            <div className="w-full sm:w-full md:w-[370px] md:flex-shrink-0 shadow-2xl rounded-2xl overflow-hidden">
              <Image
                src="/personal.jpg"
                alt="John Carl Santos"
                width={400}
                height={400}
                priority
                className="h-auto w-full object-cover"
                id="hero"
              />
            </div>
          </motion.div>

          {/* FLOATING CIRCLES */}
          <motion.div
            variants={getContainerVariants(0.2, 1)}
            initial="hidden"
            animate="visible"
            className="hidden md:block"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1.8,
                duration: 0.6,
                type: "spring",
                bounce: 0.4,
              }}
            >
              <FloatingCircle
                style={{ right: "50rem", top: "5rem" }}
                orbitSize="45rem"
                orbitClass="border-gray-300"
                toastMessage={
                  <span>
                    Yes, I&apos;m good at{" "}
                    <b className="text-[#60a5fa]">React</b>!
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
                delay: 2.2,
                duration: 0.6,
                type: "spring",
                bounce: 0.4,
              }}
            >
              <FloatingCircle
                style={{ right: "30rem", bottom: "10rem" }}
                orbitSize="25rem"
                orbitClass="border-gray-300"
                nucleusClass="bg-[#ffe58e]"
                toastMessage={
                  <span>
                    I also do <b>ML</b> with{" "}
                    <b className="text-[#ffca1d]">Python</b>!
                  </span>
                }
              >
                <div
                  className="h-12 w-12"
                  style={{
                    backgroundImage: `url('/img/python-logo.svg')`,
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                  }}
                />
              </FloatingCircle>
            </motion.div>
          </motion.div>

          <div className="w-full">
            {/* BUTTONS */}
            <div className="flex flex-wrap gap-6">
              <Link
                href="/JohnCarl_Resume.pdf"
                target="_blank"
                className="group relative"
              >
                <span className="relative z-10 block px-8 py-3 bg-blue-500 text-white transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 font-medium">
                  <ResumeIcon className="inline mr-2" size="1.2rem" /> Resume
                </span>
                <span className="absolute inset-0 bg-blue-800"></span>
              </Link>

              <Link href="/contact" className="group relative">
                <span className="relative z-10 block border border-blue-500 bg-white px-8 py-3 font-medium text-blue-500 transition-all group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:bg-blue-500 group-hover:text-white dark:bg-slate-950 dark:text-blue-300">
                  Get in Touch
                </span>
                <span className="absolute inset-0 bg-blue-500/10"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
