'use client'

import { useEffect, useRef, useState } from 'react'
import SectionParticles from './SectionParticles'
import Icon, { type IconName } from './Icon'
import { portfolioAPI } from '@/lib/api'

interface StatItem {
  label: string
  value: number
  suffix?: string
  displayValue?: string
  icon: IconName
  gradient: string
}

// Default tiles; Projects and Products are overridden from API when keys match
const DEFAULT_STATS: StatItem[] = [
  { label: 'Projects Delivered', value: 50, suffix: '+', icon: 'rocket', gradient: 'from-blue-500 to-blue-600' },
  { label: 'Customer Satisfaction', value: 100, suffix: '%', icon: 'star', gradient: 'from-blue-600 to-blue-700' },
  { label: '24/7 Support', value: 24, displayValue: '24/7', icon: 'bolt', gradient: 'from-orange-500 to-red-500' },
  { label: 'Products Built', value: 8, icon: 'cube', gradient: 'from-green-500 to-emerald-500' },
]

function parseStatValue(value: string): { numeric: number | null; display: string } {
  const trimmed = (value || '').trim()
  const num = parseInt(trimmed, 10)
  if (!Number.isNaN(num)) return { numeric: num, display: trimmed }
  return { numeric: null, display: trimmed || '0' }
}

export default function Statistics() {
  const [stats, setStats] = useState<StatItem[]>(DEFAULT_STATS)
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState<Record<number, number>>({ 0: 0, 1: 0, 2: 24, 3: 0 })
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  // Fetch Projects and Products keys from statistic tiles
  useEffect(() => {
    portfolioAPI.getStatistics().then(({ success, statistics }) => {
      if (!success || !statistics?.length) return
      const projectsTile = statistics.find((s) => s.key === 'projects_home')
      const productsTile = statistics.find((s) => s.key === 'Products')
      setStats((prev) => {
        const next = [...prev]
        if (projectsTile) {
          const { numeric, display } = parseStatValue(projectsTile.value)
          next[0] = {
            ...prev[0],
            label: projectsTile.title || prev[0].label,
            value: numeric ?? prev[0].value,
            displayValue: numeric == null ? display : undefined,
            suffix: numeric != null && display.includes('+') ? '+' : prev[0].suffix,
          }
        }
        if (productsTile) {
          const { numeric, display } = parseStatValue(productsTile.value)
          next[3] = {
            ...prev[3],
            label: productsTile.title || prev[3].label,
            value: numeric ?? prev[3].value,
            displayValue: numeric == null ? display : undefined,
            suffix: prev[3].suffix,
          }
        }
        return next
      })
    })
  }, [])

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

  // Animate numeric stats when visible (skip tiles with displayValue, e.g. 24/7)
  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps
    const timers: NodeJS.Timeout[] = []

    stats.forEach((stat, index) => {
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
  }, [isVisible, stats])

  const displayStats: (StatItem & { displayNumber: number | string })[] = stats.map((stat, index) => ({
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

