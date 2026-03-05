'use client';
import Image from "next/image";
import { useMotionValue, useTransform, motion, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import ParticlesBackground from "./particles-background";
import Link from "next/link";
import { HiOutlineDocumentDownload as ResumeIcon } from 'react-icons/hi';
import FloatingCircle, { getContainerVariants } from "./floating_cirlce";
import { FaReact } from "react-icons/fa";


const Hero = () => {
    const [windowOffset, setWindowOffset] = useState({ innerWidth: 0, innerHeight: 0 });
    const [mouseMove, setMouseMove] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setWindowOffset({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });
    }, []);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        x.set(event.clientX);
        y.set(event.clientY);
    };

    const ySpring = useSpring(y, { stiffness: 100, damping: 10 });
    const xSpring = useSpring(x, { stiffness: 100, damping: 10 });
    const rotateY = useTransform(xSpring, [0, windowOffset.innerWidth], [-10, 10]);
    const rotateX = useTransform(ySpring, [0, windowOffset.innerHeight], [10, -10]);

    return (

        <section
            className="relative min-h-screen w-full flex items-center overflow-x-hidden pt-40 pb-16"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setMouseMove(true)}
            onMouseLeave={() => setMouseMove(false)}
        >
            <ParticlesBackground />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">

                {/* Main Vertical Stack */}
                <div className="flex flex-col items-start gap-12 md:pl-6">

                    {/* MEDIA SECTION */}
                    <motion.div
                        className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full"
                        style={{
                            rotateX: mouseMove ? rotateX : 0,
                            rotateY: mouseMove ? rotateY : 0,
                            perspective: 1000
                        }}
                    >
                        {/* Profile Photo — full width on sm, fixed on md+ */}
                        <div className="w-full sm:w-full md:w-[370px] md:flex-shrink-0 shadow-2xl rounded-2xl overflow-hidden">
                            <Image
                                src='/personal.jpg'
                                alt="John Carl Santos"
                                width={400}
                                height={400}
                                priority
                                className="h-auto w-full object-cover"
                                id="hero"
                            />
                        </div>

                        {/* DEVS100 Card — full width on sm, fixed on md+ */}
                        <div className="w-full sm:w-full md:w-[300px] md:flex-shrink-0 h-[470px] shadow-2xl rounded-2xl overflow-hidden bg-white">
                            <iframe
                                src="https://www.devs100.com/access-card/embed?name=John%20Carl%20Santos"
                                className="w-full h-full border-0"
                                title="DEVS100 Access Card"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        variants={getContainerVariants(0.2, 1)}
                        initial="hidden"
                        animate="visible"
                        className="hidden md:block"
                    >
                        <FloatingCircle
                            style={{ right: '50rem', top: '5rem' }}
                            orbitSize="45rem"
                            orbitClass="border-gray-300"
                            toastMessage={
                                <span>
                                    Yes, I&apos;m good at <b className="text-[#60a5fa]">React</b>!
                                </span>
                            }
                        >
                            <FaReact className="text-blue-400" size="2rem" />
                        </FloatingCircle>
                        <FloatingCircle
                            style={{ right: '30rem', bottom: '10rem' }}
                            orbitSize="25rem"
                            orbitClass="border-gray-300"
                            nucleusClass="bg-[#ffe58e]"
                            toastMessage={
                                <span>
                                    I also do <b>ML</b> with{' '}
                                    <b className="text-[#ffca1d]">Python</b>!
                                </span>
                            }
                        >
                            <div
                                className="h-12 w-12"
                                style={{
                                    backgroundImage: `url('/img/python-logo.svg')`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'contain',
                                }}
                            />
                        </FloatingCircle>
                    </motion.div>

                    {/* Text + Buttons */}
                    <div className="w-full">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
                            My name is <span className="text-blue-500">John Carl Santos</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 mb-10">
                            I&apos;m trying to turn coding into a hobby.
                        </p>

                        {/* BUTTONS */}
                        <div className="flex flex-wrap gap-6">
                            <Link href='/JohnCarl_Resume.pdf' target='_blank' className="group relative">
                                <span className="relative z-10 block px-8 py-3 bg-blue-500 text-white transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 font-medium">
                                    <ResumeIcon className="inline mr-2" size="1.2rem" /> Resume
                                </span>
                                <span className="absolute inset-0 bg-blue-800"></span>
                            </Link>

                            <Link href='/contact' className="group relative">
                                <span className="relative z-10 block px-8 py-3 bg-white border border-blue-500 text-blue-500 transition-all group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:bg-blue-500 group-hover:text-white font-medium">
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