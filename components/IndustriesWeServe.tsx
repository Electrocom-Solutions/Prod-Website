'use client'

import { useEffect, useRef, useState } from 'react'
import SectionParticles from './SectionParticles'
import Icon, { type IconName } from './Icon'

export default function IndustriesWeServe() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const industries: { name: string; icon: IconName }[] = [
    { name: "Government Departments", icon: "building-office-2" },
    { name: "Healthcare & Hospitals", icon: "heart" },
    { name: "Education", icon: "academic-cap" },
    { name: "Manufacturing", icon: "factory" },
    { name: "Construction & Infrastructure", icon: "building-office" },
    { name: "IT & Service-Based Companies", icon: "briefcase" }
  ]

  const colors = [
    "from-blue-500 to-blue-600",
    "from-green-500 to-emerald-500",
    "from-blue-600 to-blue-700",
    "from-orange-500 to-red-500",
    "from-blue-700 to-blue-800",
    "from-blue-500 to-blue-600"
  ]

  return (
    <section 
      ref={sectionRef}
      className="py-10 relative overflow-hidden"
    >
      <SectionParticles particleCount={140} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <span className="inline-block text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-100/50 dark:bg-primary-900/30 rounded-full px-4 py-2 mb-4 animate-fade-in">
            Industries
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
            Industries We Serve
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-primary-600 dark:via-primary-400 to-transparent mx-auto mb-4 relative">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary-600 dark:bg-primary-400 animate-pulse-slow"></span>
          </div>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${isVisible ? 'animate-fade-in' : ''}`}>
          {industries.map((industry, index) => (
            <div 
              key={index}
              className="group relative backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 p-6 rounded-xl shadow-2xl dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900 transition-all duration-300 border border-white/20 dark:border-gray-700/30 backdrop-saturate-150 text-center transform hover:-translate-y-2 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${colors[index]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className="relative">
                <div className="mb-3 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 flex items-center justify-center text-primary-700 dark:text-primary-300">
                  <Icon name={industry.icon} className="w-10 h-10" aria-hidden="true" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {industry.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
