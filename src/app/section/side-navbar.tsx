'use client'
import { useState, useEffect } from 'react'

const sections = [
    { id: 'hero', label: 'home' },
    { id: 'about', label: 'about me' },
    { id: 'skills', label: 'skills' },
    { id: 'featured-projects', label: 'projects' },
    { id: 'contact', label: 'contact' },
]

const SideNavbar = () => {
    const [active, setActive] = useState('hero')

    useEffect(() => {
        const observers: IntersectionObserver[] = []

        sections.forEach(({ id }) => {
            const el = document.getElementById(id)
            if (!el) return

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActive(id)
                },
                { threshold: 0.4 }
            )

            observer.observe(el)
            observers.push(observer)
        })

        return () => observers.forEach(o => o.disconnect())
    }, [])

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-start gap-0">
            {/* vertical line */}
            <div className="absolute left-[5px] top-0 bottom-0 w-px bg-gray-200" />

            {sections.map(({ id, label }) => (
                <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="flex items-center gap-3 py-3 group cursor-pointer"
                >
                    {/* dot */}
                    <div className={`relative z-10 w-[11px] h-[11px] rounded-full border-2 transition-all duration-300 flex-shrink-0
                        ${active === id
                            ? 'border-blue-500 bg-blue-500 scale-110'
                            : 'border-gray-300 bg-white group-hover:border-blue-400'
                        }`}
                    />

                    {/* label */}
                    <span className={`text-xs tracking-wide transition-all duration-300 whitespace-nowrap
                        ${active === id
                            ? 'text-blue-500 font-medium opacity-100'
                            : 'text-gray-400 opacity-0 group-hover:opacity-100'
                        }`}
                    >
                        {label}
                    </span>
                </button>
            ))}
        </div>
    )
}

export default SideNavbar