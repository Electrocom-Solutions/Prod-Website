'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import SectionParticles from '@/components/SectionParticles'
import ContactUs from '@/components/ContactUs'

const developmentTech = [
  { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', description: 'React framework for production', gradient: 'from-gray-800 to-gray-900' },
  { name: 'React.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', description: 'JavaScript library for UI', gradient: 'from-blue-500 to-cyan-500' },
  { name: 'Flask', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', description: 'Lightweight Python web framework', gradient: 'from-red-500 to-orange-500' },
  { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', description: 'Cross-platform mobile framework', gradient: 'from-blue-400 to-blue-600' },
  { name: 'Django', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', description: 'High-level Python web framework', gradient: 'from-green-600 to-green-800' },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', description: 'JavaScript runtime environment', gradient: 'from-green-500 to-emerald-600' },
]

const databaseTech = [
  { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', description: 'Relational database management', gradient: 'from-blue-600 to-blue-800' },
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', description: 'Advanced open-source database', gradient: 'from-blue-500 to-blue-700' },
  { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', description: 'NoSQL document database', gradient: 'from-green-500 to-green-700' },
  { name: 'Oracle SQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg', description: 'Enterprise database solution', gradient: 'from-red-600 to-red-800' },
  { name: 'SQLite', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg', description: 'Lightweight embedded database', gradient: 'from-gray-600 to-gray-800' },
]

type TechItem = { name: string; logo: string; description: string; gradient: string }

function TechGrid({ items, columns = 6 }: { items: TechItem[]; columns?: 4 | 5 | 6 }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.1 })
    observer.observe(el)
    return () => observer.unobserve(el)
  }, [])
  const gridCols = columns === 5 ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
  return (
    <div ref={ref} className={`grid ${gridCols} gap-6 ${isVisible ? 'animate-fade-in' : ''}`}>
      {items.map((tech, index) => (
        <div
          key={tech.name}
          className="group relative backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 p-6 rounded-xl shadow-2xl dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900 transition-all duration-300 border border-white/20 dark:border-gray-700/30 backdrop-saturate-150 transform hover:-translate-y-2 text-center overflow-hidden"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
          <div className="relative">
            <div className="mb-3 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 flex items-center justify-center">
              <img src={tech.logo} alt={tech.name} className="w-16 h-16 object-contain dark:invert-0" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
            </div>
            <h4 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{tech.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{tech.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function TechnologiesPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <SectionParticles particleCount={200} />

      {/* Hero — very attractive header */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0f172a] via-slate-900/98 to-[#0f172a]" />
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 right-20 w-[28rem] h-[28rem] bg-primary-400/15 dark:bg-primary-500/15 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 left-20 w-[28rem] h-[28rem] bg-cyan-400/15 dark:bg-cyan-500/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-block text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-100/50 dark:bg-primary-900/30 rounded-full px-4 py-2 mb-6">
            Electrocom — Our Stack
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
            Technologies
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            From development frameworks to databases — we use modern, proven technologies to build scalable, secure solutions.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#development-technologies"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-500 dark:to-primary-300 text-white font-semibold hover:from-primary-700 hover:to-primary-500 dark:hover:from-primary-600 dark:hover:to-primary-400 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              View Our Stack
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 font-semibold hover:bg-primary-600 dark:hover:bg-primary-400 hover:text-white transition-all"
            >
              Get in Touch
            </Link>
          </div>

          <div className="mt-16 flex justify-center">
            <a href="#development-technologies" className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors" aria-label="Scroll to technologies">
              <span className="text-xs font-medium uppercase tracking-wider">Explore</span>
              <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Development Technologies — Cutting-Edge Tech Stack */}
      <section id="development-technologies" className="relative z-10 py-14 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-100/50 dark:bg-primary-900/30 rounded-full px-4 py-2 mb-4">
              Our Tech Stack
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
              Cutting-Edge Tech Stack
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-primary-600 dark:via-primary-400 to-transparent mx-auto mb-4 relative">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary-600 dark:bg-primary-400 animate-pulse-slow" />
            </div>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              From frontend to backend, we use modern, efficient technologies that power your digital success.
            </p>
          </div>
          <TechGrid items={developmentTech} columns={6} />
        </div>
      </section>

      {/* Database Technologies */}
      <section id="database-technologies" className="relative z-10 py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-white/30 dark:bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-100/50 dark:bg-primary-900/30 rounded-full px-4 py-2 mb-4">
              Data & Storage
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
              Database Technologies
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-primary-600 dark:via-primary-400 to-transparent mx-auto mb-4 relative">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary-600 dark:bg-primary-400 animate-pulse-slow" />
            </div>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Relational and NoSQL databases for reliable, scalable data storage and management.
            </p>
          </div>
          <TechGrid items={databaseTech} columns={5} />
        </div>
      </section>

      {/* Ready to Start Your Project? — contact */}
      <ContactUs badge="Let's Talk" title="Ready to Start Your Project?" subtitle="Have a project or tender requirement? We're ready to help. Share your ideas and we'll get back to you soon." />
    </div>
  )
}
