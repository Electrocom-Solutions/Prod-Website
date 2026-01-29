'use client'

import { useEffect, useRef, useState } from 'react'
import SectionParticles from './SectionParticles'
import Icon, { type IconName } from './Icon'

interface StatItem {
  label: string
  value: number
  suffix?: string
  displayValue?: string
  icon: IconName
  gradient: string
}

// Exactly 4 tiles, fixed order and content
const STATS: StatItem[] = [
  { label: 'Projects Delivered', value: 50, suffix: '+', icon: 'rocket', gradient: 'from-blue-500 to-blue-600' },
  { label: 'Customer Satisfaction', value: 100, suffix: '%', icon: 'star', gradient: 'from-blue-600 to-blue-700' },
  { label: '24/7 Support', value: 24, displayValue: '24/7', icon: 'bolt', gradient: 'from-orange-500 to-red-500' },
  { label: 'Products Built', value: 8, icon: 'cube', gradient: 'from-green-500 to-emerald-500' },
]

export default function Statistics() {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState<Record<number, number>>({ 0: 0, 1: 0, 2: 24, 3: 0 })
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true)
          hasAnimated.current = true
        }
      },
      { threshold: 0.3 }
    )
    const el = sectionRef.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [])

  // Animate numeric stats when visible (skip index 2 which is 24/7)
  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps
    const timers: NodeJS.Timeout[] = []

    STATS.forEach((stat, index) => {
      if (stat.displayValue != null) return
      let currentStep = 0
      const increment = stat.value / steps

      const timer = setInterval(() => {
        currentStep++
        const currentValue = Math.min(Math.floor(increment * currentStep), stat.value)
        setCounts(prev => ({ ...prev, [index]: currentValue }))
        if (currentStep >= steps) {
          clearInterval(timer)
          setCounts(prev => ({ ...prev, [index]: stat.value }))
        }
      }, stepDuration)
      timers.push(timer)
    })

    return () => timers.forEach(t => clearInterval(t))
  }, [isVisible])

  const displayStats: (StatItem & { displayNumber: number | string })[] = STATS.map((stat, index) => ({
    ...stat,
    displayNumber: stat.displayValue != null ? stat.displayValue : (counts[index] ?? 0),
  }))

  return (
    <section
      ref={sectionRef}
      id="statistics"
      className="py-10 relative overflow-hidden"
    >
      <SectionParticles particleCount={150} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex justify-center">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full max-w-6xl items-stretch ${isVisible ? 'animate-fade-in' : ''}`}>
          {displayStats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative backdrop-blur-xl bg-white/90 dark:bg-gray-800/80 p-6 rounded-2xl shadow-2xl dark:shadow-gray-900/50 hover:shadow-3xl dark:hover:shadow-gray-900 transition-all duration-700 transform hover:-translate-y-2 border-2 border-white/30 dark:border-gray-700/40 backdrop-saturate-150 text-center overflow-hidden flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 rounded-full blur-3xl transition-opacity duration-700 transform group-hover:scale-125`} />
              <div className="relative z-10 flex flex-col flex-1">
                <div className="mb-3 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 flex items-center justify-center text-primary-700 dark:text-primary-300">
                  <Icon name={stat.icon} className="w-8 h-8" aria-hidden="true" />
                </div>
                <div className="mb-2">
                  <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {typeof stat.displayNumber === 'string' ? stat.displayNumber : `${stat.displayNumber}${stat.suffix ?? ''}`}
                  </div>
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mt-auto">
                  {stat.label}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

