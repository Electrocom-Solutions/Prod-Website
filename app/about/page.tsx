'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import SectionParticles from '@/components/SectionParticles'
import Icon from '@/components/Icon'
import type { IconName } from '@/components/Icon'
import AboutUs from '@/components/AboutUs'
import ServicesOverview from '@/components/ServicesOverview'
import ContactUs from '@/components/ContactUs'
import { portfolioAPI } from '@/lib/api'

const TRACK_RECORD_KEYS = ['trusted_clients', 'projects_home', 'projects_ongoing', 'products_home'] as const
const TRACK_RECORD_DEFAULTS: Record<(typeof TRACK_RECORD_KEYS)[number], { label: string; icon: IconName }> = {
  trusted_clients: { label: 'Trusted Clients', icon: 'users' },
  projects_home: { label: 'Projects Delivered', icon: 'rocket' },
  projects_ongoing: { label: 'Ongoing Projects', icon: 'chart-bar' },
  products_home: { label: 'Products', icon: 'cube' },
}

type TrackRecordStat = { label: string; value: string; icon: IconName }

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [stats, setStats] = useState<TrackRecordStat[]>(() =>
    TRACK_RECORD_KEYS.map((key) => ({
      label: TRACK_RECORD_DEFAULTS[key].label,
      value: '—',
      icon: TRACK_RECORD_DEFAULTS[key].icon,
    }))
  )
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    portfolioAPI.getStatistics().then(({ success, statistics }) => {
      if (!success || !statistics?.length) return
      setStats((prev) =>
        TRACK_RECORD_KEYS.map((key, index) => {
          const tile = statistics.find((s) => s.key === key)
          const def = TRACK_RECORD_DEFAULTS[key]
          return {
            label: tile?.title ?? def.label,
            value: (tile?.value ?? '').trim() || '—',
            icon: def.icon,
          }
        })
      )
    })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => { if (statsRef.current) observer.unobserve(statsRef.current) }
  }, [])

  return (
    <div className="min-h-screen bg-transparent">
      <SectionParticles particleCount={200} />

      {/* Hero — attractive, full-width */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0f172a] via-slate-900/98 to-[#0f172a]" />
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 right-20 w-[28rem] h-[28rem] bg-primary-400/15 dark:bg-primary-500/15 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 left-20 w-[28rem] h-[28rem] bg-blue-400/15 dark:bg-blue-500/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-block text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-100/50 dark:bg-primary-900/30 rounded-full px-4 py-2 mb-6">
            Electrocom — Your IT Partner
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
            About Us
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Empowering organizations with cutting-edge software and IT solutions. We build, scale, and support technology that drives growth.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-500 dark:to-primary-300 text-white font-semibold hover:from-primary-700 hover:to-primary-500 dark:hover:from-primary-600 dark:hover:to-primary-400 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Get in Touch
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 font-semibold hover:bg-primary-600 dark:hover:bg-primary-400 hover:text-white transition-all"
            >
              Our Services
            </Link>
          </div>

          <div className="mt-16 flex justify-center">
            <a
              href="#our-track-record"
              className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              aria-label="Scroll to stats"
            >
              <span className="text-xs font-medium uppercase tracking-wider">Discover more</span>
              <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Our Track Record */}
      <section id="our-track-record" className="relative z-10 py-14 md:py-20 px-4 sm:px-6 lg:px-8" ref={statsRef}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-100/50 dark:bg-primary-900/30 rounded-full px-4 py-2 mb-4">
              Impact
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
              Our Track Record
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Trusted by clients across industries. Here’s what we’ve achieved together.
            </p>
          </div>

          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 ${isVisible ? 'animate-fade-in' : ''}`}>
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 p-6 md:p-8 rounded-2xl shadow-2xl dark:shadow-gray-900/50 border border-white/20 dark:border-gray-700/30 text-center hover:shadow-[0_25px_60px_-25px_rgba(59,130,246,0.35)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center rounded-xl border border-white/20 dark:border-gray-700/30 bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/0 p-3 mb-4">
                  <Icon name={stat.icon} className="w-8 h-8 text-primary-700 dark:text-primary-300" aria-hidden="true" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-1">{stat.value}</div>
                <div className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us — same content as home */}
      <AboutUs />

      {/* Explore Our Core Services */}
      <ServicesOverview
        badge="Our Expertise"
        title="Explore Our Core Services"
        subtitle="From concept and planning to deployment and ongoing support, we deliver complete solutions that help teams move faster and operate with confidence."
      />

      {/* Ready to Start Your Project? — contact */}
      <ContactUs
        badge="Let's Talk"
        title="Ready to Start Your Project?"
        subtitle="Have a project or tender requirement? We're ready to help. Share your ideas and we'll get back to you soon."
      />
    </div>
  )
}
