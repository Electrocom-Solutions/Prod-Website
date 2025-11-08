'use client'

import { useEffect, useRef, useState } from 'react'
import SectionParticles from './SectionParticles'

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
      className="py-20 relative overflow-hidden"
    >
      <SectionParticles particleCount={150} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-100/50 dark:bg-primary-900/30 rounded-full px-4 py-2 mb-4 animate-fade-in">
            About Electrocom
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
            About Us
          </h2>
          <div className="w-40 h-2 bg-gradient-to-r from-transparent via-primary-600 dark:via-primary-400 to-transparent mx-auto mb-8 relative">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-600 dark:bg-primary-400 animate-pulse-slow"></span>
          </div>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Empowering organizations with cutting-edge technology solutions and reliable manpower services
          </p>
        </div>

        <div className={`flex flex-col gap-12 ${isVisible ? 'animate-fade-in' : ''}`}>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 p-8 rounded-xl shadow-2xl dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900 transition-all duration-300 transform hover:-translate-y-2 border border-white/20 dark:border-gray-700/30 backdrop-saturate-150">
              <div className="text-4xl mb-4">👁️</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h3>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                To simplify technology and workforce operations for organizations by offering integrated, affordable, and scalable solutions.
              </p>
            </div>

            <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 p-8 rounded-xl shadow-2xl dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900 transition-all duration-300 transform hover:-translate-y-2 border border-white/20 dark:border-gray-700/30 backdrop-saturate-150" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Empowering businesses, hospitals, and government departments with modern technology, reliable systems, and skilled manpower.
              </p>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 p-8 rounded-xl shadow-2xl dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900 transition-all duration-300 transform hover:-translate-y-2 border border-white/20 dark:border-gray-700/30 backdrop-saturate-150" style={{ animationDelay: '0.4s' }}>
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">Who We Are</h3>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Electrocom is a technology-driven company specializing in customized software development, hardware maintenance, network infrastructure, and manpower outsourcing.
            </p>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              We have 20+ years of industry experience. Delivering end-to-end solutions across industries, we've built a reputation for reliability, transparency, and performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
