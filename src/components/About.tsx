'use client'
import Heading from './sub/Heading'
import Image from 'next/image'
import { aboutText } from '@/app/data/HeroIcons'

const About = () => {
    return (
        <section id='about' className="min-h-screen flex flex-col justify-center py-12 sm:py-16 md:py-20">

            {/* Header Section */}
            <div className="w-full max-w-6xl mx-auto px-6 lg:px-8 mb-8 sm:mb-12 md:mb-16">
                <div className="md:pl-6">
                    <Heading text={"About Me"} />
                </div>
            </div>

            {/* Content */}
            <div className="w-full max-w-6xl mx-auto px-6 lg:px-8">
                <div className="md:pl-6 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10 lg:gap-12">

                    {/* Left: Image — full width on mobile, fixed on md+ */}
                    <div className="w-full md:w-80 lg:w-[360px] md:flex-shrink-0 rounded-2xl shadow-xl overflow-hidden">
                        <Image
                            src={'/img/pic.jpg'}
                            alt='Profile picture'
                            width={400}
                            height={400}
                            className="object-cover w-full h-auto"
                        />
                    </div>

                    {/* Right: Text and Button Column */}
                    <div className="flex flex-col gap-6 sm:gap-8 w-full">

                        <div className="rounded-2xl bg-zinc-50 p-4 sm:p-6 md:p-8 shadow-sm">
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg lg:text-[17px]">
                                {aboutText}
                            </p>
                        </div>

                        <a
                            href="/about"
                            className="relative z-10 inline-flex items-center justify-center sm:justify-start gap-2 w-full sm:w-max rounded-lg border-2 border-blue-400 px-4 sm:px-6 py-2.5 sm:py-3 font-medium text-sm sm:text-base text-blue-600 hover:bg-blue-500 hover:text-white transition-all duration-300"
                        >
                            More About Me
                            <span className="text-lg sm:text-xl">→</span>
                        </a>
                    </div>

                </div>
            </div>

        </section>
    )
}

export default About