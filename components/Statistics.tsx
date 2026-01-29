'use client'

import { useEffect, useRef, useState } from 'react'
import SectionParticles from './SectionParticles'
import { portfolioAPI } from '@/lib/api'
import Icon, { type IconName } from './Icon'

interface StatItem {
  label: string
  value: number
  suffix?: string
  icon: IconName
  gradient: string
}

// Default gradients for statistics (used as fallback)
const defaultGradients = [
  'from-blue-500 to-blue-600',
  'from-blue-600 to-blue-700',
  'from-orange-500 to-red-500',
  'from-green-500 to-emerald-500',
  'from-blue-700 to-blue-800',
]

// Default icons (SVG) as fallback
const defaultIcons: IconName[] = ['users', 'rocket', 'bolt', 'star', 'chart-bar']

export default function Statistics() {
  const [isVisible, setIsVisible] = useState(false)
  const [stats, setStats] = useState<StatItem[]>([])
  const [counts, setCounts] = useState<Record<number, number>>({})
  const [isLoading, setIsLoading] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  // Fetch statistics from API
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setIsLoading(true)
        console.log('Statistics: Fetching statistics from API...')
        const response = await portfolioAPI.getStatistics()
        console.log('Statistics: API response:', response)
        
        if (response && response.success && response.statistics && Array.isArray(response.statistics) && response.statistics.length > 0) {
          console.log('Statistics: Processing', response.statistics.length, 'statistics')
          // Map backend statistics to frontend StatItem format
          const mappedStats: StatItem[] = response.statistics.map((stat, index) => {
            // Extract numeric value from string
            // First, check if value contains '+'
            const hasSuffix = stat.value && typeof stat.value === 'string' && stat.value.includes('+')
            // Remove all non-numeric characters (including +) to get the number
            const numericValue = parseInt(stat.value.toString().replace(/[^0-9]/g, '')) || 0
            
            return {
              label: stat.title || 'Statistic',
              value: numericValue,
              suffix: hasSuffix ? '+' : undefined,
              icon: defaultIcons[index % defaultIcons.length], // Use default SVG icons
              gradient: defaultGradients[index % defaultGradients.length], // Cycle through gradients
            }
          })
          
          console.log('Statistics: Mapped stats:', mappedStats)
          setStats(mappedStats)
          
          // Initialize counts to 0 for animation
          const initialCounts: Record<number, number> = {}
          mappedStats.forEach((_, index) => {
            initialCounts[index] = 0
          })
          setCounts(initialCounts)
        } else {
          console.warn('Statistics: No statistics found in API response', response)
          // No statistics available - don't show the section
          setStats([])
          setCounts({})
        }
      } catch (error) {
        console.error('Statistics: Error fetching statistics:', error)
        // No statistics available on error - don't show the section
        setStats([])
        setCounts({})
      } finally {
        setIsLoading(false)
      }
    }

    fetchStatistics()
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Animate statistics when visible
  useEffect(() => {
    if (!isVisible || stats.length === 0) return

    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps
    const timers: NodeJS.Timeout[] = []

    stats.forEach((stat, index) => {
      let currentStep = 0
      const increment = stat.value / steps

      const timer = setInterval(() => {
        currentStep++
        const currentValue = Math.min(Math.floor(increment * currentStep), stat.value)

        setCounts(prev => ({
          ...prev,
          [index]: currentValue
        }))

        if (currentStep >= steps) {
          clearInterval(timer)
          // Ensure final value is exact
          setCounts(prev => ({
            ...prev,
            [index]: stat.value
          }))
        }
      }, stepDuration)

      timers.push(timer)
    })

    // Cleanup function
    return () => {
      timers.forEach(timer => clearInterval(timer))
    }
  }, [isVisible, stats])

  // Map stats with animated counts
  const displayStats: StatItem[] = stats.map((stat, index) => ({
    ...stat,
    value: counts[index] !== undefined ? counts[index] : 0
  }))

  // Don't render the section if there are no statistics
  // Show loading state only if we're still fetching
  if (!isLoading && stats.length === 0) {
    return null
  }

  return (
    <section 
      ref={sectionRef}
      id="statistics" 
      className="py-10 relative overflow-hidden"
    >
      <SectionParticles particleCount={150} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {isLoading ? (
          // Loading state - show skeleton
          <div className={`grid md:grid-cols-3 gap-6 lg:gap-8`}>
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/80 p-6 rounded-2xl shadow-2xl border-2 border-white/30 dark:border-gray-700/40 animate-pulse"
              >
                <div className="h-12 w-12 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4"></div>
                <div className="h-10 w-20 bg-gray-300 dark:bg-gray-600 rounded mx-auto mb-3"></div>
                <div className="h-5 w-28 bg-gray-300 dark:bg-gray-600 rounded mx-auto"></div>
              </div>
            ))}
          </div>
        ) : (
        <div className={`grid md:grid-cols-3 gap-6 lg:gap-8 ${isVisible ? 'animate-fade-in' : ''}`}>
            {displayStats.map((stat, index) => (
            <div
              key={index}
              className="group relative backdrop-blur-xl bg-white/90 dark:bg-gray-800/80 p-6 rounded-2xl shadow-2xl dark:shadow-gray-900/50 hover:shadow-3xl dark:hover:shadow-gray-900 transition-all duration-700 transform hover:-translate-y-2 border-2 border-white/30 dark:border-gray-700/40 backdrop-saturate-150 text-center overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Animated gradient orb */}
              <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 rounded-full blur-3xl transition-opacity duration-700 transform group-hover:scale-125`}></div>
              
              <div className="relative z-10">
                <div className="mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 flex items-center justify-center text-primary-700 dark:text-primary-300">
                  <Icon name={stat.icon} className="w-12 h-12" aria-hidden="true" />
                </div>
                <div className="mb-3">
                  <div className={`text-5xl md:text-6xl font-extrabold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                    {stat.value}{stat.suffix || ''}
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {stat.label}
                </h3>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  )
}

