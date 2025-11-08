'use client'

import { useEffect, useRef, useState } from 'react'
import SectionParticles from './SectionParticles'

export default function HowWeWork() {
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

  const steps = [
    {
      title: "Tender Filing",
      description: "We participate in tenders and ensure compliance with all technical and administrative requirements.",
      icon: "📋",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Material & Accessory Management",
      description: "We handle complete material procurement, cleaning, and supply management.",
      icon: "📦",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "On-Site Setup & Support",
      description: "Our team arranges required machinery, tools, and manpower to execute the project efficiently.",
      icon: "🛠️",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Maintenance & Monitoring",
      description: "We ensure ongoing support and periodic maintenance for sustained performance.",
      icon: "🔍",
      color: "from-orange-500 to-red-500"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      <SectionParticles particleCount={160} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-100/50 dark:bg-primary-900/30 rounded-full px-4 py-2 mb-4 animate-fade-in">
            Our Process
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
            How We Work
          </h2>
          <div className="w-40 h-2 bg-gradient-to-r from-transparent via-primary-600 dark:via-primary-400 to-transparent mx-auto mb-8 relative">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-600 dark:bg-primary-400 animate-pulse-slow"></span>
          </div>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We follow a transparent and process-driven approach to ensure timely and effective results.
          </p>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 ${isVisible ? 'animate-fade-in' : ''}`}>
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="group relative backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 p-6 rounded-xl shadow-2xl dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900 transition-all duration-300 text-center transform hover:-translate-y-2 border border-white/20 dark:border-gray-700/30 backdrop-saturate-150"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                {step.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
