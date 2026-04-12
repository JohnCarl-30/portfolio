'use client'
import Image from 'next/image'
import { aboutText } from '@/app/data/HeroIcons'

const stats = [
    { label: 'Years Learning', value: '3+' },
    { label: 'Projects Built', value: '10+' },
    { label: 'Technologies', value: '15+' },
]

const highlights = [
    'Full-Stack Development',
    'POS Systems',
    'Database Design',
    'Modern Web Apps',
]

const About = () => {
    return (
        <section id="about" className="py-24 sm:py-32">
            <div className="w-full max-w-6xl mx-auto px-6 lg:px-8">

                {/* Section Label */}
                <div className="flex items-center gap-4 mb-16">
                    <span className="text-sm font-medium tracking-widest uppercase text-blue-600">
                        About
                    </span>
                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* Left Column - Image + Stats */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        {/* Profile Image */}
                        <div className="relative group">
                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                                <Image
                                    src="/img/pic.jpg"
                                    alt="Profile picture of John Carl Santos"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
                            </div>
                            {/* Decorative border accent */}
                            <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border-2 border-blue-500/20 -z-10" />
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-3 gap-4">
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="text-center p-4 rounded-xl bg-gray-50 border border-gray-100"
                                >
                                    <span className="block text-2xl sm:text-3xl font-bold text-gray-900">
                                        {stat.value}
                                    </span>
                                    <span className="block text-xs text-gray-500 mt-1 leading-tight">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Text Content */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight text-balance">
                            Building software that makes everyday tasks simpler.
                        </h2>

                        <div className="mt-8 space-y-5">
                            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                                {aboutText}
                            </p>
                        </div>

                        {/* Highlight Tags */}
                        <div className="mt-8 flex flex-wrap gap-3">
                            {highlights.map((item) => (
                                <span
                                    key={item}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    {item}
                                </span>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gray-200 my-10" />

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <a
                                href="/about"
                                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gray-900 text-white font-medium text-sm hover:bg-gray-800 transition-colors duration-200"
                            >
                                More About Me
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </a>
                            <span className="text-sm text-gray-400">
                                Get to know my journey and interests
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default About
