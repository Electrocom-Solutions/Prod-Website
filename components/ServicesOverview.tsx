'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import SectionParticles from './SectionParticles'
import Icon, { type IconName } from './Icon'

type ServiceItem = {
  title: string
  description: string
  icon: IconName
  href: string
  gradient: string
}

const services: ServiceItem[] = [
  {
    title: 'AI & Machine Learning',
    description: 'Build intelligent systems that learn from data and automate decision-making. We develop custom AI solutions including predictive analytics, natural language processing, computer vision, and intelligent automation tailored to your business needs.',
    icon: 'cpu-chip',
    href: '/services/software-solutions/custom-ai-solutions',
    gradient: 'from-primary-500/30 via-indigo-500/25 to-primary-400/25',
  },
  {
    title: 'Custom Software Development',
    description: 'Tailored software solutions designed around your unique business workflows. From architecture to deployment, we build scalable, secure, and maintainable applications with clean code and modern technologies.',
    icon: 'cpu-chip',
    href: '/services/software-solutions/custom-software-development',
    gradient: 'from-primary-500/25 via-blue-500/20 to-cyan-500/25',
  },
  {
    title: 'Web Development',
    description: 'Modern, high-performance web applications built for scale and usability. From business websites to complex platforms, we create responsive, secure, and SEO-friendly web solutions.',
    icon: 'globe-alt',
    href: '/services/software-solutions/web-development',
    gradient: 'from-indigo-500/25 via-primary-500/20 to-fuchsia-500/25',
  },
  {
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android. We focus on intuitive UI/UX, performance optimization, and seamless user experiences across devices.',
    icon: 'device-phone-mobile',
    href: '/services/software-solutions/mobile-app-development',
    gradient: 'from-primary-400/25 via-orange-500/15 to-red-500/20',
  },
  {
    title: 'Cloud Solutions',
    description: 'Cloud architecture, migration, and DevOps services to help you scale with confidence. We design and manage infrastructure on AWS, Azure, and Google Cloud for reliability and performance.',
    icon: 'cloud',
    href: '/services/software-solutions/cloud-architecture',
    gradient: 'from-blue-500/20 via-indigo-500/20 to-primary-500/20',
  },
  {
    title: 'IT Consulting',
    description: 'Strategic technology consulting to help you make informed decisions. We assess your current systems, recommend improvements, and guide your digital transformation journey end-to-end.',
    icon: 'magnifying-glass',
    href: '/services',
    gradient: 'from-emerald-500/15 via-primary-500/20 to-indigo-500/20',
  },
]

type ServicesOverviewProps = {
  badge?: string
  title?: string
  subtitle?: string
}

export default function ServicesOverview({ badge = 'Services', title = 'End-to-End Technology Solutions', subtitle = 'From concept and planning to deployment and ongoing support, we deliver complete solutions that help teams move faster and operate with confidence.' }: ServicesOverviewProps = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.12 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-12 lg:py-16 relative overflow-hidden min-h-0">
      <SectionParticles particleCount={160} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header — clearly above the card grid with comfortable spacing */}
        <div className="text-center mb-10 lg:mb-14">
          <span className="inline-block text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-100/50 dark:bg-primary-900/30 rounded-full px-4 py-2 mb-4">
            {badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
            {title}
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 2-row × 3-column grid — comfortable gaps, consistent card height */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch ${isVisible ? 'animate-fade-in' : ''}`}>
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative rounded-xl border border-white/20 dark:border-gray-700/30 backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 p-5 lg:p-6 shadow-2xl dark:shadow-gray-900/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_-25px_rgba(59,130,246,0.45)] overflow-hidden flex flex-col min-h-0"
            >
              {/* subtle gradient glow */}
              <div className={`absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br ${service.gradient} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* icon + title + description — flex-1 for consistent height, Learn More at bottom */}
              <div className="relative flex-1 min-h-0 flex flex-col">
                <div className="inline-flex items-center justify-center rounded-xl border border-white/20 dark:border-gray-700/30 bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/0 p-2 shadow-lg w-fit">
                  <div className="text-primary-700 dark:text-primary-300 transform transition-transform duration-300 group-hover:scale-110">
                    <Icon name={service.icon} className="w-6 h-6" aria-hidden="true" />
                  </div>
                </div>

                <h3 className="mt-4 text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-snug line-clamp-4">
                  {service.description}
                </p>
              </div>

              {/* CTA link — aligned at bottom of card */}
              <div className="relative mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/40 flex-shrink-0">
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-200 transition-colors cursor-pointer"
                >
                  <span className="relative">
                    Learn More
                    <span className="absolute left-0 -bottom-1 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
                  </span>
                  <svg
                    className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

