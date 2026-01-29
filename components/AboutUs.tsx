'use client'

import { useEffect, useRef, useState } from 'react'
import SectionParticles from './SectionParticles'
import Icon from './Icon'

export default function AboutUs() {
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

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-10 relative overflow-hidden"
    >
      <SectionParticles particleCount={150} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <span className="inline-block text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-100/50 dark:bg-primary-900/30 rounded-full px-4 py-2 mb-4 animate-fade-in">
            About Electrocom
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
            About Us
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-primary-600 dark:via-primary-400 to-transparent mx-auto mb-4 relative">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary-600 dark:bg-primary-400 animate-pulse-slow"></span>
          </div>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Empowering organizations with cutting-edge software and IT solutions
          </p>
        </div>

        <div className={`flex flex-col gap-8 ${isVisible ? 'animate-fade-in' : ''}`}>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 p-6 rounded-xl shadow-2xl dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900 transition-all duration-300 transform hover:-translate-y-2 border border-white/20 dark:border-gray-700/30 backdrop-saturate-150">
              <div className="mb-3 text-primary-700 dark:text-primary-300">
                <Icon name="magnifying-glass" className="w-8 h-8" aria-hidden="true" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">Our Vision</h3>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                To simplify technology for organizations by offering integrated, affordable, and scalable software solutions.
              </p>
            </div>

            <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 p-6 rounded-xl shadow-2xl dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900 transition-all duration-300 transform hover:-translate-y-2 border border-white/20 dark:border-gray-700/30 backdrop-saturate-150" style={{ animationDelay: '0.2s' }}>
              <div className="mb-3 text-primary-700 dark:text-primary-300">
                <Icon name="chart-bar" className="w-8 h-8" aria-hidden="true" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">Our Mission</h3>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                Empowering businesses and institutions with modern software, reliable systems, and expert technology guidance.
              </p>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 p-6 rounded-xl shadow-2xl dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900 transition-all duration-300 transform hover:-translate-y-2 border border-white/20 dark:border-gray-700/30 backdrop-saturate-150" style={{ animationDelay: '0.4s' }}>
            <div className="mb-3 text-primary-700 dark:text-primary-300">
              <Icon name="building-office-2" className="w-8 h-8" aria-hidden="true" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">Who We Are</h3>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
              Electrocom is an IT company specializing in customized software development, web and mobile applications, cloud solutions, and technology consulting.
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              We have 20+ years of industry experience. Delivering end-to-end solutions across industries, we've built a reputation for reliability, transparency, and performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
