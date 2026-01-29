'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import RotatingText from './RotatingText'
import SectionParticles from './SectionParticles'
import QuoteModal from './QuoteModal'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const rotatingTexts = [
    'Software Development',
    'Web & Mobile Apps',
    'Cloud Solutions',
    'IT Consulting'
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center py-8 md:py-12 overflow-hidden">
      <SectionParticles particleCount={200} />
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50/50 dark:to-gray-900/50 z-0"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary-400/10 dark:bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/5 dark:bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className={`text-center max-w-5xl mx-auto ${mounted ? 'animate-fade-in' : ''}`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-slide-up">
            <span className="block mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
              Your Trusted Partner for
            </span>
            <span className="inline-block mx-2">
              <RotatingText
                texts={rotatingTexts}
                mainClassName="px-4 sm:px-5 md:px-7 backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white overflow-hidden py-2 sm:py-2.5 md:py-3 justify-center rounded-xl font-bold shadow-2xl border-2 border-white/30 dark:border-gray-700/30 backdrop-saturate-150"
                staggerFrom="last"
                initial={{ y: "100%", opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: "-120%", opacity: 0, scale: 0.8 }}
                staggerDuration={0.03}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1.5"
                transition={{ type: "spring", damping: 25, stiffness: 400 }}
                rotationInterval={2500}
              />
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed animate-slide-up max-w-3xl mx-auto" style={{ animationDelay: '0.2s' }}>
            From custom software development and web applications to cloud solutions and IT consulting — Electrocom delivers reliable, scalable technology solutions for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link
              href="#expertise"
              className="group relative backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 text-primary-700 dark:text-primary-400 px-6 py-3 rounded-xl font-semibold hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 overflow-hidden border-2 border-primary-200/50 dark:border-primary-700/50"
            >
              <span className="relative z-10 text-base md:text-lg">Explore Our Services</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative backdrop-blur-xl bg-transparent border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2"
            >
              <span className="relative z-10 text-base md:text-lg">Get a Quote</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      <QuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
