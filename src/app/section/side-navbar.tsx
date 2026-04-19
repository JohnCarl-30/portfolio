'use client'

import { useEffect, useState } from 'react'

const sections = [
  { id: 'hero', label: 'home' },
  { id: 'about', label: 'about' },
  { id: 'featured-projects', label: 'work' },
  { id: 'skills', label: 'stack' },
  { id: 'contact', label: 'contact' },
]

const SideNavbar = () => {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { threshold: 0.45 },
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 lg:flex">
      <div className="flex flex-col items-center gap-3">
        <span className="h-16 w-px bg-slate-200/90 dark:bg-white/10" />
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            aria-label={`Go to ${label}`}
            title={label}
            className="group flex h-5 w-5 items-center justify-center"
          >
            <span
              className={`rounded-full transition-all duration-300 ${
                active === id
                  ? 'h-3.5 w-3.5 bg-primary shadow-[0_0_0_6px_rgba(59,130,246,0.12)]'
                  : 'h-2.5 w-2.5 bg-slate-300 group-hover:bg-primary/60 dark:bg-white/20 dark:group-hover:bg-primary/70'
              }`}
            />
          </button>
        ))}
        <span className="h-16 w-px bg-slate-200/90 dark:bg-white/10" />
      </div>
    </div>
  )
}

export default SideNavbar
